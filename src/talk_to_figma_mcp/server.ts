#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";
import { 
  ErrorCodes, 
  CommonErrors, 
  createErrorResponse, 
  formatErrorForMCP 
} from "./errors.js";

// Define TypeScript interfaces for Figma responses
interface FigmaResponse {
  id: string;
  result?: any;
  error?: string;
}

// Define interface for command progress updates
interface CommandProgressUpdate {
  type: 'command_progress';
  commandId: string;
  commandType: string;
  status: 'started' | 'in_progress' | 'completed' | 'error';
  progress: number;
  totalItems: number;
  processedItems: number;
  currentChunk?: number;
  totalChunks?: number;
  chunkSize?: number;
  message: string;
  payload?: any;
  timestamp: number;
}

// Add TypeScript interfaces for component overrides after line 21
interface ComponentOverride {
  id: string;
  overriddenFields: string[];
}

// Update the getInstanceOverridesResult interface to match the plugin implementation
interface getInstanceOverridesResult {
  success: boolean;
  message: string;
  sourceInstanceId: string;
  mainComponentId: string;
  overridesCount: number;
}

interface setInstanceOverridesResult {
  success: boolean;
  message: string;
  totalCount?: number;
  results?: Array<{
    success: boolean;
    instanceId: string;
    instanceName: string;
    appliedCount?: number;
    message?: string;
  }>;
}

// Custom logging functions that write to stderr instead of stdout to avoid being captured
const logger = {
  info: (message: string) => process.stderr.write(`[INFO] ${message}\n`),
  debug: (message: string) => process.stderr.write(`[DEBUG] ${message}\n`),
  warn: (message: string) => process.stderr.write(`[WARN] ${message}\n`),
  error: (message: string) => process.stderr.write(`[ERROR] ${message}\n`),
  log: (message: string) => process.stderr.write(`[LOG] ${message}\n`)
};

// WebSocket connection and request tracking
let ws: WebSocket | null = null;
const pendingRequests = new Map<string, {
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
  timeout: ReturnType<typeof setTimeout>;
  lastActivity: number; // Add timestamp for last activity
}>();

// Track which channel each client is in
let currentChannel: string | null = null;

// Create MCP server
const server = new McpServer({
  name: "TalkToFigmaMCP",
  version: "1.0.0",
});

// Add command line argument parsing
const args = process.argv.slice(2);
const serverArg = args.find(arg => arg.startsWith('--server='));
const serverUrl = serverArg ? serverArg.split('=')[1] : 'localhost';
const WS_URL = serverUrl === 'localhost' ? `ws://${serverUrl}` : `wss://${serverUrl}`;

// Document Info Tool
server.tool(
  "get_document_info",
  "Get detailed information about the current Figma document",
  {},
  async () => {
    try {
      const result = await sendCommandToFigma("get_document_info");
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result)
          }
        ]
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to get document info: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Ensure you are connected to Figma',
            'Check if a document is open in Figma',
            'Verify the WebSocket connection is active'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Selection Tool (DEPRECATED - Use get_current_context instead)
server.tool(
  "get_selection",
  "[DEPRECATED] Get information about the current selection in Figma. Use 'get_current_context' instead.",
  {},
  async () => {
    // Redirect to get_current_context with deprecation notice
    console.warn('[DEPRECATION] get_selection is deprecated. Use get_current_context instead.');
    
    try {
      const result = await sendCommandToFigma("get_selection");
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result)
          },
          {
            type: "text",
            text: "\n⚠️ DEPRECATION WARNING: get_selection is deprecated. Please use get_current_context() instead for more comprehensive context information."
          }
        ]
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to get selection: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Use get_current_context instead of get_selection',
            'The new tool provides selection plus additional context',
            'Example: get_current_context()'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Unified Current Context Tool
server.tool(
  "get_current_context",
  "Get comprehensive context about the current state including selection, focused slide (if in Slides mode), and optionally document info",
  {
    includeDocument: z.boolean().optional().describe("Include document information (default: false)"),
    includeSlideDetails: z.boolean().optional().describe("Include detailed slide information if in Slides mode (default: true)"),
    includeSelectionDetails: z.boolean().optional().describe("Include detailed selection information (default: false)")
  },
  async ({ includeDocument = false, includeSlideDetails = true, includeSelectionDetails = false }) => {
    try {
      const context: any = {};
      
      // Always get selection
      try {
        const selection = await sendCommandToFigma("get_selection");
        context.selection = selection;
      } catch (error) {
        context.selection = { error: "Failed to get selection", selectionCount: 0 };
      }
      
      // Get connection status to determine editor type
      try {
        const status = await sendCommandToFigma("get_connection_status", {}) as any;
        context.editorType = status.editorType || "figma";
        
        // If in Slides mode, get slide-specific info
        if (status.editorType === "slides" && includeSlideDetails) {
          // Get focused slide
          try {
            const focusedSlide = await sendCommandToFigma("get_focused_slide", {});
            context.focusedSlide = focusedSlide;
          } catch (error) {
            context.focusedSlide = null;
          }
          
          // Get slides mode
          try {
            const slidesMode = await sendCommandToFigma("get_slides_mode", {});
            context.slidesMode = slidesMode;
          } catch (error) {
            context.slidesMode = null;
          }
        }
      } catch (error) {
        context.editorType = "unknown";
      }
      
      // Optionally get document info
      if (includeDocument) {
        try {
          const docInfo = await sendCommandToFigma("get_document_info");
          context.document = docInfo;
        } catch (error) {
          context.document = { error: "Failed to get document info" };
        }
      }
      
      // Optionally get detailed selection info
      if (includeSelectionDetails && context.selection && context.selection.selectionCount > 0) {
        try {
          const detailedSelection = await sendCommandToFigma("read_my_design", {});
          context.selectionDetails = detailedSelection;
        } catch (error) {
          context.selectionDetails = null;
        }
      }
      
      return {
        content: [{
          type: "text",
          text: JSON.stringify(context, null, 2)
        }]
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to get current context: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Ensure you are connected to Figma',
            'Check if the Figma plugin is running',
            'Try with different option parameters'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Read My Design Tool
server.tool(
  "read_my_design",
  "Get detailed information about the current selection in Figma, including all node details",
  {},
  async () => {
    try {
      const result = await sendCommandToFigma("read_my_design", {});
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result)
          }
        ]
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to read design: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Select one or more nodes in Figma first',
            'Ensure you are connected to a Figma document',
            'Check if the Figma plugin is running'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Node Info Tool (DEPRECATED - Use get_nodes instead)
server.tool(
  "get_node_info",
  "[DEPRECATED] Get detailed information about a specific node in Figma. Use 'get_nodes' instead.",
  {
    nodeId: z.string().describe("The ID of the node to get information about"),
  },
  async ({ nodeId }) => {
    // Redirect to get_nodes with deprecation notice
    console.warn('[DEPRECATION] get_node_info is deprecated. Use get_nodes instead.');
    
    try {
      // Call the unified get_nodes tool
      const result = await sendCommandToFigma("get_node_info", { nodeId });
      const filtered = filterFigmaNode(result);
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(filtered)
          },
          {
            type: "text",
            text: "\n⚠️ DEPRECATION WARNING: get_node_info is deprecated. Please use get_nodes({nodeIds: '" + nodeId + "'}) instead."
          }
        ]
      };
    } catch (error) {
      // Check if it's a node not found error
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('not found') || errorMessage.includes('does not exist')) {
        return formatErrorForMCP(CommonErrors.nodeNotFound(nodeId));
      }
      
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to get node info: ${errorMessage}`,
        {
          nodeId,
          suggestions: [
            'Use get_nodes instead of get_node_info',
            'Example: get_nodes({nodeIds: "' + nodeId + '"})',
            'The new tool supports both single and multiple nodes'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

function rgbaToHex(color: any): string {
  // skip if color is already hex
  if (color.startsWith('#')) {
    return color;
  }

  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = Math.round(color.a * 255);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${a === 255 ? '' : a.toString(16).padStart(2, '0')}`;
}

function filterFigmaNode(node: any) {
  // Skip VECTOR type nodes
  if (node.type === "VECTOR") {
    return null;
  }

  const filtered: any = {
    id: node.id,
    name: node.name,
    type: node.type,
  };

  if (node.fills && node.fills.length > 0) {
    filtered.fills = node.fills.map((fill: any) => {
      const processedFill = { ...fill };

      // Remove boundVariables and imageRef
      delete processedFill.boundVariables;
      delete processedFill.imageRef;

      // Process gradientStops if present
      if (processedFill.gradientStops) {
        processedFill.gradientStops = processedFill.gradientStops.map((stop: any) => {
          const processedStop = { ...stop };
          // Convert color to hex if present
          if (processedStop.color) {
            processedStop.color = rgbaToHex(processedStop.color);
          }
          // Remove boundVariables
          delete processedStop.boundVariables;
          return processedStop;
        });
      }

      // Convert solid fill colors to hex
      if (processedFill.color) {
        processedFill.color = rgbaToHex(processedFill.color);
      }

      return processedFill;
    });
  }

  if (node.strokes && node.strokes.length > 0) {
    filtered.strokes = node.strokes.map((stroke: any) => {
      const processedStroke = { ...stroke };
      // Remove boundVariables
      delete processedStroke.boundVariables;
      // Convert color to hex if present
      if (processedStroke.color) {
        processedStroke.color = rgbaToHex(processedStroke.color);
      }
      return processedStroke;
    });
  }

  if (node.cornerRadius !== undefined) {
    filtered.cornerRadius = node.cornerRadius;
  }

  if (node.absoluteBoundingBox) {
    filtered.absoluteBoundingBox = node.absoluteBoundingBox;
  }

  if (node.characters) {
    filtered.characters = node.characters;
  }

  if (node.style) {
    filtered.style = {
      fontFamily: node.style.fontFamily,
      fontStyle: node.style.fontStyle,
      fontWeight: node.style.fontWeight,
      fontSize: node.style.fontSize,
      textAlignHorizontal: node.style.textAlignHorizontal,
      letterSpacing: node.style.letterSpacing,
      lineHeightPx: node.style.lineHeightPx
    };
  }

  if (node.children) {
    filtered.children = node.children
      .map((child: any) => filterFigmaNode(child))
      .filter((child: any) => child !== null); // Remove null children (VECTOR nodes)
  }

  return filtered;
}

// Unified Get Nodes Tool
server.tool(
  "get_nodes",
  "Get detailed information about one or more nodes in Figma. Accepts either a single node ID or array of IDs.",
  {
    nodeIds: z.union([
      z.string().describe("Single node ID to get information about"),
      z.array(z.string()).describe("Array of node IDs to get information about")
    ]).describe("Node ID(s) to retrieve"),
    includeChildren: z.boolean().optional().describe("Whether to include child nodes (default: true)"),
    maxDepth: z.number().optional().describe("Maximum depth for child traversal (-1 for unlimited, default: -1)")
  },
  async ({ nodeIds, includeChildren = true, maxDepth = -1 }) => {
    try {
      // Normalize input to always work with arrays
      const isSingleNode = typeof nodeIds === 'string';
      const nodeIdArray = isSingleNode ? [nodeIds] : nodeIds;
      
      if (nodeIdArray.length === 0) {
        return {
          content: [{
            type: "text",
            text: "No node IDs provided"
          }]
        };
      }

      // Use different backend commands based on input
      if (nodeIdArray.length === 1) {
        // Single node - use get_node_info
        const result = await sendCommandToFigma("get_node_info", { 
          nodeId: nodeIdArray[0],
          includeChildren,
          maxDepth
        });
        
        const filtered = filterFigmaNode(result);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(isSingleNode ? filtered : [filtered])
          }]
        };
      } else {
        // Multiple nodes - use get_multiple_nodes_info for efficiency
        const result = await sendCommandToFigma("get_multiple_nodes_info", {
          nodeIds: nodeIdArray,
          includeChildren,
          maxDepth
        }) as any;
        
        // Process results to match expected format
        const processedResults = result.results.map((nodeResult: any) => {
          if (nodeResult.found) {
            return filterFigmaNode(nodeResult.node);
          }
          return null;
        }).filter((node: any) => node !== null);
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify(processedResults)
          }]
        };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      // Check for specific error types
      if (errorMessage.includes('not found') || errorMessage.includes('does not exist')) {
        const nodeId = typeof nodeIds === 'string' ? nodeIds : nodeIds[0];
        return formatErrorForMCP(CommonErrors.nodeNotFound(nodeId));
      }
      
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to get node(s) info: ${errorMessage}`,
        {
          suggestions: [
            'Verify all node IDs are valid',
            'Check if nodes exist in the current document',
            'Ensure you have access to view these nodes'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Nodes Info Tool (DEPRECATED - Use get_nodes instead)
server.tool(
  "get_nodes_info",
  "[DEPRECATED] Get detailed information about multiple nodes in Figma. Use 'get_nodes' instead.",
  {
    nodeIds: z.array(z.string()).describe("Array of node IDs to get information about")
  },
  async ({ nodeIds }) => {
    // Redirect to get_nodes with deprecation notice
    console.warn('[DEPRECATION] get_nodes_info is deprecated. Use get_nodes instead.');
    
    try {
      const results = await Promise.all(
        nodeIds.map(async (nodeId) => {
          const result = await sendCommandToFigma('get_node_info', { nodeId });
          return { nodeId, info: result };
        })
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results.map((result) => filterFigmaNode(result.info)))
          },
          {
            type: "text",
            text: "\n⚠️ DEPRECATION WARNING: get_nodes_info is deprecated. Please use get_nodes({nodeIds: [" + nodeIds.map(id => '"' + id + '"').join(', ') + "]}) instead."
          }
        ]
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to get multiple nodes info: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Use get_nodes instead of get_nodes_info',
            'Example: get_nodes({nodeIds: ["id1", "id2"]})',
            'The new tool supports both single and multiple nodes'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);


// Create Rectangle Tool
server.tool(
  "create_rectangle",
  "Create a new rectangle in Figma",
  {
    x: z.number().describe("X position"),
    y: z.number().describe("Y position"),
    width: z.number().describe("Width of the rectangle"),
    height: z.number().describe("Height of the rectangle"),
    name: z.string().optional().describe("Optional name for the rectangle"),
    parentId: z
      .string()
      .optional()
      .describe("Optional parent node ID to append the rectangle to"),
  },
  async ({ x, y, width, height, name, parentId }) => {
    try {
      const result = await sendCommandToFigma("create_rectangle", {
        x,
        y,
        width,
        height,
        name: name || "Rectangle",
        parentId,
      });
      return {
        content: [
          {
            type: "text",
            text: `Created rectangle "${JSON.stringify(result)}"`,
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to create rectangle: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Check if the parent node ID is valid',
            'Ensure coordinates and dimensions are valid numbers',
            'Verify you have edit access to the document'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Create Frame Tool
server.tool(
  "create_frame",
  "Create a new frame in Figma",
  {
    x: z.number().describe("X position"),
    y: z.number().describe("Y position"),
    width: z.number().describe("Width of the frame"),
    height: z.number().describe("Height of the frame"),
    name: z.string().optional().describe("Optional name for the frame"),
    parentId: z
      .string()
      .optional()
      .describe("Optional parent node ID to append the frame to"),
    fillColor: z
      .object({
        r: z.number().min(0).max(1).describe("Red component (0-1)"),
        g: z.number().min(0).max(1).describe("Green component (0-1)"),
        b: z.number().min(0).max(1).describe("Blue component (0-1)"),
        a: z
          .number()
          .min(0)
          .max(1)
          .optional()
          .describe("Alpha component (0-1)"),
      })
      .optional()
      .describe("Fill color in RGBA format"),
    strokeColor: z
      .object({
        r: z.number().min(0).max(1).describe("Red component (0-1)"),
        g: z.number().min(0).max(1).describe("Green component (0-1)"),
        b: z.number().min(0).max(1).describe("Blue component (0-1)"),
        a: z
          .number()
          .min(0)
          .max(1)
          .optional()
          .describe("Alpha component (0-1)"),
      })
      .optional()
      .describe("Stroke color in RGBA format"),
    strokeWeight: z.number().positive().optional().describe("Stroke weight"),
    layoutMode: z.enum(["NONE", "HORIZONTAL", "VERTICAL"]).optional().describe("Auto-layout mode for the frame"),
    layoutWrap: z.enum(["NO_WRAP", "WRAP"]).optional().describe("Whether the auto-layout frame wraps its children"),
    paddingTop: z.number().optional().describe("Top padding for auto-layout frame"),
    paddingRight: z.number().optional().describe("Right padding for auto-layout frame"),
    paddingBottom: z.number().optional().describe("Bottom padding for auto-layout frame"),
    paddingLeft: z.number().optional().describe("Left padding for auto-layout frame"),
    primaryAxisAlignItems: z
      .enum(["MIN", "MAX", "CENTER", "SPACE_BETWEEN"])
      .optional()
      .describe("Primary axis alignment for auto-layout frame. Note: When set to SPACE_BETWEEN, itemSpacing will be ignored as children will be evenly spaced."),
    counterAxisAlignItems: z.enum(["MIN", "MAX", "CENTER", "BASELINE"]).optional().describe("Counter axis alignment for auto-layout frame"),
    layoutSizingHorizontal: z.enum(["FIXED", "HUG", "FILL"]).optional().describe("Horizontal sizing mode for auto-layout frame"),
    layoutSizingVertical: z.enum(["FIXED", "HUG", "FILL"]).optional().describe("Vertical sizing mode for auto-layout frame"),
    itemSpacing: z
      .number()
      .optional()
      .describe("Distance between children in auto-layout frame. Note: This value will be ignored if primaryAxisAlignItems is set to SPACE_BETWEEN.")
  },
  async ({
    x,
    y,
    width,
    height,
    name,
    parentId,
    fillColor,
    strokeColor,
    strokeWeight,
    layoutMode,
    layoutWrap,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    primaryAxisAlignItems,
    counterAxisAlignItems,
    layoutSizingHorizontal,
    layoutSizingVertical,
    itemSpacing
  }) => {
    try {
      const result = await sendCommandToFigma("create_frame", {
        x,
        y,
        width,
        height,
        name: name || "Frame",
        parentId,
        fillColor: fillColor || { r: 1, g: 1, b: 1, a: 1 },
        strokeColor: strokeColor,
        strokeWeight: strokeWeight,
        layoutMode,
        layoutWrap,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        primaryAxisAlignItems,
        counterAxisAlignItems,
        layoutSizingHorizontal,
        layoutSizingVertical,
        itemSpacing
      });
      const typedResult = result as { name: string; id: string };
      return {
        content: [
          {
            type: "text",
            text: `Created frame "${typedResult.name}" with ID: ${typedResult.id}. Use the ID as the parentId to appendChild inside this frame.`,
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to create frame: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Check if the parent node ID is valid',
            'Ensure coordinates and dimensions are valid numbers',
            'Verify you have edit access to the document'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Create Text Tool
server.tool(
  "create_text",
  "Create a new text element in Figma",
  {
    x: z.number().describe("X position"),
    y: z.number().describe("Y position"),
    text: z.string().describe("Text content"),
    fontSize: z.number().optional().describe("Font size (default: 14)"),
    fontWeight: z
      .number()
      .optional()
      .describe("Font weight (e.g., 400 for Regular, 700 for Bold)"),
    fontColor: z
      .object({
        r: z.number().min(0).max(1).describe("Red component (0-1)"),
        g: z.number().min(0).max(1).describe("Green component (0-1)"),
        b: z.number().min(0).max(1).describe("Blue component (0-1)"),
        a: z
          .number()
          .min(0)
          .max(1)
          .optional()
          .describe("Alpha component (0-1)"),
      })
      .optional()
      .describe("Font color in RGBA format"),
    name: z
      .string()
      .optional()
      .describe("Semantic layer name for the text node"),
    parentId: z
      .string()
      .optional()
      .describe("Optional parent node ID to append the text to"),
  },
  async ({ x, y, text, fontSize, fontWeight, fontColor, name, parentId }) => {
    try {
      const result = await sendCommandToFigma("create_text", {
        x,
        y,
        text,
        fontSize: fontSize || 14,
        fontWeight: fontWeight || 400,
        fontColor: fontColor || { r: 0, g: 0, b: 0, a: 1 },
        name: name || "Text",
        parentId,
      });
      const typedResult = result as { name: string; id: string };
      return {
        content: [
          {
            type: "text",
            text: `Created text "${typedResult.name}" with ID: ${typedResult.id}`,
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to create text: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Check if the parent node ID is valid',
            'Ensure coordinates and dimensions are valid numbers',
            'Verify you have edit access to the document',
            'Use update_text_preserve_formatting to maintain text styles'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Set Fill Color Tool
server.tool(
  "set_fill_color",
  "Set the fill color of a node in Figma can be TextNode or FrameNode",
  {
    nodeId: z.string().describe("The ID of the node to modify"),
    r: z.number().min(0).max(1).describe("Red component (0-1)"),
    g: z.number().min(0).max(1).describe("Green component (0-1)"),
    b: z.number().min(0).max(1).describe("Blue component (0-1)"),
    a: z.number().min(0).max(1).optional().describe("Alpha component (0-1)"),
  },
  async ({ nodeId, r, g, b, a }) => {
    try {
      const result = await sendCommandToFigma("set_fill_color", {
        nodeId,
        color: { r, g, b, a: a || 1 },
      });
      const typedResult = result as { name: string };
      return {
        content: [
          {
            type: "text",
            text: `Set fill color of node "${typedResult.name
              }" to RGBA(${r}, ${g}, ${b}, ${a || 1})`,
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to set fill color: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Check parameter values are in the correct format',
            'Ensure the node supports this operation'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Set Stroke Color Tool
server.tool(
  "set_stroke_color",
  "Set the stroke color of a node in Figma",
  {
    nodeId: z.string().describe("The ID of the node to modify"),
    r: z.number().min(0).max(1).describe("Red component (0-1)"),
    g: z.number().min(0).max(1).describe("Green component (0-1)"),
    b: z.number().min(0).max(1).describe("Blue component (0-1)"),
    a: z.number().min(0).max(1).optional().describe("Alpha component (0-1)"),
    weight: z.number().positive().optional().describe("Stroke weight"),
  },
  async ({ nodeId, r, g, b, a, weight }) => {
    try {
      const result = await sendCommandToFigma("set_stroke_color", {
        nodeId,
        color: { r, g, b, a: a || 1 },
        weight: weight || 1,
      });
      const typedResult = result as { name: string };
      return {
        content: [
          {
            type: "text",
            text: `Set stroke color of node "${typedResult.name
              }" to RGBA(${r}, ${g}, ${b}, ${a || 1}) with weight ${weight || 1}`,
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to set stroke color: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Check parameter values are in the correct format',
            'Ensure the node supports this operation'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Move Node Tool
server.tool(
  "move_node",
  "Move a node to a new position in Figma",
  {
    nodeId: z.string().describe("The ID of the node to move"),
    x: z.number().describe("New X position"),
    y: z.number().describe("New Y position"),
  },
  async ({ nodeId, x, y }) => {
    try {
      const result = await sendCommandToFigma("move_node", { nodeId, x, y });
      const typedResult = result as { name: string };
      return {
        content: [
          {
            type: "text",
            text: `Moved node "${typedResult.name}" to position (${x}, ${y})`,
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to move node: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Ensure x and y coordinates are valid numbers',
            'Check if the node is locked or constrained'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Clone Node Tool
server.tool(
  "clone_node",
  "Clone an existing node in Figma",
  {
    nodeId: z.string().describe("The ID of the node to clone"),
    x: z.number().optional().describe("New X position for the clone"),
    y: z.number().optional().describe("New Y position for the clone")
  },
  async ({ nodeId, x, y }) => {
    try {
      const result = await sendCommandToFigma('clone_node', { nodeId, x, y });
      const typedResult = result as { name: string, id: string };
      return {
        content: [
          {
            type: "text",
            text: `Cloned node "${typedResult.name}" with new ID: ${typedResult.id}${x !== undefined && y !== undefined ? ` at position (${x}, ${y})` : ''}`
          }
        ]
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to clone node: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the source node ID is valid',
            'Ensure you have permission to duplicate the node',
            'Check if the node type supports cloning'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Resize Node Tool
server.tool(
  "resize_node",
  "Resize a node in Figma",
  {
    nodeId: z.string().describe("The ID of the node to resize"),
    width: z.number().positive().describe("New width"),
    height: z.number().positive().describe("New height"),
  },
  async ({ nodeId, width, height }) => {
    try {
      const result = await sendCommandToFigma("resize_node", {
        nodeId,
        width,
        height,
      });
      const typedResult = result as { name: string };
      return {
        content: [
          {
            type: "text",
            text: `Resized node "${typedResult.name}" to width ${width} and height ${height}`,
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to resize node: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Ensure width and height are positive numbers',
            'Check if the node has size constraints'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Delete Node Tool
server.tool(
  "delete_node",
  "Delete a node from Figma",
  {
    nodeId: z.string().describe("The ID of the node to delete"),
  },
  async ({ nodeId }) => {
    try {
      await sendCommandToFigma("delete_node", { nodeId });
      return {
        content: [
          {
            type: "text",
            text: `Deleted node with ID: ${nodeId}`,
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to delete node: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Ensure you have permission to delete the node',
            'Check if the node is locked or protected'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Delete Multiple Nodes Tool
server.tool(
  "delete_multiple_nodes",
  "Delete multiple nodes from Figma at once",
  {
    nodeIds: z.array(z.string()).describe("Array of node IDs to delete"),
  },
  async ({ nodeIds }) => {
    try {
      const result = await sendCommandToFigma("delete_multiple_nodes", { nodeIds });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result)
          }
        ]
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.BATCH_PARTIAL_FAILURE,
        `Failed to delete multiple nodes: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Verify all node IDs in the batch are valid',
            'Check if some operations may have partially succeeded',
            'Ensure you have permissions for all items'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Export Node as Image Tool
server.tool(
  "export_node_as_image",
  "Export a node as an image from Figma",
  {
    nodeId: z.string().describe("The ID of the node to export"),
    format: z
      .enum(["PNG", "JPG", "SVG", "PDF"])
      .optional()
      .describe("Export format"),
    scale: z.number().positive().optional().describe("Export scale"),
  },
  async ({ nodeId, format, scale }) => {
    try {
      const result = await sendCommandToFigma("export_node_as_image", {
        nodeId,
        format: format || "PNG",
        scale: scale || 1,
      });
      const typedResult = result as { imageData: string; mimeType: string };

      return {
        content: [
          {
            type: "image",
            data: typedResult.imageData,
            mimeType: typedResult.mimeType || "image/png",
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to export node as image: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Check if the node is visible and not empty',
            'Ensure the export format is supported (PNG, JPG, SVG, PDF)'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Set Text Content Tool
server.tool(
  "set_text_content",
  "Set the text content of an existing text node in Figma",
  {
    nodeId: z.string().describe("The ID of the text node to modify"),
    text: z.string().describe("New text content"),
  },
  async ({ nodeId, text }) => {
    try {
      const result = await sendCommandToFigma("set_text_content", {
        nodeId,
        text,
      });
      const typedResult = result as { name: string };
      return {
        content: [
          {
            type: "text",
            text: `Updated text content of node "${typedResult.name}" to "${text}"`,
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to set text content: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Check parameter values are in the correct format',
            'Ensure the node supports this operation'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Get Styles Tool
server.tool(
  "get_styles",
  "Get all styles from the current Figma document",
  {},
  async () => {
    try {
      const result = await sendCommandToFigma("get_styles");
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result)
          }
        ]
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to get styles: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Verify the node ID is correct',
            'Check if the node exists in the current document',
            'Ensure you have read access'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Get Local Components Tool
server.tool(
  "get_local_components",
  "Get all local components from the Figma document",
  {},
  async () => {
    try {
      const result = await sendCommandToFigma("get_local_components");
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result)
          }
        ]
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.COMPONENT_NOT_FOUND,
        `Failed to get local components: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Verify the node ID is correct',
            'Check if the node exists in the current document',
            'Ensure you have read access'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Get Annotations Tool
server.tool(
  "get_annotations",
  "Get all annotations in the current document or specific node",
  {
    nodeId: z.string().optional().describe("Optional node ID to get annotations for specific node"),
    includeCategories: z.boolean().optional().default(true).describe("Whether to include category information")
  },
  async ({ nodeId, includeCategories }) => {
    try {
      const result = await sendCommandToFigma("get_annotations", {
        nodeId,
        includeCategories
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result)
          }
        ]
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to get annotations: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is correct',
            'Check if the node exists in the current document',
            'Ensure you have read access'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Set Annotation Tool
server.tool(
  "set_annotation",
  "Create or update an annotation",
  {
    nodeId: z.string().describe("The ID of the node to annotate"),
    annotationId: z.string().optional().describe("The ID of the annotation to update (if updating existing annotation)"),
    labelMarkdown: z.string().describe("The annotation text in markdown format"),
    categoryId: z.string().optional().describe("The ID of the annotation category"),
    properties: z.array(z.object({
      type: z.string()
    })).optional().describe("Additional properties for the annotation")
  },
  async ({ nodeId, annotationId, labelMarkdown, categoryId, properties }) => {
    try {
      const result = await sendCommandToFigma("set_annotation", {
        nodeId,
        annotationId,
        labelMarkdown,
        categoryId,
        properties
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result)
          }
        ]
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to set annotation: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Check parameter values are in the correct format',
            'Ensure the node supports this operation'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

interface SetMultipleAnnotationsParams {
  nodeId: string;
  annotations: Array<{
    nodeId: string;
    labelMarkdown: string;
    categoryId?: string;
    annotationId?: string;
    properties?: Array<{ type: string }>;
  }>;
}

// Set Multiple Annotations Tool
server.tool(
  "set_multiple_annotations",
  "Set multiple annotations parallelly in a node",
  {
    nodeId: z
      .string()
      .describe("The ID of the node containing the elements to annotate"),
    annotations: z
      .array(
        z.object({
          nodeId: z.string().describe("The ID of the node to annotate"),
          labelMarkdown: z.string().describe("The annotation text in markdown format"),
          categoryId: z.string().optional().describe("The ID of the annotation category"),
          annotationId: z.string().optional().describe("The ID of the annotation to update (if updating existing annotation)"),
          properties: z.array(z.object({
            type: z.string()
          })).optional().describe("Additional properties for the annotation")
        })
      )
      .describe("Array of annotations to apply"),
  },
  async ({ nodeId, annotations }, extra) => {
    try {
      if (!annotations || annotations.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "No annotations provided",
            },
          ],
        };
      }

      // Initial response to indicate we're starting the process
      const initialStatus = {
        type: "text" as const,
        text: `Starting annotation process for ${annotations.length} nodes. This will be processed in batches of 5...`,
      };

      // Track overall progress
      let totalProcessed = 0;
      const totalToProcess = annotations.length;

      // Use the plugin's set_multiple_annotations function with chunking
      const result = await sendCommandToFigma("set_multiple_annotations", {
        nodeId,
        annotations,
      });

      // Cast the result to a specific type to work with it safely
      interface AnnotationResult {
        success: boolean;
        nodeId: string;
        annotationsApplied?: number;
        annotationsFailed?: number;
        totalAnnotations?: number;
        completedInChunks?: number;
        results?: Array<{
          success: boolean;
          nodeId: string;
          error?: string;
          annotationId?: string;
        }>;
      }

      const typedResult = result as AnnotationResult;

      // Format the results for display
      const success = typedResult.annotationsApplied && typedResult.annotationsApplied > 0;
      const progressText = `
      Annotation process completed:
      - ${typedResult.annotationsApplied || 0} of ${totalToProcess} successfully applied
      - ${typedResult.annotationsFailed || 0} failed
      - Processed in ${typedResult.completedInChunks || 1} batches
      `;

      // Detailed results
      const detailedResults = typedResult.results || [];
      const failedResults = detailedResults.filter(item => !item.success);

      // Create the detailed part of the response
      let detailedResponse = "";
      if (failedResults.length > 0) {
        detailedResponse = `\n\nNodes that failed:\n${failedResults.map(item =>
          `- ${item.nodeId}: ${item.error || "Unknown error"}`
        ).join('\n')}`;
      }

      return {
        content: [
          initialStatus,
          {
            type: "text" as const,
            text: progressText + detailedResponse,
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to set multiple annotations: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Check parameter values are in the correct format',
            'Ensure the node supports this operation'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Create Component Instance Tool
server.tool(
  "create_component_instance",
  "Create an instance of a component in Figma",
  {
    componentKey: z.string().describe("Key of the component to instantiate"),
    x: z.number().describe("X position"),
    y: z.number().describe("Y position"),
  },
  async ({ componentKey, x, y }) => {
    try {
      const result = await sendCommandToFigma("create_component_instance", {
        componentKey,
        x,
        y,
      });
      const typedResult = result as any;
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(typedResult),
          }
        ]
      }
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.COMPONENT_NOT_FOUND,
        `Failed to create component instance: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Check if the parent node ID is valid',
            'Ensure coordinates and dimensions are valid numbers',
            'Verify you have edit access to the document'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Copy Instance Overrides Tool
server.tool(
  "get_instance_overrides",
  "Get all override properties from a selected component instance. These overrides can be applied to other instances, which will swap them to match the source component.",
  {
    nodeId: z.string().optional().describe("Optional ID of the component instance to get overrides from. If not provided, currently selected instance will be used."),
  },
  async ({ nodeId }) => {
    try {
      const result = await sendCommandToFigma("get_instance_overrides", { 
        instanceNodeId: nodeId || null 
      });
      const typedResult = result as getInstanceOverridesResult;
      
      return {
        content: [
          {
            type: "text",
            text: typedResult.success 
              ? `Successfully got instance overrides: ${typedResult.message}`
              : `Failed to get instance overrides: ${typedResult.message}`
          }
        ]
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to copy instance overrides: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Ensure the node is a component instance',
            'Check if the instance has any overrides'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Set Instance Overrides Tool
server.tool(
  "set_instance_overrides",
  "Apply previously copied overrides to selected component instances. Target instances will be swapped to the source component and all copied override properties will be applied.",
  {
    sourceInstanceId: z.string().describe("ID of the source component instance"),
    targetNodeIds: z.array(z.string()).describe("Array of target instance IDs. Currently selected instances will be used.")
  },
  async ({ sourceInstanceId, targetNodeIds }) => {
    try {
      const result = await sendCommandToFigma("set_instance_overrides", {
        sourceInstanceId: sourceInstanceId,
        targetNodeIds: targetNodeIds || []
      });
      const typedResult = result as setInstanceOverridesResult;
      
      if (typedResult.success) {
        const successCount = typedResult.results?.filter(r => r.success).length || 0;
        return {
          content: [
            {
              type: "text",
              text: `Successfully applied ${typedResult.totalCount || 0} overrides to ${successCount} instances.`
            }
          ]
        };
      } else {
        return {
          content: [
            {
              type: "text",
              text: `Failed to set instance overrides: ${typedResult.message}`
            }
          ]
        };
      }
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to set instance overrides: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Verify the node ID is valid',
            'Check parameter values are in the correct format',
            'Ensure the node supports this operation'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);


// Set Corner Radius Tool
server.tool(
  "set_corner_radius",
  "Set the corner radius of a node in Figma",
  {
    nodeId: z.string().describe("The ID of the node to modify"),
    radius: z.number().min(0).describe("Corner radius value"),
    corners: z
      .array(z.boolean())
      .length(4)
      .optional()
      .describe(
        "Optional array of 4 booleans to specify which corners to round [topLeft, topRight, bottomRight, bottomLeft]"
      ),
  },
  async ({ nodeId, radius, corners }) => {
    try {
      const result = await sendCommandToFigma("set_corner_radius", {
        nodeId,
        radius,
        corners: corners || [true, true, true, true],
      });
      const typedResult = result as { name: string };
      return {
        content: [
          {
            type: "text",
            text: `Set corner radius of node "${typedResult.name}" to ${radius}px`,
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to set corner radius: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Check parameter values are in the correct format',
            'Ensure the node supports this operation'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Define design strategy prompt
server.prompt(
  "design_strategy",
  "Best practices for working with Figma designs",
  (extra) => {
    return {
      messages: [
        {
          role: "assistant",
          content: {
            type: "text",
            text: `When working with Figma designs, follow these best practices:

1. Start with Document Structure:
   - First use get_document_info() to understand the current document
   - Plan your layout hierarchy before creating elements
   - Create a main container frame for each screen/section

2. Naming Conventions:
   - Use descriptive, semantic names for all elements
   - Follow a consistent naming pattern (e.g., "Login Screen", "Logo Container", "Email Input")
   - Group related elements with meaningful names

3. Layout Hierarchy:
   - Create parent frames first, then add child elements
   - For forms/login screens:
     * Start with the main screen container frame
     * Create a logo container at the top
     * Group input fields in their own containers
     * Place action buttons (login, submit) after inputs
     * Add secondary elements (forgot password, signup links) last

4. Input Fields Structure:
   - Create a container frame for each input field
   - Include a label text above or inside the input
   - Group related inputs (e.g., username/password) together

5. Element Creation:
   - Use create_frame() for containers and input fields
   - Use create_text() for labels, buttons text, and links
   - Set appropriate colors and styles:
     * Use fillColor for backgrounds
     * Use strokeColor for borders
     * Set proper fontWeight for different text elements

6. Mofifying existing elements:
  - use set_text_content() to modify text content.

7. Visual Hierarchy:
   - Position elements in logical reading order (top to bottom)
   - Maintain consistent spacing between elements
   - Use appropriate font sizes for different text types:
     * Larger for headings/welcome text
     * Medium for input labels
     * Standard for button text
     * Smaller for helper text/links

8. Best Practices:
   - Verify each creation with get_node_info()
   - Use parentId to maintain proper hierarchy
   - Group related elements together in frames
   - Keep consistent spacing and alignment

Example Login Screen Structure:
- Login Screen (main frame)
  - Logo Container (frame)
    - Logo (image/text)
  - Welcome Text (text)
  - Input Container (frame)
    - Email Input (frame)
      - Email Label (text)
      - Email Field (frame)
    - Password Input (frame)
      - Password Label (text)
      - Password Field (frame)
  - Login Button (frame)
    - Button Text (text)
  - Helper Links (frame)
    - Forgot Password (text)
    - Don't have account (text)`,
          },
        },
      ],
      description: "Best practices for working with Figma designs",
    };
  }
);

server.prompt(
  "read_design_strategy",
  "Best practices for reading Figma designs",
  (extra) => {
    return {
      messages: [
        {
          role: "assistant",
          content: {
            type: "text",
            text: `When reading Figma designs, follow these best practices:

1. Start with selection:
   - First use read_my_design() to understand the current selection
   - If no selection ask user to select single or multiple nodes
`,
          },
        },
      ],
      description: "Best practices for reading Figma designs",
    };
  }
);

/**
 * @deprecated This tool has been deprecated due to performance issues (consistent timeouts).
 * Use scan_nodes_with_options instead for better performance and flexibility.
 */
// Text Node Scanning Tool - DEPRECATED
server.tool(
  "scan_text_nodes",
  "[DEPRECATED] Scan all text nodes in the selected Figma node - Use scan_nodes_with_options instead",
  {
    nodeId: z.string().describe("ID of the node to scan"),
  },
  async ({ nodeId }) => {
    // Return deprecation error using standardized format
    const errorResponse = createErrorResponse(
      ErrorCodes.TOOL_DEPRECATED,
      "The scan_text_nodes tool has been deprecated due to performance issues.",
      {
        nodeId,
        suggestions: [
          "Use scan_nodes_with_options instead with nodeTypes: ['TEXT'] for better performance",
          `Example: scan_nodes_with_options({ nodeId: '${nodeId}', options: { nodeTypes: ['TEXT'] } })`
        ]
      }
    );
    
    return formatErrorForMCP(errorResponse);
  }
);

// Node Type Scanning Tool
server.tool(
  "scan_nodes_by_types",
  "Scan for child nodes with specific types in the selected Figma node",
  {
    nodeId: z.string().describe("ID of the node to scan"),
    types: z.array(z.string()).describe("Array of node types to find in the child nodes (e.g. ['COMPONENT', 'FRAME'])")
  },
  async ({ nodeId, types }) => {
    try {
      // Initial response to indicate we're starting the process
      const initialStatus = {
        type: "text" as const,
        text: `Starting node type scanning for types: ${types.join(', ')}...`,
      };

      // Use the plugin's scan_nodes_by_types function
      const result = await sendCommandToFigma("scan_nodes_by_types", {
        nodeId,
        types
      });

      // Format the response
      if (result && typeof result === 'object' && 'matchingNodes' in result) {
        const typedResult = result as {
          success: boolean,
          count: number,
          matchingNodes: Array<{
            id: string,
            name: string,
            type: string,
            bbox: {
              x: number,
              y: number,
              width: number,
              height: number
            }
          }>,
          searchedTypes: Array<string>
        };

        const summaryText = `Scan completed: Found ${typedResult.count} nodes matching types: ${typedResult.searchedTypes.join(', ')}`;

        return {
          content: [
            initialStatus,
            {
              type: "text" as const,
              text: summaryText
            },
            {
              type: "text" as const,
              text: JSON.stringify(typedResult.matchingNodes, null, 2)
            }
          ],
        };
      }

      // If the result is in an unexpected format, return it as is
      return {
        content: [
          initialStatus,
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to scan nodes by types: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the parent node ID is valid',
            'Check if the scan criteria are properly specified',
            'Consider using pagination for large node trees'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Text Replacement Strategy Prompt
server.prompt(
  "text_replacement_strategy",
  "Systematic approach for replacing text in Figma designs",
  (extra) => {
    return {
      messages: [
        {
          role: "assistant",
          content: {
            type: "text",
            text: `# Intelligent Text Replacement Strategy

## 1. Analyze Design & Identify Structure
- Scan text nodes to understand the overall structure of the design
- Use AI pattern recognition to identify logical groupings:
  * Tables (rows, columns, headers, cells)
  * Lists (items, headers, nested lists)
  * Card groups (similar cards with recurring text fields)
  * Forms (labels, input fields, validation text)
  * Navigation (menu items, breadcrumbs)
\`\`\`
scan_nodes_with_options({ nodeId: "node-id", options: { nodeTypes: ["TEXT"] } })
get_node_info(nodeId: "node-id")  // optional
\`\`\`

## 2. Strategic Chunking for Complex Designs
- Divide replacement tasks into logical content chunks based on design structure
- Use one of these chunking strategies that best fits the design:
  * **Structural Chunking**: Table rows/columns, list sections, card groups
  * **Spatial Chunking**: Top-to-bottom, left-to-right in screen areas
  * **Semantic Chunking**: Content related to the same topic or functionality
  * **Component-Based Chunking**: Process similar component instances together

## 3. Progressive Replacement with Verification
- Create a safe copy of the node for text replacement
- Replace text chunk by chunk with continuous progress updates
- After each chunk is processed:
  * Export that section as a small, manageable image
  * Verify text fits properly and maintain design integrity
  * Fix issues before proceeding to the next chunk

\`\`\`
// Clone the node to create a safe copy
clone_node(nodeId: "selected-node-id", x: [new-x], y: [new-y])

// Replace text chunk by chunk
set_multiple_text_contents(
  nodeId: "parent-node-id", 
  text: [
    { nodeId: "node-id-1", text: "New text 1" },
    // More nodes in this chunk...
  ]
)

// Verify chunk with small, targeted image exports
export_node_as_image(nodeId: "chunk-node-id", format: "PNG", scale: 0.5)
\`\`\`

## 4. Intelligent Handling for Table Data
- For tabular content:
  * Process one row or column at a time
  * Maintain alignment and spacing between cells
  * Consider conditional formatting based on cell content
  * Preserve header/data relationships

## 5. Smart Text Adaptation
- Adaptively handle text based on container constraints:
  * Auto-detect space constraints and adjust text length
  * Apply line breaks at appropriate linguistic points
  * Maintain text hierarchy and emphasis
  * Consider font scaling for critical content that must fit

## 6. Progressive Feedback Loop
- Establish a continuous feedback loop during replacement:
  * Real-time progress updates (0-100%)
  * Small image exports after each chunk for verification
  * Issues identified early and resolved incrementally
  * Quick adjustments applied to subsequent chunks

## 7. Final Verification & Context-Aware QA
- After all chunks are processed:
  * Export the entire design at reduced scale for final verification
  * Check for cross-chunk consistency issues
  * Verify proper text flow between different sections
  * Ensure design harmony across the full composition

## 8. Chunk-Specific Export Scale Guidelines
- Scale exports appropriately based on chunk size:
  * Small chunks (1-5 elements): scale 1.0
  * Medium chunks (6-20 elements): scale 0.7
  * Large chunks (21-50 elements): scale 0.5
  * Very large chunks (50+ elements): scale 0.3
  * Full design verification: scale 0.2

## Sample Chunking Strategy for Common Design Types

### Tables
- Process by logical rows (5-10 rows per chunk)
- Alternative: Process by column for columnar analysis
- Tip: Always include header row in first chunk for reference

### Card Lists
- Group 3-5 similar cards per chunk
- Process entire cards to maintain internal consistency
- Verify text-to-image ratio within cards after each chunk

### Forms
- Group related fields (e.g., "Personal Information", "Payment Details")
- Process labels and input fields together
- Ensure validation messages and hints are updated with their fields

### Navigation & Menus
- Process hierarchical levels together (main menu, submenu)
- Respect information architecture relationships
- Verify menu fit and alignment after replacement

## Best Practices
- **Preserve Design Intent**: Always prioritize design integrity
- **Structural Consistency**: Maintain alignment, spacing, and hierarchy
- **Visual Feedback**: Verify each chunk visually before proceeding
- **Incremental Improvement**: Learn from each chunk to improve subsequent ones
- **Balance Automation & Control**: Let AI handle repetitive replacements but maintain oversight
- **Respect Content Relationships**: Keep related content consistent across chunks

Remember that text is never just text—it's a core design element that must work harmoniously with the overall composition. This chunk-based strategy allows you to methodically transform text while maintaining design integrity.`,
          },
        },
      ],
      description: "Systematic approach for replacing text in Figma designs",
    };
  }
);

// Set Multiple Text Contents Tool
server.tool(
  "set_multiple_text_contents",
  "Set multiple text contents parallelly in a node",
  {
    nodeId: z
      .string()
      .describe("The ID of the node containing the text nodes to replace"),
    text: z
      .array(
        z.object({
          nodeId: z.string().describe("The ID of the text node"),
          text: z.string().describe("The replacement text"),
        })
      )
      .describe("Array of text node IDs and their replacement texts"),
  },
  async ({ nodeId, text }, extra) => {
    try {
      if (!text || text.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "No text provided",
            },
          ],
        };
      }

      // Initial response to indicate we're starting the process
      const initialStatus = {
        type: "text" as const,
        text: `Starting text replacement for ${text.length} nodes. This will be processed in batches of 5...`,
      };

      // Track overall progress
      let totalProcessed = 0;
      const totalToProcess = text.length;

      // Use the plugin's set_multiple_text_contents function with chunking
      const result = await sendCommandToFigma("set_multiple_text_contents", {
        nodeId,
        text,
      });

      // Cast the result to a specific type to work with it safely
      interface TextReplaceResult {
        success: boolean;
        nodeId: string;
        replacementsApplied?: number;
        replacementsFailed?: number;
        totalReplacements?: number;
        completedInChunks?: number;
        results?: Array<{
          success: boolean;
          nodeId: string;
          error?: string;
          originalText?: string;
          translatedText?: string;
        }>;
      }

      const typedResult = result as TextReplaceResult;

      // Format the results for display
      const success = typedResult.replacementsApplied && typedResult.replacementsApplied > 0;
      const progressText = `
      Text replacement completed:
      - ${typedResult.replacementsApplied || 0} of ${totalToProcess} successfully updated
      - ${typedResult.replacementsFailed || 0} failed
      - Processed in ${typedResult.completedInChunks || 1} batches
      `;

      // Detailed results
      const detailedResults = typedResult.results || [];
      const failedResults = detailedResults.filter(item => !item.success);

      // Create the detailed part of the response
      let detailedResponse = "";
      if (failedResults.length > 0) {
        detailedResponse = `\n\nNodes that failed:\n${failedResults.map(item =>
          `- ${item.nodeId}: ${item.error || "Unknown error"}`
        ).join('\n')}`;
      }

      return {
        content: [
          initialStatus,
          {
            type: "text" as const,
            text: progressText + detailedResponse,
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to set multiple text contents: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Check parameter values are in the correct format',
            'Ensure the node supports this operation'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Annotation Conversion Strategy Prompt
server.prompt(
  "annotation_conversion_strategy",
  "Strategy for converting manual annotations to Figma's native annotations",
  (extra) => {
    return {
      messages: [
        {
          role: "assistant",
          content: {
            type: "text",
            text: `# Automatic Annotation Conversion
            
## Process Overview

The process of converting manual annotations (numbered/alphabetical indicators with connected descriptions) to Figma's native annotations:

1. Get selected frame/component information
2. Scan and collect all annotation text nodes
3. Scan target UI elements (components, instances, frames)
4. Match annotations to appropriate UI elements
5. Apply native Figma annotations

## Step 1: Get Selection and Initial Setup

First, get the selected frame or component that contains annotations:

\`\`\`typescript
// Get the selected frame/component
const selection = await get_selection();
const selectedNodeId = selection[0].id

// Get available annotation categories for later use
const annotationData = await get_annotations({
  nodeId: selectedNodeId,
  includeCategories: true
});
const categories = annotationData.categories;
\`\`\`

## Step 2: Scan Annotation Text Nodes

Scan all text nodes to identify annotations and their descriptions:

\`\`\`typescript
// Get all text nodes in the selection
const textNodes = await scan_text_nodes({
  nodeId: selectedNodeId
});

// Filter and group annotation markers and descriptions

// Markers typically have these characteristics:
// - Short text content (usually single digit/letter)
// - Specific font styles (often bold)
// - Located in a container with "Marker" or "Dot" in the name
// - Have a clear naming pattern (e.g., "1", "2", "3" or "A", "B", "C")


// Identify description nodes
// Usually longer text nodes near markers or with matching numbers in path
  
\`\`\`

## Step 3: Scan Target UI Elements

Get all potential target elements that annotations might refer to:

\`\`\`typescript
// Scan for all UI elements that could be annotation targets
const targetNodes = await scan_nodes_by_types({
  nodeId: selectedNodeId,
  types: [
    "COMPONENT",
    "INSTANCE",
    "FRAME"
  ]
});
\`\`\`

## Step 4: Match Annotations to Targets

Match each annotation to its target UI element using these strategies in order of priority:

1. **Path-Based Matching**:
   - Look at the marker's parent container name in the Figma layer hierarchy
   - Remove any "Marker:" or "Annotation:" prefixes from the parent name
   - Find UI elements that share the same parent name or have it in their path
   - This works well when markers are grouped with their target elements

2. **Name-Based Matching**:
   - Extract key terms from the annotation description
   - Look for UI elements whose names contain these key terms
   - Consider both exact matches and semantic similarities
   - Particularly effective for form fields, buttons, and labeled components

3. **Proximity-Based Matching** (fallback):
   - Calculate the center point of the marker
   - Find the closest UI element by measuring distances to element centers
   - Consider the marker's position relative to nearby elements
   - Use this method when other matching strategies fail

Additional Matching Considerations:
- Give higher priority to matches found through path-based matching
- Consider the type of UI element when evaluating matches
- Take into account the annotation's context and content
- Use a combination of strategies for more accurate matching

## Step 5: Apply Native Annotations

Convert matched annotations to Figma's native annotations using batch processing:

\`\`\`typescript
// Prepare annotations array for batch processing
const annotationsToApply = Object.values(annotations).map(({ marker, description }) => {
  // Find target using multiple strategies
  const target = 
    findTargetByPath(marker, targetNodes) ||
    findTargetByName(description, targetNodes) ||
    findTargetByProximity(marker, targetNodes);
  
  if (target) {
    // Determine appropriate category based on content
    const category = determineCategory(description.characters, categories);

    // Determine appropriate additional annotationProperty based on content
    const annotationProperty = determineProperties(description.characters, target.type);
    
    return {
      nodeId: target.id,
      labelMarkdown: description.characters,
      categoryId: category.id,
      properties: annotationProperty
    };
  }
  return null;
}).filter(Boolean); // Remove null entries

// Apply annotations in batches using set_multiple_annotations
if (annotationsToApply.length > 0) {
  await set_multiple_annotations({
    nodeId: selectedNodeId,
    annotations: annotationsToApply
  });
}
\`\`\`


This strategy focuses on practical implementation based on real-world usage patterns, emphasizing the importance of handling various UI elements as annotation targets, not just text nodes.`
          },
        },
      ],
      description: "Strategy for converting manual annotations to Figma's native annotations",
    };
  }
);

// Instance Slot Filling Strategy Prompt
server.prompt(
  "swap_overrides_instances",
  "Guide to swap instance overrides between instances",
  (extra) => {
    return {
      messages: [
        {
          role: "assistant",
          content: {
            type: "text",
            text: `# Swap Component Instance and Override Strategy

## Overview
This strategy enables transferring content and property overrides from a source instance to one or more target instances in Figma, maintaining design consistency while reducing manual work.

## Step-by-Step Process

### 1. Selection Analysis
- Use \`get_selection()\` to identify the parent component or selected instances
- For parent components, scan for instances with \`scan_nodes_by_types({ nodeId: "parent-id", types: ["INSTANCE"] })\`
- Identify custom slots by name patterns (e.g. "Custom Slot*" or "Instance Slot") or by examining text content
- Determine which is the source instance (with content to copy) and which are targets (where to apply content)

### 2. Extract Source Overrides
- Use \`get_instance_overrides()\` to extract customizations from the source instance
- This captures text content, property values, and style overrides
- Command syntax: \`get_instance_overrides({ nodeId: "source-instance-id" })\`
- Look for successful response like "Got component information from [instance name]"

### 3. Apply Overrides to Targets
- Apply captured overrides using \`set_instance_overrides()\`
- Command syntax:
  \`\`\`
  set_instance_overrides({
    sourceInstanceId: "source-instance-id", 
    targetNodeIds: ["target-id-1", "target-id-2", ...]
  })
  \`\`\`

### 4. Verification
- Verify results with \`get_node_info()\` or \`read_my_design()\`
- Confirm text content and style overrides have transferred successfully

## Key Tips
- Always join the appropriate channel first with \`join_channel()\`
- When working with multiple targets, check the full selection with \`get_selection()\`
- Preserve component relationships by using instance overrides rather than direct text manipulation`,
          },
        },
      ],
      description: "Strategy for transferring overrides between component instances in Figma",
    };
  }
);

// Set Layout Mode Tool
server.tool(
  "set_layout_mode",
  "Set the layout mode and wrap behavior of a frame in Figma",
  {
    nodeId: z.string().describe("The ID of the frame to modify"),
    layoutMode: z.enum(["NONE", "HORIZONTAL", "VERTICAL"]).describe("Layout mode for the frame"),
    layoutWrap: z.enum(["NO_WRAP", "WRAP"]).optional().describe("Whether the auto-layout frame wraps its children")
  },
  async ({ nodeId, layoutMode, layoutWrap }) => {
    try {
      const result = await sendCommandToFigma("set_layout_mode", {
        nodeId,
        layoutMode,
        layoutWrap: layoutWrap || "NO_WRAP"
      });
      const typedResult = result as { name: string };
      return {
        content: [
          {
            type: "text",
            text: `Set layout mode of frame "${typedResult.name}" to ${layoutMode}${layoutWrap ? ` with ${layoutWrap}` : ''}`,
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to set layout mode: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Check parameter values are in the correct format',
            'Ensure the node supports this operation'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Set Padding Tool
server.tool(
  "set_padding",
  "Set padding values for an auto-layout frame in Figma",
  {
    nodeId: z.string().describe("The ID of the frame to modify"),
    paddingTop: z.number().optional().describe("Top padding value"),
    paddingRight: z.number().optional().describe("Right padding value"),
    paddingBottom: z.number().optional().describe("Bottom padding value"),
    paddingLeft: z.number().optional().describe("Left padding value"),
  },
  async ({ nodeId, paddingTop, paddingRight, paddingBottom, paddingLeft }) => {
    try {
      const result = await sendCommandToFigma("set_padding", {
        nodeId,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
      });
      const typedResult = result as { name: string };

      // Create a message about which padding values were set
      const paddingMessages = [];
      if (paddingTop !== undefined) paddingMessages.push(`top: ${paddingTop}`);
      if (paddingRight !== undefined) paddingMessages.push(`right: ${paddingRight}`);
      if (paddingBottom !== undefined) paddingMessages.push(`bottom: ${paddingBottom}`);
      if (paddingLeft !== undefined) paddingMessages.push(`left: ${paddingLeft}`);

      const paddingText = paddingMessages.length > 0
        ? `padding (${paddingMessages.join(', ')})`
        : "padding";

      return {
        content: [
          {
            type: "text",
            text: `Set ${paddingText} for frame "${typedResult.name}"`,
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to set padding: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Check parameter values are in the correct format',
            'Ensure the node supports this operation'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Set Axis Align Tool
server.tool(
  "set_axis_align",
  "Set primary and counter axis alignment for an auto-layout frame in Figma",
  {
    nodeId: z.string().describe("The ID of the frame to modify"),
    primaryAxisAlignItems: z
      .enum(["MIN", "MAX", "CENTER", "SPACE_BETWEEN"])
      .optional()
      .describe("Primary axis alignment (MIN/MAX = left/right in horizontal, top/bottom in vertical). Note: When set to SPACE_BETWEEN, itemSpacing will be ignored as children will be evenly spaced."),
    counterAxisAlignItems: z
      .enum(["MIN", "MAX", "CENTER", "BASELINE"])
      .optional()
      .describe("Counter axis alignment (MIN/MAX = top/bottom in horizontal, left/right in vertical)")
  },
  async ({ nodeId, primaryAxisAlignItems, counterAxisAlignItems }) => {
    try {
      const result = await sendCommandToFigma("set_axis_align", {
        nodeId,
        primaryAxisAlignItems,
        counterAxisAlignItems
      });
      const typedResult = result as { name: string };

      // Create a message about which alignments were set
      const alignMessages = [];
      if (primaryAxisAlignItems !== undefined) alignMessages.push(`primary: ${primaryAxisAlignItems}`);
      if (counterAxisAlignItems !== undefined) alignMessages.push(`counter: ${counterAxisAlignItems}`);

      const alignText = alignMessages.length > 0
        ? `axis alignment (${alignMessages.join(', ')})`
        : "axis alignment";

      return {
        content: [
          {
            type: "text",
            text: `Set ${alignText} for frame "${typedResult.name}"`,
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to set axis alignment: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Check parameter values are in the correct format',
            'Ensure the node supports this operation'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Set Layout Sizing Tool
server.tool(
  "set_layout_sizing",
  "Set horizontal and vertical sizing modes for an auto-layout frame in Figma",
  {
    nodeId: z.string().describe("The ID of the frame to modify"),
    layoutSizingHorizontal: z
      .enum(["FIXED", "HUG", "FILL"])
      .optional()
      .describe("Horizontal sizing mode (HUG for frames/text only, FILL for auto-layout children only)"),
    layoutSizingVertical: z
      .enum(["FIXED", "HUG", "FILL"])
      .optional()
      .describe("Vertical sizing mode (HUG for frames/text only, FILL for auto-layout children only)")
  },
  async ({ nodeId, layoutSizingHorizontal, layoutSizingVertical }) => {
    try {
      const result = await sendCommandToFigma("set_layout_sizing", {
        nodeId,
        layoutSizingHorizontal,
        layoutSizingVertical
      });
      const typedResult = result as { name: string };

      // Create a message about which sizing modes were set
      const sizingMessages = [];
      if (layoutSizingHorizontal !== undefined) sizingMessages.push(`horizontal: ${layoutSizingHorizontal}`);
      if (layoutSizingVertical !== undefined) sizingMessages.push(`vertical: ${layoutSizingVertical}`);

      const sizingText = sizingMessages.length > 0
        ? `layout sizing (${sizingMessages.join(', ')})`
        : "layout sizing";

      return {
        content: [
          {
            type: "text",
            text: `Set ${sizingText} for frame "${typedResult.name}"`,
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to set layout sizing: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Check parameter values are in the correct format',
            'Ensure the node supports this operation'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Set Item Spacing Tool
server.tool(
  "set_item_spacing",
  "Set distance between children in an auto-layout frame",
  {
    nodeId: z.string().describe("The ID of the frame to modify"),
    itemSpacing: z.number().describe("Distance between children. Note: This value will be ignored if primaryAxisAlignItems is set to SPACE_BETWEEN.")
  },
  async ({ nodeId, itemSpacing }) => {
    try {
      const result = await sendCommandToFigma("set_item_spacing", {
        nodeId,
        itemSpacing
      });
      const typedResult = result as { name: string };

      return {
        content: [
          {
            type: "text",
            text: `Set item spacing to ${itemSpacing} for frame "${typedResult.name}"`,
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to set item spacing: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Check parameter values are in the correct format',
            'Ensure the node supports this operation'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// A tool to get Figma Prototyping Reactions from multiple nodes
server.tool(
  "get_reactions",
  "Get Figma Prototyping Reactions from multiple nodes. CRITICAL: The output MUST be processed using the 'reaction_to_connector_strategy' prompt IMMEDIATELY to generate parameters for connector lines via the 'create_connections' tool.",
  {
    nodeIds: z.array(z.string()).describe("Array of node IDs to get reactions from"),
  },
  async ({ nodeIds }) => {
    try {
      const result = await sendCommandToFigma("get_reactions", { nodeIds });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result)
          },
          {
            type: "text",
            text: "IMPORTANT: You MUST now use the reaction data above and follow the `reaction_to_connector_strategy` prompt to prepare the parameters for the `create_connections` tool call. This is a required next step."
          }
        ],
        followUp: {
          type: "prompt",
          prompt: "reaction_to_connector_strategy",
        },
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to get reactions: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId: nodeIds[0],
          suggestions: [
            'Verify the node ID is correct',
            'Check if the node exists in the current document',
            'Ensure you have read access'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Create Connectors Tool
server.tool(
  "set_default_connector",
  "Set a copied connector node as the default connector",
  {
    connectorId: z.string().optional().describe("The ID of the connector node to set as default")
  },
  async ({ connectorId }) => {
    try {
      const result = await sendCommandToFigma("set_default_connector", {
        connectorId
      });

      return {
        content: [
          {
            type: "text",
            text: `Default connector set: ${JSON.stringify(result)}`
          }
        ]
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to set default connector: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Verify the node ID is valid',
            'Check parameter values are in the correct format',
            'Ensure the node supports this operation'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Connect Nodes Tool
server.tool(
  "create_connections",
  "Create connections between nodes using the default connector style",
  {
    connections: z.array(z.object({
      startNodeId: z.string().describe("ID of the starting node"),
      endNodeId: z.string().describe("ID of the ending node"),
      text: z.string().optional().describe("Optional text to display on the connector")
    })).describe("Array of node connections to create")
  },
  async ({ connections }) => {
    try {
      if (!connections || connections.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "No connections provided"
            }
          ]
        };
      }

      const result = await sendCommandToFigma("create_connections", {
        connections
      });

      return {
        content: [
          {
            type: "text",
            text: `Created ${connections.length} connections: ${JSON.stringify(result)}`
          }
        ]
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to create connections: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Check if the parent node ID is valid',
            'Ensure coordinates and dimensions are valid numbers',
            'Verify you have edit access to the document'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Strategy for converting Figma prototype reactions to connector lines
server.prompt(
  "reaction_to_connector_strategy",
  "Strategy for converting Figma prototype reactions to connector lines using the output of 'get_reactions'",
  (extra) => {
    return {
      messages: [
        {
          role: "assistant",
          content: {
            type: "text",
            text: `# Strategy: Convert Figma Prototype Reactions to Connector Lines

## Goal
Process the JSON output from the \`get_reactions\` tool to generate an array of connection objects suitable for the \`create_connections\` tool. This visually represents prototype flows as connector lines on the Figma canvas.

## Input Data
You will receive JSON data from the \`get_reactions\` tool. This data contains an array of nodes, each with potential reactions. A typical reaction object looks like this:
\`\`\`json
{
  "trigger": { "type": "ON_CLICK" },
  "action": {
    "type": "NAVIGATE",
    "destinationId": "destination-node-id",
    "navigationTransition": { ... },
    "preserveScrollPosition": false
  }
}
\`\`\`

## Step-by-Step Process

### 1. Preparation & Context Gathering
   - **Action:** Call \`read_my_design\` on the relevant node(s) to get context about the nodes involved (names, types, etc.). This helps in generating meaningful connector labels later.
   - **Action:** Call \`set_default_connector\` **without** the \`connectorId\` parameter.
   - **Check Result:** Analyze the response from \`set_default_connector\`.
     - If it confirms a default connector is already set (e.g., "Default connector is already set"), proceed to Step 2.
     - If it indicates no default connector is set (e.g., "No default connector set..."), you **cannot** proceed with \`create_connections\` yet. Inform the user they need to manually copy a connector from FigJam, paste it onto the current page, select it, and then you can run \`set_default_connector({ connectorId: "SELECTED_NODE_ID" })\` before attempting \`create_connections\`. **Do not proceed to Step 2 until a default connector is confirmed.**

### 2. Filter and Transform Reactions from \`get_reactions\` Output
   - **Iterate:** Go through the JSON array provided by \`get_reactions\`. For each node in the array:
     - Iterate through its \`reactions\` array.
   - **Filter:** Keep only reactions where the \`action\` meets these criteria:
     - Has a \`type\` that implies a connection (e.g., \`NAVIGATE\`, \`OPEN_OVERLAY\`, \`SWAP_OVERLAY\`). **Ignore** types like \`CHANGE_TO\`, \`CLOSE_OVERLAY\`, etc.
     - Has a valid \`destinationId\` property.
   - **Extract:** For each valid reaction, extract the following information:
     - \`sourceNodeId\`: The ID of the node the reaction belongs to (from the outer loop).
     - \`destinationNodeId\`: The value of \`action.destinationId\`.
     - \`actionType\`: The value of \`action.type\`.
     - \`triggerType\`: The value of \`trigger.type\`.

### 3. Generate Connector Text Labels
   - **For each extracted connection:** Create a concise, descriptive text label string.
   - **Combine Information:** Use the \`actionType\`, \`triggerType\`, and potentially the names of the source/destination nodes (obtained from Step 1's \`read_my_design\` or by calling \`get_node_info\` if necessary) to generate the label.
   - **Example Labels:**
     - If \`triggerType\` is "ON\_CLICK" and \`actionType\` is "NAVIGATE": "On click, navigate to [Destination Node Name]"
     - If \`triggerType\` is "ON\_DRAG" and \`actionType\` is "OPEN\_OVERLAY": "On drag, open [Destination Node Name] overlay"
   - **Keep it brief and informative.** Let this generated string be \`generatedText\`.

### 4. Prepare the \`connections\` Array for \`create_connections\`
   - **Structure:** Create a JSON array where each element is an object representing a connection.
   - **Format:** Each object in the array must have the following structure:
     \`\`\`json
     {
       "startNodeId": "sourceNodeId_from_step_2",
       "endNodeId": "destinationNodeId_from_step_2",
       "text": "generatedText_from_step_3"
     }
     \`\`\`
   - **Result:** This final array is the value you will pass to the \`connections\` parameter when calling the \`create_connections\` tool.

### 5. Execute Connection Creation
   - **Action:** Call the \`create_connections\` tool, passing the array generated in Step 4 as the \`connections\` argument.
   - **Verify:** Check the response from \`create_connections\` to confirm success or failure.

This detailed process ensures you correctly interpret the reaction data, prepare the necessary information, and use the appropriate tools to create the connector lines.`
          },
        },
      ],
      description: "Strategy for converting Figma prototype reactions to connector lines using the output of 'get_reactions'",
    };
  }
);

// Batch operations best practices prompt
server.prompt(
  "batch_operations_guide",
  "Best practices for efficient bulk operations in Figma",
  () => ({
    messages: [{
      role: "assistant",
      content: {
        type: "text",
        text: `When performing multiple similar operations in Figma, follow these best practices:

1. Use Batch Tools for Performance:
   - clone_multiple_nodes: Clone to multiple positions in one call
   - get_multiple_nodes_info: Read multiple nodes at once
   - execute_batch: Run multiple different commands together
   
   Example - Cloning efficiently:
   // Instead of:
   clone_node("1:5", 41, 3267)
   clone_node("1:5", 41, 3709)
   clone_node("1:5", 41, 4151)
   
   // Use:
   clone_multiple_nodes({
     sourceNodeId: "1:5",
     positions: [
       {x: 41, y: 3267},
       {x: 41, y: 3709},
       {x: 41, y: 4151}
     ]
   })

2. Handle Large Documents:
   - If scan_text_nodes times out, use scan_nodes_with_options
   - Set maxDepth: 3 for faster scanning
   - Use returnPartialOnTimeout: true to get partial results

3. Optimize Text Updates:
   - Group updates by parent node
   - Use set_multiple_text_contents for bulk updates
   - Use update_text_preserve_formatting to maintain styles
   - Use set_multiple_text_contents_with_styles for text + formatting

4. Monitor Performance:
   - Check get_connection_status if operations are slow
   - Use execute_batch for mixed operations
   - Batch similar operations together

5. Common Formulas:
   - Grid Y-position: y = baseY + (rowIndex * spacing)
   - Grid X-position: x = baseX + (colIndex * spacing)
   - Example: y = 173 + (442 * row_number)`
      }
    }]
  })
);

// Error recovery guide prompt
server.prompt(
  "error_recovery_guide", 
  "How to handle common errors and timeouts in Figma operations",
  () => ({
    messages: [{
      role: "assistant",
      content: {
        type: "text",
        text: `Common Figma operation errors and solutions:

1. Timeout Errors:
   - scan_text_nodes timeout → Use scan_nodes_with_options with maxDepth:3
   - Large document timeout → Break into smaller operations
   - Connection timeout → Check get_connection_status, rejoin channel
   
   Example fix for scan timeout:
   scan_nodes_with_options({
     nodeId: "1:2",
     options: {
       maxDepth: 3,
       nodeTypes: ["TEXT"],
       timeout: 30000,
       returnPartialOnTimeout: true
     }
   })

2. Node Not Found:
   - Verify node exists with get_node_info
   - Check if node was deleted
   - Ensure using correct parent ID

3. Text Update Failures:
   - Silent failures → Validate node is TEXT type first
   - Formatting loss → Use update_text_preserve_formatting
   - Mixed fonts → Handle with font loading strategies
   - Character limit → Check text length before update

4. Batch Operation Errors:
   - Use execute_batch with stopOnError:false
   - Check individual operation results
   - Retry failed operations individually

5. Performance Issues:
   - Monitor with get_connection_status
   - Reduce batch sizes if operations fail
   - Use shallow scanning for large documents
   - Process in chunks for better progress tracking`
      }
    }]
  })
);

// Text formatting best practices prompt
server.prompt(
  "text_formatting_guide",
  "Best practices for updating text while preserving formatting",
  () => ({
    messages: [{
      role: "assistant", 
      content: {
        type: "text",
        text: `When updating text in Figma, preserve formatting using these strategies:

1. Preserve Formatting on Updates:
   - Use update_text_preserve_formatting instead of set_text_content
   - Choose strategy: "stretch", "repeat", or "reset_overflow"
   - For templates, capture formatting first with get_styled_text_segments

2. Batch Updates with Styles:
   - Use set_multiple_text_contents_with_styles for efficiency
   - Apply text and formatting in one operation
   - Reduces API calls by 50%+

3. Smart Replacements:
   - Use smart_text_replace for find/replace operations
   - Preserves formatting of unchanged text
   - Ideal for updating template placeholders

4. Formatting Strategies:
   - "stretch": Proportionally extend formatting (good for similar length)
   - "repeat": Repeat pattern for longer text
   - "reset_overflow": Keep existing, use defaults for new

5. Common Patterns:
   // Update template with formatting preserved
   update_text_preserve_formatting({
     nodeId: "123:45",
     newText: "New Product Launch 2024",
     preserveFormattingStrategy: "stretch"
   })
   
   // Smart find/replace
   smart_text_replace({
     nodeId: "123:45",
     replacements: [
       {find: "{TITLE}", replace: "My Title"},
       {find: "{DATE}", replace: "2024"}
     ]
   })
   
   // Batch update with styles
   set_multiple_text_contents_with_styles({
     nodeId: parentId,
     updates: [{
       nodeId: "123:45",
       text: "Bold Title",
       styles: [{start: 0, end: 4, bold: true}]
     }]
   })`
      }
    }]
  })
);


// Define command types and parameters
type FigmaCommand =
  | "get_document_info"
  | "get_selection"
  | "get_node_info"
  | "get_nodes_info"
  | "read_my_design"
  | "create_rectangle"
  | "create_frame"
  | "create_text"
  | "set_fill_color"
  | "set_stroke_color"
  | "move_node"
  | "resize_node"
  | "delete_node"
  | "delete_multiple_nodes"
  | "get_styles"
  | "get_local_components"
  | "create_component_instance"
  | "get_instance_overrides"
  | "set_instance_overrides"
  | "export_node_as_image"
  | "join"
  | "set_corner_radius"
  | "clone_node"
  | "set_text_content"
  | "scan_text_nodes"
  | "set_multiple_text_contents"
  | "get_annotations"
  | "set_annotation"
  | "set_multiple_annotations"
  | "scan_nodes_by_types"
  | "set_layout_mode"
  | "set_padding"
  | "set_axis_align"
  | "set_layout_sizing"
  | "set_item_spacing"
  | "get_reactions"
  | "set_default_connector"
  | "create_connections"
  | "create_slide"
  | "create_slide_row"
  | "set_slide_grid"
  | "get_focused_slide"
  | "get_slide_transition"
  | "set_slide_transition"
  | "get_slides_mode"
  | "set_slides_mode"
  | "get_slide_grid"
  | "create_shape_with_text"
  | "create_table"
  | "create_gif"
  | "set_text_style_range"
  | "get_text_style_range"
  | "set_text_decoration_range"
  | "get_text_decoration_range"
  | "set_range_font"
  | "set_range_font_size"
  | "set_range_fills"
  | "get_styled_text_segments"
  | "set_component_description"
  | "get_component_description"
  | "normalize_markdown"
  | "update_text_preserve_formatting"
  | "smart_text_replace"
  | "set_multiple_text_contents_with_styles"
  | "clone_multiple_nodes"
  | "get_multiple_nodes_info"
  | "set_multiple_nodes_property"
  | "scan_nodes_with_options"
  | "get_connection_status"
  | "execute_batch";

type CommandParams = {
  get_document_info: Record<string, never>;
  get_selection: Record<string, never>;
  get_node_info: { nodeId: string };
  get_nodes_info: { nodeIds: string[] };
  create_rectangle: {
    x: number;
    y: number;
    width: number;
    height: number;
    name?: string;
    parentId?: string;
  };
  create_frame: {
    x: number;
    y: number;
    width: number;
    height: number;
    name?: string;
    parentId?: string;
    fillColor?: { r: number; g: number; b: number; a?: number };
    strokeColor?: { r: number; g: number; b: number; a?: number };
    strokeWeight?: number;
  };
  create_text: {
    x: number;
    y: number;
    text: string;
    fontSize?: number;
    fontWeight?: number;
    fontColor?: { r: number; g: number; b: number; a?: number };
    name?: string;
    parentId?: string;
  };
  set_fill_color: {
    nodeId: string;
    r: number;
    g: number;
    b: number;
    a?: number;
  };
  set_stroke_color: {
    nodeId: string;
    r: number;
    g: number;
    b: number;
    a?: number;
    weight?: number;
  };
  move_node: {
    nodeId: string;
    x: number;
    y: number;
  };
  resize_node: {
    nodeId: string;
    width: number;
    height: number;
  };
  delete_node: {
    nodeId: string;
  };
  delete_multiple_nodes: {
    nodeIds: string[];
  };
  get_styles: Record<string, never>;
  get_local_components: Record<string, never>;
  get_team_components: Record<string, never>;
  create_component_instance: {
    componentKey: string;
    x: number;
    y: number;
  };
  get_instance_overrides: {
    instanceNodeId: string | null;
  };
  set_instance_overrides: {
    targetNodeIds: string[];
    sourceInstanceId: string;
  };
  export_node_as_image: {
    nodeId: string;
    format?: "PNG" | "JPG" | "SVG" | "PDF";
    scale?: number;
  };
  execute_code: {
    code: string;
  };
  join: {
    channel: string;
  };
  set_corner_radius: {
    nodeId: string;
    radius: number;
    corners?: boolean[];
  };
  clone_node: {
    nodeId: string;
    x?: number;
    y?: number;
  };
  set_text_content: {
    nodeId: string;
    text: string;
  };
  scan_text_nodes: {
    nodeId: string;
    useChunking: boolean;
    chunkSize: number;
  };
  set_multiple_text_contents: {
    nodeId: string;
    text: Array<{ nodeId: string; text: string }>;
  };
  get_annotations: {
    nodeId?: string;
    includeCategories?: boolean;
  };
  set_annotation: {
    nodeId: string;
    annotationId?: string;
    labelMarkdown: string;
    categoryId?: string;
    properties?: Array<{ type: string }>;
  };
  set_multiple_annotations: SetMultipleAnnotationsParams;
  scan_nodes_by_types: {
    nodeId: string;
    types: Array<string>;
  };
  get_reactions: { nodeIds: string[] };
  set_default_connector: {
    connectorId?: string | undefined;
  };
  create_connections: {
    connections: Array<{
      startNodeId: string;
      endNodeId: string;
      text?: string;
    }>;
  };
  create_slide: {
    name?: string;
    parentId?: string;
    fillColor?: { r: number; g: number; b: number; a?: number };
    strokeColor?: { r: number; g: number; b: number; a?: number };
    strokeWeight?: number;
  };
  create_slide_row: {
    name?: string;
    parentId?: string;
  };
  set_slide_grid: {
    slides: string[][];
  };
  get_focused_slide: Record<string, never>;
  get_slide_transition: {
    slideId: string;
  };
  set_slide_transition: {
    slideId: string;
    transition: {
      style?: string;
      duration?: number;
      curve?: string;
      timing?: {
        type: 'ON_CLICK' | 'AFTER_DELAY';
        delay?: number;
      };
    };
  };
  get_slides_mode: Record<string, never>;
  set_slides_mode: {
    mode: 'grid' | 'single-slide';
  };
  get_slide_grid: Record<string, never>;
  create_shape_with_text: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    shapeType?: string;
    text?: string;
    fillColor?: { r: number; g: number; b: number; a?: number };
    strokeColor?: { r: number; g: number; b: number; a?: number };
    strokeWeight?: number;
    fontSize?: string;
    fontWeight?: string;
    fontColor?: { r: number; g: number; b: number; a?: number };
    name?: string;
    parentId?: string;
  };
  create_table: {
    x?: number;
    y?: number;
    rows?: number;
    columns?: number;
    cellWidth?: number;
    cellHeight?: number;
    name?: string;
    parentId?: string;
  };
  create_gif: {
    url: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    name?: string;
    parentId?: string;
  };
  set_text_style_range: {
    nodeId: string;
    start: number;
    end: number;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
  };
  get_text_style_range: {
    nodeId: string;
    start: number;
    end: number;
  };
  set_text_decoration_range: {
    nodeId: string;
    start: number;
    end: number;
    style?: string;
    color?: { r: number; g: number; b: number; a?: number };
    thickness?: string;
    offset?: string;
    skipInk?: boolean;
  };
  get_text_decoration_range: {
    nodeId: string;
    start: number;
    end: number;
  };
  set_range_font: {
    nodeId: string;
    start: number;
    end: number;
    fontFamily: string;
    fontStyle?: string;
  };
  set_range_font_size: {
    nodeId: string;
    start: number;
    end: number;
    fontSize: number;
  };
  set_range_fills: {
    nodeId: string;
    start: number;
    end: number;
    color: { r: number; g: number; b: number; a?: number };
  };
  get_styled_text_segments: {
    nodeId: string;
    fields: string[];
    start?: number;
    end?: number;
  };
  set_component_description: {
    nodeId: string;
    descriptionMarkdown: string;
  };
  get_component_description: {
    nodeId: string;
  };
  normalize_markdown: {
    markdown: string;
  };
  update_text_preserve_formatting: {
    nodeId: string;
    newText: string;
    preserveFormattingStrategy?: "stretch" | "repeat" | "reset_overflow";
  };
  smart_text_replace: {
    nodeId: string;
    replacements: Array<{
      find: string;
      replace: string;
      matchCase?: boolean;
    }>;
  };
  set_multiple_text_contents_with_styles: {
    nodeId: string;
    updates: Array<{
      nodeId: string;
      text: string;
      styles?: Array<{
        start: number;
        end: number;
        bold?: boolean;
        italic?: boolean;
        fontSize?: number;
        fontFamily?: string;
        fontStyle?: string;
        fills?: any[];
      }>;
    }>;
  };
  clone_multiple_nodes: {
    sourceNodeId: string;
    positions: Array<{
      x: number;
      y: number;
    }>;
    parentId?: string;
  };
  get_multiple_nodes_info: {
    nodeIds: string[];
  };
  set_multiple_nodes_property: {
    nodeIds: string[];
    property: string;
    value: any;
  };
  scan_nodes_with_options: {
    nodeId: string;
    options?: {
      maxDepth?: number;
      nodeTypes?: string[];
      timeout?: number;
      returnPartialOnTimeout?: boolean;
      includeHidden?: boolean;
    };
  };
  get_connection_status: Record<string, never>;
  execute_batch: {
    commands: Array<{
      command: string;
      params: any;
    }>;
    stopOnError?: boolean;
  };
};


  // Helper function to process Figma node responses
function processFigmaNodeResponse(result: unknown): any {
  if (!result || typeof result !== "object") {
    return result;
  }

  // Check if this looks like a node response
  const resultObj = result as Record<string, unknown>;
  if ("id" in resultObj && typeof resultObj.id === "string") {
    // It appears to be a node response, log the details
    console.info(
      `Processed Figma node: ${resultObj.name || "Unknown"} (ID: ${resultObj.id
      })`
    );

    if ("x" in resultObj && "y" in resultObj) {
      console.debug(`Node position: (${resultObj.x}, ${resultObj.y})`);
    }

    if ("width" in resultObj && "height" in resultObj) {
      console.debug(`Node dimensions: ${resultObj.width}×${resultObj.height}`);
    }
  }

  return result;
}

// Update the connectToFigma function
function connectToFigma(port: number = 3055) {
  // If already connected, do nothing
  if (ws && ws.readyState === WebSocket.OPEN) {
    logger.info('Already connected to Figma');
    return;
  }

  const wsUrl = serverUrl === 'localhost' ? `${WS_URL}:${port}` : WS_URL;
  logger.info(`Connecting to Figma socket server at ${wsUrl}...`);
  ws = new WebSocket(wsUrl);

  ws.on('open', () => {
    logger.info('Connected to Figma socket server');
    // Reset channel on new connection
    currentChannel = null;
  });

  ws.on("message", (data: any) => {
    try {
      // Define a more specific type with an index signature to allow any property access
      interface ProgressMessage {
        message: FigmaResponse | any;
        type?: string;
        id?: string;
        [key: string]: any; // Allow any other properties
      }

      const json = JSON.parse(data) as ProgressMessage;

      // Handle progress updates
      if (json.type === 'progress_update') {
        const progressData = json.message.data as CommandProgressUpdate;
        const requestId = json.id || '';

        if (requestId && pendingRequests.has(requestId)) {
          const request = pendingRequests.get(requestId)!;

          // Update last activity timestamp
          request.lastActivity = Date.now();

          // Reset the timeout to prevent timeouts during long-running operations
          clearTimeout(request.timeout);

          // Create a new timeout
          request.timeout = setTimeout(() => {
            if (pendingRequests.has(requestId)) {
              logger.error(`Request ${requestId} timed out after extended period of inactivity`);
              pendingRequests.delete(requestId);
              request.reject(new Error('Request to Figma timed out'));
            }
          }, 60000); // 60 second timeout for inactivity

          // Log progress
          logger.info(`Progress update for ${progressData.commandType}: ${progressData.progress}% - ${progressData.message}`);

          // For completed updates, we could resolve the request early if desired
          if (progressData.status === 'completed' && progressData.progress === 100) {
            // Optionally resolve early with partial data
            // request.resolve(progressData.payload);
            // pendingRequests.delete(requestId);

            // Instead, just log the completion, wait for final result from Figma
            logger.info(`Operation ${progressData.commandType} completed, waiting for final result`);
          }
        }
        return;
      }

      // Handle regular responses
      const myResponse = json.message;
      logger.debug(`Received message: ${JSON.stringify(myResponse)}`);
      logger.log('myResponse' + JSON.stringify(myResponse));

      // Handle response to a request
      if (
        myResponse.id &&
        pendingRequests.has(myResponse.id) &&
        myResponse.result
      ) {
        const request = pendingRequests.get(myResponse.id)!;
        clearTimeout(request.timeout);

        if (myResponse.error) {
          logger.error(`Error from Figma: ${myResponse.error}`);
          request.reject(new Error(myResponse.error));
        } else {
          if (myResponse.result) {
            request.resolve(myResponse.result);
          }
        }

        pendingRequests.delete(myResponse.id);
      } else {
        // Handle broadcast messages or events
        logger.info(`Received broadcast message: ${JSON.stringify(myResponse)}`);
      }
    } catch (error) {
      logger.error(`Error parsing message: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  ws.on('error', (error: Error) => {
    logger.error(`Socket error: ${error}`);
  });

  ws.on('close', () => {
    logger.info('Disconnected from Figma socket server');
    ws = null;

    // Reject all pending requests
    for (const [id, request] of pendingRequests.entries()) {
      clearTimeout(request.timeout);
      request.reject(new Error("Connection closed"));
      pendingRequests.delete(id);
    }

    // Attempt to reconnect
    logger.info('Attempting to reconnect in 2 seconds...');
    setTimeout(() => connectToFigma(port), 2000);
  });
}

// Function to join a channel
async function joinChannel(channelName: string): Promise<void> {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    throw new Error("Not connected to Figma");
  }

  try {
    await sendCommandToFigma("join", { channel: channelName });
    currentChannel = channelName;
    logger.info(`Joined channel: ${channelName}`);
  } catch (error) {
    logger.error(`Failed to join channel: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

// Function to send commands to Figma
function sendCommandToFigma(
  command: FigmaCommand,
  params: unknown = {},
  timeoutMs: number = 30000
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    // If not connected, try to connect first
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      connectToFigma();
      reject(CommonErrors.connectionFailed("WebSocket is not connected"));
      return;
    }

    // Check if we need a channel for this command
    const requiresChannel = command !== "join";
    if (requiresChannel && !currentChannel) {
      reject(createErrorResponse(
        ErrorCodes.CHANNEL_NOT_JOINED,
        "Must join a channel before sending commands",
        {
          suggestions: [
            'Use the join_channel tool to connect to a channel first',
            'Ensure the Figma plugin is running and showing the channel name'
          ]
        }
      ));
      return;
    }

    const id = uuidv4();
    const request = {
      id,
      type: command === "join" ? "join" : "message",
      ...(command === "join"
        ? { channel: (params as any).channel }
        : { channel: currentChannel }),
      message: {
        id,
        command,
        params: {
          ...(params as any),
          commandId: id, // Include the command ID in params
        },
      },
    };

    // Set timeout for request
    const timeout = setTimeout(() => {
      if (pendingRequests.has(id)) {
        pendingRequests.delete(id);
        logger.error(`Request ${id} to Figma timed out after ${timeoutMs / 1000} seconds`);
        reject(CommonErrors.operationTimeout(command));
      }
    }, timeoutMs);

    // Store the promise callbacks to resolve/reject later
    pendingRequests.set(id, {
      resolve,
      reject,
      timeout,
      lastActivity: Date.now()
    });

    // Send the request
    logger.info(`Sending command to Figma: ${command}`);
    logger.debug(`Request details: ${JSON.stringify(request)}`);
    ws.send(JSON.stringify(request));
  });
}

// Create Slide Tool (Figma Slides only)
server.tool(
  "create_slide",
  "Create a new slide in Figma Slides",
  {
    name: z.string().optional().describe("Optional name for the slide"),
    parentId: z
      .string()
      .optional()
      .describe("Optional parent SLIDE_ROW ID to append the slide to"),
    fillColor: z
      .object({
        r: z.number().min(0).max(1).describe("Red component (0-1)"),
        g: z.number().min(0).max(1).describe("Green component (0-1)"),
        b: z.number().min(0).max(1).describe("Blue component (0-1)"),
        a: z
          .number()
          .min(0)
          .max(1)
          .optional()
          .describe("Alpha component (0-1)"),
      })
      .optional()
      .describe("Fill color in RGBA format"),
    strokeColor: z
      .object({
        r: z.number().min(0).max(1).describe("Red component (0-1)"),
        g: z.number().min(0).max(1).describe("Green component (0-1)"),
        b: z.number().min(0).max(1).describe("Blue component (0-1)"),
        a: z
          .number()
          .min(0)
          .max(1)
          .optional()
          .describe("Alpha component (0-1)"),
      })
      .optional()
      .describe("Stroke color in RGBA format"),
    strokeWeight: z.number().positive().optional().describe("Stroke weight"),
  },
  async ({ name, parentId, fillColor, strokeColor, strokeWeight }) => {
    try {
      const response = await sendCommandToFigma("create_slide", {
        name,
        parentId,
        fillColor,
        strokeColor,
        strokeWeight,
      });

      return {
        content: [
          {
            type: "text",
            text: `Created slide: ${JSON.stringify(response)}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to create slide: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

// Create Slide Row Tool (Figma Slides only)
server.tool(
  "create_slide_row",
  "Create a new slide row in Figma Slides",
  {
    name: z.string().optional().describe("Optional name for the slide row"),
    parentId: z
      .string()
      .optional()
      .describe("Optional parent node ID to append the slide row to"),
  },
  async ({ name, parentId }) => {
    try {
      const response = await sendCommandToFigma("create_slide_row", {
        name,
        parentId,
      });

      return {
        content: [
          {
            type: "text",
            text: `Created slide row: ${JSON.stringify(response)}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to create slide row: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

// Set Slide Grid Tool (Figma Slides only)
server.tool(
  "set_slide_grid",
  "Rearrange slides into a grid layout in Figma Slides",
  {
    slides: z
      .array(z.array(z.string()))
      .describe(
        "2D array of slide IDs representing the grid layout. Each inner array represents a row of slides."
      ),
  },
  async ({ slides }) => {
    try {
      const response = await sendCommandToFigma("set_slide_grid", {
        slides,
      });

      return {
        content: [
          {
            type: "text",
            text: `Slide grid updated: ${JSON.stringify(response)}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to set slide grid: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

// Get Focused Slide Tool (DEPRECATED - Use get_current_context instead)
server.tool(
  "get_focused_slide",
  "[DEPRECATED] Get the currently focused slide in Figma Slides. Use 'get_current_context' instead.",
  {},
  async () => {
    // Redirect to get_current_context with deprecation notice
    console.warn('[DEPRECATION] get_focused_slide is deprecated. Use get_current_context instead.');
    
    try {
      const response = await sendCommandToFigma("get_focused_slide", {});

      return {
        content: [
          {
            type: "text",
            text: `Focused slide: ${JSON.stringify(response)}`,
          },
          {
            type: "text",
            text: "\n⚠️ DEPRECATION WARNING: get_focused_slide is deprecated. Please use get_current_context({includeSlideDetails: true}) instead."
          }
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to get focused slide: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Use get_current_context instead of get_focused_slide',
            'The new tool provides focused slide plus selection and mode',
            'Example: get_current_context({includeSlideDetails: true})'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Get Slide Transition Tool (Figma Slides only)
server.tool(
  "get_slide_transition",
  "Get the transition settings for a slide in Figma Slides",
  {
    slideId: z.string().describe("The ID of the slide"),
  },
  async ({ slideId }) => {
    try {
      const response = await sendCommandToFigma("get_slide_transition", {
        slideId,
      });

      return {
        content: [
          {
            type: "text",
            text: `Slide transition: ${JSON.stringify(response)}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get slide transition: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

// Set Slide Transition Tool (Figma Slides only)
server.tool(
  "set_slide_transition",
  "Set the transition for a slide in Figma Slides",
  {
    slideId: z.string().describe("The ID of the slide"),
    transition: z.object({
      style: z.enum([
        'NONE', 'DISSOLVE', 'SLIDE_FROM_LEFT', 'SLIDE_FROM_RIGHT',
        'SLIDE_FROM_TOP', 'SLIDE_FROM_BOTTOM', 'PUSH_FROM_LEFT',
        'PUSH_FROM_RIGHT', 'PUSH_FROM_TOP', 'PUSH_FROM_BOTTOM',
        'MOVE_FROM_LEFT', 'MOVE_FROM_RIGHT', 'MOVE_FROM_TOP',
        'MOVE_FROM_BOTTOM', 'SLIDE_OUT_TO_LEFT', 'SLIDE_OUT_TO_RIGHT',
        'SLIDE_OUT_TO_TOP', 'SLIDE_OUT_TO_BOTTOM', 'MOVE_OUT_TO_LEFT',
        'MOVE_OUT_TO_RIGHT', 'MOVE_OUT_TO_TOP', 'MOVE_OUT_TO_BOTTOM',
        'SMART_ANIMATE'
      ]).optional().describe("Transition style"),
      duration: z.number().min(0.01).max(10).optional().describe("Duration in seconds (0.01-10)"),
      curve: z.enum([
        'LINEAR', 'EASE_IN', 'EASE_OUT', 'EASE_IN_AND_OUT',
        'EASE_IN_BACK', 'EASE_OUT_BACK', 'EASE_IN_AND_OUT_BACK'
      ]).optional().describe("Animation curve"),
      timing: z.object({
        type: z.enum(['ON_CLICK', 'AFTER_DELAY']).describe("Timing type"),
        delay: z.number().min(0).max(30).optional().describe("Delay in seconds (0-30)"),
      }).optional().describe("Timing configuration"),
    }).describe("Transition configuration"),
  },
  async ({ slideId, transition }) => {
    try {
      const response = await sendCommandToFigma("set_slide_transition", {
        slideId,
        transition,
      });

      return {
        content: [
          {
            type: "text",
            text: `Slide transition updated: ${JSON.stringify(response)}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to set slide transition: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

// Get Slides Mode Tool (DEPRECATED - Use get_current_context instead)
server.tool(
  "get_slides_mode",
  "[DEPRECATED] Get the current viewport mode in Figma Slides. Use 'get_current_context' instead.",
  {},
  async () => {
    // Redirect to get_current_context with deprecation notice
    console.warn('[DEPRECATION] get_slides_mode is deprecated. Use get_current_context instead.');
    
    try {
      const response = await sendCommandToFigma("get_slides_mode", {});

      return {
        content: [
          {
            type: "text",
            text: `Current slides mode: ${JSON.stringify(response)}`,
          },
          {
            type: "text",
            text: "\n⚠️ DEPRECATION WARNING: get_slides_mode is deprecated. Please use get_current_context({includeSlideDetails: true}) instead."
          }
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to get slides mode: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Use get_current_context instead of get_slides_mode',
            'The new tool provides slides mode plus selection and focused slide',
            'Example: get_current_context({includeSlideDetails: true})'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Set Slides Mode Tool (Figma Slides only)
server.tool(
  "set_slides_mode",
  "Set the viewport mode in Figma Slides",
  {
    mode: z.enum(['grid', 'single-slide']).describe("Viewport mode"),
  },
  async ({ mode }) => {
    try {
      const response = await sendCommandToFigma("set_slides_mode", {
        mode,
      });

      return {
        content: [
          {
            type: "text",
            text: `Slides mode set to: ${mode}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to set slides mode: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

// Get Slide Grid Tool (Figma Slides only)
server.tool(
  "get_slide_grid",
  "Get the current slide grid arrangement in Figma Slides",
  {},
  async () => {
    try {
      const response = await sendCommandToFigma("get_slide_grid", {});

      return {
        content: [
          {
            type: "text",
            text: `Slide grid: ${JSON.stringify(response)}`,
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to get slide grid: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Ensure you are in Figma Slides mode',
            'Check if the document has slides',
            'Verify the Figma plugin is running'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Extract Slide Content Composite Tool
server.tool(
  "extract_slide_content",
  "Extract all content from a Figma slide including text, tables, and optionally images",
  {
    slideId: z.string().describe("ID of the slide to extract content from"),
    includeImages: z.boolean().optional().describe("Include image data in extraction (default: false)"),
    outputFormat: z.enum(["raw", "structured"]).optional().describe("Output format: raw text or structured JSON (default: structured)"),
    textOnly: z.boolean().optional().describe("Extract only text content, skip tables and images (default: false)")
  },
  async ({ slideId, includeImages = false, outputFormat = "structured", textOnly = false }) => {
    try {
      const content: any = {
        slideId,
        text: [],
        tables: [],
        images: [],
        metadata: {}
      };
      
      // First, get slide info to validate it exists
      try {
        const slideInfo = await sendCommandToFigma("get_node_info", { nodeId: slideId }) as any;
        if (!slideInfo || slideInfo.type !== "SLIDE") {
          throw new Error("Node is not a slide");
        }
        content.metadata = {
          name: slideInfo.name || "",
          width: slideInfo.width || 0,
          height: slideInfo.height || 0
        };
      } catch (error) {
        return formatErrorForMCP(CommonErrors.nodeNotFound(slideId));
      }
      
      // Scan for all content nodes in the slide
      const scanOptions = {
        maxDepth: -1,
        nodeTypes: textOnly ? ["TEXT"] : ["TEXT", "TABLE", "RECTANGLE", "FRAME"],
        timeout: 10000,
        returnPartialOnTimeout: true
      };
      
      const scanResult = await sendCommandToFigma("scan_nodes_with_options", {
        nodeId: slideId,
        options: scanOptions
      }) as any;
      
      if (scanResult.nodes && scanResult.nodes.length > 0) {
        // Process each node type
        for (const node of scanResult.nodes) {
          if (node.type === "TEXT" && node.characters) {
            content.text.push({
              id: node.id,
              text: node.characters,
              name: node.name
            });
          } else if (node.type === "TABLE" && !textOnly) {
            // Get detailed table data
            try {
              const tableData = await sendCommandToFigma("get_node_info", { nodeId: node.id });
              const tableContent = extractTableData(tableData);
              if (tableContent) {
                content.tables.push({
                  id: node.id,
                  name: node.name,
                  data: tableContent
                });
              }
            } catch (error) {
              // Continue with partial results
            }
          } else if ((node.type === "RECTANGLE" || node.type === "FRAME") && includeImages && !textOnly) {
            // Check if it might be an image
            if (node.name && (node.name.toLowerCase().includes("image") || node.name.toLowerCase().includes("img"))) {
              content.images.push({
                id: node.id,
                name: node.name,
                type: node.type,
                bounds: node.absoluteBoundingBox
              });
            }
          }
        }
      }
      
      // Format output based on preference
      if (outputFormat === "raw") {
        // Combine all text content into a single string
        const rawText = content.text.map((t: any) => t.text).join("\n\n");
        const tableText = content.tables.map((t: any) => 
          `Table: ${t.name}\n${formatTableAsText(t.data)}`
        ).join("\n\n");
        
        return {
          content: [{
            type: "text",
            text: [rawText, tableText].filter(Boolean).join("\n\n")
          }]
        };
      } else {
        // Return structured data
        return {
          content: [{
            type: "text",
            text: JSON.stringify(content, null, 2)
          }]
        };
      }
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to extract slide content: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId: slideId,
          suggestions: [
            'Verify the slide ID is correct',
            'Ensure you are in Figma Slides mode',
            'Check if you have access to the slide'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Helper function to extract table data
function extractTableData(tableNode: any): any[][] | null {
  if (!tableNode || !tableNode.children) return null;
  
  const rows: any[][] = [];
  const cells = tableNode.children.filter((child: any) => child.type === "TABLE_CELL");
  
  if (cells.length === 0) return null;
  
  // Group cells by row (assuming they're ordered)
  cells.forEach((cell: any) => {
    if (cell.characters !== undefined) {
      // Parse cell ID to get row/column (format: T[tableId];[row];[col])
      const match = cell.id.match(/T[^;]+;(\d+);(\d+)/);
      if (match) {
        const row = parseInt(match[1]);
        const col = parseInt(match[2]);
        
        if (!rows[row]) rows[row] = [];
        rows[row][col] = cell.characters;
      }
    }
  });
  
  return rows.filter(row => row && row.length > 0);
}

// Helper function to format table as text
function formatTableAsText(data: any[][]): string {
  if (!data || data.length === 0) return "";
  
  return data.map(row => 
    row.map(cell => cell || "").join(" | ")
  ).join("\n");
}

// Get Presentation Summary Composite Tool
server.tool(
  "get_presentation_summary",
  "Generate an overview of a Figma presentation including slide count, slide titles, and optionally an outline summarizing key points",
  {
    includeOutline: z.boolean().optional().describe("Include an outline with key points from each slide (default: true)"),
    maxTextPreview: z.number().optional().describe("Maximum characters of text to include per slide in outline (default: 200)"),
    includeEmptySlides: z.boolean().optional().describe("Include slides with no content in the summary (default: false)")
  },
  async ({ includeOutline = true, maxTextPreview = 200, includeEmptySlides = false }) => {
    try {
      // First check if we're in slides mode
      const slidesInfo = await sendCommandToFigma("get_slides_mode", {}) as any;
      
      if (!slidesInfo.inSlidesMode) {
        const errorResponse = createErrorResponse(
          ErrorCodes.OPERATION_FAILED,
          "Not in Figma Slides mode. This tool requires an active presentation.",
          {
            suggestions: [
              'Switch to Figma Slides mode first',
              'Open a presentation in Figma',
              'Use get_document_info for regular Figma documents'
            ]
          }
        );
        return formatErrorForMCP(errorResponse);
      }
      
      // Get all slides
      const documentInfo = await sendCommandToFigma("get_document_info", {}) as any;
      const slidesNode = documentInfo.children?.find((child: any) => child.type === "SLIDES");
      
      if (!slidesNode || !slidesNode.children) {
        const errorResponse = createErrorResponse(
          ErrorCodes.OPERATION_FAILED,
          "No slides found in the presentation",
          {
            suggestions: [
              'Ensure the presentation has at least one slide',
              'Check if you have access to the presentation',
              'Try refreshing the document'
            ]
          }
        );
        return formatErrorForMCP(errorResponse);
      }
      
      const slides = slidesNode.children.filter((child: any) => child.type === "SLIDE");
      const summary: any = {
        presentationName: documentInfo.name || "Untitled Presentation",
        totalSlides: slides.length,
        focusedSlideId: slidesInfo.currentSlideId || null,
        slides: []
      };
      
      // Process each slide
      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        const slideInfo: any = {
          index: i + 1,
          id: slide.id,
          title: slide.name || `Slide ${i + 1}`,
          hasContent: false
        };
        
        if (includeOutline) {
          try {
            // Get content from each slide
            const scanResult = await sendCommandToFigma("scan_nodes_with_options", {
              nodeId: slide.id,
              options: {
                maxDepth: 3,
                nodeTypes: ["TEXT"],
                timeout: 2000,
                returnPartialOnTimeout: true
              }
            }) as any;
            
            if (scanResult.nodes && scanResult.nodes.length > 0) {
              slideInfo.hasContent = true;
              
              // Extract key points from text nodes
              const textNodes = scanResult.nodes.filter((node: any) => node.characters);
              const allText = textNodes.map((node: any) => node.characters).join(" ");
              
              if (allText.trim()) {
                // Create a preview/summary of the slide content
                slideInfo.keyPoints = [];
                
                // Look for bullet points or numbered lists
                const bulletMatches = allText.match(/[•·\-*]\s*([^\n•·\-*]+)/g);
                const numberMatches = allText.match(/\d+\.\s*([^\n]+)/g);
                
                if (bulletMatches || numberMatches) {
                  const points = [...(bulletMatches || []), ...(numberMatches || [])]
                    .map(point => point.replace(/^[•·\-*\d.]\s*/, '').trim())
                    .filter(point => point.length > 5)
                    .slice(0, 5);
                  
                  if (points.length > 0) {
                    slideInfo.keyPoints = points;
                  }
                }
                
                // If no bullet points found, use first few sentences
                if (slideInfo.keyPoints.length === 0) {
                  const preview = allText.substring(0, maxTextPreview).trim();
                  if (preview) {
                    slideInfo.textPreview = preview + (allText.length > maxTextPreview ? "..." : "");
                  }
                }
                
                // Count specific content types
                slideInfo.contentStats = {
                  textNodes: textNodes.length,
                  totalCharacters: allText.length
                };
              }
            }
          } catch (error) {
            // Continue with partial results
            slideInfo.scanError = true;
          }
        }
        
        // Only include slide if it has content or includeEmptySlides is true
        if (slideInfo.hasContent || includeEmptySlides) {
          summary.slides.push(slideInfo);
        }
      }
      
      // Generate executive summary
      if (includeOutline) {
        const slidesWithContent = summary.slides.filter((s: any) => s.hasContent);
        summary.executiveSummary = {
          slidesWithContent: slidesWithContent.length,
          emptySlides: slides.length - slidesWithContent.length,
          averageContentPerSlide: slidesWithContent.length > 0 
            ? Math.round(slidesWithContent.reduce((sum: number, slide: any) => 
                sum + (slide.contentStats?.totalCharacters || 0), 0) / slidesWithContent.length)
            : 0
        };
      }
      
      return {
        content: [{
          type: "text",
          text: JSON.stringify(summary, null, 2)
        }]
      };
      
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to generate presentation summary: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Ensure you are in Figma Slides mode',
            'Check if the presentation is loaded',
            'Try reducing maxTextPreview if the operation times out'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Get Table Data Tool
server.tool(
  "get_table_data",
  "Extract data from a Figma table node in various formats (array, object, or CSV)",
  {
    tableId: z.string().describe("ID of the table node to extract data from"),
    outputFormat: z.enum(["array", "object", "csv"]).optional().describe("Output format for the table data (default: array)"),
    includeHeaders: z.boolean().optional().describe("Whether to include the first row as headers (default: true)"),
    headerRow: z.number().optional().describe("Which row to use as headers (0-based index, default: 0)"),
    cleanEmptyCells: z.boolean().optional().describe("Remove empty cells from output (default: true)")
  },
  async ({ tableId, outputFormat = "array", includeHeaders = true, headerRow = 0, cleanEmptyCells = true }) => {
    try {
      // Get the table node info
      const tableInfo = await sendCommandToFigma("get_node_info", { nodeId: tableId }) as any;
      
      if (!tableInfo || tableInfo.type !== "TABLE") {
        const errorResponse = createErrorResponse(
          ErrorCodes.OPERATION_FAILED,
          "Node is not a table",
          {
            nodeId: tableId,
            suggestions: [
              'Verify the node ID refers to a table',
              'Use scan_nodes_by_types with nodeTypes: ["TABLE"] to find tables',
              'Check if the node exists in the current document'
            ]
          }
        );
        return formatErrorForMCP(errorResponse);
      }
      
      // Extract cells from the table
      const cells = tableInfo.children?.filter((child: any) => child.type === "TABLE_CELL") || [];
      
      if (cells.length === 0) {
        return {
          content: [{
            type: "text",
            text: outputFormat === "csv" ? "" : JSON.stringify([], null, 2)
          }]
        };
      }
      
      // Parse cells into a 2D array
      const rows: any[][] = [];
      let maxRow = 0;
      let maxCol = 0;
      
      cells.forEach((cell: any) => {
        // Parse cell ID to get row/column (format: T[tableId];[row];[col])
        const match = cell.id.match(/T[^;]+;(\d+);(\d+)/);
        if (match) {
          const row = parseInt(match[1]);
          const col = parseInt(match[2]);
          maxRow = Math.max(maxRow, row);
          maxCol = Math.max(maxCol, col);
          
          if (!rows[row]) rows[row] = [];
          rows[row][col] = cell.characters !== undefined ? cell.characters : "";
        }
      });
      
      // Fill any missing cells with empty strings
      for (let r = 0; r <= maxRow; r++) {
        if (!rows[r]) rows[r] = [];
        for (let c = 0; c <= maxCol; c++) {
          if (rows[r][c] === undefined) rows[r][c] = "";
        }
      }
      
      // Clean empty rows if requested
      let finalRows = rows.filter(row => row && row.some(cell => cell !== ""));
      
      // Process based on output format
      let result: any;
      let headers: string[] = [];
      
      if (includeHeaders && finalRows.length > headerRow) {
        headers = finalRows[headerRow].map((h: any) => String(h).trim() || `Column${finalRows[headerRow].indexOf(h) + 1}`);
      }
      
      switch (outputFormat) {
        case "object":
          if (includeHeaders && headers.length > 0) {
            // Convert to array of objects using headers as keys
            const dataRows = finalRows.slice(headerRow + 1);
            result = dataRows.map(row => {
              const obj: any = {};
              headers.forEach((header, index) => {
                const value = row[index] || "";
                if (!cleanEmptyCells || value !== "") {
                  obj[header] = value;
                }
              });
              return obj;
            });
          } else {
            // Convert to array of objects with generic keys
            result = finalRows.map(row => {
              const obj: any = {};
              row.forEach((cell, index) => {
                if (!cleanEmptyCells || cell !== "") {
                  obj[`col${index + 1}`] = cell;
                }
              });
              return obj;
            });
          }
          break;
          
        case "csv":
          // Convert to CSV format
          const csvRows = finalRows.map(row => 
            row.map(cell => {
              // Escape quotes and wrap in quotes if contains comma, newline, or quotes
              const cellStr = String(cell);
              if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
                return '"' + cellStr.replace(/"/g, '""') + '"';
              }
              return cellStr;
            }).join(',')
          );
          result = csvRows.join('\n');
          break;
          
        case "array":
        default:
          // Return as 2D array
          result = cleanEmptyCells 
            ? finalRows.map(row => row.filter(cell => cell !== ""))
            : finalRows;
          break;
      }
      
      // Add metadata about the table
      const metadata = {
        tableId,
        tableName: tableInfo.name || "Untitled Table",
        rows: finalRows.length,
        columns: maxCol + 1,
        totalCells: cells.length,
        format: outputFormat
      };
      
      return {
        content: [{
          type: "text",
          text: outputFormat === "csv" 
            ? result 
            : JSON.stringify({
                metadata,
                headers: includeHeaders ? headers : undefined,
                data: result
              }, null, 2)
        }]
      };
      
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to extract table data: ${error instanceof Error ? error.message : String(error)}`,
        {
          nodeId: tableId,
          suggestions: [
            'Verify the table ID is correct',
            'Ensure the node is a TABLE type',
            'Check if you have access to the table'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

// Create Shape with Text Tool
server.tool(
  "create_shape_with_text",
  "Create a shape with text (available in Figma Slides and FigJam)",
  {
    x: z.number().optional().describe("X position"),
    y: z.number().optional().describe("Y position"),
    width: z.number().optional().describe("Width"),
    height: z.number().optional().describe("Height"),
    shapeType: z.string().optional().describe("Shape type (e.g., RECTANGLE, ELLIPSE)"),
    text: z.string().optional().describe("Text content"),
    fillColor: z.object({
      r: z.number().min(0).max(1).describe("Red component (0-1)"),
      g: z.number().min(0).max(1).describe("Green component (0-1)"),
      b: z.number().min(0).max(1).describe("Blue component (0-1)"),
      a: z.number().min(0).max(1).optional().describe("Alpha component (0-1)"),
    }).optional().describe("Fill color"),
    strokeColor: z.object({
      r: z.number().min(0).max(1).describe("Red component (0-1)"),
      g: z.number().min(0).max(1).describe("Green component (0-1)"),
      b: z.number().min(0).max(1).describe("Blue component (0-1)"),
      a: z.number().min(0).max(1).optional().describe("Alpha component (0-1)"),
    }).optional().describe("Stroke color"),
    strokeWeight: z.number().positive().optional().describe("Stroke weight"),
    fontSize: z.string().optional().describe("Font size"),
    fontWeight: z.string().optional().describe("Font weight"),
    fontColor: z.object({
      r: z.number().min(0).max(1).describe("Red component (0-1)"),
      g: z.number().min(0).max(1).describe("Green component (0-1)"),
      b: z.number().min(0).max(1).describe("Blue component (0-1)"),
      a: z.number().min(0).max(1).optional().describe("Alpha component (0-1)"),
    }).optional().describe("Text color"),
    name: z.string().optional().describe("Name of the shape"),
    parentId: z.string().optional().describe("Parent node ID"),
  },
  async (params) => {
    try {
      const response = await sendCommandToFigma("create_shape_with_text", params);

      return {
        content: [
          {
            type: "text",
            text: `Created shape with text: ${JSON.stringify(response)}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to create shape with text: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

// Create Table Tool
server.tool(
  "create_table",
  "Create a table (available in Figma Design and Slides)",
  {
    x: z.number().optional().describe("X position"),
    y: z.number().optional().describe("Y position"),
    rows: z.number().optional().describe("Number of rows"),
    columns: z.number().optional().describe("Number of columns"),
    cellWidth: z.number().optional().describe("Width of each cell"),
    cellHeight: z.number().optional().describe("Height of each cell"),
    name: z.string().optional().describe("Name of the table"),
    parentId: z.string().optional().describe("Parent node ID"),
  },
  async (params) => {
    try {
      const response = await sendCommandToFigma("create_table", params);

      return {
        content: [
          {
            type: "text",
            text: `Created table: ${JSON.stringify(response)}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to create table: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

// Create GIF Tool
server.tool(
  "create_gif",
  "Create a GIF (available in Figma Slides and FigJam)",
  {
    url: z.string().describe("URL of the GIF"),
    x: z.number().optional().describe("X position"),
    y: z.number().optional().describe("Y position"),
    width: z.number().optional().describe("Width"),
    height: z.number().optional().describe("Height"),
    name: z.string().optional().describe("Name of the GIF"),
    parentId: z.string().optional().describe("Parent node ID"),
  },
  async (params) => {
    try {
      const response = await sendCommandToFigma("create_gif", params);

      return {
        content: [
          {
            type: "text",
            text: `Created GIF: ${JSON.stringify(response)}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to create GIF: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

// Text styling tools

server.tool(
  "set_text_style_range",
  "Apply text styling (bold, italic, underline, strikethrough) to a specific range of text in a text node",
  {
    nodeId: z.string().describe("The ID of the text node"),
    start: z.number().describe("Start index of the range (inclusive)"),
    end: z.number().describe("End index of the range (exclusive)"),
    bold: z.boolean().optional().describe("Apply bold styling"),
    italic: z.boolean().optional().describe("Apply italic styling"),
    underline: z.boolean().optional().describe("Apply underline styling"),
    strikethrough: z.boolean().optional().describe("Apply strikethrough styling"),
  },
  async ({ nodeId, start, end, bold, italic, underline, strikethrough }) => {
    try {
      const result = await sendCommandToFigma("set_text_style_range", {
        nodeId,
        start,
        end,
        bold,
        italic,
        underline,
        strikethrough,
      });
      return {
        content: [
          {
            type: "text",
            text: `Applied text styling to range [${start}, ${end}) in node ${nodeId}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to set text style: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

server.tool(
  "get_text_style_range",
  "Get the text styling (bold, italic, underline, strikethrough) for a specific range of text",
  {
    nodeId: z.string().describe("The ID of the text node"),
    start: z.number().describe("Start index of the range (inclusive)"),
    end: z.number().describe("End index of the range (exclusive)"),
  },
  async ({ nodeId, start, end }) => {
    try {
      const result = await sendCommandToFigma("get_text_style_range", {
        nodeId,
        start,
        end,
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get text style: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

server.tool(
  "set_text_decoration_range",
  "Set advanced text decoration properties (style, color, thickness, offset) for a text range",
  {
    nodeId: z.string().describe("The ID of the text node"),
    start: z.number().describe("Start index of the range (inclusive)"),
    end: z.number().describe("End index of the range (exclusive)"),
    style: z.enum(["SOLID", "DOUBLE", "DOTTED", "DASHED", "WAVY"]).optional().describe("Decoration style"),
    color: z.object({
      r: z.number().min(0).max(1).describe("Red component (0-1)"),
      g: z.number().min(0).max(1).describe("Green component (0-1)"),
      b: z.number().min(0).max(1).describe("Blue component (0-1)"),
      a: z.number().min(0).max(1).optional().describe("Alpha component (0-1)"),
    }).optional().describe("Decoration color"),
    thickness: z.enum(["FROM_FONT", "CUSTOM"]).optional().describe("Decoration thickness"),
    offset: z.enum(["FROM_FONT", "CUSTOM"]).optional().describe("Decoration offset"),
    skipInk: z.boolean().optional().describe("Whether decoration skips over descenders"),
  },
  async ({ nodeId, start, end, style, color, thickness, offset, skipInk }) => {
    try {
      const result = await sendCommandToFigma("set_text_decoration_range", {
        nodeId,
        start,
        end,
        style,
        color,
        thickness,
        offset,
        skipInk,
      });
      return {
        content: [
          {
            type: "text",
            text: `Applied text decoration to range [${start}, ${end}) in node ${nodeId}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to set text decoration: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

server.tool(
  "get_text_decoration_range",
  "Get the text decoration properties for a specific text range",
  {
    nodeId: z.string().describe("The ID of the text node"),
    start: z.number().describe("Start index of the range (inclusive)"),
    end: z.number().describe("End index of the range (exclusive)"),
  },
  async ({ nodeId, start, end }) => {
    try {
      const result = await sendCommandToFigma("get_text_decoration_range", {
        nodeId,
        start,
        end,
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get text decoration: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

server.tool(
  "set_range_font",
  "Set the font family and style for a specific text range",
  {
    nodeId: z.string().describe("The ID of the text node"),
    start: z.number().describe("Start index of the range (inclusive)"),
    end: z.number().describe("End index of the range (exclusive)"),
    fontFamily: z.string().describe("Font family name (e.g., 'Inter', 'Roboto')"),
    fontStyle: z.string().optional().describe("Font style (e.g., 'Regular', 'Bold', 'Italic')").default("Regular"),
  },
  async ({ nodeId, start, end, fontFamily, fontStyle }) => {
    try {
      const result = await sendCommandToFigma("set_range_font", {
        nodeId,
        start,
        end,
        fontFamily,
        fontStyle,
      });
      return {
        content: [
          {
            type: "text",
            text: `Applied font ${fontFamily} ${fontStyle} to range [${start}, ${end}) in node ${nodeId}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to set font: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

server.tool(
  "set_range_font_size",
  "Set the font size for a specific text range",
  {
    nodeId: z.string().describe("The ID of the text node"),
    start: z.number().describe("Start index of the range (inclusive)"),
    end: z.number().describe("End index of the range (exclusive)"),
    fontSize: z.number().min(1).describe("Font size in pixels"),
  },
  async ({ nodeId, start, end, fontSize }) => {
    try {
      const result = await sendCommandToFigma("set_range_font_size", {
        nodeId,
        start,
        end,
        fontSize,
      });
      return {
        content: [
          {
            type: "text",
            text: `Applied font size ${fontSize} to range [${start}, ${end}) in node ${nodeId}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to set font size: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

server.tool(
  "set_range_fills",
  "Set the text color for a specific text range",
  {
    nodeId: z.string().describe("The ID of the text node"),
    start: z.number().describe("Start index of the range (inclusive)"),
    end: z.number().describe("End index of the range (exclusive)"),
    color: z.object({
      r: z.number().min(0).max(1).describe("Red component (0-1)"),
      g: z.number().min(0).max(1).describe("Green component (0-1)"),
      b: z.number().min(0).max(1).describe("Blue component (0-1)"),
      a: z.number().min(0).max(1).optional().describe("Alpha component (0-1)").default(1),
    }).describe("Text color"),
  },
  async ({ nodeId, start, end, color }) => {
    try {
      const result = await sendCommandToFigma("set_range_fills", {
        nodeId,
        start,
        end,
        color,
      });
      return {
        content: [
          {
            type: "text",
            text: `Applied color to range [${start}, ${end}) in node ${nodeId}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to set text color: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

server.tool(
  "get_styled_text_segments",
  "Get detailed text segments with all their styling properties",
  {
    nodeId: z.string().describe("The ID of the text node"),
    fields: z.array(z.enum([
      "fontSize",
      "fontName",
      "fontWeight",
      "textDecoration",
      "textDecorationStyle",
      "textDecorationOffset",
      "textDecorationThickness",
      "textDecorationColor",
      "textDecorationSkipInk",
      "textCase",
      "lineHeight",
      "letterSpacing",
      "fills",
      "textStyleId",
      "fillStyleId",
      "listOptions",
      "listSpacing",
      "indentation",
      "paragraphIndent",
      "paragraphSpacing",
      "hyperlink",
      "boundVariables",
      "textStyleOverrides",
      "openTypeFeatures"
    ])).describe("Text properties to retrieve"),
    start: z.number().optional().describe("Optional start index"),
    end: z.number().optional().describe("Optional end index"),
  },
  async ({ nodeId, fields, start, end }) => {
    try {
      const result = await sendCommandToFigma("get_styled_text_segments", {
        nodeId,
        fields,
        start,
        end,
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get styled text segments: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

// Component description tools

server.tool(
  "set_component_description",
  "Set the description of a component with Markdown formatting support",
  {
    nodeId: z.string().describe("The ID of the component node"),
    descriptionMarkdown: z.string().describe("Component description in Markdown format. Supports: paragraphs (\\n), lists (-, *), headings (##), bold (**), italic (*), strikethrough (~~), links [text](url), code (`code`), code blocks (```code```)"),
  },
  async ({ nodeId, descriptionMarkdown }) => {
    try {
      const result = await sendCommandToFigma("set_component_description", {
        nodeId,
        descriptionMarkdown,
      });
      return {
        content: [
          {
            type: "text",
            text: `Set component description for node ${nodeId}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to set component description: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

server.tool(
  "get_component_description",
  "Get the description of a component in Markdown format",
  {
    nodeId: z.string().describe("The ID of the component node"),
  },
  async ({ nodeId }) => {
    try {
      const result = await sendCommandToFigma("get_component_description", {
        nodeId,
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get component description: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

server.tool(
  "normalize_markdown",
  "Normalize Markdown text to match Figma's supported subset",
  {
    markdown: z.string().describe("Markdown text to normalize"),
  },
  async ({ markdown }) => {
    try {
      const result = await sendCommandToFigma("normalize_markdown", {
        markdown,
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to normalize markdown: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

// Text formatting preservation tools

server.tool(
  "update_text_preserve_formatting",
  "Update text content while preserving existing character formatting. Choose a strategy for handling formatting when text length changes.",
  {
    nodeId: z.string().describe("The ID of the text node to update"),
    newText: z.string().describe("The new text content"),
    preserveFormattingStrategy: z.enum(["stretch", "repeat", "reset_overflow"]).optional()
      .describe("Strategy for handling formatting when text length changes: 'stretch' proportionally extends formatting, 'repeat' repeats the pattern, 'reset_overflow' keeps existing formatting and uses defaults for new characters"),
  },
  async ({ nodeId, newText, preserveFormattingStrategy }) => {
    try {
      const result = await sendCommandToFigma("update_text_preserve_formatting", {
        nodeId,
        newText,
        preserveFormattingStrategy,
      }) as any;
      return {
        content: [
          {
            type: "text",
            text: `Updated text while preserving formatting. Strategy: ${preserveFormattingStrategy || 'stretch'}. ${result.formattingRanges} formatting ranges preserved.`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to update text with formatting preservation: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

server.tool(
  "smart_text_replace",
  "Replace specific text in a node while preserving the formatting of unchanged portions. Only replaced text gets default formatting.",
  {
    nodeId: z.string().describe("The ID of the text node"),
    replacements: z.array(z.object({
      find: z.string().describe("Text to find"),
      replace: z.string().describe("Replacement text"),
      matchCase: z.boolean().optional().describe("Case sensitive match (default: true)"),
    })).describe("Array of find/replace operations to perform"),
  },
  async ({ nodeId, replacements }) => {
    try {
      const result = await sendCommandToFigma("smart_text_replace", {
        nodeId,
        replacements,
      }) as any;
      return {
        content: [
          {
            type: "text",
            text: `Smart text replacement completed. ${result.replacementCount} replacements processed.`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to perform smart text replacement: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

server.tool(
  "set_multiple_text_contents_with_styles",
  "Update multiple text nodes with content and optional styling in a single operation. More efficient than separate text and style updates.",
  {
    nodeId: z.string().describe("The parent node ID containing the text nodes"),
    updates: z.array(z.object({
      nodeId: z.string().describe("Text node ID to update"),
      text: z.string().describe("New text content"),
      styles: z.array(z.object({
        start: z.number().describe("Start index of the range"),
        end: z.number().describe("End index of the range"),
        bold: z.boolean().optional().describe("Apply bold"),
        italic: z.boolean().optional().describe("Apply italic"),
        fontSize: z.number().optional().describe("Font size"),
        fontFamily: z.string().optional().describe("Font family"),
        fontStyle: z.string().optional().describe("Font style (e.g., Regular, Bold)"),
        fills: z.array(z.any()).optional().describe("Fill colors"),
      })).optional().describe("Optional styling to apply after text update"),
    })).describe("Array of text updates with optional styling"),
  },
  async ({ nodeId, updates }) => {
    try {
      const result = await sendCommandToFigma("set_multiple_text_contents_with_styles", {
        nodeId,
        updates,
      }) as any;
      return {
        content: [
          {
            type: "text",
            text: `Updated ${result.totalUpdated} text nodes with content and styles. ${result.totalFailed} failed.`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to set text contents with styles: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

// Batch operation tools

server.tool(
  "clone_multiple_nodes",
  "Clone a node to multiple positions in one operation. Significantly faster than multiple individual clone operations.",
  {
    sourceNodeId: z.string().describe("The ID of the node to clone"),
    positions: z.array(z.object({
      x: z.number().describe("X position for the clone"),
      y: z.number().describe("Y position for the clone"),
    })).describe("Array of positions where clones should be placed"),
    parentId: z.string().optional().describe("Parent node ID for all clones (optional)"),
  },
  async ({ sourceNodeId, positions, parentId }) => {
    try {
      const result = await sendCommandToFigma("clone_multiple_nodes", {
        sourceNodeId,
        positions,
        parentId,
      }) as any;
      return {
        content: [
          {
            type: "text",
            text: `Successfully cloned ${result.totalCloned} nodes. ${result.totalFailed} failed. Command ID: ${result.commandId}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to clone multiple nodes: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

server.tool(
  "get_multiple_nodes_info",
  "[DEPRECATED] Get information for multiple nodes in a single request. Use 'get_nodes' instead.",
  {
    nodeIds: z.array(z.string()).describe("Array of node IDs to get information for"),
  },
  async ({ nodeIds }) => {
    // Redirect to get_nodes with deprecation notice
    console.warn('[DEPRECATION] get_multiple_nodes_info is deprecated. Use get_nodes instead.');
    
    try {
      const result = await sendCommandToFigma("get_multiple_nodes_info", {
        nodeIds,
      }) as any;
      return {
        content: [
          {
            type: "text",
            text: `Retrieved info for ${result.totalFound} nodes. ${result.totalNotFound} not found.\n${JSON.stringify(result.results, null, 2)}`,
          },
          {
            type: "text",
            text: "\n⚠️ DEPRECATION WARNING: get_multiple_nodes_info is deprecated. Please use get_nodes({nodeIds: [" + nodeIds.map(id => '"' + id + '"').join(', ') + "]}) instead."
          }
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to get multiple nodes info: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Use get_nodes instead of get_multiple_nodes_info',
            'Example: get_nodes({nodeIds: ["id1", "id2"]})',
            'The new tool is more efficient and supports additional options'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);

server.tool(
  "set_multiple_nodes_property",
  "Set the same property value on multiple nodes at once. Useful for bulk updates like visibility, opacity, or position.",
  {
    nodeIds: z.array(z.string()).describe("Array of node IDs to update"),
    property: z.string().describe("Property name to set (e.g., 'visible', 'opacity', 'x', 'y')"),
    value: z.any().describe("Value to set for the property"),
  },
  async ({ nodeIds, property, value }) => {
    try {
      const result = await sendCommandToFigma("set_multiple_nodes_property", {
        nodeIds,
        property,
        value,
      }) as any;
      return {
        content: [
          {
            type: "text",
            text: `Updated ${result.totalUpdated} nodes. ${result.totalFailed} failed.`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to set property on multiple nodes: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

server.tool(
  "scan_nodes_with_options",
  "Scan for nodes with advanced options including depth limit, timeout control, and partial results. Use this when scan_text_nodes times out.",
  {
    nodeId: z.string().describe("Root node ID to start scanning from"),
    options: z.object({
      maxDepth: z.number().optional().describe("Maximum depth to scan (-1 for unlimited, default: -1)"),
      nodeTypes: z.array(z.string()).optional().describe("Node types to include (default: ['TEXT'])"),
      timeout: z.number().optional().describe("Timeout in milliseconds (default: 30000)"),
      returnPartialOnTimeout: z.boolean().optional().describe("Return partial results if timeout occurs (default: true)"),
      includeHidden: z.boolean().optional().describe("Include hidden nodes (default: false)"),
    }).optional().describe("Scanning options"),
  },
  async ({ nodeId, options }) => {
    try {
      const result = await sendCommandToFigma("scan_nodes_with_options", {
        nodeId,
        options,
      }) as any;
      return {
        content: [
          {
            type: "text",
            text: `Found ${result.totalFound} nodes in ${result.elapsed}ms. ${result.timedOut ? '(Timed out - partial results)' : ''}\n${JSON.stringify(result.nodes, null, 2)}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to scan nodes: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

server.tool(
  "get_connection_status",
  "Get the current connection status and statistics for the Figma plugin connection",
  {},
  async () => {
    try {
      const result = await sendCommandToFigma("get_connection_status", {}) as any;
      return {
        content: [
          {
            type: "text",
            text: `Connection Status:\n- Connected: ${result.connected}\n- Plugin Active: ${result.pluginActive}\n- Document Open: ${result.documentOpen}\n- Editor Type: ${result.editorType}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get connection status: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

server.tool(
  "execute_batch",
  "Execute multiple commands in sequence with a single round-trip. Ideal for complex operations that require multiple steps.",
  {
    commands: z.array(z.object({
      command: z.string().describe("Command name to execute"),
      params: z.any().describe("Parameters for the command"),
    })).describe("Array of commands to execute in sequence"),
    stopOnError: z.boolean().optional().describe("Stop execution if a command fails (default: false)"),
  },
  async ({ commands, stopOnError }) => {
    try {
      const result = await sendCommandToFigma("execute_batch", {
        commands,
        stopOnError,
      }) as any;
      return {
        content: [
          {
            type: "text",
            text: `Executed ${result.totalExecuted} commands. Succeeded: ${result.totalSucceeded}, Failed: ${result.totalFailed}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to execute batch: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

// Update the join_channel tool
server.tool(
  "join_channel",
  "Join a specific channel to communicate with Figma",
  {
    channel: z.string().describe("The name of the channel to join").default(""),
  },
  async ({ channel }) => {
    try {
      if (!channel) {
        // If no channel provided, ask the user for input
        return {
          content: [
            {
              type: "text",
              text: "Please provide a channel name to join:",
            },
          ],
          followUp: {
            tool: "join_channel",
            description: "Join the specified channel",
          },
        };
      }

      await joinChannel(channel);
      return {
        content: [
          {
            type: "text",
            text: `Successfully joined channel: ${channel}`,
          },
        ],
      };
    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        `Failed to join channel: ${error instanceof Error ? error.message : String(error)}`,
        {
          suggestions: [
            'Ensure the channel name is valid',
            'Check if the WebSocket connection is active',
            'Verify the Figma plugin is running'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }
  }
);
       
// Start the server
async function main() {
  try {
    // Try to connect to Figma socket server
    connectToFigma();
  } catch (error) {
    logger.warn(`Could not connect to Figma initially: ${error instanceof Error ? error.message : String(error)}`);
    logger.warn('Will try to connect when the first command is sent');
  }

  // Start the MCP server with stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);
  logger.info('FigmaMCP server running on stdio');
}

// Run the server
main().catch(error => {
  logger.error(`Error starting FigmaMCP server: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});




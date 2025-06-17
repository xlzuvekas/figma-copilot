// This is the main code file for the Cursor MCP Figma plugin
// It handles Figma API commands

// Plugin state
const state = {
  serverPort: 3055, // Default port
};


// Helper function for progress updates
function sendProgressUpdate(
  commandId,
  commandType,
  status,
  progress,
  totalItems,
  processedItems,
  message,
  payload = null
) {
  const update = {
    type: "command_progress",
    commandId,
    commandType,
    status,
    progress,
    totalItems,
    processedItems,
    message,
    timestamp: Date.now(),
  };

  // Add optional chunk information if present
  if (payload) {
    if (
      payload.currentChunk !== undefined &&
      payload.totalChunks !== undefined
    ) {
      update.currentChunk = payload.currentChunk;
      update.totalChunks = payload.totalChunks;
      update.chunkSize = payload.chunkSize;
    }
    update.payload = payload;
  }

  // Send to UI
  figma.ui.postMessage(update);
  console.log(`Progress update: ${status} - ${progress}% - ${message}`);

  return update;
}

// Show UI
figma.showUI(__html__, { width: 350, height: 450 });

// Plugin commands from UI
figma.ui.onmessage = async (msg) => {
  switch (msg.type) {
    case "update-settings":
      updateSettings(msg);
      break;
    case "notify":
      figma.notify(msg.message);
      break;
    case "close-plugin":
      figma.closePlugin();
      break;
    case "execute-command":
      // Execute commands received from UI (which gets them from WebSocket)
      try {
        const result = await handleCommand(msg.command, msg.params);
        // Send result back to UI
        figma.ui.postMessage({
          type: "command-result",
          id: msg.id,
          result,
        });
      } catch (error) {
        figma.ui.postMessage({
          type: "command-error",
          id: msg.id,
          error: error.message || "Error executing command",
        });
      }
      break;
  }
};

// Listen for plugin commands from menu
figma.on("run", ({ command }) => {
  figma.ui.postMessage({ type: "auto-connect" });
});

// Update plugin settings
function updateSettings(settings) {
  if (settings.serverPort) {
    state.serverPort = settings.serverPort;
  }

  figma.clientStorage.setAsync("settings", {
    serverPort: state.serverPort,
  });
}

// Handle commands from UI
async function handleCommand(command, params) {
  switch (command) {
    case "get_document_info":
      return await getDocumentInfo();
    case "get_selection":
      return await getSelection();
    case "get_node_info":
      if (!params || !params.nodeId) {
        throw new Error("Missing nodeId parameter");
      }
      return await getNodeInfo(params.nodeId);
    case "get_nodes_info":
      if (!params || !params.nodeIds || !Array.isArray(params.nodeIds)) {
        throw new Error("Missing or invalid nodeIds parameter");
      }
      return await getNodesInfo(params.nodeIds);
    case "read_my_design":
      return await readMyDesign();
    case "create_rectangle":
      return await createRectangle(params);
    case "create_frame":
      return await createFrame(params);
    case "create_slide":
      return await createSlide(params);
    case "create_slide_row":
      return await createSlideRow(params);
    case "set_slide_grid":
      return await setSlideGrid(params);
    case "get_focused_slide":
      return await getFocusedSlide();
    case "get_slide_transition":
      return await getSlideTransition(params);
    case "set_slide_transition":
      return await setSlideTransition(params);
    case "get_slides_mode":
      return await getSlidesMode();
    case "set_slides_mode":
      return await setSlidesMode(params);
    case "get_slide_grid":
      return await getSlideGrid();
    case "create_text":
      return await createText(params);
    case "create_shape_with_text":
      return await createShapeWithText(params);
    case "create_table":
      return await createTable(params);
    case "create_gif":
      return await createGif(params);
    case "set_fill_color":
      return await setFillColor(params);
    case "set_stroke_color":
      return await setStrokeColor(params);
    case "move_node":
      return await moveNode(params);
    case "resize_node":
      return await resizeNode(params);
    case "delete_node":
      return await deleteNode(params);
    case "delete_multiple_nodes":
      return await deleteMultipleNodes(params);
    case "get_styles":
      return await getStyles();
    case "get_local_components":
      return await getLocalComponents();
    // case "get_team_components":
    //   return await getTeamComponents();
    case "create_component_instance":
      return await createComponentInstance(params);
    case "export_node_as_image":
      return await exportNodeAsImage(params);
    case "set_corner_radius":
      return await setCornerRadius(params);
    case "set_text_content":
      return await setTextContent(params);
    case "clone_node":
      return await cloneNode(params);
    case "scan_text_nodes":
      return await scanTextNodes(params);
    case "set_multiple_text_contents":
      return await setMultipleTextContents(params);
    case "get_annotations":
      return await getAnnotations(params);
    case "set_annotation":
      return await setAnnotation(params);
    case "scan_nodes_by_types":
      return await scanNodesByTypes(params);
    case "set_multiple_annotations":
      return await setMultipleAnnotations(params);
    case "get_instance_overrides":
      // Check if instanceNode parameter is provided
      if (params && params.instanceNodeId) {
        // Get the instance node by ID
        const instanceNode = await figma.getNodeByIdAsync(params.instanceNodeId);
        if (!instanceNode) {
          throw new Error(`Instance node not found with ID: ${params.instanceNodeId}`);
        }
        return await getInstanceOverrides(instanceNode);
      }
      // Call without instance node if not provided
      return await getInstanceOverrides();

    case "set_instance_overrides":
      // Check if instanceNodeIds parameter is provided
      if (params && params.targetNodeIds) {
        // Validate that targetNodeIds is an array
        if (!Array.isArray(params.targetNodeIds)) {
          throw new Error("targetNodeIds must be an array");
        }

        // Get the instance nodes by IDs
        const targetNodes = await getValidTargetInstances(params.targetNodeIds);
        if (!targetNodes.success) {
          figma.notify(targetNodes.message);
          return { success: false, message: targetNodes.message };
        }

        if (params.sourceInstanceId) {

          // get source instance data
          let sourceInstanceData = null;
          sourceInstanceData = await getSourceInstanceData(params.sourceInstanceId);

          if (!sourceInstanceData.success) {
            figma.notify(sourceInstanceData.message);
            return { success: false, message: sourceInstanceData.message };
          }
          return await setInstanceOverrides(targetNodes.targetInstances, sourceInstanceData);
        } else {
          throw new Error("Missing sourceInstanceId parameter");
        }
      }
    case "set_layout_mode":
      return await setLayoutMode(params);
    case "set_padding":
      return await setPadding(params);
    case "set_axis_align":
      return await setAxisAlign(params);
    case "set_layout_sizing":
      return await setLayoutSizing(params);
    case "set_item_spacing":
      return await setItemSpacing(params);
    case "get_reactions":
      if (!params || !params.nodeIds || !Array.isArray(params.nodeIds)) {
        throw new Error("Missing or invalid nodeIds parameter");
      }
      return await getReactions(params.nodeIds);  
    case "set_default_connector":
      return await setDefaultConnector(params);
    case "create_connections":
      return await createConnections(params);
    case "set_text_style_range":
      return await setTextStyleRange(params);
    case "get_text_style_range":
      return await getTextStyleRange(params);
    case "set_text_decoration_range":
      return await setTextDecorationRange(params);
    case "get_text_decoration_range":
      return await getTextDecorationRange(params);
    case "set_range_font":
      return await setRangeFont(params);
    case "set_range_font_size":
      return await setRangeFontSize(params);
    case "set_range_fills":
      return await setRangeFills(params);
    case "get_styled_text_segments":
      return await getStyledTextSegments(params);
    case "set_component_description":
      return await setComponentDescription(params);
    case "get_component_description":
      return await getComponentDescription(params);
    case "normalize_markdown":
      return await normalizeMarkdown(params);
    case "update_text_preserve_formatting":
      return await updateTextPreserveFormatting(params);
    case "smart_text_replace":
      return await smartTextReplace(params);
    case "set_multiple_text_contents_with_styles":
      return await setMultipleTextContentsWithStyles(params);
    case "clone_multiple_nodes":
      return await cloneMultipleNodes(params);
    case "get_multiple_nodes_info":
      return await getMultipleNodesInfo(params);
    case "set_multiple_nodes_property":
      return await setMultipleNodesProperty(params);
    case "scan_nodes_with_options":
      return await scanNodesWithOptions(params);
    case "get_connection_status":
      return await getConnectionStatus(params);
    case "execute_batch":
      return await executeBatch(params);
    case "get_nodes":
      return await getNodes(params);
    case "get_current_context":
      return await getCurrentContext(params);
    case "extract_slide_content":
      return await extractSlideContent(params);
    case "get_presentation_summary":
      return await getPresentationSummary(params);
    case "get_table_data":
      return await getTableData(params);
    default:
      throw new Error(`Unknown command: ${command}`);
  }
}

// Command implementations

async function getDocumentInfo() {
  await figma.currentPage.loadAsync();
  const page = figma.currentPage;
  return {
    name: page.name,
    id: page.id,
    type: page.type,
    children: page.children.map((node) => ({
      id: node.id,
      name: node.name,
      type: node.type,
    })),
    currentPage: {
      id: page.id,
      name: page.name,
      childCount: page.children.length,
    },
    pages: [
      {
        id: page.id,
        name: page.name,
        childCount: page.children.length,
      },
    ],
  };
}

async function getSelection() {
  return {
    selectionCount: figma.currentPage.selection.length,
    selection: figma.currentPage.selection.map((node) => ({
      id: node.id,
      name: node.name,
      type: node.type,
      visible: node.visible,
    })),
  };
}

function rgbaToHex(color) {
  var r = Math.round(color.r * 255);
  var g = Math.round(color.g * 255);
  var b = Math.round(color.b * 255);
  var a = color.a !== undefined ? Math.round(color.a * 255) : 255;

  if (a === 255) {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          return x.toString(16).padStart(2, "0");
        })
        .join("")
    );
  }

  return (
    "#" +
    [r, g, b, a]
      .map((x) => {
        return x.toString(16).padStart(2, "0");
      })
      .join("")
  );
}

function filterFigmaNode(node) {
  if (node.type === "VECTOR") {
    return null;
  }

  var filtered = {
    id: node.id,
    name: node.name,
    type: node.type,
  };

  // Handle slide-specific node types
  if (node.type === "SLIDE") {
    filtered.width = 1920;
    filtered.height = 1080;
  } else if (node.type === "INTERACTIVE_SLIDE_ELEMENT") {
    filtered.interactiveSlideElementType = node.interactiveSlideElementType;
    filtered.x = node.x;
    filtered.y = node.y;
    filtered.width = node.width;
    filtered.height = node.height;
  }

  if (node.fills && node.fills.length > 0) {
    filtered.fills = node.fills.map((fill) => {
      var processedFill = Object.assign({}, fill);
      delete processedFill.boundVariables;
      delete processedFill.imageRef;

      if (processedFill.gradientStops) {
        processedFill.gradientStops = processedFill.gradientStops.map(
          (stop) => {
            var processedStop = Object.assign({}, stop);
            if (processedStop.color) {
              processedStop.color = rgbaToHex(processedStop.color);
            }
            delete processedStop.boundVariables;
            return processedStop;
          }
        );
      }

      if (processedFill.color) {
        processedFill.color = rgbaToHex(processedFill.color);
      }

      return processedFill;
    });
  }

  if (node.strokes && node.strokes.length > 0) {
    filtered.strokes = node.strokes.map((stroke) => {
      var processedStroke = Object.assign({}, stroke);
      delete processedStroke.boundVariables;
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
      lineHeightPx: node.style.lineHeightPx,
    };
  }

  if (node.children) {
    filtered.children = node.children
      .map((child) => {
        return filterFigmaNode(child);
      })
      .filter((child) => {
        return child !== null;
      });
  }

  return filtered;
}

async function getNodeInfo(nodeId) {
  // Special handling for SLIDE_GRID nodes
  // SLIDE_GRID nodes (like "0:3") can't be accessed directly in Figma Slides
  if (nodeId === "0:3" || nodeId.includes(":3")) {
    // Attempt to get page-level info for SLIDE_GRID
    try {
      const currentPage = figma.currentPage;
      
      if (figma.editorType === "slides") {
        // For Figma Slides, return information about the slide structure
        const slides = currentPage.findAll(n => n.type === 'SLIDE');
        const slideRows = currentPage.findAll(n => n.type === 'SLIDE_ROW');
        
        return {
          id: nodeId,
          name: "Slide Grid",
          type: "SLIDE_GRID",
          editorType: figma.editorType,
          slideCount: slides.length,
          rowCount: slideRows.length,
          message: "SLIDE_GRID nodes cannot be accessed directly. Use scan_nodes_by_types or get_slide_grid instead.",
          alternativeTools: ["scan_nodes_by_types", "get_slide_grid", "get_document_info"],
          pageInfo: {
            id: currentPage.id,
            name: currentPage.name,
            type: currentPage.type
          }
        };
      }
    } catch (e) {
      // If we can't get any info, return a helpful error
      return {
        id: nodeId,
        type: "SLIDE_GRID",
        error: "SLIDE_GRID node cannot be accessed directly",
        message: "This is a special node type in Figma Slides. Use scan_nodes_by_types with SLIDE and SLIDE_ROW types instead.",
        alternativeTools: ["scan_nodes_by_types", "get_slide_grid", "get_document_info"]
      };
    }
  }
  
  try {
    const node = await figma.getNodeByIdAsync(nodeId);

    if (!node) {
      // Check if this might be a special node type
      if (figma.editorType === "slides") {
        return {
          id: nodeId,
          error: `Node not found with ID: ${nodeId}`,
          message: "This might be a special node type. Try using scan_nodes_by_types or get_document_info instead.",
          alternativeTools: ["scan_nodes_by_types", "get_document_info", "get_slide_grid"]
        };
      }
      throw new Error(`Node not found with ID: ${nodeId}`);
    }

    const response = await node.exportAsync({
      format: "JSON_REST_V1",
    });

    return filterFigmaNode(response.document);
  } catch (error) {
    // Enhanced error handling for special node types
    if (error.message?.includes("cannot read property") || error.message?.includes("null")) {
      return {
        id: nodeId,
        error: error.message,
        message: "This node type may require special handling. Try using scan_nodes_by_types or get_document_info instead.",
        alternativeTools: ["scan_nodes_by_types", "get_document_info", "get_slide_grid"],
        editorType: figma.editorType
      };
    }
    throw error;
  }
}

async function getNodesInfo(nodeIds) {
  try {
    // Load all nodes in parallel
    const nodes = await Promise.all(
      nodeIds.map((id) => figma.getNodeByIdAsync(id))
    );

    // Filter out any null values (nodes that weren't found)
    const validNodes = nodes.filter((node) => node !== null);

    // Export all valid nodes in parallel
    const responses = await Promise.all(
      validNodes.map(async (node) => {
        const response = await node.exportAsync({
          format: "JSON_REST_V1",
        });
        return {
          nodeId: node.id,
          document: filterFigmaNode(response.document),
        };
      })
    );

    return responses;
  } catch (error) {
    throw new Error(`Error getting nodes info: ${error.message}`);
  }
}

async function getReactions(nodeIds) {
  try {
    const commandId = generateCommandId();
    sendProgressUpdate(
      commandId,
      "get_reactions",
      "started",
      0,
      nodeIds.length,
      0,
      `Starting deep search for reactions in ${nodeIds.length} nodes and their children`
    );

    // Function to find nodes with reactions from the node and all its children
    async function findNodesWithReactions(node, processedNodes = new Set(), depth = 0, results = []) {
      // Skip already processed nodes (prevent circular references)
      if (processedNodes.has(node.id)) {
        return results;
      }
      
      processedNodes.add(node.id);
      
      // Check if the current node has reactions
      let filteredReactions = [];
      if (node.reactions && node.reactions.length > 0) {
        // Filter out reactions with navigation === 'CHANGE_TO'
        filteredReactions = node.reactions.filter(r => {
          // Some reactions may have action or actions array
          if (r.action && r.action.navigation === 'CHANGE_TO') return false;
          if (Array.isArray(r.actions)) {
            // If any action in actions array is CHANGE_TO, exclude
            return !r.actions.some(a => a.navigation === 'CHANGE_TO');
          }
          return true;
        });
      }
      const hasFilteredReactions = filteredReactions.length > 0;
      
      // If the node has filtered reactions, add it to results and apply highlight effect
      if (hasFilteredReactions) {
        results.push({
          id: node.id,
          name: node.name,
          type: node.type,
          depth: depth,
          hasReactions: true,
          reactions: filteredReactions,
          path: getNodePath(node)
        });
        // Apply highlight effect (orange border)
        await highlightNodeWithAnimation(node);
      }
      
      // If node has children, recursively search them
      if (node.children) {
        for (const child of node.children) {
          await findNodesWithReactions(child, processedNodes, depth + 1, results);
        }
      }
      
      return results;
    }
    
    // Function to apply animated highlight effect to a node
    async function highlightNodeWithAnimation(node) {
      // Save original stroke properties
      const originalStrokeWeight = node.strokeWeight;
      const originalStrokes = node.strokes ? [...node.strokes] : [];
      
      try {
        // Apply orange border stroke
        node.strokeWeight = 4;
        node.strokes = [{
          type: 'SOLID',
          color: { r: 1, g: 0.5, b: 0 }, // Orange color
          opacity: 0.8
        }];
        
        // Set timeout for animation effect (restore to original after 1.5 seconds)
        setTimeout(() => {
          try {
            // Restore original stroke properties
            node.strokeWeight = originalStrokeWeight;
            node.strokes = originalStrokes;
          } catch (restoreError) {
            console.error(`Error restoring node stroke: ${restoreError.message}`);
          }
        }, 1500);
      } catch (highlightError) {
        console.error(`Error highlighting node: ${highlightError.message}`);
        // Continue even if highlighting fails
      }
    }
    
    // Get node hierarchy path as a string
    function getNodePath(node) {
      const path = [];
      let current = node;
      
      while (current && current.parent) {
        path.unshift(current.name);
        current = current.parent;
      }
      
      return path.join(' > ');
    }

    // Array to store all results
    let allResults = [];
    let processedCount = 0;
    const totalCount = nodeIds.length;
    
    // Iterate through each node and its children to search for reactions
    for (let i = 0; i < nodeIds.length; i++) {
      try {
        const nodeId = nodeIds[i];
        const node = await figma.getNodeByIdAsync(nodeId);
        
        if (!node) {
          processedCount++;
          sendProgressUpdate(
            commandId,
            "get_reactions",
            "in_progress",
            processedCount / totalCount,
            totalCount,
            processedCount,
            `Node not found: ${nodeId}`
          );
          continue;
        }
        
        // Search for reactions in the node and its children
        const processedNodes = new Set();
        const nodeResults = await findNodesWithReactions(node, processedNodes);
        
        // Add results
        allResults = allResults.concat(nodeResults);
        
        // Update progress
        processedCount++;
        sendProgressUpdate(
          commandId,
          "get_reactions",
          "in_progress",
          processedCount / totalCount,
          totalCount,
          processedCount,
          `Processed node ${processedCount}/${totalCount}, found ${nodeResults.length} nodes with reactions`
        );
      } catch (error) {
        processedCount++;
        sendProgressUpdate(
          commandId,
          "get_reactions",
          "in_progress",
          processedCount / totalCount,
          totalCount,
          processedCount,
          `Error processing node: ${error.message}`
        );
      }
    }

    // Completion update
    sendProgressUpdate(
      commandId,
      "get_reactions",
      "completed",
      1,
      totalCount,
      totalCount,
      `Completed deep search: found ${allResults.length} nodes with reactions.`
    );

    return {
      nodesCount: nodeIds.length,
      nodesWithReactions: allResults.length,
      nodes: allResults
    };
  } catch (error) {
    throw new Error(`Failed to get reactions: ${error.message}`);
  }
}

async function readMyDesign() {
  try {
    // Load all selected nodes in parallel
    const nodes = await Promise.all(
      figma.currentPage.selection.map((node) => figma.getNodeByIdAsync(node.id))
    );

    // Filter out any null values (nodes that weren't found)
    const validNodes = nodes.filter((node) => node !== null);

    // Export all valid nodes in parallel
    const responses = await Promise.all(
      validNodes.map(async (node) => {
        const response = await node.exportAsync({
          format: "JSON_REST_V1",
        });
        return {
          nodeId: node.id,
          document: filterFigmaNode(response.document),
        };
      })
    );

    return responses;
  } catch (error) {
    throw new Error(`Error getting nodes info: ${error.message}`);
  }
}

async function createRectangle(params) {
  const {
    x = 0,
    y = 0,
    width = 100,
    height = 100,
    name = "Rectangle",
    parentId,
  } = params || {};

  const rect = figma.createRectangle();
  rect.x = x;
  rect.y = y;
  rect.resize(width, height);
  rect.name = name;

  // If parentId is provided, append to that node, otherwise append to current page
  if (parentId) {
    const parentNode = await figma.getNodeByIdAsync(parentId);
    if (!parentNode) {
      throw new Error(`Parent node not found with ID: ${parentId}`);
    }
    if (!("appendChild" in parentNode)) {
      throw new Error(`Parent node does not support children: ${parentId}`);
    }
    parentNode.appendChild(rect);
  } else {
    figma.currentPage.appendChild(rect);
  }

  return {
    id: rect.id,
    name: rect.name,
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
    parentId: rect.parent ? rect.parent.id : undefined,
  };
}

async function createFrame(params) {
  const {
    x = 0,
    y = 0,
    width = 100,
    height = 100,
    name = "Frame",
    parentId,
    fillColor,
    strokeColor,
    strokeWeight,
    layoutMode = "NONE",
    layoutWrap = "NO_WRAP",
    paddingTop = 10,
    paddingRight = 10,
    paddingBottom = 10,
    paddingLeft = 10,
    primaryAxisAlignItems = "MIN",
    counterAxisAlignItems = "MIN",
    layoutSizingHorizontal = "FIXED",
    layoutSizingVertical = "FIXED",
    itemSpacing = 0,
  } = params || {};

  const frame = figma.createFrame();
  frame.x = x;
  frame.y = y;
  frame.resize(width, height);
  frame.name = name;

  // Set layout mode if provided
  if (layoutMode !== "NONE") {
    frame.layoutMode = layoutMode;
    frame.layoutWrap = layoutWrap;

    // Set padding values only when layoutMode is not NONE
    frame.paddingTop = paddingTop;
    frame.paddingRight = paddingRight;
    frame.paddingBottom = paddingBottom;
    frame.paddingLeft = paddingLeft;

    // Set axis alignment only when layoutMode is not NONE
    frame.primaryAxisAlignItems = primaryAxisAlignItems;
    frame.counterAxisAlignItems = counterAxisAlignItems;

    // Set layout sizing only when layoutMode is not NONE
    frame.layoutSizingHorizontal = layoutSizingHorizontal;
    frame.layoutSizingVertical = layoutSizingVertical;

    // Set item spacing only when layoutMode is not NONE
    frame.itemSpacing = itemSpacing;
  }

  // Set fill color if provided
  if (fillColor) {
    const paintStyle = {
      type: "SOLID",
      color: {
        r: parseFloat(fillColor.r) || 0,
        g: parseFloat(fillColor.g) || 0,
        b: parseFloat(fillColor.b) || 0,
      },
      opacity: parseFloat(fillColor.a) || 1,
    };
    frame.fills = [paintStyle];
  }

  // Set stroke color and weight if provided
  if (strokeColor) {
    const strokeStyle = {
      type: "SOLID",
      color: {
        r: parseFloat(strokeColor.r) || 0,
        g: parseFloat(strokeColor.g) || 0,
        b: parseFloat(strokeColor.b) || 0,
      },
      opacity: parseFloat(strokeColor.a) || 1,
    };
    frame.strokes = [strokeStyle];
  }

  // Set stroke weight if provided
  if (strokeWeight !== undefined) {
    frame.strokeWeight = strokeWeight;
  }

  // If parentId is provided, append to that node, otherwise append to current page
  if (parentId) {
    const parentNode = await figma.getNodeByIdAsync(parentId);
    if (!parentNode) {
      throw new Error(`Parent node not found with ID: ${parentId}`);
    }
    if (!("appendChild" in parentNode)) {
      throw new Error(`Parent node does not support children: ${parentId}`);
    }
    parentNode.appendChild(frame);
  } else {
    figma.currentPage.appendChild(frame);
  }

  return {
    id: frame.id,
    name: frame.name,
    x: frame.x,
    y: frame.y,
    width: frame.width,
    height: frame.height,
    fills: frame.fills,
    strokes: frame.strokes,
    strokeWeight: frame.strokeWeight,
    layoutMode: frame.layoutMode,
    layoutWrap: frame.layoutWrap,
    parentId: frame.parent ? frame.parent.id : undefined,
  };
}

// Helper functions for slide coordinate transformation
function getSlidePosition(slide) {
  // Slides are positioned in absolute coordinates
  // Return the slide's absolute position
  return {
    x: slide.x,
    y: slide.y
  };
}

function toAbsoluteCoordinates(slide, localX, localY) {
  // Convert local slide coordinates to absolute document coordinates
  const slidePos = getSlidePosition(slide);
  return {
    x: slidePos.x + localX,
    y: slidePos.y + localY
  };
}

function toLocalCoordinates(slide, absoluteX, absoluteY) {
  // Convert absolute document coordinates to local slide coordinates
  const slidePos = getSlidePosition(slide);
  return {
    x: absoluteX - slidePos.x,
    y: absoluteY - slidePos.y
  };
}

async function getTargetSlide(parentId) {
  // Helper to find the target slide for element creation
  if (parentId) {
    const parent = await figma.getNodeByIdAsync(parentId);
    if (parent && parent.type === 'SLIDE') {
      return parent;
    }
    // If parent is not a slide, traverse up to find the containing slide
    let current = parent;
    while (current && current.parent) {
      if (current.type === 'SLIDE') {
        return current;
      }
      current = current.parent;
    }
  }
  
  // If no parent specified, try to use the focused slide
  if (figma.editorType === 'slides' && figma.currentPage.focusedSlide) {
    return figma.currentPage.focusedSlide;
  }
  
  return null;
}

async function createSlide(params) {
  const {
    name = "Slide",
    parentId,
    fillColor,
    strokeColor,
    strokeWeight,
  } = params || {};

  // Check if we're in a Figma Slides document
  if (figma.editorType !== "slides") {
    throw new Error("createSlide can only be used in Figma Slides documents");
  }

  // Check if createSlide method exists
  if (typeof figma.createSlide !== 'function') {
    throw new Error("createSlide API is not available. Please ensure you're using the latest version of Figma with Slides support.");
  }

  const slide = figma.createSlide();
  slide.name = name;

  // Set fill color if provided
  if (fillColor) {
    const paintStyle = {
      type: "SOLID",
      color: {
        r: parseFloat(fillColor.r) || 0,
        g: parseFloat(fillColor.g) || 0,
        b: parseFloat(fillColor.b) || 0,
      },
      opacity: parseFloat(fillColor.a) || 1,
    };
    slide.fills = [paintStyle];
  }

  // Set stroke color if provided
  if (strokeColor) {
    const strokeStyle = {
      type: "SOLID",
      color: {
        r: parseFloat(strokeColor.r) || 0,
        g: parseFloat(strokeColor.g) || 0,
        b: parseFloat(strokeColor.b) || 0,
      },
      opacity: parseFloat(strokeColor.a) || 1,
    };
    slide.strokes = [strokeStyle];
  }

  // Set stroke weight if provided
  if (strokeWeight !== undefined) {
    slide.strokeWeight = strokeWeight;
  }

  // If parentId is provided, append to that node (should be a SLIDE_ROW)
  if (parentId) {
    const parentNode = await figma.getNodeByIdAsync(parentId);
    if (!parentNode) {
      throw new Error(`Parent node not found with ID: ${parentId}`);
    }
    if (parentNode.type !== "SLIDE_ROW") {
      throw new Error(`Parent node must be a SLIDE_ROW, got: ${parentNode.type}`);
    }
    parentNode.appendChild(slide);
  } else {
    // Find or create a slide row
    const slideRows = figma.currentPage.children.filter(node => node.type === "SLIDE_ROW");
    if (slideRows.length > 0) {
      slideRows[0].appendChild(slide);
    } else {
      // Check if createSlideRow method exists
      if (typeof figma.createSlideRow !== 'function') {
        throw new Error("createSlideRow API is not available. Please ensure you're using the latest version of Figma with Slides support.");
      }
      const slideRow = figma.createSlideRow();
      figma.currentPage.appendChild(slideRow);
      slideRow.appendChild(slide);
    }
  }

  return {
    id: slide.id,
    name: slide.name,
    type: slide.type,
    width: slide.width,
    height: slide.height,
    fills: slide.fills,
    strokes: slide.strokes,
    strokeWeight: slide.strokeWeight,
    parentId: slide.parent ? slide.parent.id : undefined,
  };
}

async function createSlideRow(params) {
  const { name = "Slide Row", parentId } = params || {};

  // Check if we're in a Figma Slides document
  if (figma.editorType !== "slides") {
    throw new Error("createSlideRow can only be used in Figma Slides documents");
  }

  // Check if createSlideRow method exists
  if (typeof figma.createSlideRow !== 'function') {
    throw new Error("createSlideRow API is not available. Please ensure you're using the latest version of Figma with Slides support.");
  }

  const slideRow = figma.createSlideRow();
  slideRow.name = name;

  // Slide rows are typically added to the current page
  if (parentId) {
    const parentNode = await figma.getNodeByIdAsync(parentId);
    if (!parentNode) {
      throw new Error(`Parent node not found with ID: ${parentId}`);
    }
    if (!("appendChild" in parentNode)) {
      throw new Error(`Parent node does not support children: ${parentId}`);
    }
    parentNode.appendChild(slideRow);
  } else {
    figma.currentPage.appendChild(slideRow);
  }

  return {
    id: slideRow.id,
    name: slideRow.name,
    type: slideRow.type,
    parentId: slideRow.parent ? slideRow.parent.id : undefined,
  };
}

async function setSlideGrid(params) {
  const { slides } = params || {};

  // Check if we're in a Figma Slides document
  if (figma.editorType !== "slides") {
    throw new Error("setSlideGrid can only be used in Figma Slides documents");
  }

  if (!slides || !Array.isArray(slides)) {
    throw new Error("slides parameter must be an array of slide arrangements");
  }

  try {
    // Validate and convert slide IDs to nodes first
    const slideArrangements = [];
    for (const row of slides) {
      const slideNodes = [];
      for (const slideId of row) {
        const node = await figma.getNodeByIdAsync(slideId);
        if (!node || node.type !== "SLIDE") {
          throw new Error(`Invalid slide ID: ${slideId}`);
        }
        slideNodes.push(node);
      }
      slideArrangements.push(slideNodes);
    }

    // Try the correct API method first (on figma object directly)
    if (typeof figma.setSlideGrid === 'function') {
      // Apply the new slide grid arrangement
      figma.setSlideGrid(slideArrangements);

      return {
        success: true,
        message: `Slide grid updated with ${slides.length} rows`,
        method: 'figma.setSlideGrid'
      };
    } 
    // Try the old API method as second fallback
    else if (typeof figma.currentPage.setSlideGrid === 'function') {
      // Apply the new slide grid arrangement
      figma.currentPage.setSlideGrid(slideArrangements);

      return {
        success: true,
        message: `Slide grid updated with ${slides.length} rows`,
        method: 'figma.currentPage.setSlideGrid'
      };
    } else {
      // Manual fallback implementation: manually arrange slides by position
      
      // Constants for slide spacing (based on standard slide dimensions)
      const SLIDE_WIDTH = 1920;
      const SLIDE_HEIGHT = 1080;
      const SPACING = 240;
      const START_X = 240;
      const START_Y = 240;
      
      let updatedCount = 0;
      
      for (let rowIndex = 0; rowIndex < slides.length; rowIndex++) {
        const row = slides[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
          const slideId = row[colIndex];
          const slide = await figma.getNodeByIdAsync(slideId);
          
          if (slide && slide.type === 'SLIDE') {
            slide.x = START_X + (colIndex * (SLIDE_WIDTH + SPACING));
            slide.y = START_Y + (rowIndex * (SLIDE_HEIGHT + SPACING));
            updatedCount++;
          }
        }
      }
      
      return {
        success: true,
        message: `Manually positioned ${updatedCount} slides in ${slides.length} rows`,
        method: 'manual'
      };
    }
  } catch (error) {
    throw new Error(`Failed to set slide grid: ${error.message}`);
  }
}

async function getFocusedSlide() {
  // Check if we're in a Figma Slides document
  if (figma.editorType !== "slides") {
    throw new Error("getFocusedSlide can only be used in Figma Slides documents");
  }

  const focusedSlide = figma.currentPage.focusedSlide;
  if (!focusedSlide) {
    return {
      focusedSlide: null,
      message: "No slide is currently focused",
    };
  }

  return {
    focusedSlide: {
      id: focusedSlide.id,
      name: focusedSlide.name,
      type: focusedSlide.type,
      width: focusedSlide.width,
      height: focusedSlide.height,
    },
  };
}

async function getSlideTransition(params) {
  const { slideId } = params || {};

  // Check if we're in Figma Slides document
  if (figma.editorType !== "slides") {
    throw new Error("getSlideTransition can only be used in Figma Slides documents");
  }

  if (!slideId) {
    throw new Error("Missing slideId parameter");
  }

  const slide = await figma.getNodeByIdAsync(slideId);
  if (!slide) {
    throw new Error(`Slide not found with ID: ${slideId}`);
  }

  if (slide.type !== "SLIDE") {
    throw new Error(`Node is not a slide: ${slideId}`);
  }

  const transition = slide.getSlideTransition();
  return {
    slideId: slideId,
    transition: transition
  };
}

async function setSlideTransition(params) {
  const { slideId, transition } = params || {};

  // Check if we're in Figma Slides document
  if (figma.editorType !== "slides") {
    throw new Error("setSlideTransition can only be used in Figma Slides documents");
  }

  if (!slideId) {
    throw new Error("Missing slideId parameter");
  }

  if (!transition) {
    throw new Error("Missing transition parameter");
  }

  const slide = await figma.getNodeByIdAsync(slideId);
  if (!slide) {
    throw new Error(`Slide not found with ID: ${slideId}`);
  }

  if (slide.type !== "SLIDE") {
    throw new Error(`Node is not a slide: ${slideId}`);
  }

  // Validate transition properties
  const validStyles = [
    'NONE', 'DISSOLVE', 'SLIDE_FROM_LEFT', 'SLIDE_FROM_RIGHT',
    'SLIDE_FROM_TOP', 'SLIDE_FROM_BOTTOM', 'PUSH_FROM_LEFT',
    'PUSH_FROM_RIGHT', 'PUSH_FROM_TOP', 'PUSH_FROM_BOTTOM',
    'MOVE_FROM_LEFT', 'MOVE_FROM_RIGHT', 'MOVE_FROM_TOP',
    'MOVE_FROM_BOTTOM', 'SLIDE_OUT_TO_LEFT', 'SLIDE_OUT_TO_RIGHT',
    'SLIDE_OUT_TO_TOP', 'SLIDE_OUT_TO_BOTTOM', 'MOVE_OUT_TO_LEFT',
    'MOVE_OUT_TO_RIGHT', 'MOVE_OUT_TO_TOP', 'MOVE_OUT_TO_BOTTOM',
    'SMART_ANIMATE'
  ];

  const validCurves = [
    'LINEAR', 'EASE_IN', 'EASE_OUT', 'EASE_IN_AND_OUT',
    'EASE_IN_BACK', 'EASE_OUT_BACK', 'EASE_IN_AND_OUT_BACK'
  ];

  if (transition.style && !validStyles.includes(transition.style)) {
    throw new Error(`Invalid transition style: ${transition.style}`);
  }

  if (transition.curve && !validCurves.includes(transition.curve)) {
    throw new Error(`Invalid transition curve: ${transition.curve}`);
  }

  if (transition.duration !== undefined && (transition.duration < 0.01 || transition.duration > 10)) {
    throw new Error("Transition duration must be between 0.01 and 10 seconds");
  }

  if (transition.timing && transition.timing.type !== 'ON_CLICK' && transition.timing.type !== 'AFTER_DELAY') {
    throw new Error("Invalid timing type. Must be 'ON_CLICK' or 'AFTER_DELAY'");
  }

  if (transition.timing && transition.timing.type === 'AFTER_DELAY' && transition.timing.delay !== undefined) {
    if (transition.timing.delay < 0 || transition.timing.delay > 30) {
      throw new Error("Transition delay must be between 0 and 30 seconds");
    }
  }

  slide.setSlideTransition(transition);

  return {
    success: true,
    slideId: slideId,
    transition: slide.getSlideTransition()
  };
}

async function getSlidesMode() {
  // Check if we're in Figma Slides document
  if (figma.editorType !== "slides") {
    throw new Error("getSlidesMode can only be used in Figma Slides documents");
  }

  try {
    // Check if the slidesMode property exists
    if (figma.viewport && 'slidesMode' in figma.viewport) {
      const mode = figma.viewport.slidesMode;
      
      // Map API values back to our expected values
      const modeMap = {
        'GRID': 'grid',
        'SINGLE_SLIDE': 'single-slide'
      };
      
      return {
        mode: modeMap[mode] || mode
      };
    } else {
      throw new Error("Slides mode API not available in current Figma version");
    }
  } catch (error) {
    throw new Error(`Failed to get slides mode: ${error.message}`);
  }
}

async function setSlidesMode(params) {
  const { mode } = params || {};

  // Check if we're in Figma Slides document
  if (figma.editorType !== "slides") {
    throw new Error("setSlidesMode can only be used in Figma Slides documents");
  }

  if (!mode) {
    throw new Error("Missing mode parameter");
  }

  if (mode !== 'grid' && mode !== 'single-slide') {
    throw new Error("Invalid mode. Must be 'grid' or 'single-slide'");
  }

  try {
    // Check if the slidesMode property exists and is writable
    if (figma.viewport && 'slidesMode' in figma.viewport) {
      // Try to set the slides mode
      const modeMap = {
        'grid': 'GRID',
        'single-slide': 'SINGLE_SLIDE'
      };
      
      // Use the mapped value or original if mapping doesn't exist
      const mappedMode = modeMap[mode] || mode;
      
      // Try different approaches to set the mode
      if (typeof figma.viewport.setViewMode === 'function') {
        await figma.viewport.setViewMode(mappedMode);
      } else {
        // Try direct assignment
        figma.viewport.slidesMode = mappedMode;
      }
      
      return {
        success: true,
        mode: mode
      };
    } else {
      throw new Error("Slides mode API not available in current Figma version");
    }
  } catch (error) {
    throw new Error(`Failed to set slides mode: ${error.message}`);
  }
}

async function getSlideGrid() {
  // Check if we're in Figma Slides document
  if (figma.editorType !== "slides") {
    throw new Error("getSlideGrid can only be used in Figma Slides documents");
  }

  try {
    // Primary method: Use proven scanning approach that works reliably
    // Find all slides and slide rows using the same approach as scan_nodes_by_types
    const slides = figma.currentPage.findAll(n => n.type === 'SLIDE');
    const slideRows = figma.currentPage.findAll(n => n.type === 'SLIDE_ROW');
    
    if (slides.length === 0) {
      return { 
        grid: [], 
        totalSlides: 0, 
        rows: 0, 
        slideRows: [],
        method: 'scanning',
        message: 'No slides found in the presentation'
      };
    }
    
    // Build a map of slide row IDs to their slides
    const rowToSlidesMap = {};
    const slideToRowMap = {};
    
    // First, map each slide to its parent row
    slides.forEach(slide => {
      let parent = slide.parent;
      while (parent && parent.type !== 'SLIDE_ROW') {
        parent = parent.parent;
      }
      if (parent && parent.type === 'SLIDE_ROW') {
        slideToRowMap[slide.id] = parent.id;
        if (!rowToSlidesMap[parent.id]) {
          rowToSlidesMap[parent.id] = [];
        }
        rowToSlidesMap[parent.id].push(slide);
      }
    });
    
    // Create grid structure based on slide rows
    const grid = [];
    const rowInfo = [];
    
    // Sort slide rows by their Y position to maintain order
    const sortedRows = [...slideRows].sort((a, b) => a.y - b.y);
    
    sortedRows.forEach(row => {
      const slidesInRow = rowToSlidesMap[row.id] || [];
      
      // Sort slides in each row by X position
      const sortedSlidesInRow = slidesInRow
        .sort((a, b) => a.x - b.x)
        .map(slide => ({
          id: slide.id,
          name: slide.name,
          type: slide.type,
          x: slide.x,
          y: slide.y,
          width: slide.width,
          height: slide.height
        }));
      
      if (sortedSlidesInRow.length > 0) {
        grid.push(sortedSlidesInRow);
        rowInfo.push({
          id: row.id,
          name: row.name,
          slideCount: sortedSlidesInRow.length,
          y: row.y
        });
      }
    });
    
    // Handle any orphaned slides (slides not in a SLIDE_ROW)
    const orphanedSlides = slides.filter(slide => !slideToRowMap[slide.id]);
    if (orphanedSlides.length > 0) {
      // Group orphaned slides by their Y position
      const SLIDE_HEIGHT = 1080;
      const SPACING = 240;
      const ROW_HEIGHT = SLIDE_HEIGHT + SPACING;
      
      const orphansByRow = {};
      orphanedSlides.forEach(slide => {
        const row = Math.floor((slide.y - 240) / ROW_HEIGHT);
        if (!orphansByRow[row]) orphansByRow[row] = [];
        orphansByRow[row].push({
          id: slide.id,
          name: slide.name,
          type: slide.type,
          x: slide.x,
          y: slide.y,
          width: slide.width,
          height: slide.height
        });
      });
      
      // Add orphaned slides to grid
      Object.keys(orphansByRow)
        .sort((a, b) => Number(a) - Number(b))
        .forEach(rowKey => {
          const slidesInRow = orphansByRow[rowKey].sort((a, b) => a.x - b.x);
          grid.push(slidesInRow);
          rowInfo.push({
            id: `orphan-row-${rowKey}`,
            name: `Orphaned Slides Row ${rowKey}`,
            slideCount: slidesInRow.length,
            y: slidesInRow[0].y,
            isOrphaned: true
          });
        });
    }
    
    return {
      grid: grid,
      totalSlides: slides.length,
      rows: grid.length,
      slideRows: rowInfo,
      method: 'scanning',
      hasOrphanedSlides: orphanedSlides.length > 0,
      orphanedSlidesCount: orphanedSlides.length
    };
    
  } catch (error) {
    throw new Error(`Failed to get slide grid: ${error.message}`);
  }
}

async function createText(params) {
  const {
    x = 0,
    y = 0,
    text = "Text",
    fontSize = 14,
    fontWeight = 400,
    fontColor = { r: 0, g: 0, b: 0, a: 1 }, // Default to black
    name = "",
    parentId,
  } = params || {};

  // Map common font weights to Figma font styles
  const getFontStyle = (weight) => {
    switch (weight) {
      case 100:
        return "Thin";
      case 200:
        return "Extra Light";
      case 300:
        return "Light";
      case 400:
        return "Regular";
      case 500:
        return "Medium";
      case 600:
        return "Semi Bold";
      case 700:
        return "Bold";
      case 800:
        return "Extra Bold";
      case 900:
        return "Black";
      default:
        return "Regular";
    }
  };

  // Handle coordinate transformation for slides
  let actualX = x;
  let actualY = y;
  let targetSlide = null;
  
  if (figma.editorType === "slides") {
    targetSlide = await getTargetSlide(parentId);
    if (targetSlide) {
      // Convert local coordinates to absolute coordinates
      const absoluteCoords = toAbsoluteCoordinates(targetSlide, x, y);
      actualX = absoluteCoords.x;
      actualY = absoluteCoords.y;
    }
  }
  
  const textNode = figma.createText();
  textNode.x = actualX;
  textNode.y = actualY;
  textNode.name = name || text;
  try {
    await figma.loadFontAsync({
      family: "Inter",
      style: getFontStyle(fontWeight),
    });
    textNode.fontName = { family: "Inter", style: getFontStyle(fontWeight) };
    textNode.fontSize = parseInt(fontSize);
  } catch (error) {
    console.error("Error setting font size", error);
  }
  setCharacters(textNode, text);

  // Set text color
  const paintStyle = {
    type: "SOLID",
    color: {
      r: parseFloat(fontColor.r) || 0,
      g: parseFloat(fontColor.g) || 0,
      b: parseFloat(fontColor.b) || 0,
    },
    opacity: parseFloat(fontColor.a) || 1,
  };
  textNode.fills = [paintStyle];

  // If parentId is provided, append to that node, otherwise append to current page
  if (parentId) {
    const parentNode = await figma.getNodeByIdAsync(parentId);
    if (!parentNode) {
      throw new Error(`Parent node not found with ID: ${parentId}`);
    }
    if (!("appendChild" in parentNode)) {
      throw new Error(`Parent node does not support children: ${parentId}`);
    }
    parentNode.appendChild(textNode);
  } else {
    figma.currentPage.appendChild(textNode);
  }

  return {
    id: textNode.id,
    name: textNode.name,
    x: textNode.x,
    y: textNode.y,
    width: textNode.width,
    height: textNode.height,
    characters: textNode.characters,
    fontSize: textNode.fontSize,
    fontWeight: fontWeight,
    fontColor: fontColor,
    fontName: textNode.fontName,
    fills: textNode.fills,
    parentId: textNode.parent ? textNode.parent.id : undefined,
  };
}

async function createShapeWithText(params) {
  const {
    x = 0,
    y = 0,
    width = 200,
    height = 100,
    shapeType = "RECTANGLE",
    text = "Shape Text",
    fillColor,
    strokeColor,
    strokeWeight,
    fontSize = "16",
    fontWeight = "Regular",
    fontColor = { r: 0, g: 0, b: 0, a: 1 },
    name = "Shape with Text",
    parentId
  } = params || {};

  // Check if we're in Figma Slides or FigJam
  if (figma.editorType !== "slides" && figma.editorType !== "figjam") {
    throw new Error("createShapeWithText is only available in Figma Slides and FigJam");
  }

  // Check if createShapeWithText method exists
  if (typeof figma.createShapeWithText !== 'function') {
    throw new Error("createShapeWithText API is not available. Please ensure you're using the latest version of Figma with Slides/FigJam support.");
  }

  const shapeWithText = figma.createShapeWithText();
  
  // Handle coordinate transformation for slides
  let actualX = x;
  let actualY = y;
  let targetSlide = null;
  
  if (figma.editorType === "slides") {
    targetSlide = await getTargetSlide(parentId);
    if (targetSlide) {
      // Convert local coordinates to absolute coordinates
      const absoluteCoords = toAbsoluteCoordinates(targetSlide, x, y);
      actualX = absoluteCoords.x;
      actualY = absoluteCoords.y;
    }
  }
  
  shapeWithText.x = actualX;
  shapeWithText.y = actualY;
  shapeWithText.resize(width, height);
  shapeWithText.name = name;
  shapeWithText.shapeType = shapeType;

  // Set shape fill color if provided
  if (fillColor) {
    const paintStyle = {
      type: "SOLID",
      color: {
        r: parseFloat(fillColor.r) || 0,
        g: parseFloat(fillColor.g) || 0,
        b: parseFloat(fillColor.b) || 0,
      },
      opacity: parseFloat(fillColor.a) || 1,
    };
    shapeWithText.fills = [paintStyle];
  }

  // Set stroke if provided
  if (strokeColor) {
    const strokeStyle = {
      type: "SOLID",
      color: {
        r: parseFloat(strokeColor.r) || 0,
        g: parseFloat(strokeColor.g) || 0,
        b: parseFloat(strokeColor.b) || 0,
      },
      opacity: parseFloat(strokeColor.a) || 1,
    };
    shapeWithText.strokes = [strokeStyle];
  }

  if (strokeWeight !== undefined) {
    shapeWithText.strokeWeight = strokeWeight;
  }

  // Set text
  try {
    await figma.loadFontAsync({
      family: "Inter",
      style: getFontStyle(fontWeight),
    });
    shapeWithText.text.fontName = { family: "Inter", style: getFontStyle(fontWeight) };
    shapeWithText.text.fontSize = parseInt(fontSize);
    shapeWithText.text.characters = text;

    // Set text color
    const textPaintStyle = {
      type: "SOLID",
      color: {
        r: parseFloat(fontColor.r) || 0,
        g: parseFloat(fontColor.g) || 0,
        b: parseFloat(fontColor.b) || 0,
      },
      opacity: parseFloat(fontColor.a) || 1,
    };
    shapeWithText.text.fills = [textPaintStyle];
  } catch (error) {
    console.error("Error setting text properties:", error);
  }

  // Append to parent or current page
  if (parentId) {
    const parentNode = await figma.getNodeByIdAsync(parentId);
    if (!parentNode) {
      throw new Error(`Parent node not found with ID: ${parentId}`);
    }
    if (!("appendChild" in parentNode)) {
      throw new Error(`Parent node does not support children: ${parentId}`);
    }
    parentNode.appendChild(shapeWithText);
  } else {
    figma.currentPage.appendChild(shapeWithText);
  }

  const result = {
    id: shapeWithText.id,
    name: shapeWithText.name,
    x: shapeWithText.x,
    y: shapeWithText.y,
    width: shapeWithText.width,
    height: shapeWithText.height,
    shapeType: shapeWithText.shapeType,
    text: shapeWithText.text.characters,
    parentId: shapeWithText.parent ? shapeWithText.parent.id : undefined,
  };
  
  // Include local coordinates if on a slide
  if (targetSlide) {
    const localCoords = toLocalCoordinates(targetSlide, shapeWithText.x, shapeWithText.y);
    result.localX = localCoords.x;
    result.localY = localCoords.y;
    result.slideId = targetSlide.id;
  }
  
  return result;
}

async function createTable(params) {
  const {
    x = 0,
    y = 0,
    rows = 3,
    columns = 3,
    cellWidth = 100,
    cellHeight = 40,
    name = "Table",
    parentId
  } = params || {};

  // Check if we're in Figma Slides or Design
  if (figma.editorType !== "slides" && figma.editorType !== "figma") {
    throw new Error("createTable is only available in Figma Design and Slides");
  }

  try {
    // Handle coordinate transformation for slides
    let actualX = x;
    let actualY = y;
    let targetSlide = null;
    
    if (figma.editorType === "slides") {
      targetSlide = await getTargetSlide(parentId);
      if (targetSlide) {
        // Convert local coordinates to absolute coordinates
        const absoluteCoords = toAbsoluteCoordinates(targetSlide, x, y);
        actualX = absoluteCoords.x;
        actualY = absoluteCoords.y;
      }
    }
    
    // Check if createTable method exists
    if (typeof figma.createTable === 'function') {
      const table = figma.createTable();
      table.x = actualX;
      table.y = actualY;
      table.name = name;
      
      // Resize the table to accommodate the cells
      table.resize(columns * cellWidth, rows * cellHeight);

      // Create cells
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const cell = table.cellAt(row, col);
          if (cell) {
            cell.resize(cellWidth, cellHeight);
          }
        }
      }

      // Append to parent or current page
      if (parentId) {
        const parentNode = await figma.getNodeByIdAsync(parentId);
        if (!parentNode) {
          throw new Error(`Parent node not found with ID: ${parentId}`);
        }
        if (!("appendChild" in parentNode)) {
          throw new Error(`Parent node does not support children: ${parentId}`);
        }
        parentNode.appendChild(table);
      } else {
        figma.currentPage.appendChild(table);
      }

      return {
        id: table.id,
        name: table.name,
        x: table.x,
        y: table.y,
        width: table.width,
        height: table.height,
        rows: rows,
        columns: columns,
        parentId: table.parent ? table.parent.id : undefined,
      };
    } else {
      // Fallback: Create table-like structure with frames
      const tableFrame = figma.createFrame();
      tableFrame.name = name;
      tableFrame.x = actualX;
      tableFrame.y = actualY;
      tableFrame.layoutMode = "VERTICAL";
      tableFrame.itemSpacing = 0;
      tableFrame.paddingLeft = 0;
      tableFrame.paddingRight = 0;
      tableFrame.paddingTop = 0;
      tableFrame.paddingBottom = 0;
      tableFrame.clipsContent = true;
      
      // Create rows
      for (let r = 0; r < rows; r++) {
        const rowFrame = figma.createFrame();
        rowFrame.name = `Row ${r + 1}`;
        rowFrame.layoutMode = "HORIZONTAL";
        rowFrame.itemSpacing = 0;
        rowFrame.layoutSizingHorizontal = "HUG";
        rowFrame.layoutSizingVertical = "HUG";
        
        // Create cells in each row
        for (let c = 0; c < columns; c++) {
          const cellFrame = figma.createFrame();
          cellFrame.name = `Cell ${r + 1}-${c + 1}`;
          cellFrame.resize(cellWidth, cellHeight);
          
          // Add border to cells
          cellFrame.strokes = [{
            type: 'SOLID',
            color: { r: 0.8, g: 0.8, b: 0.8 }
          }];
          cellFrame.strokeWeight = 1;
          cellFrame.strokeAlign = "INSIDE";
          
          // Add white background
          cellFrame.fills = [{
            type: 'SOLID',
            color: { r: 1, g: 1, b: 1 }
          }];
          
          rowFrame.appendChild(cellFrame);
        }
        
        tableFrame.appendChild(rowFrame);
      }
      
      // Resize table frame to fit content
      tableFrame.resize(columns * cellWidth, rows * cellHeight);
      
      // Append to parent or current page
      if (parentId) {
        const parentNode = await figma.getNodeByIdAsync(parentId);
        if (!parentNode) {
          throw new Error(`Parent node not found with ID: ${parentId}`);
        }
        if (!("appendChild" in parentNode)) {
          throw new Error(`Parent node does not support children: ${parentId}`);
        }
        parentNode.appendChild(tableFrame);
      } else {
        figma.currentPage.appendChild(tableFrame);
      }
      
      return {
        id: tableFrame.id,
        name: tableFrame.name,
        x: tableFrame.x,
        y: tableFrame.y,
        width: tableFrame.width,
        height: tableFrame.height,
        rows: rows,
        columns: columns,
        type: "TABLE_FRAME", // Custom type to indicate fallback
        parentId: tableFrame.parent ? tableFrame.parent.id : undefined,
        message: "Created table-like structure using frames (native table API not available)"
      };
    }
  } catch (error) {
    throw new Error(`Failed to create table: ${error.message}`);
  }
}

async function createGif(params) {
  const {
    url,
    x = 0,
    y = 0,
    width = 300,
    height = 200,
    name = "GIF",
    parentId
  } = params || {};

  // Check if we're in Figma Slides or FigJam
  if (figma.editorType !== "slides" && figma.editorType !== "figjam") {
    throw new Error("createGif is only available in Figma Slides and FigJam");
  }

  if (!url) {
    throw new Error("Missing url parameter for GIF");
  }

  try {
    // Handle coordinate transformation for slides
    let actualX = x;
    let actualY = y;
    let targetSlide = null;
    
    if (figma.editorType === "slides") {
      targetSlide = await getTargetSlide(parentId);
      if (targetSlide) {
        // Convert local coordinates to absolute coordinates
        const absoluteCoords = toAbsoluteCoordinates(targetSlide, x, y);
        actualX = absoluteCoords.x;
        actualY = absoluteCoords.y;
      }
    }
    
    // Check if createGifAsync method exists
    if (typeof figma.createGifAsync === 'function') {
      const gif = await figma.createGifAsync(url);
      gif.x = actualX;
      gif.y = actualY;
      gif.resize(width, height);
      gif.name = name;

      // Append to parent or current page
      if (parentId) {
        const parentNode = await figma.getNodeByIdAsync(parentId);
        if (!parentNode) {
          throw new Error(`Parent node not found with ID: ${parentId}`);
        }
        if (!("appendChild" in parentNode)) {
          throw new Error(`Parent node does not support children: ${parentId}`);
        }
        parentNode.appendChild(gif);
      } else {
        figma.currentPage.appendChild(gif);
      }

      return {
        id: gif.id,
        name: gif.name,
        x: gif.x,
        y: gif.y,
        width: gif.width,
        height: gif.height,
        url: url,
        parentId: gif.parent ? gif.parent.id : undefined,
      };
    } else if (typeof figma.createMedia === 'function') {
      // Try createMedia as alternative
      const media = figma.createMedia();
      media.x = actualX;
      media.y = actualY;
      media.resize(width, height);
      media.name = name;
      
      // Note: setMediaAsync would require fetching and converting the GIF
      // For now, we'll create a placeholder
      
      // Append to parent or current page
      if (parentId) {
        const parentNode = await figma.getNodeByIdAsync(parentId);
        if (!parentNode) {
          throw new Error(`Parent node not found with ID: ${parentId}`);
        }
        if (!("appendChild" in parentNode)) {
          throw new Error(`Parent node does not support children: ${parentId}`);
        }
        parentNode.appendChild(media);
      } else {
        figma.currentPage.appendChild(media);
      }

      return {
        id: media.id,
        name: media.name,
        x: media.x,
        y: media.y,
        width: media.width,
        height: media.height,
        url: url,
        type: media.type,
        parentId: media.parent ? media.parent.id : undefined,
        message: "Created media placeholder - GIF upload requires additional implementation"
      };
    } else {
      // Fallback: Create a frame with an image fill placeholder
      const placeholder = figma.createFrame();
      placeholder.name = name;
      placeholder.x = actualX;
      placeholder.y = actualY;
      placeholder.resize(width, height);
      
      // Add a semi-transparent fill to indicate it's a placeholder
      placeholder.fills = [{
        type: 'SOLID',
        color: { r: 0.9, g: 0.9, b: 0.9 },
        opacity: 0.5
      }];
      
      // Add stroke to make it visible
      placeholder.strokes = [{
        type: 'SOLID',
        color: { r: 0.5, g: 0.5, b: 0.5 }
      }];
      placeholder.strokeWeight = 2;
      placeholder.strokeAlign = "INSIDE";
      
      // Add a text label
      const label = figma.createText();
      try {
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });
        label.fontName = { family: "Inter", style: "Regular" };
        label.characters = "GIF Placeholder\n" + url.substring(0, 30) + "...";
        label.fontSize = 14;
        label.textAlignHorizontal = "CENTER";
        label.textAlignVertical = "CENTER";
        label.resize(width - 20, height - 20);
        label.x = 10;
        label.y = 10;
        placeholder.appendChild(label);
      } catch (fontError) {
        console.warn("Could not load font for GIF placeholder label");
      }
      
      // Append to parent or current page
      if (parentId) {
        const parentNode = await figma.getNodeByIdAsync(parentId);
        if (!parentNode) {
          throw new Error(`Parent node not found with ID: ${parentId}`);
        }
        if (!("appendChild" in parentNode)) {
          throw new Error(`Parent node does not support children: ${parentId}`);
        }
        parentNode.appendChild(placeholder);
      } else {
        figma.currentPage.appendChild(placeholder);
      }
      
      return {
        id: placeholder.id,
        name: placeholder.name,
        x: placeholder.x,
        y: placeholder.y,
        width: placeholder.width,
        height: placeholder.height,
        url: url,
        type: "GIF_PLACEHOLDER",
        parentId: placeholder.parent ? placeholder.parent.id : undefined,
        message: "Created GIF placeholder frame (native GIF API not available)"
      };
    }
  } catch (error) {
    throw new Error(`Failed to create GIF: ${error.message}`);
  }
}

async function setFillColor(params) {
  console.log("setFillColor", params);
  const {
    nodeId,
    color: { r, g, b, a },
  } = params || {};

  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }

  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node not found with ID: ${nodeId}`);
  }

  if (!("fills" in node)) {
    throw new Error(`Node does not support fills: ${nodeId}`);
  }

  // Create RGBA color
  const rgbColor = {
    r: parseFloat(r) || 0,
    g: parseFloat(g) || 0,
    b: parseFloat(b) || 0,
    a: parseFloat(a) || 1,
  };

  // Set fill
  const paintStyle = {
    type: "SOLID",
    color: {
      r: parseFloat(rgbColor.r),
      g: parseFloat(rgbColor.g),
      b: parseFloat(rgbColor.b),
    },
    opacity: parseFloat(rgbColor.a),
  };

  console.log("paintStyle", paintStyle);

  node.fills = [paintStyle];

  return {
    id: node.id,
    name: node.name,
    fills: [paintStyle],
  };
}

async function setStrokeColor(params) {
  const {
    nodeId,
    color: { r, g, b, a },
    weight = 1,
  } = params || {};

  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }

  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node not found with ID: ${nodeId}`);
  }

  if (!("strokes" in node)) {
    throw new Error(`Node does not support strokes: ${nodeId}`);
  }

  // Create RGBA color
  const rgbColor = {
    r: r !== undefined ? r : 0,
    g: g !== undefined ? g : 0,
    b: b !== undefined ? b : 0,
    a: a !== undefined ? a : 1,
  };

  // Set stroke
  const paintStyle = {
    type: "SOLID",
    color: {
      r: rgbColor.r,
      g: rgbColor.g,
      b: rgbColor.b,
    },
    opacity: rgbColor.a,
  };

  node.strokes = [paintStyle];

  // Set stroke weight if available
  if ("strokeWeight" in node) {
    node.strokeWeight = weight;
  }

  return {
    id: node.id,
    name: node.name,
    strokes: node.strokes,
    strokeWeight: "strokeWeight" in node ? node.strokeWeight : undefined,
  };
}

async function moveNode(params) {
  const { nodeId, x, y } = params || {};

  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }

  if (x === undefined || y === undefined) {
    throw new Error("Missing x or y parameters");
  }

  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node not found with ID: ${nodeId}`);
  }

  if (!("x" in node) || !("y" in node)) {
    throw new Error(`Node does not support position: ${nodeId}`);
  }

  node.x = x;
  node.y = y;

  return {
    id: node.id,
    name: node.name,
    x: node.x,
    y: node.y,
  };
}

async function resizeNode(params) {
  const { nodeId, width, height } = params || {};

  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }

  if (width === undefined || height === undefined) {
    throw new Error("Missing width or height parameters");
  }

  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node not found with ID: ${nodeId}`);
  }

  if (!("resize" in node)) {
    throw new Error(`Node does not support resizing: ${nodeId}`);
  }

  node.resize(width, height);

  return {
    id: node.id,
    name: node.name,
    width: node.width,
    height: node.height,
  };
}

async function deleteNode(params) {
  const { nodeId } = params || {};

  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }

  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node not found with ID: ${nodeId}`);
  }

  // Save node info before deleting
  const nodeInfo = {
    id: node.id,
    name: node.name,
    type: node.type,
  };

  node.remove();

  return nodeInfo;
}

async function getStyles() {
  // Check if we're in Figma Slides
  if (figma.editorType === "slides") {
    return {
      error: "Styles are not supported in Figma Slides",
      colors: [],
      texts: [],
      effects: [],
      grids: []
    };
  }

  const styles = {
    colors: await figma.getLocalPaintStylesAsync(),
    texts: await figma.getLocalTextStylesAsync(),
    effects: await figma.getLocalEffectStylesAsync(),
    grids: await figma.getLocalGridStylesAsync(),
  };

  return {
    colors: styles.colors.map((style) => ({
      id: style.id,
      name: style.name,
      key: style.key,
      paint: style.paints[0],
    })),
    texts: styles.texts.map((style) => ({
      id: style.id,
      name: style.name,
      key: style.key,
      fontSize: style.fontSize,
      fontName: style.fontName,
    })),
    effects: styles.effects.map((style) => ({
      id: style.id,
      name: style.name,
      key: style.key,
    })),
    grids: styles.grids.map((style) => ({
      id: style.id,
      name: style.name,
      key: style.key,
    })),
  };
}

async function getLocalComponents() {
  // Check if we're in Figma Slides
  if (figma.editorType === "slides") {
    return {
      error: "Components are not supported in Figma Slides",
      count: 0,
      components: []
    };
  }

  await figma.loadAllPagesAsync();

  const components = figma.root.findAllWithCriteria({
    types: ["COMPONENT"],
  });

  return {
    count: components.length,
    components: components.map((component) => ({
      id: component.id,
      name: component.name,
      key: "key" in component ? component.key : null,
    })),
  };
}

// async function getTeamComponents() {
//   try {
//     const teamComponents =
//       await figma.teamLibrary.getAvailableComponentsAsync();

//     return {
//       count: teamComponents.length,
//       components: teamComponents.map((component) => ({
//         key: component.key,
//         name: component.name,
//         description: component.description,
//         libraryName: component.libraryName,
//       })),
//     };
//   } catch (error) {
//     throw new Error(`Error getting team components: ${error.message}`);
//   }
// }

async function createComponentInstance(params) {
  const { componentKey, x = 0, y = 0 } = params || {};

  // Check if we're in Figma Slides
  if (figma.editorType === "slides") {
    throw new Error("Components are not supported in Figma Slides");
  }

  if (!componentKey) {
    throw new Error("Missing componentKey parameter");
  }

  try {
    const component = await figma.importComponentByKeyAsync(componentKey);
    const instance = component.createInstance();

    instance.x = x;
    instance.y = y;

    figma.currentPage.appendChild(instance);

    return {
      id: instance.id,
      name: instance.name,
      x: instance.x,
      y: instance.y,
      width: instance.width,
      height: instance.height,
      componentId: instance.componentId,
    };
  } catch (error) {
    throw new Error(`Error creating component instance: ${error.message}`);
  }
}

async function exportNodeAsImage(params) {
  const { nodeId, scale = 1 } = params || {};

  const format = "PNG";

  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }

  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node not found with ID: ${nodeId}`);
  }

  if (!("exportAsync" in node)) {
    throw new Error(`Node does not support exporting: ${nodeId}`);
  }

  try {
    const settings = {
      format: format,
      constraint: { type: "SCALE", value: scale },
    };

    const bytes = await node.exportAsync(settings);

    let mimeType;
    switch (format) {
      case "PNG":
        mimeType = "image/png";
        break;
      case "JPG":
        mimeType = "image/jpeg";
        break;
      case "SVG":
        mimeType = "image/svg+xml";
        break;
      case "PDF":
        mimeType = "application/pdf";
        break;
      default:
        mimeType = "application/octet-stream";
    }

    // Proper way to convert Uint8Array to base64
    const base64 = customBase64Encode(bytes);
    // const imageData = `data:${mimeType};base64,${base64}`;

    return {
      nodeId,
      format,
      scale,
      mimeType,
      imageData: base64,
    };
  } catch (error) {
    throw new Error(`Error exporting node as image: ${error.message}`);
  }
}
function customBase64Encode(bytes) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let base64 = "";

  const byteLength = bytes.byteLength;
  const byteRemainder = byteLength % 3;
  const mainLength = byteLength - byteRemainder;

  let a, b, c, d;
  let chunk;

  // Main loop deals with bytes in chunks of 3
  for (let i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048) >> 12; // 258048 = (2^6 - 1) << 12
    c = (chunk & 4032) >> 6; // 4032 = (2^6 - 1) << 6
    d = chunk & 63; // 63 = 2^6 - 1

    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += chars[a] + chars[b] + chars[c] + chars[d];
  }

  // Deal with the remaining bytes and padding
  if (byteRemainder === 1) {
    chunk = bytes[mainLength];

    a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

    // Set the 4 least significant bits to zero
    b = (chunk & 3) << 4; // 3 = 2^2 - 1

    base64 += chars[a] + chars[b] + "==";
  } else if (byteRemainder === 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

    a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008) >> 4; // 1008 = (2^6 - 1) << 4

    // Set the 2 least significant bits to zero
    c = (chunk & 15) << 2; // 15 = 2^4 - 1

    base64 += chars[a] + chars[b] + chars[c] + "=";
  }

  return base64;
}

async function setCornerRadius(params) {
  const { nodeId, radius, corners } = params || {};

  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }

  if (radius === undefined) {
    throw new Error("Missing radius parameter");
  }

  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node not found with ID: ${nodeId}`);
  }

  // Check if node supports corner radius
  if (!("cornerRadius" in node)) {
    throw new Error(`Node does not support corner radius: ${nodeId}`);
  }

  // If corners array is provided, set individual corner radii
  if (corners && Array.isArray(corners) && corners.length === 4) {
    if ("topLeftRadius" in node) {
      // Node supports individual corner radii
      if (corners[0]) node.topLeftRadius = radius;
      if (corners[1]) node.topRightRadius = radius;
      if (corners[2]) node.bottomRightRadius = radius;
      if (corners[3]) node.bottomLeftRadius = radius;
    } else {
      // Node only supports uniform corner radius
      node.cornerRadius = radius;
    }
  } else {
    // Set uniform corner radius
    node.cornerRadius = radius;
  }

  return {
    id: node.id,
    name: node.name,
    cornerRadius: "cornerRadius" in node ? node.cornerRadius : undefined,
    topLeftRadius: "topLeftRadius" in node ? node.topLeftRadius : undefined,
    topRightRadius: "topRightRadius" in node ? node.topRightRadius : undefined,
    bottomRightRadius:
      "bottomRightRadius" in node ? node.bottomRightRadius : undefined,
    bottomLeftRadius:
      "bottomLeftRadius" in node ? node.bottomLeftRadius : undefined,
  };
}

async function setTextContent(params) {
  const { nodeId, text } = params || {};

  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }

  if (text === undefined) {
    throw new Error("Missing text parameter");
  }

  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node not found with ID: ${nodeId}`);
  }

  // Handle both TEXT nodes and TABLE_CELL nodes
  let textNode;
  if (node.type === "TEXT") {
    textNode = node;
  } else if (node.type === "TABLE_CELL") {
    textNode = node.text; // Access the text sublayer
    console.log(`Handling TABLE_CELL node ${nodeId}, accessing text sublayer`);
  } else {
    throw new Error(`Node is not a text node or table cell: ${nodeId} (type: ${node.type})`);
  }

  try {
    // FIX: Don't access node.fontName directly first - it might throw "Cannot unwrap symbol"
    // Instead, use getRangeAllFontNames which is safe for mixed fonts
    let fontsToLoad = [];
    let hasMixedFonts = false;
    
    try {
      // Safe way to get all fonts without triggering the symbol error
      fontsToLoad = textNode.getRangeAllFontNames(0, textNode.characters.length);
      console.log(`Found ${fontsToLoad.length} fonts in text node:`, fontsToLoad.map(f => `${f.family} ${f.style}`));
      hasMixedFonts = fontsToLoad.length > 1;
    } catch (e) {
      console.warn("Could not get fonts from text node:", e.message);
    }

    // Check if node has missing fonts before trying to load
    if (textNode.hasMissingFont) {
      console.warn("Text node has missing fonts - will use fallback strategy");
    } else if (fontsToLoad.length > 0) {
      // Try to load all fonts, but continue even if some fail
      const loadResults = await Promise.allSettled(
        fontsToLoad.map(font => figma.loadFontAsync(font))
      );
      
      const failedLoads = loadResults.filter(r => r.status === 'rejected');
      if (failedLoads.length > 0) {
        console.warn(`Failed to load ${failedLoads.length} out of ${fontsToLoad.length} fonts`);
      }
    }

    // Now use setCharacters with appropriate strategy
    const fallbackFont = { family: "Inter", style: "Regular" };
    
    if (hasMixedFonts || textNode.hasMissingFont) {
      // Mixed fonts or missing fonts - use smart strategy
      const success = await setCharacters(textNode, text, { 
        smartStrategy: "prevail",
        fallbackFont: fallbackFont
      });
      
      if (!success) {
        throw new Error("Failed to set text content with mixed fonts");
      }
    } else {
      // Single font case - simpler handling
      await setCharacters(textNode, text, { 
        fallbackFont: fallbackFont 
      });
    }

    // Return safe values - avoid returning figma.mixed
    let safeFontName = fallbackFont;
    try {
      // Only try to access fontName after we've set the text
      if (textNode.fontName !== figma.mixed) {
        safeFontName = textNode.fontName;
      }
    } catch (e) {
      // Even this check can throw, so we catch it
      console.warn("Could not get fontName for return value");
    }

    return {
      id: node.id,
      name: node.name,
      characters: textNode.characters,
      fontName: safeFontName,
    };
  } catch (error) {
    throw new Error(`Error setting text content: ${error.message}`);
  }
}

// Initialize settings on load
(async function initializePlugin() {
  try {
    const savedSettings = await figma.clientStorage.getAsync("settings");
    if (savedSettings) {
      if (savedSettings.serverPort) {
        state.serverPort = savedSettings.serverPort;
      }
    }

    // Send initial settings to UI
    figma.ui.postMessage({
      type: "init-settings",
      settings: {
        serverPort: state.serverPort,
      },
    });
  } catch (error) {
    console.error("Error loading settings:", error);
  }
})();

function uniqBy(arr, predicate) {
  const cb = typeof predicate === "function" ? predicate : (o) => o[predicate];
  return [
    ...arr
      .reduce((map, item) => {
        const key = item === null || item === undefined ? item : cb(item);

        map.has(key) || map.set(key, item);

        return map;
      }, new Map())
      .values()
  ];
}
const setCharacters = async (node, characters, options) => {
  const fallbackFont = (options && options.fallbackFont) || {
    family: "Inter",
    style: "Regular",
  };
  try {
    if (node.fontName === figma.mixed) {
      if (options && options.smartStrategy === "prevail") {
        const fontHashTree = {};
        for (let i = 1; i < node.characters.length; i++) {
          const charFont = node.getRangeFontName(i - 1, i);
          const key = `${charFont.family}::${charFont.style}`;
          fontHashTree[key] = fontHashTree[key] ? fontHashTree[key] + 1 : 1;
        }
        const prevailedTreeItem = Object.entries(fontHashTree).sort(
          (a, b) => b[1] - a[1]
        )[0];
        const [family, style] = prevailedTreeItem[0].split("::");
        const prevailedFont = {
          family,
          style,
        };
        await figma.loadFontAsync(prevailedFont);
        node.fontName = prevailedFont;
      } else if (options && options.smartStrategy === "strict") {
        return setCharactersWithStrictMatchFont(node, characters, fallbackFont);
      } else if (options && options.smartStrategy === "experimental") {
        return setCharactersWithSmartMatchFont(node, characters, fallbackFont);
      } else {
        const firstCharFont = node.getRangeFontName(0, 1);
        await figma.loadFontAsync(firstCharFont);
        node.fontName = firstCharFont;
      }
    } else {
      await figma.loadFontAsync({
        family: node.fontName.family,
        style: node.fontName.style,
      });
    }
  } catch (err) {
    console.warn(
      `Failed to load "${node.fontName["family"]} ${node.fontName["style"]}" font and replaced with fallback "${fallbackFont.family} ${fallbackFont.style}"`,
      err
    );
    await figma.loadFontAsync(fallbackFont);
    node.fontName = fallbackFont;
  }
  try {
    node.characters = characters;
    return true;
  } catch (err) {
    console.warn(`Failed to set characters. Skipped.`, err);
    return false;
  }
};

const setCharactersWithStrictMatchFont = async (
  node,
  characters,
  fallbackFont
) => {
  const fontHashTree = {};
  for (let i = 1; i < node.characters.length; i++) {
    const startIdx = i - 1;
    const startCharFont = node.getRangeFontName(startIdx, i);
    const startCharFontVal = `${startCharFont.family}::${startCharFont.style}`;
    while (i < node.characters.length) {
      i++;
      const charFont = node.getRangeFontName(i - 1, i);
      if (startCharFontVal !== `${charFont.family}::${charFont.style}`) {
        break;
      }
    }
    fontHashTree[`${startIdx}_${i}`] = startCharFontVal;
  }
  await figma.loadFontAsync(fallbackFont);
  node.fontName = fallbackFont;
  node.characters = characters;
  console.log(fontHashTree);
  await Promise.all(
    Object.keys(fontHashTree).map(async (range) => {
      console.log(range, fontHashTree[range]);
      const [start, end] = range.split("_");
      const [family, style] = fontHashTree[range].split("::");
      const matchedFont = {
        family,
        style,
      };
      await figma.loadFontAsync(matchedFont);
      return node.setRangeFontName(Number(start), Number(end), matchedFont);
    })
  );
  return true;
};

const getDelimiterPos = (str, delimiter, startIdx = 0, endIdx = str.length) => {
  const indices = [];
  let temp = startIdx;
  for (let i = startIdx; i < endIdx; i++) {
    if (
      str[i] === delimiter &&
      i + startIdx !== endIdx &&
      temp !== i + startIdx
    ) {
      indices.push([temp, i + startIdx]);
      temp = i + startIdx + 1;
    }
  }
  temp !== endIdx && indices.push([temp, endIdx]);
  return indices.filter(Boolean);
};

const buildLinearOrder = (node) => {
  const fontTree = [];
  const newLinesPos = getDelimiterPos(node.characters, "\n");
  newLinesPos.forEach(([newLinesRangeStart, newLinesRangeEnd], n) => {
    const newLinesRangeFont = node.getRangeFontName(
      newLinesRangeStart,
      newLinesRangeEnd
    );
    if (newLinesRangeFont === figma.mixed) {
      const spacesPos = getDelimiterPos(
        node.characters,
        " ",
        newLinesRangeStart,
        newLinesRangeEnd
      );
      spacesPos.forEach(([spacesRangeStart, spacesRangeEnd], s) => {
        const spacesRangeFont = node.getRangeFontName(
          spacesRangeStart,
          spacesRangeEnd
        );
        if (spacesRangeFont === figma.mixed) {
          const spacesRangeFont = node.getRangeFontName(
            spacesRangeStart,
            spacesRangeStart[0]
          );
          fontTree.push({
            start: spacesRangeStart,
            delimiter: " ",
            family: spacesRangeFont.family,
            style: spacesRangeFont.style,
          });
        } else {
          fontTree.push({
            start: spacesRangeStart,
            delimiter: " ",
            family: spacesRangeFont.family,
            style: spacesRangeFont.style,
          });
        }
      });
    } else {
      fontTree.push({
        start: newLinesRangeStart,
        delimiter: "\n",
        family: newLinesRangeFont.family,
        style: newLinesRangeFont.style,
      });
    }
  });
  return fontTree
    .sort((a, b) => +a.start - +b.start)
    .map(({ family, style, delimiter }) => ({ family, style, delimiter }));
};

const setCharactersWithSmartMatchFont = async (
  node,
  characters,
  fallbackFont
) => {
  const rangeTree = buildLinearOrder(node);
  const fontsToLoad = uniqBy(
    rangeTree,
    ({ family, style }) => `${family}::${style}`
  ).map(({ family, style }) => ({
    family,
    style,
  }));

  await Promise.all([...fontsToLoad, fallbackFont].map(figma.loadFontAsync));

  node.fontName = fallbackFont;
  node.characters = characters;

  let prevPos = 0;
  rangeTree.forEach(({ family, style, delimiter }) => {
    if (prevPos < node.characters.length) {
      const delimeterPos = node.characters.indexOf(delimiter, prevPos);
      const endPos =
        delimeterPos > prevPos ? delimeterPos : node.characters.length;
      const matchedFont = {
        family,
        style,
      };
      node.setRangeFontName(prevPos, endPos, matchedFont);
      prevPos = endPos + 1;
    }
  });
  return true;
};

// Add the cloneNode function implementation
async function cloneNode(params) {
  const { nodeId, x, y } = params || {};

  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }

  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node not found with ID: ${nodeId}`);
  }

  // Clone the node
  const clone = node.clone();

  // If x and y are provided, move the clone to that position
  if (x !== undefined && y !== undefined) {
    if (!("x" in clone) || !("y" in clone)) {
      throw new Error(`Cloned node does not support position: ${nodeId}`);
    }
    clone.x = x;
    clone.y = y;
  }

  // Add the clone to the same parent as the original node
  if (node.parent) {
    node.parent.appendChild(clone);
  } else {
    figma.currentPage.appendChild(clone);
  }

  return {
    id: clone.id,
    name: clone.name,
    x: "x" in clone ? clone.x : undefined,
    y: "y" in clone ? clone.y : undefined,
    width: "width" in clone ? clone.width : undefined,
    height: "height" in clone ? clone.height : undefined,
  };
}

async function scanTextNodes(params) {
  console.log(`Starting to scan text nodes from node ID: ${params.nodeId}`);
  const {
    nodeId,
    useChunking = true,
    chunkSize = 10,
    commandId = generateCommandId(),
  } = params || {};

  const node = await figma.getNodeByIdAsync(nodeId);

  if (!node) {
    console.error(`Node with ID ${nodeId} not found`);
    // Send error progress update
    sendProgressUpdate(
      commandId,
      "scan_text_nodes",
      "error",
      0,
      0,
      0,
      `Node with ID ${nodeId} not found`,
      { error: `Node not found: ${nodeId}` }
    );
    throw new Error(`Node with ID ${nodeId} not found`);
  }

  // If chunking is not enabled, use the original implementation
  if (!useChunking) {
    const textNodes = [];
    try {
      // Send started progress update
      sendProgressUpdate(
        commandId,
        "scan_text_nodes",
        "started",
        0,
        1, // Not known yet how many nodes there are
        0,
        `Starting scan of node "${node.name || nodeId}" without chunking`,
        null
      );

      await findTextNodes(node, [], 0, textNodes);

      // Send completed progress update
      sendProgressUpdate(
        commandId,
        "scan_text_nodes",
        "completed",
        100,
        textNodes.length,
        textNodes.length,
        `Scan complete. Found ${textNodes.length} text nodes.`,
        { textNodes }
      );

      return {
        success: true,
        message: `Scanned ${textNodes.length} text nodes.`,
        count: textNodes.length,
        textNodes: textNodes,
        commandId,
      };
    } catch (error) {
      console.error("Error scanning text nodes:", error);

      // Send error progress update
      sendProgressUpdate(
        commandId,
        "scan_text_nodes",
        "error",
        0,
        0,
        0,
        `Error scanning text nodes: ${error.message}`,
        { error: error.message }
      );

      throw new Error(`Error scanning text nodes: ${error.message}`);
    }
  }

  // Chunked implementation
  console.log(`Using chunked scanning with chunk size: ${chunkSize}`);

  // First, collect all nodes to process (without processing them yet)
  const nodesToProcess = [];

  // Send started progress update
  sendProgressUpdate(
    commandId,
    "scan_text_nodes",
    "started",
    0,
    0, // Not known yet how many nodes there are
    0,
    `Starting chunked scan of node "${node.name || nodeId}"`,
    { chunkSize }
  );

  await collectNodesToProcess(node, [], 0, nodesToProcess);

  const totalNodes = nodesToProcess.length;
  console.log(`Found ${totalNodes} total nodes to process`);

  // Calculate number of chunks needed
  const totalChunks = Math.ceil(totalNodes / chunkSize);
  console.log(`Will process in ${totalChunks} chunks`);

  // Send update after node collection
  sendProgressUpdate(
    commandId,
    "scan_text_nodes",
    "in_progress",
    5, // 5% progress for collection phase
    totalNodes,
    0,
    `Found ${totalNodes} nodes to scan. Will process in ${totalChunks} chunks.`,
    {
      totalNodes,
      totalChunks,
      chunkSize,
    }
  );

  // Process nodes in chunks
  const allTextNodes = [];
  let processedNodes = 0;
  let chunksProcessed = 0;

  for (let i = 0; i < totalNodes; i += chunkSize) {
    const chunkEnd = Math.min(i + chunkSize, totalNodes);
    console.log(
      `Processing chunk ${chunksProcessed + 1}/${totalChunks} (nodes ${i} to ${chunkEnd - 1
      })`
    );

    // Send update before processing chunk
    sendProgressUpdate(
      commandId,
      "scan_text_nodes",
      "in_progress",
      Math.round(5 + (chunksProcessed / totalChunks) * 90), // 5-95% for processing
      totalNodes,
      processedNodes,
      `Processing chunk ${chunksProcessed + 1}/${totalChunks}`,
      {
        currentChunk: chunksProcessed + 1,
        totalChunks,
        textNodesFound: allTextNodes.length,
      }
    );

    const chunkNodes = nodesToProcess.slice(i, chunkEnd);
    const chunkTextNodes = [];

    // Process each node in this chunk
    for (const nodeInfo of chunkNodes) {
      if (nodeInfo.node.type === "TEXT") {
        try {
          const textNodeInfo = await processTextNode(
            nodeInfo.node,
            nodeInfo.parentPath,
            nodeInfo.depth
          );
          if (textNodeInfo) {
            chunkTextNodes.push(textNodeInfo);
          }
        } catch (error) {
          console.error(`Error processing text node: ${error.message}`);
          // Continue with other nodes
        }
      }

      // Brief delay to allow UI updates and prevent freezing
      await delay(5);
    }

    // Add results from this chunk
    allTextNodes.push(...chunkTextNodes);
    processedNodes += chunkNodes.length;
    chunksProcessed++;

    // Send update after processing chunk
    sendProgressUpdate(
      commandId,
      "scan_text_nodes",
      "in_progress",
      Math.round(5 + (chunksProcessed / totalChunks) * 90), // 5-95% for processing
      totalNodes,
      processedNodes,
      `Processed chunk ${chunksProcessed}/${totalChunks}. Found ${allTextNodes.length} text nodes so far.`,
      {
        currentChunk: chunksProcessed,
        totalChunks,
        processedNodes,
        textNodesFound: allTextNodes.length,
        chunkResult: chunkTextNodes,
      }
    );

    // Small delay between chunks to prevent UI freezing
    if (i + chunkSize < totalNodes) {
      await delay(50);
    }
  }

  // Send completed progress update
  sendProgressUpdate(
    commandId,
    "scan_text_nodes",
    "completed",
    100,
    totalNodes,
    processedNodes,
    `Scan complete. Found ${allTextNodes.length} text nodes.`,
    {
      textNodes: allTextNodes,
      processedNodes,
      chunks: chunksProcessed,
    }
  );

  return {
    success: true,
    message: `Chunked scan complete. Found ${allTextNodes.length} text nodes.`,
    totalNodes: allTextNodes.length,
    processedNodes: processedNodes,
    chunks: chunksProcessed,
    textNodes: allTextNodes,
    commandId,
  };
}

// Helper function to collect all nodes that need to be processed
async function collectNodesToProcess(
  node,
  parentPath = [],
  depth = 0,
  nodesToProcess = []
) {
  // Skip invisible nodes
  if (node.visible === false) return;

  // Get the path to this node
  const nodePath = [...parentPath, node.name || `Unnamed ${node.type}`];

  // Add this node to the processing list
  nodesToProcess.push({
    node: node,
    parentPath: nodePath,
    depth: depth,
  });

  // Recursively add children
  if ("children" in node) {
    for (const child of node.children) {
      await collectNodesToProcess(child, nodePath, depth + 1, nodesToProcess);
    }
  }
}

// Process a single text node
async function processTextNode(node, parentPath, depth) {
  if (node.type !== "TEXT") return null;

  try {
    // Safely extract font information
    let fontFamily = "";
    let fontStyle = "";

    if (node.fontName) {
      if (typeof node.fontName === "object") {
        if ("family" in node.fontName) fontFamily = node.fontName.family;
        if ("style" in node.fontName) fontStyle = node.fontName.style;
      }
    }

    // Create a safe representation of the text node
    const safeTextNode = {
      id: node.id,
      name: node.name || "Text",
      type: node.type,
      characters: node.characters,
      fontSize: typeof node.fontSize === "number" ? node.fontSize : 0,
      fontFamily: fontFamily,
      fontStyle: fontStyle,
      x: typeof node.x === "number" ? node.x : 0,
      y: typeof node.y === "number" ? node.y : 0,
      width: typeof node.width === "number" ? node.width : 0,
      height: typeof node.height === "number" ? node.height : 0,
      path: parentPath.join(" > "),
      depth: depth,
    };

    // Highlight the node briefly (optional visual feedback)
    try {
      const originalFills = JSON.parse(JSON.stringify(node.fills));
      node.fills = [
        {
          type: "SOLID",
          color: { r: 1, g: 0.5, b: 0 },
          opacity: 0.3,
        },
      ];

      // Brief delay for the highlight to be visible
      await delay(100);

      try {
        node.fills = originalFills;
      } catch (err) {
        console.error("Error resetting fills:", err);
      }
    } catch (highlightErr) {
      console.error("Error highlighting text node:", highlightErr);
      // Continue anyway, highlighting is just visual feedback
    }

    return safeTextNode;
  } catch (nodeErr) {
    console.error("Error processing text node:", nodeErr);
    return null;
  }
}

// A delay function that returns a promise
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Keep the original findTextNodes for backward compatibility
async function findTextNodes(node, parentPath = [], depth = 0, textNodes = []) {
  // Skip invisible nodes
  if (node.visible === false) return;

  // Get the path to this node including its name
  const nodePath = [...parentPath, node.name || `Unnamed ${node.type}`];

  if (node.type === "TEXT") {
    try {
      // Safely extract font information to avoid Symbol serialization issues
      let fontFamily = "";
      let fontStyle = "";

      if (node.fontName) {
        if (typeof node.fontName === "object") {
          if ("family" in node.fontName) fontFamily = node.fontName.family;
          if ("style" in node.fontName) fontStyle = node.fontName.style;
        }
      }

      // Create a safe representation of the text node with only serializable properties
      const safeTextNode = {
        id: node.id,
        name: node.name || "Text",
        type: node.type,
        characters: node.characters,
        fontSize: typeof node.fontSize === "number" ? node.fontSize : 0,
        fontFamily: fontFamily,
        fontStyle: fontStyle,
        x: typeof node.x === "number" ? node.x : 0,
        y: typeof node.y === "number" ? node.y : 0,
        width: typeof node.width === "number" ? node.width : 0,
        height: typeof node.height === "number" ? node.height : 0,
        path: nodePath.join(" > "),
        depth: depth,
      };

      // Only highlight the node if it's not being done via API
      try {
        // Safe way to create a temporary highlight without causing serialization issues
        const originalFills = JSON.parse(JSON.stringify(node.fills));
        node.fills = [
          {
            type: "SOLID",
            color: { r: 1, g: 0.5, b: 0 },
            opacity: 0.3,
          },
        ];

        // Promise-based delay instead of setTimeout
        await delay(500);

        try {
          node.fills = originalFills;
        } catch (err) {
          console.error("Error resetting fills:", err);
        }
      } catch (highlightErr) {
        console.error("Error highlighting text node:", highlightErr);
        // Continue anyway, highlighting is just visual feedback
      }

      textNodes.push(safeTextNode);
    } catch (nodeErr) {
      console.error("Error processing text node:", nodeErr);
      // Skip this node but continue with others
    }
  }

  // Recursively process children of container nodes
  if ("children" in node) {
    for (const child of node.children) {
      await findTextNodes(child, nodePath, depth + 1, textNodes);
    }
  }
}

// Replace text in a specific node
async function setMultipleTextContents(params) {
  const { nodeId, text } = params || {};
  const commandId = params.commandId || generateCommandId();

  if (!nodeId || !text || !Array.isArray(text)) {
    const errorMsg = "Missing required parameters: nodeId and text array";

    // Send error progress update
    sendProgressUpdate(
      commandId,
      "set_multiple_text_contents",
      "error",
      0,
      0,
      0,
      errorMsg,
      { error: errorMsg }
    );

    throw new Error(errorMsg);
  }

  console.log(
    `Starting text replacement for node: ${nodeId} with ${text.length} text replacements`
  );

  // Send started progress update
  sendProgressUpdate(
    commandId,
    "set_multiple_text_contents",
    "started",
    0,
    text.length,
    0,
    `Starting text replacement for ${text.length} nodes`,
    { totalReplacements: text.length }
  );

  // Define the results array and counters
  const results = [];
  let successCount = 0;
  let failureCount = 0;

  // Split text replacements into chunks of 5
  const CHUNK_SIZE = 5;
  const chunks = [];

  for (let i = 0; i < text.length; i += CHUNK_SIZE) {
    chunks.push(text.slice(i, i + CHUNK_SIZE));
  }

  console.log(`Split ${text.length} replacements into ${chunks.length} chunks`);

  // Send chunking info update
  sendProgressUpdate(
    commandId,
    "set_multiple_text_contents",
    "in_progress",
    5, // 5% progress for planning phase
    text.length,
    0,
    `Preparing to replace text in ${text.length} nodes using ${chunks.length} chunks`,
    {
      totalReplacements: text.length,
      chunks: chunks.length,
      chunkSize: CHUNK_SIZE,
    }
  );

  // Process each chunk sequentially
  for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
    const chunk = chunks[chunkIndex];
    console.log(
      `Processing chunk ${chunkIndex + 1}/${chunks.length} with ${chunk.length
      } replacements`
    );

    // Send chunk processing start update
    sendProgressUpdate(
      commandId,
      "set_multiple_text_contents",
      "in_progress",
      Math.round(5 + (chunkIndex / chunks.length) * 90), // 5-95% for processing
      text.length,
      successCount + failureCount,
      `Processing text replacements chunk ${chunkIndex + 1}/${chunks.length}`,
      {
        currentChunk: chunkIndex + 1,
        totalChunks: chunks.length,
        successCount,
        failureCount,
      }
    );

    // Process replacements within a chunk in parallel
    const chunkPromises = chunk.map(async (replacement) => {
      if (!replacement.nodeId || replacement.text === undefined) {
        console.error(`Missing nodeId or text for replacement`);
        return {
          success: false,
          nodeId: replacement.nodeId || "unknown",
          error: "Missing nodeId or text in replacement entry",
        };
      }

      try {
        console.log(
          `Attempting to replace text in node: ${replacement.nodeId}`
        );

        // Get the text node to update (just to check it exists and get original text)
        const textNode = await figma.getNodeByIdAsync(replacement.nodeId);

        if (!textNode) {
          console.error(`Text node not found: ${replacement.nodeId}`);
          return {
            success: false,
            nodeId: replacement.nodeId,
            error: `Node not found: ${replacement.nodeId}`,
          };
        }

        // Handle both TEXT nodes and TABLE_CELL nodes
        let textToUpdate;
        let originalText;
        
        if (textNode.type === "TEXT") {
          textToUpdate = textNode;
          originalText = textNode.characters;
        } else if (textNode.type === "TABLE_CELL") {
          // Table cells have a text sublayer
          textToUpdate = textNode.text;
          originalText = textToUpdate.characters;
          console.log(`Handling TABLE_CELL node ${replacement.nodeId}, accessing text sublayer`);
        } else {
          console.error(
            `Node is not a text node or table cell: ${replacement.nodeId} (type: ${textNode.type})`
          );
          return {
            success: false,
            nodeId: replacement.nodeId,
            error: `Node is not a text node or table cell: ${replacement.nodeId} (type: ${textNode.type})`,
          };
        }

        // Save original text for the result
        console.log(`Original text: "${originalText}"`);
        console.log(`Will translate to: "${replacement.text}"`);

        // Highlight the node before changing text
        let originalFills;
        try {
          // Save original fills for restoration later
          originalFills = JSON.parse(JSON.stringify(textNode.fills));
          // Apply highlight color (orange with 30% opacity)
          textNode.fills = [
            {
              type: "SOLID",
              color: { r: 1, g: 0.5, b: 0 },
              opacity: 0.3,
            },
          ];
        } catch (highlightErr) {
          console.error(
            `Error highlighting text node: ${highlightErr.message}`
          );
          // Continue anyway, highlighting is just visual feedback
        }

        // Use the existing setTextContent function to handle font loading and text setting
        await setTextContent({
          nodeId: replacement.nodeId,
          text: replacement.text,
        });

        // Keep highlight for a moment after text change, then restore original fills
        if (originalFills) {
          try {
            // Use delay function for consistent timing
            await delay(500);
            textNode.fills = originalFills;
          } catch (restoreErr) {
            console.error(`Error restoring fills: ${restoreErr.message}`);
          }
        }

        console.log(
          `Successfully replaced text in node: ${replacement.nodeId}`
        );
        return {
          success: true,
          nodeId: replacement.nodeId,
          originalText: originalText,
          translatedText: replacement.text,
        };
      } catch (error) {
        console.error(
          `Error replacing text in node ${replacement.nodeId}: ${error.message}`
        );
        return {
          success: false,
          nodeId: replacement.nodeId,
          error: `Error applying replacement: ${error.message}`,
        };
      }
    });

    // Wait for all replacements in this chunk to complete
    const chunkResults = await Promise.all(chunkPromises);

    // Process results for this chunk
    chunkResults.forEach((result) => {
      if (result.success) {
        successCount++;
      } else {
        failureCount++;
      }
      results.push(result);
    });

    // Send chunk processing complete update with partial results
    sendProgressUpdate(
      commandId,
      "set_multiple_text_contents",
      "in_progress",
      Math.round(5 + ((chunkIndex + 1) / chunks.length) * 90), // 5-95% for processing
      text.length,
      successCount + failureCount,
      `Completed chunk ${chunkIndex + 1}/${chunks.length
      }. ${successCount} successful, ${failureCount} failed so far.`,
      {
        currentChunk: chunkIndex + 1,
        totalChunks: chunks.length,
        successCount,
        failureCount,
        chunkResults: chunkResults,
      }
    );

    // Add a small delay between chunks to avoid overloading Figma
    if (chunkIndex < chunks.length - 1) {
      console.log("Pausing between chunks to avoid overloading Figma...");
      await delay(1000); // 1 second delay between chunks
    }
  }

  console.log(
    `Replacement complete: ${successCount} successful, ${failureCount} failed`
  );

  // Send completed progress update
  sendProgressUpdate(
    commandId,
    "set_multiple_text_contents",
    "completed",
    100,
    text.length,
    successCount + failureCount,
    `Text replacement complete: ${successCount} successful, ${failureCount} failed`,
    {
      totalReplacements: text.length,
      replacementsApplied: successCount,
      replacementsFailed: failureCount,
      completedInChunks: chunks.length,
      results: results,
    }
  );

  return {
    success: successCount > 0,
    nodeId: nodeId,
    replacementsApplied: successCount,
    replacementsFailed: failureCount,
    totalReplacements: text.length,
    results: results,
    completedInChunks: chunks.length,
    commandId,
  };
}

// New text formatting preservation functions

async function updateTextPreserveFormatting(params) {
  const { nodeId, newText, preserveFormattingStrategy = "stretch" } = params || {};
  
  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }
  
  if (!newText && newText !== "") {
    throw new Error("Missing newText parameter");
  }
  
  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node || node.type !== 'TEXT') {
    throw new Error(`Node ${nodeId} is not a text node`);
  }

  // Step 1: Capture current formatting
  const oldText = node.characters;
  const formatting = [];
  
  // Get all style properties for each character range
  const styleProps = [
    'fontSize', 'fontName', 'fontWeight', 'textDecoration',
    'fills', 'letterSpacing', 'lineHeight', 'textCase'
  ];
  
  let currentStart = 0;
  while (currentStart < oldText.length) {
    const currentStyle = {};
    let rangeEnd = currentStart + 1;
    
    // Get style for current position
    for (const prop of styleProps) {
      try {
        const value = node.getRangeProperty(currentStart, currentStart + 1, prop);
        if (value !== figma.mixed) {
          currentStyle[prop] = value;
        }
      } catch (e) {
        // Property might not exist
      }
    }
    
    // Find how far this style extends
    for (let i = currentStart + 1; i <= oldText.length; i++) {
      let matches = true;
      for (const prop of Object.keys(currentStyle)) {
        try {
          const value = node.getRangeProperty(i - 1, i, prop);
          if (JSON.stringify(value) !== JSON.stringify(currentStyle[prop])) {
            matches = false;
            break;
          }
        } catch (e) {
          matches = false;
          break;
        }
      }
      if (!matches) {
        rangeEnd = i - 1;
        break;
      }
      rangeEnd = i;
    }
    
    formatting.push({
      start: currentStart,
      end: rangeEnd,
      style: currentStyle
    });
    
    currentStart = rangeEnd;
  }

  // Step 2: Update text
  // Load all fonts that might be needed
  const fontsToLoad = new Set();
  for (const format of formatting) {
    if (format.style.fontName) {
      fontsToLoad.add(format.style.fontName);
    }
  }
  
  // Also load current font as fallback
  if (node.fontName !== figma.mixed) {
    fontsToLoad.add(node.fontName);
  }
  
  // Load fonts
  for (const font of fontsToLoad) {
    try {
      await figma.loadFontAsync(font);
    } catch (e) {
      console.warn(`Failed to load font ${font.family} ${font.style}:`, e);
    }
  }
  
  // Update the text
  node.characters = newText;

  // Step 3: Reapply formatting based on strategy
  for (const format of formatting) {
    let start = format.start;
    let end = format.end;
    
    if (preserveFormattingStrategy === "stretch") {
      // Stretch formatting proportionally
      const oldLength = oldText.length;
      const newLength = newText.length;
      if (oldLength > 0) {
        start = Math.floor(format.start * newLength / oldLength);
        end = Math.floor(format.end * newLength / oldLength);
      }
    } else if (preserveFormattingStrategy === "repeat") {
      // Repeat pattern if new text is longer
      // Keep as-is if shorter
      end = Math.min(end, newText.length);
    } else if (preserveFormattingStrategy === "reset_overflow") {
      // Only apply to characters that existed before
      if (start >= newText.length) continue;
      end = Math.min(end, newText.length);
    }
    
    // Ensure valid range
    if (start >= newText.length || start >= end) continue;
    end = Math.min(end, newText.length);
    
    // Apply each style property
    for (const [prop, value] of Object.entries(format.style)) {
      try {
        if (prop === 'fontName' && value) {
          await figma.loadFontAsync(value);
        }
        node.setRangeProperty(start, end, prop, value);
      } catch (e) {
        console.warn(`Failed to apply ${prop} to range ${start}-${end}:`, e);
      }
    }
  }

  return {
    success: true,
    nodeId,
    oldLength: oldText.length,
    newLength: newText.length,
    formattingStrategy: preserveFormattingStrategy,
    formattingRanges: formatting.length
  };
}

async function smartTextReplace(params) {
  const { nodeId, replacements, matchCase = true } = params || {};
  
  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }
  
  if (!replacements || !Array.isArray(replacements)) {
    throw new Error("Missing or invalid replacements parameter");
  }
  
  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node || node.type !== 'TEXT') {
    throw new Error(`Node ${nodeId} is not a text node`);
  }
  
  // Get current text and formatting
  const originalText = node.characters;
  const formatting = [];
  
  // Capture formatting for each character
  for (let i = 0; i < originalText.length; i++) {
    const charFormat = {};
    const styleProps = ['fontSize', 'fontName', 'fontWeight', 'textDecoration', 'fills'];
    
    for (const prop of styleProps) {
      try {
        const value = node.getRangeProperty(i, i + 1, prop);
        if (value !== figma.mixed) {
          charFormat[prop] = value;
        }
      } catch (e) {
        // Property might not exist
      }
    }
    
    formatting.push(charFormat);
  }
  
  // Build new text and formatting mapping
  let newText = originalText;
  let newFormatting = [...formatting];
  
  // Process replacements
  for (const replacement of replacements) {
    const { find, replace } = replacement;
    if (!find || replace === undefined) continue;
    
    const searchText = matchCase ? newText : newText.toLowerCase();
    const searchFor = matchCase ? find : find.toLowerCase();
    
    let offset = 0;
    let index = searchText.indexOf(searchFor, offset);
    
    while (index !== -1) {
      // Calculate formatting for replacement
      const replaceFormatting = [];
      
      // Use formatting from first character of found text
      const baseFormat = newFormatting[index] || {};
      for (let i = 0; i < replace.length; i++) {
        replaceFormatting.push({...baseFormat});
      }
      
      // Replace text
      newText = newText.substring(0, index) + replace + newText.substring(index + find.length);
      
      // Update formatting array
      newFormatting.splice(index, find.length, ...replaceFormatting);
      
      // Continue searching
      offset = index + replace.length;
      index = searchText.indexOf(searchFor, offset);
    }
  }
  
  // Load required fonts
  const fontsToLoad = new Set();
  for (const format of newFormatting) {
    if (format.fontName) {
      fontsToLoad.add(format.fontName);
    }
  }
  
  for (const font of fontsToLoad) {
    try {
      await figma.loadFontAsync(font);
    } catch (e) {
      console.warn(`Failed to load font:`, e);
    }
  }
  
  // Apply new text
  node.characters = newText;
  
  // Apply formatting
  let currentStart = 0;
  while (currentStart < newText.length) {
    const currentFormat = newFormatting[currentStart];
    let rangeEnd = currentStart + 1;
    
    // Find how far this format extends
    while (rangeEnd < newText.length && 
           JSON.stringify(newFormatting[rangeEnd]) === JSON.stringify(currentFormat)) {
      rangeEnd++;
    }
    
    // Apply format to range
    for (const [prop, value] of Object.entries(currentFormat)) {
      try {
        node.setRangeProperty(currentStart, rangeEnd, prop, value);
      } catch (e) {
        console.warn(`Failed to apply ${prop}:`, e);
      }
    }
    
    currentStart = rangeEnd;
  }
  
  return {
    success: true,
    nodeId,
    originalText,
    newText,
    replacementCount: replacements.length
  };
}

async function setMultipleTextContentsWithStyles(params) {
  const { nodeId, updates } = params || {};
  
  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }
  
  if (!updates || !Array.isArray(updates)) {
    throw new Error("Missing or invalid updates parameter");
  }
  
  const parentNode = await figma.getNodeByIdAsync(nodeId);
  if (!parentNode) {
    throw new Error(`Parent node not found: ${nodeId}`);
  }
  
  const results = [];
  
  for (const update of updates) {
    const { nodeId: textNodeId, text, styles } = update;
    
    try {
      const textNode = await figma.getNodeByIdAsync(textNodeId);
      if (!textNode || textNode.type !== 'TEXT') {
        results.push({
          nodeId: textNodeId,
          success: false,
          error: 'Not a text node'
        });
        continue;
      }
      
      // Load fonts if needed
      const fontsToLoad = new Set();
      if (styles) {
        for (const style of styles) {
          if (style.fontFamily) {
            fontsToLoad.add({
              family: style.fontFamily,
              style: style.fontStyle || 'Regular'
            });
          }
        }
      }
      
      for (const font of fontsToLoad) {
        try {
          await figma.loadFontAsync(font);
        } catch (e) {
          console.warn(`Failed to load font:`, e);
        }
      }
      
      // Update text
      textNode.characters = text;
      
      // Apply styles
      if (styles) {
        for (const style of styles) {
          const { start, end, bold, italic, fontSize, fontFamily, fills } = style;
          
          if (start !== undefined && end !== undefined) {
            if (bold !== undefined) {
              textNode.setRangeProperty(start, end, 'fontWeight', bold ? 700 : 400);
            }
            if (italic !== undefined) {
              // Note: italic might need font style change
              const currentFont = textNode.getRangeProperty(start, end, 'fontName');
              if (currentFont && currentFont !== figma.mixed) {
                const newStyle = italic ? 'Italic' : 'Regular';
                try {
                  await figma.loadFontAsync({
                    family: currentFont.family,
                    style: newStyle
                  });
                  textNode.setRangeProperty(start, end, 'fontName', {
                    family: currentFont.family,
                    style: newStyle
                  });
                } catch (e) {
                  console.warn(`Failed to set italic:`, e);
                }
              }
            }
            if (fontSize !== undefined) {
              textNode.setRangeProperty(start, end, 'fontSize', fontSize);
            }
            if (fontFamily) {
              const fontStyle = style.fontStyle || 'Regular';
              try {
                await figma.loadFontAsync({ family: fontFamily, style: fontStyle });
                textNode.setRangeProperty(start, end, 'fontName', {
                  family: fontFamily,
                  style: fontStyle
                });
              } catch (e) {
                console.warn(`Failed to set font:`, e);
              }
            }
            if (fills) {
              textNode.setRangeProperty(start, end, 'fills', fills);
            }
          }
        }
      }
      
      results.push({
        nodeId: textNodeId,
        success: true
      });
      
    } catch (error) {
      results.push({
        nodeId: textNodeId,
        success: false,
        error: error.message
      });
    }
  }
  
  return {
    success: true,
    results,
    totalUpdated: results.filter(r => r.success).length,
    totalFailed: results.filter(r => !r.success).length
  };
}

// Batch operation functions

async function cloneMultipleNodes(params) {
  const { sourceNodeId, positions, parentId } = params || {};
  
  if (!sourceNodeId) {
    throw new Error("Missing sourceNodeId parameter");
  }
  
  if (!positions || !Array.isArray(positions)) {
    throw new Error("Missing or invalid positions parameter");
  }
  
  const sourceNode = await figma.getNodeByIdAsync(sourceNodeId);
  if (!sourceNode) {
    throw new Error(`Source node not found: ${sourceNodeId}`);
  }
  
  const results = [];
  const commandId = uuidv4();
  const totalCount = positions.length;
  
  // Send initial progress
  sendProgressUpdate(
    commandId,
    "clone_multiple_nodes",
    "started",
    0,
    totalCount,
    0,
    `Starting to clone ${totalCount} nodes`
  );
  
  // Process clones in chunks for better performance
  const CHUNK_SIZE = 10;
  const chunks = [];
  for (let i = 0; i < positions.length; i += CHUNK_SIZE) {
    chunks.push(positions.slice(i, i + CHUNK_SIZE));
  }
  
  let processedCount = 0;
  
  for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
    const chunk = chunks[chunkIndex];
    
    // Process chunk
    const chunkPromises = chunk.map(async (position) => {
      try {
        const clone = sourceNode.clone();
        
        if (position.x !== undefined) clone.x = position.x;
        if (position.y !== undefined) clone.y = position.y;
        
        // Handle parent attachment
        if (parentId) {
          const parentNode = await figma.getNodeByIdAsync(parentId);
          if (parentNode && "appendChild" in parentNode) {
            parentNode.appendChild(clone);
          } else {
            figma.currentPage.appendChild(clone);
          }
        } else {
          figma.currentPage.appendChild(clone);
        }
        
        return {
          success: true,
          id: clone.id,
          name: clone.name,
          position: { x: clone.x, y: clone.y }
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
          position
        };
      }
    });
    
    const chunkResults = await Promise.all(chunkPromises);
    results.push(...chunkResults);
    
    processedCount += chunk.length;
    
    // Update progress
    sendProgressUpdate(
      commandId,
      "clone_multiple_nodes",
      "in_progress",
      Math.round((processedCount / totalCount) * 100),
      totalCount,
      processedCount,
      `Cloned ${processedCount}/${totalCount} nodes`
    );
  }
  
  // Final progress update
  sendProgressUpdate(
    commandId,
    "clone_multiple_nodes",
    "completed",
    100,
    totalCount,
    totalCount,
    `Successfully cloned ${results.filter(r => r.success).length} nodes`
  );
  
  return {
    success: true,
    results,
    totalCloned: results.filter(r => r.success).length,
    totalFailed: results.filter(r => !r.success).length,
    commandId
  };
}

async function getMultipleNodesInfo(params) {
  const { nodeIds } = params || {};
  
  if (!nodeIds || !Array.isArray(nodeIds)) {
    throw new Error("Missing or invalid nodeIds parameter");
  }
  
  const results = [];
  
  // Process in parallel for speed
  const promises = nodeIds.map(async (nodeId) => {
    try {
      const node = await figma.getNodeByIdAsync(nodeId);
      if (!node) {
        return {
          nodeId,
          success: false,
          error: 'Node not found'
        };
      }
      
      // Return same structure as getNodeInfo
      return {
        nodeId,
        success: true,
        info: await getNodeInfoData(node)
      };
    } catch (error) {
      return {
        nodeId,
        success: false,
        error: error.message
      };
    }
  });
  
  const nodeResults = await Promise.all(promises);
  
  return {
    success: true,
    results: nodeResults,
    totalFound: nodeResults.filter(r => r.success).length,
    totalNotFound: nodeResults.filter(r => !r.success).length
  };
}

async function setMultipleNodesProperty(params) {
  const { nodeIds, property, value } = params || {};
  
  if (!nodeIds || !Array.isArray(nodeIds)) {
    throw new Error("Missing or invalid nodeIds parameter");
  }
  
  if (!property) {
    throw new Error("Missing property parameter");
  }
  
  if (value === undefined) {
    throw new Error("Missing value parameter");
  }
  
  const results = [];
  
  for (const nodeId of nodeIds) {
    try {
      const node = await figma.getNodeByIdAsync(nodeId);
      if (!node) {
        results.push({
          nodeId,
          success: false,
          error: 'Node not found'
        });
        continue;
      }
      
      // Special handling for certain properties
      if (property === 'fills' || property === 'strokes') {
        node[property] = value;
      } else if (property === 'visible' || property === 'locked') {
        node[property] = value;
      } else if (property === 'opacity') {
        node.opacity = value;
      } else if (property === 'x' || property === 'y') {
        node[property] = value;
      } else if (property === 'width' || property === 'height') {
        if ('resize' in node) {
          if (property === 'width') {
            node.resize(value, node.height);
          } else {
            node.resize(node.width, value);
          }
        }
      } else {
        // Try to set property directly
        node[property] = value;
      }
      
      results.push({
        nodeId,
        success: true
      });
      
    } catch (error) {
      results.push({
        nodeId,
        success: false,
        error: error.message
      });
    }
  }
  
  return {
    success: true,
    results,
    totalUpdated: results.filter(r => r.success).length,
    totalFailed: results.filter(r => !r.success).length
  };
}

async function scanNodesWithOptions(params) {
  const { 
    nodeId, 
    options = {} 
  } = params || {};
  
  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }
  
  const {
    maxDepth = -1,
    nodeTypes = ["TEXT"],
    timeout = 30000,
    returnPartialOnTimeout = true,
    includeHidden = false
  } = options;
  
  const startTime = Date.now();
  const results = [];
  const visited = new Set();
  
  async function scanNode(node, depth = 0) {
    // Check timeout
    if (Date.now() - startTime > timeout) {
      if (returnPartialOnTimeout) {
        return;
      } else {
        throw new Error(`Scan timed out after ${timeout}ms. Found ${results.length} nodes so far.`);
      }
    }
    
    // Check depth limit
    if (maxDepth !== -1 && depth > maxDepth) {
      return;
    }
    
    // Skip if already visited (circular reference protection)
    if (visited.has(node.id)) {
      return;
    }
    visited.add(node.id);
    
    // Check visibility
    if (!includeHidden && !node.visible) {
      return;
    }
    
    // Check if node matches requested types
    if (nodeTypes.includes(node.type)) {
      results.push({
        id: node.id,
        name: node.name,
        type: node.type,
        depth,
        characters: node.type === 'TEXT' ? node.characters : undefined
      });
    }
    
    // Recursively scan children
    if ("children" in node) {
      for (const child of node.children) {
        await scanNode(child, depth + 1);
      }
    }
  }
  
  try {
    const rootNode = await figma.getNodeByIdAsync(nodeId);
    if (!rootNode) {
      throw new Error(`Node not found: ${nodeId}`);
    }
    
    await scanNode(rootNode, 0);
    
    const elapsed = Date.now() - startTime;
    
    return {
      success: true,
      nodes: results,
      totalFound: results.length,
      elapsed,
      timedOut: elapsed >= timeout,
      options: {
        maxDepth,
        nodeTypes,
        timeout,
        includeHidden
      }
    };
    
  } catch (error) {
    if (error.message.includes('timed out') && returnPartialOnTimeout) {
      return {
        success: true,
        nodes: results,
        totalFound: results.length,
        elapsed: Date.now() - startTime,
        timedOut: true,
        partial: true,
        options: {
          maxDepth,
          nodeTypes,
          timeout,
          includeHidden
        }
      };
    }
    throw error;
  }
}

async function getConnectionStatus(params) {
  // This would normally check WebSocket status
  // For now, return basic info
  return {
    connected: true,
    pluginActive: true,
    documentOpen: !!figma.currentPage,
    editorType: figma.editorType,
    timestamp: Date.now()
  };
}

async function executeBatch(params) {
  const { commands, stopOnError = false } = params || {};
  
  if (!commands || !Array.isArray(commands)) {
    throw new Error("Missing or invalid commands parameter");
  }
  
  const results = [];
  const commandId = uuidv4();
  const totalCount = commands.length;
  
  // Send initial progress
  sendProgressUpdate(
    commandId,
    "execute_batch",
    "started",
    0,
    totalCount,
    0,
    `Starting batch execution of ${totalCount} commands`
  );
  
  for (let i = 0; i < commands.length; i++) {
    const { command, params: cmdParams } = commands[i];
    
    try {
      const result = await handleCommand(command, cmdParams);
      results.push({
        index: i,
        command,
        success: true,
        result
      });
    } catch (error) {
      results.push({
        index: i,
        command,
        success: false,
        error: error.message
      });
      
      if (stopOnError) {
        break;
      }
    }
    
    // Update progress
    sendProgressUpdate(
      commandId,
      "execute_batch",
      "in_progress",
      Math.round(((i + 1) / totalCount) * 100),
      totalCount,
      i + 1,
      `Executed ${i + 1}/${totalCount} commands`
    );
  }
  
  // Final progress
  sendProgressUpdate(
    commandId,
    "execute_batch",
    "completed",
    100,
    totalCount,
    totalCount,
    `Batch execution completed`
  );
  
  return {
    success: true,
    results,
    totalExecuted: results.length,
    totalSucceeded: results.filter(r => r.success).length,
    totalFailed: results.filter(r => !r.success).length,
    commandId
  };
}

// Helper function for getNodeInfo
async function getNodeInfoData(node) {
  const info = {
    id: node.id,
    name: node.name,
    type: node.type,
    visible: node.visible,
  };

  // Add type-specific properties
  if (node.type === "TEXT") {
    info.characters = node.characters;
    info.fontSize = node.fontSize;
    info.fontName = node.fontName;
  }

  if ("x" in node) info.x = node.x;
  if ("y" in node) info.y = node.y;
  if ("width" in node) info.width = node.width;
  if ("height" in node) info.height = node.height;
  if ("fills" in node) info.fills = node.fills;
  if ("strokes" in node) info.strokes = node.strokes;
  if ("opacity" in node) info.opacity = node.opacity;

  // Add children info if it's a container
  if ("children" in node) {
    info.children = node.children.map((child) => ({
      id: child.id,
      name: child.name,
      type: child.type,
      visible: child.visible,
    }));
  }

  return info;
}

// Text styling functions

async function setTextStyleRange(params) {
  const { nodeId, start, end, bold, italic, underline, strikethrough } = params || {};

  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }

  if (start === undefined || end === undefined) {
    throw new Error("Missing start or end parameters");
  }

  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node not found with ID: ${nodeId}`);
  }

  if (node.type !== "TEXT") {
    throw new Error(`Node is not a text node: ${nodeId}`);
  }

  try {
    // Load fonts for the range
    const fonts = node.getRangeAllFontNames(start, end);
    await Promise.all(fonts.map(font => figma.loadFontAsync(font)));

    // Apply text decorations
    if (underline !== undefined || strikethrough !== undefined) {
      let decoration = "NONE";
      if (underline && strikethrough) {
        decoration = "UNDERLINE_STRIKETHROUGH";
      } else if (underline) {
        decoration = "UNDERLINE";
      } else if (strikethrough) {
        decoration = "STRIKETHROUGH";
      }
      node.setRangeTextDecoration(start, end, decoration);
    }

    // Apply font weight for bold
    if (bold !== undefined) {
      const currentFont = node.getRangeFontName(start, end);
      if (currentFont !== figma.mixed) {
        const newStyle = bold ? "Bold" : "Regular";
        const newFont = { family: currentFont.family, style: newStyle };
        
        // Try to load the bold/regular variant
        try {
          await figma.loadFontAsync(newFont);
          node.setRangeFontName(start, end, newFont);
        } catch (e) {
          console.warn(`Could not load ${newFont.family} ${newFont.style}, using font weight instead`);
          // Fallback to font weight if style not available
          node.setRangeFontWeight(start, end, bold ? 700 : 400);
        }
      }
    }

    // Note: Italic would be handled similarly by changing font style to "Italic"
    if (italic !== undefined) {
      const currentFont = node.getRangeFontName(start, end);
      if (currentFont !== figma.mixed) {
        const newStyle = italic ? "Italic" : "Regular";
        const newFont = { family: currentFont.family, style: newStyle };
        
        try {
          await figma.loadFontAsync(newFont);
          node.setRangeFontName(start, end, newFont);
        } catch (e) {
          console.warn(`Could not load ${newFont.family} ${newFont.style}`);
        }
      }
    }

    return {
      success: true,
      nodeId: nodeId,
      start: start,
      end: end,
      styles: {
        bold: bold,
        italic: italic,
        underline: underline,
        strikethrough: strikethrough
      }
    };
  } catch (error) {
    throw new Error(`Failed to set text style: ${error.message}`);
  }
}

async function getTextStyleRange(params) {
  const { nodeId, start, end } = params || {};

  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }

  if (start === undefined || end === undefined) {
    throw new Error("Missing start or end parameters");
  }

  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node not found with ID: ${nodeId}`);
  }

  if (node.type !== "TEXT") {
    throw new Error(`Node is not a text node: ${nodeId}`);
  }

  try {
    const decoration = node.getRangeTextDecoration(start, end);
    const fontName = node.getRangeFontName(start, end);
    const fontWeight = node.getRangeFontWeight(start, end);
    
    let styles = {
      underline: false,
      strikethrough: false,
      bold: false,
      italic: false
    };

    // Parse text decoration
    if (decoration !== figma.mixed) {
      styles.underline = decoration.includes("UNDERLINE");
      styles.strikethrough = decoration.includes("STRIKETHROUGH");
    }

    // Parse font style
    if (fontName !== figma.mixed) {
      styles.italic = fontName.style.toLowerCase().includes("italic");
      styles.bold = fontName.style.toLowerCase().includes("bold");
    } else if (fontWeight !== figma.mixed) {
      styles.bold = fontWeight >= 600;
    }

    return {
      nodeId: nodeId,
      start: start,
      end: end,
      styles: styles,
      decoration: decoration,
      fontName: fontName,
      fontWeight: fontWeight
    };
  } catch (error) {
    throw new Error(`Failed to get text style: ${error.message}`);
  }
}

async function setTextDecorationRange(params) {
  const { nodeId, start, end, style, color, thickness, offset, skipInk } = params || {};

  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }

  if (start === undefined || end === undefined) {
    throw new Error("Missing start or end parameters");
  }

  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node not found with ID: ${nodeId}`);
  }

  if (node.type !== "TEXT") {
    throw new Error(`Node is not a text node: ${nodeId}`);
  }

  try {
    // Load fonts for the range
    const fonts = node.getRangeAllFontNames(start, end);
    await Promise.all(fonts.map(font => figma.loadFontAsync(font)));

    // Set decoration style if provided
    if (style !== undefined) {
      node.setRangeTextDecorationStyle(start, end, style);
    }

    // Set decoration color if provided
    if (color !== undefined) {
      node.setRangeTextDecorationColor(start, end, color);
    }

    // Set decoration thickness if provided
    if (thickness !== undefined) {
      node.setRangeTextDecorationThickness(start, end, thickness);
    }

    // Set decoration offset if provided
    if (offset !== undefined) {
      node.setRangeTextDecorationOffset(start, end, offset);
    }

    // Set skip ink if provided
    if (skipInk !== undefined) {
      node.setRangeTextDecorationSkipInk(start, end, skipInk);
    }

    return {
      success: true,
      nodeId: nodeId,
      start: start,
      end: end,
      decoration: {
        style: style,
        color: color,
        thickness: thickness,
        offset: offset,
        skipInk: skipInk
      }
    };
  } catch (error) {
    throw new Error(`Failed to set text decoration: ${error.message}`);
  }
}

async function getTextDecorationRange(params) {
  const { nodeId, start, end } = params || {};

  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }

  if (start === undefined || end === undefined) {
    throw new Error("Missing start or end parameters");
  }

  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node not found with ID: ${nodeId}`);
  }

  if (node.type !== "TEXT") {
    throw new Error(`Node is not a text node: ${nodeId}`);
  }

  try {
    const decoration = {
      style: node.getRangeTextDecorationStyle(start, end),
      color: node.getRangeTextDecorationColor(start, end),
      thickness: node.getRangeTextDecorationThickness(start, end),
      offset: node.getRangeTextDecorationOffset(start, end),
      skipInk: node.getRangeTextDecorationSkipInk(start, end)
    };

    return {
      nodeId: nodeId,
      start: start,
      end: end,
      decoration: decoration
    };
  } catch (error) {
    throw new Error(`Failed to get text decoration: ${error.message}`);
  }
}

async function setRangeFont(params) {
  const { nodeId, start, end, fontFamily, fontStyle } = params || {};

  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }

  if (start === undefined || end === undefined) {
    throw new Error("Missing start or end parameters");
  }

  if (!fontFamily) {
    throw new Error("Missing fontFamily parameter");
  }

  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node not found with ID: ${nodeId}`);
  }

  if (node.type !== "TEXT") {
    throw new Error(`Node is not a text node: ${nodeId}`);
  }

  try {
    const font = { family: fontFamily, style: fontStyle || "Regular" };
    
    // Load the font
    await figma.loadFontAsync(font);
    
    // Set the font for the range
    node.setRangeFontName(start, end, font);

    return {
      success: true,
      nodeId: nodeId,
      start: start,
      end: end,
      font: font
    };
  } catch (error) {
    throw new Error(`Failed to set font: ${error.message}`);
  }
}

async function setRangeFontSize(params) {
  const { nodeId, start, end, fontSize } = params || {};

  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }

  if (start === undefined || end === undefined) {
    throw new Error("Missing start or end parameters");
  }

  if (fontSize === undefined) {
    throw new Error("Missing fontSize parameter");
  }

  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node not found with ID: ${nodeId}`);
  }

  if (node.type !== "TEXT") {
    throw new Error(`Node is not a text node: ${nodeId}`);
  }

  try {
    // Load fonts for the range
    const fonts = node.getRangeAllFontNames(start, end);
    await Promise.all(fonts.map(font => figma.loadFontAsync(font)));

    // Set the font size for the range
    node.setRangeFontSize(start, end, fontSize);

    return {
      success: true,
      nodeId: nodeId,
      start: start,
      end: end,
      fontSize: fontSize
    };
  } catch (error) {
    throw new Error(`Failed to set font size: ${error.message}`);
  }
}

async function setRangeFills(params) {
  const { nodeId, start, end, color } = params || {};

  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }

  if (start === undefined || end === undefined) {
    throw new Error("Missing start or end parameters");
  }

  if (!color) {
    throw new Error("Missing color parameter");
  }

  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node not found with ID: ${nodeId}`);
  }

  if (node.type !== "TEXT") {
    throw new Error(`Node is not a text node: ${nodeId}`);
  }

  try {
    // Load fonts for the range
    const fonts = node.getRangeAllFontNames(start, end);
    await Promise.all(fonts.map(font => figma.loadFontAsync(font)));

    // Create paint from color
    const paint = {
      type: "SOLID",
      color: {
        r: parseFloat(color.r) || 0,
        g: parseFloat(color.g) || 0,
        b: parseFloat(color.b) || 0
      },
      opacity: parseFloat(color.a) || 1
    };

    // Set the fills for the range
    node.setRangeFills(start, end, [paint]);

    return {
      success: true,
      nodeId: nodeId,
      start: start,
      end: end,
      color: color
    };
  } catch (error) {
    throw new Error(`Failed to set text color: ${error.message}`);
  }
}

async function getStyledTextSegments(params) {
  const { nodeId, fields, start, end } = params || {};

  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }

  if (!fields || !Array.isArray(fields)) {
    throw new Error("Missing or invalid fields parameter");
  }

  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node not found with ID: ${nodeId}`);
  }

  if (node.type !== "TEXT") {
    throw new Error(`Node is not a text node: ${nodeId}`);
  }

  try {
    // Get styled segments
    const segments = node.getStyledTextSegments(fields, start, end);

    return {
      nodeId: nodeId,
      segments: segments,
      fields: fields
    };
  } catch (error) {
    throw new Error(`Failed to get styled text segments: ${error.message}`);
  }
}

// Component description functions

async function setComponentDescription(params) {
  const { nodeId, descriptionMarkdown } = params || {};

  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }

  if (descriptionMarkdown === undefined) {
    throw new Error("Missing descriptionMarkdown parameter");
  }

  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node not found with ID: ${nodeId}`);
  }

  if (node.type !== "COMPONENT" && node.type !== "COMPONENT_SET") {
    throw new Error(`Node is not a component: ${nodeId}`);
  }

  try {
    // Normalize the markdown if needed
    const normalized = figma.util.normalizeMarkdown(descriptionMarkdown);
    
    // Set the description
    node.descriptionMarkdown = normalized;

    return {
      success: true,
      nodeId: nodeId,
      descriptionMarkdown: node.descriptionMarkdown,
      normalized: normalized !== descriptionMarkdown
    };
  } catch (error) {
    throw new Error(`Failed to set component description: ${error.message}`);
  }
}

async function getComponentDescription(params) {
  const { nodeId } = params || {};

  if (!nodeId) {
    throw new Error("Missing nodeId parameter");
  }

  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node not found with ID: ${nodeId}`);
  }

  if (node.type !== "COMPONENT" && node.type !== "COMPONENT_SET") {
    throw new Error(`Node is not a component: ${nodeId}`);
  }

  return {
    nodeId: nodeId,
    descriptionMarkdown: node.descriptionMarkdown || "",
    type: node.type
  };
}

async function normalizeMarkdown(params) {
  const { markdown } = params || {};

  if (markdown === undefined) {
    throw new Error("Missing markdown parameter");
  }

  try {
    const normalized = figma.util.normalizeMarkdown(markdown);
    
    return {
      original: markdown,
      normalized: normalized,
      changed: normalized !== markdown
    };
  } catch (error) {
    throw new Error(`Failed to normalize markdown: ${error.message}`);
  }
}

// Function to generate simple UUIDs for command IDs
function generateCommandId() {
  return (
    "cmd_" +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

async function getAnnotations(params) {
  try {
    const { nodeId, includeCategories = true } = params;

    // Get categories first if needed
    let categoriesMap = {};
    if (includeCategories) {
      const categories = await figma.annotations.getAnnotationCategoriesAsync();
      categoriesMap = categories.reduce((map, category) => {
        map[category.id] = {
          id: category.id,
          label: category.label,
          color: category.color,
          isPreset: category.isPreset,
        };
        return map;
      }, {});
    }

    if (nodeId) {
      // Get annotations for a specific node
      const node = await figma.getNodeByIdAsync(nodeId);
      if (!node) {
        throw new Error(`Node not found: ${nodeId}`);
      }

      if (!("annotations" in node)) {
        throw new Error(`Node type ${node.type} does not support annotations`);
      }

      const result = {
        nodeId: node.id,
        name: node.name,
        annotations: node.annotations || [],
      };

      if (includeCategories) {
        result.categories = Object.values(categoriesMap);
      }

      return result;
    } else {
      // Get all annotations in the current page
      const annotations = [];
      const processNode = async (node) => {
        if (
          "annotations" in node &&
          node.annotations &&
          node.annotations.length > 0
        ) {
          annotations.push({
            nodeId: node.id,
            name: node.name,
            annotations: node.annotations,
          });
        }
        if ("children" in node) {
          for (const child of node.children) {
            await processNode(child);
          }
        }
      };

      // Start from current page
      await processNode(figma.currentPage);

      const result = {
        annotatedNodes: annotations,
      };

      if (includeCategories) {
        result.categories = Object.values(categoriesMap);
      }

      return result;
    }
  } catch (error) {
    console.error("Error in getAnnotations:", error);
    throw error;
  }
}

async function setAnnotation(params) {
  try {
    console.log("=== setAnnotation Debug Start ===");
    console.log("Input params:", JSON.stringify(params, null, 2));

    const { nodeId, annotationId, labelMarkdown, categoryId, properties } =
      params;

    // Validate required parameters
    if (!nodeId) {
      console.error("Validation failed: Missing nodeId");
      return { success: false, error: "Missing nodeId" };
    }

    if (!labelMarkdown) {
      console.error("Validation failed: Missing labelMarkdown");
      return { success: false, error: "Missing labelMarkdown" };
    }

    console.log("Attempting to get node:", nodeId);
    // Get and validate node
    const node = await figma.getNodeByIdAsync(nodeId);
    console.log("Node lookup result:", {
      id: nodeId,
      found: !!node,
      type: node ? node.type : undefined,
      name: node ? node.name : undefined,
      hasAnnotations: node ? "annotations" in node : false,
    });

    if (!node) {
      console.error("Node lookup failed:", nodeId);
      return { success: false, error: `Node not found: ${nodeId}` };
    }

    // Validate node supports annotations
    if (!("annotations" in node)) {
      console.error("Node annotation support check failed:", {
        nodeType: node.type,
        nodeId: node.id,
      });
      return {
        success: false,
        error: `Node type ${node.type} does not support annotations`,
      };
    }

    // Create the annotation object
    const newAnnotation = {
      labelMarkdown,
    };

    // Validate and add categoryId if provided
    if (categoryId) {
      console.log("Adding categoryId to annotation:", categoryId);
      newAnnotation.categoryId = categoryId;
    }

    // Validate and add properties if provided
    if (properties && Array.isArray(properties) && properties.length > 0) {
      console.log(
        "Adding properties to annotation:",
        JSON.stringify(properties, null, 2)
      );
      newAnnotation.properties = properties;
    }

    // Log current annotations before update
    console.log("Current node annotations:", node.annotations);

    // Overwrite annotations
    console.log(
      "Setting new annotation:",
      JSON.stringify(newAnnotation, null, 2)
    );
    node.annotations = [newAnnotation];

    // Verify the update
    console.log("Updated node annotations:", node.annotations);
    console.log("=== setAnnotation Debug End ===");

    return {
      success: true,
      nodeId: node.id,
      name: node.name,
      annotations: node.annotations,
    };
  } catch (error) {
    console.error("=== setAnnotation Error ===");
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      params: JSON.stringify(params, null, 2),
    });
    return { success: false, error: error.message };
  }
}

/**
 * Scan for nodes with specific types within a node
 * @param {Object} params - Parameters object
 * @param {string} params.nodeId - ID of the node to scan within
 * @param {Array<string>} params.types - Array of node types to find (e.g. ['COMPONENT', 'FRAME'])
 * @returns {Object} - Object containing found nodes
 */
async function scanNodesByTypes(params) {
  console.log(`Starting to scan nodes by types from node ID: ${params.nodeId}`);
  const { nodeId, types = [] } = params || {};

  if (!types || types.length === 0) {
    throw new Error("No types specified to search for");
  }

  const node = await figma.getNodeByIdAsync(nodeId);

  if (!node) {
    throw new Error(`Node with ID ${nodeId} not found`);
  }

  // Simple implementation without chunking
  const matchingNodes = [];

  // Send a single progress update to notify start
  const commandId = generateCommandId();
  sendProgressUpdate(
    commandId,
    "scan_nodes_by_types",
    "started",
    0,
    1,
    0,
    `Starting scan of node "${node.name || nodeId}" for types: ${types.join(
      ", "
    )}`,
    null
  );

  // Recursively find nodes with specified types
  await findNodesByTypes(node, types, matchingNodes);

  // Send completion update
  sendProgressUpdate(
    commandId,
    "scan_nodes_by_types",
    "completed",
    100,
    matchingNodes.length,
    matchingNodes.length,
    `Scan complete. Found ${matchingNodes.length} matching nodes.`,
    { matchingNodes }
  );

  return {
    success: true,
    message: `Found ${matchingNodes.length} matching nodes.`,
    count: matchingNodes.length,
    matchingNodes: matchingNodes,
    searchedTypes: types,
  };
}

/**
 * Helper function to recursively find nodes with specific types
 * @param {SceneNode} node - The root node to start searching from
 * @param {Array<string>} types - Array of node types to find
 * @param {Array} matchingNodes - Array to store found nodes
 */
async function findNodesByTypes(node, types, matchingNodes = []) {
  // Skip invisible nodes
  if (node.visible === false) return;

  // Check if this node is one of the specified types
  if (types.includes(node.type)) {
    // Create a minimal representation with just ID, type and bbox
    matchingNodes.push({
      id: node.id,
      name: node.name || `Unnamed ${node.type}`,
      type: node.type,
      // Basic bounding box info
      bbox: {
        x: typeof node.x === "number" ? node.x : 0,
        y: typeof node.y === "number" ? node.y : 0,
        width: typeof node.width === "number" ? node.width : 0,
        height: typeof node.height === "number" ? node.height : 0,
      },
    });
  }

  // Recursively process children of container nodes
  if ("children" in node) {
    for (const child of node.children) {
      await findNodesByTypes(child, types, matchingNodes);
    }
  }
}

// Set multiple annotations with async progress updates
async function setMultipleAnnotations(params) {
  console.log("=== setMultipleAnnotations Debug Start ===");
  console.log("Input params:", JSON.stringify(params, null, 2));

  const { nodeId, annotations } = params;

  if (!annotations || annotations.length === 0) {
    console.error("Validation failed: No annotations provided");
    return { success: false, error: "No annotations provided" };
  }

  console.log(
    `Processing ${annotations.length} annotations for node ${nodeId}`
  );

  const results = [];
  let successCount = 0;
  let failureCount = 0;

  // Process annotations sequentially
  for (let i = 0; i < annotations.length; i++) {
    const annotation = annotations[i];
    console.log(
      `\nProcessing annotation ${i + 1}/${annotations.length}:`,
      JSON.stringify(annotation, null, 2)
    );

    try {
      console.log("Calling setAnnotation with params:", {
        nodeId: annotation.nodeId,
        labelMarkdown: annotation.labelMarkdown,
        categoryId: annotation.categoryId,
        properties: annotation.properties,
      });

      const result = await setAnnotation({
        nodeId: annotation.nodeId,
        labelMarkdown: annotation.labelMarkdown,
        categoryId: annotation.categoryId,
        properties: annotation.properties,
      });

      console.log("setAnnotation result:", JSON.stringify(result, null, 2));

      if (result.success) {
        successCount++;
        results.push({ success: true, nodeId: annotation.nodeId });
        console.log(`✓ Annotation ${i + 1} applied successfully`);
      } else {
        failureCount++;
        results.push({
          success: false,
          nodeId: annotation.nodeId,
          error: result.error,
        });
        console.error(`✗ Annotation ${i + 1} failed:`, result.error);
      }
    } catch (error) {
      failureCount++;
      const errorResult = {
        success: false,
        nodeId: annotation.nodeId,
        error: error.message,
      };
      results.push(errorResult);
      console.error(`✗ Annotation ${i + 1} failed with error:`, error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
  }

  const summary = {
    success: successCount > 0,
    annotationsApplied: successCount,
    annotationsFailed: failureCount,
    totalAnnotations: annotations.length,
    results: results,
  };

  console.log("\n=== setMultipleAnnotations Summary ===");
  console.log(JSON.stringify(summary, null, 2));
  console.log("=== setMultipleAnnotations Debug End ===");

  return summary;
}

async function deleteMultipleNodes(params) {
  const { nodeIds } = params || {};
  const commandId = generateCommandId();

  if (!nodeIds || !Array.isArray(nodeIds) || nodeIds.length === 0) {
    const errorMsg = "Missing or invalid nodeIds parameter";
    sendProgressUpdate(
      commandId,
      "delete_multiple_nodes",
      "error",
      0,
      0,
      0,
      errorMsg,
      { error: errorMsg }
    );
    throw new Error(errorMsg);
  }

  console.log(`Starting deletion of ${nodeIds.length} nodes`);

  // Send started progress update
  sendProgressUpdate(
    commandId,
    "delete_multiple_nodes",
    "started",
    0,
    nodeIds.length,
    0,
    `Starting deletion of ${nodeIds.length} nodes`,
    { totalNodes: nodeIds.length }
  );

  const results = [];
  let successCount = 0;
  let failureCount = 0;

  // Process nodes in chunks of 5 to avoid overwhelming Figma
  const CHUNK_SIZE = 5;
  const chunks = [];

  for (let i = 0; i < nodeIds.length; i += CHUNK_SIZE) {
    chunks.push(nodeIds.slice(i, i + CHUNK_SIZE));
  }

  console.log(`Split ${nodeIds.length} deletions into ${chunks.length} chunks`);

  // Send chunking info update
  sendProgressUpdate(
    commandId,
    "delete_multiple_nodes",
    "in_progress",
    5,
    nodeIds.length,
    0,
    `Preparing to delete ${nodeIds.length} nodes using ${chunks.length} chunks`,
    {
      totalNodes: nodeIds.length,
      chunks: chunks.length,
      chunkSize: CHUNK_SIZE,
    }
  );

  // Process each chunk sequentially
  for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
    const chunk = chunks[chunkIndex];
    console.log(
      `Processing chunk ${chunkIndex + 1}/${chunks.length} with ${chunk.length
      } nodes`
    );

    // Send chunk processing start update
    sendProgressUpdate(
      commandId,
      "delete_multiple_nodes",
      "in_progress",
      Math.round(5 + (chunkIndex / chunks.length) * 90),
      nodeIds.length,
      successCount + failureCount,
      `Processing deletion chunk ${chunkIndex + 1}/${chunks.length}`,
      {
        currentChunk: chunkIndex + 1,
        totalChunks: chunks.length,
        successCount,
        failureCount,
      }
    );

    // Process deletions within a chunk in parallel
    const chunkPromises = chunk.map(async (nodeId) => {
      try {
        const node = await figma.getNodeByIdAsync(nodeId);

        if (!node) {
          console.error(`Node not found: ${nodeId}`);
          return {
            success: false,
            nodeId: nodeId,
            error: `Node not found: ${nodeId}`,
          };
        }

        // Save node info before deleting
        const nodeInfo = {
          id: node.id,
          name: node.name,
          type: node.type,
        };

        // Delete the node
        node.remove();

        console.log(`Successfully deleted node: ${nodeId}`);
        return {
          success: true,
          nodeId: nodeId,
          nodeInfo: nodeInfo,
        };
      } catch (error) {
        console.error(`Error deleting node ${nodeId}: ${error.message}`);
        return {
          success: false,
          nodeId: nodeId,
          error: error.message,
        };
      }
    });

    // Wait for all deletions in this chunk to complete
    const chunkResults = await Promise.all(chunkPromises);

    // Process results for this chunk
    chunkResults.forEach((result) => {
      if (result.success) {
        successCount++;
      } else {
        failureCount++;
      }
      results.push(result);
    });

    // Send chunk processing complete update
    sendProgressUpdate(
      commandId,
      "delete_multiple_nodes",
      "in_progress",
      Math.round(5 + ((chunkIndex + 1) / chunks.length) * 90),
      nodeIds.length,
      successCount + failureCount,
      `Completed chunk ${chunkIndex + 1}/${chunks.length
      }. ${successCount} successful, ${failureCount} failed so far.`,
      {
        currentChunk: chunkIndex + 1,
        totalChunks: chunks.length,
        successCount,
        failureCount,
        chunkResults: chunkResults,
      }
    );

    // Add a small delay between chunks
    if (chunkIndex < chunks.length - 1) {
      console.log("Pausing between chunks...");
      await delay(1000);
    }
  }

  console.log(
    `Deletion complete: ${successCount} successful, ${failureCount} failed`
  );

  // Send completed progress update
  sendProgressUpdate(
    commandId,
    "delete_multiple_nodes",
    "completed",
    100,
    nodeIds.length,
    successCount + failureCount,
    `Node deletion complete: ${successCount} successful, ${failureCount} failed`,
    {
      totalNodes: nodeIds.length,
      nodesDeleted: successCount,
      nodesFailed: failureCount,
      completedInChunks: chunks.length,
      results: results,
    }
  );

  return {
    success: successCount > 0,
    nodesDeleted: successCount,
    nodesFailed: failureCount,
    totalNodes: nodeIds.length,
    results: results,
    completedInChunks: chunks.length,
    commandId,
  };
}

// Implementation for getInstanceOverrides function
async function getInstanceOverrides(instanceNode = null) {
  console.log("=== getInstanceOverrides called ===");

  let sourceInstance = null;

  // Check if an instance node was passed directly
  if (instanceNode) {
    console.log("Using provided instance node");

    // Validate that the provided node is an instance
    if (instanceNode.type !== "INSTANCE") {
      console.error("Provided node is not an instance");
      figma.notify("Provided node is not a component instance");
      return { success: false, message: "Provided node is not a component instance" };
    }

    sourceInstance = instanceNode;
  } else {
    // No node provided, use selection
    console.log("No node provided, using current selection");

    // Get the current selection
    const selection = figma.currentPage.selection;

    // Check if there's anything selected
    if (selection.length === 0) {
      console.log("No nodes selected");
      figma.notify("Please select at least one instance");
      return { success: false, message: "No nodes selected" };
    }

    // Filter for instances in the selection
    const instances = selection.filter(node => node.type === "INSTANCE");

    if (instances.length === 0) {
      console.log("No instances found in selection");
      figma.notify("Please select at least one component instance");
      return { success: false, message: "No instances found in selection" };
    }

    // Take the first instance from the selection
    sourceInstance = instances[0];
  }

  try {
    console.log(`Getting instance information:`);
    console.log(sourceInstance);

    // Get component overrides and main component
    const overrides = sourceInstance.overrides || [];
    console.log(`  Raw Overrides:`, overrides);

    // Get main component
    const mainComponent = await sourceInstance.getMainComponentAsync();
    if (!mainComponent) {
      console.error("Failed to get main component");
      figma.notify("Failed to get main component");
      return { success: false, message: "Failed to get main component" };
    }

    // return data to MCP server
    const returnData = {
      success: true,
      message: `Got component information from "${sourceInstance.name}" for overrides.length: ${overrides.length}`,
      sourceInstanceId: sourceInstance.id,
      mainComponentId: mainComponent.id,
      overridesCount: overrides.length
    };

    console.log("Data to return to MCP server:", returnData);
    figma.notify(`Got component information from "${sourceInstance.name}"`);

    return returnData;
  } catch (error) {
    console.error("Error in getInstanceOverrides:", error);
    figma.notify(`Error: ${error.message}`);
    return {
      success: false,
      message: `Error: ${error.message}`
    };
  }
}

/**
 * Helper function to validate and get target instances
 * @param {string[]} targetNodeIds - Array of instance node IDs
 * @returns {instanceNode[]} targetInstances - Array of target instances
 */
async function getValidTargetInstances(targetNodeIds) {
  let targetInstances = [];

  // Handle array of instances or single instance
  if (Array.isArray(targetNodeIds)) {
    if (targetNodeIds.length === 0) {
      return { success: false, message: "No instances provided" };
    }
    for (const targetNodeId of targetNodeIds) {
      const targetNode = await figma.getNodeByIdAsync(targetNodeId);
      if (targetNode && targetNode.type === "INSTANCE") {
        targetInstances.push(targetNode);
      }
    }
    if (targetInstances.length === 0) {
      return { success: false, message: "No valid instances provided" };
    }
  } else {
    return { success: false, message: "Invalid target node IDs provided" };
  }


  return { success: true, message: "Valid target instances provided", targetInstances };
}

/**
 * Helper function to validate and get saved override data
 * @param {string} sourceInstanceId - Source instance ID
 * @returns {Promise<Object>} - Validation result with source instance data or error
 */
async function getSourceInstanceData(sourceInstanceId) {
  if (!sourceInstanceId) {
    return { success: false, message: "Missing source instance ID" };
  }

  // Get source instance by ID
  const sourceInstance = await figma.getNodeByIdAsync(sourceInstanceId);
  if (!sourceInstance) {
    return {
      success: false,
      message: "Source instance not found. The original instance may have been deleted."
    };
  }

  // Verify it's an instance
  if (sourceInstance.type !== "INSTANCE") {
    return {
      success: false,
      message: "Source node is not a component instance."
    };
  }

  // Get main component
  const mainComponent = await sourceInstance.getMainComponentAsync();
  if (!mainComponent) {
    return {
      success: false,
      message: "Failed to get main component from source instance."
    };
  }

  return {
    success: true,
    sourceInstance,
    mainComponent,
    overrides: sourceInstance.overrides || []
  };
}

/**
 * Sets saved overrides to the selected component instance(s)
 * @param {InstanceNode[] | null} targetInstances - Array of instance nodes to set overrides to
 * @param {Object} sourceResult - Source instance data from getSourceInstanceData
 * @returns {Promise<Object>} - Result of the set operation
 */
async function setInstanceOverrides(targetInstances, sourceResult) {
  try {


    const { sourceInstance, mainComponent, overrides } = sourceResult;

    console.log(`Processing ${targetInstances.length} instances with ${overrides.length} overrides`);
    console.log(`Source instance: ${sourceInstance.id}, Main component: ${mainComponent.id}`);
    console.log(`Overrides:`, overrides);

    // Process all instances
    const results = [];
    let totalAppliedCount = 0;

    for (const targetInstance of targetInstances) {
      try {
        // // Skip if trying to apply to the source instance itself
        // if (targetInstance.id === sourceInstance.id) {
        //   console.log(`Skipping source instance itself: ${targetInstance.id}`);
        //   results.push({
        //     success: false,
        //     instanceId: targetInstance.id,
        //     instanceName: targetInstance.name,
        //     message: "This is the source instance itself, skipping"
        //   });
        //   continue;
        // }

        // Swap component
        try {
          targetInstance.swapComponent(mainComponent);
          console.log(`Swapped component for instance "${targetInstance.name}"`);
        } catch (error) {
          console.error(`Error swapping component for instance "${targetInstance.name}":`, error);
          results.push({
            success: false,
            instanceId: targetInstance.id,
            instanceName: targetInstance.name,
            message: `Error: ${error.message}`
          });
        }

        // Prepare overrides by replacing node IDs
        let appliedCount = 0;

        // Apply each override
        for (const override of overrides) {
          // Skip if no ID or overriddenFields
          if (!override.id || !override.overriddenFields || override.overriddenFields.length === 0) {
            continue;
          }

          // Replace source instance ID with target instance ID in the node path
          const overrideNodeId = override.id.replace(sourceInstance.id, targetInstance.id);
          const overrideNode = await figma.getNodeByIdAsync(overrideNodeId);

          if (!overrideNode) {
            console.log(`Override node not found: ${overrideNodeId}`);
            continue;
          }

          // Get source node to copy properties from
          const sourceNode = await figma.getNodeByIdAsync(override.id);
          if (!sourceNode) {
            console.log(`Source node not found: ${override.id}`);
            continue;
          }

          // Apply each overridden field
          let fieldApplied = false;
          for (const field of override.overriddenFields) {
            try {
              if (field === "componentProperties") {
                // Apply component properties
                if (sourceNode.componentProperties && overrideNode.componentProperties) {
                  const properties = {};
                  for (const key in sourceNode.componentProperties) {
                    // if INSTANCE_SWAP use id, otherwise use value
                    if (sourceNode.componentProperties[key].type === 'INSTANCE_SWAP') {
                      properties[key] = sourceNode.componentProperties[key].value;
                    
                    } else {
                      properties[key] = sourceNode.componentProperties[key].value;
                    }
                  }
                  overrideNode.setProperties(properties);
                  fieldApplied = true;
                }
              } else if (field === "characters" && overrideNode.type === "TEXT") {
                // For text nodes, need to load fonts first
                await figma.loadFontAsync(overrideNode.fontName);
                overrideNode.characters = sourceNode.characters;
                fieldApplied = true;
              } else if (field in overrideNode) {
                // Direct property assignment
                overrideNode[field] = sourceNode[field];
                fieldApplied = true;
              }
            } catch (fieldError) {
              console.error(`Error applying field ${field}:`, fieldError);
            }
          }

          if (fieldApplied) {
            appliedCount++;
          }
        }

        if (appliedCount > 0) {
          totalAppliedCount += appliedCount;
          results.push({
            success: true,
            instanceId: targetInstance.id,
            instanceName: targetInstance.name,
            appliedCount
          });
          console.log(`Applied ${appliedCount} overrides to "${targetInstance.name}"`);
        } else {
          results.push({
            success: false,
            instanceId: targetInstance.id,
            instanceName: targetInstance.name,
            message: "No overrides were applied"
          });
        }
      } catch (instanceError) {
        console.error(`Error processing instance "${targetInstance.name}":`, instanceError);
        results.push({
          success: false,
          instanceId: targetInstance.id,
          instanceName: targetInstance.name,
          message: `Error: ${instanceError.message}`
        });
      }
    }

    // Return results
    if (totalAppliedCount > 0) {
      const instanceCount = results.filter(r => r.success).length;
      const message = `Applied ${totalAppliedCount} overrides to ${instanceCount} instances`;
      figma.notify(message);
      return {
        success: true,
        message,
        totalCount: totalAppliedCount,
        results
      };
    } else {
      const message = "No overrides applied to any instance";
      figma.notify(message);
      return { success: false, message, results };
    }

  } catch (error) {
    console.error("Error in setInstanceOverrides:", error);
    const message = `Error: ${error.message}`;
    figma.notify(message);
    return { success: false, message };
  }
}

async function setLayoutMode(params) {
  const { nodeId, layoutMode = "NONE", layoutWrap = "NO_WRAP" } = params || {};

  // Get the target node
  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node with ID ${nodeId} not found`);
  }

  // Check if node is a frame, slide, or component that supports layoutMode
  if (
    node.type !== "FRAME" &&
    node.type !== "SLIDE" &&
    node.type !== "COMPONENT" &&
    node.type !== "COMPONENT_SET" &&
    node.type !== "INSTANCE"
  ) {
    throw new Error(`Node type ${node.type} does not support layoutMode`);
  }

  // Set layout mode
  node.layoutMode = layoutMode;

  // Set layoutWrap if applicable
  if (layoutMode !== "NONE") {
    node.layoutWrap = layoutWrap;
  }

  return {
    id: node.id,
    name: node.name,
    layoutMode: node.layoutMode,
    layoutWrap: node.layoutWrap,
  };
}

async function setPadding(params) {
  const { nodeId, paddingTop, paddingRight, paddingBottom, paddingLeft } =
    params || {};

  // Get the target node
  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node with ID ${nodeId} not found`);
  }

  // Check if node is a frame, slide, or component that supports padding
  if (
    node.type !== "FRAME" &&
    node.type !== "SLIDE" &&
    node.type !== "COMPONENT" &&
    node.type !== "COMPONENT_SET" &&
    node.type !== "INSTANCE"
  ) {
    throw new Error(`Node type ${node.type} does not support padding`);
  }

  // Check if the node has auto-layout enabled
  if (node.layoutMode === "NONE") {
    throw new Error(
      "Padding can only be set on auto-layout frames (layoutMode must not be NONE)"
    );
  }

  // Set padding values if provided
  if (paddingTop !== undefined) node.paddingTop = paddingTop;
  if (paddingRight !== undefined) node.paddingRight = paddingRight;
  if (paddingBottom !== undefined) node.paddingBottom = paddingBottom;
  if (paddingLeft !== undefined) node.paddingLeft = paddingLeft;

  return {
    id: node.id,
    name: node.name,
    paddingTop: node.paddingTop,
    paddingRight: node.paddingRight,
    paddingBottom: node.paddingBottom,
    paddingLeft: node.paddingLeft,
  };
}

async function setAxisAlign(params) {
  const { nodeId, primaryAxisAlignItems, counterAxisAlignItems } = params || {};

  // Get the target node
  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node with ID ${nodeId} not found`);
  }

  // Check if node is a frame, slide, or component that supports axis alignment
  if (
    node.type !== "FRAME" &&
    node.type !== "SLIDE" &&
    node.type !== "COMPONENT" &&
    node.type !== "COMPONENT_SET" &&
    node.type !== "INSTANCE"
  ) {
    throw new Error(`Node type ${node.type} does not support axis alignment`);
  }

  // Check if the node has auto-layout enabled
  if (node.layoutMode === "NONE") {
    throw new Error(
      "Axis alignment can only be set on auto-layout frames (layoutMode must not be NONE)"
    );
  }

  // Validate and set primaryAxisAlignItems if provided
  if (primaryAxisAlignItems !== undefined) {
    if (
      !["MIN", "MAX", "CENTER", "SPACE_BETWEEN"].includes(primaryAxisAlignItems)
    ) {
      throw new Error(
        "Invalid primaryAxisAlignItems value. Must be one of: MIN, MAX, CENTER, SPACE_BETWEEN"
      );
    }
    node.primaryAxisAlignItems = primaryAxisAlignItems;
  }

  // Validate and set counterAxisAlignItems if provided
  if (counterAxisAlignItems !== undefined) {
    if (!["MIN", "MAX", "CENTER", "BASELINE"].includes(counterAxisAlignItems)) {
      throw new Error(
        "Invalid counterAxisAlignItems value. Must be one of: MIN, MAX, CENTER, BASELINE"
      );
    }
    // BASELINE is only valid for horizontal layout
    if (
      counterAxisAlignItems === "BASELINE" &&
      node.layoutMode !== "HORIZONTAL"
    ) {
      throw new Error(
        "BASELINE alignment is only valid for horizontal auto-layout frames"
      );
    }
    node.counterAxisAlignItems = counterAxisAlignItems;
  }

  return {
    id: node.id,
    name: node.name,
    primaryAxisAlignItems: node.primaryAxisAlignItems,
    counterAxisAlignItems: node.counterAxisAlignItems,
    layoutMode: node.layoutMode,
  };
}

async function setLayoutSizing(params) {
  const { nodeId, layoutSizingHorizontal, layoutSizingVertical } = params || {};

  // Get the target node
  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node with ID ${nodeId} not found`);
  }

  // Check if node is a frame, slide, or component that supports layout sizing
  if (
    node.type !== "FRAME" &&
    node.type !== "SLIDE" &&
    node.type !== "COMPONENT" &&
    node.type !== "COMPONENT_SET" &&
    node.type !== "INSTANCE"
  ) {
    throw new Error(`Node type ${node.type} does not support layout sizing`);
  }

  // Check if the node has auto-layout enabled
  if (node.layoutMode === "NONE") {
    throw new Error(
      "Layout sizing can only be set on auto-layout frames (layoutMode must not be NONE)"
    );
  }

  // Validate and set layoutSizingHorizontal if provided
  if (layoutSizingHorizontal !== undefined) {
    if (!["FIXED", "HUG", "FILL"].includes(layoutSizingHorizontal)) {
      throw new Error(
        "Invalid layoutSizingHorizontal value. Must be one of: FIXED, HUG, FILL"
      );
    }
    // HUG is only valid on auto-layout frames and text nodes
    if (
      layoutSizingHorizontal === "HUG" &&
      !["FRAME", "SLIDE", "TEXT"].includes(node.type)
    ) {
      throw new Error(
        "HUG sizing is only valid on auto-layout frames and text nodes"
      );
    }
    // FILL is only valid on auto-layout children
    if (
      layoutSizingHorizontal === "FILL" &&
      (!node.parent || node.parent.layoutMode === "NONE")
    ) {
      throw new Error("FILL sizing is only valid on auto-layout children");
    }
    node.layoutSizingHorizontal = layoutSizingHorizontal;
  }

  // Validate and set layoutSizingVertical if provided
  if (layoutSizingVertical !== undefined) {
    if (!["FIXED", "HUG", "FILL"].includes(layoutSizingVertical)) {
      throw new Error(
        "Invalid layoutSizingVertical value. Must be one of: FIXED, HUG, FILL"
      );
    }
    // HUG is only valid on auto-layout frames and text nodes
    if (
      layoutSizingVertical === "HUG" &&
      !["FRAME", "TEXT"].includes(node.type)
    ) {
      throw new Error(
        "HUG sizing is only valid on auto-layout frames and text nodes"
      );
    }
    // FILL is only valid on auto-layout children
    if (
      layoutSizingVertical === "FILL" &&
      (!node.parent || node.parent.layoutMode === "NONE")
    ) {
      throw new Error("FILL sizing is only valid on auto-layout children");
    }
    node.layoutSizingVertical = layoutSizingVertical;
  }

  return {
    id: node.id,
    name: node.name,
    layoutSizingHorizontal: node.layoutSizingHorizontal,
    layoutSizingVertical: node.layoutSizingVertical,
    layoutMode: node.layoutMode,
  };
}

async function setItemSpacing(params) {
  const { nodeId, itemSpacing } = params || {};

  // Get the target node
  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) {
    throw new Error(`Node with ID ${nodeId} not found`);
  }

  // Check if node is a frame, slide, or component that supports item spacing
  if (
    node.type !== "FRAME" &&
    node.type !== "SLIDE" &&
    node.type !== "COMPONENT" &&
    node.type !== "COMPONENT_SET" &&
    node.type !== "INSTANCE"
  ) {
    throw new Error(`Node type ${node.type} does not support item spacing`);
  }

  // Check if the node has auto-layout enabled
  if (node.layoutMode === "NONE") {
    throw new Error(
      "Item spacing can only be set on auto-layout frames (layoutMode must not be NONE)"
    );
  }

  // Set item spacing
  if (itemSpacing !== undefined) {
    if (typeof itemSpacing !== "number") {
      throw new Error("Item spacing must be a number");
    }
    node.itemSpacing = itemSpacing;
  }

  return {
    id: node.id,
    name: node.name,
    itemSpacing: node.itemSpacing,
    layoutMode: node.layoutMode,
  };
}

async function setDefaultConnector(params) {
  const { connectorId } = params || {};
  
  // If connectorId is provided, search and set by that ID (do not check existing storage)
  if (connectorId) {
    // Get node by specified ID
    const node = await figma.getNodeByIdAsync(connectorId);
    if (!node) {
      throw new Error(`Connector node not found with ID: ${connectorId}`);
    }
    
    // Check node type
    if (node.type !== 'CONNECTOR') {
      throw new Error(`Node is not a connector: ${connectorId}`);
    }
    
    // Set the found connector as the default connector
    await figma.clientStorage.setAsync('defaultConnectorId', connectorId);
    
    return {
      success: true,
      message: `Default connector set to: ${connectorId}`,
      connectorId: connectorId
    };
  } 
  // If connectorId is not provided, check existing storage
  else {
    // Check if there is an existing default connector in client storage
    try {
      const existingConnectorId = await figma.clientStorage.getAsync('defaultConnectorId');
      
      // If there is an existing connector ID, check if the node is still valid
      if (existingConnectorId) {
        try {
          const existingConnector = await figma.getNodeByIdAsync(existingConnectorId);
          
          // If the stored connector still exists and is of type CONNECTOR
          if (existingConnector && existingConnector.type === 'CONNECTOR') {
            return {
              success: true,
              message: `Default connector is already set to: ${existingConnectorId}`,
              connectorId: existingConnectorId,
              exists: true
            };
          }
          // The stored connector is no longer valid - find a new connector
          else {
            console.log(`Stored connector ID ${existingConnectorId} is no longer valid, finding a new connector...`);
          }
        } catch (error) {
          console.log(`Error finding stored connector: ${error.message}. Will try to set a new one.`);
        }
      }
    } catch (error) {
      console.log(`Error checking for existing connector: ${error.message}`);
    }
    
    // If there is no stored default connector or it is invalid, find one in the current page
    try {
      // Find CONNECTOR type nodes in the current page
      const currentPageConnectors = figma.currentPage.findAllWithCriteria({ types: ['CONNECTOR'] });
      
      if (currentPageConnectors && currentPageConnectors.length > 0) {
        // Use the first connector found
        const foundConnector = currentPageConnectors[0];
        const autoFoundId = foundConnector.id;
        
        // Set the found connector as the default connector
        await figma.clientStorage.setAsync('defaultConnectorId', autoFoundId);
        
        return {
          success: true,
          message: `Automatically found and set default connector to: ${autoFoundId}`,
          connectorId: autoFoundId,
          autoSelected: true
        };
      } else {
        // If no connector is found in the current page, show a guide message
        throw new Error('No connector found in the current page. Please create a connector in Figma first or specify a connector ID.');
      }
    } catch (error) {
      // Error occurred while running findAllWithCriteria
      throw new Error(`Failed to find a connector: ${error.message}`);
    }
  }
}

async function createCursorNode(targetNodeId) {
  const svgString = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8V35.2419L22 28.4315L27 39.7823C27 39.7823 28.3526 40.2722 29 39.7823C29.6474 39.2924 30.2913 38.3057 30 37.5121C28.6247 33.7654 25 26.1613 25 26.1613H32L16 8Z" fill="#202125" />
  </svg>`;
  try {
    const targetNode = await figma.getNodeByIdAsync(targetNodeId);
    if (!targetNode) throw new Error("Target node not found");

    // The targetNodeId has semicolons since it is a nested node.
    // So we need to get the parent node ID from the target node ID and check if we can appendChild to it or not.
    let parentNodeId = targetNodeId.includes(';') 
      ? targetNodeId.split(';')[0] 
      : targetNodeId;
    if (!parentNodeId) throw new Error("Could not determine parent node ID");

    // Find the parent node to append cursor node as child
    let parentNode = await figma.getNodeByIdAsync(parentNodeId);
    if (!parentNode) throw new Error("Parent node not found");

    // If the parent node is not eligible to appendChild, set the parentNode to the parent of the parentNode
    if (parentNode.type === 'INSTANCE' || parentNode.type === 'COMPONENT' || parentNode.type === 'COMPONENT_SET') {
      parentNode = parentNode.parent;
      if (!parentNode) throw new Error("Parent node not found");
    }

    // Create the cursor node
    const importedNode = await figma.createNodeFromSvg(svgString);
    if (!importedNode || !importedNode.id) {
      throw new Error("Failed to create imported cursor node");
    }
    importedNode.name = "TTF_Connector / Mouse Cursor";
    importedNode.resize(48, 48);

    const cursorNode = importedNode.findOne(node => node.type === 'VECTOR');
    if (cursorNode) {
      cursorNode.fills = [{
        type: 'SOLID',
        color: { r: 0, g: 0, b: 0 },
        opacity: 1
      }];
      cursorNode.strokes = [{
        type: 'SOLID',
        color: { r: 1, g: 1, b: 1 },
        opacity: 1
      }];
      cursorNode.strokeWeight = 2;
      cursorNode.strokeAlign = 'OUTSIDE';
      cursorNode.effects = [{
        type: "DROP_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0.3 },
        offset: { x: 1, y: 1 },
        radius: 2,
        spread: 0,
        visible: true,
        blendMode: "NORMAL"
      }];
    }

    // Append the cursor node to the parent node
    parentNode.appendChild(importedNode);

    // if the parentNode has auto-layout enabled, set the layoutPositioning to ABSOLUTE
    if ('layoutMode' in parentNode && parentNode.layoutMode !== 'NONE') {
      importedNode.layoutPositioning = 'ABSOLUTE';
    }

    // Adjust the importedNode's position to the targetNode's position
    if (
      targetNode.absoluteBoundingBox &&
      parentNode.absoluteBoundingBox
    ) {
      // if the targetNode has absoluteBoundingBox, set the importedNode's absoluteBoundingBox to the targetNode's absoluteBoundingBox
      console.log('targetNode.absoluteBoundingBox', targetNode.absoluteBoundingBox);
      console.log('parentNode.absoluteBoundingBox', parentNode.absoluteBoundingBox);
      importedNode.x = targetNode.absoluteBoundingBox.x - parentNode.absoluteBoundingBox.x  + targetNode.absoluteBoundingBox.width / 2 - 48 / 2
      importedNode.y = targetNode.absoluteBoundingBox.y - parentNode.absoluteBoundingBox.y + targetNode.absoluteBoundingBox.height / 2 - 48 / 2;
    } else if (
      'x' in targetNode && 'y' in targetNode && 'width' in targetNode && 'height' in targetNode) {
        // if the targetNode has x, y, width, height, calculate center based on relative position
        console.log('targetNode.x/y/width/height', targetNode.x, targetNode.y, targetNode.width, targetNode.height);
        importedNode.x = targetNode.x + targetNode.width / 2 - 48 / 2;
        importedNode.y = targetNode.y + targetNode.height / 2 - 48 / 2;
    } else {
      // Fallback: Place at top-left of target if possible, otherwise at (0,0) relative to parent
      if ('x' in targetNode && 'y' in targetNode) {
        console.log('Fallback to targetNode x/y');
        importedNode.x = targetNode.x;
        importedNode.y = targetNode.y;
      } else {
        console.log('Fallback to (0,0)');
        importedNode.x = 0;
        importedNode.y = 0;
      }
    }

    // get the importedNode ID and the importedNode
    console.log('importedNode', importedNode);


    return { id: importedNode.id, node: importedNode };
    
  } catch (error) {
    console.error("Error creating cursor from SVG:", error);
    return { id: null, node: null, error: error.message };
  }
}

async function createConnections(params) {
  if (!params || !params.connections || !Array.isArray(params.connections)) {
    throw new Error('Missing or invalid connections parameter');
  }
  
  const { connections } = params;
  
  // Command ID for progress tracking
  const commandId = generateCommandId();
  sendProgressUpdate(
    commandId,
    "create_connections",
    "started",
    0,
    connections.length,
    0,
    `Starting to create ${connections.length} connections`
  );
  
  // Get default connector ID from client storage
  const defaultConnectorId = await figma.clientStorage.getAsync('defaultConnectorId');
  if (!defaultConnectorId) {
    throw new Error('No default connector set. Please try one of the following options to create connections:\n1. Create a connector in FigJam and copy/paste it to your current page, then run the "set_default_connector" command.\n2. Select an existing connector on the current page, then run the "set_default_connector" command.');
  }
  
  // Get the default connector
  const defaultConnector = await figma.getNodeByIdAsync(defaultConnectorId);
  if (!defaultConnector) {
    throw new Error(`Default connector not found with ID: ${defaultConnectorId}`);
  }
  if (defaultConnector.type !== 'CONNECTOR') {
    throw new Error(`Node is not a connector: ${defaultConnectorId}`);
  }
  
  // Results array for connection creation
  const results = [];
  let processedCount = 0;
  const totalCount = connections.length;
  
  // Preload fonts (used for text if provided)
  let fontLoaded = false;
  
  for (let i = 0; i < connections.length; i++) {
    try {
      const { startNodeId: originalStartId, endNodeId: originalEndId, text } = connections[i];
      let startId = originalStartId;
      let endId = originalEndId;

      // Check and potentially replace start node ID
      if (startId.includes(';')) {
        console.log(`Nested start node detected: ${startId}. Creating cursor node.`);
        const cursorResult = await createCursorNode(startId);
        if (!cursorResult || !cursorResult.id) {
          throw new Error(`Failed to create cursor node for nested start node: ${startId}`);
        }
        startId = cursorResult.id; 
      }  
      
      const startNode = await figma.getNodeByIdAsync(startId);
      if (!startNode) throw new Error(`Start node not found with ID: ${startId}`);

      // Check and potentially replace end node ID
      if (endId.includes(';')) {
        console.log(`Nested end node detected: ${endId}. Creating cursor node.`);
        const cursorResult = await createCursorNode(endId);
        if (!cursorResult || !cursorResult.id) {
          throw new Error(`Failed to create cursor node for nested end node: ${endId}`);
        }
        endId = cursorResult.id;
      }
      const endNode = await figma.getNodeByIdAsync(endId);
      if (!endNode) throw new Error(`End node not found with ID: ${endId}`);

      
      // Clone the default connector
      const clonedConnector = defaultConnector.clone();
      
      // Update connector name using potentially replaced node names
      clonedConnector.name = `TTF_Connector/${startNode.id}/${endNode.id}`;
      
      // Set start and end points using potentially replaced IDs
      clonedConnector.connectorStart = {
        endpointNodeId: startId,
        magnet: 'AUTO'
      };
      
      clonedConnector.connectorEnd = {
        endpointNodeId: endId,
        magnet: 'AUTO'
      };
      
      // Add text (if provided)
      if (text) {
        try {
          // Try to load the necessary fonts
          try {
            // First check if default connector has font and use the same
            if (defaultConnector.text && defaultConnector.text.fontName) {
              const fontName = defaultConnector.text.fontName;
              await figma.loadFontAsync(fontName);
              clonedConnector.text.fontName = fontName;
            } else {
              // Try default Inter font
              await figma.loadFontAsync({ family: "Inter", style: "Regular" });
            }
          } catch (fontError) {
            // If first font load fails, try another font style
            try {
              await figma.loadFontAsync({ family: "Inter", style: "Medium" });
            } catch (mediumFontError) {
              // If second font fails, try system font
              try {
                await figma.loadFontAsync({ family: "System", style: "Regular" });
              } catch (systemFontError) {
                // If all font loading attempts fail, throw error
                throw new Error(`Failed to load any font: ${fontError.message}`);
              }
            }
          }
          
          // Set the text
          clonedConnector.text.characters = text;
        } catch (textError) {
          console.error("Error setting text:", textError);
          // Continue with connection even if text setting fails
          results.push({
            id: clonedConnector.id,
            startNodeId: startNodeId,
            endNodeId: endNodeId,
            text: "",
            textError: textError.message
          });
          
          // Continue to next connection
          continue;
        }
      }
      
      // Add to results (using the *original* IDs for reference if needed)
      results.push({
        id: clonedConnector.id,
        originalStartNodeId: originalStartId,
        originalEndNodeId: originalEndId,
        usedStartNodeId: startId, // ID actually used for connection
        usedEndNodeId: endId,     // ID actually used for connection
        text: text || ""
      });
      
      // Update progress
      processedCount++;
      sendProgressUpdate(
        commandId,
        "create_connections",
        "in_progress",
        processedCount / totalCount,
        totalCount,
        processedCount,
        `Created connection ${processedCount}/${totalCount}`
      );
      
    } catch (error) {
      console.error("Error creating connection", error);
      // Continue processing remaining connections even if an error occurs
      processedCount++;
      sendProgressUpdate(
        commandId,
        "create_connections",
        "in_progress",
        processedCount / totalCount,
        totalCount,
        processedCount,
        `Error creating connection: ${error.message}`
      );
      
      results.push({
        error: error.message,
        connectionInfo: connections[i]
      });
    }
  }
  
  // Completion update
  sendProgressUpdate(
    commandId,
    "create_connections",
    "completed",
    1,
    totalCount,
    totalCount,
    `Completed creating ${results.length} connections`
  );
  
  return {
    success: true,
    count: results.length,
    connections: results
  };
}

// New unified API handlers

async function getNodes(params) {
  const { nodeIds, includeChildren = true, maxDepth = -1 } = params || {};
  
  if (!nodeIds) {
    throw new Error("Missing nodeIds parameter");
  }
  
  // Handle different input formats including stringified arrays
  let ids;
  
  if (typeof nodeIds === 'string') {
    // Check if it's a stringified array
    if (nodeIds.startsWith('[') && nodeIds.endsWith(']')) {
      try {
        // Try to parse as JSON array
        const parsed = JSON.parse(nodeIds);
        if (Array.isArray(parsed)) {
          ids = parsed;
        } else {
          // Not a valid array, treat as single ID
          ids = [nodeIds];
        }
      } catch (e) {
        // Failed to parse, treat as single ID
        ids = [nodeIds];
      }
    } else {
      // Regular single node ID string
      ids = [nodeIds];
    }
  } else if (Array.isArray(nodeIds)) {
    // Already an array
    ids = nodeIds;
  } else {
    throw new Error("nodeIds must be a string or array of strings");
  }
  
  if (!ids || ids.length === 0) {
    throw new Error("No node IDs provided");
  }
  
  // For single node, use getNodeInfo for efficiency
  if (ids.length === 1) {
    const nodeInfo = await getNodeInfo(ids[0]);
    return {
      success: true,
      nodes: [nodeInfo],
      includeChildren,
      maxDepth
    };
  }
  
  // For multiple nodes, use getMultipleNodesInfo
  const result = await getMultipleNodesInfo({ nodeIds: ids });
  return {
    success: result.success,
    nodes: result.results.filter(r => r.success).map(r => r.info),
    totalFound: result.totalFound,
    totalNotFound: result.totalNotFound,
    includeChildren,
    maxDepth
  };
}

async function getCurrentContext(params) {
  const { includeDocument = false, includeSlideDetails = true, includeSelectionDetails = false } = params || {};
  
  const context = {
    selection: null,
    focusedSlide: null,
    slidesMode: false,
    document: null
  };
  
  // Get selection
  try {
    const selection = await getSelection();
    context.selection = selection;
    
    if (includeSelectionDetails && selection.selectedNodes && selection.selectedNodes.length > 0) {
      // Get detailed info for selected nodes
      const nodeIds = selection.selectedNodes.map(n => n.id);
      const nodesInfo = await getMultipleNodesInfo({ nodeIds });
      context.selectionDetails = nodesInfo.results;
    }
  } catch (error) {
    context.selection = { error: error.message };
  }
  
  // Check if in Slides mode
  try {
    const slidesMode = await getSlidesMode();
    context.slidesMode = slidesMode.inSlidesMode;
    
    if (slidesMode.inSlidesMode && includeSlideDetails) {
      // Get focused slide
      try {
        const focusedSlide = await getFocusedSlide();
        context.focusedSlide = focusedSlide;
      } catch (error) {
        context.focusedSlide = { error: error.message };
      }
    }
  } catch (error) {
    // Not in slides mode
  }
  
  // Get document info if requested
  if (includeDocument) {
    try {
      const docInfo = await getDocumentInfo();
      context.document = docInfo;
    } catch (error) {
      context.document = { error: error.message };
    }
  }
  
  return context;
}

async function extractSlideContent(params) {
  const { slideId, includeImages = false, outputFormat = "structured", textOnly = false } = params || {};
  
  if (!slideId) {
    throw new Error("Missing slideId parameter");
  }
  
  const content = {
    slideId,
    text: [],
    tables: [],
    images: [],
    metadata: {}
  };
  
  // Get slide info
  const slideInfo = await getNodeInfo(slideId);
  if (!slideInfo || slideInfo.type !== "SLIDE") {
    throw new Error("Node is not a slide");
  }
  
  content.metadata = {
    name: slideInfo.name || "",
    width: slideInfo.width || 0,
    height: slideInfo.height || 0
  };
  
  // Scan for content nodes
  const scanOptions = {
    maxDepth: -1,
    nodeTypes: textOnly ? ["TEXT"] : ["TEXT", "TABLE", "RECTANGLE", "FRAME"],
    timeout: 10000,
    returnPartialOnTimeout: true
  };
  
  const scanResult = await scanNodesWithOptions({
    nodeId: slideId,
    options: scanOptions
  });
  
  if (scanResult.nodes && scanResult.nodes.length > 0) {
    for (const node of scanResult.nodes) {
      if (node.type === "TEXT" && node.characters) {
        content.text.push({
          id: node.id,
          text: node.characters,
          name: node.name
        });
      } else if (node.type === "TABLE" && !textOnly) {
        // Get table data
        try {
          const tableData = await getTableData({ 
            tableId: node.id, 
            outputFormat: "array",
            includeHeaders: true 
          });
          if (tableData.data) {
            content.tables.push({
              id: node.id,
              name: node.name,
              data: tableData.data
            });
          }
        } catch (error) {
          // Continue with partial results
        }
      } else if ((node.type === "RECTANGLE" || node.type === "FRAME") && includeImages && !textOnly) {
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
  
  // Format output
  if (outputFormat === "raw") {
    const rawText = content.text.map(t => t.text).join("\n\n");
    const tableText = content.tables.map(t => 
      `Table: ${t.name}\n${formatTableAsText(t.data)}`
    ).join("\n\n");
    
    return [rawText, tableText].filter(Boolean).join("\n\n");
  } else {
    return content;
  }
}

async function getPresentationSummary(params) {
  const { includeOutline = true, maxTextPreview = 200, includeEmptySlides = false } = params || {};
  
  // Get document info
  const docInfo = await getDocumentInfo();
  
  // Check for slide-related nodes in multiple ways
  // In Slides mode, structure can vary - look for SLIDES, SLIDE_GRID, or direct SLIDE children
  let slidesNode = docInfo.children?.find(child => 
    child.type === "SLIDES" || child.type === "SLIDE_GRID"
  );
  
  // If no SLIDES/SLIDE_GRID node, check if we have SLIDE nodes directly
  let slides = [];
  
  if (slidesNode && slidesNode.children) {
    // Get slides from container node
    slides = slidesNode.children.filter(child => child.type === "SLIDE");
  } else {
    // Try to find slides directly in children or deeper
    const allChildren = docInfo.children || [];
    
    // Check direct children for slides
    slides = allChildren.filter(child => child.type === "SLIDE");
    
    // If no direct slides, check one level deeper (common in Slides mode)
    if (slides.length === 0) {
      for (const child of allChildren) {
        if (child.children) {
          const childSlides = child.children.filter(grandchild => grandchild.type === "SLIDE");
          if (childSlides.length > 0) {
            slides = childSlides;
            slidesNode = child; // Use the parent as the container
            break;
          }
        }
      }
    }
  }
  
  if (slides.length === 0) {
    throw new Error("No slides found. This tool requires a Figma Slides presentation.");
  }
  
  // Try to get current slide ID, but don't fail if not available
  let focusedSlideId = null;
  try {
    const contextInfo = await getCurrentContext({});
    if (contextInfo.focusedSlide && contextInfo.focusedSlide.currentSlideId) {
      focusedSlideId = contextInfo.focusedSlide.currentSlideId;
    }
  } catch (e) {
    // Ignore error - focusedSlideId will remain null
  }
  
  const summary = {
    presentationName: docInfo.name || "Untitled Presentation",
    totalSlides: slides.length,
    focusedSlideId: focusedSlideId,
    slides: []
  };
  
  // Process each slide
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const slideInfo = {
      index: i + 1,
      id: slide.id,
      title: slide.name || `Slide ${i + 1}`,
      hasContent: false
    };
    
    if (includeOutline) {
      try {
        // Get content from slide
        const scanResult = await scanNodesWithOptions({
          nodeId: slide.id,
          options: {
            maxDepth: 3,
            nodeTypes: ["TEXT"],
            timeout: 2000,
            returnPartialOnTimeout: true
          }
        });
        
        if (scanResult.nodes && scanResult.nodes.length > 0) {
          slideInfo.hasContent = true;
          
          const textNodes = scanResult.nodes.filter(node => node.characters);
          const allText = textNodes.map(node => node.characters).join(" ");
          
          if (allText.trim()) {
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
            
            if (slideInfo.keyPoints.length === 0) {
              const preview = allText.substring(0, maxTextPreview).trim();
              if (preview) {
                slideInfo.textPreview = preview + (allText.length > maxTextPreview ? "..." : "");
              }
            }
            
            slideInfo.contentStats = {
              textNodes: textNodes.length,
              totalCharacters: allText.length
            };
          }
        }
      } catch (error) {
        slideInfo.scanError = true;
      }
    }
    
    if (slideInfo.hasContent || includeEmptySlides) {
      summary.slides.push(slideInfo);
    }
  }
  
  // Generate executive summary
  if (includeOutline) {
    const slidesWithContent = summary.slides.filter(s => s.hasContent);
    summary.executiveSummary = {
      slidesWithContent: slidesWithContent.length,
      emptySlides: slides.length - slidesWithContent.length,
      averageContentPerSlide: slidesWithContent.length > 0 
        ? Math.round(slidesWithContent.reduce((sum, slide) => 
            sum + (slide.contentStats?.totalCharacters || 0), 0) / slidesWithContent.length)
        : 0
    };
  }
  
  return summary;
}

async function getTableData(params) {
  const { tableId, outputFormat = "array", includeHeaders = true, headerRow = 0, cleanEmptyCells = true } = params || {};
  
  if (!tableId) {
    throw new Error("Missing tableId parameter");
  }
  
  // Get table node
  const tableInfo = await getNodeInfo(tableId);
  
  if (!tableInfo || tableInfo.type !== "TABLE") {
    throw new Error("Node is not a table");
  }
  
  // Extract cells
  const cells = tableInfo.children?.filter(child => child.type === "TABLE_CELL") || [];
  
  if (cells.length === 0) {
    return {
      metadata: {
        tableId,
        tableName: tableInfo.name || "Untitled Table",
        rows: 0,
        columns: 0,
        totalCells: 0,
        format: outputFormat
      },
      data: outputFormat === "csv" ? "" : []
    };
  }
  
  // Parse cells into 2D array
  const rows = [];
  let maxRow = 0;
  let maxCol = 0;
  
  cells.forEach((cell, index) => {
    // Try to parse cell ID for row/column info
    // Format might be: T[tableId];[row];[col] or just use index-based positioning
    const match = cell.id.match(/T[^;]+;(\d+);(\d+)/);
    
    let row, col;
    
    if (match) {
      // Use parsed row/col if available
      row = parseInt(match[1]);
      col = parseInt(match[2]);
    } else {
      // Fallback: use index-based positioning
      // This assumes cells are in row-major order
      const numCols = Math.ceil(Math.sqrt(cells.length)); // Estimate columns
      row = Math.floor(index / numCols);
      col = index % numCols;
    }
    
    maxRow = Math.max(maxRow, row);
    maxCol = Math.max(maxCol, col);
    
    if (!rows[row]) rows[row] = [];
    
    // Get cell text - might be in cell.characters or cell.text.characters
    let cellText = "";
    if (cell.characters !== undefined) {
      cellText = cell.characters;
    } else if (cell.text && cell.text.characters !== undefined) {
      cellText = cell.text.characters;
    }
    
    rows[row][col] = cellText;
  });
  
  // Fill missing cells
  for (let r = 0; r <= maxRow; r++) {
    if (!rows[r]) rows[r] = [];
    for (let c = 0; c <= maxCol; c++) {
      if (rows[r][c] === undefined) rows[r][c] = "";
    }
  }
  
  // Clean empty rows
  let finalRows = rows.filter(row => row && row.some(cell => cell !== ""));
  
  // Process based on output format
  let result;
  let headers = [];
  
  if (includeHeaders && finalRows.length > headerRow) {
    headers = finalRows[headerRow].map((h, idx) => String(h).trim() || `Column${idx + 1}`);
  }
  
  switch (outputFormat) {
    case "object":
      if (includeHeaders && headers.length > 0) {
        const dataRows = finalRows.slice(headerRow + 1);
        result = dataRows.map(row => {
          const obj = {};
          headers.forEach((header, index) => {
            const value = row[index] || "";
            if (!cleanEmptyCells || value !== "") {
              obj[header] = value;
            }
          });
          return obj;
        });
      } else {
        result = finalRows.map(row => {
          const obj = {};
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
      const csvRows = finalRows.map(row => 
        row.map(cell => {
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
      result = cleanEmptyCells 
        ? finalRows.map(row => row.filter(cell => cell !== ""))
        : finalRows;
      break;
  }
  
  return {
    metadata: {
      tableId,
      tableName: tableInfo.name || "Untitled Table",
      rows: finalRows.length,
      columns: maxCol + 1,
      totalCells: cells.length,
      format: outputFormat
    },
    headers: includeHeaders ? headers : undefined,
    data: result
  };
}

// Helper function for table formatting
function formatTableAsText(data) {
  if (!data || data.length === 0) return "";
  
  return data.map(row => 
    row.map(cell => cell || "").join(" | ")
  ).join("\n");
}

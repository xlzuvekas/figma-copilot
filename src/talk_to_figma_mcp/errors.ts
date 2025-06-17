/**
 * Standardized error format for Figma MCP operations
 */

export interface FigmaError {
  code: string;
  message: string;
  nodeId?: string;
  suggestions?: string[];
}

export interface ErrorResponse {
  error: FigmaError;
  partialResults?: any[];
}

/**
 * Common error codes used across the Figma MCP server
 */
export const ErrorCodes = {
  // Connection errors
  CONNECTION_FAILED: 'CONNECTION_FAILED',
  WEBSOCKET_NOT_CONNECTED: 'WEBSOCKET_NOT_CONNECTED',
  CHANNEL_NOT_JOINED: 'CHANNEL_NOT_JOINED',
  
  // Tool errors
  TOOL_DEPRECATED: 'TOOL_DEPRECATED',
  TOOL_NOT_FOUND: 'TOOL_NOT_FOUND',
  
  // Node operation errors
  NODE_NOT_FOUND: 'NODE_NOT_FOUND',
  NODE_ACCESS_DENIED: 'NODE_ACCESS_DENIED',
  INVALID_NODE_TYPE: 'INVALID_NODE_TYPE',
  
  // Operation errors
  OPERATION_TIMEOUT: 'OPERATION_TIMEOUT',
  OPERATION_FAILED: 'OPERATION_FAILED',
  INVALID_PARAMETERS: 'INVALID_PARAMETERS',
  
  // Batch operation errors
  BATCH_PARTIAL_FAILURE: 'BATCH_PARTIAL_FAILURE',
  BATCH_SIZE_EXCEEDED: 'BATCH_SIZE_EXCEEDED',
  
  // Font/text errors
  MIXED_FONTS_ERROR: 'MIXED_FONTS_ERROR',
  FONT_NOT_AVAILABLE: 'FONT_NOT_AVAILABLE',
  
  // Component errors
  COMPONENT_NOT_FOUND: 'COMPONENT_NOT_FOUND',
  INVALID_COMPONENT_OVERRIDE: 'INVALID_COMPONENT_OVERRIDE',
  
  // Generic errors
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];

/**
 * Helper function to create a standardized error response
 */
export function createErrorResponse(
  code: ErrorCode,
  message: string,
  options?: {
    nodeId?: string;
    suggestions?: string[];
    partialResults?: any[];
  }
): ErrorResponse {
  const error: FigmaError = {
    code,
    message,
  };

  if (options?.nodeId) {
    error.nodeId = options.nodeId;
  }

  if (options?.suggestions && options.suggestions.length > 0) {
    error.suggestions = options.suggestions;
  }

  const response: ErrorResponse = { error };

  if (options?.partialResults && options.partialResults.length > 0) {
    response.partialResults = options.partialResults;
  }

  return response;
}

/**
 * Common error response factories for frequently used errors
 */
export const CommonErrors = {
  connectionFailed: (details?: string) =>
    createErrorResponse(
      ErrorCodes.CONNECTION_FAILED,
      `Failed to connect to Figma${details ? `: ${details}` : ''}`,
      {
        suggestions: [
          'Ensure the Figma plugin is running',
          'Check if the WebSocket server is accessible',
          'Verify you have joined the correct channel',
        ],
      }
    ),

  nodeNotFound: (nodeId: string) =>
    createErrorResponse(
      ErrorCodes.NODE_NOT_FOUND,
      `Node with ID "${nodeId}" not found`,
      {
        nodeId,
        suggestions: [
          'Verify the node ID is correct',
          'Check if the node still exists in the document',
          'Ensure you have access to the node',
        ],
      }
    ),

  invalidParameters: (details: string) =>
    createErrorResponse(
      ErrorCodes.INVALID_PARAMETERS,
      `Invalid parameters: ${details}`,
      {
        suggestions: [
          'Check the parameter types and values',
          'Refer to the tool documentation for correct usage',
        ],
      }
    ),

  operationTimeout: (operation: string, nodeId?: string) =>
    createErrorResponse(
      ErrorCodes.OPERATION_TIMEOUT,
      `Operation "${operation}" timed out`,
      {
        nodeId,
        suggestions: [
          'Try with a smaller selection or fewer nodes',
          'Use options like maxDepth or timeout to limit scope',
          'Consider breaking the operation into smaller chunks',
        ],
      }
    ),

  mixedFonts: (nodeId: string) =>
    createErrorResponse(
      ErrorCodes.MIXED_FONTS_ERROR,
      'Text node contains mixed fonts',
      {
        nodeId,
        suggestions: [
          'Use update_text_preserve_formatting to maintain text styles',
          'Apply consistent font family before updating',
          'Use set_multiple_text_contents_with_styles for styled updates',
        ],
      }
    ),
};

/**
 * Format error for MCP tool response
 */
export function formatErrorForMCP(error: ErrorResponse): {
  content: Array<{ type: 'text'; text: string }>;
  isError: boolean;
} {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(error, null, 2),
      },
    ],
    isError: true,
  };
}
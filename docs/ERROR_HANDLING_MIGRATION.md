# Error Handling Migration Guide

This document provides guidance for migrating error handling in the Figma MCP server to use the standardized error format.

## Overview

The standardized error format is defined in `src/talk_to_figma_mcp/errors.ts` and provides:
- Consistent error structure across all tools
- Error codes for categorization
- Helpful suggestions for users
- Support for partial results in batch operations

## Migration Pattern

### Before (Old Pattern)
```typescript
} catch (error) {
  return {
    content: [
      {
        type: "text",
        text: `Error doing something: ${error instanceof Error ? error.message : String(error)}`,
      },
    ],
  };
}
```

### After (New Pattern)
```typescript
} catch (error) {
  const errorResponse = createErrorResponse(
    ErrorCodes.OPERATION_FAILED,
    `Failed to do something: ${error instanceof Error ? error.message : String(error)}`,
    {
      nodeId,  // if applicable
      suggestions: [
        'Helpful suggestion 1',
        'Helpful suggestion 2'
      ]
    }
  );
  return formatErrorForMCP(errorResponse);
}
```

## Error Code Selection Guide

Choose the appropriate error code based on the type of failure:

- `CONNECTION_FAILED`: WebSocket or network connection issues
- `WEBSOCKET_NOT_CONNECTED`: WebSocket is not open
- `CHANNEL_NOT_JOINED`: User hasn't joined a channel yet
- `NODE_NOT_FOUND`: Specified node ID doesn't exist
- `NODE_ACCESS_DENIED`: User lacks permission to access node
- `INVALID_NODE_TYPE`: Operation not supported for node type
- `OPERATION_TIMEOUT`: Operation exceeded time limit
- `OPERATION_FAILED`: General operation failure
- `INVALID_PARAMETERS`: Invalid input parameters
- `MIXED_FONTS_ERROR`: Text node has mixed font styles
- `COMPONENT_NOT_FOUND`: Component key doesn't exist
- `BATCH_PARTIAL_FAILURE`: Some items in batch failed

## Common Error Helpers

Use the pre-defined error helpers when applicable:

```typescript
// Connection issues
CommonErrors.connectionFailed("Optional details")

// Node not found
CommonErrors.nodeNotFound(nodeId)

// Invalid parameters
CommonErrors.invalidParameters("Parameter X must be positive")

// Operation timeout
CommonErrors.operationTimeout("operation_name", nodeId)

// Mixed fonts
CommonErrors.mixedFonts(nodeId)
```

## Special Cases

### 1. Node Not Found Detection
```typescript
const errorMessage = error instanceof Error ? error.message : String(error);
if (errorMessage.includes('not found') || errorMessage.includes('does not exist')) {
  return formatErrorForMCP(CommonErrors.nodeNotFound(nodeId));
}
```

### 2. Batch Operations with Partial Results
```typescript
const errorResponse = createErrorResponse(
  ErrorCodes.BATCH_PARTIAL_FAILURE,
  `Processed ${succeeded} of ${total} items`,
  {
    partialResults: successfulItems,
    suggestions: ['Review failed items and retry']
  }
);
```

### 3. Timeout Errors
Already handled in `sendCommandToFigma` function, but for custom timeouts:
```typescript
return formatErrorForMCP(CommonErrors.operationTimeout(operationName, nodeId));
```

## Implementation Status

### Completed Tools
- ✅ scan_text_nodes (deprecated with proper error)
- ✅ get_document_info
- ✅ get_selection
- ✅ get_node_info
- ✅ sendCommandToFigma (connection and timeout errors)

### Remaining Tools
The following tools still need error handling updates:
- read_my_design
- get_multiple_nodes_info
- create_rectangle, create_frame, create_text
- set_text_content, set_multiple_text_contents
- scan_nodes_by_types, scan_nodes_with_options
- All style/color tools
- Component tools
- Annotation tools
- Slide/presentation tools
- Batch operation tools

## Testing Error Handling

After updating error handling:

1. Test with invalid node IDs
2. Test with disconnected WebSocket
3. Test with missing channel
4. Test timeout scenarios
5. Verify error messages are helpful
6. Check suggestions are actionable

## Next Steps

1. Continue updating remaining tools incrementally
2. Add error handling tests
3. Update client documentation with error codes
4. Consider adding error recovery mechanisms
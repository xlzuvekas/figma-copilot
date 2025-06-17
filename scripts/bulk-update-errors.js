#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverPath = path.join(__dirname, '../src/talk_to_figma_mcp/server.ts');
let content = fs.readFileSync(serverPath, 'utf-8');

// Common error patterns to replace
const replacements = [
  // Fill color
  {
    old: `    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: \`Error setting fill color: \${error instanceof Error ? error.message : String(error)
              }\`,
          },
        ],
      };
    }`,
    new: `    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        \`Failed to set fill color: \${error instanceof Error ? error.message : String(error)}\`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Ensure color values are between 0 and 1',
            'Check if the node supports fill colors'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }`
  },
  // Stroke color
  {
    old: `    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: \`Error setting stroke color: \${error instanceof Error ? error.message : String(error)
              }\`,
          },
        ],
      };
    }`,
    new: `    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        \`Failed to set stroke color: \${error instanceof Error ? error.message : String(error)}\`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Ensure color values are between 0 and 1',
            'Check if the node supports stroke colors'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }`
  },
  // Move node
  {
    old: `    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: \`Error moving node: \${error instanceof Error ? error.message : String(error)
              }\`,
          },
        ],
      };
    }`,
    new: `    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        \`Failed to move node: \${error instanceof Error ? error.message : String(error)}\`,
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
    }`
  },
  // Clone node
  {
    old: `    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: \`Error cloning node: \${error instanceof Error ? error.message : String(error)
              }\`,
          },
        ],
      };
    }`,
    new: `    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        \`Failed to clone node: \${error instanceof Error ? error.message : String(error)}\`,
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
    }`
  },
  // Resize node
  {
    old: `    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: \`Error resizing node: \${error instanceof Error ? error.message : String(error)
              }\`,
          },
        ],
      };
    }`,
    new: `    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        \`Failed to resize node: \${error instanceof Error ? error.message : String(error)}\`,
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
    }`
  },
  // Delete node
  {
    old: `    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: \`Error deleting node: \${error instanceof Error ? error.message : String(error)
              }\`,
          },
        ],
      };
    }`,
    new: `    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('not found')) {
        return formatErrorForMCP(CommonErrors.nodeNotFound(nodeId));
      }
      
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        \`Failed to delete node: \${errorMessage}\`,
        {
          nodeId,
          suggestions: [
            'Verify the node ID is valid',
            'Ensure you have permission to delete the node',
            'Check if the node is locked'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }`
  }
];

// Apply replacements
let updatedCount = 0;
replacements.forEach(({ old, new: newText }) => {
  const before = content.length;
  content = content.replace(old, newText);
  if (content.length !== before) {
    updatedCount++;
    console.log(`✓ Updated error handler #${updatedCount}`);
  }
});

// Write back
fs.writeFileSync(serverPath, content);
console.log(`\nUpdated ${updatedCount} error handlers.`);
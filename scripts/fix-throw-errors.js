#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverPath = path.join(__dirname, '../src/talk_to_figma_mcp/server.ts');
let content = fs.readFileSync(serverPath, 'utf-8');

// Pattern to match throw new Error statements in catch blocks
const throwPattern = /} catch \(error\) \{\s*throw new Error\(`Failed to ([^:]+): \$\{error instanceof Error \? error\.message : String\(error\)\}`\);\s*\}/g;

let count = 0;
content = content.replace(throwPattern, (match, operation) => {
  count++;
  const suggestions = getSuggestions(operation);
  
  return `} catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.OPERATION_FAILED,
        \`Failed to ${operation}: \${error instanceof Error ? error.message : String(error)}\`,
        {
          suggestions: ${JSON.stringify(suggestions, null, 12).replace(/"/g, '\\"').replace(/\n/g, '\n          ')}
        }
      );
      return formatErrorForMCP(errorResponse);
    }`;
});

function getSuggestions(operation) {
  // Generate contextual suggestions based on operation
  if (operation.includes('slide')) {
    return [
      'Ensure you are in a Figma Slides document',
      'Verify the slide or slide-related IDs are valid',
      'Check you have appropriate permissions'
    ];
  } else if (operation.includes('text') || operation.includes('font')) {
    return [
      'Verify the node is a text node',
      'Check text formatting parameters are valid',
      'Ensure the node exists and is editable'
    ];
  } else if (operation.includes('component')) {
    return [
      'Verify the component ID or key is valid',
      'Check if the component exists in the document',
      'Ensure you have access to the component'
    ];
  } else if (operation.includes('batch') || operation.includes('multiple')) {
    return [
      'Verify all IDs in the batch are valid',
      'Check if some operations may have partially succeeded',
      'Ensure you have permissions for all items'
    ];
  } else {
    return [
      'Verify the parameters are valid',
      'Check if you have the necessary permissions',
      'Ensure the operation is supported in the current context'
    ];
  }
}

fs.writeFileSync(serverPath, content);
console.log(`Updated ${count} throw statements to use standardized error format.`);
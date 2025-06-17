#!/usr/bin/env node

/**
 * Semi-automated script to find error handlers and suggest standardized replacements
 * This script DOES NOT modify files - it only analyzes and suggests
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverPath = path.join(__dirname, '../src/talk_to_figma_mcp/server.ts');
const content = fs.readFileSync(serverPath, 'utf-8');
const lines = content.split('\n');

// Track current context
let currentTool = '';
let toolStartLine = 0;

// Find all error handlers that need updating
const findings = [];

// Pattern to match old error format
const oldErrorPattern = /text:\s*`Error\s+(\w+)\s+([^:]+):\s*\$\{error\s+instanceof\s+Error/;

// Generate contextual suggestions based on operation
function generateSuggestions(tool, action, target) {
  const suggestions = [];
  
  // Common patterns
  if (action === 'creating' || action === 'create') {
    suggestions.push('Check if the parent node ID is valid');
    suggestions.push('Ensure coordinates and dimensions are valid numbers');
    suggestions.push('Verify you have edit access to the document');
  } else if (action === 'getting' || action === 'get') {
    suggestions.push('Verify the node ID is correct');
    suggestions.push('Check if the node exists in the current document');
    suggestions.push('Ensure you have read access');
  } else if (action === 'setting' || action === 'set') {
    suggestions.push('Verify the node ID is valid');
    suggestions.push('Check parameter values are in the correct format');
    suggestions.push('Ensure the node supports this operation');
  } else if (action === 'deleting' || action === 'delete') {
    suggestions.push('Verify the node ID is valid');
    suggestions.push('Ensure you have permission to delete the node');
    suggestions.push('Check if the node is locked or protected');
  } else if (action === 'moving' || action === 'move') {
    suggestions.push('Verify the node ID is valid');
    suggestions.push('Ensure x and y coordinates are valid numbers');
    suggestions.push('Check if the node is locked or constrained');
  } else if (action === 'cloning' || action === 'clone') {
    suggestions.push('Verify the source node ID is valid');
    suggestions.push('Ensure you have permission to duplicate the node');
    suggestions.push('Check if the node type supports cloning');
  } else if (action === 'resizing' || action === 'resize') {
    suggestions.push('Verify the node ID is valid');
    suggestions.push('Ensure width and height are positive numbers');
    suggestions.push('Check if the node has size constraints');
  } else if (action === 'exporting' || action === 'export') {
    suggestions.push('Verify the node ID is valid');
    suggestions.push('Check if the node is visible and not empty');
    suggestions.push('Ensure the export format is supported (PNG, JPG, SVG, PDF)');
  } else if (action === 'scanning' || action === 'scan') {
    suggestions.push('Verify the parent node ID is valid');
    suggestions.push('Check if the scan criteria are properly specified');
    suggestions.push('Consider using pagination for large node trees');
  } else if (action === 'joining' || action === 'join') {
    suggestions.push('Ensure the channel name is valid');
    suggestions.push('Check if the WebSocket connection is active');
    suggestions.push('Verify the Figma plugin is running');
  }
  
  // Tool-specific suggestions
  if (tool.includes('text')) {
    suggestions.push('Use update_text_preserve_formatting to maintain text styles');
  } else if (tool.includes('component')) {
    suggestions.push('Check if the component exists in the document');
  } else if (tool.includes('multiple') || tool.includes('batch')) {
    suggestions.push('Some operations may have partially succeeded');
  } else if (tool.includes('color')) {
    suggestions.push('Ensure color values are between 0 and 1');
  } else if (tool.includes('export')) {
    suggestions.push('Ensure the export format is supported (PNG, JPG, SVG, PDF)');
  }
  
  return suggestions.slice(0, 3); // Limit to 3 suggestions
}

// Fix grammar for error messages
function fixGrammar(action, target) {
  // Convert "getting" to "get", "creating" to "create", etc.
  const actionMap = {
    'getting': 'get',
    'creating': 'create',
    'setting': 'set',
    'deleting': 'delete',
    'moving': 'move',
    'cloning': 'clone',
    'resizing': 'resize',
    'exporting': 'export',
    'scanning': 'scan',
    'copying': 'copy',
    'joining': 'join'
  };
  
  const fixedAction = actionMap[action] || action;
  return `${fixedAction} ${target}`;
}

// Determine appropriate error code
function getErrorCode(tool, action, target) {
  if (tool.includes('deprecated')) return 'TOOL_DEPRECATED';
  if (tool.includes('component')) return 'COMPONENT_NOT_FOUND';
  if (action === 'deleting' && tool.includes('multiple')) return 'BATCH_PARTIAL_FAILURE';
  if (target.includes('node') && action === 'getting') return 'NODE_NOT_FOUND';
  return 'OPERATION_FAILED';
}

// Generate the replacement code snippet
function generateReplacementCode(tool, action, target, nodeParam) {
  const suggestions = generateSuggestions(tool, action, target);
  const errorCode = getErrorCode(tool, action, target);
  const hasNodeId = nodeParam && nodeParam !== '';
  
  let code = `    } catch (error) {
      const errorResponse = createErrorResponse(
        ErrorCodes.${errorCode},
        \`Failed to ${fixGrammar(action, target)}: \${error instanceof Error ? error.message : String(error)}\`,
        {`;
  
  if (hasNodeId) {
    code += `
          nodeId,`;
  }
  
  code += `
          suggestions: [
            '${suggestions.join("',\n            '")}'
          ]
        }
      );
      return formatErrorForMCP(errorResponse);
    }`;
  
  return code;
}

// Analyze the file
lines.forEach((line, index) => {
  // Track current tool
  if (line.includes('server.tool(')) {
    const nextLine = lines[index + 1];
    if (nextLine) {
      const toolMatch = nextLine.match(/"([^"]+)"/);
      if (toolMatch) {
        currentTool = toolMatch[1];
        toolStartLine = index + 1;
      }
    }
  }
  
  // Find old error patterns
  const match = line.match(oldErrorPattern);
  if (match) {
    const [, action, target] = match;
    
    // Look for the catch block start (go backwards)
    let catchLine = index;
    for (let i = index; i >= Math.max(0, index - 10); i--) {
      if (lines[i].includes('} catch (error) {')) {
        catchLine = i;
        break;
      }
    }
    
    // Look for the catch block end (go forwards)
    let endCatchLine = index;
    let braceCount = 0;
    for (let i = catchLine; i < Math.min(lines.length, catchLine + 20); i++) {
      if (lines[i].includes('{')) braceCount++;
      if (lines[i].includes('}')) {
        braceCount--;
        if (braceCount === 0) {
          endCatchLine = i;
          break;
        }
      }
    }
    
    // Check if this handler already uses the new format
    const blockText = lines.slice(catchLine, endCatchLine + 1).join('\n');
    if (blockText.includes('createErrorResponse') || blockText.includes('formatErrorForMCP')) {
      return; // Skip - already updated
    }
    
    // Check if the tool has a nodeId parameter
    let hasNodeId = false;
    for (let i = toolStartLine; i < catchLine; i++) {
      if (lines[i].includes('nodeId:') || lines[i].includes('({ nodeId')) {
        hasNodeId = true;
        break;
      }
    }
    
    findings.push({
      tool: currentTool,
      line: index + 1,
      catchStartLine: catchLine + 1,
      catchEndLine: endCatchLine + 1,
      action: action.toLowerCase(),
      target: target.trim(),
      hasNodeId,
      oldBlock: lines.slice(catchLine, endCatchLine + 1).join('\n'),
      suggestedCode: generateReplacementCode(
        currentTool, 
        action.toLowerCase(), 
        target.trim(),
        hasNodeId
      )
    });
  }
});

// Output findings
console.log(`Found ${findings.length} error handlers that need updating:\n`);

// Group by similarity
const grouped = {
  creation: findings.filter(f => f.action.includes('creat')),
  retrieval: findings.filter(f => f.action.includes('get') || f.action.includes('read')),
  modification: findings.filter(f => f.action.includes('set') || f.action.includes('updat')),
  deletion: findings.filter(f => f.action.includes('delet')),
  other: findings.filter(f => 
    !f.action.includes('creat') && 
    !f.action.includes('get') && 
    !f.action.includes('read') &&
    !f.action.includes('set') && 
    !f.action.includes('updat') &&
    !f.action.includes('delet')
  )
};

// Output by category
Object.entries(grouped).forEach(([category, items]) => {
  if (items.length === 0) return;
  
  console.log(`\n=== ${category.toUpperCase()} OPERATIONS (${items.length} tools) ===\n`);
  
  items.forEach((item, index) => {
    console.log(`${index + 1}. ${item.tool} (line ${item.catchStartLine}-${item.catchEndLine})`);
    console.log(`   Action: ${item.action} ${item.target}`);
    console.log(`   Has nodeId: ${item.hasNodeId}`);
    console.log('\n   Current code:');
    console.log('   ' + item.oldBlock.split('\n').slice(0, 3).join('\n   ') + '...');
    console.log('\n   Suggested replacement:');
    console.log(item.suggestedCode);
    console.log('\n   ---\n');
  });
});

// Summary
console.log('\nSUMMARY:');
console.log(`Total error handlers to update: ${findings.length}`);
console.log(`- Creation operations: ${grouped.creation.length}`);
console.log(`- Retrieval operations: ${grouped.retrieval.length}`);
console.log(`- Modification operations: ${grouped.modification.length}`);
console.log(`- Deletion operations: ${grouped.deletion.length}`);
console.log(`- Other operations: ${grouped.other.length}`);

// Save to file for easier review
const outputPath = path.join(__dirname, 'error-suggestions.txt');
const outputContent = findings.map(f => 
  `Tool: ${f.tool}\nLine: ${f.catchStartLine}-${f.catchEndLine}\nSuggested:\n${f.suggestedCode}\n\n`
).join('---\n');

fs.writeFileSync(outputPath, outputContent);
console.log(`\nDetailed suggestions saved to: ${outputPath}`);
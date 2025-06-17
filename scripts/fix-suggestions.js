#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverPath = path.join(__dirname, '../src/talk_to_figma_mcp/server.ts');
let content = fs.readFileSync(serverPath, 'utf-8');

// Fix the incorrectly formatted suggestions arrays
const fixes = [
  {
    old: `          suggestions: [
                    \"Verify the node is a text node\",
                    \"Check text formatting parameters are valid\",
                    \"Ensure the node exists and is editable\"
          ]`,
    new: `          suggestions: [
            'Verify the node is a text node',
            'Check text formatting parameters are valid',
            'Ensure the node exists and is editable'
          ]`
  },
  {
    old: `          suggestions: [
                    \"Verify the parameters are valid\",
                    \"Check if you have the necessary permissions\",
                    \"Ensure the operation is supported in the current context\"
          ]`,
    new: `          suggestions: [
            'Verify the parameters are valid',
            'Check if you have the necessary permissions',
            'Ensure the operation is supported in the current context'
          ]`
  },
  {
    old: `          suggestions: [
                    \"Verify the component ID or key is valid\",
                    \"Check if the component exists in the document\",
                    \"Ensure you have access to the component\"
          ]`,
    new: `          suggestions: [
            'Verify the component ID or key is valid',
            'Check if the component exists in the document',
            'Ensure you have access to the component'
          ]`
  },
  {
    old: `          suggestions: [
                    \"Verify all IDs in the batch are valid\",
                    \"Check if some operations may have partially succeeded\",
                    \"Ensure you have permissions for all items\"
          ]`,
    new: `          suggestions: [
            'Verify all IDs in the batch are valid',
            'Check if some operations may have partially succeeded',
            'Ensure you have permissions for all items'
          ]`
  }
];

// Apply all fixes
fixes.forEach(({ old, new: newStr }) => {
  while (content.includes(old)) {
    content = content.replace(old, newStr);
  }
});

// Also fix any remaining escaped quotes in suggestions arrays
content = content.replace(/\"(Verify|Check|Ensure|Try|Use|Some|Make|Confirm)[^\"]+\"/g, (match) => {
  return "'" + match.slice(1, -1) + "'";
});

fs.writeFileSync(serverPath, content);
console.log('Fixed all malformed suggestions arrays.');
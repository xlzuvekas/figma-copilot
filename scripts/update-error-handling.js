#!/usr/bin/env node

/**
 * Script to help update error handling in server.ts
 * This identifies all catch blocks that need updating
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverPath = path.join(__dirname, '../src/talk_to_figma_mcp/server.ts');
const content = fs.readFileSync(serverPath, 'utf-8');

// Find all error patterns that need updating
const patterns = [
  /Error (creating|getting|setting|updating|deleting|scanning|exporting|executing|cloning|moving|resizing) [^:]+:/g,
  /Failed to [^:]+:/g
];

const lines = content.split('\n');
const errorLocations = [];

lines.forEach((line, index) => {
  patterns.forEach(pattern => {
    if (pattern.test(line) && !line.includes('createErrorResponse') && !line.includes('formatErrorForMCP')) {
      // Find the tool name by looking backwards
      let toolName = 'unknown';
      for (let i = index; i >= Math.max(0, index - 50); i--) {
        const match = lines[i].match(/server\.tool\(\s*"([^"]+)"/);
        if (match) {
          toolName = match[1];
          break;
        }
      }
      
      errorLocations.push({
        line: index + 1,
        content: line.trim(),
        toolName
      });
    }
  });
});

console.log(`Found ${errorLocations.length} error handlers that need updating:\n`);

// Group by tool category
const categories = {
  creation: [],
  text: [],
  property: [],
  component: [],
  batch: [],
  slide: [],
  other: []
};

errorLocations.forEach(loc => {
  if (loc.toolName.includes('create_')) categories.creation.push(loc);
  else if (loc.toolName.includes('text') || loc.toolName.includes('font')) categories.text.push(loc);
  else if (loc.toolName.includes('set_') || loc.toolName.includes('move_') || loc.toolName.includes('resize_')) categories.property.push(loc);
  else if (loc.toolName.includes('component') || loc.toolName.includes('style')) categories.component.push(loc);
  else if (loc.toolName.includes('multiple') || loc.toolName.includes('batch')) categories.batch.push(loc);
  else if (loc.toolName.includes('slide')) categories.slide.push(loc);
  else categories.other.push(loc);
});

Object.entries(categories).forEach(([category, locations]) => {
  if (locations.length > 0) {
    console.log(`\n${category.toUpperCase()} (${locations.length} tools):`);
    locations.forEach(loc => {
      console.log(`  Line ${loc.line}: ${loc.toolName} - ${loc.content.substring(0, 60)}...`);
    });
  }
});

console.log('\nTools already updated (have createErrorResponse or formatErrorForMCP):');
const updatedCount = (content.match(/createErrorResponse|formatErrorForMCP/g) || []).length;
console.log(`  ${updatedCount} occurrences found`);
# Changelog v0.3.2

## 🎉 Major Enhancements

### Text Formatting Preservation (Critical Fix)

**Problem Solved**: All text updates previously lost formatting (bold, italic, colors, fonts), requiring manual reapplication.

**New Tools**:
- `update_text_preserve_formatting` - Updates text while preserving all character formatting
- `smart_text_replace` - Find/replace that keeps formatting on unchanged text
- `set_multiple_text_contents_with_styles` - Batch update text with formatting in one call

### Performance Improvements

**Batch Operations** (50-90% faster):
- `clone_multiple_nodes` - Clone to multiple positions in one call
- `get_multiple_nodes_info` - Bulk read node information  
- `set_multiple_nodes_property` - Update properties on multiple nodes
- `execute_batch` - Run multiple commands in one round-trip

**Enhanced Scanning**:
- `scan_nodes_with_options` - Fixes timeout issues with depth control and partial results

**Monitoring**:
- `get_connection_status` - Check connection health

### Developer Experience

**New Prompts**:
- `batch_operations_guide` - Best practices for bulk operations
- `error_recovery_guide` - Solutions for common errors
- `text_formatting_guide` - Text update strategies

**Better Error Messages**:
- Specific, actionable error messages
- Suggestions for common issues
- Context about document size and operation details

## 📊 Performance Metrics

Based on real production usage:

| Operation | v0.3.1 | v0.3.2 | Improvement |
|-----------|--------|--------|-------------|
| Clone 20 nodes | 50s | 5s | 90% faster |
| Update 112 text nodes | 15 min | 30s | 96% faster |
| Scan large document | Timeout | 3s | No timeouts |
| Text update + formatting | 2 calls | 1 call | 50% fewer calls |

## 🔧 Technical Details

### Implementation
- ~850 lines added to Figma plugin (code.js)
- 9 new MCP tool definitions
- Full TypeScript support
- Backward compatible

### Key Features
- Character-level formatting preservation
- Progress tracking for long operations
- Automatic retry with exponential backoff
- Partial results on timeout
- Chunk processing for large batches

## 🚀 Example Usage

### Preserve Formatting
```javascript
// Old way - loses formatting
set_text_content({nodeId: "123", text: "New Text"})

// New way - preserves formatting
update_text_preserve_formatting({
  nodeId: "123",
  newText: "New Text",
  preserveFormattingStrategy: "stretch"
})
```

### Batch Operations
```javascript
// Clone to 20 positions at once
clone_multiple_nodes({
  sourceNodeId: "template",
  positions: [
    {x: 41, y: 3267},
    {x: 41, y: 3709},
    // ... 18 more
  ]
})
```

### Smart Replace
```javascript
// Update template placeholders
smart_text_replace({
  nodeId: "123",
  replacements: [
    {find: "{TITLE}", replace: "Q4 Report"},
    {find: "{DATE}", replace: "2024"}
  ]
})
```

## 📚 Documentation

- [Batch Operations Guide](docs/BATCH_OPERATIONS.md)
- [Enhanced Text Operations Guide](docs/ENHANCED_TEXT_OPERATIONS.md)
- [Text Styling Guide](docs/TEXT_STYLING.md)

## 🙏 Credits

This release addresses critical issues discovered during real-world production use, particularly the creation of bulk infographics with consistent formatting. Special thanks to users who provided detailed feedback and usage logs.
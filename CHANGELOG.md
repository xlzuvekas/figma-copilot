# Changelog

All notable changes to this project will be documented in this file.

## [0.4.0] - 2025-01-17

### 🚀 Major Performance and API Improvements

This release introduces significant performance optimizations and API consolidation based on real-world usage patterns. We've reduced the number of overlapping tools from ~15 to ~10 while maintaining 100% backwards compatibility.

### ✨ New Features

- **Unified APIs**:
  - `get_nodes` - Single tool for node info (replaces get_node_info, get_nodes_info, get_multiple_nodes_info)
  - `get_current_context` - Comprehensive context tool (replaces get_selection, get_focused_slide, get_slides_mode)
  
- **Composite Tools**:
  - `extract_slide_content` - Extract all content from Figma slides (text, tables, images)
  - `get_presentation_summary` - Generate presentation overviews with outlines and key points
  - `get_table_data` - Direct table data extraction with multiple output formats (array, object, CSV)

### 🔧 Improvements

- **Standardized Error Handling**: All 40 tools now use consistent error response format with:
  - Machine-readable error codes
  - Contextual error messages
  - Actionable suggestions (3 per error)
  - Partial results support for batch operations
  
- **Performance**: 30-50% reduction in API calls through intelligent tool unification
- **Developer Experience**: Clearer tool names and descriptions, better error messages

### 🗑️ Deprecations

The following tools are deprecated but remain functional with warnings:
- `scan_text_nodes` → Use `scan_nodes_with_options` with `nodeTypes: ['TEXT']`
- `get_node_info` → Use `get_nodes` with single node ID
- `get_nodes_info` → Use `get_nodes` with array of node IDs
- `get_multiple_nodes_info` → Use `get_nodes` with array of node IDs
- `get_selection` → Use `get_current_context`
- `get_focused_slide` → Use `get_current_context` with `includeSlideDetails`
- `get_slides_mode` → Use `get_current_context`

### 📝 Documentation

- Updated README with new unified tools
- Added deprecation notices with migration paths
- Improved error handling documentation

### 🐛 Bug Fixes

- Fixed slide grid API scanning issues with robust error handling
- Improved timeout handling in scan operations
- Better partial results support for large operations

## [0.3.4] - 2025-01-17

### Fixed
- Fixed slide grid API calls with robust scanning approach
- Updated gitignore

## [0.3.3] - 2025-01-17

### Added
- Documentation guides for installation, usage, and development

## [0.3.2] - 2025-01-16

### Major Performance Improvements
- **50-90% faster bulk operations** through new batch APIs
- **Text formatting preservation** - Updates no longer lose bold, italic, colors, or fonts
- **No more timeouts** - Enhanced scanning with depth control and partial results

### New Features
- Batch operations for massive performance gains
- Smart text operations with formatting preservation
- Enhanced error handling with actionable suggestions
- New composite tools for common workflows

## Previous Versions
See git history for earlier changes.
# Changelog v0.3.4

## 🐛 Bug Fixes

### Fixed Slide Grid API Issues

**Problems Solved**: 
- `get_slide_grid` returned empty results despite slides existing in Figma Slides presentations
- `get_node_info` failed with "cannot read property 'type' of null" for SLIDE_GRID nodes

**Solutions Implemented**:

### 1. Robust Slide Grid Scanning
- Replaced broken `figma.getSlideGrid()` API with proven scanning approach
- Uses `findAll()` to locate SLIDE and SLIDE_ROW nodes directly
- Builds grid structure from parent-child relationships
- Handles orphaned slides gracefully with automatic row grouping
- Provides comprehensive metadata including row info and orphan counts

### 2. Special Node Type Handling
- Added special handling for SLIDE_GRID node type (e.g., "0:3")
- Returns helpful error messages with alternative tool suggestions
- Gracefully handles inaccessible special node types
- Provides actionable guidance when nodes can't be accessed directly

## 📊 Improvements

### Better Developer Experience
- Clear error messages guide developers to appropriate alternative tools
- Consistent fallback strategies for unreliable Figma APIs
- Enhanced metadata in responses for better debugging

### Example Usage

**Get Slide Grid (Now Working)**:
```javascript
// Returns actual slide data instead of empty array
get_slide_grid()
// Result: {
//   grid: [[{id: "1:189", name: "1", ...}], ...],
//   totalSlides: 33,
//   rows: 6,
//   slideRows: [...],
//   method: "scanning"
// }
```

**Get Node Info (Now Handles Special Types)**:
```javascript
// Gracefully handles SLIDE_GRID nodes
get_node_info({nodeId: "0:3"})
// Result: {
//   id: "0:3",
//   type: "SLIDE_GRID",
//   message: "SLIDE_GRID nodes cannot be accessed directly...",
//   alternativeTools: ["scan_nodes_by_types", "get_slide_grid", "get_document_info"]
// }
```

## 🔧 Technical Details

### Changes
- Updated `getSlideGrid()` function in Figma plugin
- Enhanced `getNodeInfo()` function with special node handling
- ~100 lines of code improvements
- Maintains backward compatibility

### Key Features
- Scanning-based approach for reliable slide detection
- Parent-child relationship mapping for accurate grid structure
- Orphaned slide detection and grouping
- Helpful error messages with tool recommendations

## 📚 Notes

This release fixes critical issues discovered when working with Figma Slides presentations, ensuring reliable access to slide structures and proper error handling for special node types.
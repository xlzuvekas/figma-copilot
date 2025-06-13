# Figma Slides Coordinate System Analysis

## Key Findings

### 1. Slide Layout Constants (from code.js lines 1002-1008)
```javascript
const SLIDE_WIDTH = 1920;
const SLIDE_HEIGHT = 1080;
const HORIZONTAL_SPACING = 240;
const VERTICAL_SPACING = 240;
const INITIAL_X = 240;
const INITIAL_Y = 240;
```

### 2. Current Implementation Issues

#### createShapeWithText function (lines 1428-1540)
- Takes x, y coordinates as parameters
- Directly sets `shapeWithText.x = x;` and `shapeWithText.y = y;`
- No special handling for slides vs regular pages
- No coordinate transformation based on parent

#### Problem Manifestation
When creating elements on slides:
- Slide 1: Elements appear at expected coordinates
- Slide 2: Y-coordinate offset of ~10,000+ pixels
- Slide 3: Y-coordinate offset of ~20,000+ pixels
- Pattern: Each slide adds approximately (SLIDE_HEIGHT + VERTICAL_SPACING) = 1320 pixels

### 3. Root Cause Analysis (from FIGMA_SLIDES_API_FIX_PLAN.md)

The issue is that:
1. **Slides use absolute page coordinates** - Each slide is positioned at increasing Y coordinates in the document
2. **No coordinate transformation** - When creating elements with x,y coordinates, they're positioned relative to the document origin (0,0), not the slide origin
3. **Expected behavior mismatch** - Users expect (0,0) to be the top-left of the slide, not the document

From the fix plan:
```
Slides use absolute page coordinates, and when elements are created on specific slides, 
the coordinates need to be adjusted based on the slide's position in the grid.
```

### 4. Slide Positioning Pattern

Based on the code analysis:
- Slide 1: x=240, y=240
- Slide 2: x=240, y=1560 (240 + 1080 + 240)
- Slide 3: x=240, y=2880 (1560 + 1080 + 240)
- Pattern: y = INITIAL_Y + row * (SLIDE_HEIGHT + VERTICAL_SPACING)

### 5. Similar Functions Affected
- `createText` (if it exists)
- `createTable` (lines 1542+)
- `createGif` (likely has same issue)
- Any function that creates elements with x,y coordinates

## Recommended Solution (from FIGMA_SLIDES_API_FIX_PLAN.md)

The fix plan proposes helper functions for coordinate conversion:

```javascript
// Helper function to convert local slide coordinates to absolute page coordinates
function toAbsoluteCoordinates(slideId, localX, localY) {
  const slide = figma.getNodeById(slideId);
  if (!slide || slide.type !== 'SLIDE') {
    throw new Error(`Invalid slide ID: ${slideId}`);
  }
  
  return {
    x: slide.x + localX,
    y: slide.y + localY
  };
}

// Helper function to convert absolute page coordinates to local slide coordinates
function toLocalCoordinates(slideId, absoluteX, absoluteY) {
  const slide = figma.getNodeById(slideId);
  if (!slide || slide.type !== 'SLIDE') {
    throw new Error(`Invalid slide ID: ${slideId}`);
  }
  
  return {
    x: absoluteX - slide.x,
    y: absoluteY - slide.y
  };
}
```

## Implementation Approach

The fix involves:
1. **Adding a slideId parameter** to creation functions
2. **Detecting the target slide** if slideId not provided (use focused slide or parent)
3. **Converting coordinates** from local (slide-relative) to absolute (document-relative)
4. **Returning both coordinate sets** in the response for clarity

Example implementation pattern:
```javascript
// Handle coordinate conversion for slides
if (figma.editorType === "slides" && slideId) {
  const absolute = toAbsoluteCoordinates(slideId, x, y);
  shapeWithText.x = absolute.x;
  shapeWithText.y = absolute.y;
} else if (figma.editorType === "slides" && !slideId && !parentId) {
  // If no slide specified, try to find the focused slide
  const focusedSlide = figma.currentPage.focusedSlide;
  if (focusedSlide) {
    const absolute = toAbsoluteCoordinates(focusedSlide.id, x, y);
    shapeWithText.x = absolute.x;
    shapeWithText.y = absolute.y;
  }
}
```

## Testing Strategy

1. Create elements on different slides with same local coordinates
2. Verify elements appear at same position relative to their slide
3. Test with slideId parameter, parentId parameter, and auto-detection
4. Verify returned coordinates include both local and absolute values
# Figma Copilot

A Model Context Protocol (MCP) server that enables AI assistants to interact with Figma designs programmatically. Compatible with any MCP client including Cursor, Claude Desktop, and other MCP-enabled applications. Features advanced text handling, batch operations, and comprehensive design automation capabilities.

## Credits

This project is based on [cursor-talk-to-figma-mcp](https://github.com/sonnylazuardi/cursor-talk-to-figma-mcp) by Sonny Lazuardi.

## Disclaimer

This is an independent project and is not affiliated with, officially maintained, authorized, endorsed, or sponsored by Figma, Inc. All product and company names are trademarks™ or registered® trademarks of their respective holders.

## Key Enhancements

### v0.3.2 (Latest)
- **Text Formatting Preservation** - Text updates no longer lose formatting (bold, italic, colors, fonts). See [Enhanced Text Operations Guide](docs/ENHANCED_TEXT_OPERATIONS.md).
- **Batch Operations** - 50-90% performance improvement for bulk operations. See [Batch Operations Guide](docs/BATCH_OPERATIONS.md).
- **Enhanced Error Handling** - Specific, actionable error messages with suggestions
- **Timeout Solutions** - New scanning options with depth control and partial results
- **Smart Text Operations** - Find/replace with formatting preservation

### Previous Enhancements
- **Fixed "Cannot unwrap symbol" error** when working with mixed fonts. See [Font Handling Documentation](docs/FONT_HANDLING.md).
- **Improved font loading** with `getRangeAllFontNames()` API
- **Better error handling** with `Promise.allSettled()` for font loading
- **Safe value returns** to avoid serialization issues
- **Enhanced logging** for debugging font issues


## Project Structure

- `src/talk_to_figma_mcp/` - TypeScript MCP server for Figma integration
- `src/figma_copilot_plugin/` - Figma plugin for communicating with MCP clients
- `src/socket.ts` - WebSocket server that facilitates communication between the MCP server and Figma plugin

## Get Started

1. Install Bun if you haven't already:

```bash
curl -fsSL https://bun.sh/install | bash
```

2. Run setup to configure MCP

```bash
bun setup
```

3. Start the Websocket server

```bash
bun socket
```

4. MCP server

```bash
bunx figma-copilot
```

5. **NEW** Install Figma plugin from [Figma community page](https://www.figma.com/community/plugin/1485687494525374295/cursor-talk-to-figma-mcp-plugin) or [install locally](#figma-plugin)

## Quick Start Guide

Video tutorials coming soon!

## Design Automation Example

**Bulk text content replacement**

Thanks to [@dusskapark](https://github.com/dusskapark) for contributing the bulk text replacement feature.

**Instance Override Propagation**
Another contribution from [@dusskapark](https://github.com/dusskapark)
Propagate component instance overrides from a source instance to multiple target instances with a single command. This feature dramatically reduces repetitive design work when working with component instances that need similar customizations.

## Performance Improvements (v0.3.2)

Based on real production usage with bulk infographic creation:

| Operation | Before v0.3.2 | After v0.3.2 | Improvement |
|-----------|---------------|--------------|-------------|
| Clone 20 nodes | 50 seconds | 5 seconds | 90% faster |
| Update 112 text nodes | 15 minutes | 30 seconds | 96% faster |
| Scan large document | Timeout after 30s | 3 seconds | No timeouts |
| Text + formatting update | 2 separate calls | 1 combined call | 50% fewer API calls |

## Manual Setup and Installation

### MCP Server: Integration with MCP Clients

Add the server to your MCP client configuration. For example, in Cursor's `~/.cursor/mcp.json` or Claude Desktop's configuration:

```json
{
  "mcpServers": {
    "figma-copilot": {
      "command": "bunx",
      "args": ["figma-copilot@latest"]
    }
  }
}
```

### WebSocket Server

Start the WebSocket server:

```bash
bun socket
```

### Figma Plugin

1. In Figma, go to Plugins > Development > New Plugin
2. Choose "Link existing plugin"
3. Select the `src/figma_copilot_plugin/manifest.json` file
4. The plugin should now be available in your Figma development plugins

## Windows + WSL Guide

1. Install bun via powershell

```bash
powershell -c "irm bun.sh/install.ps1|iex"
```

2. Uncomment the hostname `0.0.0.0` in `src/socket.ts`

```typescript
// uncomment this to allow connections in windows wsl
hostname: "0.0.0.0",
```

3. Start the websocket

```bash
bun socket
```

## Usage

1. Start the WebSocket server
2. Install the MCP server in your MCP client
3. Open Figma and run the Figma Copilot Plugin
4. Connect the plugin to the WebSocket server by joining a channel using `join_channel`
5. Use your MCP client to communicate with Figma using the MCP tools

## MCP Tools

The MCP server provides the following tools for interacting with Figma:

### Document & Selection

- `get_document_info` - Get information about the current Figma document
- `get_selection` - Get information about the current selection
- `read_my_design` - Get detailed node information about the current selection without parameters
- `get_node_info` - Get detailed information about a specific node
- `get_nodes_info` - Get detailed information about multiple nodes by providing an array of node IDs

### Annotations

- `get_annotations` - Get all annotations in the current document or specific node
- `set_annotation` - Create or update an annotation with markdown support
- `set_multiple_annotations` - Batch create/update multiple annotations efficiently
- `scan_nodes_by_types` - Scan for nodes with specific types (useful for finding annotation targets)

### Prototyping & Connections

- `get_reactions` - Get all prototype reactions from nodes with visual highlight animation
- `set_default_connector` - Set a copied FigJam connector as the default connector style for creating connections (must be set before creating connections)
- `create_connections` - Create FigJam connector lines between nodes, based on prototype flows or custom mapping

### Creating Elements

- `create_rectangle` - Create a new rectangle with position, size, and optional name
- `create_frame` - Create a new frame with position, size, and optional name
- `create_text` - Create a new text node with customizable font properties

### Text Operations

#### Basic Text Operations
- ~~`scan_text_nodes`~~ - **DEPRECATED**: Use `scan_nodes_with_options` with `nodeTypes: ['TEXT']` instead
- `scan_nodes_with_options` - Enhanced scanning with depth control, timeout handling, and partial results
- `set_text_content` - Set the text content of a single text node (Note: loses formatting)
- `set_multiple_text_contents` - Batch update multiple text nodes efficiently (Note: loses formatting)

#### Text with Formatting Preservation (v0.3.2)
See [Enhanced Text Operations Guide](docs/ENHANCED_TEXT_OPERATIONS.md) for an overview.
- `update_text_preserve_formatting` - Update text while preserving all character formatting (bold, italic, colors, fonts)
- `smart_text_replace` - Find and replace text while preserving formatting of unchanged portions
- `set_multiple_text_contents_with_styles` - Batch update text with formatting in a single operation

#### Text Styling
See [Text Styling Guide](docs/TEXT_STYLING.md) for detailed usage.
- `set_text_style_range` - Apply text styling (bold, italic, underline, strikethrough) to specific character ranges
- `get_text_style_range` - Get text styling for a specific range
- `set_text_decoration_range` - Set advanced text decoration properties
- `get_text_decoration_range` - Get text decoration properties for a range
- `set_range_font` - Change font family and style for a text range
- `set_range_font_size` - Change font size for a text range
- `set_range_fills` - Set text color for a specific range
- `get_styled_text_segments` - Get detailed information about text segments and their properties
- `set_component_description` - Set component description using Markdown
- `get_component_description` - Get component description in Markdown format
- `normalize_markdown` - Normalize Markdown text to Figma's supported subset

### Auto Layout & Spacing

- `set_layout_mode` - Set the layout mode and wrap behavior of a frame (NONE, HORIZONTAL, VERTICAL)
- `set_padding` - Set padding values for an auto-layout frame (top, right, bottom, left)
- `set_axis_align` - Set primary and counter axis alignment for auto-layout frames
- `set_layout_sizing` - Set horizontal and vertical sizing modes for auto-layout frames (FIXED, HUG, FILL)
- `set_item_spacing` - Set distance between children in an auto-layout frame

### Styling

- `set_fill_color` - Set the fill color of a node (RGBA)
- `set_stroke_color` - Set the stroke color and weight of a node
- `set_corner_radius` - Set the corner radius of a node with optional per-corner control

### Layout & Organization

- `move_node` - Move a node to a new position
- `resize_node` - Resize a node with new dimensions
- `delete_node` - Delete a node
- `delete_multiple_nodes` - Delete multiple nodes at once efficiently
- `clone_node` - Create a copy of an existing node with optional position offset

### Batch Operations (v0.3.2)
See [Batch Operations Guide](docs/BATCH_OPERATIONS.md) for best practices.

- `clone_multiple_nodes` - Clone a node to multiple positions in one operation (50-90% faster than individual clones)
- `get_multiple_nodes_info` - Get information for multiple nodes in a single request
- `set_multiple_nodes_property` - Set the same property value on multiple nodes at once
- `execute_batch` - Execute multiple different commands in sequence with a single round-trip
- `get_connection_status` - Get current connection status and statistics

### Components & Styles

- `get_styles` - Get information about local styles
- `get_local_components` - Get information about local components
- `create_component_instance` - Create an instance of a component
- `get_instance_overrides` - Extract override properties from a selected component instance
- `set_instance_overrides` - Apply extracted overrides to target instances

### Export & Advanced

- `export_node_as_image` - Export a node as an image (PNG, JPG, SVG, or PDF) - limited support on image currently returning base64 as text

### Connection Management

- `join_channel` - Join a specific channel to communicate with Figma

### MCP Prompts

The MCP server includes several helper prompts to guide you through complex design tasks:

- `design_strategy` - Best practices for working with Figma designs
- `read_design_strategy` - Best practices for reading Figma designs
- `text_replacement_strategy` - Systematic approach for replacing text in Figma designs
- `annotation_conversion_strategy` - Strategy for converting manual annotations to Figma's native annotations
- `swap_overrides_instances` - Strategy for transferring overrides between component instances in Figma
- `reaction_to_connector_strategy` - Strategy for converting Figma prototype reactions to connector lines using the output of 'get_reactions', and guiding the use 'create_connections' in sequence
- `batch_operations_guide` - Best practices for efficient bulk operations in Figma (v0.3.2)
- `error_recovery_guide` - How to handle common errors and timeouts in Figma operations (v0.3.2)
- `text_formatting_guide` - Best practices for updating text while preserving formatting (v0.3.2)

## Development

### Building the Figma Plugin

1. Navigate to the Figma plugin directory:

   ```
   cd src/figma_copilot_plugin
   ```

2. Edit code.js and ui.html

## Best Practices

When working with the Figma MCP:

1. Always join a channel before sending commands
2. Get document overview using `get_document_info` first
3. Check current selection with `get_selection` before modifications
4. Use appropriate creation tools based on needs:
   - `create_frame` for containers
   - `create_rectangle` for basic shapes
   - `create_text` for text elements
5. Verify changes using `get_node_info`
6. Use component instances when possible for consistency
7. Handle errors appropriately as all commands can throw exceptions
8. For large designs:
   - Use `scan_nodes_with_options` with appropriate timeout and depth settings
   - Monitor progress through WebSocket updates
   - Implement appropriate error handling
9. For text operations:
   - Use batch operations when possible
   - Consider structural relationships
   - Verify changes with targeted exports
10. For converting legacy annotations:
    - Scan text nodes to identify numbered markers and descriptions
    - Use `scan_nodes_by_types` to find UI elements that annotations refer to
    - Match markers with their target elements using path, name, or proximity
    - Categorize annotations appropriately with `get_annotations`
    - Create native annotations with `set_multiple_annotations` in batches
    - Verify all annotations are properly linked to their targets
    - Delete legacy annotation nodes after successful conversion
11. Visualize prototype noodles as FigJam connectors:

- Use `get_reactions` to extract prototype flows,
- set a default connector with `set_default_connector`,
- and generate connector lines with `create_connections` for clear visual flow mapping.

## Troubleshooting

### Font Issues

If you encounter "Cannot unwrap symbol" errors when updating text, this is likely due to mixed fonts in text nodes. See [Font Handling Documentation](docs/FONT_HANDLING.md) for details on how the plugin handles mixed fonts and available strategies.

### Timeout Issues

For large documents that cause timeouts, use `scan_nodes_with_options` with depth limiting and partial results. See [Batch Operations Guide](docs/BATCH_OPERATIONS.md) for optimization strategies.

## Documentation

- [Batch Operations Guide](docs/BATCH_OPERATIONS.md) - Learn how to use batch operations for massive performance gains
- [Enhanced Text Operations Guide](docs/ENHANCED_TEXT_OPERATIONS.md) - Preserve formatting while updating text
- [Text Styling Guide](docs/TEXT_STYLING.md) - Apply and manage text styles
- [Font Handling Documentation](docs/FONT_HANDLING.md) - Handle mixed fonts and font loading strategies
- [Changelog v0.3.2](CHANGELOG_v0.3.2.md) - Latest release notes

## License

MIT

# Claude Desktop + Figma MCP Integration

This guide explains how to use the Figma Copilot MCP with Claude Desktop.

## Prerequisites

1. **Claude Desktop** - Install from [claude.ai/download](https://claude.ai/download)
2. **Bun** - JavaScript runtime for the WebSocket server
3. **Figma Desktop App** or web version

## Installation Steps

### 1. Install Bun

```bash
# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# Windows
powershell -c "irm bun.sh/install.ps1|iex"
```

### 2. Clone and Setup the Repository

```bash
git clone https://github.com/xlzuvekas/figma-copilot.git
cd figma-copilot
bun install
```

### 3. Configure Claude Desktop

Claude Desktop looks for MCP server configurations in:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

Create or edit this file and add:

```json
{
  "mcpServers": {
    "talk-to-figma": {
      "command": "bunx",
      "args": ["figma-copilot@latest"],
      "env": {}
    }
  }
}
```

**Alternative: Use local development version**
```json
{
  "mcpServers": {
    "talk-to-figma": {
      "command": "bun",
      "args": ["run", "/path/to/figma-copilot/dist/server.js"],
      "env": {}
    }
  }
}
```

### 4. Start the WebSocket Server

The WebSocket server must be running for the MCP server to communicate with Figma:

```bash
cd figma-copilot
bun socket
```

You should see: `WebSocket server running on port 3055`

### 5. Install the Figma Plugin

**Option A: From Figma Community (Recommended)**
1. Visit [Figma Community Plugin Page](https://www.figma.com/community/plugin/1485687494525374295/cursor-talk-to-figma-mcp-plugin)
2. Click "Try it out" to install

**Option B: Local Development**
1. Open Figma Desktop
2. Go to Menu → Plugins → Development → New Plugin
3. Choose "Link existing plugin"
4. Navigate to `figma-copilot/src/figma_copilot_plugin/`
5. Select `manifest.json`

### 6. Restart Claude Desktop

After adding the configuration, completely quit and restart Claude Desktop to load the MCP server.

## Usage

### 1. Start WebSocket Server
```bash
bun socket
```

### 2. Open Figma and Run the Plugin
- In Figma: Plugins → Development → Cursor MCP Plugin
- The plugin UI will open

### 3. Connect to a Channel in Claude Desktop
In Claude Desktop, type:
```
Use the join_channel tool to connect to channel "figma-design"
```

### 4. Run the Same Command in Figma Plugin
In the Figma plugin UI, you'll see a similar interface. Make sure both Claude and Figma are connected to the same channel.

### 5. Start Using Figma Tools
Now you can use any of the available tools:

```
Get information about the current Figma document
```

```
Read the current selection in Figma
```

```
Create a red rectangle at position (100, 100) with size 200x150
```

## Available Tools

The MCP server provides 40+ tools including:

- `get_document_info` - Get current document information
- `get_selection` - Get current selection details
- `read_my_design` - Read detailed info about selected elements
- `create_rectangle`, `create_frame`, `create_text` - Create new elements
- `set_text_content`, `set_multiple_text_contents` - Update text
- `set_fill_color`, `set_stroke_color` - Style elements
- `set_layout_mode`, `set_padding`, `set_item_spacing` - Configure auto-layout
- And many more...

## Troubleshooting

### MCP Server Not Appearing in Claude
1. Ensure the config file is in the correct location
2. Check the JSON syntax is valid
3. Completely quit Claude Desktop (not just close window) and restart

### WebSocket Connection Issues
1. Make sure the WebSocket server is running (`bun socket`)
2. Check Windows Firewall isn't blocking port 3055
3. For WSL users, ensure `hostname: "0.0.0.0"` is uncommented in `src/socket.ts`

### Figma Plugin Not Connecting
1. Ensure both Claude and Figma plugin are using the same channel name
2. Check browser console for errors (if using Figma web)
3. Try refreshing the plugin

### Commands Not Working
1. Verify you've joined a channel first
2. Check the WebSocket server terminal for error messages
3. Ensure you have proper selection in Figma when needed

## Windows + WSL Specific Setup

If running the WebSocket server in WSL:

1. Edit `src/socket.ts` and uncomment line 42:
```typescript
hostname: "0.0.0.0",
```

2. You may need to configure Windows Firewall to allow connections on port 3055

3. Use the WSL IP address when configuring connections if needed

## Development

To modify the MCP server:

1. Edit files in `src/talk_to_figma_mcp/`
2. Build with `bun run build`
3. Update Claude Desktop config to use local build:
```json
{
  "mcpServers": {
    "talk-to-figma": {
      "command": "bun",
      "args": ["run", "/absolute/path/to/dist/server.js"],
      "env": {}
    }
  }
}
```

## Tips

1. Always join a channel before trying other commands
2. Use `get_document_info` to understand the document structure
3. Use `get_selection` to see what's currently selected
4. The WebSocket server must remain running during your session
5. You can have multiple Claude Desktop conversations using different channels

## Support

- Report issues at: https://github.com/xlzuvekas/figma-copilot/issues
- MCP Documentation: https://modelcontextprotocol.org
- Claude Desktop Help: https://support.anthropic.com
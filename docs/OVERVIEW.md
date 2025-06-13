# Project Overview

This repository contains three key pieces that work together to let a Model Context Protocol (MCP) client automate your Figma designs.

## Components

### MCP server
- **Location:** `src/talk_to_figma_mcp/server.ts`
- Provides 40+ MCP tools for reading and modifying Figma documents.
- Communicates with the Figma plugin through the WebSocket server.

### WebSocket server
- **Location:** `src/socket.ts`
- Lightweight server built with Bun that relays messages between the MCP server and the Figma plugin.

### Figma plugin
- **Location:** `src/figma_copilot_plugin/`
- Allows Figma to send and receive commands via WebSocket.
- Install from the Figma Community page or link the plugin locally for development.

## Quick Setup
The easiest way to get started is to follow these steps (summarised from `README_CLAUDE_DESKTOP.md`):

1. **Install Bun**
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```
2. **Clone and install dependencies**
   ```bash
   git clone https://github.com/xlzuvekas/figma-copilot.git
   cd figma-copilot
   bun install
   ```
3. **Configure Claude Desktop** – create `claude_desktop_config.json` in the appropriate config directory and add:
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
4. **Start the WebSocket server**
   ```bash
   bun socket
   ```
5. **Install the Figma plugin** from the community page or link `src/figma_copilot_plugin/` in Figma.
6. **Restart Claude Desktop** and join a channel with the `join_channel` tool.

For automated environment setup you can run:
- `scripts/setup.sh` – installs dependencies and creates a `.cursor/mcp.json` for Cursor.
- `scripts/setup-claude-desktop.sh` – builds the project and configures Claude Desktop with the local MCP server path.

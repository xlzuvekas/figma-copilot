# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Model Context Protocol (MCP) integration that enables AI assistants (Cursor AI and Claude Desktop) to communicate with Figma for reading and modifying designs programmatically. The project consists of three main components that work together:

1. **MCP Server** (`src/talk_to_figma_mcp/server.ts`) - Implements the Model Context Protocol, provides 40+ Figma manipulation tools
2. **WebSocket Server** (`src/socket.ts`) - Message relay between MCP server and Figma plugin (port 3055)
3. **Figma Plugin** (`src/figma_copilot_plugin/`) - Runs inside Figma/FigJam to execute API commands

## Development Commands

```bash
# Initial setup - installs dependencies and configures MCP
bun setup

# Start WebSocket server (required for communication)
bun socket

# Build the TypeScript server
bun run build

# Build in watch mode for development
bun run dev

# Run the MCP server
bun start
# Or use the published version
bunx figma-copilot

# Publish to npm (maintainers only)
bun pub:release
```

## Architecture Details

### Communication Flow
1. AI assistant (Cursor/Claude) sends commands via stdio to MCP server
2. MCP server forwards commands through WebSocket to Figma plugin
3. Figma plugin executes commands using Figma API and returns results
4. Results flow back through WebSocket to MCP server to AI assistant

### Key Implementation Details

- **WebSocket Server**: Channel-based communication, broadcasts to all clients in same channel
- **MCP Server**: Stateless command execution, UUID-based request tracking, progress updates for bulk operations
- **Figma Plugin**: Direct Figma API access, handles mixed fonts in text nodes, supports batch operations

### Windows WSL Configuration
When running on Windows WSL, uncomment the hostname in `src/socket.ts`:
```typescript
hostname: "0.0.0.0",
```

## Common Development Tasks

### Adding New MCP Tools
1. Add tool definition in server.ts `listTools()` method
2. Implement handler in server.ts `callTool()` method
3. Add corresponding command handler in Figma plugin (`code.js`)

### Debugging WebSocket Communication
- Monitor WebSocket server console for connection/message logs
- Use channel-based isolation for testing multiple clients
- Check Figma plugin console for execution errors

### Working with Text Operations
- Use batch operations (`set_multiple_text_contents`) for performance
- Handle mixed fonts using strategies documented in `docs/FONT_HANDLING.md`
- Always scan before bulk updates to understand structure

### Testing Figma Plugin Changes
1. Edit `src/figma_copilot_plugin/code.js` and `ui.html`
2. Run `npm run build:plugin` to transpile modern JS to ES5 for Figma compatibility
3. Reload plugin in Figma (Plugins > Development > [Plugin Name] > Run)
4. Plugin uses `code.transpiled.js` (ES5) instead of `code.js` (ES6+)

## Important Considerations

- MCP configuration stored in `~/.cursor/mcp.json` (Cursor) or platform-specific locations (Claude Desktop)
- Figma plugin requires network access to localhost (configured in manifest.json)
- All Figma operations are synchronous within the plugin but async through WebSocket
- Progress updates use CommandProgressUpdate interface for long-running operations
- Component instance overrides use specialized interfaces for type safety
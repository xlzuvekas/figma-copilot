# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Model Context Protocol (MCP) integration that enables AI assistants (Cursor AI and Claude Desktop) to communicate with Figma for reading and modifying designs programmatically. The project consists of three main components that work together:

1. **MCP Server** (`src/talk_to_figma_mcp/server.ts`) - Implements the Model Context Protocol, provides 40+ Figma manipulation tools
2. **WebSocket Server** (`src/socket.ts`) - Message relay between MCP server and Figma plugin (port 3055)
3. **Figma Plugin** (`src/figma_copilot_plugin/`) - Runs inside Figma/FigJam to execute API commands

## Project Structure

```
cursor-talk-to-figma-mcp/
├── src/
│   ├── figma_copilot_plugin/
│   │   ├── code.js              # Main plugin logic (ES6+)
│   │   ├── code.transpiled.js   # Transpiled for Figma (ES5)
│   │   ├── ui.html              # Plugin UI
│   │   └── manifest.json        # Plugin configuration
│   ├── talk_to_figma_mcp/
│   │   └── server.ts            # MCP server implementation
│   └── socket.ts                # WebSocket relay server
├── scripts/
│   └── setup.sh                 # Initial setup script
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
└── CLAUDE.md                    # This file
```

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

## Code Style Guidelines

### TypeScript/JavaScript
- Use TypeScript for server-side code (MCP server, WebSocket server)
- Use JavaScript (ES5) for Figma plugin code due to Figma's runtime constraints
- Always include proper error handling with try-catch blocks
- Use async/await for asynchronous operations
- Prefer const over let, avoid var
- Use meaningful variable and function names

### Error Handling
- Always validate input parameters in MCP tool handlers
- Return descriptive error messages that help users understand what went wrong
- Log errors to console for debugging but don't expose internal details to users
- Handle WebSocket disconnections gracefully

### Testing Changes
- Test MCP server changes by running `bun run dev` and monitoring console output
- Test WebSocket server changes by checking connections in browser console
- Test Figma plugin changes by reloading plugin in Figma after building
- Always test error scenarios (invalid inputs, disconnections, etc.)

## Common Issues and Solutions

### WebSocket Connection Issues
- Ensure port 3055 is not in use by another process
- Check firewall settings if connection is blocked
- Verify WebSocket server is running before connecting plugin

### Figma Plugin Development
- Always transpile code to ES5 before testing in Figma
- Check Figma console for runtime errors
- Ensure manifest.json has correct permissions
- Remember that Figma plugin runs in a sandboxed environment

### MCP Tool Development
- Follow the existing pattern in server.ts for consistency
- Include comprehensive descriptions for each tool
- Validate all required parameters
- Return consistent response formats

## DO NOT Guidelines

- DO NOT modify the WebSocket port (3055) without updating all references
- DO NOT use ES6+ features in Figma plugin code without transpiling
- DO NOT expose sensitive information in error messages
- DO NOT make breaking changes to existing MCP tool interfaces
- DO NOT commit node_modules or dist directories
- DO NOT hardcode environment-specific values

## Best Practices

1. **Backward Compatibility**: Maintain compatibility with existing tool interfaces
2. **Documentation**: Update this file when adding new features or changing architecture
3. **Error Messages**: Provide actionable error messages that guide users to solutions
4. **Performance**: Use batch operations for bulk updates to improve performance
5. **Security**: Never expose internal server details or file paths in responses
6. **Testing**: Test all changes thoroughly before committing
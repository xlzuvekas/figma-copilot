#!/bin/bash

# Create .cursor directory if it doesn't exist
mkdir -p .cursor

bun install

# Create mcp.json with the current directory path
echo "{
  \"mcpServers\": {
    \"TalkToFigma\": {
      \"command\": \"bunx\",
      \"args\": [
        \"figma-copilot@latest\"
      ]
    }
  }
}" > .cursor/mcp.json 
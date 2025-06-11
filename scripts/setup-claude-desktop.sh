#!/bin/bash

# Setup script for Claude Desktop + Figma MCP

echo "🎨 Claude Desktop + Figma MCP Setup"
echo "=================================="

# Detect OS
OS="unknown"
CONFIG_DIR=""

if [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
    CONFIG_DIR="$HOME/Library/Application Support/Claude"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
    CONFIG_DIR="$HOME/.config/Claude"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" ]]; then
    OS="windows"
    CONFIG_DIR="$APPDATA/Claude"
else
    echo "❌ Unsupported operating system: $OSTYPE"
    exit 1
fi

echo "✅ Detected OS: $OS"
echo "📁 Config directory: $CONFIG_DIR"

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed. Please install it first:"
    echo "   curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

echo "✅ Bun is installed"

# Install dependencies
echo "📦 Installing dependencies..."
bun install

# Build the project
echo "🔨 Building the project..."
bun run build

# Create config directory if it doesn't exist
mkdir -p "$CONFIG_DIR"

# Get the absolute path of the current directory
CURRENT_DIR=$(pwd)

# Create Claude Desktop config
CONFIG_FILE="$CONFIG_DIR/claude_desktop_config.json"

# Check if config file exists
if [ -f "$CONFIG_FILE" ]; then
    echo "⚠️  Config file already exists at: $CONFIG_FILE"
    echo "Do you want to:"
    echo "1. Add talk-to-figma to existing config"
    echo "2. Backup existing and create new config"
    echo "3. Skip config creation"
    read -p "Choice (1/2/3): " choice
    
    case $choice in
        1)
            # Backup existing config
            cp "$CONFIG_FILE" "$CONFIG_FILE.backup"
            echo "📋 Backed up existing config to: $CONFIG_FILE.backup"
            
            # Use Node.js to merge configs
            node -e "
            const fs = require('fs');
            const configPath = '$CONFIG_FILE';
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            
            if (!config.mcpServers) {
                config.mcpServers = {};
            }
            
            config.mcpServers['talk-to-figma'] = {
                command: 'bun',
                args: ['run', '$CURRENT_DIR/dist/server.js'],
                env: {}
            };
            
            fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
            console.log('✅ Added talk-to-figma to existing config');
            "
            ;;
        2)
            mv "$CONFIG_FILE" "$CONFIG_FILE.backup"
            echo "📋 Backed up existing config to: $CONFIG_FILE.backup"
            
            cat > "$CONFIG_FILE" << EOF
{
  "mcpServers": {
    "talk-to-figma": {
      "command": "bun",
      "args": ["run", "$CURRENT_DIR/dist/server.js"],
      "env": {}
    }
  }
}
EOF
            echo "✅ Created new config file at: $CONFIG_FILE"
            ;;
        3)
            echo "⏭️  Skipping config creation"
            ;;
    esac
else
    # Create new config file
    cat > "$CONFIG_FILE" << EOF
{
  "mcpServers": {
    "talk-to-figma": {
      "command": "bun",
      "args": ["run", "$CURRENT_DIR/dist/server.js"],
      "env": {}
    }
  }
}
EOF
    echo "✅ Created config file at: $CONFIG_FILE"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Start the WebSocket server: bun socket"
echo "2. Restart Claude Desktop completely"
echo "3. Install the Figma plugin:"
echo "   - Visit: https://www.figma.com/community/plugin/1485687494525374295/"
echo "   - Or install locally from: $CURRENT_DIR/src/figma_copilot_plugin/"
echo "4. In Claude, use: join_channel tool with channel name 'figma-design'"
echo ""
echo "📖 Full instructions in: README_CLAUDE_DESKTOP.md"
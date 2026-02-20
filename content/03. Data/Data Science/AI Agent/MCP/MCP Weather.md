---
title: MCP Weather
date: 2025-04-01
draft: false
tags:
  - Agents
  - MCP
complete: true
link: https://modelcontextprotocol.io/quickstart/server
---
Claude/claude_desktop_config.json
```json
{
    "mcpServers": {        
        "weather": {
            "command": "/Users/john/.local/bin/uv",
            "args": [
                "--directory",
                "/Users/john/playground/mcp/weather",
                "run",
                "weather.py"
            ]
        }
    }
}
```


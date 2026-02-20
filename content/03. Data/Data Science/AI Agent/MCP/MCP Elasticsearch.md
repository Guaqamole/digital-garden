---
title: MCP Elasticsearch
date: 2025-04-01
draft: false
tags:
  - Agents
  - MCP
complete: true
link: https://github.com/cr7258/elasticsearch-mcp-server#
---
```json
{
  "mcpServers": {
    "elasticsearch-mcp-server": {
      "command": "/Users/john/.local/bin/uvx",
      "args": [
        "elasticsearch-mcp-server"
      ],
      "env": {
        "ELASTIC_HOST": "http://localhost:9200",
        "ELASTIC_USERNAME": "elastic",
        "ELASTIC_PASSWORD": "test123"
      }
    }
  }
}
```


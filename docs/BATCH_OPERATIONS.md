# Batch Operations Guide

## Purpose

Speed up repetitive tasks and reduce API calls by processing groups of nodes at once. Large documents often cause timeouts if handled individually.

## Recommended Tools

- `clone_multiple_nodes` - Clone a node to many positions in a single operation
- `get_multiple_nodes_info` - Retrieve details for many nodes at once
- `set_multiple_nodes_property` - Change the same property on multiple nodes
- `execute_batch` - Run a sequence of commands with a single round-trip
- `get_connection_status` - Monitor progress and current status
- Use `scan_nodes_with_options` to limit depth for huge documents

## Examples

- Cloning 20 nodes dropped from 50s to 5s using `clone_multiple_nodes`
- Updating 112 text nodes went from 15 minutes to 30s when batched
- Combining text and formatting updates into one call saves roughly 50% API calls

Refer to the performance table in the README for real metrics.

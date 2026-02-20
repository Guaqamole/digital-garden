---
title: HashMap
date: 2024-06-25
draft: false
tags:
  - CodingTest
  - DataStructure
complete: true
---
## Overview

## Skeleton
```python
class HashMap:
    def __init__(self, size=1000):
        pass

    def _hash(self, key):
        pass

    def _probe(self, index):
        pass

    def set(self, key, value):
        pass

    def get(self, key):
        pass

    def delete(self, key):
        pass

    def __str__(self):
        pass


# Usage example
if __name__ == "__main__":
    hashmap = HashMap()

    # Set key-value pairs
    hashmap.set("key1", "value1")
    hashmap.set("key2", "value2")
    hashmap.set("key3", "value3")

    # Get value by key
    print(hashmap.get("key1"))  # Output: value1
    print(hashmap.get("key2"))  # Output: value2

    # Delete a key-value pair
    hashmap.delete("key2")
    print(hashmap.get("key2"))  # Output: None

    # Print the entire hash map
    print(hashmap)  # Output: {key1: value1, key3: value3}

```

## Implementation

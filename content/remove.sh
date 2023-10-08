#!/bin/bash

# Use find command to find files
# ending with a space and '2'

find_twos() {
    find . -type f -name '*2.md*' -o -name '*2.sh*' -print0 |
    while IFS= read -r -d '' file; do
        files=$(printf '%s\n' "$file")
        echo $files
    done
}

find_twos

read -p "delete files? (y/n): " response
if [[ "$response" =~ ^[Yy]$ ]]; then
    find . -name '*2.md*' -o -name '*2.sh*'| while read LINE; do rm "$LINE" ; done
    echo "Delete Done."
else
    echo "Delete Cancelled."
fi



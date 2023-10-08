#!/bin/bash

# Use find command to find files
# ending with a space and 'number'

find_twos() {
    find . -type f -name '* .md*' -o -name '*2.sh*' -print0 |
    while IFS= read -r -d '' file; do
        files=$(printf '%s\n' "$file")
        echo $files
    done
}

find_twos

read -p "delete files? (y/n): " response
if [[ "$response" =~ ^[Yy]$ ]]; then
    find . -name '* *.csv*' -o -name '* *.json*' -o -name '* *.js*' -o -name '* *.css*' | while read LINE; do rm "$LINE" ; done
    find . -name '* 2.md*' -o -name '*.DS_Store*' | while read LINE; do rm "$LINE" ; done
    echo "$LINE ALl files Deleted."
else
    echo "Delete Cancelled."
fi

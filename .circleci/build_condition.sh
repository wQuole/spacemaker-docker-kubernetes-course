#!/bin/bash

if [[ -z $1 ]]; then
    echo "Commit range cannot be empty"
    exit 1
fi

if [[ -z $2 ]]; then
    echo "Change path cannot be empty"
    exit 1
fi

subFolders=$(echo "$2" | grep -Eo ".[^/]+" | wc -l)
output="$(git log --format="" --name-only $1 | cut -d"/" -f1-${subFolders} | sort -u | uniq | grep $2)"

if [ "$output" = $2 ]; then
    exit 0
else
    exit 1
fi
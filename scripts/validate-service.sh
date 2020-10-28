#!/usr/bin/env bash

for i in {1..5}; do
  curl localhost:3000/api-docs/ >/dev/null 2>&1
  [[ $? -eq 0 ]] && break
  sleep 5
done

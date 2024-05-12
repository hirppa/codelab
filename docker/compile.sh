#!/bin/bash

# Defife directory or source
SOURCE_DIR="/root/cpp"

# Find all .cpp files in the source directory and subdirectories
FILES=$(find $SOURCE_DIR -name "*.cpp")

# 1 000 pages (65,536 MB)
clang++ \
--target=wasm32 \
-O0 \
-nostdlib \
-I ${SOURCE_DIR}/include \
-std=c++17 \
-o /usr/local/apache2/htdocs/wasm/module.wasm \
-Wl,--initial-memory=65536000 \
${FILES}

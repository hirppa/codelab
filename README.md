# CodeLab

After a break from CodeLab read this **cheat sheet** first to refresh your memory.

- [Mission](#mission)
- [Basics](#basics)
- [WebAssembly](#webassembly)
- [WebGPU](#webgpu)

Run the container with web server and compiler:

```shell
$ docker compose up -d
```

Run the monitor script to automatically compile on changes:

```shell
$ cd bash && sh monitor.sh
```

## Mission

Create 3D engine using WebAssembly and WebGPU without libraries.

- GLTF loader

### Basics

A single bit uses the **base-2** number system, which means that each **hexadecimal** digit directly corresponds to a **4-bit** binary number. You need only two digits to represent **one byte** in hexadecimal format.

**0x** is a common **prefix** used in programming and computing to denote that the number that follows is in hexadecimal format.

Hexadecimal is a **base-16** number system, which means each **position** in a hexadecimal number represents a power of 16, much like in **base-10** number system each position in a decimal number represents a power of 10.

In the hexadecimal format, the digits 0-9 represent values zero to nine, and the letters **A-F** represent values ten to fifteen.

## WebAssembly

We are not using the C++ standard library, so we have to create even the most basic tools ourselves, including **a memory management** (similar to malloc and free), string manipulation, dynamic array support, and math functions.

### The LLVM Project

The framework which include subprojects to **compile C++ to WebAssembly**.

https://llvm.org

#### Clang the compiler

https://clang.llvm.org

#### LLD the linker

https://lld.llvm.org/WebAssembly.html

### Memory

**HEAP**, depending on the context, is either **a data structure** or **a memory region**; the latter refers to the context of memory in the WebAssembly module.

**Address** is a simple numeric value that indicates a particular byte in a memory.

**Pointer** is a variable that stores the address of another variable which is used to access and manipulate data stored in memory.

**Page** in WebAssembly memory is a 64 KiB (65 536 bytes) block of memory. The memory size is determined by amount of the pages.

### Endianness 

When writing **multi-byte** data to memory the byte order is **little endian** which means that the least significant byte is stored at the lowest memory address, and the most significant byte at the highest.

### Access memory of the WebAssembly module with C++

```cpp
// Represent values from 0 to 4294967295 (32-bit)
unsigned int getAddress(){

    int myVariable = 10;

    // Create a pointer to myVariable using &
    int* myPointer = &myVariable;

    // Write to myVariable through the pointer with *
    *myPointer = 20;

    // Get the address of the pointer
    unsigned int address = reinterpret_cast<unsigned int>(myPointer);

    // Address that contains the written value of 20
    return address;
}
```

### Generated symbols

The value of **\_\_heap\_base** is fixed at compile/link time and does not change during the execution of your program.

## WebGPU

### Using WebGPU in Linux

```shell
$ google-chrome-unstable --enable-features=Vulkan
```

### WGSL

WebGPU Shading Language (WGSL) is the shader language for the WebGPU API.

### 3D projection

The **transformation matrix** calculation maps the 3D points (x, y and z) in a scene onto a 2D plane (x and y). There are two main types of projection used in this transformation, namely **orthographic** and **perspective**.

Orthographic projection discards the z-axis and preserves the dimensions of objects, meaning objects retain the same size regardless of their distance from the view plane.

Perspective projection uses all axes to simulate how the human eye sees. Objects farther from the viewer appear smaller, thereby giving a sense of depth.

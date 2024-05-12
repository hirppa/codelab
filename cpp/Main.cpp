// IMPORTANT: WebAssembly project WITHOUT stantard library 

#include "String.h"
#include "Integer.h"
#include "Memory.h"
#include "Triangle2D.h"

/*
 * Extern "C" tells the C++ compiler to use C linkage for _start,
 * preventing name mangling to ensure the function name is recognizable
 * by external systems that do not support C++ name mangling, such as WebAssembly.
 */

extern "C" int _start(int width, int height, int seed){

    Memory::free();

    // wasm::string str = "One";
    // wasm::string str2 = "Two";
    // wasm::string str3 = "Three";

    // wasm::integer test1 = 1000000;

    int row = 0;
    int column = 0;

    int left_margin = 10;
    int bottom_margin = 10;

    for(int item = 0; item < 2961; item++){

        int size = 10;
        int x = left_margin + column * size;
        int y = bottom_margin + row * size;

        column++;

        if(column % 63 == 0){

            column = 0;
            row++;
        }

        wasm::Triangle2D(x, y, size, size);
    }

    return Memory::getHeapBase();
}

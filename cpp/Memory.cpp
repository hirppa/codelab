#include "Memory.h"

// Declare an external variable '__heap_base' which is provided by the linker.
extern int __heap_base;

char* Memory::next_pointer = reinterpret_cast<char*>(&__heap_base);

void* Memory::allocate(int size){

    // Store the current position
    char* current_block = next_pointer;

    // Move the pointer ahead by 'size' bytes
    next_pointer += size;

    // Return the original position
    return current_block;
}

void Memory::free(){

    // Manually clear memory from __heap_base to next_pointer
    for(char* p = reinterpret_cast<char*>(&__heap_base); p < next_pointer; ++p){

        *p = 0;
    }

    // Reset the next_pointer to the start of the heap
    next_pointer = reinterpret_cast<char*>(&__heap_base);
}

int Memory::getHeapBase(){

    int heap_base = reinterpret_cast<int>(&__heap_base);

    return heap_base;
}

#ifndef MEMORY_H
#define MEMORY_H

class Memory {

private:

    // Pointer to next free block
    static char* next_pointer;

public:

    void* allocate(int size);
    static void free();
    static int getHeapBase();
};

#endif

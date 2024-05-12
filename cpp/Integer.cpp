#include "Integer.h"
#include "Memory.h"

namespace wasm {

    integer::integer(int value){

        setLength(value);

        Memory memory;

        data = static_cast<int*>(memory.allocate(length + 1));

        *data = value;
    }

    void integer::setLength(int value){

        length = sizeof(value);
    }

    int integer::size(){

        return length;
    }
}

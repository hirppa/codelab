#include "String.h"
#include "Memory.h"

namespace wasm {

    string::string(const char* str){

        setLength(str);

        Memory memory;

        // Allocate memory for the entire string plus the null terminator
        data = static_cast<char*>(memory.allocate(length + 1));

        // Copy the string into the newly allocated space
        for (int i = 0; i <= length; ++i) { // include the null terminator in copying

            data[i] = str[i];
        }
    }

    void string::setLength(const char* str){

        length = 0;

        while (str[length] != '\0'){

            length++;
        }
    }

    int string::size(){

        return length;
    }
}

#include "Vertex3D.h"
#include "Memory.h"

namespace wasm {

    Vertex3D::Vertex3D(float x, float y, float z){

        Memory memory;

        int size = sizeof(float);

        float* x_pointer = static_cast<float*>(memory.allocate(size));
        float* y_pointer = static_cast<float*>(memory.allocate(size));
        float* z_pointer = static_cast<float*>(memory.allocate(size));

        *x_pointer = x;
        *y_pointer = y;
        *z_pointer = z;
    }
}

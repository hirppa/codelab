#ifndef VECTOR_H
#define VECTOR_H

namespace wasm {

    class Vector2 {

    public:

        float x, y;

        Vector2(float x, float y) : x(x), y(y){}
    };

    class Vector3 {

    public:

        float x, y, z;

        Vector3(float x, float y, float z) : x(x), y(y), z(z){}
    };
}

#endif

#ifndef TRIANGLE2D_H
#define TRIANGLE2D_H

#include "Vector.h"

namespace wasm {

    class Triangle2D {

        public:

            Triangle2D(float x, float y, float width, float height, int deg = 0);
            Vector2 rotate(Vector2 original, int deg);
    };
}

#endif

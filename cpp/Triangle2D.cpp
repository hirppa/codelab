#include "Triangle2D.h"
#include "Vertex3D.h"
#include "Math.h"
#include "Vector.h"

namespace wasm {

    Triangle2D::Triangle2D(float x, float y, float width, float height, int deg){

        int canvas_width = 640;
        int canvas_height = 480;

        float pixel_width = 2.0 / canvas_width; // 0,003125
        float pixel_height = 2.0 / canvas_height; // 0,004166667

        float x_coordinate = x * pixel_width -1.0;
        float y_coordinate = y * pixel_height -1.0;

        float new_width = width * pixel_width;
        float new_height = height * pixel_height;

        Vector2 top(x_coordinate, y_coordinate + new_height / 2.0);
        Vector2 left(x_coordinate - new_width / 2.0, y_coordinate - new_height / 2.0);
        Vector2 right(x_coordinate + new_width / 2.0, y_coordinate - new_height / 2.0);

        /*

        top = rotate(top, 90);
        left = rotate(left, 90);
        right = rotate(right, 90);

        */

        Vertex3D(top.x, top.y, 0);
        Vertex3D(left.x, left.y, 0);
        Vertex3D(right.x, right.y, 0);
    }

    Vector2 Triangle2D::rotate(Vector2 original, int degree){

        Vector2 result(0, 0);

        result.x = original.x * Math::cos(degree) - original.y * Math::sin(degree);
        result.y = original.x * Math::sin(degree) + original.y * Math::cos(degree);

        return result;
    }
}

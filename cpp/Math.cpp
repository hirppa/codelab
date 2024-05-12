#include "Math.h"

namespace wasm {

    double Math::factorial(int n){

        double result = 1;

        for (int i = 2; i <= n; ++i){

            result *= i;
        }

        return result;
    }

    double Math::pow(double base, int exp){

        // Anything to the power of 0 is 1
        if (exp == 0) return 1; 

        double result = 1;

        for (int i = 0; i < exp; ++i){
        
            result *= base;
        }

        return result;
    }

    double Math::sin(double x){

        double result = 0;

        // More terms for more accuracy
        int terms = 10; 

        for(int i = 0; i < terms; ++i){

            double term = (i % 2 == 0 ? 1 : -1) * (pow(x, 2 * i + 1) / factorial(2 * i + 1));
            result += term;
        }

        return result;
    }

    double Math::cos(double x){

        double result = 0;

        // More terms for more accuracy
        int terms = 10; 

        for(int i = 0; i < terms; ++i){

            double term = (i % 2 == 0 ? 1 : -1) * (pow(x, 2 * i) / factorial(2 * i));
            result += term;
        }

        return result;
    }
}

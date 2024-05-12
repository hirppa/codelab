#ifndef INTEGER_H
#define INTEGER_H

namespace wasm {

    class integer {

        private:

            int* data;
            int length;
            void setLength(int value);

        public:

            integer(int value);
            int size();
    };
}

#endif

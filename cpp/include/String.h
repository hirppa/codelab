#ifndef STRING_H
#define STRING_H

namespace wasm {

    class string {

        private:

            char* data;
            int length;
            void setLength(const char* str);

        public:

            string(const char* str);
            int size();
    };
}

#endif

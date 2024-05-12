FROM httpd:2.4
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf

# Update the package list then install required dependencies and clean up lists
RUN apt-get update && \
    apt-get install -y git cmake ninja-build clang lld && \
    rm -rf /var/lib/apt/lists/*

# Clone the LLVM project repository with a shallow depth
RUN git clone --depth 1 https://github.com/llvm/llvm-project.git /usr/local/llvm-project

# Set the working directory to llvm-project
WORKDIR /usr/local/llvm-project

# Configure the LLVM with Clang and LLD using package managed version of Clang and LLD as the compiler and linker
RUN cmake -S llvm -B build -G Ninja \
    -DLLVM_ENABLE_PROJECTS="clang;lld" \
    -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_INSTALL_PREFIX=/usr/local \
    -DCMAKE_C_COMPILER=clang \
    -DCMAKE_CXX_COMPILER=clang++ \
    -DLLVM_USE_LINKER=lld

# Build and install Clang and LLD
RUN cmake --build build --target install --parallel 8

# Remove the package-managed versions of clang and lld and clean up lists
RUN apt-get update && \
    apt-get remove -y clang lld && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

## Remove the source code
RUN rm -rf /usr/local/llvm-project

# Set the working directory to home
WORKDIR /root

# Copy compile.sh last to maximize the use of build cache for earlier layers
COPY ./compile.sh /root/compile.sh

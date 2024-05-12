export function CPUEngine(){

    this.module = null;
    this.memory_buffer = null;
    this.heap_base = null;

    this.getHexadecimal = function(value){

        return '0x' + value.toString(16);
    };

    this.readTextFromMemory = function(){

        const view = new Int8Array(this.memory_buffer);

        let length = 0;

        while(view[this.heap_base + length] !== 0){

            length++;
        }

        const message_view = new Uint8Array(this.memory_buffer, this.heap_base, length);
        const decoder = new TextDecoder('utf-8');
        const message = decoder.decode(message_view);

        console.log('Message:', message);
    };

    this.readVertex3D = function(){

        const vertices = new Float32Array(this.memory_buffer, this.heap_base);

        console.log('Vertices:', vertices);

        return vertices;
    };

    this.loadModule = async function(options){

        const response = await fetch('./wasm/module.wasm');
        const buffer = await response.arrayBuffer();
        const obj = await WebAssembly.instantiate(buffer);
        const exports = obj.instance.exports;

        this.module = exports;
        this.memory_buffer = exports.memory.buffer;
    }

    this.run = function(options){

        const seed = Math.floor(Math.random() * 2961 + 1);

        console.log('Seed:', seed);

        this.heap_base = this.module._start(options.width, options.height, seed);

        console.log('Memory:', this.module.memory);
        console.log('Heap base:', this.heap_base, this.getHexadecimal(this.heap_base));

        const vertices = this.readVertex3D();
        this.readTextFromMemory();

        return vertices;
    };
};

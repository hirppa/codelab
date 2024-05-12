export function GPUEngine(){

    this.device = null;
    this.fragmentFormat = window.navigator.gpu.getPreferredCanvasFormat();
    this.vertices = null;
    this.pipeline = null;
    this.vertexBuffer = null;
    this.indexBuffer = null;
    this.textureView = null;
    this.context = null;
}

GPUEngine.prototype.setContext = function(){

    const canvas = document.getElementById('webgpu-canvas');

    this.context = canvas.getContext('webgpu');

    this.context.configure({

        device: this.device,
        format: this.fragmentFormat
    });
};

GPUEngine.prototype.setVertices = function(vertices){

    // Three verticies required for x, y and z
    this.instanceCount = vertices.length / 3;

    const verticesFloat32Array = new Float32Array(vertices);

    if(this.vertexBuffer === null){

        this.vertexBuffer = this.device.createBuffer({

            size: verticesFloat32Array.byteLength,
            usage: window.GPUBufferUsage.VERTEX | window.GPUBufferUsage.COPY_DST,
            mappedAtCreation: true
        });

        const range = this.vertexBuffer.getMappedRange();

        // Write directly into GPU buffer's memory
        new Float32Array(range).set(verticesFloat32Array);

        // Writing is done make buffer accessible to the GPU again
        this.vertexBuffer.unmap();
    }

    else {
        
        const before = window.performance.now();

        this.device.queue.writeBuffer(
            this.vertexBuffer,
            0, // offset within the destination buffer
            verticesFloat32Array.buffer,
            verticesFloat32Array.byteOffset,
            verticesFloat32Array.byteLength
        );

        const after = window.performance.now();
        console.log('Set vertices:', Math.round(after - before) + ' ms');
    }
};

GPUEngine.prototype.setIndices = function(indices){

    this.indexCount = indices.length;

    this.indexBuffer = this.device.createBuffer({

      size: indices.byteLength,
      usage: window.GPUBufferUsage.INDEX | window.GPUBufferUsage.COPY_DST,
      mappedAtCreation: true
    });

    new Uint16Array(this.indexBuffer.getMappedRange()).set(indices);
    this.indexBuffer.unmap();
}

GPUEngine.prototype.render = function(vertices, indices){

    if(this.context === null){

        this.setContext();
    }

    this.setVertices(vertices);

    if(indices !== undefined){

        this.setIndices(indices);
    }

    if(this.pipeline === null){

        this.createPipeline();
    }

    this.draw(vertices);
}

import {GPUEngine} from './GPUEngine.js';

GPUEngine.prototype.draw = function(){

    const GPUCommandEncoder = this.device.createCommandEncoder();

    const GPURenderPassEncoder = GPUCommandEncoder.beginRenderPass({

        colorAttachments: [{

            view: this.context.getCurrentTexture().createView(),

            clearValue: {

                r: 0.0,
                g: 0.0,
                b: 0.0,
                a: 1.0
            },

            loadOp: 'clear',
            storeOp: 'store'
        }]
    });

    GPURenderPassEncoder.setPipeline(this.pipeline);
    GPURenderPassEncoder.setVertexBuffer(0, this.vertexBuffer);

    if(this.indexBuffer !== null){

        GPURenderPassEncoder.setIndexBuffer(this.indexBuffer, 'uint16');
        GPURenderPassEncoder.drawIndexed(this.indexCount, this.instanceCount);
    }

    else {

        GPURenderPassEncoder.draw(this.instanceCount, 1, 0, 0);
    }

    GPURenderPassEncoder.end();
    this.device.queue.submit([GPUCommandEncoder.finish()]);
}

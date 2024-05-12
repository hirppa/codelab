import {GPUEngine} from './GPUEngine.js';

GPUEngine.prototype.createPipeline = function(){

    console.log('Create pipeline');

    const pipeline = this.device.createRenderPipeline({

        layout: 'auto',

        vertex: {

            module: this.device.createShaderModule({

                code: `@vertex fn main(@location(0) position: vec3<f32>) -> @builtin(position) vec4<f32> {
                
                    return vec4<f32>(position, 1.0);
                }`
            }),

            entryPoint: 'main',

            buffers: [{
 
                arrayStride: 12, // 4 bits (float) * 3 (x, y, z) = 12

                attributes: [{

                    shaderLocation: 0,
                    offset: 0,
                    format: 'float32x2'
                }]
            }]
        },

        fragment: {

            module: this.device.createShaderModule({

                code: `@fragment fn main() -> @location(0) vec4<f32> {
                
                    return vec4<f32>(1.0, 1.0, 1.0, 1.0);
                }`
            }),

            entryPoint: 'main',

            targets: [{

                format: this.fragmentFormat
            }]
        },

        primitive: {
        
            topology: 'triangle-list' // Default
        }
    });

    this.pipeline = pipeline;
}

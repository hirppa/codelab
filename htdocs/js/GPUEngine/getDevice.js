import {GPUEngine} from './GPUEngine.js';

GPUEngine.prototype.getDevice = function(){

    return new Promise((resolve, reject) => {

        if( ! navigator.gpu){

            throw Error('WebGPU not supported');
        }

        navigator.gpu.requestAdapter().then(adapter => {

            if(adapter === null){

                throw Error('Adapter is not available');
            }

            adapter.requestDevice().then(

                device => {

                    console.log('Got new device');
                    this.device = device;
                    resolve();
                },

                error => {

                    if(error instanceof OperationError){

                        reject('Operation error when requesting device');
                    }

                    else if(error instanceof TypeError){

                        reject('Type error when requesting device');
                    }
                }
            );

        });
    });
};

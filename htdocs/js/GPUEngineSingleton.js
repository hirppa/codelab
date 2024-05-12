import {GPUEngine as Singleton} from './GPUEngine/GPUEngine.js';

// Extend GPU Engine prototype (side effect import)
import './GPUEngine/getDevice.js';
import './GPUEngine/createPipeline.js';
import './GPUEngine/draw.js';

export const GPUEngine = new Singleton();

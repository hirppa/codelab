import {GPUEngine} from './GPUEngineSingleton.js';
import {CPUEngine} from './CPUEngineSingleton.js';

const cpuRef = document.getElementById('cpu');
const gpuRef = document.getElementById('gpu');
const fpsRef = document.getElementById('fps');

GPUEngine.getDevice().then(() => {

    const options = {

        width: 640,
        height: 480
    };

    CPUEngine.loadModule().then(() => {

        function frame(){

            // Generate vertices
            const cpu_before = window.performance.now();
            const vertices = CPUEngine.run(options);
            const cpu_after = window.performance.now();

            // Render vertices
            const gpu_before = window.performance.now();
            GPUEngine.render(vertices);
            const gpu_after = window.performance.now();

            const cpu = cpu_after - cpu_before;
            const gpu = gpu_after - gpu_before;

            cpuRef.innerHTML = Math.round(cpu) + ' ms';
            gpuRef.innerHTML = Math.round(gpu) + ' ms';
            fpsRef.innerHTML = Math.round(1000 / (cpu + gpu));
        }

        setInterval(frame, 1000);
    });
});

const { Worker } = require('worker_threads');

// Function to split jobs into chunks for workers
function chunkify(jobs, chunkSize) {
    const chunks = [];
    for (let i = 0; i < jobs.length; i += chunkSize) {
        chunks.push(jobs.slice(i, i + chunkSize));
    }
    return chunks;
}

function run(jobs, concurrentWorkers) {
    const chunks = chunkify(jobs, Math.ceil(jobs.length / concurrentWorkers));
    const startTime = performance.now();

    let completedWorkers = 0;

    chunks.forEach((data, i) => {
        const worker = new Worker('./worker.js', { workerData: data });

        worker.on('message', (message) => {
            console.log(`Worker ${i} completed:`, message);
            completedWorkers++;

            if (completedWorkers === chunks.length) {
                console.log(`${concurrentWorkers} workers took ${performance.now() - startTime}ms`);
                console.log('All workers have completed');
            }
        });

        worker.on('error', (error) => {
            console.error(`Worker ${i} encountered an error:`, error);
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                console.error(`Worker ${i} stopped with exit code ${code}`);
            }
        });
    });
}

const jobs = Array.from({ length: 10000 }, (_, i) => i + 1); 
run(jobs, 4);

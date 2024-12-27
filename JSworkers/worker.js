const { parentPort, workerData } = require('worker_threads');

parentPort.on('message', (jobs) => {
    processJobs(jobs);
});

function processJobs(jobs) {
    for (let job of jobs) {
        let count = 0;
        for (let i = 0; i < job; i++) {
            count += i;
        }
    }
    parentPort.postMessage('done');
}

// Process the workerData sent during worker creation
processJobs(workerData);

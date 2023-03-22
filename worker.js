const { Worker } = require('bullmq');

const worker = new Worker('defaultQueue', async job => {
  console.log('Registering participant with first name: ' + job.data.firstName);
  if (job.data.firstName == 'Mallory') {
    implodeUniverse();
  }
  // some fancy external method
  await new Promise(r => setTimeout(r, 2000));
});

worker.on('completed', job => {
  console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});
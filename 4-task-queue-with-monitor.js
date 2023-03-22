const express = require('express');

// Import bullmq and create a new default queue
const { Queue } = require('bullmq')
const queue = new Queue('defaultQueue');

// bull-board imports
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');

// bull-board config
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');
const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullMQAdapter(queue)],
  serverAdapter: serverAdapter,
});

const app = express();
app.use(express.json());

// Setup bull-board route
app.use('/admin/queues', serverAdapter.getRouter());

async function registerParticipant(firstName, lastName) {
  // add a job to the queue
  await queue.add('registerParticipant', { firstName: firstName, lastName: lastName });
}
app.post('/registration', async (req, res) => {
  await registerParticipant(req.body.firstName, req.body.lastName);
  res.send('Registration queued!');
});
  
app.listen(4000, () => {
  console.log('Server started on http://localhost:4000');
  console.log('Access the dashboard http://localhost:4000/admin/queues');
});
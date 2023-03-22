const express = require('express');

// Import bullmq and create a new default queue
const { Queue } = require('bullmq')
const queue = new Queue('defaultQueue');

const app = express();
app.use(express.json());

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
});
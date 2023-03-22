const express = require('express');

const app = express();
app.use(express.json());

async function registerParticipant(firstName, lastName) {
  // pretend we're doing something fancy here
  await new Promise(r => setTimeout(r, 2000));
  console.log('Registered ' + firstName);
}

app.post('/registration', async (req, res) => {
  await registerParticipant(req.body.firstName, req.body.lastName);
  res.send('Registration complete!')
});
  
app.listen(4000, () => {
  console.log('Server started on http://localhost:4000');
});
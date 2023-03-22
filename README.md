# Task Queue Example for CSCC09

A simple express server with an example of using synchronous, asynchronous, and task queues methods to deal with long-running tasks. Also includes Bullboard as an example of how to monitor the task.

## Running the Examples

Requires `node` installed.

Install relevant packages:
```
yarn
```

For the synchronous case:
```
node 1-sync.js
```

For the asynchronous case:
```
node 2-async.js
```

To run the task queue example:
```
node 3-task-queue.js
node worker.js
```

To run the task queue example with the monitoring dashboard:
```
node 4-task-queue-with-monitor.js
node worker.js
```
Visit http://localhost:4000/admin/queues to see the status of jobs.


## curl Commands
To send a regular registration request:
```
curl -X POST http://localhost:4000/registration -H "Content-Type: application/json" -d '{"firstName": "John", "lastName": "Doe"}'
```

To send a payload that would throw an error in the worker implementation:
```
curl -X POST http://localhost:4000/registration -H "Content-Type: application/json" -d '{"firstName": "Mallory", "lastName": "Malicious"}'
```
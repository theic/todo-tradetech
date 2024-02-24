import 'reflect-metadata';
import cluster from 'node:cluster';
import { cpus } from 'node:os';
import process from 'node:process';
import { bootstrap } from './Bootstrap';

const numCPUs = cpus().length;

if (cluster.isPrimary && process.env.NODE_MODE === 'cluster') {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, _code, _signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  bootstrap();
  console.log(`Worker ${process.pid} started`);
}

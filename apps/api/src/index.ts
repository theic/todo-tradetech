import 'reflect-metadata';
import 'dotenv/config';
import cluster from 'node:cluster';
import { cpus } from 'node:os';
import process from 'node:process';
import { bootstrap } from './Bootstrap';
import firebase from 'firebase-admin';
import './app/controllers/ListController';
import './app/controllers/TaskController';

firebase.initializeApp();

const runCluster = () => {
  if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);

    for (const _ of cpus()) {
      cluster.fork();
    }

    cluster.on('exit', (worker, _code, _signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  } else {
    bootstrap().then(() => {
      console.log(`Worker ${process.pid} started`);
    });
  }
};

const runSingleInstance = () => {
  bootstrap();
  console.log(`Single instance running on ${process.pid}`);
};

if (process.env.NODE_MODE === 'cluster') {
  runCluster();
} else {
  runSingleInstance();
}

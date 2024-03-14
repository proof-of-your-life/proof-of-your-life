import { functionsV2 } from '@utils/firebase/functions';
import express from 'express';
import * as apiHandlers from './apiHandlers';

const app = express();

// Note: Logger
app.use((req, _res, next) => {
  console.dir(
    {
      method: req.method,
      protocol: req.protocol,
      hostname: req.hostname,
      url: req.url,
      params: req.params,
      query: req.query,
      headers: req.headers,
      body: req.body,
      ip: req.ip,
      ips: req.ips,
    },
    { depth: null },
  );
  next();
});

// Note: CORS
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// Note: Parse request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Note: All routes
app.get('/', apiHandlers.get);
app.get('/v1', apiHandlers.v1.get);
app.get('/v1/hello', apiHandlers.v1.hello.get);

// Note: Define Cloud Functions for Firebase https onRequest trigger
export const api = functionsV2.https.onRequest(
  {
    region: 'asia-northeast1',
    timeoutSeconds: 3600,
    memory: '128MiB',
    cors: true,
  },
  app,
);

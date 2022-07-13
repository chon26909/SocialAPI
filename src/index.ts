import express, { Application } from 'express';
import http from 'http';
import * as dotenv from 'dotenv';
import * as routes from './routes';
import cors from 'cors';
import { connectMongoDB } from './utilities/database';

dotenv.config();

const app: Application = express();
app.use(express.json())
app.use(cors({ origin: ["*"] }))

app.use('/post', routes.PostRoute);

const port: number = Number(process.env.PORT!);

const httpServer = http.createServer(app);

httpServer.listen(port, () => { 
    console.log('Server Running Port', port);
});

connectMongoDB();
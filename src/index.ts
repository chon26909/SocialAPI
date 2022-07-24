import express, { Application } from 'express';
import http from 'http';
import * as dotenv from 'dotenv';
import * as routes from './routes';
import cors from 'cors';
import { connectMongoDB } from './utilities/database';
import expressSession from 'express-session';

dotenv.config();

const app: Application = express();


declare module 'express-session' {
    interface SessionData {
        uid: string | null;
        [key: string]: any;
    }
}


const sessionOptions: expressSession.SessionOptions = {
    name: 'session',
    secret: "khohuai",
    saveUninitialized: false,
    resave: false,
    cookie: { 
        secure: false,
        sameSite: 'lax', 
        maxAge: 1000 * 60 * 60
    }
}
app.use(expressSession(sessionOptions))
app.use(express.json())
app.use(cors({ origin: ["*"] }))


app.use('/api/auth', routes.AuthRoute);
app.use('/api/user', routes.userRoute);
app.use('/api/post', routes.PostRoute);

const port: number = Number(process.env.PORT!);

const httpServer = http.createServer(app);

httpServer.listen(port, () => { 
    console.log('Server Running Port', port);
});

connectMongoDB();
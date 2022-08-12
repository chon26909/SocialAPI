import express, { Application } from 'express';
import http from 'http';
import * as dotenv from 'dotenv';
import * as routes from './routes';
import cors from 'cors';
import { connectMongoDB } from './utilities/database';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
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
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors({ origin: ["http://localhost:3000", ""] }))


app.use('/api/auth', routes.AuthRoute);
app.use('/api/user', routes.userRoute);
app.use('/api/post', routes.PostRoute);

const port: number = Number(process.env.PORT!);

const httpServer = http.createServer(app);

httpServer.listen(port, () => { 
    console.log('Server Running Port', port);
});

connectMongoDB();
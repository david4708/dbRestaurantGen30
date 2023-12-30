import express from 'express';
import { AppError } from './common/errors/appError.js';
import { globalErrorHandler } from './common/errors/errorController.js';
import { enableCors } from './config/plugins/corsPlugin.js';

import { router } from './routes/index.js';
const app = express();

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
   
    'http://localhost:5173',
    'http://localhost:3002',
    'https://monumental-stardust-f3477f.netlify.app',
  ];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


enableCors(app, ACCEPTED_ORIGINS);
//rutas


app.use('/api/v1', router);


app.all('*',(req,res,next)=>{
 
    return next(new AppError(`can't find ${req.originalUrl} on this server`,404 ))
})

app.use(globalErrorHandler)

export default app;

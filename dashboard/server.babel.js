import path from 'path';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import React from 'react';

import {setupReducers,} from '@sketchpixy/rubix/lib/node/redux-router';
import RubixAssetMiddleware from '@sketchpixy/rubix/lib/node/RubixAssetMiddleware';


import reducers from './src/redux/reducers';

setupReducers(reducers);

const port = process.env.PORT || 8080;

let app = express();
app.use(compression());
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'pug');



app.get('*', RubixAssetMiddleware('ltr'), (req, res, next) => {
    res.render('index', {content: '', data: '""'});
});

app.listen(port, () => {
    console.log(`Node.js app is running at http://localhost:${port}/`);
});
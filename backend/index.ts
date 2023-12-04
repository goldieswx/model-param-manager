import { Request, Response, Application } from 'express';
import express = require('express');
const path = require('path');

import * as helper from './helper';
import * as _ from 'lodash';

import multer from 'multer';

import {FileContents, getResourceKeys} from "./helper";
import {error} from "@angular/compiler-cli/src/transformers/util";
import fs from "fs";



let app: Application = express();
app.use(express.json());



/* Prepare upload management */

const uploadTemp = '/tmp/uploads';
fs.mkdirSync(uploadTemp, { recursive: true });
const upload = multer({ dest: uploadTemp, limits: { fileSize: 5000000 } } );

/* Endpoints */


app.all('*',function(req,res,next)
{

  //if (!req.get('Origin')) return next();

  res.set('Access-Control-Allow-Origin','*');
  res.set('Access-Control-Allow-Methods','GET,POST,DELETE');
  res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type,Authorization');

  if ('OPTIONS' == req.method) return res.sendStatus(200);

  next();
});

app.use('/static/resources/', express.static(path.join(__dirname, 'resources')));

app.get('/projects', function (req: Request, res: Response) {


  helper.getDirFiles('./projects').then((files) => {
    const filteredFiles = _.filter(files, (f) =>  f.endsWith('.json')).map((f) => helper.getProject(f));

    Promise.all(filteredFiles).then((files) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(files));
    });
  });

});

app.get('/resources/:project', function (req: Request, res: Response) {

  if (req.params?.project) {
    helper.getResourceKeys(req.params.project).then((files) => {


        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(files));

    }).catch((error) => {
      res.status(404);
      res.send('Not found');
    });
  } else {
    res.status(404);
    res.send('Not found');
  }

});

app.get('/resources/:project/:key', function (req: Request, res: Response) {

  if (req.params?.project) {
    helper.getResourceFiles(req.params.project, req.params.key).then((files) => {

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(files));

    }).catch((error) => {
      res.status(404);
      res.send('Not found');
    });
  } else {
    res.status(404);
    res.send('Not found');
  }

});

app.post('/resources/:project/:key/files/upload', upload.any(), function(req: Request, res: Response) {

  try {
    helper.afterFileUpload(req.params.project, req.params.key, req.files as any[]);
    res.status(200);
    res.send('{ "status": "ok"}');
  } catch(e: any) {
    res.status(500);
    res.send(JSON.stringify({ error: e.message}));
  }

});


app.post('/resources/:project/:key/files/update', function(req: Request, res: Response) {

  try {
    helper.updateFile(req.params.project, req.params.key, req.body as FileContents);
    res.status(200);
    res.send('{ "status": "ok"}');
  } catch(e: any) {
    res.status(500);
    res.send(JSON.stringify({ error: e.message}));
  }

});



app.post('/resources/:project/:key/files/delete', function(req: Request, res: Response) {


  try {
    helper.deleteFiles(req.params.project, req.params.key, req.body);
    res.status(200);
    res.send('{ "status": "ok"}');
  } catch(e: any) {
    res.status(500);
    res.send(JSON.stringify({ error: e.message}));
  }

});


app.post('/resources/:project/:key/files/rename', function(req: Request, res: Response) {

  try {
    helper.renameFiles(req.params.project, req.params.key, req.body);
    res.status(200);
    res.send('{ "status": "ok"}');
  } catch(e: any) {
    res.status(500);
    res.send(JSON.stringify({ error: e.message}));
  }

});





app.get('/project/:projectId', function (req: Request, res: Response) {

  if (req.params?.projectId) {
    helper.getProject(req.params.projectId).then((project) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(project));
    }, () => {
      res.status(500);
      res.send('Not found');
    });
  }


});

app.post('/project/:projectId', function (req: Request, res: Response) {

    const contents = req.body;

    helper.updateProject(req.params?.projectId, contents).then(() => {
      res.setHeader('Content-Type', 'application/json');
      res.send('{ "result": "success" }')
    }, () => {
      res.status(500);
      res.send('Not found');
    });

});


app.delete('/project/:projectId', function (req: Request, res: Response) {

  helper.deleteProject(req.params?.projectId || '').then(() => {
    res.setHeader('Content-Type', 'application/json');
    res.send('{ "result": "success" }');
  }, () => {
    res.status(500);
    res.send('Not found');
  });

});



app.get('/storage/:project/:key', function (req: Request, res: Response) {

  if (req.params?.key) {
    helper.getStorage(req.params.project, req.params.key).then((project) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(project));
    },() => {
      res.status(500);
      res.send('Not found');
    });
  } else {
    res.status(404);
    res.send('Not found');
  }

});

app.post('/storage/:project/:key', function (req: Request, res: Response) {

  const contents = req.body;

  console.log('posting storage req.query' , req.query);

  const override = req.query?.override !== 'no'; // override by default

  helper.updateStorage(req.params.project, req.params?.key, contents, override).then(() => {
    res.setHeader('Content-Type', 'application/json');
    res.send('{ "result": "success" }')
  }, () => {
    res.status(500);
    res.send('Not found');
  });

});

app.delete('/storage/:project/:key', function (req: Request, res: Response) {

  helper.deleteStorage(req.params.project, req.params?.key).then(() => {
    res.setHeader('Content-Type', 'application/json');
    res.send('{ "result": "success" }')
  }, () => {
    res.status(500);
    res.send('Not found');
  });

});



app.listen(3000);

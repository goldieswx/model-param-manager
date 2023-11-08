import { Request, Response, Application } from 'express';
import express = require('express');
import * as helper from './helper';
import * as _ from 'lodash';

var app: Application = express();
app.use(express.json());

app.all('*',function(req,res,next)
{

  //if (!req.get('Origin')) return next();

  res.set('Access-Control-Allow-Origin','*');
  res.set('Access-Control-Allow-Methods','GET,POST,DELETE');
  res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type,Authorization');

  if ('OPTIONS' == req.method) return res.sendStatus(200);

  next();
});

app.get('/projects', function (req: Request, res: Response) {


  helper.getDirFiles('./projects').then((files) => {
    const filteredFiles = _.filter(files, (f) =>  f.endsWith('.json')).map((f) => helper.getProject(f));

    Promise.all(filteredFiles).then((files) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(files));
    });
  });

});

app.get('/project/:projectId', function (req: Request, res: Response) {

  if (req.params?.projectId) {
    helper.getProject(req.params.projectId).then((project) => {
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

  helper.deleteProject(req.params?.projectId).then(() => {
    res.setHeader('Content-Type', 'application/json');
    res.send('{ "result": "success" }')
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

  helper.updateStorage(req.params.project, req.params?.key, contents).then(() => {
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

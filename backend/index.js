"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require('path');
const helper = __importStar(require("./helper"));
const _ = __importStar(require("lodash"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
let app = express();
app.use(express.json());
/* Prepare upload management */
const uploadTemp = '/tmp/uploads';
fs_1.default.mkdirSync(uploadTemp, { recursive: true });
const upload = (0, multer_1.default)({ dest: uploadTemp, limits: { fileSize: 5000000 } });
/* Endpoints */
app.all('*', function (req, res, next) {
    //if (!req.get('Origin')) return next();
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    if ('OPTIONS' == req.method)
        return res.sendStatus(200);
    next();
});
app.use('/static/resources/', express.static(path.join(__dirname, 'resources')));
app.get('/projects', function (req, res) {
    helper.getDirFiles('./projects').then((files) => {
        const filteredFiles = _.filter(files, (f) => f.endsWith('.json')).map((f) => helper.getProject(f));
        Promise.all(filteredFiles).then((files) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(files));
        });
    });
});
app.get('/resources/:project', function (req, res) {
    var _a;
    if ((_a = req.params) === null || _a === void 0 ? void 0 : _a.project) {
        helper.getResourceKeys(req.params.project).then((files) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(files));
        }).catch((error) => {
            res.status(404);
            res.send('Not found');
        });
    }
    else {
        res.status(404);
        res.send('Not found');
    }
});
app.get('/resources/:project/:key', function (req, res) {
    var _a;
    if ((_a = req.params) === null || _a === void 0 ? void 0 : _a.project) {
        helper.getResourceFiles(req.params.project, req.params.key).then((files) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(files));
        }).catch((error) => {
            res.status(404);
            res.send('Not found');
        });
    }
    else {
        res.status(404);
        res.send('Not found');
    }
});
app.post('/resources/:project/:key/files/upload', upload.any(), function (req, res) {
    try {
        helper.afterFileUpload(req.params.project, req.params.key, req.files);
        res.status(200);
        res.send('{ "status": "ok"}');
    }
    catch (e) {
        res.status(500);
        res.send(JSON.stringify({ error: e.message }));
    }
});
app.post('/resources/:project/:key/files/update', function (req, res) {
    try {
        helper.updateFile(req.params.project, req.params.key, req.body);
        res.status(200);
        res.send('{ "status": "ok"}');
    }
    catch (e) {
        res.status(500);
        res.send(JSON.stringify({ error: e.message }));
    }
});
app.post('/resources/:project/:key/files/delete', function (req, res) {
    try {
        helper.deleteFiles(req.params.project, req.params.key, req.body);
        res.status(200);
        res.send('{ "status": "ok"}');
    }
    catch (e) {
        res.status(500);
        res.send(JSON.stringify({ error: e.message }));
    }
});
app.post('/resources/:project/:key/files/rename', function (req, res) {
    try {
        helper.renameFiles(req.params.project, req.params.key, req.body);
        res.status(200);
        res.send('{ "status": "ok"}');
    }
    catch (e) {
        res.status(500);
        res.send(JSON.stringify({ error: e.message }));
    }
});
app.get('/project/:projectId', function (req, res) {
    var _a;
    if ((_a = req.params) === null || _a === void 0 ? void 0 : _a.projectId) {
        helper.getProject(req.params.projectId).then((project) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(project));
        }, () => {
            res.status(500);
            res.send('Not found');
        });
    }
});
app.post('/project/:projectId', function (req, res) {
    var _a;
    const contents = req.body;
    helper.updateProject((_a = req.params) === null || _a === void 0 ? void 0 : _a.projectId, contents).then(() => {
        res.setHeader('Content-Type', 'application/json');
        res.send('{ "result": "success" }');
    }, () => {
        res.status(500);
        res.send('Not found');
    });
});
app.delete('/project/:projectId', function (req, res) {
    var _a;
    helper.deleteProject(((_a = req.params) === null || _a === void 0 ? void 0 : _a.projectId) || '').then(() => {
        res.setHeader('Content-Type', 'application/json');
        res.send('{ "result": "success" }');
    }, () => {
        res.status(500);
        res.send('Not found');
    });
});
app.get('/storage/:project/:key', function (req, res) {
    var _a;
    if ((_a = req.params) === null || _a === void 0 ? void 0 : _a.key) {
        helper.getStorage(req.params.project, req.params.key).then((project) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(project));
        }, () => {
            res.status(500);
            res.send('Not found');
        });
    }
    else {
        res.status(404);
        res.send('Not found');
    }
});
app.post('/storage/:project/:key', function (req, res) {
    var _a, _b;
    const contents = req.body;
    console.log('posting storage req.query', req.query);
    const override = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.override) !== 'no'; // override by default
    helper.updateStorage(req.params.project, (_b = req.params) === null || _b === void 0 ? void 0 : _b.key, contents, override).then(() => {
        res.setHeader('Content-Type', 'application/json');
        res.send('{ "result": "success" }');
    }, () => {
        res.status(500);
        res.send('Not found');
    });
});
app.delete('/storage/:project/:key', function (req, res) {
    var _a;
    helper.deleteStorage(req.params.project, (_a = req.params) === null || _a === void 0 ? void 0 : _a.key).then(() => {
        res.setHeader('Content-Type', 'application/json');
        res.send('{ "result": "success" }');
    }, () => {
        res.status(500);
        res.send('Not found');
    });
});
app.listen(3000);

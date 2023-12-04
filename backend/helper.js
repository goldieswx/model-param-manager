"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResourceFiles = exports.getResourceKeys = exports.renameFiles = exports.deleteFiles = exports.updateFile = exports.afterFileUpload = exports.updateStorage = exports.deleteStorage = exports.getStorage = exports.updateProject = exports.deleteProject = exports.getProject = exports.getDirFiles = exports.paths = void 0;
const fs_1 = __importDefault(require("fs"));
const lodash_1 = require("lodash");
exports.paths = {
    storage: 'storage',
    projects: 'projects',
    resources: 'resources'
};
const { promises: { readFile, writeFile, unlink } } = require("fs");
const getDirFiles = (path) => {
    return new Promise((resolve, reject) => {
        fs_1.default.readdir(path, function (err, files) {
            //handling error
            if (err) {
                reject('Unable to scan directory: ' + err);
                return console.log('Unable to scan directory: ' + err);
            }
            //listing all files using forEach
            const filesInDir = [];
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                filesInDir.push(file);
            });
            resolve(filesInDir);
        });
    });
};
exports.getDirFiles = getDirFiles;
const getProject = (projectId) => {
    if (projectId.endsWith('.json')) {
        projectId = projectId.slice(0, -('.json'.length));
    }
    return readFile(`./${exports.paths.projects}/` + projectId + '.json').then((fileBuffer) => {
        return Object.assign(Object.assign({}, JSON.parse(fileBuffer.toString())), { projectId });
    }).catch((error) => {
        console.log('error while reading project ' + projectId, error.message);
        throw new Error(error.message);
    });
};
exports.getProject = getProject;
const deleteProject = (projectId) => {
    if (projectId.endsWith('.json')) {
        projectId = projectId.slice(0, -('.json'.length));
    }
    return unlink(`./${exports.paths.projects}/` + projectId + '.json');
};
exports.deleteProject = deleteProject;
const updateProject = (projectId, contents) => {
    if (projectId.endsWith('.json')) {
        projectId = projectId.slice(0, -('.json'.length));
    }
    return writeFile(`./${exports.paths.projects}/` + projectId + '.json', JSON.stringify(contents));
};
exports.updateProject = updateProject;
const getStorage = (project, key) => {
    if (key.endsWith('.json')) {
        key = key.slice(0, -('.json'.length));
    }
    return readFile(`./${exports.paths.storage}/${project}/${key}` + '.json').then((fileBuffer) => {
        return JSON.parse(fileBuffer.toString());
    }).catch((error) => {
        console.log('error while reading storage ' + key, error.message);
        throw new Error(error.message);
    });
};
exports.getStorage = getStorage;
const deleteStorage = (project, key) => {
    if (key.endsWith('.json')) {
        key = key.slice(0, -('.json'.length));
    }
    return unlink(`./${exports.paths.storage}/${project}/${key}` + '.json');
};
exports.deleteStorage = deleteStorage;
const updateStorage = (project, key, contents, override) => {
    if (key.endsWith('.json')) {
        key = key.slice(0, -('.json'.length));
    }
    const dirPath = `./${exports.paths.storage}/${project}`;
    const filePath = `${dirPath}/${key}` + '.json';
    if (!override) {
        if (fs_1.default.existsSync(filePath)) {
            console.log(filePath + ' Ignoring file due no-override and existing file.');
            return Promise.resolve(true);
        }
    }
    fs_1.default.mkdirSync(dirPath, { recursive: true });
    return writeFile(filePath, JSON.stringify(contents));
};
exports.updateStorage = updateStorage;
const afterFileUpload = (projectId, key, files) => {
    /*{
      fieldname: 'file',
        originalname: 'Screenshot_20231125_103238.png',
      encoding: '7bit',
      mimetype: 'image/png',
      destination: '/tmp/uploads',
      filename: 'f08b6c60b160a13c14f8bf053f83cdfc',
      path: '/tmp/uploads/f08b6c60b160a13c14f8bf053f83cdfc',
      size: 8815
    }*/
    files.map((f) => {
        fs_1.default.copyFileSync(f.destination + '/' + f.filename, `./${exports.paths.resources}/${projectId}/${key}/${f.originalname}`);
        fs_1.default.unlinkSync(f.destination + '/' + f.filename);
    });
};
exports.afterFileUpload = afterFileUpload;
const updateFile = (project, key, body) => {
    if (!body.filename.includes('/')) {
        if (fs_1.default.existsSync(`./${exports.paths.resources}/${project}/${key}/${body.filename}`)) {
            fs_1.default.writeFileSync(`./${exports.paths.resources}/${project}/${key}/${body.filename}`, body.contents);
        }
    }
};
exports.updateFile = updateFile;
const deleteFiles = (project, key, body) => {
    const filenames = body || [];
    filenames.map(f => {
        if (!f.includes('/')) {
            fs_1.default.unlinkSync(`./${exports.paths.resources}/${project}/${key}/${f}`);
        }
        else {
            console.log(`deleteFiles, ignored file containing invalid characters: (${f})`);
        }
    });
};
exports.deleteFiles = deleteFiles;
const renameFiles = (project, key, body) => {
    const filenames = body || [];
    filenames.map(f => {
        if ((!f.src.includes('/')) && (!f.dest.includes('/'))) {
            fs_1.default.renameSync(`./${exports.paths.resources}/${project}/${key}/${f.src}`, `./${exports.paths.resources}/${project}/${key}/${f.dest}`);
        }
        else {
            console.log(`renameFile, ignored file containing invalid characters: (${f})`);
        }
    });
};
exports.renameFiles = renameFiles;
const getResourceKeys = (project) => {
    return (0, exports.getDirFiles)(`./${exports.paths.resources}/${project}`).then((files) => {
        return files.filter((file) => (fs_1.default.lstatSync(`./${exports.paths.resources}/${project}/${file}`).isDirectory()));
    }).catch((error) => {
        console.log('error while reading resources for ' + project, error.message);
        throw new Error(error.message);
    });
};
exports.getResourceKeys = getResourceKeys;
const getResourceFiles = (project, resourceKey) => {
    return (0, exports.getDirFiles)(`./${exports.paths.resources}/${project}/${resourceKey}`).then((incomingFiles) => (0, lodash_1.chain)(incomingFiles)
        .map(file => ({ f: file, s: fs_1.default.lstatSync(`./${exports.paths.resources}/${project}/${resourceKey}/${file}`) }))
        .filter((fObj) => fObj.s.isFile())
        .map(fObj => ({
        filename: fObj.f,
        size: fObj.s.size,
        modified: fObj.s.ctime.toISOString()
    }))
        .value()).catch((error) => {
        console.log('error while reading resources for ' + project, error.message);
        throw new Error(error.message);
    });
};
exports.getResourceFiles = getResourceFiles;

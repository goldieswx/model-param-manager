"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStorage = exports.deleteStorage = exports.getStorage = exports.updateProject = exports.deleteProject = exports.getProject = exports.getDirFiles = exports.paths = void 0;
const fs_1 = __importDefault(require("fs"));
exports.paths = {
    storage: 'storage',
    projects: 'projects'
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
const getStorage = (key) => {
    if (key.endsWith('.json')) {
        key = key.slice(0, -('.json'.length));
    }
    return readFile(`./${exports.paths.storage}/` + key + '.json').then((fileBuffer) => {
        return JSON.parse(fileBuffer.toString());
    }).catch((error) => {
        console.log('error while reading storage ' + key, error.message);
        throw new Error(error.message);
    });
};
exports.getStorage = getStorage;
const deleteStorage = (key) => {
    if (key.endsWith('.json')) {
        key = key.slice(0, -('.json'.length));
    }
    return unlink(`./${exports.paths.storage}/` + key + '.json');
};
exports.deleteStorage = deleteStorage;
const updateStorage = (key, contents) => {
    if (key.endsWith('.json')) {
        key = key.slice(0, -('.json'.length));
    }
    return writeFile(`./${exports.paths.storage}/` + key + '.json', JSON.stringify(contents));
};
exports.updateStorage = updateStorage;

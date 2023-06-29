import fs from 'fs';



const {promises: {readFile, writeFile, unlink}} = require("fs");

export const getDirFiles = (path: string) => {

  return new Promise<string[]>((resolve,reject) => {

    fs.readdir(path, function (err, files) {
      //handling error
      if (err) {
        reject('Unable to scan directory: ' + err);
        return console.log('Unable to scan directory: ' + err);
      }
      //listing all files using forEach
      const filesInDir: string[] = [];

      files.forEach(function (file) {
        // Do whatever you want to do with the file
        filesInDir.push(file);
      });

      resolve(filesInDir)
    });

  });
}

export interface ConfigProject {
      projectName: string;
      projectId: string;
      projectDescription : string;
}


export const getProject : (projectId: string) => Promise<ConfigProject> = (projectId: string) => {

      if (projectId.endsWith('.json')) {
          projectId = projectId.slice(0, - ('.json'.length));
      }
      return readFile('./projects/' + projectId + '.json').then((fileBuffer : any) => {
          return { ...JSON.parse(fileBuffer.toString()) as ConfigProject, projectId };
      }).catch((error: any) => {
          console.log('error while reading project ' + projectId, error.message);
          throw new Error(error.message);
      })

}

export const deleteProject : (projectId: string) => Promise<any> = (projectId: string) =>  {

    if (projectId.endsWith('.json')) {
      projectId = projectId.slice(0, - ('.json'.length));
    }
    return unlink('./projects/' + projectId + '.json')

};

export const updateProject : (projectId: string, contents: any) => Promise<any> = (projectId: string, contents: any) => {

  if (projectId.endsWith('.json')) {
    projectId = projectId.slice(0, - ('.json'.length));
  }
  return writeFile('./projects/' + projectId + '.json', JSON.stringify(contents));

};



export const getStorage : (key: string) => Promise<any> = (key: string) => {

  if (key.endsWith('.json')) {
    key = key.slice(0, - ('.json'.length));
  }
  return readFile('./storage/' + key + '.json').then((fileBuffer : any) => {
    return  JSON.parse(fileBuffer.toString());
  }).catch((error: any) => {
    console.log('error while reading storage ' + key, error.message);
    throw new Error(error.message);
  })

}

export const deleteStorage : (key: string) => Promise<any> = (key: string) =>  {

  if (key.endsWith('.json')) {
    key = key.slice(0, - ('.json'.length));
  }
  return unlink('./storage/' + key + '.json')

};

export const updateStorage : (key: string, contents: any) => Promise<any> = (key: string, contents: any) => {

  if (key.endsWith('.json')) {
    key = key.slice(0, - ('.json'.length));
  }
  return writeFile('./storage/' + key + '.json', JSON.stringify(contents));

};




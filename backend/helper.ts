import fs from 'fs';
import { chain as loDashChain } from 'lodash';




export const paths = {
   storage: 'storage',
   projects: 'projects',
   resources: 'resources'
}

const {promises: {readFile, writeFile, unlink}} = require("fs");

export interface ResourceFile {
   filename: string;
   size: number;
   modified: Date | string;
}

export interface FileContents {
   filename: string;
   contents : string;

}


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
      return readFile(`./${paths.projects}/` + projectId + '.json').then((fileBuffer : any) => {
          return { ...JSON.parse(fileBuffer.toString()) as ConfigProject, projectId };
      }).catch((error: any) => {
          console.log('error while reading project ' + projectId, error.message);
          throw new Error(error.message);
      }) as Promise<ConfigProject>

}

export const deleteProject : (projectId: string) => Promise<any> = (projectId: string) =>  {

    if (projectId.endsWith('.json')) {
      projectId = projectId.slice(0, - ('.json'.length));
    }
    return unlink(`./${paths.projects}/` + projectId + '.json')

};

export const updateProject : (projectId: string, contents: any) => Promise<any> = (projectId: string, contents: any) => {

  if (projectId.endsWith('.json')) {
    projectId = projectId.slice(0, - ('.json'.length));
  }
  return writeFile(`./${paths.projects}/` + projectId + '.json', JSON.stringify(contents));

};



export const getStorage : (project: string, key: string) => Promise<any> = (project: string, key: string) => {

  if (key.endsWith('.json')) {
    key = key.slice(0, - ('.json'.length));
  }
  return readFile(`./${paths.storage}/${project}/${key}` + '.json').then((fileBuffer : any) => {
    return  JSON.parse(fileBuffer.toString());
  }).catch((error: any) => {
    console.log('error while reading storage ' + key, error.message);
    throw new Error(error.message);
  })

}

export const deleteStorage : (project: string, key: string) => Promise<any> = (project: string, key: string) =>  {

  if (key.endsWith('.json')) {
    key = key.slice(0, - ('.json'.length));
  }
  return unlink(`./${paths.storage}/${project}/${key}` + '.json')

};

export const updateStorage : (project: string, key: string, contents: any, override: boolean) => Promise<any> = (project: string, key: string, contents: any, override: boolean) => {

  if (key.endsWith('.json')) {
    key = key.slice(0, - ('.json'.length));
  }

  const dirPath = `./${paths.storage}/${project}`;
  const filePath = `${dirPath}/${key}` + '.json';

  if (!override) {
      if (fs.existsSync(filePath)) {
         console.log(filePath + ' Ignoring file due no-override and existing file.')
         return Promise.resolve(true);
      }
  }

  fs.mkdirSync(dirPath, { recursive: true });
  return writeFile(filePath , JSON.stringify(contents));

};

export const afterFileUpload: (projectId: string, key: string, files: any[]) => void = (projectId: string, key: string, files: any[]) => {

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

  files.map((f: any) => {
       fs.copyFileSync(f.destination + '/' + f.filename, `./${paths.resources}/${projectId}/${key}/${f.originalname}`);
       fs.unlinkSync(f.destination + '/' + f.filename);
  });

}


export const  updateFile : (project: string, key: string, body: FileContents) => void = (project: string, key: string, body: FileContents) => {

      if (!body.filename.includes('/')) {
          if (fs.existsSync(`./${paths.resources}/${project}/${key}/${body.filename}`)) {
              fs.writeFileSync(`./${paths.resources}/${project}/${key}/${body.filename}`, body.contents);
          }
      }

}


export const deleteFiles : (project: string, key: string, body: any) => void = (project: string, key: string, body: any) =>  {

   const filenames = body as string[] || [];

    filenames.map(f => {
      if (!f.includes('/')) {
        fs.unlinkSync(`./${paths.resources}/${project}/${key}/${f}`);
      } else {
        console.log(`deleteFiles, ignored file containing invalid characters: (${f})`);
      }
    });
};

export const renameFiles : (project: string, key: string, body: any) => void = (project: string, key: string, body: any) =>  {

  const filenames = body as {src: string, dest: string}[] || [];

  filenames.map(f => {
    if ((!f.src.includes('/')) && (!f.dest.includes('/'))) {
      fs.renameSync(`./${paths.resources}/${project}/${key}/${f.src}`, `./${paths.resources}/${project}/${key}/${f.dest}`);
    } else {
      console.log(`renameFile, ignored file containing invalid characters: (${f})`);
    }
  });

};



export const getResourceKeys : (project: string) => Promise<string[]> = (project: string) => {

  return getDirFiles(`./${paths.resources}/${project}`).then((files: string[]) => {

      return files.filter((file) =>  (fs.lstatSync(`./${paths.resources}/${project}/${file}`).isDirectory()));

  }).catch((error: any) => {
    console.log('error while reading resources for ' + project, error.message);
    throw new Error(error.message);
  }) as Promise<string[]>;

}

export const getResourceFiles : (project: string, resourceKey: string) => Promise<ResourceFile[]> = (project: string, resourceKey: string) => {

  return getDirFiles(`./${paths.resources}/${project}/${resourceKey}`).then((incomingFiles: string[]) =>
                                   loDashChain(incomingFiles)
                                    .map(file => ({ f: file, s: fs.lstatSync(`./${paths.resources}/${project}/${resourceKey}/${file}`) }))
                                    .filter((fObj) => fObj.s.isFile())
                                    .map(fObj => ({
                                            filename: fObj.f,
                                            size: fObj.s.size,
                                            modified: fObj.s.ctime.toISOString()
                                      }))
                                    .value()
  ).catch((error: any) => {
    console.log('error while reading resources for ' + project, error.message);
    throw new Error(error.message);
  }) as Promise<ResourceFile[]>;

}

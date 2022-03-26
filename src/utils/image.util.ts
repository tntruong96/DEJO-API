import { extname } from "path";
import * as fs from 'fs'

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  };

  export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
  };


  export const createDatePath = (req, file, callback) => {
    const now = new Date();
    //create path via date 
    const createdPath = `./data/images/${now.getFullYear()}/${now.getMonth()}/${now.getDate()}`;
    //auto create folder
    fs.mkdirSync(createdPath, {recursive: true});
     callback(null, createdPath)
  }
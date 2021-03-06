import { Request, Response } from 'express';
import File, { IFile } from '../../../database/models/file';
import HttpStatusCode from '../utils/httpStatusCodes';
import * as fs from 'fs';

export async function getUserFiles(req: Request, res: Response): Promise<void | Response> {
  try {
    let filter: any = {};
    if (!req.adminMode) {
      filter._user = req.user._id;
    }

    const files = await File.find(filter).select('-path');
    return res.send(files);
  } catch (err) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(err);
  }
}

export async function getFile(req: Request, res: Response): Promise<void | Response> {
  const fileId = req.params.id;
  try {
    const file = await File.findById(fileId);

    if (file == null) {
      return res.sendStatus(HttpStatusCode.NOT_FOUND);
    }

    if (!req.user.admin && file._user != req.user._id) {
      return res.sendStatus(HttpStatusCode.NOT_FOUND);
    }

    return res.sendFile(file.path);
  } catch (err) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(err);
  }
}

export async function deleteFile(req: Request, res: Response): Promise<void | Response> {
  const fileId = req.params.id;
  try {
    const file = await File.findById(fileId);

    if (file == null) {
      return res.sendStatus(HttpStatusCode.NOT_FOUND);
    }

    if (!req.user.admin && file._user != req.user._id) {
      return res.sendStatus(HttpStatusCode.NOT_FOUND);
    }

    fs.unlinkSync(file.path);
    await File.deleteOne({ _id: fileId });

    return res.sendStatus(HttpStatusCode.OK);
  } catch (err) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(err);
  }
}

export async function fileUploadNext(req: Request, res: Response): Promise<void | Response> {
  let fileModel: IFile;

  const multerFile: Express.Multer.File = req.file;
  let file = new File({
    name: multerFile.originalname,
    encoding: multerFile.encoding,
    mimetype: multerFile.mimetype,
    path: multerFile.path,
    size: multerFile.size,
    _user: req.user._id,
  });

  try {
    fileModel = await file.save();
    fileModel.path = undefined;
    return res.send(fileModel);
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
  }
}

export async function multipleFileUploadNext(req: Request, res: Response): Promise<void> {
  const promises: Promise<any>[] = [];
  const files: IFile[] = [];

  for (let i = 0; i < req.files.length; i++) {
    promises.push(new Promise(async (resolve, reject) => {
      const multerFile: Express.Multer.File = req.files[i];
      let file = new File({
        name: multerFile.originalname,
        encoding: multerFile.encoding,
        mimetype: multerFile.mimetype,
        path: multerFile.path,
        size: multerFile.size,
        _user: req.user._id,
      });

      try {
        const savedFile = await file.save();
        savedFile.path = undefined;
        files.push(savedFile);
        resolve();
      } catch (err) {
        reject(err);
      }
    }))
  }

  await Promise.all(promises);
  res.send(files);
}

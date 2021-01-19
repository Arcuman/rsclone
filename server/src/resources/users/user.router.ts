import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction} from 'express';
import  { ErrorHandler, catchError } from '@/helpers/errorHandler';
import statusCodes from './user.constants';
import {usersService} from './user.controller';

const router = require('express').Router();

router
  .route('/')
  .get(
    catchError(async (req:Request, res:Response, next:NextFunction) => {
      const users = await usersService.getAll();

      res.statusMessage = statusCodes[HttpStatus.OK].all;
      res
        .type('application/json')
        .json(users)
        .status(200)
        .end();
      next();
    }),
  )

  .post(
    catchError(async (req:Request, res:Response, next:NextFunction) => {
      const newUser = req.body;
      const user = await usersService.setUser(newUser);

      res.statusMessage = statusCodes[HttpStatus.OK].update;
      res
        .type('application/json')
        .json(user)
        .status(HttpStatus.OK)
        .end();
      next();
    }),
  );

router
  .route('/:id')
  .get(
    catchError(async (req:Request, res:Response, next:NextFunction) => {
      const userId = Number(req.params.id);
      if (!userId) {
        throw new ErrorHandler(HttpStatus.BAD_REQUEST);
      }
      const user = await usersService.getUserById(userId);

      if (!user) {
        throw new ErrorHandler(
          HttpStatus.NOT_FOUND,
          statusCodes[HttpStatus.NOT_FOUND],
        );
      } else {
        res.statusMessage = statusCodes[HttpStatus.OK].all;
        res
          .type('application/json')
          .json(user)
          .status(HttpStatus.OK)
          .end();
      }
      next();
    }),
  )

  .put(
    catchError(async (req:Request, res:Response, next:NextFunction) => {
      const newUserData = req.body;
      const userId = Number(req.params.id);

      if (!userId) {
        throw new ErrorHandler(HttpStatus.BAD_REQUEST);
      }
      const user = await usersService.updateUserById(userId, newUserData);

      if (!user) {
        throw new ErrorHandler(
          HttpStatus.NOT_FOUND,
          statusCodes[HttpStatus.NOT_FOUND],
        );
      } else {
        res.statusMessage = statusCodes[HttpStatus.OK].update;
        res
          .type('application/json')
          .json(user)
          .status(HttpStatus.OK)
          .end();
      }
      next();
    }),
  )

  .delete(
    catchError(async (req:Request, res:Response, next:NextFunction) => {
      const userId = Number(req.params.id);

      if (!userId) {
        throw new ErrorHandler(HttpStatus.BAD_REQUEST);
      }

      const deleteCount:number = await usersService.deleteUserById(userId);

      if (deleteCount === 0) {
        throw new ErrorHandler(
          HttpStatus.NOT_FOUND,
          statusCodes[HttpStatus.NOT_FOUND],
        );
      } else {
        res.statusMessage = statusCodes[HttpStatus.NO_CONTENT];
        res.status(HttpStatus.NO_CONTENT).end();
      }
      next();
    }),
  );

router
  .route('/profile')
  .get(
    catchError(async (req:Request, res:Response, next:NextFunction) => {
      const userId = Number(req.params.id);
      if (!userId) {
        throw new ErrorHandler(HttpStatus.BAD_REQUEST);
      }
      const profile = await usersService.getUserProfile(userId);

      if (!profile) {
        throw new ErrorHandler(
          HttpStatus.NOT_FOUND,
          statusCodes[HttpStatus.NOT_FOUND],
        );
      } else {
        res.statusMessage = statusCodes[HttpStatus.OK].all;
        res
          .type('application/json')
          .json(profile)
          .status(HttpStatus.OK)
          .end();
      }
      next();
    }),
  )
  .put(
    catchError(async (req:Request, res:Response, next:NextFunction) => {
      const newUserProfile = req.body;
      const userId = Number(req.params.id);

      if (!userId) {
        throw new ErrorHandler(HttpStatus.BAD_REQUEST);
      }
      const profile = await usersService.updateUserProfile(userId, newUserProfile);

      if (!profile) {
        throw new ErrorHandler(
          HttpStatus.NOT_FOUND,
          statusCodes[HttpStatus.NOT_FOUND],
        );
      } else {
        res.statusMessage = statusCodes[HttpStatus.OK].update;
        res
          .type('application/json')
          .json(profile)
          .status(HttpStatus.OK)
          .end();
      }
      next();
    }),
  );

export {router};

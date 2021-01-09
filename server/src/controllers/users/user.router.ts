import statusCodes from './user.constants';
import {usersService} from './user.controller';

const HttpStatus = require('http-status-codes');

const router = require('express').Router();
const { ErrorHandler, catchError } = require('../../helpers/errorHandler');
const { isUUID } = require('../../helpers/validator');

router
  .route('/')
  .get(
    catchError(async (req, res, next) => {
      const users = await usersService.getAll();
      
      res.statusMessage = statusCodes[HttpStatus.OK].all;
      res.contentType = 'application/json';
      res
        .json(users)
        .status('200')
        .end(); 
      next();
    }),
  )

  .post(
    catchError(async (req, res, next) => {
      const newUser = req.body;
      const user = await usersService.setUser(newUser);

      res.statusMessage = statusCodes[HttpStatus.OK].update;
      res.contentType = 'application/json';
      res
        .json(user)
        .status(HttpStatus.OK)
        .end();
      next();
    }),
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res, next) => {
      const userId = req.params.id;
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
        res.contentType = 'application/json';
        res
          .json(user)
          .status(HttpStatus.OK)
          .end();
      }
      next();
    }),
  )

  .put(
    catchError(async (req, res, next) => {
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
        res.contentType = 'application/json';
        res
          .json(user)
          .status(HttpStatus.OK)
          .end();
      }
      next();
    }),
  ) 

  .delete(
    catchError(async (req, res, next) => {
      const userId = req.params.id;

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

export {router};
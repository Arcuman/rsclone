import  {StatusCodes} from 'http-status-codes';
import { Request, Response, NextFunction} from 'express';
import  { ErrorHandler, catchError } from '@/helpers/errorHandler';
import statusCodes from './decks.constants';
import {decksService} from './decks.controller';
import { Deck} from './decks.model';

const router = require('express').Router();

router
  .route('/')
  .get(
    catchError(async (req:Request, res:Response, next:NextFunction) => {
      console.log('user_id=', req.user!.user_id);
      const decks:Deck[] = await decksService.getAll(req.user!.user_id);

      res.statusMessage = statusCodes[StatusCodes.OK].all;
      res
        .type('application/json')
        .json(decks)
        .status(StatusCodes.OK)
        .end();
      next();
    }),
  );

/* .post(
    catchError(async (req:Request, res:Response, next:NextFunction) => {
      const newUser = req.body;
      const user = await decksService.setDeckInfo(newUser);

      res.statusMessage = statusCodes[StatusCodes.OK].update;
      res
        .type('application/json')
        .json(user)
        .status(StatusCodes.OK)
        .end();
      next();
    }),
  );
*/
router
  .route('/:id')
  .get(
    catchError(async (req:Request, res:Response, next:NextFunction) => {
      const id = Number(req.params.id);
      if (!id) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST);
      }
      const deck = await decksService.getDeckByIdCards(id);

      if (!deck) {
        throw new ErrorHandler(
          StatusCodes.NOT_FOUND,
          statusCodes[StatusCodes.NOT_FOUND],
        );
      } else {
        res.statusMessage = statusCodes[StatusCodes.OK].all;
        res
          .type('application/json')
          .json(deck)
          .status(StatusCodes.OK)
          .end();
      }
      next();
    }),
  )

/* .put(
    catchError(async (req:Request, res:Response, next:NextFunction) => {
      const newUserData = req.body;
      const userId = Number(req.params.id);

      if (!userId) {
        throw new ErrorHandler(HttpStatus.BAD_REQUEST);
      }
      const user = await decksService.updateUserById(userId, newUserData);

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
  ) */

  .delete(
    catchError(async (req:Request, res:Response, next:NextFunction) => {
      const id = Number(req.params.id);

      if (!id) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST);
      }

      const deleteCount:number = await decksService.deleteDeckById(id);

      if (deleteCount === 0) {
        throw new ErrorHandler(
          StatusCodes.NOT_FOUND,
          statusCodes[StatusCodes.NOT_FOUND],
        );
      } else {
        res.statusMessage = statusCodes[StatusCodes.NO_CONTENT];
        res.status(StatusCodes.NO_CONTENT).end();
      }
      next();
    }),
  );
export {router as decksRouter};

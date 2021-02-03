import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { ErrorHandler, catchError } from '@/helpers/errorHandler';
import statusCodes from './decks.constants';
import { decksService } from './decks.controller';
import { Deck } from './decks.model';

const router = require('express').Router();

router
  .route('/')
  .get(
    catchError(async (req: Request, res: Response, next: NextFunction) => {
      const decks: Deck[] = await decksService.getAll(req.user!.user_id);

      res.statusMessage = statusCodes[StatusCodes.OK].all;
      res.type('application/json').json(decks).status(StatusCodes.OK).end();
      next();
    }),
  )

  .post(
    catchError(async (req: Request, res: Response, next: NextFunction) => {
      const newDeck: Deck = req.body;
      const userId: number = req.user!.user_id;

      if (!newDeck.name || !userId) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST);
      }
      const deckId = await decksService.createDeck({ ...newDeck, user_id: userId });

      res.statusMessage = statusCodes[StatusCodes.OK].create;
      res.type('application/json').json(deckId).status(StatusCodes.OK).end();
      next();
    }),
  );

router
  .route('/:id')
  .get(
    catchError(async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      if (!id) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST);
      }
      const deck = await decksService.getDeckByIdCards(id);

      if (!deck) {
        throw new ErrorHandler(StatusCodes.NOT_FOUND, statusCodes[StatusCodes.NOT_FOUND]);
      } else {
        res.statusMessage = statusCodes[StatusCodes.OK].all;
        res.type('application/json').json(deck).status(StatusCodes.OK).end();
      }
      next();
    }),
  )

  .put(
    catchError(async (req: Request, res: Response, next: NextFunction) => {
      const newDeck: Deck = req.body;
      const deckId = Number(req.params.id);

      if (!deckId || !newDeck.name) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST);
      }

      const deck = await decksService.updateDeckById(deckId, newDeck);

      if (!deck) {
        throw new ErrorHandler(StatusCodes.NOT_FOUND, statusCodes[StatusCodes.NOT_FOUND]);
      } else {
        res.statusMessage = statusCodes[StatusCodes.OK].update;
        res.type('application/json').json(deck).status(StatusCodes.OK).end();
      }
      next();
    }),
  )

  .delete(
    catchError(async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);

      if (!id) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST);
      }

      const deleteCount: number = await decksService.deleteDeckById(id);

      if (deleteCount === 0) {
        throw new ErrorHandler(StatusCodes.NOT_FOUND, statusCodes[StatusCodes.NOT_FOUND]);
      } else {
        res.statusMessage = statusCodes[StatusCodes.NO_CONTENT];
        res.status(StatusCodes.NO_CONTENT).end();
      }
      next();
    }),
  );
export { router as decksRouter };

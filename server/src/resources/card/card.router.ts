import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { ErrorHandler, catchError } from '@/helpers/errorHandler';
import statusCodes from './card.constants';
import { cardService } from './card.controller';
import { Card } from './card.model';

const router = require('express').Router();

router
  .route('/')
  .get(
    catchError(async (req: Request, res: Response, next: NextFunction) => {
      const cards: Card[] = await cardService.getAllByUserId(req.user!.user_id);

      res.statusMessage = statusCodes[StatusCodes.OK].all;
      res.type('application/json').json(cards).status(StatusCodes.OK).end();
      next();
    }),
  )

  .post(
    catchError(async (req: Request, res: Response, next: NextFunction) => {
      const newCard: Card = req.body;

      if (
        !newCard.name ||
        newCard.attack === undefined ||
        newCard.manaCost === undefined ||
        newCard.health === undefined ||
        newCard.isActive === undefined
      ) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST);
      }

      const card = await cardService.createCard(newCard);

      res.statusMessage = statusCodes[StatusCodes.OK].create;
      res.type('application/json').json(card).status(StatusCodes.OK).end();
      next();
    }),
  );

router.route('/all').get(
  catchError(async (req: Request, res: Response, next: NextFunction) => {
    const cards: Card[] = await cardService.getAll();

    res.statusMessage = statusCodes[StatusCodes.OK].all;
    res.type('application/json').json(cards).status(StatusCodes.OK).end();
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
      const card = await cardService.getCardById(id);

      if (!card) {
        throw new ErrorHandler(StatusCodes.NOT_FOUND, statusCodes[StatusCodes.NOT_FOUND]);
      } else {
        res.statusMessage = statusCodes[StatusCodes.OK].all;
        res.type('application/json').json(card).status(StatusCodes.OK).end();
      }
      next();
    }),
  )

  .put(
    catchError(async (req: Request, res: Response, next: NextFunction) => {
      const newCard: Card = req.body;
      const cardId = Number(req.params.id);

      if (
        !cardId ||
        !newCard.name ||
        newCard.attack === undefined ||
        newCard.manaCost === undefined ||
        newCard.health === undefined ||
        newCard.isActive === undefined
      ) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST);
      }

      const card = await cardService.updateCardById(cardId, newCard);

      if (!card) {
        throw new ErrorHandler(StatusCodes.NOT_FOUND, statusCodes[StatusCodes.NOT_FOUND]);
      } else {
        res.statusMessage = statusCodes[StatusCodes.OK].update;
        res.type('application/json').json(card).status(StatusCodes.OK).end();
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

      const deleteCount: number = await cardService.deleteCardById(id);

      if (deleteCount === 0) {
        throw new ErrorHandler(StatusCodes.NOT_FOUND, statusCodes[StatusCodes.NOT_FOUND]);
      } else {
        res.statusMessage = statusCodes[StatusCodes.NO_CONTENT];
        res.status(StatusCodes.NO_CONTENT).end();
      }
      next();
    }),
  );
export { router as cardRouter };

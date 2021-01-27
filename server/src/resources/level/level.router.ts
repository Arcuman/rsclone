import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { ErrorHandler, catchError } from '@/helpers/errorHandler';
import statusCodes from './level.constants';
import { levelService } from './level.controller';

const router = require('express').Router();

router.route('/:id').get(
  catchError(async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.params.id);
    if (!userId) {
      throw new ErrorHandler(HttpStatus.BAD_REQUEST);
    }
    const user = await levelService.getLevelById(userId);

    if (!user) {
      throw new ErrorHandler(HttpStatus.NOT_FOUND, statusCodes[HttpStatus.NOT_FOUND]);
    } else {
      res.statusMessage = statusCodes[HttpStatus.OK];
      res.type('application/json').json(user).status(HttpStatus.OK).end();
    }
    next();
  }),
);

export { router as levelRouter };

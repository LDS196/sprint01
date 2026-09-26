import { Request, Response } from 'express';
import { db } from '../../../db/in-memory.db';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';

export function getDriverHandler(req: Request<{ id: string }>, res: Response) {
  const driver = db.drivers.find((d) => d.id === +req.params.id);

  if (!driver) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{ field: 'id', message: 'Driver not found' }]),
      );
    return;
  }

  res.status(HttpStatus.Ok).send(driver);
}

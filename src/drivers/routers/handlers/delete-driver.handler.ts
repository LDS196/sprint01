import { Request, Response } from 'express';
import { db } from '../../../db/in-memory.db';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';

export function deleteDriverHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  const index = db.drivers.findIndex((d) => d.id === +req.params.id);

  if (index === -1) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{ field: 'id', message: 'Driver not found' }]),
      );
    return;
  }

  db.drivers.splice(index, 1);
  res.sendStatus(HttpStatus.NoContent);
}

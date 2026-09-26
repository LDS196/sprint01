import { Request, Response } from 'express';
import { DriverInputDto } from '../../dto/driver.input.dto';
import { db } from '../../../db/in-memory.db';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { validateDriverInputDto } from '../../validation/driver-input-dto.validation';

export function updateDriverHandler(
  req: Request<{ id: string }, {}, DriverInputDto>,
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

  const errors = validateDriverInputDto(req.body);

  if (errors.length > 0) {
    res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
    return;
  }

  // Обновляем поля из тела запроса, сохраняя служебные id и createdAt.
  db.drivers[index] = { ...db.drivers[index], ...req.body };

  res.sendStatus(HttpStatus.NoContent);
}

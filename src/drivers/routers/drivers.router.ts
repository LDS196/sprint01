import { Router } from 'express';
import { getDriverListHandler } from './handlers/get-driver-list.handler';
import { getDriverHandler } from './handlers/get-driver.handler';
import { createDriverHandler } from './handlers/create-driver.handler';
import { updateDriverHandler } from './handlers/update-driver.handler';
import { deleteDriverHandler } from './handlers/delete-driver.handler';
import { DRIVERS_ROUTES } from '../constants/drivers.paths';

export const driversRouter = Router({});

// Пути маршрутов берём из констант модуля, а не из строковых литералов.
driversRouter
  .get(DRIVERS_ROUTES.ROOT, getDriverListHandler)

  .get(DRIVERS_ROUTES.BY_ID, getDriverHandler)

  .post(DRIVERS_ROUTES.ROOT, createDriverHandler)

  .put(DRIVERS_ROUTES.BY_ID, updateDriverHandler)

  .delete(DRIVERS_ROUTES.BY_ID, deleteDriverHandler);

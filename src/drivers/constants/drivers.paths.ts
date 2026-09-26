// Базовый путь модуля водителей (задаётся при подключении роутера в setup-app).
export const DRIVERS_PATH = '/api/drivers';

// Относительные под-маршруты внутри роутера водителей — чтобы не хардкодить строки.
export const DRIVERS_ROUTES = {
  ROOT: '',
  BY_ID: '/:id',
} as const;

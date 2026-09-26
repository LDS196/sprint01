import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { openApiDocument } from './openapi-document';
import { SWAGGER_PATH } from './swagger.paths';

export function setupSwagger(app: Express): void {
  app.use(SWAGGER_PATH, swaggerUi.serve, swaggerUi.setup(openApiDocument));
}

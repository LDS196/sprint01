import { OpenAPIV3 } from 'openapi-types';
import { VehicleFeature } from '../../drivers/types/driver';

const vehicleFeatureSchema: OpenAPIV3.SchemaObject = {
  type: 'string',
  enum: Object.values(VehicleFeature),
  example: VehicleFeature.WiFi,
};

const driverInputDtoSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  additionalProperties: false,
  required: [
    'name',
    'phoneNumber',
    'email',
    'vehicleMake',
    'vehicleModel',
    'vehicleYear',
    'vehicleLicensePlate',
    'vehicleDescription',
    'vehicleFeatures',
  ],
  properties: {
    name: { type: 'string', minLength: 2, maxLength: 15, example: 'Valentin' },
    phoneNumber: {
      type: 'string',
      minLength: 8,
      maxLength: 15,
      example: '123-456-7890',
    },
    email: {
      type: 'string',
      format: 'email',
      minLength: 5,
      maxLength: 100,
      example: 'valentin@example.com',
    },
    vehicleMake: {
      type: 'string',
      minLength: 3,
      maxLength: 100,
      example: 'BMW',
    },
    vehicleModel: {
      type: 'string',
      minLength: 2,
      maxLength: 100,
      example: 'X5',
    },
    vehicleYear: { type: 'number', example: 2021 },
    vehicleLicensePlate: {
      type: 'string',
      minLength: 6,
      maxLength: 10,
      example: 'ABC-123',
    },
    vehicleDescription: {
      type: 'string',
      nullable: true,
      minLength: 10,
      maxLength: 200,
      example: null,
    },
    vehicleFeatures: {
      type: 'array',
      items: { $ref: '#/components/schemas/VehicleFeature' },
      example: [],
    },
  },
};

const driverSchema: OpenAPIV3.SchemaObject = {
  allOf: [
    { $ref: '#/components/schemas/DriverInputDto' },
    {
      type: 'object',
      required: ['id', 'createdAt'],
      properties: {
        id: { type: 'integer', example: 1 },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2026-09-26T16:00:00.000Z',
        },
      },
    },
  ],
};

const validationErrorSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  required: ['field', 'message'],
  properties: {
    field: { type: 'string', example: 'name' },
    message: { type: 'string', example: 'Invalid name' },
  },
};

const errorResponseSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  required: ['errorMessages'],
  properties: {
    errorMessages: {
      type: 'array',
      items: { $ref: '#/components/schemas/ValidationError' },
    },
  },
};

const errorResponseRef: OpenAPIV3.MediaTypeObject = {
  schema: { $ref: '#/components/schemas/ErrorResponse' },
};

export const openApiDocument: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Uber API',
    version: '1.0.0',
    description: 'API для управления водителями',
  },
  tags: [
    { name: 'Drivers', description: 'Водители' },
    { name: 'Testing', description: 'Служебные эндпоинты для e2e' },
  ],
  paths: {
    '/api/drivers': {
      get: {
        tags: ['Drivers'],
        summary: 'Список водителей',
        responses: {
          200: {
            description: 'Список водителей',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Driver' },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Drivers'],
        summary: 'Создать водителя',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/DriverInputDto' },
            },
          },
        },
        responses: {
          201: {
            description: 'Водитель создан',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Driver' },
              },
            },
          },
          400: {
            description: 'Ошибка валидации',
            content: { 'application/json': errorResponseRef },
          },
        },
      },
    },
    '/api/drivers/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
        },
      ],
      get: {
        tags: ['Drivers'],
        summary: 'Водитель по id',
        responses: {
          200: {
            description: 'Водитель найден',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Driver' },
              },
            },
          },
          404: {
            description: 'Водитель не найден',
            content: { 'application/json': errorResponseRef },
          },
        },
      },
      put: {
        tags: ['Drivers'],
        summary: 'Обновить водителя',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/DriverInputDto' },
            },
          },
        },
        responses: {
          204: { description: 'Обновлён' },
          400: {
            description: 'Ошибка валидации',
            content: { 'application/json': errorResponseRef },
          },
          404: {
            description: 'Водитель не найден',
            content: { 'application/json': errorResponseRef },
          },
        },
      },
      delete: {
        tags: ['Drivers'],
        summary: 'Удалить водителя',
        responses: {
          204: { description: 'Удалён' },
          404: {
            description: 'Водитель не найден',
            content: { 'application/json': errorResponseRef },
          },
        },
      },
    },
    '/api/testing/all-data': {
      delete: {
        tags: ['Testing'],
        summary: 'Очистить in-memory БД',
        responses: {
          204: { description: 'Данные удалены' },
        },
      },
    },
  },
  components: {
    schemas: {
      VehicleFeature: vehicleFeatureSchema,
      DriverInputDto: driverInputDtoSchema,
      Driver: driverSchema,
      ValidationError: validationErrorSchema,
      ErrorResponse: errorResponseSchema,
    },
  },
};

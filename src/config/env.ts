import 'dotenv/config';
import * as joi from 'joi';

interface Environment {
  projectId: string;
  keyFilename: string;
  port: string | number;
}

const envSchema = joi.object({
  PROJECT_ID: joi.string().required(),
  KEY_FILENAME: joi.string().required(),
  PORT: joi.number().required(),
});

const { value, error } = envSchema.validate(process.env, {
  allowUnknown: true,
  abortEarly: false,
});

if (error) {
  throw new Error(error.message);
}

export const env: Environment = {
  projectId: value.PROJECT_ID,
  keyFilename: value.KEY_FILENAME,
  port: value.PORT,
};

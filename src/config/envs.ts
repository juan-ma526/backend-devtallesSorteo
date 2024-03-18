import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),

  ClientID: get('ClientID').default('public').asString(),
  ClientSecret: get('ClientSecret').default('public').asString(),
  DevtallesID: get('DevtallesID').default('public').asString(),
  token: get('token').default('public').asString(),
  DATABASE_URL: get('DATABASE_URL').default('public').asString(),
  TOKEN_SECRET: get('TOKEN_SECRET').default('public').asString(),
  BACKEND_URL: get('BACKEND_URL').default('public').asString()

}




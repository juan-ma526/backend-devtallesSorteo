import jwt from 'jsonwebtoken';
import { envs } from './envs';

export const jwtAdapter = {
  generateToken: async (payload:any, duration = "2h", jwt_seed = envs.TOKEN_SECRET) => {
    return new Promise((resolve, reject) => {
      jwt.sign(`${payload}`, jwt_seed, (err:any, token:any) => {
        if (err) return reject(err);
        resolve(token);
      });
    });
  },



    validateToken:(token:string)=>{

      return new Promise( (resolve) => {

        jwt.verify( token, envs.TOKEN_SECRET, (err:any, decoded:any) => {
  
          if( err ) return resolve(null);
  
          resolve( decoded);
  
        });
      })
      
    }
}


import { Router } from 'express';
import { authController } from './controller';




export class DiscordAuthRoutes {


  static get routes(): Router {

    const router = Router();

    const controller=new authController();
    // Definir las rutas
    router.get('/discord/redirect', controller.getDiscordRedirect );



    return router;
  }


}
import { Router } from 'express';
import { ParticipanteController } from './controller';




export class ParticipanteRoutes {


  static get routes(): Router {

    const router = Router();

    const controller=new ParticipanteController();
    // Definir las rutas
    router.get('/', controller.getParticipante );
  
    router.delete('/:id', controller.deleteParticipanteOne );
    router.delete('/', controller.deleteParticipanteFull );


    return router;
  }


}
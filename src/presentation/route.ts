import { Router } from 'express';
import { UsuarioRoutes } from './usuario/route';
import { SorteoRoutes } from './sorteo/route';
import { ParticipanteRoutes } from './participante/route';
import { DiscordAuthRoutes } from './auth/route';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/usuario', UsuarioRoutes.routes );
    router.use('/api/sorteo', SorteoRoutes.routes );
    router.use('/api/participante', ParticipanteRoutes.routes );
    router.use('/api/auth', DiscordAuthRoutes.routes );



    return router;
  }


}
import { Router } from 'express';
import { usuarioController } from './controller';




export class UsuarioRoutes {


  static get routes(): Router {

    const router = Router();

    const controller=new usuarioController();
    // Definir las rutas
    router.post('/login', controller.loginUsuario );
    router.post('/logout', controller.logoutUser );
    router.post('/registro', controller.RegisterUsuario );

    router.delete('/:id', controller.DeleteUsuario );
    
    router.get('/validate-token', controller.validateTokenUser );





    return router;
  }


}
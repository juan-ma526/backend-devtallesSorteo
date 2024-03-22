import { Request, Response } from "express";
import { prisma } from "../../data";
import { bcryptAdapter, envs } from "../../config";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

export class usuarioController {
  constructor() {
    this.getAllUsuarios = this.getAllUsuarios.bind(this);
    this.loginUsuario = this.loginUsuario.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.RegisterUsuario = this.RegisterUsuario.bind(this);
    this.DeleteUsuario = this.DeleteUsuario.bind(this);
    this.validateTokenUser = this.validateTokenUser.bind(this);
  }

  async getAllUsuarios(req: Request, res: Response) {
    const usuariosData = await prisma.usuario.findMany({});

    return res.status(200).json({ usuariosData });
  }

  async loginUsuario(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const emailExist = await prisma.usuario.findUnique({
        where: {
          email: email,
        },
      });

      if (!emailExist)
        return res.status(400).json({
          error: "El email es incorrectos",
        });

      const passwordUnhashed = await compare(password, emailExist.password);

      if (!passwordUnhashed) {
        return res.status(400).json({
          error: "La contraseña es incorrecta",
        });
      }

      jwt.sign({ id: emailExist.id }, envs.TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {
        if (err) {
          throw err;
        }
        res.cookie("token", token, { httpOnly: true }).json({ id: emailExist.id });
      });
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  async RegisterUsuario(req: Request, res: Response) {
    const { email, password, name } = req.body; //esto me retorna el body del post
    const passwordHashed = bcryptAdapter.hash(password);

    const emailExist = await prisma.usuario.findUnique({
      where: {
        email: email,
      },
    });

    if (emailExist)
      return res.status(400).json({
        error: "El correo ya existe",
      });

    const userData = {
      email,
      password: passwordHashed,
      name,
    };
    const userPost = await prisma.usuario.create({
      data: userData,
    });

    if (!userPost) {
      return res.status(400).json({ error: "No se pudo registrar el usuario correctamente" });
    }

    return res.status(200).json({
      user: {
        id: userPost.id,
        email: userPost.email,
        name: userPost.name,
      },
    });
  }

  async DeleteUsuario(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "no colocaste un id valido" });

    try {
      const registroDelete = await prisma.usuario.delete({
        where: {
          id: id,
        },
      });
      const { password, ...rest } = registroDelete;
      return res.status(200).json({ res: "Usuario eliminado correctamente", rest });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "El usuario no existe" });
    }
  }

  async validateTokenUser(req: Request, res: Response) {
    try {
      const { token } = req.cookies;

      if (!token) {
        return res.status(401).json({ user: null });
      }
      if (token) {
        jwt.verify(token, envs.TOKEN_SECRET, (err: any, user: any) => {
          if (err) {
            throw err;
          }
          res.json(user);
        });
      } else {
        res.json({ user: null });
      }

      /*  const userData = await prisma.usuario.findUnique({
        where: {
          id: verifyToken,
        },
      }); */
    } catch (error) {
      return res.status(401).json(null);
    }
  }

  async logoutUser(req: Request, res: Response) {
    try {
      res.clearCookie("token");

      return res.sendStatus(200);
    } catch (error) {
      return res.status(401).json({ error: error });
    }
  }
}

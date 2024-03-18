import { Request, Response } from "express";
import { prisma } from "../../data";
import { envs } from "../../config";
import { format, parse } from "url";

export class authController {
  constructor() {
    this.getDiscordRedirect = this.getDiscordRedirect.bind(this);
  }

  async getDiscordRedirect(req: Request, res: Response) {
    try {
      const { query } = parse(req.url || "", true);
      const code = query.code as string;
      const sorteoId = query.state as string;

      if (code) {
        const formData = new URLSearchParams({
          client_id: envs.ClientID,
          client_secret: envs.ClientSecret,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: `${envs.BACKEND_URL}/api/auth/discord/redirect`,
        });

        const output = await fetch("https://discord.com/api/v10/oauth2/token", {
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
          },
          body: formData,
        });

        if (!output.ok) {
          throw new Error(`Error al obtener el token: ${output.status} ${output.statusText}`);
        }

        const outputData = await output.json();
        const access = outputData.access_token;

        const userInfoResponse = await fetch("https://discord.com/api/v10//users/@me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });

        const userServersResponse = await fetch("https://discord.com/api/v10//users/@me/guilds", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });

        if (!userInfoResponse.ok) {
          throw new Error(
            `Error al obtener la información del usuario: ${userInfoResponse.status} ${userInfoResponse.statusText}`
          );
        }

        if (!userServersResponse.ok) {
          throw new Error(
            `Error al obtener los servidores del usuario: ${userServersResponse.status} ${userServersResponse.statusText}`
          );
        }

        const userInfoData = await userInfoResponse.json();
        const userServerData = await userServersResponse.json();

        const devTallesID = process.env.DevtallesID;

        const serverFound = userServerData.find((server: any) => server.id === devTallesID);

        if (serverFound) {
          const participanteSelected = await prisma.participante.findFirst({
            where: {
              email: userInfoData.email,
              sorteoId,
            },
          });

          const sorteoSelected = await prisma.sorteo.findUnique({
            where: {
              id: sorteoId,
            },
            include: {
              participantes: true,
            },
          });

          if (participanteSelected && participanteSelected.id) {
            const participanteExistente = sorteoSelected!.participantes.filter(
              (participante) => participante.id === participanteSelected.id
            );
            if (participanteExistente.length > 0) {
              //REVISAR ESTE CODIGO
              res.writeHead(302, { Location: "http://localhost:3001/error" });
              res.end();
              return;
            }
          } else {
            await prisma.participante.create({
              data: {
                email: userInfoData.email,
                username: userInfoData.username,
                avatar: userInfoData.avatar,
                sorteoId: sorteoSelected!.id,
              },
            });
          }
        } else {
          res.writeHead(302, { Location: "http://localhost:3001/user-notfound" });
          res.end();
          return;
        }

        // Supongamos que 'req' es de tipo IncomingMessage y 'res' es de tipo ServerResponse
        res.writeHead(302, { Location: "http://localhost:3001/success" });
        res.end();
      }
    } catch (error) {
      return res.status(500).json({ error: "error en la solicitud" });
    }
  }
}

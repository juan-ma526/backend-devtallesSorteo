import express, { Router } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = "public" } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(
      cors({
        origin: [
          "https://devtalles-codequest-sorteos-gamma.vercel.app",
          "http://localhost:3000",
          "http://localhost:3001",
          "https://backend-devtallessorteo.onrender.com",
        ],
        allowedHeaders: [
          "Access-Control-Allow-Credentials",
          "Access-Control-Allow-Headers",
          "Access-Control-Allow-Origin",
          "Access-Control-Allow-Cross-Origin",
          "Access-Control-Allow-Methods",
          "Origin",
          "WithCredentials",
          "X-Requested-Wwith",
          "Content-Type",
          "Accept",
          "Authorization",
          "X-HTTP-Method-Override",
          "Set-Cookie",
          "Cookie",
          "Request",
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        optionsSuccessStatus: 200,
      })
    );
    this.app.use(morgan("dev"));
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.use(cookieParser());

    //* Routes
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

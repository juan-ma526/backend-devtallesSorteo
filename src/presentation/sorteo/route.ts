import { Router } from "express";
import { SorteoController } from "./controller";

export class SorteoRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new SorteoController();
    // Definir las rutas
    router.get("/", controller.getSorteos);
    router.get("/", controller.getSorteosOne);
    router.post("/", controller.postSorteos);
    router.patch("/:id", controller.patchSorteos);

    router.delete("/:id", controller.deleteSorteos);

    return router;
  }
}

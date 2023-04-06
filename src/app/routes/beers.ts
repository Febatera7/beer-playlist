import { BeersControllers } from "../controllers";
import { Router } from "express";

const {
    createController,
    deleteController,
    getAllController,
    updateController,
} = BeersControllers;

const beerRoutes: Router = Router();

beerRoutes.get("/", getAllController);
beerRoutes.post("/", createController);
beerRoutes.patch("/:beerId", updateController);
beerRoutes.delete("/:beerId", deleteController);

export default beerRoutes;

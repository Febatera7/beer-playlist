import { Router } from "express";
import beersRoutes from "./beers";
import playlistsRoutes from "./playlists";
import swaggerDocs from "../documentation/swagger";
import swaggerUi from "swagger-ui-express";

const routes: Router = Router();

routes.use("/beers", beersRoutes);
routes.use("/playlists", playlistsRoutes);
routes.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default routes;

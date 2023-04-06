import { Router } from "express";
import beersRoutes from "./beers";
import playlistsRoutes from "./playlists";

const routes: Router = Router();

routes.use("/beers", beersRoutes);
routes.use("/playlists", playlistsRoutes);

export default routes;

import { PlaylistsControllers } from "../controllers";
import { Router } from "express";

const {
    getPlaylistByTemperatureController,
} = PlaylistsControllers;

const playlistsRoutes: Router = Router();

playlistsRoutes.get("/:temperature", getPlaylistByTemperatureController);

export default playlistsRoutes;

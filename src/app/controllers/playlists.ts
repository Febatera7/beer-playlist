import { BeersServices, PlaylistsServices } from "../services";
import { Request, Response } from "express";
import { Beers } from "../../database/entities/beers";
import { PlaylistsReturn } from "../interfaces/playlists";

const {
    getAllService,
} = BeersServices;

const {
    getPlaylistByTemperatureService,
} = PlaylistsServices;

const getPlaylistByTemperatureController = async (req: Request, res: Response): Promise<void> => {
    try {
        const temperature: number = parseInt(req.params.temperature);

        const beers: Beers[] = await getAllService();

        const response: PlaylistsReturn = await getPlaylistByTemperatureService(temperature, beers);

        if(response instanceof Error) throw response;

        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message });
    }
};

export default { getPlaylistByTemperatureController };

import { CreateBeerBody, UpdateBeerBody } from "../interfaces/beers";
import { Request, Response } from "express";
import { Beers } from "../../database/entities/beers";
import { BeersServices } from "../services";
import { MessageReturn } from "../interfaces/global";

const {
    createOneService,
    deleteOneService,
    getAllService,
    udpateOneService,
} = BeersServices;

const getAllController = async (req: Request, res: Response): Promise<void> => {
    try {
        const response: Beers[] = await getAllService();

        if(response instanceof Error) throw response;

        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message });
    }
};

const createController = async (req: Request, res: Response): Promise<void> => {
    try {
        const data: CreateBeerBody = req.body;

        const response: MessageReturn = await createOneService(data);

        if(response instanceof Error) throw response;

        res.status(201).send(response);
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message });
    }
};

const updateController = async (req: Request, res: Response): Promise<void> => {
    try {
        const beerId: string = req.params.beerId;
        const data: UpdateBeerBody = req.body;

        const response: MessageReturn = await udpateOneService(beerId, data);

        if(response instanceof Error) throw response;

        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message });
    }
};

const deleteController = async (req: Request, res: Response): Promise<void> => {
    try {
        const beerId: string = req.params.beerId;

        const response: MessageReturn = await deleteOneService(beerId);

        if(response instanceof Error) throw response;

        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message });
    }
};

export default {
    getAllController,
    createController,
    updateController,
    deleteController,
};

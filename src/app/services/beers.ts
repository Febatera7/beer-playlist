import { CreateBeerBody, CreateBeerData, UpdateBeerBody } from "../interfaces/beers";
import { Beers } from "../../database/entities/beers";
import { BeersRepositories } from "../repositories";
import { MessageReturn } from "../interfaces/global";
import { v4 } from "uuid";

const {
    createOneRepository,
    deleteOneRepository,
    getAllRepository,
    getByStyleRepository,
    updateOneRepository,
} = BeersRepositories;

const getAllService = async (): Promise<Beers[]> => {
    try {
        const getAll: Beers[] = await getAllRepository();

        return getAll;
    } catch (error) {
        return error;
    }
};

const createOneService = async (data: CreateBeerBody): Promise<MessageReturn> => {
    try {
        const beerStyleExists = await verifyBeerStyleService(data.beerStyle);

        if (beerStyleExists) throw new Error("Beer style already registered.");

        const uuid = v4();

        const createData: CreateBeerData = {
            id: uuid,
            ...data
        };

        const createOne: MessageReturn = await createOneRepository(createData);

        return createOne;
    } catch (error) {
        return error;
    }
};

const udpateOneService = async (beerId: string, data: UpdateBeerBody): Promise<MessageReturn> => {
    try {
        if (data.beerStyle) {
            const beerStyleExists = await verifyBeerStyleService(data.beerStyle);

            if (beerStyleExists) throw new Error("Beer style already registered.");
        }

        const updateOne: MessageReturn = await updateOneRepository(beerId, data);

        return updateOne;
    } catch (error) {
        return error;
    }
};

const deleteOneService = async (beerId: string): Promise<MessageReturn> => {
    try {
        const deleteOne: MessageReturn = await deleteOneRepository(beerId);

        return deleteOne;
    } catch (error) {
        return error;
    }
};

const verifyBeerStyleService = async (beerStyle: string): Promise<boolean> => {
    try {
        const registeredBeer = await getByStyleRepository(beerStyle);

        return registeredBeer ? true : false;
    } catch (error) {
        return error;
    }
};

export default {
    getAllService,
    createOneService,
    udpateOneService,
    deleteOneService,
};

import { CreateBeerData, UpdateBeerBody } from "../interfaces/beers";
import { Beers } from "../../database/entities/beers";
import { MessageReturn } from "../interfaces/global";
import { Repository } from "typeorm";
import { AppDataSource as dataSource } from "../../database/dataSource";

const beersRepository: Repository<Beers> = dataSource.getRepository(Beers);

const getAllRepository = async (): Promise<Beers[]> => {
    try {
        const getBeers: Beers[] = await beersRepository.find();

        return getBeers;
    } catch (error) {
        return error;
    }
};

const getByStyleRepository = async(beerStyle: string): Promise<Beers> => {
    try {
        const getBeer: Beers = await beersRepository.findOneBy({ beerStyle });

        return getBeer;
    } catch (error) {
        return error;
    }
};

const createOneRepository = async (data: CreateBeerData): Promise<MessageReturn> => {
    try {
        await beersRepository.createQueryBuilder().insert().values(data).execute();

        return { message: `Beer ${data.beerStyle} succesfully created.` };
    } catch (error) {
        return error;
    }
};

const updateOneRepository = async (beerId: string, data: UpdateBeerBody) => {
    try {
        await beersRepository
            .createQueryBuilder()
            .update()
            .set({ ...data })
            .where("id = :id", { id: beerId })
            .execute();

        return { message: "Beer succesfully updated." };
    } catch (error) {
        return error;
    }
};

const deleteOneRepository = async (beerId: string) => {
    try {
        await beersRepository.createQueryBuilder().delete().where("id = :id", { id: beerId }).execute();

        return { message: "Beer succesfully deleted." };
    } catch (error) {
        return error;
    }
};

export default {
    getAllRepository,
    getByStyleRepository,
    createOneRepository,
    updateOneRepository,
    deleteOneRepository,
};

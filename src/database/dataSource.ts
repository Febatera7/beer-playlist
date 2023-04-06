import { Beers } from "./entities/beers";
import { DataSource } from "typeorm";

export const AppDataSource: DataSource = new DataSource({
    type: "sqlite",
    database: "./src/database/database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Beers],
});

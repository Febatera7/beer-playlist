import { AppDataSource } from "./dataSource";

const databaseConnect = (): void => {
    AppDataSource.initialize().then(() => {
        console.info("Beer Playlist database on");
    }).catch(error => console.error(`Beer Playlist app database error: ${error}`));
};

export default databaseConnect;

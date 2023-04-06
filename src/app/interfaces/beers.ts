export interface CreateBeerBody {
    beerStyle: string,
    minTemperature: number,
    maxTemperature: number,
}

export interface CreateBeerData {
    id: string,
    beerStyle: string,
    minTemperature: number,
    maxTemperature: number,
}

export interface UpdateBeerBody {
    beerStyle?: string,
    minTemperature?: number,
    maxTemperature?: number,
}

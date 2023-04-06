import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Beers {
    @PrimaryColumn("uuid")
    readonly id: string;

    @Column("varchar", { length: 80 })
    beerStyle: string;

    @Column("int")
    minTemperature: number;

    @Column("int")
    maxTemperature: number;
} 

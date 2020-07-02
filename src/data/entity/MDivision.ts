import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("divisions")
export class MDivision {

    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id!: number;

    @Column({ type: "varchar", length: 100, name: "name", unique: true })
    name!: string;
}
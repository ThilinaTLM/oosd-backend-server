import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class MUser {

    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id!: number;

    @Column({ type: "varchar", length: 20, name: "first_name" })
    firstName!: string;

    @Column({ type: "varchar", length: 20, name: "last_name" })
    lastName!: string;

    @Column({ type: "varchar", length: 50, name: "email", unique: true })
    email!: string;

    @Column({ type: "varchar", length: 12, name: "telephone", unique: true })
    telephone!: string;

    // @Column({name: "divisional_office"})
    // divisionalOffice: Division

    @Column({ type: "varchar", length: 12, name: "role", unique: true })
    role!: string;

}

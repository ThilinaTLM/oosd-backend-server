import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MDivision } from "./MDivision";

@Entity("customers")
export class MCustomer {

    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id!: number;

    @Column({ type: "varchar", length: 255, name: "full_name" })
    fullName!: string;

    @Column({ type: "varchar", length: 15, name: "nic_number", unique: true })
    nic!: string;

    @Column({ type: "varchar", length: 50, name: "email", nullable: true })
    email!: string;

    @Column({ type: "varchar", length: 12, name: "telephone", nullable: true })
    telephone!: string;

    @Column({ type: "text", name: "address" })
    address!: string;

    @ManyToOne(type => MDivision, dsOffice => dsOffice.id)
    dsOffice!: MDivision;

    @Column({ type: "varchar", length: 100, name: "grama_niladhari_office" })
    gnOffice!: string;

}

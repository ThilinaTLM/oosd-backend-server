import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { MUser } from "./MUser";

@Entity("auth_details")
export class MAuth {

    @OneToOne(type => MUser, user => user.id, { primary: true, nullable: false })
    @JoinColumn({ name: "user_id", referencedColumnName: "id" })
    user!: MUser;

    @Column({ type: "varchar", length: 50, name: "user_name", unique: true })
    username!: string;

    @Column({ type: "varchar", length: 100, name: "hash" })
    hash!: string;

}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    email!: string;

    @Column({ unique: true })
    nickname!: string;

    @Column()
    password!: string;

    @Column('simple-array', { nullable: true })
    streamingProviders!: string[];

    @Column({ type: 'date' })
    birthDate!: Date;

}


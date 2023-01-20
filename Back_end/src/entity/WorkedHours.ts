import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IsOptional, Length, MaxLength, IsNotEmpty, IsEmail, IsPhoneNumber, Matches } from 'class-validator'
import { employee } from './employee'

@Entity()
export class WorkedHours {
    @PrimaryGeneratedColumn()
    @IsOptional()
    id: number;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    @OneToOne(type => employee) @JoinColumn({ name: 'employee' })
    employee: employee;

    @Column({ type: 'date', nullable: false })
    @IsNotEmpty({ message: 'Given Name is Required' })
    Date: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    TotalIncome: number;
}

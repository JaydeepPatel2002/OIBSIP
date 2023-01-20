import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IsOptional, Length, MaxLength, IsNotEmpty } from 'class-validator'

@Entity()
export class employee {
    @PrimaryGeneratedColumn()
    @IsOptional()
    id: number;

    @Column('nvarchar', { length: 50, nullable: false })
    @Length(1, 50, { message: 'Given Name must be from $constraint1 to $constraint2 characters ' })
    @IsNotEmpty({ message: 'Given Name is Required' })
    employeeName: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    perHourPay: number;

    @Column({ type: 'date', nullable: false })
    @IsNotEmpty({ message: 'Given Name is Required' })
    joiningDate: string;
}

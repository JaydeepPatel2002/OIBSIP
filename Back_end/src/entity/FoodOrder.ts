/* eslint-disable */
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {IsOptional, Length, MaxLength, IsNotEmpty, IsEmail, IsPhoneNumber, Matches} from 'class-validator';

@Entity()
export class FoodOrder {

    @PrimaryGeneratedColumn()
    @IsOptional()
    id: number;

    @Column('nvarchar', {length: 50, nullable: false})
    @Length(1, 50, {message: 'Given Name must be from $constraint1 to $constraint2 characters '})
    @IsNotEmpty({message: 'customer Name is Required'})
    CustomerName: string;

    @Column('nvarchar', {length: 50, nullable: false})
    @Length(1, 50, {message: 'Given Name must be from $constraint1 to $constraint2 characters '})
    @IsNotEmpty({message: 'burger is Required'})
    burger: string;

    @Column('nvarchar', {length: 50, nullable: false})
    @Length(1, 50, {message: 'Given Name must be from $constraint1 to $constraint2 characters '})
    @IsNotEmpty({message: 'drink is Required'})
    Drink: string;

    @Column('nvarchar', {length: 50, nullable: false})
    @Length(1, 50, {message: 'Given Name must be from $constraint1 to $constraint2 characters '})
    @IsNotEmpty({message: 'side item is Required'})
    SideItem: string;

    @Column('nvarchar', {length: 300, nullable: true})
    @Length(1, 300, {message: 'additional note must be from $constraint1 to $constraint2 characters '})
    AdditionalNote: string;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    price: number;


}

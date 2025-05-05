import { Prop } from "@nestjs/mongoose";
import {IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
    
    // @IsNotEmpty()
    @IsNotEmpty({message:'shirt is required'})
    shirt: string;

    
    @IsNotEmpty({message:'pant is required'})
    pant: string;


    @IsNotEmpty({message:'shoes is required'})
    shoes: string;

    
    @IsNotEmpty({message:'phone is required and should be unique'})
    phone: number;
    

}
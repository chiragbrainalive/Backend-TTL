// src/sales/sales.controller.ts

import { BadRequestException,InternalServerErrorException, Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSalesTransactionDto } from '../dto/sales-transaction.dto';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

@Post('sales-transaction')
async createTransaction(@Body() dto: CreateSalesTransactionDto) {
  if (!dto) {
    console.error('CreateSalesTransactionDto is undefined or null');
    throw new BadRequestException({ message: 'Required Body is undefined or null' });
  }

  try {
    const transaction = await this.salesService.createTransaction(dto);
    await this.salesService.aggregateHourlySales();
    return transaction;
  } catch (error) {
    console.error('Error in sales transaction:', error.message);
    throw new InternalServerErrorException({ message: 'Failed to create sales transaction', error: error.message });
  }
}

  @Get('hourly')
    aggregateHourlySales() {
        return this.salesService.aggregateHourlySales();
    }

  @Get('GetAllhourlySales')
  async getAllHourlySales() {
    return this.salesService.getAllHourlySales();
  }
}

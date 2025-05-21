// src/sales/sales.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SalesTransaction, SalesTransactionSchema } from '../../schema/sales-transaction.schema';
import { HourlySalesSummary, HourlySalesSummarySchema } from '../../schema/hourly-sales-summary.schema';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SalesTransaction.name, schema: SalesTransactionSchema },
      { name: HourlySalesSummary.name, schema: HourlySalesSummarySchema },
    ]),
  ],
  providers: [SalesService],
  controllers: [SalesController],
})
export class SalesModule {}

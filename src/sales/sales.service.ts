import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SalesTransaction } from '../../schema/sales-transaction.schema';
import { HourlySalesSummary } from '../../schema/hourly-sales-summary.schema';
import { CreateSalesTransactionDto } from '../dto/sales-transaction.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(SalesTransaction.name)
    private readonly salesModel: Model<SalesTransaction>,
    @InjectModel(HourlySalesSummary.name)
    private readonly summaryModel: Model<HourlySalesSummary>,
  ) {}

  async createTransaction(createSaleDto: CreateSalesTransactionDto) {
    try {
      return await this.salesModel.create(createSaleDto);
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }
  
  async getAllHourlySales() {
    try {
      return await this.summaryModel.find().exec();
    } catch (error) {
      console.error('Error fetching hourly sales:', error);
      throw error;
    }
  }


  async aggregateHourlySales() {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
    try {
      const pipeline = [
        {
          $match: {
            timestamp: {
              $gte: startOfDay,
              $lt: endOfDay,
            },
          },
        },
        {
          $group: {
            _id: {
              storeId: '$storeId',
              hour: {
                $dateTrunc: {
                  date: '$timestamp',
                  unit: 'hour',
                },
              },
            },
            totalSales: { $sum: '$amount' },
          },
        },
        {
          $project: {
            storeId: '$_id.storeId',
            hour: '$_id.hour',
            totalSales: 1,
            timestamp: '$_id.hour',
            _id: 0,
          },
        },
      ];
  
      const result = await this.salesModel.aggregate(pipeline);


        const bulkOps = result.map(summary => ({
        updateOne: {
          filter: {
            storeId: summary.storeId,
            hour: summary.hour,
          },
          update: {
            $set: {
              totalSales: summary.totalSales,
              timestamp: summary.timestamp,
            },
          },
          upsert: true,
        },
      }));

      if (bulkOps.length > 0) {
        await this.summaryModel.bulkWrite(bulkOps);
      }

      return result;
    } catch (error) {
      console.error('Error aggregating hourly sales:', error);
      throw error;
    }
  }
  
  //     for (const summary of result) {
  //       await this.summaryModel.updateOne(
  //         {
  //           storeId: summary.storeId,
  //           hour: summary.hour,
  //         },
  //         {
  //           $set: {
  //             totalSales: summary.totalSales,
  //             timestamp: summary.timestamp,
  //           },
  //         },
  //         { upsert: true }
  //       );
  //     }
  
  //     return result;
  //   } catch (error) {
  //     console.error('Error aggregating hourly sales:', error);
  //     throw error;
  //   }
  // }
  
}

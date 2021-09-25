import { Module } from '@nestjs/common';
import { BandaService } from './banda.service';
import { PrismaService } from './prisma.service';
import { BandaController } from './banda.controller';

@Module({
  imports: [],
  providers: [BandaService, PrismaService],
  exports: [BandaService],
  controllers: [BandaController],
})
export class BandaModule {}

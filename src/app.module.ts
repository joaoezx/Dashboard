import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      autoLoadEntities: true, // trazer as entidades automaticamente
      synchronize: true,
    }),
    BankAccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.config'; // <-- FIX: Import the DatabaseModule here

@Module({
  imports: [
    DatabaseModule, // <-- FIX: Use the DatabaseModule in the imports array
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
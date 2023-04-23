import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { FilesService } from "../files/files.service";
import { PdfService } from "../pdf/pdf.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [UsersService, FilesService, PdfService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}

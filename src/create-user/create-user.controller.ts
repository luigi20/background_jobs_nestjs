import { Body, Controller, Post } from '@nestjs/common';
import { SendMailProducerService } from '../jobs/sendMail-producer-service';
import { createUserDTO } from './create-userDTO';

@Controller('create-user')
export class CreateUserController {
  constructor(private sendMailService: SendMailProducerService) { }
  @Post('/')
  public createUser(@Body() createUser: createUserDTO) {
    this.sendMailService.sendMailJob(createUser);
    return createUser;
  }
}

import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { createUserDTO } from '../create-user/create-userDTO';

@Injectable()
class SendMailProducerService {
  constructor(@InjectQueue('sendMail-queue') private queue: Queue) { }
  public async sendMailJob(createUserDTO: createUserDTO) {
    await this.queue.add('sendMailJob', createUserDTO, {
      delay: 5000,
      attempts: 4,
    });
  }
}
export { SendMailProducerService };

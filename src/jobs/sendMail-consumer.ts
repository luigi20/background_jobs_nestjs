import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { createUserDTO } from '../create-user/create-userDTO';

@Processor('sendMail-queue')
class SendMailConsumer {
  constructor(private mailService: MailerService) { }
  @Process('sendMailJob')
  public async sendMailJob(job: Job<createUserDTO>) {
    const { data } = job;
    this.mailService.sendMail({
      to: data.email,
      from: 'Equipe code',
      subject: 'Bem vindo',
      text: 'Olá seu merda',
    });
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log('Completed: ' + job.name);
  }

  @OnQueueProgress()
  onQueueProgress(job: Job) {
    console.log('Progress: ' + job.name);
  }

  @OnQueueActive()
  OnQueueActive(job: Job) {
    console.log('Active: ' + job.name);
  }
}
export { SendMailConsumer };

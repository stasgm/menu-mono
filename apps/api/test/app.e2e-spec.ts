import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { MailerService } from '@nestjs-modules/mailer';
// import { mock, mockReset } from 'jest-mock-extended';

import { AppModule } from './../src/app.module';

const sendMailMock = jest.fn();

const MailerServiceMock = {
  getOne: jest.fn().mockImplementation(() => ({
    createTransport: jest.fn().mockReturnValue({
      sendMail: sendMailMock,
    }),
  })),
};

jest.mock('nodemailer');

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: MailerService,
          useValue: MailerServiceMock,
        },
      ],
    })
      .useMocker(() => {
        return {};
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });
});

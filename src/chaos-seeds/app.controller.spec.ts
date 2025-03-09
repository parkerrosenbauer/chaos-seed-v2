import { Test, TestingModule } from '@nestjs/testing';
import { ChaosSeedController } from './chaos-seeds/chaos-seeds.controller';
import { AppService } from './chaos-seeds/app.service';

describe('AppController', () => {
  let appController: ChaosSeedController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChaosSeedController],
      providers: [AppService],
    }).compile();

    appController = app.get<ChaosSeedController>(ChaosSeedController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

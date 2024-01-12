import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // TODO: 커스텀 에러를 던지기 위해서는 아래 옵션을 꺼야한다고 하는데 확인 필요
  // const app = await NestFactory.create(AppModule, { abortOnError: false });
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

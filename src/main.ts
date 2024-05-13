import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1']
  })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  const options = new DocumentBuilder()
    .setTitle('crm接口文档')
    .setDescription('用于前端的操作。。')
    .setVersion('1')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/api-docs', app, document)
  await app.listen(3000)
}
bootstrap()

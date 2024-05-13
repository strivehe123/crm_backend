import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import { DataSource, DataSourceOptions } from 'typeorm'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
function getEnv(env: string): Record<string, unknown> {
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env))
  }
}
function buildConnections() {
  const defaultConfig = getEnv('.env')
  const envConfig = getEnv(`.env${process.env.NODE_ENV || 'development'}`)
  const config = { ...defaultConfig, ...envConfig }
  const entitiesDir =
    process.env.NODE_ENV === 'test' ? [__dirname + '/**/*.entity.ts'] : [__dirname + '/**/*.entity{.js,.ts}']
  return {
    type: config['DB_TYPE'],
    host: config['DB_HOST'],
    prot: config['DB_HOST'],
    username: config['DB_USERNAME'],
    database: config['DB_NAME'],
    logging: false,
    synchronize: true,
    entities: entitiesDir
  } as TypeOrmModuleOptions
}

export const connectionParams = buildConnections()
export default new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/**'],
  subscribers: []
} as DataSourceOptions)

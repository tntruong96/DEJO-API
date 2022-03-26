

export = {
  type: 'mysql',
  url: process.env.DATABASE_URL_MG,
  migrations: [
    'migrations/*.{ts,js}',
  ],
  entities: ['src/modules/**/*.ts'],
  synchronize: false,
  cli: {
    migrationsDir: 'migrations',
    entitiesDir: 'src/modules/**/*.ts'
  },
}
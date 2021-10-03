export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/vidly',
  port: process.env.PORT || 5051,
  jwtSecret: process.env.JWT_SECRET || 'localSecret-j67asdasdasO=5+-a55a9xasdasdw7yCH',
  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || '5432',
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || '123456',
    name: process.env.DATABASE_NAME || process.env.NODE_ENV === 'test' ? 'test' : 'vidly'
  }
}

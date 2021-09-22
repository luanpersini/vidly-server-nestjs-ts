export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/vidly',
  port: process.env.PORT || 5051,
  jwtSecret: process.env.JWT_SECRET || 'localSecret-j67asdasdasO=5+-a55a9xasdasdw7yCH'
}

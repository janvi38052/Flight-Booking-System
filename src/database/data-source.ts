import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

module.exports = new DataSource({
  type: process.env.DB_TYPE as "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    __dirname + "/../flights/flights.entity.ts",
    __dirname + "/../bookings/bookings.entity.ts",
    __dirname + "/../passengers/passengers.entity.ts"
  ],
  migrations: ["src/database/migrations/*.ts"],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
});

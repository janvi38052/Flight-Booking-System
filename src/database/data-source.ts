
import { Flight } from "src/flights/flights.entity";
import { Booking } from "src/bookings/bookings.entity";
import { Passenger } from "src/passengers/passengers.entity";

const { DataSource } = require("typeorm");

module.exports = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "api",
  entities: [Flight,Passenger,Booking],
  migrations: ["src/database/migrations/*.ts"],  
  synchronize: false,  
  logging: true,
});

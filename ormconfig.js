require("dotenv").config();

module.exports = {
	type: "postgres",
	host: process.env.TYPEORM_HOST,
	port: parseInt(process.env.TYPEORM_PORT, 10),
	username: process.env.TYPEORM_USERNAME,
	password: process.env.TYPEORM_PASSWORD,
	database: process.env.TYPEORM_DATABASE,
	logging: true,
	synchronize: true,
	entities: ["dist/**/*.entity{.ts,.js}"]
}
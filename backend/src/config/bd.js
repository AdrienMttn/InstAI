import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connection = await mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Gestion automatique des connexions perdues
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000, // 10 secondes
  // Reconnexion automatique en cas d'erreur
  connectTimeout: 10000, // 10 secondes
  // Test de la connexion avant de la réutiliser
  maxIdle: 10, // Nombre max de connexions inactives
  idleTimeout: 60000,
});

export default connection;

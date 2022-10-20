export const MYSQL_USERNAME = process.env.MYSQL_USERNAME || "root";
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "family";
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "family";
export const MYSQL_PORT = Number(process.env.MYSQL_PORT) || 3306;
export const MYSQL_HOST = process.env.MYSQL_HOST || "127.0.0.1";

export const SESSION = "SESSION"
export const ROLE_PERMISSION = {
    "manager": {
        "/api/Projects": ["GET", "POST", "PATCH", "PUT"],
        "/api/Workers": ["GET", "POST", "PATCH", "DELETE"],
        "/api/Charts": ["GET", "POST"],
        "/api/Logs": ["GET", "POST"],
        "/api/Sessions": ["GET", "POST"],
        "/api/Tickets": ["GET", "POST", "PUT"],
        "/api/Settlements": ["GET", "POST", "PUT", "DELETE"],
    },
    "staff": {
        "/api/Projects": ["GET"],
    }
}

import { Pool } from "pg";
import { config } from "dotenv";

// Using Volumes for local machines, When using CI/CD Pipelines use Secrets Managers
config({ path: "/etc/express_env/.env" });

const { DB_CONN_LINK } = process.env;

const pool = new Pool({
  connectionString: DB_CONN_LINK,
});

export default pool;

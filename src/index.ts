import "dotenv/config";
import app from "./app";
import { log } from "./utils/logger";

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

app.listen(PORT, () => {
  log.info(`Server running on http://localhost:${PORT}`);
});

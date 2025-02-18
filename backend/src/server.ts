import app from "./app";
import cron from "node-cron";
import { removeExpiredRentals } from "./controllers/transactionController";


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});





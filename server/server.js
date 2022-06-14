require("dotenv").config();
const http = require("http");
const app = require("./app/app");
const connectDb = require("./db/db");
const server = http.createServer(app);

const PORT = process.env.PORT || 8000;
connectDb(process.env.DATABASE_URI).then(() => {
  console.log("Database Connected Successfully.")
  server.listen(PORT, () => {
    console.log(`Server Listing on PORT ${PORT}.`);
  });
}).catch(error => {
  console.log("App couldn't start due to database connection error");
  console.log(error);
})

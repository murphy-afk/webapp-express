import express from "express";
import router from "./routers/movies.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const port = process.env.SERVER_PORT;

app.use("/api/movies", router);

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
import express from "express";
import router from "./routers/movies.js";
import errorHandler from "./middlewares/errorHandler.js";
import pageNotFound from "./middlewares/pageNotFound.js";
import cors from "cors"

const app = express();
const port = process.env.SERVER_PORT;

app.use(cors({
  origin: "http://localhost:5173",
}))

app.use("/api/movies", router);

app.use(errorHandler);
app.use(pageNotFound);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
import express from "express";
import router from "./routers/movies.js";
import errorHandler from "./middlewares/errorHandler.js";
import pageNotFound from "./middlewares/pageNotFound.js";
import cors from "cors";

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.static("public"));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);


app.use("/api/movies", router);

app.use(errorHandler);
app.use(pageNotFound);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
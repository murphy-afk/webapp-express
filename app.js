import express from "express";
import router from "./routers/movies.js";

const app = express();
const port = process.env.SERVER_PORT;

app.use("/api/books", router);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
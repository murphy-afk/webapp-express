import express from "express";

const app = express();
const port = process.env.SERVER_PORT;

app.get("/api/books", (req, res) => {
  res.send('server works')
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
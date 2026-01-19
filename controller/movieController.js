import connection from "../database/dbConnection.js"

function index(req, res, next) {
  const query = "SELECT * FROM movies"
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500)
      return res.json({
        error: process.env.ENVIRONMENT === "dev" ? err : "INTERNAL ERROR",
        message: "Internal sever error"
      })
    }
    return res.json({
      results: result,
    })
  })
}

function show(req, res, next) {
  const id = req.params.id;
  const query = "SELECT * FROM movies WHERE id = ?";

  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500)
      return res.json({
        error: process.env.ENVIRONMENT === "dev" ? err : "INTERNAL ERROR",
        message: "Internal sever error"
      })
    }
    if (result.length === 0) {
      res.status(404);
      return res.json({
        error: "NOT FOUND",
        message: "Movie not found",
      });
    }
    const movie = result[0];
    return res.json({
      results: movie,
    })

  })

}

const movieController = {
  index,
  show
}

export default movieController
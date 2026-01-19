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

// function show() {

// }

const movieController = {
  index,
  // show
}

export default movieController
import connection from "../database/dbConnection.js"
import slugify from "slugify";

function index(req, res, next) {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const itemsPerPage = 3;
  const offset = (page - 1) * itemsPerPage;

  const query = `
    SELECT movies.*, 
    ROUND(AVG(reviews.vote), 2) AS avg_vote 
    FROM movies 
    LEFT JOIN reviews 
    ON movies.id = reviews.movie_id 
    GROUP BY movies.id
    LIMIT ? OFFSET ?;
    `;

  connection.query(query, [itemsPerPage, offset], (err, result) => {
    if (err) return next(err);
    const totalQuery = "SELECT COUNT(id) AS total FROM movies";
    
    connection.query(totalQuery, (err, totalResult) => {
      if (err) return next(err);
      const moviesNumber = totalResult[0].total;

      return res.json({
        info: {
          total: moviesNumber,
          pages: Math.ceil(moviesNumber / itemsPerPage),
          currentPage: page,
        },
        results: result,
      })
    })
  })
}

function show(req, res, next) {
  const id = req.params.id;
  const query = "SELECT * FROM movies WHERE id = ?";

  connection.query(query, [id], (err, result) => {
    if (err) return next(err);
    if (result.length === 0) {
      res.status(404);
      return res.json({
        error: "NOT FOUND",
        message: "Movie not found",
      });
    }
    const movie = result[0];

    const reviewsQuery = "SELECT * FROM reviews WHERE movie_id = ?"

    connection.query(reviewsQuery, [id], (err, reviewResult) => {
      if (err) return next(err);
      res.json({
        ...movie,
        reviews: reviewResult
      })
    })
  })
}

function storeReview(req, res, next) {
  const data = req.body;
  const movieId = req.params.id;

  const query = 'INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?);';

  connection.query(
    query, [movieId, data.name, data.vote, data.text], (err, result) => {
      if (err) return next (err);
      res.status(201).json({
        message: 'review uploaded',
      })
    }
  )

}

const movieController = {
  index,
  show,
  storeReview
}

export default movieController
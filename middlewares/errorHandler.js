export default function errorHandler(err, req, res, next) {
  res.status(500)
  return res.json({
    error: process.env.ENVIRONMENT === "dev" ? err : "INTERNAL ERROR",
    message: "Internal sever error"
  })
}

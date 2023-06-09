const cors = require("cors");
const express = require("express");
const app = express();
const {
  getAllEndpoints,
  getCategories,
} = require("../controllers/api.controllers.js");
const {
  getReviews,
  getReviewById,
  patchReview,
} = require("../controllers/reviews.controllers.js");
const {
  getCommentsByReviewId,
  postCommentByReviewId,
  deleteComment,
} = require("../controllers/comments.controllers.js");
const { invalidPathHandler } = require("../controllers/error.controllers.js");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("../errors/index.js");
const { getUsers } = require("../controllers/users.controllers.js");

app.use(cors());
app.use(express.json());

app.get("/api", getAllEndpoints);

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewById);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewId);
app.post("/api/reviews/:review_id/comments", postCommentByReviewId);

app.patch("/api/reviews/:review_id", patchReview);

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api/users", getUsers);

app.all("/*", invalidPathHandler); // KEEP LAST

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;

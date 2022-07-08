const router = require("express").Router();

const {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getAllThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughId/reactions").post(addReaction);

router.route(":thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;

const router = require("express").Router();

const {
    getThoughts,
    getSingleThought, 
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts);
router.route("/").post(createThought);

router.route("/:thoughtId").get(getSingleThought);
router.route("/:thoughtId").put(updateThought);
router.route("/:thoughtId").delete(deleteThought);

router.route("/:thoughtId/reactions").post(createReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
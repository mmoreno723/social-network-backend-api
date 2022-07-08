const { Thought, User } = require("../models");

const thoughtController = {
  // GET all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughtData = await Thought.find().select("-__v");

      res.status(200).json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // GET one Thought by id
  async getOneThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thoughtData) {
        return res
          .status(404)
          .json({ message: "This thought does not exist." });
      }

      res.status(200).json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // CREATE a thought
  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);
      const userData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thoughtData._id } },
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({
          message:
            "This user does not exist. However, the thought was successfully created",
        });
      }

      res.status(200).json({ message: "Thought was successfully created." });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // UPDATE by id
  async updateThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thoughtData) {
        return res
          .status(404)
          .json({ message: "This thought does not exist." });
      }

      res.status(200).json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // DELETE by id
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thoughtData) {
        return res
          .status(404)
          .json({ message: "This thought does not exist." });
      }

      const userData = await User.findOneAndUpdate(
        {
          thoughts: req.params.thoughtId,
        },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({
          message:
            "Thought was successfully deleted. However the associated user could not be found.",
        });
      }
      res.status(200).json({ message: "Thought successfully deleted." });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // CREATE
  async addReaction(req, res) {
    try {
      const thoughtReactionData = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thoughtReactionData) {
        return res
          .status(404)
          .json({ message: "A thought with this user does not exist." });
      }

      res.status(200).json(thoughtReactionData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // DELETE
  async deleteReaction(req, res) {
    try {
      const thoughtReactionData = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thoughtReactionData) {
        return res
          .status(404)
          .json({ message: "This thought does not exist." });
      }
      res.status(200).json(thoughtReactionData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;

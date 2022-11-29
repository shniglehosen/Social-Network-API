const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .populate("thoughts")
      .populate("friends")
      .then(async (users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single user
  getSingleUser(req, res) {
    User.findById(ObjectId(req.params.userId))
      .populate("thoughts")
      .populate("friends")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Update user
  updateUser(req, res) {
    User.findByIdAndUpdate(
      ObjectId(req.params.userId),
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user and remove their thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({
        _id: ObjectId(req.params.userId),
      });

      if (user) {
        // Delete all thoughts
        const thoughts = await Thought.deleteMany({ username: user.username });
        // console.log(thoughts);

        // Delete all references in other user's friend array
        const friends = await User.updateMany(
          {},
          {
            $pull: { friends: req.params.userId },
          }
        );
        //console.log(friends);
      } else {
        res.status(404).json({ message: "No such user exists" });
      }
      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // create a friend
  createFriend(req, res) {
    User.findByIdAndUpdate(
      ObjectId(req.params.userId),
      { $addToSet: { friends: ObjectId(req.params.friendId) } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete a friend
  deleteFriend(req, res) {
    User.findByIdAndUpdate(
      ObjectId(req.params.userId),
      {
        $pull: { friends: ObjectId(req.params.friendId) },
      },
      { returnDocument: "after" }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
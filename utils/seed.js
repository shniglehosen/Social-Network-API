const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomUserName, getRandomThought } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 7; i++) {
    const username = getRandomUserName();
    const first = username.split("_")[0];
    const last = username.split("_")[1];
    const email = `${first}@${last}.com`;

    users.push({
      username,
      email,
    });
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // for each User, make a thought and add it to the User's thought array
  for (const user of users) {
    const randThought = getRandomThought(5);
    const thought = await Thought.create({
      thoughtText: randThought,
      username: user.username,
    });

    try {
      const u = await User.findOneAndUpdate(
        { username: user.username },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );

      console.log(u);
    } catch (err) {
      console.log(err);
    }
  }

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info("Seeding complete!");
  process.exit(0);
});
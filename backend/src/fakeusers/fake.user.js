import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const fakeUsers = [
  // Female Users
  {
    email: "daenerys.targaryen@example.com",
    fullName: "Daenerys Targaryen",
    password: "123456",
    profilePic: "https://upload.wikimedia.org/wikipedia/en/0/0d/Daenerys_Targaryen_with_Dragon-Emilia_Clarke.jpg",
  },
  {
    email: "arya.stark@example.com",
    fullName: "Arya Stark",
    password: "123456",
    profilePic: "https://static.wikia.nocookie.net/gameofthrones/images/b/be/AryaShipIronThrone.PNG/revision/latest?cb=20190520174300https://static.hbo.com/content/dam/hbodata/series/game-of-thrones/character/s5/arya-stark-1920.jpg?w=1200https://upload.wikimedia.org/wikipedia/en/3/39/Arya_Stark-Maisie_Williams.jpg",
  },
  {
    email: "cersei.lannister@example.com",
    fullName: "Cersei Lannister",
    password: "123456",
    profilePic: "https://upload.wikimedia.org/wikipedia/en/2/22/Cersei_Lannister_in_Black_Dress_in_Season_5.jpg",
  },
  {
    email: "sansa.stark@example.com",
    fullName: "Sansa Stark",
    password: "123456",
    profilePic: "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/SophieTurnerasSansaStark.jpg/220px-SophieTurnerasSansaStark.jpg",
  },
  {
    email: "melisandre@example.com",
    fullName: "Melisandre",
    password: "123456",
    profilePic: "https://upload.wikimedia.org/wikipedia/en/8/80/Melisandre-Carice_van_Houten.jpg",
  },
  {
    email: "catelyn.stark@example.com",
    fullName: "Catelyn Stark",
    password: "123456",
    profilePic: "https://static.hbo.com/content/dam/hbodata/series/game-of-thrones/character/s5/catelyn-stark-1920.jpg?w=1200",
  },
  {
    email: "lysa.arryn@example.com",
    fullName: "Lysa Arryn",
    password: "123456",
    profilePic: "https://static.hbo.com/content/dam/hbodata/series/game-of-thrones/character/s5/lysa-arryn-1920.jpg?w=1200",
  },
  {
    email: "ros@example.com",
    fullName: "Ros",
    password: "123456",
    profilePic: "https://static.hbo.com/content/dam/hbodata/series/game-of-thrones/character/s5/ros-1920.jpg?w=1200",
  },

  // Male Users
  {
    email: "jon.snow@example.com",
    fullName: "Jon Snow",
    password: "123456",
    profilePic: "https://static.hbo.com/content/dam/hbodata/series/game-of-thrones/character/s5/john-snow-1920.jpg?w=1200",
  },
  {
    email: "tyrion.lannister@example.com",
    fullName: "Tyrion Lannister",
    password: "123456",
    profilePic: "https://static.hbo.com/content/dam/hbodata/series/game-of-thrones/character/s5/tyrion-lannister-1920.jpg?w=1200",
  },
  {
    email: "jaime.lannister@example.com",
    fullName: "Jaime Lannister",
    password: "123456",
    profilePic: "https://static.hbo.com/content/dam/hbodata/series/game-of-thrones/character/s5/jamie-lannister-1920.jpg?w=1200",
  },
  {
    email: "robb.stark@example.com",
    fullName: "Robb Stark",
    password: "123456",
    profilePic: "https://static.hbo.com/content/dam/hbodata/series/game-of-thrones/character/s5/robert-stark-1920.jpg?w=1200",
  },
  {
    email: "jorah.mormont@example.com",
    fullName: "Jorah Mormont",
    password: "123456",
    profilePic: "https://static.hbo.com/content/dam/hbodata/series/game-of-thrones/character/s5/jorah-mormont-1920.jpg?w=1200",
  },
  {
    email: "khal.drogo@example.com",
    fullName: "Khal Drogo",
    password: "123456",
    profilePic: "https://static.hbo.com/content/dam/hbodata/series/game-of-thrones/character/s5/khal-drogo-1920.jpg?w=1200",
  },
  {
    email: "drogon@example.com",
    fullName: "Drogon",
    password: "123456",
    profilePic: "https://i.pinimg.com/736x/dd/30/00/dd3000b53727d5d8466206baa8613d5c.jpg",
  },
];

const fakeUserDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(fakeUsers);
    console.log("Database used successfully");
  } catch (error) {
    console.error("Error using database:", error);
  }
};

fakeUserDatabase();
const vrchat = require("vrchat");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");

const config = new vrchat.Configuration({
  username: process.env.VRCHAT_USERNAME,
  password: process.env.VRCHAT_PASSWORD,
  apiKey: process.env.VRCHAT_API_KEY,
});

const AuthApi = new vrchat.AuthenticationApi(config);
const UsersApi = new vrchat.UsersApi(config);
const WorldsApi = new vrchat.WorldsApi(config);

AuthApi.getCurrentUser().then((resp) => {
  const currentUser = resp.data;
  console.log(`Logged in as: ${currentUser.displayName}`);

  (() => {
    setInterval(function () {
      UsersApi.getUser(currentUser.id).then((resp) => {
        if (resp.data.worldId !== "offline") {
          // Get the world ID since they are online and in a world
          WorldsApi.getWorld(resp.data.worldId).then((resp) => {
            let toStore;
            if (process.env.SHOW_AUTHOR === "true") {
              toStore = `${resp.data.name} - ${resp.data.authorName}`;
            } else {
              toStore = resp.data.name;
            }

            // Store result in `world.txt`
            fs.writeFile("world.txt", toStore, "utf-8", function (err, data) {
              if (err) throw err;
              console.log(`[INFO] Updated world to: ${resp.data.name}`);
            });
          });
        }
      });
    }, process.env.UPDATE_FREQUENCY * 1000);
  })();
});

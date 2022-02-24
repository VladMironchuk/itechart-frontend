import webpackMockServer from "webpack-mock-server";

enum GamePlatforms {
  pc = "https://icones.pro/wp-content/uploads/2021/06/icone-windows-gris.png",
  ps = "https://www.pinclipart.com/picdir/big/391-3919045_file-playstation-logo-svg-playstation-logo-png-clipart.png",
  xbox = "https://www.pngall.com/wp-content/uploads/2016/07/Xbox-Transparent.png",
}

const TEST_DESCRIPTION =
  "Overwatch is a 2016 team-based multiplayer first-person shooter game developed and published by Blizzard Entertainment. Described as a 'hero shooter', Overwatch assigns players into two teams of six, with each player selecting from a large roster of characters, known as 'heroes', with unique abilities.";

let games = [
  {
    gameTitle: "Owerwatch",
    gameLogo: "https://s1.gaming-cdn.com/images/products/2208/271x377/game-battle-net-overwatch-cover.jpg",
    gamePrice: 23.99,
    gamePlatformsImages: [GamePlatforms.pc],
    gamePlatforms: ["pc"],
    gameDescription: TEST_DESCRIPTION,
    ageLimit: 12,
    rating: 3,
    date: Date.now(),
    genre: "shooter",
  },
  {
    gameTitle: "Minecraft",
    gameLogo: "https://s2.gaming-cdn.com/images/products/442/271x377/minecraft-java-edition-pc-game-cover.jpg",
    gamePrice: 25.99,
    gamePlatformsImages: [GamePlatforms.pc, GamePlatforms.ps, GamePlatforms.xbox],
    gamePlatforms: ["pc", "ps", "xbox"],
    gameDescription: TEST_DESCRIPTION,
    ageLimit: 6,
    rating: 5,
    date: Date.now(),
    genre: "survive",
  },
  {
    gameTitle: "Terraria",
    gameLogo: "https://s3.gaming-cdn.com/images/products/932/271x377/game-steam-terraria-cover.jpg",
    gamePrice: 4.99,
    gamePlatformsImages: [GamePlatforms.pc, GamePlatforms.ps, GamePlatforms.xbox],
    gamePlatforms: ["pc", "ps", "xbox"],
    ageLimit: 12,
    rating: 4,
    date: Date.now(),
    gameDescription:
      "Terraria is a 2D sandbox game with gameplay that revolves around exploration, building, crafting, combat, survival, and mining, playable in both single-player and multiplayer modes. The game is noted for its classic exploration-adventure style of gameplay, similar to games such as the Metroid series and Minecraft.",
    genre: "survive",
  },
  {
    gameTitle: "CS:GO",
    gameLogo: "https://cdn.kanobu.ru/games/0e56b18d-b3ac-48d2-be8e-2afb3c52222c.jpg",
    gamePrice: 4.99,
    gamePlatformsImages: [GamePlatforms.pc],
    gamePlatforms: ["pc"],
    ageLimit: 18,
    rating: 4,
    gameDescription: TEST_DESCRIPTION,
    date: Date.now() - 1,
    genre: "shooter",
  },
  {
    gameTitle: "CS 1.6",
    gameLogo: "https://cs16planet.ru/uploads/posts/2021-11/1637804273_cs16-main-theme.jpg",
    gamePrice: 3.99,
    gamePlatformsImages: [GamePlatforms.pc],
    gamePlatforms: ["pc"],
    ageLimit: 16,
    rating: 5,
    gameDescription: TEST_DESCRIPTION,
    date: Date.now() - 2,
    genre: "shooter",
  },
  {
    gameTitle: "Forza Horizon 5",
    gameLogo:
      "https://s2.gaming-cdn.com/images/products/9595/orig/forza-horizon-5-deluxe-edition-pc-xbox-one-xbox-series-xs-deluxe-edition-pc-xbox-one-xbox-series-x-s-game-microsoft-store-cover.jpg",
    gamePrice: 9.99,
    gamePlatformsImages: [GamePlatforms.pc, GamePlatforms.xbox],
    gamePlatforms: ["pc", "xbox"],
    ageLimit: 3,
    rating: 4,
    gameDescription: TEST_DESCRIPTION,
    date: Date.now() - 2,
    genre: "arcade",
  },
  {
    gameTitle: "NFS Underground 2",
    gameLogo:
      "https://upload.wikimedia.org/wikipedia/ru/d/d0/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_Need_for_Speed_Underground_2.jpg",
    gamePrice: 4.99,
    gamePlatformsImages: [GamePlatforms.pc, GamePlatforms.xbox, GamePlatforms.ps],
    gamePlatforms: ["pc", "ps", "xbox"],
    ageLimit: 6,
    rating: 5,
    gameDescription: TEST_DESCRIPTION,
    date: Date.now() - 2,
    genre: "arcade",
  },
  {
    gameTitle: "Don't Starve Together",
    gameLogo:
      "https://store-images.s-microsoft.com/image/apps.22128.68986806511725911.f424da40-674e-41a9-878c-7a524fa56895.b17b2cb1-f73d-4df8-9124-7e4a0f770ed2",
    gamePrice: 7.99,
    gamePlatformsImages: [GamePlatforms.pc, GamePlatforms.xbox],
    gamePlatforms: ["pc", "xbox"],
    ageLimit: 12,
    rating: 3,
    gameDescription: TEST_DESCRIPTION,
    date: Date.now() - 2,
    genre: "survive",
  },
  {
    gameTitle: "FlatOut 2",
    gameLogo: "https://upload.wikimedia.org/wikipedia/ru/thumb/8/8f/FlatOut2Coverart.jpg/274px-FlatOut2Coverart.jpg",
    gamePrice: 5.99,
    gamePlatformsImages: [GamePlatforms.pc, GamePlatforms.ps, GamePlatforms.xbox],
    gamePlatforms: ["pc", "ps", "xbox"],
    ageLimit: 6,
    rating: 3,
    gameDescription: TEST_DESCRIPTION,
    date: Date.now() - 2,
    genre: "arcade",
  },
];

export type User = {
  login: string;
  password: string;
  description: string;
  username: string;
};

const users: User[] = [];

export default webpackMockServer.add((app, helper) => {
  app.get("/testMock", (_req, res) => {
    const response = {
      id: helper.getUniqueIdInt(),
      randomInt: helper.getRandomInt(),
      lastDate: new Date(),
    };

    res.json(response);
  });

  app.get("/api/search/:text", (req, res) => {
    const regex = new RegExp(`${req.params.text}`, "i");
    res.json({
      games: games.map((game) => game.gameTitle).filter((game) => game.match(regex)),
    });
  });

  app.get("/api/getTopProducts", (_req, res) => {
    res.json({ games: games.sort((a, b) => b.date - a.date).slice(0, 3) });
  });

  app.post("/testPostMock", (req, res) => {
    res.json({ body: req.body || null, success: true });
  });

  app.post("/api/auth/signIn/", (req, res) => {
    try {
      const { login, password } = req.body;
      const index = users.findIndex((item) => item.login === login && item.password === password);
      if (index === -1) {
        return res.status(401).json({ message: "wrong credentials" });
      }
      return res.status(200).json(users[index]);
    } catch (err: unknown) {
      return res.status(400).json({ message: err || "Something went wrong" });
    }
  });

  app.post("/api/auth/signUp/", (req, res) => {
    const { login, password } = req.body;
    users.push({ login, password, description: "", username: login });
    res.status(200).json(req.body);
  });

  app.post("/api/changePassword", (req, res) => {
    const { login, password } = req.body;
    const currentUserIndex = users.findIndex((user) => user.login === login);
    users[currentUserIndex].password = password;
    res.status(200).send(req.body);
  });

  app.get("/api/getProfile/:login", (req, res) => {
    const { login } = req.params;
    const currentUserIndex = users.findIndex((user) => user.login === login);
    res.json(users[currentUserIndex]);
  });

  app.post("/api/saveProfile", (req, res) => {
    const { username, description, login } = req.body;
    const currentUserIndex = users.findIndex((user) => user.login === login);
    users[currentUserIndex].username = username;
    users[currentUserIndex].description = description;
    res.json(users[currentUserIndex]);
  });

  app.post("/api/saveImage", (req, res) => {
    res.status(200);
  });

  app.get("/api/products", (req, res) => {
    const { age, genre, criteria, order, platform } = req.query;
    let initGames = games;
    initGames = initGames.filter((game) => game.gamePlatforms.includes(platform as string));
    initGames = initGames.filter((game) => game.ageLimit <= +(age as string));
    initGames = initGames.filter((game) => (genre !== "all" ? game.genre === genre : game));
    switch (criteria) {
      case "rating":
        initGames.sort((firstGame, secondGame) => firstGame.rating - secondGame.rating);
        break;
      case "gamePrice":
        initGames.sort((firstGame, secondGame) => firstGame.gamePrice - secondGame.gamePrice);
        break;
      default:
        initGames.sort((firstGame, secondGame) => {
          if (firstGame.gameTitle < secondGame.gameTitle) {
            return -1;
          }
          if (firstGame.gameTitle > secondGame.gameTitle) {
            return 1;
          }
          return 0;
        });
    }
    if (order === "desc") {
      initGames.reverse();
    }
    res.json(initGames);
  });

  app.get("/api/products/:product", (req, res) => {
    const { product } = req.params;
    const gameIndex = games.findIndex((game) => game.gameTitle === product);
    res.json(games[gameIndex]);
  });

  app.delete("/api/products/:product", (req, res) => {
    const { product } = req.params;
    games = games.filter((game) => game.gameTitle !== product);
    res.status(200);
  });

  app.put("/api/products/:product", (req, res) => {
    const { product } = req.params;
    delete req.body.product;
    const currentGameIndex = games.findIndex((game) => game.gameTitle === product);
    games[currentGameIndex] = {
      ...req.body,
      gamePlatformsImg: req.body.gamePlatforms.map((platform: "pc" | "xbox" | "ps") => GamePlatforms[`${platform}`]),
      rating: games[currentGameIndex].rating,
    };
    res.json(games[currentGameIndex]);
  });

  app.post("/api/products", (req, res) => {
    games.push({
      ...req.body,
      gamePlatformsImg: req.body.gamePlatforms.map((platform: "pc" | "xbox" | "ps") => GamePlatforms[`${platform}`]),
    });
    res.status(201).json({ message: "game was created" });
  });
});

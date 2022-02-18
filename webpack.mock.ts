import webpackMockServer from "webpack-mock-server";

const games = [
  {
    gameTitle: "Owerwatch",
    gameLogo: "https://s1.gaming-cdn.com/images/products/2208/271x377/game-battle-net-overwatch-cover.jpg",
    gamePrice: 23.99,
    gamePlatforms: ["https://icones.pro/wp-content/uploads/2021/06/icone-windows-gris.png"],
    gameDescription:
      "Overwatch is a 2016 team-based multiplayer first-person shooter game developed and published by Blizzard Entertainment. Described as a 'hero shooter', Overwatch assigns players into two teams of six, with each player selecting from a large roster of characters, known as 'heroes', with unique abilities.",
    ageLimit: 12,
    rating: 5,
    date: Date.now(),
  },
  {
    gameTitle: "Minecraft",
    gameLogo: "https://s2.gaming-cdn.com/images/products/442/271x377/minecraft-java-edition-pc-game-cover.jpg",
    gamePrice: 25.99,
    gamePlatforms: [
      "https://icones.pro/wp-content/uploads/2021/06/icone-windows-gris.png",
      "https://www.pinclipart.com/picdir/big/391-3919045_file-playstation-logo-svg-playstation-logo-png-clipart.png",
      "https://www.pngall.com/wp-content/uploads/2016/07/Xbox-Transparent.png",
    ],
    gameDescription:
      "Overwatch is a  team-based multiplayer first-person shooter game developed and published by Blizzard Entertainment. Described as a 'hero shooter', Overwatch assigns players into two teams of six, with each player selecting from a large roster of characters, known as 'heroes', with unique abilities.",
    ageLimit: 12,
    rating: 5,
    date: Date.now(),
  },
  {
    gameTitle: "Terraria",
    gameLogo: "https://s3.gaming-cdn.com/images/products/932/271x377/game-steam-terraria-cover.jpg",
    gamePrice: 4.99,
    gamePlatforms: [
      "https://icones.pro/wp-content/uploads/2021/06/icone-windows-gris.png",
      "https://www.pinclipart.com/picdir/big/391-3919045_file-playstation-logo-svg-playstation-logo-png-clipart.png",
      "https://www.pngall.com/wp-content/uploads/2016/07/Xbox-Transparent.png",
    ],
    ageLimit: 12,
    rating: 5,
    date: Date.now(),
    gameDescription:
      "Terraria is a 2D sandbox game with gameplay that revolves around exploration, building, crafting, combat, survival, and mining, playable in both single-player and multiplayer modes. The game is noted for its classic exploration-adventure style of gameplay, similar to games such as the Metroid series and Minecraft.",
  },
  {
    gameTitle: "CS:GO",
    date: Date.now() - 1,
  },
  {
    gameTitle: "CS 1.6",
    date: Date.now() - 2,
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
    res.json({
      games: games.map((game) => game.gameTitle).filter((game) => game.includes(req.params.text)),
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
      return res.status(200).json(req.body);
    } catch (err: unknown) {
      return res.status(400).json({ message: err || "Something went wrong" });
    }
  });

  app.post("/api/auth/signUp/", (req, res) => {
<<<<<<< HEAD
    const { login, password } = req.body;
=======
    const { login, password } = JSON.parse(req.body);
>>>>>>> b6e0eb1 (add: finish profile page layout; add endpoints)
    users.push({ login, password, description: "", username: login });
    res.status(200).json(req.body);
  });

  app.post("/api/changePassword", (req, res) => {
    const { login, password } = JSON.parse(req.body);
    const currentUser = users.find((user) => user.login === login);
    currentUser!.password = password;
    res.status(200).send(req.body);
  });

  app.get("/api/getProfile/:login", (req, res) => {
    const { login } = req.params;
    const currentUser = users.find((user) => user.login === login)!;
    res.json(currentUser);
  });

  app.post("/api/saveProfile", (req, res) => {
    const { username, description, login } = JSON.parse(req.body);
    const currentUser = users.find((user) => user.login === login)!;
    currentUser.username = username;
    currentUser.description = description;
    res.json(currentUser);
  });

  app.get("/api/getProfile/:login", (req, res) => {
    const { login } = req.params;
    const currentUser = users.find((user) => user.login === login);
    res.json(currentUser);
  });

  app.post("/api/saveProfile", (req, res) => {
    const { username, description, login } = req.body;
    const currentUser = users.find((user) => user.login === login);
    if (currentUser) {
      currentUser.username = username;
      currentUser.description = description;
    }
    res.json(currentUser);
  });
});

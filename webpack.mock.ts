import webpackMockServer from "webpack-mock-server";

const games = [
  {
    gameTitle: "Owerwatch",
    gameLogo: "../../../assets/images/overwatch.jpg",
    gamePrice: 23.99,
    gamePlatforms: ["../../../assets/images/icone-windows-gris.png"],
    gameDescription:
      "Overwatch is a 2016 team-based multiplayer first-person shooter game developed and published by Blizzard Entertainment. Described as a 'hero shooter', Overwatch assigns players into two teams of six, with each player selecting from a large roster of characters, known as 'heroes', with unique abilities.",
    ageLimit: 12,
    rating: 5,
    date: Date.now(),
  },
  {
    gameTitle: "Minecraft",
    gameLogo: "../../../assets/images/mine.jpg",
    gamePrice: 25.99,
    gamePlatforms: [
      "../../../assets/images/icone-windows-gris.png",
      "../../../assets/images/ps.png",
      "../../../assets/images/xbox.png",
    ],
    gameDescription:
      "Overwatch is a  team-based multiplayer first-person shooter game developed and published by Blizzard Entertainment. Described as a 'hero shooter', Overwatch assigns players into two teams of six, with each player selecting from a large roster of characters, known as 'heroes', with unique abilities.",
    ageLimit: 12,
    rating: 5,
    date: Date.now(),
  },
  {
    gameTitle: "Terraria",
    gameLogo: "../../../assets/images/terraria.jpg",
    gamePrice: 4.99,
    gamePlatforms: [
      "../../../assets/images/icone-windows-gris.png",
      "../../../assets/images/ps.png",
      "../../../assets/images/xbox.png",
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
    res.status(200).json(req.body);
  });
});


const mockGames = [
  {
    id: "game-1",
    sport: "Padel",
    title: "Friendly Padel Match",
    description:
      "Looking for players for a friendly doubles match. All players are welcome!",
    city: "Cairo",
    venue: "New Cairo Sports Club",
    date: "2026-10-20",
    time: "7:00 PM",
    players: 2,
    maxPlayers: 4,
    level: "Intermediate",
    price: 150,
    organizer: "Ahmed M.",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "game-2",
    sport: "Running",
    title: "Sunset 5K Group Run",
    description:
      "Join us for a relaxed sunset run. Beginners are welcome, and we will run at a comfortable pace.",
    city: "Alexandria",
    venue: "Stanley Bridge",
    date: "2026-10-21",
    time: "6:30 PM",
    players: 8,
    maxPlayers: 12,
    level: "All levels",
    price: 0,
    organizer: "Mariam A.",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "game-3",
    sport: "Cycling",
    title: "Morning City Ride",
    description:
      "A friendly morning ride around the city. Bring your helmet, water, and good energy.",
    city: "Cairo",
    venue: "Zamalek Meetup Point",
    date: "2026-10-23",
    time: "6:00 AM",
    players: 6,
    maxPlayers: 10,
    level: "Intermediate",
    price: 0,
    organizer: "Omar K.",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "game-4",
    sport: "Football",
    title: "Friday 5-a-side Football",
    description:
      "We need a few more players for a casual five-a-side game. Come play and meet new people.",
    city: "Cairo",
    venue: "Maadi Sports Center",
    date: "2026-10-23",
    time: "8:00 PM",
    players: 7,
    maxPlayers: 10,
    level: "All levels",
    price: 100,
    organizer: "Youssef H.",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "game-5",
    sport: "Padel",
    title: "Weekend Padel Social",
    description:
      "Meet new people, enjoy some padel, and have fun. Beginners are welcome.",
    city: "Giza",
    venue: "Sheikh Zayed Padel Club",
    date: "2026-10-24",
    time: "5:00 PM",
    players: 3,
    maxPlayers: 4,
    level: "Beginner",
    price: 125,
    organizer: "Nour S.",
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "game-6",
    sport: "Swimming",
    title: "Morning Swim Meetup",
    description:
      "A casual swimming meetup for people who enjoy starting their day in the pool.",
    city: "Cairo",
    venue: "Heliopolis Sports Club",
    date: "2026-10-25",
    time: "8:00 AM",
    players: 5,
    maxPlayers: 8,
    level: "All levels",
    price: 80,
    organizer: "Salma R.",
    image:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=900&q=80",
  },
];

// In-memory mock database.
// Data changes remain available while the app is running,
// but reset when the browser page is fully reloaded.
let games = mockGames.map((game) => ({ ...game }));

// Simulates the currently logged-in mock user.
const joinedGameIds = new Set();

function copyGame(game) {
  return game ? { ...game } : null;
}

function findGame(id) {
  const game = games.find((item) => String(item.id) === String(id));

  if (!game) {
    throw new Error("Game not found.");
  }

  return game;
}

export const gamesService = {
  async getGames() {
    return games.map(copyGame);
  },

  async getGameById(id) {
    return copyGame(findGame(id));
  },

  async createGame(gameData) {
    const newGame = {
      id: `game-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title: gameData.title,
      sport: gameData.sport,
      description: gameData.description || "A friendly game. Join us!",
      city: gameData.city,
      venue: gameData.venue,
      date: gameData.date,
      time: gameData.time,
      players: 1,
      maxPlayers: Number(gameData.maxPlayers),
      level: gameData.level || "All levels",
      price: Number(gameData.price) || 0,
      organizer: "You",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
    };

    games = [newGame, ...games];

    // The organizer is already counted as a participant.
    joinedGameIds.add(String(newGame.id));

    return copyGame(newGame);
  },

  async joinGame(id) {
    const game = findGame(id);
    const gameId = String(game.id);

    if (joinedGameIds.has(gameId)) {
      throw new Error("You have already joined this game.");
    }

    if (game.players >= game.maxPlayers) {
      throw new Error("Sorry, this game is already full.");
    }

    game.players += 1;
    joinedGameIds.add(gameId);

    return copyGame(game);
  },
};

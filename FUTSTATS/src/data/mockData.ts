export interface Player {
  id: number;
  name: string;
  team: string;
  position: string;
  goals: number;
  assists: number;
  matches: number;
  rating: number;
  nationality: string;
  image: string;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  position: number;
}

export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  status: 'finished' | 'live' | 'upcoming';
  homeLogo: string;
  awayLogo: string;
}

export const mockPlayers: Player[] = [
  {
    id: 1,
    name: "Lionel Messi",
    team: "Inter Miami",
    position: "Forward",
    goals: 28,
    assists: 16,
    matches: 34,
    rating: 9.2,
    nationality: "Argentina",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Erling Haaland",
    team: "Manchester City",
    position: "Forward",
    goals: 36,
    assists: 8,
    matches: 35,
    rating: 9.0,
    nationality: "Norway",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Kylian Mbappé",
    team: "PSG",
    position: "Forward",
    goals: 29,
    assists: 12,
    matches: 36,
    rating: 8.8,
    nationality: "France",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Kevin De Bruyne",
    team: "Manchester City",
    position: "Midfielder",
    goals: 7,
    assists: 24,
    matches: 32,
    rating: 8.6,
    nationality: "Belgium",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Vinicius Jr",
    team: "Real Madrid",
    position: "Forward",
    goals: 23,
    assists: 15,
    matches: 36,
    rating: 8.5,
    nationality: "Brazil",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Jude Bellingham",
    team: "Real Madrid",
    position: "Midfielder",
    goals: 19,
    assists: 11,
    matches: 35,
    rating: 8.7,
    nationality: "England",
    image: "/placeholder.svg"
  }
];

export const mockTeams: Team[] = [
  {
    id: 1,
    name: "Manchester City",
    logo: "/placeholder.svg",
    wins: 28,
    draws: 5,
    losses: 5,
    points: 89,
    goalsFor: 96,
    goalsAgainst: 34,
    position: 1
  },
  {
    id: 2,
    name: "Arsenal",
    logo: "/placeholder.svg",
    wins: 26,
    draws: 6,
    losses: 6,
    points: 84,
    goalsFor: 88,
    goalsAgainst: 29,
    position: 2
  },
  {
    id: 3,
    name: "Liverpool",
    logo: "/placeholder.svg",
    wins: 24,
    draws: 10,
    losses: 4,
    points: 82,
    goalsFor: 86,
    goalsAgainst: 41,
    position: 3
  },
  {
    id: 4,
    name: "Real Madrid",
    logo: "/placeholder.svg",
    wins: 27,
    draws: 6,
    losses: 5,
    points: 87,
    goalsFor: 79,
    goalsAgainst: 31,
    position: 1
  },
  {
    id: 5,
    name: "Barcelona",
    logo: "/placeholder.svg",
    wins: 25,
    draws: 7,
    losses: 6,
    points: 82,
    goalsFor: 76,
    goalsAgainst: 35,
    position: 2
  },
  {
    id: 6,
    name: "Bayern Munich",
    logo: "/placeholder.svg",
    wins: 26,
    draws: 5,
    losses: 3,
    points: 83,
    goalsFor: 92,
    goalsAgainst: 28,
    position: 1
  }
];

export const mockMatches: Match[] = [
  {
    id: 1,
    homeTeam: "Manchester City",
    awayTeam: "Arsenal",
    homeScore: 2,
    awayScore: 1,
    date: "2024-03-31",
    status: "finished",
    homeLogo: "/placeholder.svg",
    awayLogo: "/placeholder.svg"
  },
  {
    id: 2,
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    homeScore: 3,
    awayScore: 2,
    date: "2024-04-21",
    status: "live",
    homeLogo: "/placeholder.svg",
    awayLogo: "/placeholder.svg"
  },
  {
    id: 3,
    homeTeam: "Liverpool",
    awayTeam: "Manchester City",
    homeScore: 0,
    awayScore: 0,
    date: "2024-04-28",
    status: "upcoming",
    homeLogo: "/placeholder.svg",
    awayLogo: "/placeholder.svg"
  },
  {
    id: 4,
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    homeScore: 4,
    awayScore: 0,
    date: "2024-03-30",
    status: "finished",
    homeLogo: "/placeholder.svg",
    awayLogo: "/placeholder.svg"
  },
  {
    id: 5,
    homeTeam: "PSG",
    awayTeam: "Marseille",
    homeScore: 2,
    awayScore: 2,
    date: "2024-04-14",
    status: "finished",
    homeLogo: "/placeholder.svg",
    awayLogo: "/placeholder.svg"
  }
];

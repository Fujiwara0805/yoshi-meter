import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface GameTeam {
  name: string;
  logoUrl: string;
  score?: number;
}

interface YamamotoStats {
  isStarting: boolean;
  pitchCount?: number;
  strikeouts?: number;
  inningsPitched?: number;
}

interface Game {
  id: string;
  status: 'upcoming' | 'live' | 'completed';
  homeTeam: GameTeam;
  awayTeam: GameTeam;
  date: string;
  time: string;
  yamamoto: YamamotoStats;
}

interface GamesState {
  upcomingGames: Game[];
  previousGames: Game[];
  currentGame: Game | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: GamesState = {
  upcomingGames: [
    {
      id: 'game1',
      status: 'upcoming',
      homeTeam: {
        name: 'Dodgers',
        logoUrl: 'https://content.sportslogos.net/logos/54/63/thumbs/efvfv5b2f1cfw4l9jq4n6xmhc.gif',
      },
      awayTeam: {
        name: 'Giants',
        logoUrl: 'https://content.sportslogos.net/logos/54/74/thumbs/cpqj6up5bvgpoedg5fwsk20ve.gif',
      },
      date: 'Jun 20, 2025',
      time: '7:10 PM',
      yamamoto: {
        isStarting: true,
      },
    },
    {
      id: 'game2',
      status: 'upcoming',
      homeTeam: {
        name: 'Dodgers',
        logoUrl: 'https://content.sportslogos.net/logos/54/63/thumbs/efvfv5b2f1cfw4l9jq4n6xmhc.gif',
      },
      awayTeam: {
        name: 'Padres',
        logoUrl: 'https://content.sportslogos.net/logos/54/73/thumbs/cavsg7e1h1j5h1keg74gf7grb.gif',
      },
      date: 'Jun 25, 2025',
      time: '7:10 PM',
      yamamoto: {
        isStarting: false,
      },
    },
  ],
  previousGames: [
    {
      id: 'game3',
      status: 'completed',
      homeTeam: {
        name: 'Dodgers',
        logoUrl: 'https://content.sportslogos.net/logos/54/63/thumbs/efvfv5b2f1cfw4l9jq4n6xmhc.gif',
        score: 5,
      },
      awayTeam: {
        name: 'Rockies',
        logoUrl: 'https://content.sportslogos.net/logos/54/58/thumbs/5868712efgpgh56434fhfg3545.gif',
        score: 2,
      },
      date: 'Jun 15, 2025',
      time: '7:10 PM',
      yamamoto: {
        isStarting: true,
        pitchCount: 98,
        strikeouts: 6,
        inningsPitched: 6.2,
      },
    },
  ],
  currentGame: {
    id: 'game4',
    status: 'live',
    homeTeam: {
      name: 'Diamondbacks',
      logoUrl: 'https://content.sportslogos.net/logos/54/50/thumbs/aaff6afkcpegieshm9omdg8c5.gif',
      score: 2,
    },
    awayTeam: {
      name: 'Dodgers',
      logoUrl: 'https://content.sportslogos.net/logos/54/63/thumbs/efvfv5b2f1cfw4l9jq4n6xmhc.gif',
      score: 3,
    },
    date: 'Jun 18, 2025',
    time: '7:10 PM',
    yamamoto: {
      isStarting: true,
      pitchCount: 78,
      strikeouts: 6,
      inningsPitched: 5.1,
    },
  },
  isLoading: false,
  error: null,
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    fetchGamesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchGamesSuccess: (state, action: PayloadAction<{
      upcomingGames: Game[],
      previousGames: Game[],
      currentGame: Game | null
    }>) => {
      state.upcomingGames = action.payload.upcomingGames;
      state.previousGames = action.payload.previousGames;
      state.currentGame = action.payload.currentGame;
      state.isLoading = false;
    },
    fetchGamesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateCurrentGame: (state, action: PayloadAction<Partial<Game>>) => {
      if (state.currentGame) {
        state.currentGame = { ...state.currentGame, ...action.payload };
      }
    },
  },
});

export const {
  fetchGamesStart,
  fetchGamesSuccess,
  fetchGamesFailure,
  updateCurrentGame,
} = gamesSlice.actions;

export const selectUpcomingGames = (state: RootState) => state.games.upcomingGames;
export const selectPreviousGames = (state: RootState) => state.games.previousGames;
export const selectCurrentGame = (state: RootState) => state.games.currentGame;
export const selectIsLoading = (state: RootState) => state.games.isLoading;
export const selectError = (state: RootState) => state.games.error;

export default gamesSlice.reducer;
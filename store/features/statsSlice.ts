import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Stat {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  average?: string;
  rank?: number;
}

interface StatsState {
  currentGameStrikeouts: number;
  seasonStrikeouts: number;
  careerStrikeouts: number;
  stats: Stat[];
  isLoading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  currentGameStrikeouts: 0,
  seasonStrikeouts: 0,
  careerStrikeouts: 0,
  stats: [
    {
      title: 'ERA',
      value: '3.12',
      trend: 'down',
      trendValue: '0.18',
      average: '3.86',
      rank: 8,
    },
    {
      title: 'K/9',
      value: '10.2',
      trend: 'up',
      trendValue: '0.3',
      average: '8.7',
      rank: 5,
    },
    {
      title: 'WHIP',
      value: '1.08',
      trend: 'down',
      trendValue: '0.04',
      average: '1.23',
      rank: 12,
    },
    {
      title: 'IP',
      value: '68.1',
      trend: 'neutral',
      average: '65.2',
      rank: 15,
    },
    {
      title: 'BB/9',
      value: '2.1',
      trend: 'up',
      trendValue: '0.2',
      average: '3.2',
      rank: 7,
    },
    {
      title: 'HR/9',
      value: '0.7',
      trend: 'down',
      trendValue: '0.1',
      average: '1.1',
      rank: 3,
    },
  ],
  isLoading: false,
  error: null,
};

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    incrementStrikeout: (state) => {
      state.currentGameStrikeouts += 1;
      state.seasonStrikeouts += 1;
      state.careerStrikeouts += 1;
    },
    setCurrentGameStrikeouts: (state, action: PayloadAction<number>) => {
      state.currentGameStrikeouts = action.payload;
    },
    setSeasonStrikeouts: (state, action: PayloadAction<number>) => {
      state.seasonStrikeouts = action.payload;
    },
    fetchStatsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchStatsSuccess: (state, action: PayloadAction<Stat[]>) => {
      state.stats = action.payload;
      state.isLoading = false;
    },
    fetchStatsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  incrementStrikeout,
  setCurrentGameStrikeouts,
  setSeasonStrikeouts,
  fetchStatsStart,
  fetchStatsSuccess,
  fetchStatsFailure,
} = statsSlice.actions;

export const selectStrikeoutCount = (state: RootState) => 
  state.stats.currentGameStrikeouts;
export const selectSeasonStrikeouts = (state: RootState) => 
  state.stats.seasonStrikeouts;
export const selectStats = (state: RootState) => state.stats.stats;
export const selectIsLoading = (state: RootState) => state.stats.isLoading;
export const selectError = (state: RootState) => state.stats.error;

export default statsSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  summary: string;
  imageUrl: string;
  isVideo: boolean;
  url: string;
}

interface NewsState {
  news: NewsItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  news: [
    {
      id: 'news1',
      title: 'Yamamoto Dominates with 10 Strikeouts Against Giants',
      source: 'MLB.com',
      timestamp: '2 hours ago',
      summary: 'Los Angeles Dodgers pitcher Yoshinobu Yamamoto struck out 10 batters over 7 innings in a dominant performance against the San Francisco Giants on Wednesday night.',
      imageUrl: 'https://images.pexels.com/photos/4937223/pexels-photo-4937223.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      isVideo: false,
      url: 'https://mlb.com/news/yamamoto-giants',
    },
    {
      id: 'news2',
      title: 'Yamamoto\'s Splitter: The Pitch That\'s Baffling MLB Hitters',
      source: 'ESPN',
      timestamp: '5 hours ago',
      summary: 'A deep analysis of Yoshinobu Yamamoto\'s devastating splitter and why it\'s becoming one of the most effective pitches in baseball.',
      imageUrl: 'https://images.pexels.com/photos/13770299/pexels-photo-13770299.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      isVideo: true,
      url: 'https://espn.com/mlb/yamamoto-splitter',
    },
    {
      id: 'news3',
      title: "Dodgers' Yamamoto Named NL Pitcher of the Month",
      source: 'The Athletic',
      timestamp: '1 day ago',
      summary: "After a stellar May where he went 5-0 with a 1.21 ERA, Dodgers' star Yoshinobu Yamamoto has been named the National League Pitcher of the Month.",
      imageUrl: 'https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      isVideo: false,
      url: 'https://theathletic.com/mlb/dodgers/yamamoto-award',
    },
  ],
  isLoading: false,
  error: null,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    fetchNewsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchNewsSuccess: (state, action: PayloadAction<NewsItem[]>) => {
      state.news = action.payload;
      state.isLoading = false;
    },
    fetchNewsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addNews: (state, action: PayloadAction<NewsItem>) => {
      state.news.unshift(action.payload);
    },
  },
});

export const {
  fetchNewsStart,
  fetchNewsSuccess,
  fetchNewsFailure,
  addNews,
} = newsSlice.actions;

export const selectNews = (state: RootState) => state.news.news;
export const selectIsLoading = (state: RootState) => state.news.isLoading;
export const selectError = (state: RootState) => state.news.error;

export default newsSlice.reducer;
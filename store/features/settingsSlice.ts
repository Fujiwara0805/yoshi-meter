import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Language = 'ja' | 'en';

interface SettingsState {
  language: Language;
  isDarkMode: boolean;
  useSystemTheme: boolean;
}

const initialState: SettingsState = {
  language: 'ja',
  isDarkMode: false,
  useSystemTheme: true,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
      state.useSystemTheme = false;
    },
    setUseSystemTheme: (state, action: PayloadAction<boolean>) => {
      state.useSystemTheme = action.payload;
    },
  },
});

export const { setLanguage, setDarkMode, setUseSystemTheme } = settingsSlice.actions;

export const selectLanguage = (state: RootState) => state.settings.language;
export const selectIsDarkMode = (state: RootState) => state.settings.isDarkMode;
export const selectUseSystemTheme = (state: RootState) => state.settings.useSystemTheme;

export default settingsSlice.reducer;
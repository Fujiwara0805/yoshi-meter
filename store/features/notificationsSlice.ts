import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface NotificationOption {
  id: string;
  label: string;
  isEnabled: boolean;
}

interface NotificationPreference {
  id: string;
  title: string;
  description: string;
  isEnabled: boolean;
  options: NotificationOption[];
}

interface NotificationsState {
  preferences: NotificationPreference[];
  isLoading: boolean;
  error: string | null;
}

const initialState: NotificationsState = {
  preferences: [
    {
      id: 'strikeouts',
      title: 'Strikeout Alerts',
      description: 'Get notifications when Yamamoto records a strikeout',
      isEnabled: true,
      options: [
        {
          id: 'strikeout-sound',
          label: 'Custom strikeout sound',
          isEnabled: true,
        },
        {
          id: 'strikeout-vibration',
          label: 'Vibration feedback',
          isEnabled: true,
        },
        {
          id: 'strikeout-milestones',
          label: 'Only milestone strikeouts (5, 10, etc.)',
          isEnabled: false,
        },
      ],
    },
    {
      id: 'games',
      title: 'Game Notifications',
      description: 'Get notifications about Yamamoto\'s upcoming and live games',
      isEnabled: true,
      options: [
        {
          id: 'game-start',
          label: 'Game starting soon',
          isEnabled: true,
        },
        {
          id: 'game-results',
          label: 'Game results',
          isEnabled: true,
        },
        {
          id: 'schedule-changes',
          label: 'Schedule changes',
          isEnabled: true,
        },
      ],
    },
    {
      id: 'news',
      title: 'News & Updates',
      description: 'Get the latest news and updates about Yamamoto',
      isEnabled: true,
      options: [
        {
          id: 'news-articles',
          label: 'News articles',
          isEnabled: true,
        },
        {
          id: 'video-content',
          label: 'Video content',
          isEnabled: true,
        },
        {
          id: 'social-media',
          label: 'Social media updates',
          isEnabled: false,
        },
      ],
    },
  ],
  isLoading: false,
  error: null,
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    toggleNotificationPreference: (state, action: PayloadAction<string>) => {
      const preferenceId = action.payload;
      const preference = state.preferences.find(p => p.id === preferenceId);
      if (preference) {
        preference.isEnabled = !preference.isEnabled;
      }
    },
    toggleNotificationOption: (state, action: PayloadAction<{
      preferenceId: string;
      optionId: string;
    }>) => {
      const { preferenceId, optionId } = action.payload;
      const preference = state.preferences.find(p => p.id === preferenceId);
      if (preference) {
        const option = preference.options.find(o => o.id === optionId);
        if (option) {
          option.isEnabled = !option.isEnabled;
        }
      }
    },
    fetchPreferencesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPreferencesSuccess: (state, action: PayloadAction<NotificationPreference[]>) => {
      state.preferences = action.payload;
      state.isLoading = false;
    },
    fetchPreferencesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  toggleNotificationPreference,
  toggleNotificationOption,
  fetchPreferencesStart,
  fetchPreferencesSuccess,
  fetchPreferencesFailure,
} = notificationsSlice.actions;

export const selectNotificationPreferences = (state: RootState) => 
  state.notifications.preferences;
export const selectIsLoading = (state: RootState) => state.notifications.isLoading;
export const selectError = (state: RootState) => state.notifications.error;

export default notificationsSlice.reducer;
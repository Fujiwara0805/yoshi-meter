import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Bell, Globe, Moon, Info } from 'lucide-react-native';
import { NotificationPreference } from '@/components/ui/Notifications/NotificationPreference';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectNotificationPreferences,
  toggleNotificationPreference,
  toggleNotificationOption
} from '@/store/features/notificationsSlice';
import { selectLanguage, setLanguage } from '@/store/features/settingsSlice';
import type { Language } from '@/store/features/settingsSlice';

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const preferences = useSelector(selectNotificationPreferences);
  const currentLanguage = useSelector(selectLanguage);

  const handleLanguageChange = () => {
    dispatch(setLanguage(currentLanguage === 'ja' ? 'en' : 'ja'));
  };

  const handleTogglePreference = (id: string) => {
    dispatch(toggleNotificationPreference(id));
  };

  const handleToggleOption = (preferenceId: string, optionId: string) => {
    dispatch(toggleNotificationOption({ preferenceId, optionId }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg' }}
        style={styles.headerBackground}
      >
        <View style={styles.headerOverlay}>
          <Text style={styles.headerTitle}>設定 / Settings</Text>
        </View>
      </ImageBackground>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>通知設定</Text>
          
          {preferences.map(preference => (
            <NotificationPreference
              key={preference.id}
              title={preference.title}
              description={preference.description}
              isEnabled={preference.isEnabled}
              onToggle={() => handleTogglePreference(preference.id)}
              options={preference.options.map(option => ({
                label: option.label,
                isEnabled: option.isEnabled,
                onToggle: () => handleToggleOption(preference.id, option.id),
              }))}
            />
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>アプリ設定</Text>
          
          <View style={styles.settingCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Bell size={20} color="#005A9C" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>通知音</Text>
                <Text style={styles.settingDescription}>三振時のカスタム音声</Text>
              </View>
              <ChevronRight size={20} color="#666" />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Globe size={20} color="#005A9C" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>言語</Text>
                <Text style={styles.settingDescription}>日本語 / English</Text>
              </View>
              <ChevronRight size={20} color="#666" />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Moon size={20} color="#005A9C" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>ダークモード</Text>
                <Text style={styles.settingDescription}>端末の設定に従う</Text>
              </View>
              <Switch
                value={false}
                trackColor={{ false: '#D1D5DB', true: '#005A9C' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>このアプリについて</Text>
          
          <View style={styles.settingCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Info size={20} color="#005A9C" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>アプリバージョン</Text>
                <Text style={styles.settingDescription}>1.0.0</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>利用規約</Text>
              </View>
              <ChevronRight size={20} color="#666" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>プライバシーポリシー</Text>
              </View>
              <ChevronRight size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E4B8D',
  },
  headerBackground: {
    height: 120,
  },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 75, 141, 0.9)',
    padding: 20,
    justifyContent: 'flex-end',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  content: {
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E4B8D',
    marginBottom: 12,
  },
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D8E6F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D8E6F6',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#D8E6F6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E4B8D',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  }
});
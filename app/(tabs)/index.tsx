import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Bell, Calendar, ChevronRight } from 'lucide-react-native';
import { useFonts, NotoSansJP_700Bold, NotoSansJP_500Medium } from '@expo-google-fonts/noto-sans-jp';
import * as SplashScreen from 'expo-splash-screen';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { GameCard } from '@/components/ui/Games/GameCard';
import { StrikeoutCounter } from '@/components/ui/Stats/StrikeoutCounter';
import { useSelector } from 'react-redux';
import { selectCurrentGame } from '@/store/features/gamesSlice';
import { selectNews } from '@/store/features/newsSlice';

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  useFrameworkReady();
  const router = useRouter();
  const currentGame = useSelector(selectCurrentGame);
  const newsItems = useSelector(selectNews);
  
  const [fontsLoaded] = useFonts({
    'NotoSansJP-Bold': NotoSansJP_700Bold,
    'NotoSansJP-Medium': NotoSansJP_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.welcome}>ようこそ / Welcome</Text>
            <Text style={styles.title}>山本 由伸</Text>
            <Text style={styles.subtitle}>Yoshinobu Yamamoto</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => router.push('/settings')}
          >
            <Bell size={24} color="#005A9C" />
          </TouchableOpacity>
        </View>

        <View style={styles.heroSection}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/13770299/pexels-photo-13770299.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }} 
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.statsSummary}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3.12</Text>
              <Text style={styles.statLabel}>ERA</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>78</Text>
              <Text style={styles.statLabel}>K</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1.08</Text>
              <Text style={styles.statLabel}>WHIP</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Current Game</Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={() => router.push('/games')}
            >
              <Text style={styles.seeAllText}>See all</Text>
              <ChevronRight size={16} color="#005A9C" />
            </TouchableOpacity>
          </View>
          
          {currentGame ? (
            <GameCard
              id={currentGame.id}
              status={currentGame.status}
              homeTeam={currentGame.homeTeam}
              awayTeam={currentGame.awayTeam}
              date={currentGame.date}
              time={currentGame.time}
              yamamoto={currentGame.yamamoto}
            />
          ) : (
            <View style={styles.noGameContainer}>
              <Calendar size={40} color="#999" />
              <Text style={styles.noGameText}>No game in progress</Text>
              <Text style={styles.noGameSubtext}>Check the schedule for upcoming games</Text>
            </View>
          )}
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Strikeouts</Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={() => router.push('/stats')}
            >
              <Text style={styles.seeAllText}>See stats</Text>
              <ChevronRight size={16} color="#005A9C" />
            </TouchableOpacity>
          </View>
          
          <StrikeoutCounter gameView={true} />
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest News</Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={() => router.push('/news')}
            >
              <Text style={styles.seeAllText}>More news</Text>
              <ChevronRight size={16} color="#005A9C" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.featuredNewsCard}
            onPress={() => router.push(`/news/${newsItems[0]?.id}`)}
            activeOpacity={0.8}
          >
            <Image 
              source={{ uri: newsItems[0]?.imageUrl }} 
              style={styles.featuredNewsImage}
              resizeMode="cover"
            />
            <View style={styles.featuredNewsContent}>
              <Text style={styles.featuredNewsSource}>{newsItems[0]?.source}</Text>
              <Text style={styles.featuredNewsTitle} numberOfLines={2}>{newsItems[0]?.title}</Text>
              <Text style={styles.featuredNewsTimestamp}>{newsItems[0]?.timestamp}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  headerContent: {
    flex: 1,
  },
  welcome: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#005A9C',
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  heroSection: {
    position: 'relative',
    marginBottom: 16,
  },
  heroImage: {
    width: '100%',
    height: 200,
  },
  statsSummary: {
    position: 'absolute',
    bottom: -30,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#005A9C',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    height: 30,
    width: 1,
    backgroundColor: '#EFEFEF',
  },
  sectionContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: '#005A9C',
    fontWeight: '500',
    marginRight: 2,
  },
  noGameContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noGameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 4,
  },
  noGameSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  featuredNewsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredNewsImage: {
    width: '100%',
    height: 160,
  },
  featuredNewsContent: {
    padding: 16,
  },
  featuredNewsSource: {
    fontSize: 12,
    color: '#005A9C',
    fontWeight: '600',
    marginBottom: 4,
  },
  featuredNewsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  featuredNewsTimestamp: {
    fontSize: 12,
    color: '#666',
  },
});
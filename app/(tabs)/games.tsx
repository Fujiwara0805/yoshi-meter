import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameCard } from '@/components/ui/Games/GameCard';
import { useSelector } from 'react-redux';
import { selectCurrentGame, selectUpcomingGames, selectPreviousGames } from '@/store/features/gamesSlice';

export default function GamesScreen() {
  const currentGame = useSelector(selectCurrentGame);
  const upcomingGames = useSelector(selectUpcomingGames);
  const previousGames = useSelector(selectPreviousGames);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>山本 由伸 Games</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {currentGame && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Game</Text>
            <GameCard
              id={currentGame.id}
              status={currentGame.status}
              homeTeam={currentGame.homeTeam}
              awayTeam={currentGame.awayTeam}
              date={currentGame.date}
              time={currentGame.time}
              yamamoto={currentGame.yamamoto}
            />
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Games</Text>
          {upcomingGames.length > 0 ? (
            upcomingGames.map(game => (
              <GameCard 
                key={game.id}
                id={game.id}
                status={game.status}
                homeTeam={game.homeTeam}
                awayTeam={game.awayTeam}
                date={game.date}
                time={game.time}
                yamamoto={game.yamamoto}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No upcoming games scheduled</Text>
            </View>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Previous Games</Text>
          {previousGames.length > 0 ? (
            previousGames.map(game => (
              <GameCard 
                key={game.id}
                id={game.id}
                status={game.status}
                homeTeam={game.homeTeam}
                awayTeam={game.awayTeam}
                date={game.date}
                time={game.time}
                yamamoto={game.yamamoto}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No previous games found</Text>
            </View>
          )}
        </View>

        <View style={styles.scheduleContainer}>
          <Text style={styles.scheduleTitle}>Upcoming Schedule</Text>
          <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
              <Text style={styles.monthText}>June 2025</Text>
            </View>
            <View style={styles.calendarDates}>
              {[15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map(date => {
                // Highlight dates when Yamamoto is pitching (for demo)
                const isYamamotoGame = date === 18 || date === 20 || date === 25;
                const isToday = date === 18;
                
                return (
                  <TouchableOpacity 
                    key={date} 
                    style={[
                      styles.dateItem,
                      isYamamotoGame && styles.yamamotoDateItem,
                      isToday && styles.todayDateItem,
                    ]}
                    activeOpacity={0.7}
                  >
                    <Text 
                      style={[
                        styles.dateText,
                        isYamamotoGame && styles.yamamotoDateText,
                        isToday && styles.todayDateText,
                      ]}
                    >
                      {date}
                    </Text>
                    {isYamamotoGame && (
                      <View style={styles.pitchIndicator} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.calendarLegend}>
              <View style={styles.legendItem}>
                <View style={styles.legendDot} />
                <Text style={styles.legendText}>Yamamoto Pitching</Text>
              </View>
            </View>
          </View>
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
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#005A9C',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
  },
  scheduleContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  calendarHeader: {
    backgroundColor: '#005A9C',
    padding: 16,
    alignItems: 'center',
  },
  monthText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  calendarDates: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  dateItem: {
    width: '14.28%', // 7 dates per row
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  yamamotoDateItem: {
    backgroundColor: '#F0F6FF',
    borderRadius: 25,
  },
  yamamotoDateText: {
    color: '#005A9C',
    fontWeight: '600',
  },
  todayDateItem: {
    backgroundColor: '#005A9C',
    borderRadius: 25,
  },
  todayDateText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  pitchIndicator: {
    width: 4,
    height: 4,
    backgroundColor: '#E4002B',
    position: 'absolute',
    bottom: 8,
    borderRadius: 2,
  },
  calendarLegend: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    backgroundColor: '#F0F6FF',
    borderWidth: 1,
    borderColor: '#005A9C',
    borderRadius: 5,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
});
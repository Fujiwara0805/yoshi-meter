import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ChevronLeft, Clock } from 'lucide-react-native';
import { StrikeoutCounter } from '@/components/ui/Stats/StrikeoutCounter';
import { useSelector } from 'react-redux';
import { selectCurrentGame } from '@/store/features/gamesSlice';

export default function GameDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const currentGame = useSelector(selectCurrentGame);
  
  // In a real app, we would fetch the specific game data based on the ID
  // For now, we'll just use the current game data from Redux
  const game = currentGame;

  if (!game) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Game Details',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <ChevronLeft size={24} color="#000" />
              </TouchableOpacity>
            ),
          }}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Game not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Game Details</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.scoreboardContainer}>
          <View style={styles.teamRow}>
            <View style={styles.teamContainer}>
              <Image 
                source={{ uri: game.awayTeam.logoUrl }} 
                style={styles.teamLogo} 
                resizeMode="contain"
              />
              <Text style={styles.teamName}>{game.awayTeam.name}</Text>
            </View>
            
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{game.awayTeam.score}</Text>
            </View>
          </View>
          
          <View style={styles.teamRow}>
            <View style={styles.teamContainer}>
              <Image 
                source={{ uri: game.homeTeam.logoUrl }} 
                style={styles.teamLogo} 
                resizeMode="contain"
              />
              <Text style={styles.teamName}>{game.homeTeam.name}</Text>
            </View>
            
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{game.homeTeam.score}</Text>
            </View>
          </View>
          
          <View style={styles.gameInfo}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>LIVE</Text>
            </View>
            <View style={styles.inningContainer}>
              <Text style={styles.inningText}>Top 6th</Text>
            </View>
            <View style={styles.timeContainer}>
              <Clock size={12} color="#666" />
              <Text style={styles.timeText}>7:45 PM</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.yamamotoStatsContainer}>
          <Text style={styles.yamamotoHeader}>山本 由伸 Pitching Stats</Text>
          
          <View style={styles.currentLineContainer}>
            <Text style={styles.currentLineTitle}>CURRENT LINE</Text>
            <Text style={styles.currentLineText}>
              {game.yamamoto.inningsPitched} IP, {game.yamamoto.strikeouts} K, 1 BB, 2 ER
            </Text>
            <View style={styles.pitchCountContainer}>
              <Text style={styles.pitchCountTitle}>PITCH COUNT</Text>
              <Text style={styles.pitchCount}>{game.yamamoto.pitchCount}</Text>
            </View>
          </View>
          
          <View style={styles.pitchChartContainer}>
            <Text style={styles.pitchChartTitle}>PITCH DISTRIBUTION</Text>
            <View style={styles.pitchChartContent}>
              <View style={styles.pitchTypeBar}>
                <View style={[styles.pitchSegment, styles.fastballSegment, { flex: 0.45 }]} />
                <View style={[styles.pitchSegment, styles.splitterSegment, { flex: 0.25 }]} />
                <View style={[styles.pitchSegment, styles.curveSegment, { flex: 0.15 }]} />
                <View style={[styles.pitchSegment, styles.cutterSegment, { flex: 0.15 }]} />
              </View>
              <View style={styles.pitchLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, styles.fastballDot]} />
                  <Text style={styles.legendText}>FB: 45%</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, styles.splitterDot]} />
                  <Text style={styles.legendText}>SPL: 25%</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, styles.curveDot]} />
                  <Text style={styles.legendText}>CRV: 15%</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, styles.cutterDot]} />
                  <Text style={styles.legendText}>CUT: 15%</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.strikeoutSection}>
            <Text style={styles.strikeoutTitle}>STRIKEOUTS</Text>
            <StrikeoutCounter gameView={true} />
          </View>
          
          <View style={styles.inningByInningContainer}>
            <Text style={styles.inningByInningTitle}>INNING BY INNING</Text>
            
            <View style={styles.inningRow}>
              <View style={styles.inningNumberContainer}>
                <Text style={styles.inningNumber}>1</Text>
              </View>
              <Text style={styles.inningStats}>12 pitches, 2 K, 0 H, 0 R</Text>
            </View>
            
            <View style={styles.inningRow}>
              <View style={styles.inningNumberContainer}>
                <Text style={styles.inningNumber}>2</Text>
              </View>
              <Text style={styles.inningStats}>15 pitches, 1 K, 1 H, 0 R</Text>
            </View>
            
            <View style={styles.inningRow}>
              <View style={styles.inningNumberContainer}>
                <Text style={styles.inningNumber}>3</Text>
              </View>
              <Text style={styles.inningStats}>10 pitches, 1 K, 0 H, 0 R</Text>
            </View>
            
            <View style={styles.inningRow}>
              <View style={styles.inningNumberContainer}>
                <Text style={styles.inningNumber}>4</Text>
              </View>
              <Text style={styles.inningStats}>18 pitches, 0 K, 2 H, 2 R</Text>
            </View>
            
            <View style={styles.inningRow}>
              <View style={styles.inningNumberContainer}>
                <Text style={styles.inningNumber}>5</Text>
              </View>
              <Text style={styles.inningStats}>14 pitches, 2 K, 0 H, 0 R</Text>
            </View>
            
            <View style={styles.inningRow}>
              <View style={[styles.inningNumberContainer, styles.currentInningContainer]}>
                <Text style={[styles.inningNumber, styles.currentInningNumber]}>6</Text>
              </View>
              <Text style={styles.inningStats}>9 pitches, 0 K, 0 H, 0 R</Text>
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
    backgroundColor: '#005A9C',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  content: {
    paddingBottom: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
  },
  scoreboardContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  teamLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  teamName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  scoreContainer: {
    backgroundColor: '#F0F6FF',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#005A9C',
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  statusBadge: {
    backgroundColor: '#FFEBEB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#E4002B',
    fontWeight: '600',
    fontSize: 12,
  },
  inningContainer: {
    flex: 1,
    alignItems: 'center',
  },
  inningText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  yamamotoStatsContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    padding: 16,
  },
  yamamotoHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#005A9C',
    marginBottom: 16,
  },
  currentLineContainer: {
    backgroundColor: '#F0F6FF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  currentLineTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  currentLineText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  pitchCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  pitchCountTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  pitchCount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#005A9C',
  },
  pitchChartContainer: {
    marginBottom: 16,
  },
  pitchChartTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  pitchChartContent: {
    marginVertical: 8,
  },
  pitchTypeBar: {
    height: 20,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
  },
  pitchSegment: {
    height: '100%',
  },
  fastballSegment: {
    backgroundColor: '#005A9C',
  },
  splitterSegment: {
    backgroundColor: '#E4002B',
  },
  curveSegment: {
    backgroundColor: '#34D399',
  },
  cutterSegment: {
    backgroundColor: '#F59E0B',
  },
  pitchLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  fastballDot: {
    backgroundColor: '#005A9C',
  },
  splitterDot: {
    backgroundColor: '#E4002B',
  },
  curveDot: {
    backgroundColor: '#34D399',
  },
  cutterDot: {
    backgroundColor: '#F59E0B',
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  strikeoutSection: {
    marginBottom: 16,
  },
  strikeoutTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inningByInningContainer: {
    marginVertical: 8,
  },
  inningByInningTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  inningNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  inningNumber: {
    fontWeight: '600',
    color: '#005A9C',
  },
  currentInningContainer: {
    backgroundColor: '#005A9C',
  },
  currentInningNumber: {
    color: '#FFFFFF',
  },
  inningStats: {
    fontSize: 14,
    color: '#333',
  },
});
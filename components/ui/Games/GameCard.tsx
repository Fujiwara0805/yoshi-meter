import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, Clock } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface GameCardProps {
  id: string;
  status: 'upcoming' | 'live' | 'completed';
  homeTeam: {
    name: string;
    logoUrl: string;
    score?: number;
  };
  awayTeam: {
    name: string;
    logoUrl: string;
    score?: number;
  };
  date: string;
  time: string;
  yamamoto: {
    isStarting: boolean;
    pitchCount?: number;
    strikeouts?: number;
    inningsPitched?: number;
  };
}

export const GameCard: React.FC<GameCardProps> = ({
  id,
  status,
  homeTeam,
  awayTeam,
  date,
  time,
  yamamoto
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/game/${id}`);
  };

  const statusStyles: Record<string, any> = {
    upcoming: {
      container: styles.upcomingContainer,
      text: styles.upcomingText,
      label: "UPCOMING"
    },
    live: {
      container: styles.liveContainer,
      text: styles.liveText,
      label: "LIVE NOW"
    },
    completed: {
      container: styles.completedContainer,
      text: styles.completedText,
      label: "FINAL"
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Animated.View 
        entering={FadeIn.duration(500)} 
        style={styles.container}
      >
        <View style={styles.header}>
          <View style={statusStyles[status].container}>
            <Text style={statusStyles[status].text}>{statusStyles[status].label}</Text>
          </View>
          
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateContainer}>
              <Calendar size={14} color="#666" />
              <Text style={styles.dateText}>{date}</Text>
            </View>
            <View style={styles.timeContainer}>
              <Clock size={14} color="#666" />
              <Text style={styles.timeText}>{time}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.teamsContainer}>
          <View style={styles.teamContainer}>
            <Image 
              source={{ uri: awayTeam.logoUrl }} 
              style={styles.teamLogo} 
              resizeMode="contain"
            />
            <Text style={styles.teamName}>{awayTeam.name}</Text>
            {status !== 'upcoming' && (
              <Text style={styles.scoreText}>{awayTeam.score}</Text>
            )}
          </View>
          
          <Text style={styles.vsText}>@</Text>
          
          <View style={styles.teamContainer}>
            <Image 
              source={{ uri: homeTeam.logoUrl }} 
              style={styles.teamLogo} 
              resizeMode="contain"
            />
            <Text style={styles.teamName}>{homeTeam.name}</Text>
            {status !== 'upcoming' && (
              <Text style={styles.scoreText}>{homeTeam.score}</Text>
            )}
          </View>
        </View>
        
        <View style={styles.footer}>
          {yamamoto.isStarting ? (
            <View style={styles.startingContainer}>
              <Text style={styles.startingText}>山本 由伸 - STARTING PITCHER</Text>
              
              {status === 'live' && (
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>PITCHES</Text>
                    <Text style={styles.statValue}>{yamamoto.pitchCount}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>K</Text>
                    <Text style={styles.statValue}>{yamamoto.strikeouts}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>IP</Text>
                    <Text style={styles.statValue}>{yamamoto.inningsPitched}</Text>
                  </View>
                </View>
              )}
              
              {status === 'completed' && (
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>FINAL LINE</Text>
                    <Text style={styles.statValue}>
                      {yamamoto.inningsPitched} IP, {yamamoto.strikeouts} K
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <Text style={styles.notStartingText}>山本 由伸 is not scheduled to pitch</Text>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  upcomingContainer: {
    backgroundColor: '#EBF5FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  upcomingText: {
    color: '#005A9C',
    fontWeight: '600',
    fontSize: 12,
  },
  liveContainer: {
    backgroundColor: '#FFEBEB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveText: {
    color: '#E4002B',
    fontWeight: '600',
    fontSize: 12,
  },
  completedContainer: {
    backgroundColor: '#EBFFF0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedText: {
    color: '#047857',
    fontWeight: '600',
    fontSize: 12,
  },
  dateTimeContainer: {
    flexDirection: 'row',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
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
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamContainer: {
    alignItems: 'center',
    flex: 1,
  },
  teamLogo: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#005A9C',
    marginTop: 4,
  },
  vsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  footer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 12,
  },
  startingContainer: {
    alignItems: 'center',
  },
  startingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#005A9C',
    marginBottom: 8,
  },
  notStartingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
});

export default GameCard;
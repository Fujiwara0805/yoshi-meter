import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { selectStrikeoutCount } from '../../../store/features/statsSlice';

type StrikeoutLetterProps = {
  visible: boolean;
  animationDelay?: number;
};

const StrikeoutLetter: React.FC<StrikeoutLetterProps> = ({ visible, animationDelay = 0 }) => {
  if (!visible) return <View style={styles.letterPlaceholder} />;

  return (
    <Animated.View 
      entering={ZoomIn.delay(animationDelay).springify()}
      style={styles.letterContainer}
    >
      <Text style={styles.letter}>K</Text>
    </Animated.View>
  );
};

type StrikeoutCounterProps = {
  gameView?: boolean;
};

export const StrikeoutCounter: React.FC<StrikeoutCounterProps> = ({ gameView = false }) => {
  const strikeoutCount = useSelector(selectStrikeoutCount);
  
  // For demo purposes, using a static count - in real app, this would come from the Redux store
  const count = strikeoutCount || 6;

  // Create a 2x5 grid for K display (current game)
  const gameGrid = Array(10).fill(false).map((_, i) => i < count);
  
  // For season stats, would show a larger grid
  const seasonGrid = gameView ? [] : Array(50).fill(false).map((_, i) => i < (count * 3));

  return (
    <View style={styles.container}>
      <Text style={styles.counterTitle}>
        {gameView ? 'TODAY\'S STRIKEOUTS' : 'SEASON STRIKEOUTS'}
      </Text>
      
      <Animated.View 
        entering={FadeIn.duration(500)}
        style={styles.counterContainer}
      >
        {gameView ? (
          // Game view: 2x5 grid
          <View style={styles.gameGrid}>
            <View style={styles.gridRow}>
              {gameGrid.slice(0, 5).map((active, index) => (
                <StrikeoutLetter 
                  key={`top-${index}`} 
                  visible={active} 
                  animationDelay={index * 100}
                />
              ))}
            </View>
            <View style={styles.gridRow}>
              {gameGrid.slice(5, 10).map((active, index) => (
                <StrikeoutLetter 
                  key={`bottom-${index}`} 
                  visible={active} 
                  animationDelay={(index + 5) * 100}
                />
              ))}
            </View>
          </View>
        ) : (
          // Season stats: 10x5 grid (simplified for now)
          <View style={styles.seasonCounter}>
            <Text style={styles.seasonCount}>{count * 3}</Text>
          </View>
        )}
      </Animated.View>
      
      <Text style={styles.totalLabel}>
        {gameView ? `TOTAL: ${count}` : `MLB RANK: #3`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 8,
  },
  counterTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#005A9C',
    marginBottom: 12,
    textAlign: 'center',
  },
  counterContainer: {
    marginVertical: 8,
  },
  gameGrid: {
    marginVertical: 8,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 4,
  },
  letterContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#005A9C',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderRadius: 6,
  },
  letterPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#E5E5E5',
    margin: 4,
    borderRadius: 6,
  },
  letter: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  seasonCounter: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  seasonCount: {
    fontSize: 48,
    fontWeight: '700',
    color: '#005A9C',
  },
  totalLabel: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginTop: 8,
  },
});

export default StrikeoutCounter;
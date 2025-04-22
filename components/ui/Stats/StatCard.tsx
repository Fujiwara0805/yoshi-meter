import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

type StatTrend = 'up' | 'down' | 'neutral';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: StatTrend;
  trendValue?: string;
  average?: string;
  rank?: number;
  index?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  trend = 'neutral',
  trendValue,
  average,
  rank,
  index = 0 
}) => {
  return (
    <Animated.View 
      entering={FadeInRight.delay(index * 100).springify()} 
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {trend !== 'neutral' && (
          <View style={[
            styles.trendContainer, 
            trend === 'up' ? styles.trendUp : styles.trendDown
          ]}>
            {trend === 'up' ? (
              <TrendingUp size={14} color="#FFFFFF" />
            ) : (
              <TrendingDown size={14} color="#FFFFFF" />
            )}
            {trendValue && <Text style={styles.trendText}>{trendValue}</Text>}
          </View>
        )}
      </View>
      
      <Text style={styles.value}>{value}</Text>
      
      <View style={styles.footer}>
        {average && (
          <Text style={styles.average}>AVG: {average}</Text>
        )}
        {rank && (
          <Text style={styles.rank}>MLB #{rank}</Text>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 8,
    width: '45%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  trendUp: {
    backgroundColor: '#34D399',
  },
  trendDown: {
    backgroundColor: '#EF4444',
  },
  trendText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 2,
    fontWeight: '500',
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    color: '#005A9C',
    marginVertical: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  average: {
    fontSize: 12,
    color: '#666',
  },
  rank: {
    fontSize: 12,
    fontWeight: '600',
    color: '#E4002B',
  },
});

export default StatCard;
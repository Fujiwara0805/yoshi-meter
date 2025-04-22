import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StrikeoutCounter } from '@/components/ui/Stats/StrikeoutCounter';
import { StatCard } from '@/components/ui/Stats/StatCard';
import { useSelector } from 'react-redux';
import { selectStats } from '@/store/features/statsSlice';

export default function StatsScreen() {
  const stats = useSelector(selectStats);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>山本 由伸 Statistics</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Strikeouts</Text>
          <StrikeoutCounter gameView={false} />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                trend={stat.trend}
                trendValue={stat.trendValue}
                average={stat.average}
                rank={stat.rank}
                index={index}
              />
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Season Comparison</Text>
          <View style={styles.comparisonCard}>
            <View style={styles.comparisonHeader}>
              <Text style={styles.comparisonTitle}>2025 MLB Season</Text>
              <Text style={styles.comparisonSubtitle}>vs. League Average</Text>
            </View>
            
            <View style={styles.comparisonItem}>
              <View style={styles.metricLabel}>
                <Text style={styles.metricText}>ERA</Text>
              </View>
              <View style={styles.barContainer}>
                <View style={styles.avgBar}>
                  <View 
                    style={[
                      styles.playerBar, 
                      { width: `${(3.12 / 4.50) * 100}%` }
                    ]} 
                  />
                </View>
                <View style={styles.barLabels}>
                  <Text style={styles.playerValue}>3.12</Text>
                  <Text style={styles.avgValue}>4.50</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.comparisonItem}>
              <View style={styles.metricLabel}>
                <Text style={styles.metricText}>K/9</Text>
              </View>
              <View style={styles.barContainer}>
                <View style={styles.avgBar}>
                  <View 
                    style={[
                      styles.playerBar, 
                      { width: `${(10.2 / 8.7) * 80}%` }
                    ]} 
                  />
                </View>
                <View style={styles.barLabels}>
                  <Text style={styles.playerValue}>10.2</Text>
                  <Text style={styles.avgValue}>8.7</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.comparisonItem}>
              <View style={styles.metricLabel}>
                <Text style={styles.metricText}>WHIP</Text>
              </View>
              <View style={styles.barContainer}>
                <View style={styles.avgBar}>
                  <View 
                    style={[
                      styles.playerBar, 
                      { width: `${(1.08 / 1.23) * 80}%` }
                    ]} 
                  />
                </View>
                <View style={styles.barLabels}>
                  <Text style={styles.playerValue}>1.08</Text>
                  <Text style={styles.avgValue}>1.23</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={styles.legendDot} />
                <Text style={styles.legendText}>Yamamoto</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.avgDot]} />
                <Text style={styles.legendText}>League Average</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pitch Arsenal</Text>
          <View style={styles.pitchCard}>
            <View style={styles.pitchHeader}>
              <Text style={styles.pitchTitle}>Pitch Distribution</Text>
            </View>
            
            <View style={styles.pitchItem}>
              <View style={styles.pitchNameContainer}>
                <View style={[styles.pitchDot, styles.fastballDot]} />
                <Text style={styles.pitchName}>Fastball</Text>
              </View>
              <View style={styles.pitchBarContainer}>
                <View style={[styles.pitchBar, styles.fastballBar, { width: '40%' }]} />
                <Text style={styles.pitchPercentage}>40%</Text>
              </View>
            </View>
            
            <View style={styles.pitchItem}>
              <View style={styles.pitchNameContainer}>
                <View style={[styles.pitchDot, styles.splitterDot]} />
                <Text style={styles.pitchName}>Splitter</Text>
              </View>
              <View style={styles.pitchBarContainer}>
                <View style={[styles.pitchBar, styles.splitterBar, { width: '25%' }]} />
                <Text style={styles.pitchPercentage}>25%</Text>
              </View>
            </View>
            
            <View style={styles.pitchItem}>
              <View style={styles.pitchNameContainer}>
                <View style={[styles.pitchDot, styles.curveDot]} />
                <Text style={styles.pitchName}>Curveball</Text>
              </View>
              <View style={styles.pitchBarContainer}>
                <View style={[styles.pitchBar, styles.curveBar, { width: '20%' }]} />
                <Text style={styles.pitchPercentage}>20%</Text>
              </View>
            </View>
            
            <View style={styles.pitchItem}>
              <View style={styles.pitchNameContainer}>
                <View style={[styles.pitchDot, styles.cutterDot]} />
                <Text style={styles.pitchName}>Cutter</Text>
              </View>
              <View style={styles.pitchBarContainer}>
                <View style={[styles.pitchBar, styles.cutterBar, { width: '15%' }]} />
                <Text style={styles.pitchPercentage}>15%</Text>
              </View>
            </View>
            
            <View style={styles.pitchDataContainer}>
              <Text style={styles.pitchDataTitle}>Average Velocity</Text>
              <View style={styles.velocityData}>
                <View style={styles.velocityItem}>
                  <Text style={styles.velocityPitch}>FB</Text>
                  <Text style={styles.velocityValue}>97.2 mph</Text>
                </View>
                <View style={styles.velocityItem}>
                  <Text style={styles.velocityPitch}>SPL</Text>
                  <Text style={styles.velocityValue}>89.4 mph</Text>
                </View>
                <View style={styles.velocityItem}>
                  <Text style={styles.velocityPitch}>CRV</Text>
                  <Text style={styles.velocityValue}>83.7 mph</Text>
                </View>
                <View style={styles.velocityItem}>
                  <Text style={styles.velocityPitch}>CUT</Text>
                  <Text style={styles.velocityValue}>91.5 mph</Text>
                </View>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -8,
  },
  comparisonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  comparisonHeader: {
    marginBottom: 16,
  },
  comparisonTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  comparisonSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  comparisonItem: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricLabel: {
    width: 50,
  },
  metricText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  barContainer: {
    flex: 1,
  },
  avgBar: {
    height: 16,
    backgroundColor: '#D1D5DB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  playerBar: {
    height: '100%',
    backgroundColor: '#005A9C',
    borderRadius: 8,
  },
  barLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  playerValue: {
    fontSize: 12,
    color: '#005A9C',
    fontWeight: '600',
  },
  avgValue: {
    fontSize: 12,
    color: '#666',
  },
  legend: {
    flexDirection: 'row',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    paddingTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  legendDot: {
    width: 10,
    height: 10,
    backgroundColor: '#005A9C',
    borderRadius: 5,
    marginRight: 6,
  },
  avgDot: {
    backgroundColor: '#D1D5DB',
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  pitchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pitchHeader: {
    marginBottom: 16,
  },
  pitchTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  pitchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pitchNameContainer: {
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pitchDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
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
  pitchName: {
    fontSize: 14,
    color: '#333',
  },
  pitchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pitchBar: {
    height: 12,
    borderRadius: 6,
  },
  fastballBar: {
    backgroundColor: '#005A9C',
  },
  splitterBar: {
    backgroundColor: '#E4002B',
  },
  curveBar: {
    backgroundColor: '#34D399',
  },
  cutterBar: {
    backgroundColor: '#F59E0B',
  },
  pitchPercentage: {
    fontSize: 12,
    marginLeft: 8,
    color: '#666',
    fontWeight: '500',
  },
  pitchDataContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    paddingTop: 12,
  },
  pitchDataTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  velocityData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  velocityItem: {
    alignItems: 'center',
  },
  velocityPitch: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  velocityValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
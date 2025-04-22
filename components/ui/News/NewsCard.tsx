import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Play, Clock, ExternalLink } from 'lucide-react-native';
import Animated, { SlideInRight } from 'react-native-reanimated';

interface NewsCardProps {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  summary: string;
  imageUrl: string;
  isVideo?: boolean;
  onPress: (id: string) => void;
  index?: number;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  source,
  timestamp,
  summary,
  imageUrl,
  isVideo = false,
  onPress,
  index = 0
}) => {
  const handlePress = () => {
    onPress(id);
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <Animated.View 
        entering={SlideInRight.delay(index * 100).springify()}
        style={styles.container}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.image} 
            resizeMode="cover"
          />
          {isVideo && (
            <View style={styles.videoIndicator}>
              <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
            </View>
          )}
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.source}>{source}</Text>
            <View style={styles.timeContainer}>
              <Clock size={12} color="#666" />
              <Text style={styles.timestamp}>{timestamp}</Text>
            </View>
          </View>
          
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <Text style={styles.summary} numberOfLines={3}>{summary}</Text>
          
          <View style={styles.footer}>
            <Text style={styles.readMore}>
              Read more <ExternalLink size={12} color="#005A9C" />
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  videoIndicator: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: 'rgba(228, 0, 43, 0.8)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  source: {
    fontSize: 12,
    fontWeight: '600',
    color: '#005A9C',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  summary: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  readMore: {
    fontSize: 14,
    fontWeight: '500',
    color: '#005A9C',
  },
});

export default NewsCard;
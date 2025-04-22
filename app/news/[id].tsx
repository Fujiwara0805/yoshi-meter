import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ChevronLeft, Clock, Share2 } from 'lucide-react-native';
import { useSelector } from 'react-redux';
import { selectNews } from '@/store/features/newsSlice';

export default function NewsDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const newsItems = useSelector(selectNews);
  
  // Find the news item with the matching ID
  const newsItem = newsItems.find(item => item.id === id);

  if (!newsItem) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            title: 'News',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <ChevronLeft size={24} color="#000" />
              </TouchableOpacity>
            ),
          }}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>News article not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Sample article content for demonstration
  const articleContent = `
Los Angeles Dodgers pitcher Yoshinobu Yamamoto continues to dominate Major League Baseball, showcasing the elite talent that made him one of the most sought-after international free agents last offseason.

In Wednesday night's game against the San Francisco Giants, Yamamoto was nearly untouchable, striking out 10 batters over 7 innings while allowing just 3 hits and no walks. His splitter was particularly effective, generating 8 of his 10 strikeouts.

"His splitter is one of the best pitches in baseball right now," said Dodgers manager Dave Roberts. "When he's locating that pitch with his fastball, he's nearly impossible to hit."

Yamamoto's performance has solidified his place in the Dodgers' rotation and he continues to adapt well to the MLB style of play after coming over from Japan's Nippon Professional Baseball league.

"I'm still adjusting to the different schedule and ball, but I feel more comfortable with each start," Yamamoto said through his interpreter. "My goal is to help this team win a championship."

With this performance, Yamamoto improved to 8-3 on the season with a 3.12 ERA and 78 strikeouts over 68.1 innings pitched.
  `;

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
        <Text style={styles.headerTitle}>News</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Share2 size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <Image 
          source={{ uri: newsItem.imageUrl }} 
          style={styles.headerImage}
          resizeMode="cover"
        />
        
        <View style={styles.articleContainer}>
          <Text style={styles.title}>{newsItem.title}</Text>
          
          <View style={styles.metaContainer}>
            <Text style={styles.source}>{newsItem.source}</Text>
            <View style={styles.timeContainer}>
              <Clock size={14} color="#666" />
              <Text style={styles.timestamp}>{newsItem.timestamp}</Text>
            </View>
          </View>
          
          <Text style={styles.summary}>{newsItem.summary}</Text>
          
          <Text style={styles.articleText}>{articleContent}</Text>
          
          <View style={styles.tagsContainer}>
            <TouchableOpacity style={styles.tag}>
              <Text style={styles.tagText}>Dodgers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tag}>
              <Text style={styles.tagText}>Yamamoto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tag}>
              <Text style={styles.tagText}>MLB</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.relatedContainer}>
          <Text style={styles.relatedTitle}>Related News</Text>
          
          {newsItems
            .filter(item => item.id !== id)
            .slice(0, 2)
            .map(item => (
              <TouchableOpacity 
                key={item.id}
                style={styles.relatedItem}
                onPress={() => router.push(`/news/${item.id}`)}
                activeOpacity={0.7}
              >
                <Image 
                  source={{ uri: item.imageUrl }} 
                  style={styles.relatedImage}
                  resizeMode="cover"
                />
                <View style={styles.relatedContent}>
                  <Text style={styles.relatedItemTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.relatedItemSource}>{item.source}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#005A9C',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  shareButton: {
    padding: 4,
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
  headerImage: {
    width: '100%',
    height: 240,
  },
  articleContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    lineHeight: 32,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  source: {
    fontSize: 14,
    fontWeight: '600',
    color: '#005A9C',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  summary: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    lineHeight: 24,
  },
  articleText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  tag: {
    backgroundColor: '#F0F6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#005A9C',
    fontWeight: '500',
  },
  relatedContainer: {
    padding: 20,
    borderTopWidth: 8,
    borderTopColor: '#F5F7FA',
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  relatedItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  relatedImage: {
    width: 100,
    height: 80,
  },
  relatedContent: {
    flex: 1,
    padding: 12,
  },
  relatedItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  relatedItemSource: {
    fontSize: 12,
    color: '#666',
  },
});
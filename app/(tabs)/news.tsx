import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { NewsCard } from '@/components/ui/News/NewsCard';
import { useSelector } from 'react-redux';
import { selectNews } from '@/store/features/newsSlice';

export default function NewsScreen() {
  const router = useRouter();
  const newsItems = useSelector(selectNews);

  const handleNewsPress = (id: string) => {
    router.push(`/news/${id}`);
  };

  const categories = ['All', 'Articles', 'Videos', 'Social'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>山本 由伸 News</Text>
      </View>
      
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.categoryButton,
                index === 0 && styles.activeCategoryButton
              ]}
              activeOpacity={0.7}
            >
              <Text 
                style={[
                  styles.categoryText,
                  index === 0 && styles.activeCategoryText
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <ScrollView contentContainerStyle={styles.newsContent}>
        {newsItems.map((news, index) => (
          <NewsCard
            key={news.id}
            id={news.id}
            title={news.title}
            source={news.source}
            timestamp={news.timestamp}
            summary={news.summary}
            imageUrl={news.imageUrl}
            isVideo={news.isVideo}
            onPress={handleNewsPress}
            index={index}
          />
        ))}
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
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F0F6FF',
  },
  activeCategoryButton: {
    backgroundColor: '#005A9C',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#005A9C',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  newsContent: {
    padding: 12,
  },
});
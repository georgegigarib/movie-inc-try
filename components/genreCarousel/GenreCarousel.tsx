import React from 'react';
import { StyleSheet, View, Animated, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface Genre {
  id: number;
  name: string;
}

interface GenresCarouselProps {
  genres: Genre[];
}

const GenresCarousel: React.FC<GenresCarouselProps> = ({ genres }) => {
  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      contentContainerStyle={styles.genresContainer}
    >
      {genres.map((genre) => (
        <TouchableOpacity key={genre.id} style={styles.genreChip}>
          <ThemedText type="caption" style={{ fontWeight: '600' }}>
            {genre.name}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  genresContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  genreChip: {
    backgroundColor: '#5CB8F5DD',
    marginHorizontal: 5,
    borderRadius: 25,
    padding: 6,
  },
});

export default GenresCarousel;

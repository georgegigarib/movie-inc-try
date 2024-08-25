import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import GenreChip from '@/components/movie-details/genre-carousel/chip/GenreChip';

interface Genre {
  id: number;
  name: string;
}

interface GenresCarouselProps {
  genres: Genre[];
}

const GenresCarousel: React.FC<GenresCarouselProps> = ({ genres }) => (
  <Animated.ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    scrollEventThrottle={16}
    contentContainerStyle={styles.genresContainer}
  >
    {genres.map((genre) => (
      <GenreChip key={genre.id} name={genre.name} />
    ))}
  </Animated.ScrollView>
);

const styles = StyleSheet.create({
  genresContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default GenresCarousel;

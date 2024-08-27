import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { Movie } from '@/src/domain/Movies/model/Movie';
import { ThemedText } from '@/src/infrastructure/components/ThemedText';
import { MovieRepository } from '@/src/domain/Movies/repository/MovieRepository';
import Box from '@/src/infrastructure/components/movie-details/recommendation-carousel/box/Box';
import { ThemedView } from '@/src/infrastructure/components/ThemedView';

interface CarouselProps {
  selectedMovie: Movie;
  onMoviePress: (movie: Movie) => void;
}

const RecommendationCarousel: React.FC<CarouselProps> = ({ selectedMovie, onMoviePress }) => {
  const movieRepository = new MovieRepository();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    movieRepository
      .getRecommendations(selectedMovie.id)
      .then((movies) => {
        setMovies(movies);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load recommended movies.');
        setLoading(false);
      });
  }, [selectedMovie]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#b6b6b6" />
      </View>
    );
  }

  if (error) {
    return <ThemedText>{error}</ThemedText>;
  }

  return (
    <ThemedView>
      <ThemedText type="subtitle" style={{ marginVertical: 10 }}>
        Recommendations
      </ThemedText>

      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.moviesContainer}
      >
        {movies.map((movie) => (
          <Box key={movie.id} movie={movie} onPress={() => onMoviePress(movie)} />
        ))}
      </Animated.ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  moviesContainer: {
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecommendationCarousel;

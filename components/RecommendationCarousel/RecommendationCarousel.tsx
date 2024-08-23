import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Animated, TouchableOpacity } from 'react-native';
import { Movie } from '@/domain/Movies/model/Movie';
import { ThemedText } from '../ThemedText';
import { MovieRepository } from '@/domain/Movies/repository/MovieRepository';
import ImageWithLoader from '../imageBox/ImageWithLoader';

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
        setError('Could not load movies.');
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
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      contentContainerStyle={styles.moviesContainer}
    >
      {movies.map((movie) => (
        <TouchableOpacity key={movie.id} activeOpacity={0.7} onPress={() => onMoviePress(movie)}>
          <View style={styles.movieBox}>
            <View>
              <ImageWithLoader source={{ uri: movie.posterPath }} style={styles.posterContainer} />
            </View>
            <View style={styles.names}>
              <ThemedText style={styles.title}>{movie.title}</ThemedText>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  moviesContainer: {
    marginTop: 10,
  },
  movieBox: {
    width: 100,
    marginHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  names: {
    alignItems: 'center',
  },
  posterContainer: {
    width: 100,
    height: 150,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  caption: {
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default RecommendationCarousel;

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Movie } from '@/src/domain/Movies/model/Movie';
import { GetNowPlayingMoviesUseCase } from '@/src/domain/Movies/useCase/GetNowPlayingMoviesUseCase';
import Carousel from '@/components/movie-carousel/MovieCarousel';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import FavoritesModal from '@/components/favorites-modal/FavoritesModal';

export default function TrendingPage() {
  const router = useRouter();
  const getNowPlayingMoviesUseCase = new GetNowPlayingMoviesUseCase();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const favMovies = useSelector((state: RootState) => state.movies.movies);
  const [modalVisible, setModalVisible] = useState(false);

  const handleMoviePress = (movie: Movie) => {
    if (movie) {
      router.push({ pathname: '/details', params: { id: movie.id.toString() } });
    }
  };

  useEffect(() => {
    getNowPlayingMoviesUseCase
      .execute()
      .then((movies) => {
        setMovies(movies);
        setLoading(false);
      })
      .catch((err) => {
        setError(`Could not load movies. ${err}`);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#b6b6b6" />
        </View>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container} >
      <View style={styles.moviesContainer}>
        <ThemedText type="title" style={{ marginLeft: 20 }}>
          Now Playing
        </ThemedText>

        <Carousel onMoviePress={handleMoviePress} movies={movies} />
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
        <ThemedText style={styles.buttonText}>Favorites</ThemedText>
      </TouchableOpacity>

      <FavoritesModal visible={modalVisible} onClose={() => setModalVisible(false)} movies={favMovies} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#357fd8',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 70,
  },
  moviesContainer: {
    height: 580,
    marginTop: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

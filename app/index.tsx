import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Button, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Movie } from '@/domain/Movies/model/Movie';
import { GetNowPlayingMoviesUseCase } from '@/domain/Movies/useCase/GetNowPlayingMoviesUseCase';
import Carousel from '@/components/MovieCarousel/MovieCarousel';
import { Provider } from 'react-redux';
import store, { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, removeMovie } from '@/store/favoriteMovies.ts';
import CustomModal from '@/components/movieModal/MovieModal';

export default function TrendingPage() {
  const router = useRouter();
  const getNowPlayingMoviesUseCase = new GetNowPlayingMoviesUseCase();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const dispatch = useDispatch();
  const favMovies = useSelector((state: RootState) => state.movies.movies);
  const [modalVisible, setModalVisible] = useState(false);

  const handleMoviePress = (movie: Movie) => {
    setSelectedMovie(movie);
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
        setError('Could not load movies.');
        setLoading(false);
      });
  }, []);

  // Function to add a new movie
  const handleAddMovie = () => {
    dispatch(addMovie(movies[0]));
  };

  // Function to remove a movie by its ID
  const handleRemoveMovie = (id: number) => {
    dispatch(removeMovie(id));
  };

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
    <ThemedView style={styles.container}>
      <View style={styles.moviesContainer}>
        <ThemedText type="title" style={{ marginLeft: 20 }}>
          Now Playing
        </ThemedText>

        <Carousel onMoviePress={handleMoviePress} movies={movies} />
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
        <ThemedText style={styles.buttonText}>Favorites</ThemedText>
      </TouchableOpacity>
      <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)} movies={favMovies} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#357fd8', // Color de fondo
    borderRadius: 10, // Esquinas redondeadas
    paddingVertical: 10, // Espaciado vertical
    paddingHorizontal: 15, // Espaciado horizontal
    marginTop: 10, // Margen superior
    alignSelf: 'center', // Centrar horizontalmente
  },
  buttonText: {
    color: '#fff', // Color del texto
    fontSize: 16, // Tamaño del texto
    fontWeight: 'bold', // Negrita
    textAlign: 'center', // Centrar texto
  },
  container: {
    flex: 1,
    paddingTop: 70,
  },
  moviesContainer: {
    height: 580,
    marginTop: 15,
  },
  movieBox: {
    width: 250,
    marginHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

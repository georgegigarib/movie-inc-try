import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Movie } from "@/domain/Movies/model/Movie";
import { GetNowPlayingMoviesUseCase } from "@/domain/Movies/useCase/GetNowPlayingMoviesUseCase";
import Carousel from "@/components/MovieCarousel/MovieCarousel";
import CustomModal from "@/components/movieModal/MovieModal";

export default function NowPlaying() {
  const getNowPlayingMoviesUseCase = new GetNowPlayingMoviesUseCase();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleMoviePress = (movie: Movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    getNowPlayingMoviesUseCase.execute()
      .then((movies) => {
        setMovies(movies);
        setLoading(false);
      })
      .catch((err) => {
        setError('Could not load movies.');
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
    <ThemedView style={styles.container}>
      <ThemedText type='title' style={{ marginLeft: 20 }}>Now Playing</ThemedText>

      <Carousel onMoviePress={handleMoviePress} />

      <CustomModal
        visible={modalVisible}
        onClose={closeModal}
        selectedMovie={selectedMovie}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
  },
  moviesContainer: {
    flexGrow: 1,
    alignItems: 'center',
    height: 450,
    marginTop: 15,
    start: 20
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

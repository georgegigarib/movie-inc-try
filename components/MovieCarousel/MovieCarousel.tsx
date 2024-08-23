import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Animated } from "react-native";
import { Movie } from "@/domain/Movies/model/Movie";
import MovieBox from "@/components/moviebox/MovieBox";
import { GetNowPlayingMoviesUseCase } from "@/domain/Movies/useCase/GetNowPlayingMoviesUseCase";
import { ThemedText } from "../ThemedText";

interface CarouselProps {
  onMoviePress: (movie: Movie) => void;
}

export default function Carousel({ onMoviePress }: CarouselProps) {
  const getNowPlayingMoviesUseCase = new GetNowPlayingMoviesUseCase();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getNowPlayingMoviesUseCase
      .execute()
      .then((movies) => {
        setMovies(movies);
        setLoading(false);
      })
      .catch((err) => {
        setError("Could not load movies.");
        setLoading(false);
      });
  }, []);

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
        <View key={movie.id} style={styles.movieBox}>
          <MovieBox movie={movie} onPress={() => onMoviePress(movie)} />
        </View>
      ))}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  moviesContainer: {
    flexGrow: 1,
    alignItems: "center",
    height: 450,
    marginTop: 15,
    start: 20,
  },
  movieBox: {
    width: 250,
    marginHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

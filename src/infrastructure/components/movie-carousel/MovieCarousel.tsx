import React from "react";
import { StyleSheet, Animated } from "react-native";
import { Movie } from "@/src/domain/Movies/model/Movie";
import MovieBox from "@/src/infrastructure/components/movie-box/MovieBox";
import { ThemedView } from "@/src/infrastructure/components/ThemedView";

interface CarouselProps {
  onMoviePress: (movie: Movie) => void;
  movies: Movie[]
}

export default function Carousel({ onMoviePress, movies }: CarouselProps) {
  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      contentContainerStyle={styles.moviesContainer}
      testID="carousel-scroll-view"
    >
      {movies.map((movie) => (
        <ThemedView key={movie.id} style={styles.movieBox} testID={`movie-box-${movie.id}`}>
          <MovieBox movie={movie} onPress={() => onMoviePress(movie)} />
        </ThemedView>
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
    start: 15,
  },
  movieBox: {
    width: 250,
    marginHorizontal: 10,
  },
});

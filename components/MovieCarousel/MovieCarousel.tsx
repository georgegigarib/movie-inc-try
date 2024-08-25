import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Animated } from "react-native";
import { Movie } from "@/domain/Movies/model/Movie";
import MovieBox from "@/components/moviebox/MovieBox";
import { GetNowPlayingMoviesUseCase } from "@/domain/Movies/useCase/GetNowPlayingMoviesUseCase";
import { ThemedText } from "../ThemedText";

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
    start: 15,
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

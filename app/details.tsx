import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { Movie } from '@/domain/Movies/model/Movie';
import { GetMovieDetailsUseCase } from '@/domain/Movies/useCase/GetMovieDetailsUseCase';
import MovieDetails from '@/components/movie-details/MovieDetails';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function DetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const getMovieDetailsUseCase = new GetMovieDetailsUseCase();

  useEffect(() => {
    const movieId = Number(id);

    if (!isNaN(movieId)) {
      getMovieDetailsUseCase
        .execute(Number(id))
        .then((movieDetails) => {
          setMovie(movieDetails);
          setLoading(false);
        })
        .catch((err) => {
          setError('Could not load movie details.');
          setLoading(false);
        });
    } else {
      setError('Invalid movie ID.');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#b6b6b6" />
      </View>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>{error}</ThemedText>

        <Link href="/" style={styles.link}>
          <ThemedText>Go back to Trending</ThemedText>
        </Link>
      </ThemedView>
    );
  }

  if (!movie) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle">
          No movie data available.
        </ThemedText>

        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go back to Trending</ThemedText>
        </Link>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <MovieDetails movie={movie} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  image: {
    width: 100,
    height: 100,
  },
});

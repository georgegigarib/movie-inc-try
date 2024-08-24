import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Cambiado a useLocalSearchParams
import { Movie } from '@/domain/Movies/model/Movie';
import { GetMovieDetailsUseCase } from '@/domain/Movies/useCase/GetMovieDetailsUseCase';
import MovieDetails from '@/components/movieDetails/MovieDetails';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const getMovieDetailsUseCase = new GetMovieDetailsUseCase();

  useEffect(() => {
    if (id) {
      getMovieDetailsUseCase.execute(Number(id))
        .then((movieDetails) => {
          setMovie(movieDetails);
          setLoading(false);
        })
        .catch((err) => {
          setError('Could not load movie details.');
          setLoading(false);
        });
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
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text>No movie data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
       <MovieDetails movie={movie} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingHorizontal: 5
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

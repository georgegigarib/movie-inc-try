import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import MoviePoster from '@/components/movie-box/poster/Poster';
import { Movie } from '@/src/domain/Movies/model/Movie';
import { ThemedView } from '@/components/ThemedView';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addMovie, removeMovie } from '@/store/favoriteMovies.ts';

interface MovieBoxProps {
  movie: Movie | undefined;
  onPress?: () => void;
}

const MovieBox: React.FC<MovieBoxProps> = ({ movie, onPress }) => {
  const dispatch = useDispatch();
  const favMovies = useSelector((state: RootState) => state.movies.movies);

  const isFavorite = movie ? favMovies.some(favMovie => favMovie.id === movie.id) : false;

  const handleToggleFavorite = () => {
    if (movie) {
      const moviePlain = JSON.parse(JSON.stringify(movie));
      if (isFavorite) {
        dispatch(removeMovie(moviePlain.id));
      } else {
        dispatch(addMovie(moviePlain));
      }
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <ThemedView style={styles.container}>
        <MoviePoster
          posterPath={movie?.posterPath!}
          voteAverage={movie?.voteAverage}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
        <ThemedView style={styles.detailsContainer}>
          <ThemedText style={styles.title}>{movie?.title}</ThemedText>
          <ThemedText style={styles.caption}>Release date: {movie?.releaseDate}</ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 230,
    height: 450,
  },
  detailsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  caption: {
    fontSize: 15,
    lineHeight: 32,
    fontWeight: '400',
  },
});

export default MovieBox;

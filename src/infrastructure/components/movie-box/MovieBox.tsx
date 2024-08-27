import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/src/infrastructure/components/ThemedText';
import MoviePoster from '@/src/infrastructure/components/movie-box/poster/Poster';
import { Movie } from '@/src/domain/Movies/model/Movie';
import { ThemedView } from '@/src/infrastructure/components/ThemedView';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/infrastructure/store/store';
import { addMovie, removeMovie } from '@/src/infrastructure/store/favoriteMovies';

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
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} testID="movie-box-touchable">
      <ThemedView style={styles.container} testID="movie-box-container">
        <MoviePoster
          posterPath={movie?.posterPath!}
          voteAverage={movie?.voteAverage}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
        <ThemedView style={styles.detailsContainer} testID="movie-box-details">
          <ThemedText style={styles.title} testID="movie-box-title">
            {movie?.title}
          </ThemedText>
          
          <ThemedText style={styles.caption} testID="movie-box-caption">
            Release date: {movie?.releaseDate}
          </ThemedText>
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

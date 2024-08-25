import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import VoteAverage from '@/components/vote-average-meter/VoteAverage';
import RatingStars from '@/components/movie-details/rating-section/rating-stars/RatingStarts';
import FavoriteButton from '@/components/movie-details/rating-section/favorite/FavoriteButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addMovie, removeMovie } from '@/store/favoriteMovies.ts';
import { Movie } from '@/domain/Movies/model/Movie';

interface RatingSectionProps {
  movie: Movie;
}

const RatingSection: React.FC<RatingSectionProps> = ({ movie }) => {
  const dispatch = useDispatch();
  const favMovies = useSelector((state: RootState) => state.movies.movies);

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    setIsFavorite(favMovies.some((favMovie) => favMovie.id === movie.id));
  }, [favMovies, movie.id]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeMovie(movie.id));
    } else {
      dispatch(addMovie(JSON.parse(JSON.stringify(movie))));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <ThemedView style={styles.rateContainer}>
      <VoteAverage voteAverage={movie.voteAverage} />
      <FavoriteButton isFavorite={isFavorite} onToggleFavorite={handleToggleFavorite} />
      <RatingStars actualRate={movie.rating ?? 0} movieId={movie.id} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  rateContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    gap: 25,
  },
});

export default RatingSection;

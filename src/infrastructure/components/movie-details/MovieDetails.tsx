import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, Animated, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/src/infrastructure/components/ThemedText';
import { Movie } from '@/src/domain/Movies/model/Movie';
import { GetMovieDetailsUseCase } from '@/src/domain/Movies/useCase/GetMovieDetailsUseCase';
import ImageWithLoader from '@/src/infrastructure/components/image-loader-box/ImageLoaderBox';
import ActorCarousel from '@/src/infrastructure/components/movie-details/actor-carousel/ActorCarousel';
import GenresCarousel from '@/src/infrastructure/components/movie-details/genre-carousel/GenreCarousel';
import RecommendationCarousel from '@/src/infrastructure/components/movie-details/recommendation-carousel/RecommendationCarousel';
import RatingSection from '@/src/infrastructure/components/movie-details/rating-section/RatingSection';
import DescriptionSection from '@/src/infrastructure/components/movie-details/description-section/DescriptionSection';

interface MovieDetailsProps {
  movie: Movie | null;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [movieDetails, setMovieDetails] = useState<Movie>(movie || ({} as Movie));
  const getMovieDetailsUseCase = new GetMovieDetailsUseCase();

  useEffect(() => {
    if (movie) {
      fetchMovieDetails(movie.id);
    }
  }, [movie]);

  const fetchMovieDetails = (movieId: number) => {
    setLoading(true);
    setError('');
    getMovieDetailsUseCase
      .execute(movieId)
      .then((details) => {
        setMovieDetails(details);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load movies.');
        setLoading(false);
      });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  if (error) {
    return <ThemedText>{error}</ThemedText>;
  }

  const handleMoviePress = (selectedMovie: Movie) => {
    fetchMovieDetails(selectedMovie.id);
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.modalContainer}
      >
        <TouchableOpacity activeOpacity={1}>
          <View style={styles.firstContainer}>
            {movieDetails.posterPath && (
              <ImageWithLoader source={{ uri: movieDetails.posterPath }} style={styles.posterImage} />
            )}

            <DescriptionSection
              title={movieDetails.title || ''}
              releaseDate={movieDetails.releaseDate || ''}
              overview={movieDetails.overview || ''}
            />
          </View>

          {movieDetails.genres && <GenresCarousel genres={movieDetails.genres} />}

          <RatingSection movie={movieDetails} />

          {movieDetails.actors && <ActorCarousel actors={movieDetails.actors} />}

          <RecommendationCarousel onMoviePress={handleMoviePress} selectedMovie={movieDetails} />
        </TouchableOpacity>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: '150%',
  },
  firstContainer: {
    flexDirection: 'row',
    height: 250,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  posterImage: {
    width: 160,
    height: 250,
    borderRadius: 5,
    borderColor: '#ddd',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    elevation: 15,
    shadowColor: '#000',
    shadowOpacity: 0.8,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MovieDetails;

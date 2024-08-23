import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, Animated, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Movie } from '@/domain/Movies/model/Movie';
import VoteAverage from '../meters/average/VoteAverage';
import { GetMovieDetailsUseCase } from '@/domain/Movies/useCase/GetMovieDetailsUseCase';
import ImageWithLoader from '../imageBox/ImageWithLoader';
import ActorCarousel from '../ActorCarousel/ActorCarousel';
import GenresCarousel from '../genreCarousel/GenreCarousel';
import RatingStars from '../ratingStars/RatingStarts';
import RecommendationCarousel from '../RecommendationCarousel/RecommendationCarousel';
import { RateMovieUseCase } from '@/domain/Movies/useCase/RateMovieUseCase';

interface MovieDetailsProps {
  movie: Movie | null;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  if (!movie) return null;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [movieDetails, setMovieDetails] = useState<Movie>(movie);
  const getMovieDetailsUseCase = new GetMovieDetailsUseCase();
  const rateMovieUseCase = new RateMovieUseCase();

  const fetchMovieDetails = (movieId: number) => {
    setLoading(true);
    setError('');
    getMovieDetailsUseCase
      .execute(movieId)
      .then((details) => {
        setMovieDetails(details);

        setLoading(false);
      })
      .catch((err) => {
        setError('Could not load movies.');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (movie) {
      fetchMovieDetails(movie.id);
    }
  }, [movie]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  if (error) {
    return <ThemedText>{error}aaa</ThemedText>;
  }

  function getYearFromDate(dateString: string): string {
    const yearMatch = dateString.match(/\d{4}$/);
    return yearMatch ? yearMatch[0] : 'Unknown';
  }

  const handleRatingSubmit = (rating: number) => {
    rateMovieUseCase.execute(movieDetails.id, rating);
    console.log('Rating submitted:', rating);
  };

  const handleMoviePress = (selectedMovie: Movie) => {
    fetchMovieDetails(selectedMovie.id); // Fetch details of the selected movie
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
            <ImageWithLoader source={{ uri: movieDetails.posterPath }} style={styles.posterImage} />

            <View style={styles.descriptionContainer}>
              <View>
                <ThemedText type="title">{movieDetails.title}</ThemedText>
                <ThemedText type="caption">({getYearFromDate(movieDetails.releaseDate)})</ThemedText>
              </View>
              
              <Animated.ScrollView
                showsVerticalScrollIndicator={true}
                scrollEventThrottle={16}
                contentContainerStyle={styles.scrollOverview}
              >
                <TouchableOpacity activeOpacity={1}>
                    <ThemedText type="caption" style={{ fontWeight: '500', marginTop: 15 }}>
                      {movieDetails.overview}
                    </ThemedText>
                </TouchableOpacity>
              </Animated.ScrollView>
            </View>
          </View>

          <View style={styles.genresContainer}>
            <GenresCarousel genres={movieDetails.genres!} />
          </View>

          <View style={styles.rateContainer}>
            <View style={styles.rateCircle}>
              <VoteAverage voteAverage={movieDetails.voteAverage} />
            </View>

            <RatingStars actualRate={movieDetails.rating} movieId={movieDetails.id} />
          </View>

          <View>
            <ThemedText type="subtitle" style={{ marginVertical: 10 }}>
              Cast
            </ThemedText>
            <ActorCarousel actors={movieDetails.actors!} />
          </View>

          <View>
            <ThemedText type="subtitle" style={{ marginVertical: 10 }}>Recommendations</ThemedText>
            <RecommendationCarousel onMoviePress={handleMoviePress} selectedMovie={movieDetails!} />
          </View>
        </TouchableOpacity>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: '150%',
  },
  scrollOverview: {
    flexGrow: 1,
    marginTop: 10
  },
  firstContainer: {
    flexDirection: 'row',
    height: 250
  },
  descriptionContainer: {
    flex: 1,
    left: 10,
    paddingRight: 20,
    height: 250
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
  rateContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '600',
  },
  caption: {
    fontSize: 15,
    lineHeight: 32,
    marginTop: -6,
    fontWeight: '400',
  },
  rateCircle: {},
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genresContainer: {
    marginTop: 5,
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default MovieDetails;

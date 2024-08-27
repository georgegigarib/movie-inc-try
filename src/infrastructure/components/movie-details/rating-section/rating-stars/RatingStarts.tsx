import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { RateMovieUseCase } from '@/src/domain/Movies/useCase/RateMovieUseCase';
import { ThemedView } from '@/src/infrastructure/components/ThemedView';
import StarRow from '@/src/infrastructure/components/movie-details/rating-section/rating-stars/stars/Stars';
import SubmitButton from '@/src/infrastructure/components/movie-details/rating-section/rating-stars/submit-button/SubmitButton';

interface RatingStarsProps {
  movieId: number;
  actualRate: number | undefined;
}

const RatingStars: React.FC<RatingStarsProps> = ({ movieId, actualRate }) => {
  const [rating, setRating] = useState<number>(actualRate ?? 0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModified, setIsModified] = useState<boolean>(false);

  const rateMovieUseCase = new RateMovieUseCase();

  const handlePress = (index: number) => {
    const newRating = index + 1;
    setRating((prevRating) => {
      const updatedRating = prevRating === newRating ? 0 : newRating;
      setIsModified(updatedRating !== actualRate);
      return updatedRating;
    });
  };

  const handleRate = async () => {
    setIsLoading(true);
    try {
      await rateMovieUseCase.execute(movieId, rating);
      setSubmitted(true);
    } catch (error) {
      Alert.alert('Could not rate movie.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.starsContainer}>
        <StarRow
          start={0}
          count={5}
          rating={rating}
          submitted={submitted}
          onPress={handlePress}
        />

        <StarRow
          start={5}
          count={5}
          rating={rating}
          submitted={submitted}
          onPress={handlePress}
        />
      </ThemedView>

      <SubmitButton
        isModified={isModified}
        submitted={submitted}
        isLoading={isLoading}
        onPress={handleRate}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  starsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default RatingStars;

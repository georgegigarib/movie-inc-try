import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RateMovieUseCase } from '@/domain/Movies/useCase/RateMovieUseCase';

import Icon from 'react-native-vector-icons/FontAwesome';
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
      console.error('Error al enviar la calificación:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        <View style={styles.row}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity key={index} onPress={() => handlePress(index)} disabled={submitted}>
              <Animated.View style={styles.star}>
                <Icon
                  name={index < rating ? 'star' : 'star-o'} // `star` para llena y `star-o` para vacía
                  size={24} // Tamaño del ícono
                  color="#FFD700" // Color dorado
                />
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity key={index + 5} onPress={() => handlePress(index + 5)} disabled={submitted}>
              <Animated.View style={styles.star}>
                <Icon
                  name={index + 5 < rating ? 'star' : 'star-o'} // `star` para llena y `star-o` para vacía
                  size={24} // Tamaño del ícono
                  color="#FFD700" // Color dorado
                />
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          {
            opacity: isModified || submitted ? 1 : 0,
            backgroundColor: submitted ? '#28a745' : '#007BFF',
          },
        ]}
        onPress={handleRate}
        disabled={!isModified || submitted || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : submitted ? (
          <MaterialCommunityIcons name="check" size={18} color="#FFFFFF" />
        ) : (
          <MaterialCommunityIcons name="send" size={18} color="#FFFFFF" />
        )}
      </TouchableOpacity>
    </View>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  star: {
    marginHorizontal: 4,
  },
  starText: {
    fontSize: 25,
    color: '#FFD700',
  },
  button: {
    position: 'absolute',
    right: -30,
    bottom: 18,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RatingStars;

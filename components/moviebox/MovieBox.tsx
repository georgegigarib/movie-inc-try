import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Movie } from '@/domain/Movies/model/Movie';
import { ThemedView } from '@/components/ThemedView';
import VoteAverage from '../meters/average/VoteAverage';
import ImageWithLoader from '../imageBox/ImageWithLoader';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addMovie, removeMovie } from '@/store/favoriteMovies.ts';

interface MovieBoxProps {
  movie: Movie | undefined;
  onPress?: () => void;
}

export default function MovieBox({ movie, onPress }: MovieBoxProps) {
  const dispatch = useDispatch();
  const favMovies = useSelector((state: RootState) => state.movies.movies);

  const isFavorite = movie ? favMovies.some(favMovie => favMovie.id === movie.id) : false;

  const handleToggleFavorite = () => {
    if (movie) {
      const moviePlain = JSON.parse(JSON.stringify(movie)); // Convert movie to a plain object
      if (isFavorite) {
        dispatch(removeMovie(moviePlain.id));
      } else {
        dispatch(addMovie(moviePlain));
      }
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <ThemedView style={styles.box}>
        <View style={styles.posterContainerWrapper}>
          <ImageWithLoader
            source={{ uri: movie?.posterPath! }}
            style={styles.posterContainer}
          />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleToggleFavorite}
          >
            <Icon 
              name={isFavorite ? 'heart' : 'heart-o'} 
              size={15} 
              color="#fff" 
            />
          </TouchableOpacity>
          <View style={styles.rateCircle}>
            <VoteAverage voteAverage={movie?.voteAverage} />
          </View>
        </View>
        <ThemedText style={styles.title}>{movie?.title}</ThemedText>
        <ThemedText style={styles.caption}>Release date: {movie?.releaseDate}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 230,
    height: 450,
  },
  posterContainerWrapper: {
    position: 'relative', // Asegura que el botón y el ícono se posicionen sobre el póster
  },
  posterContainer: {
    width: 230,
    height: 350,
    marginBottom: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente para el ícono
    borderRadius: 20,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: -6,
  },
  caption: {
    fontSize: 15,
    lineHeight: 32,
    marginTop: -6,
    fontWeight: '400',
  },
  rateCircle: {
    marginTop: -50,
    left: 180,
  },
});

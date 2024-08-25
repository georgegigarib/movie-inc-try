import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import ImageWithLoader from '@/components/image-loader-box/ImageLoaderBox';
import { Movie } from '@/src/domain/Movies/model/Movie';
import { ThemedView } from '@/components/ThemedView';

interface MovieBoxProps {
  movie: Movie;
  onPress: () => void;
}

const Box: React.FC<MovieBoxProps> = ({ movie, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <ThemedView style={styles.movieBox}>
        <ImageWithLoader
          source={{ uri: movie.posterPath }}
          style={styles.posterContainer}
        />
        <ThemedView style={styles.names}>
          <ThemedText style={styles.title}>{movie.title}</ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  movieBox: {
    width: 100,
    marginHorizontal: 10,
  },
  posterContainer: {
    width: 100,
    height: 150,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
  },
  names: {
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Box;

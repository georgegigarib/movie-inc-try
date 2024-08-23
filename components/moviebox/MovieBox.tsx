import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Movie } from '@/domain/Movies/model/Movie';
import { ThemedView } from '@/components/ThemedView';
import VoteAverage from '../meters/average/VoteAverage';
import ImageWithLoader from '../imageBox/ImageWithLoader'; // Ajusta la ruta según sea necesario

interface MovieBoxProps {
  movie: Movie | undefined;
  onPress?: () => void;
}

export default function MovieBox({ movie, onPress }: MovieBoxProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <ThemedView style={styles.box}>
        <View>
          <ImageWithLoader
            source={{ uri: movie?.posterPath! }}
            style={styles.posterContainer}
          />
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

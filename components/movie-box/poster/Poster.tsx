import React from 'react';
import { StyleSheet, View } from 'react-native';
import ImageWithLoader from '@/components/image-loader-box/ImageLoaderBox';
import VoteAverage from '@/components/vote-average-meter/VoteAverage';
import FavoriteIcon from '@/components/movie-box/poster/favorite/Favorite';
import { ThemedView } from '@/components/ThemedView';

interface MoviePosterProps {
  posterPath: string;
  voteAverage: number | undefined;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const MoviePoster: React.FC<MoviePosterProps> = ({ posterPath, voteAverage, isFavorite, onToggleFavorite }) => {
  return (
    <ThemedView style={styles.posterContainer}>
      <ImageWithLoader
        source={{ uri: posterPath }}
        style={styles.poster}
      />
      <FavoriteIcon isFavorite={isFavorite} onPress={onToggleFavorite} />
      <ThemedView style={styles.voteContainer}>
        <VoteAverage voteAverage={voteAverage} />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  posterContainer: {
    position: 'relative',
    height: 360,
  },
  poster: {
    width: 230,
    height: 350,
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
  voteContainer: {
    position: 'absolute',
    bottom: -7,
    right: -7,
    backgroundColor: 'transparent'
  },
});

export default MoviePoster;

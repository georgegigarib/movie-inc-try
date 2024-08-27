import React from 'react';
import { StyleSheet } from 'react-native';
import ImageWithLoader from '@/src/infrastructure/components/image-loader-box/ImageLoaderBox';
import VoteAverage from '@/src/infrastructure/components/vote-average-meter/VoteAverage';
import FavoriteIcon from '@/src/infrastructure/components/movie-box/poster/favorite/Favorite';
import { ThemedView } from '@/src/infrastructure/components/ThemedView';

interface MoviePosterProps {
  posterPath: string;
  voteAverage: number | undefined;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const MoviePoster: React.FC<MoviePosterProps> = ({ posterPath, voteAverage, isFavorite, onToggleFavorite }) => {
  return (
    <ThemedView style={styles.posterContainer} testID="movie-poster">
      <ImageWithLoader
        source={{ uri: posterPath }}
        style={styles.poster}
        testID="poster-image"
      />
      
      <FavoriteIcon isFavorite={isFavorite} onPress={onToggleFavorite} />

      <ThemedView style={styles.voteContainer} testID="vote-container">
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

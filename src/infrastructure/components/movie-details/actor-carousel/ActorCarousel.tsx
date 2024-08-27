import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Actor } from '@/src/domain/Actor/model/Actor';
import Box from '@/src/infrastructure/components/movie-details/actor-carousel/actor-box/Box';
import { ThemedView } from '@/src/infrastructure/components/ThemedView';
import { ThemedText } from '@/src/infrastructure/components/ThemedText';

interface ActorCarouselProps {
  actors: Actor[] | undefined;
}

export default function ActorCarousel({ actors }: ActorCarouselProps) {
  if (!actors || actors.length < 1) {
    return <ThemedText testID="no-actors-text">Actors not found for this film</ThemedText>;
  }

  return (
    <ThemedView testID="actor-carousel">
      <ThemedText type="subtitle" style={{ marginVertical: 10 }} testID="cast-title">
        Cast
      </ThemedText>

      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.moviesContainer}
        testID="actor-scroll-view"
      >
        {actors.map((actor) => (
          <ThemedView key={actor.id} testID={`actor-${actor.id}`}>
            <Box actor={actor} />
          </ThemedView>
        ))}
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  moviesContainer: {
    flexGrow: 1,
    alignItems: 'center',
    height: 220,
  },
});

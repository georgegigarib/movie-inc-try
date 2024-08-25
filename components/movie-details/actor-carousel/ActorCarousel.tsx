import React from 'react';
import { View, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { Actor } from '@/domain/Actor/model/Actor';
import Box from './actor-box/Box';
import { ThemedView } from '../../ThemedView';
import { ThemedText } from '../../ThemedText';

interface ActorCarouselProps {
  actors: Actor[] | undefined;
}

export default function ActorCarousel({ actors }: ActorCarouselProps) {
  if (!actors || actors.length < 1) return <ThemedText>Actors not found for this film</ThemedText>;

  return (
    <ThemedView>
      <ThemedText type="subtitle" style={{ marginVertical: 10 }}>
        Cast
      </ThemedText>

      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.moviesContainer}
      >
        {actors.map((actor) => (
          <ThemedView key={actor.id}>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

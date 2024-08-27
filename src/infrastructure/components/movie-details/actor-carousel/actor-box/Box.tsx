import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/src/infrastructure/components/ThemedText';
import { ThemedView } from '@/src/infrastructure/components/ThemedView';
import ImageWithLoader from '@/src/infrastructure/components/image-loader-box/ImageLoaderBox';
import { Actor } from '@/src/domain/Actor/model/Actor';

interface ActorBoxProps {
  actor: Actor;
}

export default function Box({ actor }: ActorBoxProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} testID="actor-box-button">
      <ThemedView style={styles.box} testID="actor-box">
        <ImageWithLoader
          source={{ uri: actor.profilePath }}
          style={styles.posterContainer}
          testID="actor-image"
        />
        <ThemedView style={styles.names} testID="actor-names">
          <ThemedText style={styles.title} testID="actor-name">{actor.name}</ThemedText>
          <ThemedText style={styles.caption} testID="actor-character">{actor.character}</ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 200,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  names: {
    alignItems: 'center',
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
  title: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  caption: {
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'center',
  },
});

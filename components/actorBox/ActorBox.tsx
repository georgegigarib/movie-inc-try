import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Movie } from '@/domain/Movies/model/Movie';
import { ThemedView } from '@/components/ThemedView';
import VoteAverage from '../meters/average/VoteAverage';
import ImageWithLoader from '../imageBox/ImageWithLoader'; // Ajusta la ruta según sea necesario
import { Actor } from '@/domain/Actor/model/Actor';

interface ActorBoxProps {
  actor: Actor;
}

export default function ActorBox({ actor }: ActorBoxProps) {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <ThemedView style={styles.box}>
        <View>
          <ImageWithLoader
            source={{ uri: actor.profilePath }}
            style={styles.posterContainer}
          />
        </View>
        <View style={styles.names}>
          <ThemedText style={styles.title}>{actor.name}</ThemedText>
          <ThemedText style={styles.caption}>{actor.character}</ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 200,
    marginHorizontal: 10,
    alignItems: 'center', // Centramos horizontalmente el contenido del ActorBox
  },
  names: {
    alignItems: 'center', // Centramos horizontalmente el texto dentro del contenedor
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
    fontSize: 12, // Ajustar el tamaño de fuente si es necesario
    fontWeight: '600',
    textAlign: 'center', // Alinea el texto horizontalmente dentro del ThemedText
  },
  caption: {
    fontSize: 10, // Ajustar el tamaño de fuente si es necesario
    fontWeight: '400',
    textAlign: 'center', // Alinea el texto horizontalmente dentro del ThemedText
  },
});
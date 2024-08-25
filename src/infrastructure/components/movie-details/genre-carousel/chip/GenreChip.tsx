import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/src/infrastructure/components/ThemedText';

interface GenreChipProps {
  name: string;
}

const GenreChip: React.FC<GenreChipProps> = ({ name }) => (
  <TouchableOpacity style={styles.genreChip}>
    <ThemedText type="caption" style={styles.genreText}>
      {name}
    </ThemedText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  genreChip: {
    backgroundColor: '#5CB8F5DD',
    marginHorizontal: 5,
    borderRadius: 25,
    padding: 6,
  },
  genreText: {
    fontWeight: '600',
  },
});

export default GenreChip;

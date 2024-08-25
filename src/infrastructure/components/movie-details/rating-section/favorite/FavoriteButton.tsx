import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onToggleFavorite }) => {
  return (
    <TouchableOpacity style={styles.favoriteButton} onPress={onToggleFavorite}>
      <Icon name={isFavorite ? 'heart' : 'heart-o'} size={30} color="#ff0000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favoriteButton: {
    paddingVertical: 20,
  },
});

export default FavoriteButton;

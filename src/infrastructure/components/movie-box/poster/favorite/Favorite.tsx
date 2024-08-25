import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface FavoriteIconProps {
  isFavorite: boolean;
  onPress: () => void;
}

const Favorite: React.FC<FavoriteIconProps> = ({ isFavorite, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.favoriteButton}
      onPress={onPress}
    >
      <Icon
        name={isFavorite ? 'heart' : 'heart-o'}
        size={15}
        color="#fff"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    padding: 10,
  },
});

export default Favorite;

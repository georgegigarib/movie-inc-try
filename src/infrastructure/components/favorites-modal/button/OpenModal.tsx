import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface OpenModalButtonProps {
  isFavorite: boolean;
  onPress: () => void;
}

const OpenModalButton: React.FC<OpenModalButtonProps> = ({ isFavorite, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name={isFavorite ? 'heart' : 'heart-o'} size={15} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
  },
});

export default OpenModalButton;

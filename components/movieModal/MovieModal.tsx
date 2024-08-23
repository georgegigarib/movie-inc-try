import React, { useRef, useState } from 'react';
import { StyleSheet, View, Animated, Text, TouchableOpacity, PanResponder, Dimensions } from 'react-native';
import MovieDetails from '../movieDetails/MovieDetails';
import { Movie } from '@/domain/Movies/model/Movie';
import { ThemedText } from '../ThemedText';
import RecommendationCarousel from '../RecommendationCarousel/RecommendationCarousel';

const { height } = Dimensions.get('window');

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  selectedMovie: Movie | null;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, selectedMovie }) => {
  const slideAnim = useRef(new Animated.Value(height)).current; // Start off-screen

  const [movie, setMovie] = useState<Movie>(selectedMovie!);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          // Only move downwards
          slideAnim.setValue(height * 0.3 + gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 150) {
          // Swipe down threshold
          closeModal();
        } else {
          Animated.spring(slideAnim, {
            toValue: height * 0.3,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 150,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: height * 0.3,
        duration: 150,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(height); // Ensure it starts off-screen
    }
  }, [visible]);

  if (!visible) return null;
  return (
    <View style={styles.modalBackground}>
      <Animated.View
        style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.dragBar} />
        <MovieDetails movie={selectedMovie} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  modalContent: {
    height: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  dragBar: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
});

export default CustomModal;

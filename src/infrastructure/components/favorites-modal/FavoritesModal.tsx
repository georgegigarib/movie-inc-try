import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';
import { Movie } from '@/src/domain/Movies/model/Movie';
import { ThemedText } from '@/src/infrastructure/components/ThemedText';
import Carousel from '@/src/infrastructure/components/movie-carousel/MovieCarousel';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/src/infrastructure/components/ThemedView';

const { height } = Dimensions.get('window');

interface FavoritesModalProps {
  visible: boolean;
  onClose: () => void;
  movies: Movie[] | null;
}

const FavoritesModal: React.FC<FavoritesModalProps> = ({ visible, onClose, movies }) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? height * 0.3 : height,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const handleMoviePress = (movie: Movie) => {
    router.push({ pathname: '/details', params: { id: movie.id.toString() } });
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 150,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(height * 0.3 + gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 150) {
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

  if (!visible) return null;

  return (
    <ThemedView style={styles.modalBackground}>
      <Animated.View
        style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}
        {...panResponder.panHandlers}
      >
        <ThemedView style={styles.innerContainer}>
          <ThemedView style={styles.dragBar} />

          {movies && movies.length > 0 ? (
            <ThemedView style={styles.contentContainer}>
              <ThemedText type='title' style={styles.title}>Favorite movies</ThemedText>
              <Carousel movies={movies} onMoviePress={handleMoviePress} />
            </ThemedView>
          ) : (
            <ThemedView style={styles.emptyContainer}>
              <ThemedText type='title'>No favorite movies yet</ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      </Animated.View>
    </ThemedView>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  innerContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dragBar: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  title: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  contentContainer: {
    width: '100%',
  },
  emptyContainer: {
    marginTop: 20,
  },
});

export default FavoritesModal;

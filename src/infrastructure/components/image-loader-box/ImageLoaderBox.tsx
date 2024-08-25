import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Animated, Image, StyleSheet } from 'react-native';
import { ThemedText } from '@/src/infrastructure/components/ThemedText';
import { ThemedView } from '@/src/infrastructure/components/ThemedView';

interface ImageWithLoaderProps {
  source: { uri: string };
  style?: object;
  onLoad?: () => void;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ source, style, onLoad }) => {
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showError, setShowError] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setShowError(true);
        setLoading(false);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (imageLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }
  }, [imageLoaded]);

  return (
    <ThemedView style={style}>
      {loading && !showError && (
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#b6b6b6" />
        </ThemedView>
      )}
      {showError ? (
        <ThemedView style={styles.errorContainer}>
          <ThemedText type='caption'>Picture not available</ThemedText>
        </ThemedView>
      ) : (
        <Animated.View style={{ opacity: fadeAnim }}>
          <Image
            source={source}
            style={styles.image}
            onLoad={() => {
              setLoading(false);
              setImageLoaded(true);
              if (onLoad) onLoad();
            }}
            onLoadStart={() => setLoading(true)}
            onError={() => {
              setShowError(true);
              setLoading(false);
            }}
          />
        </Animated.View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageWithLoader;

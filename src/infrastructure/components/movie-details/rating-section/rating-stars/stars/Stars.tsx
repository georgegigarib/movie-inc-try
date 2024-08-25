import { ThemedView } from '@/src/infrastructure/components/ThemedView';
import React from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface StarRowProps {
  start: number;
  count: number;
  rating: number;
  submitted: boolean;
  onPress: (index: number) => void;
}

const StarRow: React.FC<StarRowProps> = ({ start, count, rating, submitted, onPress }) => {
  return (
    <ThemedView style={styles.row}>
      {[...Array(count)].map((_, index) => (
        <TouchableOpacity key={index + start} onPress={() => onPress(index + start)} disabled={submitted}>
          <Animated.View style={styles.star}>
            <Icon
              name={index + start < rating ? 'star' : 'star-o'}
              size={24}
              color="#FFD700"
            />
          </Animated.View>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  star: {
    marginHorizontal: 4,
  },
});

export default StarRow;

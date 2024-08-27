import React from 'react';
import { StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/src/infrastructure/components/ThemedText';
import { ThemedView } from '@/src/infrastructure/components/ThemedView';
import { getYearFromDate } from '@/src/infrastructure/utils/formatDate';

interface DescriptionSectionProps {
  title: string;
  releaseDate: string;
  overview: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ title, releaseDate, overview }) => {
  return (
    <ThemedView style={styles.descriptionContainer}>
      <ThemedView>
        <ThemedText type="title">{title}</ThemedText>
        <ThemedText type="caption">({getYearFromDate(releaseDate)})</ThemedText>
      </ThemedView>

      <Animated.ScrollView
        showsVerticalScrollIndicator={true}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollOverview}
      >
        <TouchableOpacity activeOpacity={1}>
          <ThemedText type="caption" style={styles.overviewText}>
            {overview}
          </ThemedText>
        </TouchableOpacity>
      </Animated.ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
    descriptionContainer: {
      flex: 1,
      left: 10,
      paddingRight: 20,
      height: 250,
    },
    scrollOverview: {
      flexGrow: 1,
      marginTop: 10,
    },
    overviewText: {
      fontWeight: '500',
      marginTop: 15,
    },
  });
  
  export default DescriptionSection;
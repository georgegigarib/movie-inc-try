import React from 'react';
import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface DescriptionSectionProps {
  title: string;
  releaseDate: string;
  overview: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ title, releaseDate, overview }) => {
  const getYearFromDate = (dateString: string): string => {
    const yearMatch = dateString.match(/\d{4}$/);
    return yearMatch ? yearMatch[0] : 'Unknown';
  };

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
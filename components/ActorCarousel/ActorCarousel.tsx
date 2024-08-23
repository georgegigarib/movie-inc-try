import React from "react";
import { View, StyleSheet, ActivityIndicator, Animated } from "react-native";
import { Actor } from "@/domain/Actor/model/Actor";
import ActorBox from "../actorBox/ActorBox";

interface ActorCarouselProps {
  actors: Actor[];
}

export default function ActorCarousel({ actors }: ActorCarouselProps) {
  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      contentContainerStyle={styles.moviesContainer}
    >
      {actors.map((actors) => (
        <View key={actors.id}>
          <ActorBox actor={actors} />
        </View>
      ))}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  moviesContainer: {
    flexGrow: 1,
    alignItems: "center",
    height: 220,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

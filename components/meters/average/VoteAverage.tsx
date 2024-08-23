import { ThemedText } from "@/components/ThemedText";
import { getColorForVote } from "@/utils/colotMeter";
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

interface VoteAverageProps {
  voteAverage: number | undefined;
}

export default function VoteAverage({ voteAverage }: VoteAverageProps) {
  const animatedColor = useRef(new Animated.Value(0)).current;
  const animatedValue1 = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;
  const animatedValue3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedColor, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    const animateConditionally = (
      value: Animated.Value,
      conditions: { check: boolean; toValue: number }[]
    ) => {
      const condition = conditions.find((c) => c.check);
      if (condition) {
        Animated.timing(value, {
          toValue: condition.toValue,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      }
    };

    if (voteAverage !== undefined) {
      const percentage = (voteAverage / 10) * 100;

      // AnimatedValue1
      animateConditionally(animatedValue1, [
        { check: voteAverage > 2.5 && voteAverage <= 5, toValue: percentage },
        { check: voteAverage < 2.5, toValue: 25 },
        { check: voteAverage > 5, toValue: 50 },
      ]);

      // AnimatedValue2
      animateConditionally(animatedValue2, [
        { check: voteAverage > 5 && voteAverage <= 7.5, toValue: percentage },
        { check: voteAverage < 5, toValue: 25 },
        { check: voteAverage > 7.5, toValue: 75 },
      ]);

      // AanimatedValue3
      animateConditionally(animatedValue3, [
        { check: voteAverage > 7.5 && voteAverage <= 10, toValue: percentage },
        { check: voteAverage < 7.5, toValue: 25 },
        { check: voteAverage > 10, toValue: 100 },
      ]);
    }
  }, [voteAverage]);

  const colorInterpolation = animatedColor.interpolate({
    inputRange: [0, 100],
    outputRange: [getColorForVote(0), getColorForVote(voteAverage!)],
  });

  const animatedValues = [animatedValue1, animatedValue2, animatedValue3];
  const rotations = animatedValues.map((animatedValue) =>
    animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: ["40deg", "400deg"],
    })
  );

  return (
    <View style={styles.container}>
      <View style={[styles.circle, { borderColor: "transparent" }]}>
        <Animated.View
          style={[
            styles.progressStatic,
            {
              borderColor: "transparent",
              borderLeftColor: colorInterpolation,
            },
          ]}
        />
        {rotations.map((rotation, index) => (
          <Animated.View
            key={index}
            style={[
              styles.progressMoving,
              {
                transform: [{ rotate: rotation }],
                borderColor: "transparent",
                borderLeftColor: colorInterpolation,
              },
            ]}
          />
        ))}
        <View style={styles.innerCircle}>
          <ThemedText style={styles.percentage}>
            {voteAverage !== undefined ? `${voteAverage.toFixed(1)}` : "N/A"}
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  circle: {
    width: 63,
    height: 63,
    borderRadius: 80,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "transparent",
  },
  progressStatic: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 30,
    borderWidth: 6,
    borderColor: "transparent",
    transform: [{ rotate: "130deg" }],
  },
  progressMoving: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 30,
    borderWidth: 6,
    borderColor: "transparent",
    transform: [{ rotate: "130deg" }],
  },
  innerCircle: {
    width: 54,
    height: 54,
    borderRadius: 45,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  percentage: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

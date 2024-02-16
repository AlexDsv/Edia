// ProgressBar.js
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ProgressBar = ({ progress }) => {
  const [animatedProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 500, // Durée de l'animation en ms
      useNativeDriver: false, // Utilisation du moteur d'animation natif (requis pour les valeurs dynamiques)
    }).start();
  }, [progress]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: animatedProgress.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: width * 0.9,
    backgroundColor: "#5C71B14D",
    borderRadius: 5,
    marginVertical: 10,
    position: "absolute",
    zIndex: 10,
  },
  progressBar: {
    height: 10,
    width: width * 0.9,
    backgroundColor: "#5C71B1",
    borderRadius: 5,
    position: "absolute",
  },
});

export default ProgressBar;

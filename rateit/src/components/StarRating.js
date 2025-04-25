import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StarRating = ({ rating, maxRating = 5, size = 30, onRatingChange }) => {
  const handlePress = (selectedRating) => {
    if (onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  return (
    <View style={styles.container}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        return (
          <TouchableOpacity
            key={`star-${index}`}
            onPress={() => handlePress(starValue)}
            activeOpacity={0.7}
            style={styles.starContainer}
          >
            <Ionicons
              name={starValue <= rating ? "star" : "star-outline"}
              size={size}
              color={starValue <= rating ? "#FFD700" : "#CCCCCC"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  starContainer: {
    marginRight: 5,
  },
});

export default StarRating;
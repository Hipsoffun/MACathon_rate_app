import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Dummy data (replace with real user data from backend or context)
const user = {
  name: 'Jamie Londale',
  avatar: require('../../assets/pingu.png'), // adjust path if needed
  posts: 12,
  comments: 34,
  ratings: 20,
};

// Example score formula
const calculateScore = (user) => {
  return user.posts * 3 + user.comments * 2 + user.ratings;
};

const ProfileScreen = () => {
  const score = calculateScore(user);

  return (
    <View style={styles.container}>
      <Image source={user.avatar} style={styles.avatar} />

      <Text style={styles.name}>{user.name}</Text>

      <View style={styles.stats}>
        <Text style={styles.stat}>📝 Posts: {user.posts}</Text>
        <Text style={styles.stat}>💬 Comments: {user.comments}</Text>
        <Text style={styles.stat}>⭐ Ratings: {user.ratings}</Text>
      </View>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Interactivity Score</Text>
        <Text style={styles.score}>{score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 30,
    flex: 1,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stats: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  stat: {
    fontSize: 18,
    marginVertical: 4,
  },
  scoreCard: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  scoreLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  score: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#007AFF',
  },
});

export default ProfileScreen;

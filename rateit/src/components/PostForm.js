import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import PostService from '../services/PostService';
import StarRating from './StarRating';

const PostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a post title');
      return;
    }

    if (rating === 0) {
      Alert.alert('Error', 'Please provide a rating');
      return;
    }

    if (!content.trim()) {
      Alert.alert('Error', 'Please provide a description for your rating');
      return;
    }

    try {
      await PostService.createPost(title, rating, content);
      
      // Clear form
      setTitle('');
      setRating(0);
      setContent('');
      
      if (onPostCreated) {
        onPostCreated();
      }
      
      Alert.alert('Success', 'Rating added successfully!');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to add rating');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Post Name (e.g., COMP101)"
        value={title}
        onChangeText={setTitle}
      />
      
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>Rating: </Text>
        <StarRating 
          rating={rating} 
          onRatingChange={setRating} 
        />
      </View>
      
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Description - Write your review here"
        value={content}
        onChangeText={setContent}
        multiline
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Rating</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  contentInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingLabel: {
    fontSize: 16,
    marginRight: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PostForm;
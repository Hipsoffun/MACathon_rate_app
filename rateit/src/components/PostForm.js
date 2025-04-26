import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PostService from '../services/PostService';
import StarRating from './StarRating';

const PostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant access to the photo gallery');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setImage(selectedImage.uri);
    } else {
      Alert.alert('Image Picker', 'No image was selected.');
    }
  };

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
      // Create post with image
      await PostService.createPost(title, rating, content, image);
      
      // Clear form
      setTitle('');
      setRating(0);
      setContent('');
      setImage(null);

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

      {/* Image Preview and Select Button */}
      <View style={styles.imagePreviewContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imagePlaceholder}>No image selected</Text>
        )}
      </View>
      
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>

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
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  imagePlaceholder: {
    color: '#888',
    fontSize: 14,
  },
});

export default PostForm;

import React, { useState,useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput,
  KeyboardAvoidingView,
  Platform, Image } from 'react-native';
import Comment from '../components/Comment';
import StarRating from '../components/StarRating';
import { AntDesign } from '@expo/vector-icons';
import Post from '../components/Post';

const PostItemScreen = ({ route }) => {
  const [post,setPost] = useState(route.params.post);
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [numRating, setNumRating] = useState(1);
  const scrollViewRef = useRef();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    { id: 1, text: "This is an awesome post!", author: "User123", rating: 3 },
    { id: 2, text: "I totally agree with you.", author: "JaneDoe", rating: 4 },
    { id: 3, text: "Thanks for sharing!", author: "CoolGuy42", rating: 5 }
  ]);


  const handleSubmit = () => {
    setSubmitted(true);
    
    const newRating = Math.floor((post.rating*numRating+rating)/(numRating+1))
    setNumRating(numRating+1)
    setPost({
      ...post,
      rating:newRating
    })
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        text: commentText.trim(),
        author: "Current User"
      };

      setComments([...comments, newComment]);
      setCommentText('');

      // Scroll to the bottom to show the new comment
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Post post={post}></Post>

        {!submitted ? (
          <View style={styles.ratingSection}>
            <Text style={styles.commentHeader}>Add your own rating</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingLabel}>Rating: </Text>
              <StarRating
                rating={rating}
                onRatingChange={setRating}
              />
            </View>
            <TouchableOpacity
              style={[styles.button, rating === 0 && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={rating === 0}
            >
              <Text style={styles.buttonText}>Submit Rating</Text>
            </TouchableOpacity>

          </View>) : (
          // Show confirmation message after submission
          <View style={styles.ratingSection}>
            <Text style={styles.confirmationText}>Rating added</Text>
          </View>
        )}

        <Text style={styles.commentHeader}>Comments</Text>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            text={comment.text}
            author={comment.author}
            rating={comment.rating}
          />
        ))}
        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={commentText}
          onChangeText={setCommentText}
          multiline
        />
        <TouchableOpacity
          style={[styles.commentButton, !commentText.trim() && styles.buttonDisabled]}
          onPress={handleCommentSubmit}
          disabled={!commentText.trim()}
        >
          <AntDesign name="arrowright" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  postBox: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  ratingSection: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  ratingLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  commentHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 2,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmationText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4a90e2',
  },
  spacer: {
    height: 60,
  },
  commentInputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    maxHeight: 100,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: '#4a90e2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default PostItemScreen;

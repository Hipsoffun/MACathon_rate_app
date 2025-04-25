import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StarRating from './StarRating';

const PostItem = ({ post }) => {
  return (
    <View style={styles.postItem}>
      <Text style={styles.postTitle}>{post.title}</Text>
      <View style={styles.ratingContainer}>
        <StarRating rating={post.rating} onRatingChange={null} />
      </View>

      <Text style={styles.postContent}>{post.content}</Text>
      <Text style={styles.postDate}>
        {new Date(post.createdAt).toLocaleString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  postContent: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  postDate: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});

export default PostItem;
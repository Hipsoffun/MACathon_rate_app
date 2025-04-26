import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import StarRating from './StarRating';

const Post = ({ post }) => {
  const randomViews = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

  return (
    <View style={styles.postItem}>
      <Text style={styles.postTitle}>{post.title}</Text>

      <View style={styles.ratingContainer}>
        <StarRating rating={post.rating} />
      </View>

      <Text style={styles.postContent}>{post.content}</Text>

      <Text style={styles.postViews}>{randomViews} views</Text>

      <Text style={styles.postDate}>
        {new Date(post.createdAt).toLocaleString()}
      </Text>

      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}
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
  postViews: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  postDate: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 16,
    resizeMode: 'cover',
  },
});

export default Post;

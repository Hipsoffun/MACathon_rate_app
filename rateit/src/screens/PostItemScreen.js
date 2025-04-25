import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Comment from '../components/Comment';

const PostItemScreen = ({ route }) => {
  const { post } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.postBox}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.content}>{post.content}</Text>
        <Text style={styles.date}>
          {new Date(post.createdAt).toLocaleString()}
        </Text>
      </View>

      <Text style={styles.commentHeader}>Comments</Text>
      <Comment text="This is an awesome post!" author="User123" rating={3}/>
      <Comment text="I totally agree with you." author="JaneDoe" rating={4} />
      <Comment text="Thanks for sharing!" author="CoolGuy42" rating={5}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  content: {
    fontSize: 16,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  commentHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default PostItemScreen;

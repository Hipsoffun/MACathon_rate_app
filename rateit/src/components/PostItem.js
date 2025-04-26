import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Post from './Post';

const PostItem = ({ post }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PostItemScreen', { post })}
    >
      <Post post={post}></Post>
    </TouchableOpacity>
  );
};

export default PostItem;

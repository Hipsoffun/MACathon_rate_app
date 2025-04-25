// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import StarRating from './StarRating';
// import { useNavigation } from '@react-navigation/native';

// const PostItem = ({ post }) => {
//   const navigation = useNavigation();

//   return (
//     <TouchableOpacity
//       onPress={() => navigation.navigate('PostItemScreen', { post })}
//       style={styles.postItem}
//     >
//       <Text style={styles.postTitle}>{post.title}</Text>
//       <View style={styles.ratingContainer}>
//         <StarRating rating={post.rating} onRatingChange={null} />
//       </View>
//       <Text style={styles.postContent}>{post.content}</Text>
//       <Text style={styles.postDate}>
//         {new Date(post.createdAt).toLocaleString()}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   postItem: {
//     backgroundColor: 'white',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   postTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
//   },
//   postContent: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: '#555',
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   postDate: {
//     fontSize: 12,
//     color: '#888',
//     textAlign: 'right',
//   },
// });

// export default PostItem;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import StarRating from './StarRating';
import { useNavigation } from '@react-navigation/native';

const PostItem = ({ post }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PostItemScreen', { post })}
      style={styles.postItem}
    >
      <Text style={styles.postTitle}>{post.title}</Text>
      <View style={styles.ratingContainer}>
        <StarRating rating={post.rating} onRatingChange={null} />
      </View>
      <Text style={styles.postContent}>{post.content}</Text>
      <Text style={styles.postDate}>
        {new Date(post.createdAt).toLocaleString()}
      </Text>
      
      {/* Display image if present */}
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}
    </TouchableOpacity>
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
  postImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 8,
  },
});

export default PostItem;

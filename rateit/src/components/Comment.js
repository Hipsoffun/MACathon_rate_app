// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const Comment = ({ text, author }) => {
//   return (
//     <View style={styles.commentBox}>
//       <Text style={styles.author}>{author}</Text>
//       <Text style={styles.text}>{text}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   commentBox: {
//     backgroundColor: '#eee',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 10,
//   },
//   author: {
//     fontWeight: 'bold',
//     marginBottom: 4,
//     color: '#333',
//   },
//   text: {
//     color: '#555',
//     fontSize: 14,
//   },
// });

// export default Comment;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StarRating from './StarRating';

const Comment = ({ text, author, rating }) => {
  return (
    <View style={styles.commentBox}>
      <Text style={styles.author}>{author}</Text>
      <StarRating rating={rating} onRatingChange={null} size={20} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  commentBox: {
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  text: {
    color: '#555',
    fontSize: 14,
    marginTop: 4,
  },
});

export default Comment;

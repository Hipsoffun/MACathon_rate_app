// import React, { useState, useEffect } from 'react';
// import { 
//   SafeAreaView, 
//   StyleSheet, 
//   Text, 
//   FlatList, 
//   View, 
//   KeyboardAvoidingView, 
//   Platform 
// } from 'react-native';
// import PostService from '../services/PostService';
// import PostItem from '../components/PostItem';
// import PostForm from '../components/PostForm';

// const PostsScreen = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadPosts = async () => {
//     try {
//       setLoading(true);
//       const postsData = await PostService.loadPosts();
//       setPosts(postsData);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load posts when component mounts
//   useEffect(() => {
//     const initializeData = async () => {
//       try {
//         // Migrate any existing data first
//         await PostService.migrateData();
//         // Then load posts
//         await loadPosts();
//       } catch (error) {
//         console.error('Initialization error:', error);
//       }
//     };
    
//     initializeData();
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardAvoid}
//       >
//         <Text style={styles.header}>Rate anything</Text>
        
//         <PostForm onPostCreated={loadPosts} />
        
//         <Text style={styles.header}>Your Ratings</Text>
        
//         {loading ? (
//           <Text style={styles.loadingText}>Loading ratings...</Text>
//         ) : posts.length === 0 ? (
//           <Text style={styles.emptyText}>No ratings yet. Create your first rating!</Text>
//         ) : (
//           <FlatList
//             data={posts}
//             renderItem={({ item }) => <PostItem post={item} />}
//             keyExtractor={(item) => item.id}
//             style={styles.list}
//           />
//         )}
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   keyboardAvoid: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 16,
//     color: '#333',
//   },
//   list: {
//     flex: 1,
//   },
//   loadingText: {
//     textAlign: 'center',
//     marginTop: 32,
//     fontSize: 16,
//     color: '#888',
//   },
//   emptyText: {
//     textAlign: 'center',
//     marginTop: 32,
//     fontSize: 16,
//     color: '#888',
//   },
// });

// export default PostsScreen;

import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  FlatList, 
  View, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import PostService from '../services/PostService';
import PostItem from '../components/PostItem';
import PostForm from '../components/PostForm';

const PostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const postsData = await PostService.loadPosts();
      setPosts(postsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Load posts when component mounts
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Migrate any existing data first
        await PostService.migrateData();
        // Then load posts
        await loadPosts();
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };
    
    initializeData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <Text style={styles.header}>Rate anything</Text>
        
        <PostForm onPostCreated={loadPosts} />
        
        <Text style={styles.header}>Your Ratings</Text>
        
        
        {loading ? (
          <Text style={styles.loadingText}>Loading ratings...</Text>
        ) : posts.length === 0 ? (
          <Text style={styles.emptyText}>No ratings yet. Create your first rating!</Text>
        ) : (
          <FlatList
            data={posts}
            renderItem={({ item }) => <PostItem post={item} />}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoid: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#333',
  },
  list: {
    flex: 1,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#888',
  },
});

export default PostsScreen;

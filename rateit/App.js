import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PostsScreen from './src/screens/PostsScreen';
import PostItem from './src/components/PostItem';
import PostItemScreen from './src/screens/PostItemScreen';
import CameraScreen from './src/screens/CameraScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PostService from './src/services/PostService';

import mockData from './src/data/mock';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  // const loadMockData = async () => {
  //   // await PostService.deleteDatabase()

  //   let loadedPosts = await PostService.loadPosts();

  //   if (loadedPosts.length === 0) {
  //     const mockTitles = ['FIT2004', 'GYG Monash', 'Woodside Toilets (2nd Floor)', 'LTB study area Ground Floor'];
  //     for (let i = 0; i < mockTitles.length; i++) {
  //       await PostService.createPost(mockTitles[i], Math.ceil(Math.random() * 5), '', null);
  //     }
  //     loadedPosts = await PostService.loadPosts();
  //   }

  //   setPosts(loadedPosts);
  // };

  const loadMockData = async () => {
    // await PostService.deleteDatabase();
    let loadedPosts = await PostService.loadPosts();
  
    if (loadedPosts.length === 0) {
      for (let item of mockData) {
        await PostService.createMockPost(item.title, item.rating, item.content, item.comments);
      }
      loadedPosts = await PostService.loadPosts();
    }
  
    setPosts(loadedPosts);
  };

  // Load when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadMockData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ratings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {posts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Posts')}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="person" size={36} color="#555" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          <Icon name="photo-camera" size={36} color="#555" />
        </TouchableOpacity>

        <View style={{ width: 36 }} />
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Posts" component={PostsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="PostItemScreen" component={PostItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2275a4',
  },
  header: {
    backgroundColor: '#2275a4',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingBottom: 150,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    backgroundColor: '#2274a5',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
});

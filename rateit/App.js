import React from 'react';
import {
  View,
  StatusBar,
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

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Category</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <PostItem post={{ title: 'post 1' }} />
        <PostItem post={{ title: 'post 2' }} />
        <PostItem post={{ title: 'post 3' }} />
        <PostItem post={{ title: 'post 4' }} />
        <PostItem post={{ title: 'post 5' }} />
      </ScrollView>

      {/* Floating Plus Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Posts')}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Status Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity>
          <Icon name="camera" size={40} color="#aaa" />
        </TouchableOpacity>
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
        <Stack.Screen name="PostItemScreen" component={PostItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2275a4'
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
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    paddingBottom: 150, // Add padding so content isn't hidden behind the buttons
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
});

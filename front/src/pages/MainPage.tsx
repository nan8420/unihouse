import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackActions} from '@react-navigation/native';
import PostList from './PostList';
import Post from './Post';
const Stack = createNativeStackNavigator();

const MainPage = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="PostList"
        component={PostList}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="Post"
        component={Post}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainPage;

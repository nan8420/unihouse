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
  ScrollView,
  SafeAreaView,
} from 'react-native';

const Post = () => {
  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        multiline={true}
        autoFocus={true}
        placeholder="What's happening?"></TextInput>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    // backgroundColor: 'lightblue',
  },

  input: {
    // flex: 1,
    // backgroundColor: 'yellow',
    paddingBottom: 80,

    fontSize: 16,
    color: '#000',
    // height: 130,
  },
});

export default Post;

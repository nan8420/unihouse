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
} from 'react-native';

const Post = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.textInput}>
          <TextInput
            style={styles.input}
            autoFocus={true}
            placeholder="What's Happening?"
            multiline={true}
            numberOfLines={4}
          />
        </View>
      </View>
      <View></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'lightblue'},
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  textInput: {
    flex: 1,
    fontSize: 30,
    marginRight: 10,
  },
  input: {
    fontSize: 20,
  },
  attachment: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    marginBottom: 10,
  },
  icon: {
    marginRight: 20,
    fontSize: 30,
  },
  image: {
    aspectRatio: 4 / 5,
  },
});
// const styles = StyleSheet.create({
//   main: {
//     width: '100%',
//     backgroundColor: 'lightblue',
//   },
//   textInput: {
//     backgroundColor: 'yellow',
//   },
// });

export default Post;

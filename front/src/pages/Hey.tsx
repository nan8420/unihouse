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
import EncryptedStorage from 'react-native-encrypted-storage';
import {addPost} from '../actions/post';
import {useAppDispatch} from '../store';
import {useSelector} from 'react-redux';
import {RootState} from '../reducer/index';

const Hey = () => {
  return (
    // <View style={styles.main}>
    //   <View style={styles.first}>
    //     <Text>first1</Text>
    //     <Text>first2</Text>
    //   </View>
    //   <View style={styles.second}>
    //     <Text>second</Text>
    //   </View>
    // </View>

    <View style={styles.maincon}>
      <Text>main</Text>
      {/* <View style={styles.one}>
        <Text>one</Text>
      </View>
      <View style={styles.hello}>
        <View style={styles.two}>
          <Text>tow</Text>
        </View> */}
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  maincon: {
    width: 200,
    height: 100,
    backgroundColor: 'lightblue',
    position: 'absolute',
  },

  one: {
    width: 600,
    height: 300,
    backgroundColor: 'lightgreen',
    // position: 'absolute',
  },

  hello: {
    width: 500,
    height: 300,
    backgroundColor: 'orange',
  },
  two: {
    width: 100,
    height: 100,
    backgroundColor: 'yellow',
    position: 'absolute',
  },
  main: {
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: 'lightblue',
  },
  first: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'yellow',
  },
  second: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },
});

export default Hey;

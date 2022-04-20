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
import EncryptedStorage from 'react-native-encrypted-storage';
import {addPost} from '../actions/post';
import {useAppDispatch} from '../store';
import {useSelector} from 'react-redux';
import {RootState} from '../reducer/index';

const Hey = () => {
  const dispatch = useAppDispatch();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const [post, setPost] = useState('');

  const func = useCallback(() => {
    // console.log('func');

    dispatch(addPost({post, accessToken}));
  }, [post, accessToken, dispatch]);

  const onPost = useCallback(text => {
    setPost(text);
  }, []);

  return (
    <View>
      <Pressable onPress={func}>
        <Text>Hey</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onPost}
          placeholder="이메일을 입력해주세요"
          placeholderTextColor="#666"
          importantForAutofill="yes"
          textContentType="emailAddress"
          value={post}
          clearButtonMode="while-editing" // 아이폰에만 가능
          blurOnSubmit={false}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonZone: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Hey;

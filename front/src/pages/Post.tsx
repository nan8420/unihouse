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
  TouchableOpacity,
  Dimensions,
  Image,
  SegmentedControlIOSBase,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch} from '../store';
import {addPost, loadPosts} from '../actions/post';
import useInput from '../hooks/useInput';
import EncryptedStorage from 'react-native-encrypted-storage';
import DismissKeyboardView from '../components/DismissKeyboardView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '../../AppInner';

import postSlice from '../reducer/post';
import {RootState} from '../reducer/index';
type PostListScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'MainPage'
>;
const Post = ({navigation}: PostListScreenProps) => {
  const dispatch = useAppDispatch();
  const [content, onChangeContent] = useInput('');
  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  }>();
  const [preview, setPreview] = useState<{uri: string}>();

  const onResponse = useCallback(async response => {
    setPreview({uri: `data:${response.mime};base64,${response.data}`});
    const orientation = (response.exif as any)?.Orientation;
    return ImageResizer.createResizedImage(
      response.path,
      600,
      600,
      response.mime.includes('jpeg') ? 'JPEG' : 'PNG',
      100,
      0,
    ).then(r => {
      setImage({
        uri: r.uri,
        name: r.name,
        type: response.mime,
      });
    });
  }, []);

  const onTakePhoto = useCallback(() => {
    // 이미지 촬영
    return ImagePicker.openCamera({
      includeBase64: true,
      includeExif: true,
      saveToPhotos: true,
    })
      .then(onResponse)
      .catch(console.log);
  }, [onResponse]);

  const onChangeFile = useCallback(() => {
    // 이미지 선택
    return ImagePicker.openPicker({
      includeExif: true,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then(onResponse)
      .catch(console.log);
  }, [onResponse]);

  // const sendPostfunc = useCallback(async () => {
  //   if (!content || !content.trim()) {
  //     Alert.alert('알림', '내용을 입력하세요!');
  //     return;
  //   }

  //   const formData = new FormData();

  //   formData.append('image', image);
  //   formData.append('content', content);

  //   const result = await dispatch(addPost(formData));

  //   console.log('result:', result);
  //   // dispatch(postSlice.actions.purePost());

  //   // dispatch(loadPosts());

  //   navigation.navigate('PostList');
  // }, [dispatch, image, content, navigation]);

  const sendPostfunc = useCallback(async () => {
    try {
      if (!content || !content.trim()) {
        Alert.alert('알림', '내용을 입력하세요!');
        return;
      }

      const formData = new FormData();

      formData.append('image', image);
      formData.append('content', content);
      const result = await dispatch(addPost(formData));
      console.log('result:', result);
      // dispatch(postSlice.actions.purePost());
      // dispatch(loadPosts());
      navigation.navigate('PostList');
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, image, content, navigation]);

  return (
    <View style={styles.first}>
      <View style={styles.abovecontainer}>
        <ScrollView style={styles.container}>
          <TextInput
            style={styles.input}
            multiline={true}
            autoFocus={true}
            placeholder="Wirte anything !"
            onChangeText={onChangeContent}
            value={content}
          />

          {preview && <Image style={styles.previewImage} source={preview} />}
        </ScrollView>

        <View style={styles.bottomcontainer}>
          <Pressable style={styles.photobtn} onPress={onTakePhoto}>
            <MaterialIcons name="add-a-photo" size={28} color={'#b1afb3'} />
          </Pressable>
          <Pressable style={styles.imagebtn} onPress={onChangeFile}>
            <MaterialCommunityIcons
              name="image-plus"
              size={28}
              color={'#b1afb3'}
            />
          </Pressable>
          <Pressable style={styles.completebtn} onPress={sendPostfunc}>
            <Text style={styles.posttxt}>post</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  first: {
    flex: 1,
  },
  abovecontainer: {
    flex: 9,
  },

  container: {
    flex: 1,
  },

  previewImage: {
    left: Dimensions.get('window').width / 1.7,
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').height / 6,
  },
  input: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 80,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#494f4e',
  },

  bottomcontainer: {
    borderWidth: 1,
    borderColor: '#d1e8dc',
    alignItems: 'center',
    flexDirection: 'row',
    height: Dimensions.get('window').height / 13,
  },

  photobtn: {
    width: Dimensions.get('window').width / 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3,
  },

  imagebtn: {
    width: Dimensions.get('window').width / 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  completebtn: {
    backgroundColor: '#7a07ab',
    borderRadius: 20,
    width: Dimensions.get('window').width / 4.3,
    height: Dimensions.get('window').height / 18,
    justifyContent: 'center',
    alignItems: 'center',
    left: Dimensions.get('window').width / 25,
  },

  posttxt: {
    color: 'white',
    fontSize: 18,
  },
});

export default Post;

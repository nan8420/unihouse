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
import {addPost} from '../actions/post';
import useInput from '../hooks/useInput';
import EncryptedStorage from 'react-native-encrypted-storage';
import DismissKeyboardView from '../components/DismissKeyboardView';
const Post = () => {
  const dispatch = useAppDispatch();
  const [content, onChangeContent] = useInput('');
  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  }>();
  const [preview, setPreview] = useState<{uri: string}>();

  // console.log(' image:', image);
  // console.log(' content:', content);
  const onResponse = useCallback(async response => {
    // console.log(response.width, response.height, response.exif);
    // console.log('response:::', response);
    // console.log('response.exif:', response.exif);

    setPreview({uri: `data:${response.mime};base64,${response.data}`});
    const orientation = (response.exif as any)?.Orientation;
    // console.log('orientation', orientation);
    return ImageResizer.createResizedImage(
      response.path,
      600,
      600,
      response.mime.includes('jpeg') ? 'JPEG' : 'PNG',
      100,
      0,
    ).then(r => {
      // console.log(r.uri, r.name);

      setImage({
        uri: r.uri,
        name: r.name,
        type: response.mime,
      });
    });
  }, []);

  const onTakePhoto = useCallback(() => {
    // 이미지 촬영
    // console.log('onTakePhoto:', onTakePhoto);
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

  const sendPostfunc = useCallback(async () => {
    if (!content) {
      Alert.alert('알림', '내용을 입력하세요!');
    }

    const formData = new FormData();

    formData.append('image', image);
    formData.append('content', content);
    dispatch(addPost(formData));

    // try {
    //   const accessToken = await EncryptedStorage.getItem('accessToken');

    //   await axios.post(`${Config.API_URL}/post/addpost`, formData, {
    //     headers: {
    //       authorization: `Bearer ${accessToken}`,
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     transformRequest: formData => formData,
    //   });
    // } catch (error) {
    //   console.log('error:');
    // }

    // dispatch(addPost(formData));
    // dispatch(addPost({content}));
  }, [dispatch, image, content]);
  // const canimage = true;
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
          {/* {canimage ? (
            <View style={styles.imageview}>
              <Text>hi</Text>
            </View>
          ) : null} */}

          {preview && <Image style={styles.previewImage} source={preview} />}
        </ScrollView>
      </View>
      <View>
        <DismissKeyboardView>
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
              {/* <Ionicons name="md-checkmark-done-outline" size={33} color="black" /> */}
            </Pressable>
          </View>
        </DismissKeyboardView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  first: {
    flex: 1,

    // backgroundColor: 'red',
  },
  abovecontainer: {
    flex: 9,
    // backgroundColor: 'orange',
  },

  container: {
    flex: 1,
    // backgroundColor: 'yellow',
  },

  previewImage: {
    // backgroundColor: 'green',
    // right: Dimensions.get('window').width / 10,
    left: Dimensions.get('window').width / 1.7,
    // position: 'relative',

    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').height / 6,
  },
  input: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 80,
    paddingHorizontal: 20,
    fontSize: 20,
    color: '#000',
    // backgroundColor: 'lightblue',
  },

  bottomcontainer: {
    flex: 1.5,
    borderWidth: 1,
    borderColor: '#d1e8dc',
    // backgroundColor: 'lightblue',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    height: Dimensions.get('window').height / 13,
    // alignItems: 'center',
  },

  photobtn: {
    // flex: 1,
    // backgroundColor: 'yellow',
    width: Dimensions.get('window').width / 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3,
  },

  imagebtn: {
    // flex: 1,
    // backgroundColor: 'orange',
    width: Dimensions.get('window').width / 6,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 1,
  },

  completebtn: {
    // flex: 1,
    backgroundColor: '#7a07ab',
    // borderWidth: 1,
    borderRadius: 20,
    width: Dimensions.get('window').width / 4.3,
    height: Dimensions.get('window').height / 18,
    justifyContent: 'center',
    alignItems: 'center',
    left: Dimensions.get('window').width / 25,
  },

  posttxt: {
    color: 'white',
    // fontWeight: '400',
    fontSize: 18,
    // fontFamily: 'Rancho-Regular',
  },
});

export default Post;

// import React, {useEffect, useState, useCallback} from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Platform,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   ScrollView,
//   SafeAreaView,
//   TouchableOpacity,
//   Dimensions,
//   Image,
//   SegmentedControlIOSBase,
// } from 'react-native';

// import ImagePicker from 'react-native-image-crop-picker';
// import ImageResizer from 'react-native-image-resizer';
// import axios, {AxiosError} from 'axios';
// import Config from 'react-native-config';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useAppDispatch} from '../store';
// import {addPost} from '../actions/post';
// import useInput from '../hooks/useInput';
// import EncryptedStorage from 'react-native-encrypted-storage';
// import DismissKeyboardView from '../components/DismissKeyboardView';
// const Post = () => {
//   const dispatch = useAppDispatch();
//   const [content, onChangeContent] = useInput('');
//   const [image, setImage] = useState<{
//     uri: string;
//     name: string;
//     type: string;
//   }>();
//   const [preview, setPreview] = useState<{uri: string}>();

//   // console.log(' image:', image);
//   // console.log(' content:', content);
//   const onResponse = useCallback(async response => {
//     // console.log(response.width, response.height, response.exif);
//     // console.log('response:::', response);
//     // console.log('response.exif:', response.exif);

//     setPreview({uri: `data:${response.mime};base64,${response.data}`});
//     const orientation = (response.exif as any)?.Orientation;
//     // console.log('orientation', orientation);
//     return ImageResizer.createResizedImage(
//       response.path,
//       600,
//       600,
//       response.mime.includes('jpeg') ? 'JPEG' : 'PNG',
//       100,
//       0,
//     ).then(r => {
//       // console.log(r.uri, r.name);

//       setImage({
//         uri: r.uri,
//         name: r.name,
//         type: response.mime,
//       });
//     });
//   }, []);

//   const onTakePhoto = useCallback(() => {
//     // 이미지 촬영
//     // console.log('onTakePhoto:', onTakePhoto);
//     return ImagePicker.openCamera({
//       includeBase64: true,
//       includeExif: true,
//       saveToPhotos: true,
//     })
//       .then(onResponse)
//       .catch(console.log);
//   }, [onResponse]);

//   const onChangeFile = useCallback(() => {
//     // 이미지 선택
//     return ImagePicker.openPicker({
//       includeExif: true,
//       includeBase64: true,
//       mediaType: 'photo',
//     })
//       .then(onResponse)
//       .catch(console.log);
//   }, [onResponse]);

//   const sendPostfunc = useCallback(async () => {
//     if (!content) {
//       Alert.alert('알림', '내용을 입력하세요!');
//     }

//     const formData = new FormData();

//     formData.append('image', image);
//     formData.append('content', content);
//     dispatch(addPost(formData));

//     // try {
//     //   const accessToken = await EncryptedStorage.getItem('accessToken');

//     //   await axios.post(`${Config.API_URL}/post/addpost`, formData, {
//     //     headers: {
//     //       authorization: `Bearer ${accessToken}`,
//     //       'Content-Type': 'multipart/form-data',
//     //     },
//     //     transformRequest: formData => formData,
//     //   });
//     // } catch (error) {
//     //   console.log('error:');
//     // }

//     // dispatch(addPost(formData));
//     // dispatch(addPost({content}));
//   }, [dispatch, image, content]);
//   // const canimage = true;
//   return (
//     <View style={styles.first}>
//       <View style={styles.abovecontainer}>
//         <ScrollView style={styles.container}>
//           <TextInput
//             style={styles.input}
//             multiline={true}
//             autoFocus={true}
//             placeholder="Wirte anything !"
//             onChangeText={onChangeContent}
//             value={content}
//           />
//           {/* {canimage ? (
//             <View style={styles.imageview}>
//               <Text>hi</Text>
//             </View>
//           ) : null} */}

//           {preview && <Image style={styles.previewImage} source={preview} />}
//         </ScrollView>
//       </View>
//       <View style={styles.bottomcontainer}>
//         <Pressable style={styles.photobtn} onPress={onTakePhoto}>
//           <MaterialIcons name="add-a-photo" size={30} />
//         </Pressable>
//         <Pressable style={styles.imagebtn} onPress={onChangeFile}>
//           <MaterialCommunityIcons name="image-plus" size={30} />
//         </Pressable>
//         <Pressable style={styles.completebtn} onPress={sendPostfunc}>
//           <Text style={styles.posttxt}>Post</Text>
//           {/* <Ionicons name="md-checkmark-done-outline" size={33} color="black" /> */}
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   first: {
//     flex: 1,

//     // backgroundColor: 'red'
//   },
//   abovecontainer: {
//     flex: 9,
//     // backgroundColor: 'orange',
//   },

//   container: {
//     flex: 1,
//     // backgroundColor: 'yellow',
//   },

//   previewImage: {
//     backgroundColor: 'green',
//     // right: Dimensions.get('window').width / 10,
//     left: Dimensions.get('window').width / 1.7,
//     // position: 'relative',

//     width: Dimensions.get('window').width / 2.5,
//     height: Dimensions.get('window').height / 6,
//   },
//   input: {
//     flex: 1,
//     paddingTop: 40,
//     paddingBottom: 80,
//     paddingHorizontal: 20,
//     fontSize: 20,
//     color: '#000',
//     // backgroundColor: 'lightblue',
//   },

//   bottomcontainer: {
//     flex: 1.4,
//     borderWidth: 1,
//     borderColor: '#d1e8dc',
//     // backgroundColor: 'lightblue',
//     // justifyContent: 'space-evenly',
//     alignItems: 'center',
//     flexDirection: 'row',
//     // height: Dimensions.get('window').height / 30,
//     // alignItems: 'center',
//   },

//   photobtn: {
//     // flex: 1,
//     // backgroundColor: 'yellow',
//     width: Dimensions.get('window').width / 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 3,
//   },

//   imagebtn: {
//     // flex: 1,
//     // backgroundColor: 'orange',
//     width: Dimensions.get('window').width / 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 3,
//   },

//   completebtn: {
//     // flex: 1,
//     backgroundColor: '#7a07ab',
//     // borderWidth: 1,
//     borderRadius: 20,
//     width: Dimensions.get('window').width / 4.5,
//     height: Dimensions.get('window').height / 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     left: Dimensions.get('window').width / 10.5,
//   },

//   posttxt: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

// export default Post;
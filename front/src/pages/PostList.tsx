import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {LoggedInParamList} from '../../AppInner';
import PostFlat from '../components/PostFlat';
import {RootState} from '../reducer/index';
import {loadPosts} from '../actions/post';
import {useAppDispatch} from '../store';
import Loading from '../components/Loading';
import {maintypes} from '../reducer/post';
import postSlice from '../reducer/post';
type PostListScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'MainPage'
>;

const PostList = ({navigation}: PostListScreenProps) => {
  const dispatch = useAppDispatch();
  const {mainPosts, loadPostsLoading} = useSelector(
    (state: RootState) => state.post,
  );

  // console.log('mainPosts:', mainPosts);
  // useEffect(() => {
  //   dispatch(postSlice.actions.purePost());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const renderItem = useCallback(({item}: {item: maintypes}) => {
    return <PostFlat item={item} />;
  }, []);

  const gotoPost = useCallback(() => {
    navigation.push('Post');
  }, [navigation]);

  return (
    <View style={styles.main}>
      <FlatList
        data={mainPosts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Loading />}
      />
      <Pressable style={styles.gotoPost} onPress={gotoPost}>
        <Text style={styles.Posttxt}>Post</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,

    marginBottom: 10,
  },

  gotoPost: {
    position: 'absolute',
    width: Dimensions.get('window').width / 5,
    height: Dimensions.get('window').height / 18,
    left: Dimensions.get('window').width / 2.5,
    bottom: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    backgroundColor: 'white',
  },

  Posttxt: {
    fontFamily: 'Zocial',
    fontSize: 18,
    fontWeight: '300',
  },
});
export default PostList;

// import React, {useEffect, useState, useCallback} from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Platform,
//   Pressable,
//   Text,
//   TextInput,
//   View,
//   FlatList,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {useSelector} from 'react-redux';
// import {LoggedInParamList} from '../../AppInner';
// import PostFlat from '../components/PostFlat';
// import {RootState} from '../reducer/index';
// import {loadPosts} from '../actions/post';
// import {useAppDispatch} from '../store';
// import Loading from '../components/Loading';
// import {maintypes} from '../reducer/post';
// import postSlice from '../reducer/post';
// type PostListScreenProps = NativeStackScreenProps<
//   LoggedInParamList,
//   'MainPage'
// >;

// const PostList = ({navigation}: PostListScreenProps) => {
//   const dispatch = useAppDispatch();
//   const {mainPosts, loadPostsLoading} = useSelector(
//     (state: RootState) => state.post,
//   );

//   console.log('loadPostsLoading:', loadPostsLoading);
//   // useEffect(() => {
//   //   dispatch(postSlice.actions.purePost());
//   // }, [dispatch]);

//   useEffect(() => {
//     dispatch(loadPosts());
//   }, [dispatch]);

//   const renderItem = useCallback(({item}: {item: maintypes}) => {
//     return <PostFlat item={item} />;
//   }, []);

//   const gotoPost = useCallback(() => {
//     navigation.push('Post');
//   }, [navigation]);

//   return (
//     <View style={styles.main}>
//       <FlatList
//         data={mainPosts}
//         keyExtractor={item => item.id.toString()}
//         renderItem={renderItem}
//         ListEmptyComponent={<Loading />}
//       />
//       <Pressable style={styles.gotoPost} onPress={gotoPost}>
//         <Text style={styles.Posttxt}>Post</Text>
//       </Pressable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   main: {
//     flex: 1,

//     marginBottom: 10,
//   },

//   gotoPost: {
//     position: 'absolute',
//     width: Dimensions.get('window').width / 5,
//     height: Dimensions.get('window').height / 18,
//     left: Dimensions.get('window').width / 2.5,
//     bottom: 6,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 10,
//     borderColor: 'lightgray',
//     borderWidth: 1,
//     backgroundColor: 'white',
//   },

//   Posttxt: {
//     fontFamily: 'Zocial',
//     fontSize: 18,
//     fontWeight: '300',
//   },
// });
// export default PostList;

import React, {useCallback, useState, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {LoggedInParamList} from '../../AppInner';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import CommentFlat from '../components/CommentFlat';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {likePost, unlikePost, addComment, loadPost} from '../actions/post';
import {useAppDispatch} from '../store';
import {useSelector} from 'react-redux';
import {RootState} from '../reducer/index';
import useInput from '../hooks/useInput';
import Config from 'react-native-config';
import {Keyboard} from 'react-native';
import {maintypes} from '../reducer/post';
dayjs.locale('ko');
dayjs.extend(relativeTime);

const Explain = () => {
  const myid = useSelector((state: maintypes | any) => state.user.me?.id);

  const {singlePost} = useSelector((state: RootState) => state.post);
  const route = useRoute<RouteProp<LoggedInParamList>>();
  const dispatch = useAppDispatch();
  const post = route.params?.item;
  // console.log('route.params?.item:::', route.params?.item);
  const [dot, setDot] = useState(false);
  const [like, setLike] = useState(false);
  const [likelength, setLikelength] = useState(post?.Likers?.length);
  const [commentinput, onChangeCommentinput] = useInput('');
  const [modal, setModal] = useState(false);

  const createdAt = post?.createdAt;
  const day = dayjs(createdAt).fromNow();
  const ScrollRef = useRef<any>();

  // 좋아요 상태
  const liked = post?.Likers?.find((v: any) => v.id === myid);

  useEffect(() => {
    dispatch(loadPost({postId: post?.id}));
  }, [post]);

  useEffect(() => {
    if (liked) {
      setLike(true);
    }
  }, [liked]);

  const removefunc = useCallback(() => {
    setModal(prev => !prev);
  }, []);

  const adjustfunc = useCallback(() => {
    setDot(prev => !prev);
    setModal(prev => !prev);
  }, []);

  const likefunc = useCallback(() => {
    if (!myid) {
      Alert.alert('알림', '로그인을 해주세요');
      return;
    }

    setLike(prev => !prev);
    setLikelength(likelength + 1);
    dispatch(
      likePost({
        postId: post?.id,
      }),
    );
  }, [myid, likelength]);

  const unlikefunc = useCallback(() => {
    if (!myid) {
      Alert.alert('알림', '로그인을 해주세요');
      return;
    }
    setLike(prev => !prev);
    setLikelength(likelength - 1);

    dispatch(
      unlikePost({
        postId: post?.id,
      }),
    );
  }, [myid, likelength]);

  const commetsubmitfun = useCallback(() => {
    if (!commentinput || !commentinput.trim()) {
      return Alert.alert('알림', '댓글을 입력하세요.');
    }
    console.log('commetsubmitfun:::::::::');
    onChangeCommentinput('');
    ScrollRef.current.scrollToEnd({duration: 10});
    Keyboard.dismiss();
    dispatch(addComment({content: commentinput, postId: post?.id}));
  }, [dispatch, commentinput, Keyboard]);

  const dots = true;

  // console.log('post:', post);

  const dotfunc = useCallback(() => {
    setDot(prev => !prev);
    setModal(prev => !prev);
  }, []);

  const shutmodal = useCallback(() => {
    setDot(prev => !prev);
    setModal(prev => !prev);
  }, []);
  // console.log('dot:::', dot);
  // console.log('modal:::', modal);

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollviewcon} ref={ScrollRef}>
        <View style={styles.first}>
          <View style={styles.abovecon}>
            <View style={styles.namedaycon}>
              <Text style={styles.name}>{post?.User?.nickname}</Text>
              <Text style={styles.day}>{day}</Text>
            </View>
            <Pressable style={styles.dotcon} onPress={dotfunc}>
              <Entypo name="dots-three-vertical" size={18} color="black" />
            </Pressable>
          </View>
          <View style={styles.contentcon}>
            <Text style={styles.contenttxt}>{post?.content}</Text>
          </View>

          {dot && (
            // <View style={styles.modal}>
            <View style={styles.dotmodal}>
              <Pressable style={styles.remove} onPress={removefunc}>
                <Text>삭제</Text>
              </Pressable>

              <Pressable style={styles.adjust} onPress={adjustfunc}>
                <Text>수정</Text>
              </Pressable>
            </View>
            // </View>
          )}

          {post?.Images[0]?.src && (
            <View style={styles.Imagecon}>
              <Image
                style={styles.Image}
                source={{uri: `${Config.API_URL}/${post?.Images[0]?.src}`}}
              />
            </View>
          )}

          <View style={styles.likecommentcon}>
            {like ? (
              <Pressable style={styles.likecon} onPress={unlikefunc}>
                <AntDesign name="like1" size={18} color="#ed3972"></AntDesign>
                <Text style={styles.like}>{likelength}</Text>
              </Pressable>
            ) : (
              <Pressable style={styles.likecon} onPress={likefunc}>
                <AntDesign name="like2" size={18} color="#ed3972"></AntDesign>
                <Text style={styles.like}>{likelength}</Text>
              </Pressable>
            )}
            <Pressable style={styles.likecon}>
              <FontAwesome
                name="commenting-o"
                size={18}
                color="#60c494"></FontAwesome>
              <Text style={styles.comment}>{singlePost?.Comments?.length}</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.bottomcon} />

        {/* <View style={styles.subject}> */}
        <Text style={styles.subjecttxt}>Comments</Text>
        {/* </View> */}

        {singlePost?.Comments?.map(v => (
          <CommentFlat key={v.id} item={v} />
        ))}
      </ScrollView>
      <View style={styles.inputcon}>
        <TextInput
          style={styles.input}
          placeholder="  댓글을 입력해주세요..."
          value={commentinput}
          onChangeText={onChangeCommentinput}></TextInput>
        <Pressable style={styles.send} onPress={commetsubmitfun}>
          <Text style={{color: '#0373fc'}}>게시</Text>
          {/* <Ionicons name="send" size={18} color="#ed3972"></Ionicons> */}
        </Pressable>
      </View>
      {modal && (
        <Pressable style={styles.modal} onPress={shutmodal}></Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // backgroundColor: 'lightblue',
  },

  scrollviewcon: {
    // marginBottom: 100,
  },

  first: {
    // backgroundColor: 'lightblue',
    marginTop: 20,
    marginHorizontal: 15,

    // height: Dimensions.get('window').height / 3,
  },

  abovecon: {
    flexDirection: 'row',
  },

  namedaycon: {
    flex: 1,
    // flexDirection: 'row',
    // backgroundColor: 'lightgreen',
    paddingLeft: 10,
    // left: 20,
    // marginTop: 20,
    // marginLeft: 20,
  },

  name: {
    fontSize: 16,
    // fontWeight: '600',
    // fontWeight: 'bold',
    color: 'black',
  },

  day: {color: '#959a9e', marginTop: 7},

  dotcon: {
    top: 10,
  },

  modal: {
    // backgroundColor: 'lightblue',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },

  dotmodal: {
    backgroundColor: 'white',
    position: 'absolute',
    width: 70,
    top: -10,
    height: 75,
    right: 16,
    // justifyContent: 'center',
    // alignItems: 'center',s
    borderWidth: 0.5,
    borderColor: 'lightgray',
    borderRadius: 10,
    flex: 1,
  },

  remove: {
    flex: 1,
    // backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: 'lightgray',
  },

  adjust: {
    flex: 1,
    // backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentcon: {
    flex: 3,
    // backgroundColor: '#b38dd9',
    marginLeft: 13,
    marginTop: 10,
    top: 10,
  },

  contenttxt: {
    // color: '#2c2a2e',
  },

  Imagecon: {
    // backgroundColor: 'red',
    // justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  Image: {
    // flex: 1,
    height: Dimensions.get('window').height / 4,
    width: Dimensions.get('window').width / 1.1,
    // resizeMode: 'contain',
    // resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginRight: 6,
  },

  likecommentcon: {
    flexDirection: 'row',
    // alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // backgroundColor: 'lightblue',
    paddingLeft: 10,
  },

  likecon: {
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 10,
    marginRight: 15,
    right: -8,
    // backgroundColor: 'lightblue',
  },

  like: {
    // color: '#ed3972',
    right: -4,
  },

  comment: {
    color: '#676269',
    right: -4,
  },

  bottomcon: {borderBottomWidth: 0.3, borderColor: '#b0b4b8', marginTop: 8},

  subject: {
    backgroundColor: 'lightblue',
  },

  subjecttxt: {
    // backgroundColor: 'lightblue',
    color: '#444045',
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 18,
  },

  inputcon: {
    backgroundColor: 'white',
    // width: 100,
    // height: 100,
    borderTopWidth: 0.4,
    borderColor: '#b0b4b8',
    height: Dimensions.get('window').height / 15,
    // flex: 1,
    // backgroundColor: 'lightblue',
    flexDirection: 'row',
  },

  input: {
    marginLeft: 5,
    flex: 8,
    // backgroundColor: 'green',
    // width: 100,
    // height: Dimensions.get('window').height / 14,
  },

  send: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    // width: 100,
    // height: 100,
    // backgroundColor: 'lightblue',
  },
});

export default Explain;

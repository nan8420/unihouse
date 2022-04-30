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
import Entypo from 'react-native-vector-icons/Entypo';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {commentLike, commentUnLike} from '../actions/post';
import {useAppDispatch} from '../store/index';
import {useSelector} from 'react-redux';
import {RootState} from '../reducer/index';
import {test2} from '../reducer/post';
dayjs.locale('ko');
dayjs.extend(relativeTime);

interface Props {
  // item: test2;
  item: any;
}

const CommentFlat = ({item}: Props) => {
  const {singlePost, likeComment} = useSelector(
    (state: RootState) => state.post,
  );
  const myid = useSelector((state: test2 | any) => state.user?.me?.id);
  const dispatch = useAppDispatch();

  const [like, setLike] = useState(false);

  const arr1 = likeComment?.filter(v => v.CommentId === item.id);

  const [likelength, setLikelength] = useState(arr1?.length);

  const createdAt = item?.createdAt;

  const day = dayjs(createdAt).fromNow();

  //  좋아요 상태
  const liked1 = likeComment?.filter(v => v.CommentId === item.id);
  const liked = liked1?.find(v => v.UserId === myid);

  // console.log('singlePost:', singlePost);
  useEffect(() => {
    if (liked) {
      setLike(true);
    }
  }, [liked]);

  const commentlikefunc = useCallback(() => {
    console.log('commentlikefunc:');

    setLike(prev => !prev);
    // setLikelength(likelength + 1);

    dispatch(commentLike({postId: item.PostId, commentId: item.id}));
  }, [dispatch, likelength]);

  const commentUnlikefunc = useCallback(() => {
    console.log('Unlike:');
    setLike(prev => !prev);
    // setLikelength(likelength - 1);

    dispatch(commentUnLike({postId: item.PostId, commentId: item.id}));
  }, [dispatch, likelength]);

  // console.log('liked:', liked);

  return (
    <View style={styles.maincon}>
      <View style={styles.namedaycon}>
        <Text style={styles.name}>{item?.User?.nickname}</Text>
        <Text style={styles.day}>{day}</Text>
      </View>
      <View style={styles.contentcon}>
        <Text style={styles.contenttxt}>{item.content}</Text>
      </View>

      <View style={styles.likecon}>
        <View style={styles.replylikecon}>
          <Text style={styles.replytxt}>Reply</Text>
          <Text style={styles.liketext}>Like!</Text>
        </View>

        {like ? (
          <Pressable style={styles.likebtn} onPress={commentUnlikefunc}>
            <Entypo
              style={styles.like2}
              name="heart"
              size={18}
              color="red"></Entypo>
            {/* <Text style={styles.like2txt}>{likelength}</Text> */}
            {/* <Text style={styles.like2txt}>{arr1?.length}</Text> */}
          </Pressable>
        ) : (
          <Pressable style={styles.likebtn} onPress={commentlikefunc}>
            <Entypo
              style={styles.like2}
              name="heart-outlined"
              size={18}
              color="red"></Entypo>
            {/* <Text style={styles.like2txt}>{likelength}</Text> */}
            {/* <Text style={styles.like2txt}>{arr1?.length}</Text> */}
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincon: {
    // backgroundColor: 'lightblue',
    marginTop: 20,
    marginHorizontal: 10,
    marginLeft: 15,
    borderBottomWidth: 0.3,
    borderColor: '#b0b4b8',
    paddingBottom: 20,
    // flex: 1,
  },

  namedaycon: {
    flexDirection: 'row',

    // justifyContent: 'center',
  },

  name: {
    fontSize: 15,
    color: 'black',
  },

  day: {
    marginLeft: 10,
  },

  contentcon: {
    // backgroundColor: 'lightgreen',
    marginVertical: 10,
  },

  contenttxt: {},

  likecon: {
    // backgroundColor: 'lightblue',

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  replylikecon: {
    flex: 1,
    // backgroundColor: 'lightblue',
    flexDirection: 'row',
  },

  replytxt: {color: '#918d91', fontSize: 15},

  liketext: {marginLeft: 20, color: '#918d91', fontSize: 15},

  likebtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  like2: {marginRight: 4},

  like2txt: {
    fontWeight: '500',
    // color: 'red',
  },
});

export default CommentFlat;

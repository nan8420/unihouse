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

import {LoggedInParamList} from '../../AppInner';
import PostFlat from '../components/PostFlat';

type PostListScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'MainPage'
>;

const PostList = ({navigation}: PostListScreenProps) => {
  useEffect(() => {
    console.log('PostList');
  }, []);

  const renderItem = useCallback(({item}: {item: Object}) => {
    return <PostFlat item={item} />;
  }, []);

  const gotoPost = useCallback(() => {
    navigation.push('Post');
  }, [navigation]);

  const post = [
    {
      id: 1,
      nickname: 'Elon Musk',
      univ: '서울대학교',
      content: 'hello',
      UserId: 1,
    },
    {
      id: 2,
      nickname: 'Elon musksks',
      univ: '서울대학교',
      content:
        'Elon Reeve Musk FRS is an entrepreneur, investor, and business magnate. He is the founder, CEO, and Chief Engineer at SpaceX; early-stage investor, ',
      UserId: 2,
    },
    {
      id: 3,
      nickname: 'Elon',
      univ: '서울대학교',
      content:
        '미국의 기업인으로 PayPal의 전신이 된 온라인 결제 서비스 회사 X.com, 로켓 제조 회사 겸 민간 우주 기업 스페이스X, 뇌-컴퓨터 인터페이스 회사 뉴럴링크, GPT-3을 개발한 인공지능 회사 OpenAI를 설립했고, 초고속 진공 열차 하이퍼루프 프로젝트를 기획했으며 도지코인의 열광팬이다',
      UserId: 2,
    },

    {id: 4, nickname: 'Elon', univ: '서울대학교', content: 'hello2', UserId: 2},

    {id: 5, nickname: 'Elon', univ: '서울대학교', content: 'hello2', UserId: 2},

    {id: 6, nickname: 'Elon', univ: '서울대학교', content: 'hello2', UserId: 2},

    {id: 7, nickname: 'Elon', univ: '서울대학교', content: 'hello2', UserId: 2},

    {
      id: 10,
      nickname: 'Elon',
      univ: '서울대학교',
      content: 'hello2',
      UserId: 2,
    },

    {id: 11, nickname: 'Elon', univ: '서울대학교', content: 'hello', UserId: 1},
    {
      id: 12,
      nickname: 'Elon',
      univ: '서울대학교',
      content: 'hello2',
      UserId: 2,
    },
    {
      id: 13,
      nickname: 'Elon',
      univ: '서울대학교',
      content: 'hello2',
      UserId: 2,
    },

    {
      id: 14,
      nickname: 'Elon',
      univ: '서울대학교',
      content: 'hello2',
      UserId: 2,
    },

    {
      id: 15,
      nickname: 'Elon',
      univ: '서울대학교',
      content: 'hello2',
      UserId: 2,
    },

    {
      id: 16,
      nickname: 'Elon',
      univ: '서울대학교',
      content: 'hello2',
      UserId: 2,
    },

    {
      id: 17,
      nickname: 'Elon',
      univ: '서울대학교',
      content: 'hello2',
      UserId: 2,
    },

    {
      id: 18,
      nickname: 'Elon',
      univ: '서울대학교',
      content: 'hello2',
      UserId: 2,
    },
  ];
  return (
    <View style={styles.main}>
      <FlatList
        data={post}
        keyExtractor={item => item.id}
        renderItem={renderItem}
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

    // backgroundColor: 'orange'
  },

  gotoPost: {
    // backgroundColor: '#77747a',
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
  },

  Posttxt: {
    fontFamily: 'Zocial',
    fontSize: 18,
    fontWeight: '300',
    // color: 'white',
  },
});
export default PostList;

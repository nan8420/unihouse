import React, {useCallback, useState} from 'react';
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

const Explain = () => {
  const route = useRoute<RouteProp<LoggedInParamList>>();

  const post = route.params?.item;

  const [dot, setDot] = useState(false);

  console.log('dot:', dot);
  // console.log('??????????????????????');
  // console.log('post:', post);

  const comment = [
    {id: 1, content: 'hello', UserId: 1, PostId: 2},
    {id: 2, content: '', UserId: 1, PostId: 2},
    {
      id: 3,
      content:
        '2013년 일론 머스크는 제일 처음 초고속 교통시스템 ‘하이퍼루프’를 제안했다. 하이퍼루프는 진공에 가까운 튜브를 이용해 공기저항을 최소화한 뒤 그 안에 캡슐을 띄워 이동시키는 이동수단으로, 머스크는 이 방법을 이용하면 최고 시속 1220㎞ 운송이 가능하다고 밝혔다.',
      UserId: 1,
      PostId: 2,
    },
    {
      id: 4,
      content:
        '엑스프라이즈는 기술 개발을 장려해 인류에게 혜택을 주기 위한 공공 대회를 설계하고 개최하는 미국의 비영리 단체다.  지난해 4월 미국 전기차 업체 테슬라의  ',
      UserId: 1,
      PostId: 2,
    },
    {id: 5, content: 'dzzzz', UserId: 1, PostId: 2},
    {id: 7, content: '안녕하세요 제이름은 ~ 입니다.', UserId: 1, PostId: 2},
    {id: 8, content: 'hello', UserId: 1, PostId: 2},
    {id: 9, content: 'hello', UserId: 1, PostId: 2},
    {id: 10, content: 'hello', UserId: 1, PostId: 2},
    {id: 11, content: 'hello', UserId: 1, PostId: 2},
    {id: 12, content: 'hello', UserId: 1, PostId: 2},
    {id: 13, content: 'hello', UserId: 1, PostId: 2},
    {id: 14, content: 'hello', UserId: 1, PostId: 2},
    {id: 15, content: 'hello', UserId: 1, PostId: 2},
  ];

  const renderItem = useCallback(({item}: {item: Object}) => {
    return <CommentFlat item={item} />;
  }, []);

  const dotfunc = useCallback(() => {
    setDot(prev => !prev);
  }, []);

  const removefunc = useCallback(() => {
    console.log('removefunc::::');
  }, []);

  const adjustfunc = useCallback(() => {
    console.log('adjustfunc:::::');
  }, []);

  const imagess = true;
  const dots = true;
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollviewcon}>
        <View style={styles.first}>
          <View style={styles.abovecon}>
            <View style={styles.namedaycon}>
              <Text style={styles.name}>Elon Musk</Text>
              <Text style={styles.day}>a day ago</Text>
            </View>
            <Pressable style={styles.dotcon} onPress={dotfunc}>
              <Entypo name="dots-three-vertical" size={18} color="black" />
            </Pressable>
          </View>
          <View style={styles.contentcon}>
            <Text style={styles.contenttxt}>
              Elon Reeve Musk FRS is an entrepreneur, investor, and business
              magnate. He is the founder, CEO, and Chief Engineer at SpaceX;
              early-stage investor
            </Text>
          </View>

          {dots && (
            <View style={styles.dotmodal}>
              <Pressable style={styles.remove} onPress={removefunc}>
                <Text>삭제</Text>
              </Pressable>

              <Pressable style={styles.adjust} onPress={adjustfunc}>
                <Text>수정</Text>
              </Pressable>
            </View>
          )}

          {imagess && (
            <View style={styles.Imagecon}>
              <Image
                style={styles.Image}
                source={require('../../uploads/Frenchtoast.jpg')}
              />
            </View>
          )}

          <View style={styles.likecommentcon}>
            <View style={styles.likecon}>
              <AntDesign name="like2" size={18} color="#ed3972"></AntDesign>
              <Text style={styles.like}>2</Text>
            </View>

            <View style={styles.likecon}>
              <FontAwesome
                name="commenting-o"
                size={18}
                color="#676269"></FontAwesome>
              <Text style={styles.comment}>2</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomcon} />

        {/* <View style={styles.subject}> */}
        <Text style={styles.subjecttxt}>Comments</Text>
        {/* </View> */}

        {comment.map(item => (
          <CommentFlat key={item.id} item={item} />
        ))}
      </ScrollView>
      <View style={styles.inputcon}>
        <TextInput
          style={styles.input}
          placeholder="  댓글을 입력해주세요..."></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // backgroundColor: 'white',
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

    // left: 20,
    // marginTop: 20,
    // marginLeft: 20,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
    // fontWeight: 'bold',
    color: 'black',
  },

  day: {color: '#959a9e'},

  dotcon: {
    top: 10,
  },

  dotmodal: {
    backgroundColor: 'white',
    position: 'absolute',
    width: 70,
    height: 90,
    right: 15,
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
    marginTop: 10,
  },

  contenttxt: {
    color: '#2c2a2e',
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
    // backgroundColor: 'lightblue',
  },

  likecon: {
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 10,
    marginRight: 15,
    right: -8,
  },

  like: {
    color: '#ed3972',
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
    // backgroundColor: 'lightblue',
    // width: 100,
    // height: 100,
    borderTopWidth: 0.4,
    borderColor: '#b0b4b8',
    height: Dimensions.get('window').height / 15,
  },

  input: {
    marginLeft: 5,
    // backgroundColor: 'green',
    // width: 100,
    // height: Dimensions.get('window').height / 14,
  },
});

export default Explain;

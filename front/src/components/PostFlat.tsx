import React, {useCallback} from 'react';
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
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  item: any;
}

const PostList = ({item}: Props) => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  console.log('item:', item);

  return (
    <>
      <View style={styles.main}>
        <View style={styles.leftcon}>
          <Text style={styles.nickname}>{item.nickname}</Text>
          <Text style={styles.day}>1 minuit ago</Text>
          {/* <View style={styles.likecon}>
            <AntDesign name="like2" size={14} color="#ed3972"></AntDesign>
            <Text style={styles.like}>3</Text>
          </View> */}
        </View>
        <View style={styles.middle}>
          <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">
            {item.content}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    // paddingHorizontal: 7,
    // paddingVertical: 10,
    borderBottomWidth: 0.3,
    borderColor: '#b0b4b8',
    // flexDirection: 'row',
    // backgroundColor: 'lightblue',
    paddingBottom: 30,
  },

  leftcon: {
    // backgroundColor: 'lightblue',
    flexDirection: 'row',
    marginLeft: 10,
    paddingTop: 8,
    paddingBottom: 13,
  },

  nickname: {
    fontSize: 15,
    fontWeight: '500',
    color: '#7080a1',
  },

  day: {marginLeft: 8, fontSize: 13, color: '#959a9e', top: 1},

  likecon: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // marginLeft: 40,
    // left: Dimensions.get('window').width / 10,
    alignItems: 'center',
  },
  like: {marginLeft: 5},
  middle: {
    marginLeft: 10,
  },

  content: {
    // top: 10,
    // backgroundColor: 'lightgreen',
    // marginTop: 3,
  },
});

export default PostList;

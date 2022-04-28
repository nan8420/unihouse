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

interface Props {
  item: any;
}

const CommentFlat = ({item}: Props) => {
  // console.log('item:', item);
  return (
    <View style={styles.maincon}>
      <View style={styles.namedaycon}>
        <Text style={styles.name}>{item?.User?.nickname}</Text>
        <Text style={styles.day}>a day ago</Text>
      </View>
      <View style={styles.contentcon}>
        <Text style={styles.contenttxt}>{item.content}</Text>
      </View>

      <View style={styles.likecon}>
        <View style={styles.replylikecon}>
          <Text style={styles.replytxt}>Reply</Text>
          <Text style={styles.liketext}>Like!</Text>
        </View>

        <Pressable style={styles.likebtn}>
          <Entypo
            style={styles.like2}
            name="heart"
            size={18}
            color="red"></Entypo>
          <Text style={styles.like2txt}>2</Text>
        </Pressable>
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

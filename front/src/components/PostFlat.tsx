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
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Config from 'react-native-config';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('ko');

interface Props {
  item: any;
}

const PostList = ({item}: Props) => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  // console.log('item:', item);

  dayjs.extend(relativeTime);

  const createdAt = item?.createdAt;

  const day = dayjs(createdAt).fromNow();

  const gotoExplain = useCallback(() => {
    navigation.push('Explain', {item: item});
  }, [navigation, item]);
  return (
    <>
      <Pressable style={styles.main} onPress={gotoExplain}>
        <View style={styles.min}>
          <View style={styles.leftcon}>
            <Text style={styles.nickname}>{item.User.nickname}</Text>
            <View style={styles.please}>
              <Text style={styles.day}>{day}</Text>
              <View style={styles.likes}>
                <View style={styles.likecon}>
                  <AntDesign name="like2" size={14} color="#ed3972"></AntDesign>
                  <Text style={styles.like}>{item.Likers?.length}</Text>
                </View>
                <View style={styles.likecon}>
                  <FontAwesome
                    name="commenting-o"
                    size={14}
                    color="#60c494"></FontAwesome>
                  <Text style={styles.comment}>{item.Comments?.length}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.contentcon}>
            <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">
              {item.content}
            </Text>
          </View>
        </View>

        {item.Images[0]?.src && (
          <Image
            style={styles.Image}
            source={{uri: `${Config.API_URL}/${item.Images[0]?.src}`}}
          />
        )}
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    borderBottomWidth: 0.3,
    borderColor: '#b0b4b8',
    paddingBottom: 5,
    paddingTop: 10,
    // backgroundColor: 'lightblue',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  min: {
    flex: 5,
    // backgroundColor: 'lightblue',
  },

  leftcon: {
    // backgroundColor: 'lightblue',
    flexDirection: 'row',
    marginLeft: 10,
    // paddingTop: 8,
    paddingBottom: 13,
  },

  nickname: {
    fontSize: 15,
    fontWeight: '600',
    color: '#47a877',
    // color: '#7080a1',
  },

  please: {
    flex: 1,
    // backgroundColor: 'lightblue',
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },

  day: {marginLeft: 10, fontSize: 13, color: '#959a9e', top: 1},

  likes: {
    flexDirection: 'row',
    right: -4,
    top: 1,
  },
  contentcon: {
    marginLeft: 10,
    flexDirection: 'row',
    // backgroundColor: 'yellow',
  },

  content: {
    top: -5,
  },

  middlecon: {
    // right: Dimensions.get('window').width / 10,
    // flexDirection: 'row',
  },

  likecon: {
    // flex: 1,
    // backgroundColor: 'lightblue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    right: 15,
    // right: 60,
    // top: -30,
    // right: Dimensions.get('window').width / 100,

    // alignItems: 'center',
  },
  like: {marginLeft: 5, color: '#ed3972'},

  comment: {marginLeft: 5, color: '#60c494'},
  Image: {
    flex: 1.5,
    height: Dimensions.get('window').height / 9,
    // resizeMode: 'contain',
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 6,
  },
});

export default PostList;

// import React, {useCallback} from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Platform,
//   Pressable,
//   Text,
//   TextInput,
//   View,
//   FlatList,
//   Image,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import {NavigationProp, useNavigation} from '@react-navigation/native';
// import {LoggedInParamList} from '../../AppInner';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// interface Props {
//   item: any;
// }

// const PostList = ({item}: Props) => {
//   return (
//     <>
//       <View style={styles.main}>
//         <View style={styles.min}>
//           <View style={styles.middlecon}>
//             <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">
//               {item.content}
//             </Text>
//           </View>
//         </View>

//         {item.Image ? (
//           <View style={styles.rightcon}>
//             <Image
//               style={styles.Image}

//               // source={require('../../uploads/Affogato.jpg')}
//             />
//           </View>
//         ) : null}
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   main: {
//     felx: 1,
//     borderBottomWidth: 0.3,
//     borderColor: '#b0b4b8',
//     paddingBottom: 30,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },

//   min: {
//     flex: 5,
//   },

//   middlecon: {},

//   content: {},

//   rightcon: {
//     flex: 1,
//     backgroundColor: 'lightblue',
//     // width: 100,
//     // height: 30,
//   },

//   Image: {
//     width: 10,
//     height: 30,
//     backgroundColor: 'lightgreen',
//     // resizeMode: 'center',
//   },
// });

// export default PostList;

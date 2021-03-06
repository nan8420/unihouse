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
import {maintypes} from '../reducer/post';

dayjs.locale('ko');

dayjs.extend(relativeTime);

interface Props {
  item: maintypes;
}

const PostFlat = ({item}: Props) => {
  // console.log('item!:', item);
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const createdAt = item?.createdAt;

  const day = dayjs(createdAt).fromNow();

  const gotoExplain = useCallback(() => {
    navigation.navigate('Explain', {itemId: item?.id});
  }, [navigation, item]);

  return (
    <Pressable style={styles.maincon} onPress={gotoExplain}>
      <View style={styles.first}>
        <View style={styles.second}>
          <Text style={styles.nickname}>{item?.User?.nickname}</Text>
          <Text style={styles.day}>{day}</Text>
        </View>

        <View style={styles.third}>
          <View style={styles.contentcon}>
            <Text numberOfLines={2}>{item?.content}</Text>
          </View>
        </View>

        <View style={styles.forth}>
          <View style={styles.likecon}>
            <AntDesign
              style={styles.likeicon}
              name="like2"
              size={14}
              color="#ed3972"></AntDesign>
            <Text style={styles.like}>{item?.Likers?.length}</Text>
          </View>
          <View style={styles.likecon}>
            <FontAwesome
              style={styles.likeicon}
              name="commenting-o"
              size={14}
              color="#60c494"></FontAwesome>
            <Text style={styles.like}>{item?.Comments?.length}</Text>
          </View>
        </View>
      </View>

      {item?.Images[0]?.src && (
        <View style={styles.imagecon}>
          <Image
            style={styles.Image}
            source={{uri: `${Config.API_URL}/${item?.Images[0]?.src}`}}
          />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  maincon: {
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderBottomColor: '#b0b4b8',
    flex: 1,
    marginRight: 3,
  },

  first: {
    paddingLeft: 10,
    paddingVertical: 10,
    flex: 5,
  },

  second: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  nickname: {
    color: 'black',
    fontSize: 16,
  },

  day: {marginLeft: 10, fontSize: 13, color: '#959a9e', top: 1},

  third: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingTop: 15,
  },

  contentcon: {
    flex: 5,
  },

  forth: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    right: 10,
    flexDirection: 'row',
    top: 6,
  },

  likecon: {
    flexDirection: 'row',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  likeicon: {
    right: 4,
  },

  like: {},

  imagecon: {
    flex: 1.4,
    justifyContent: 'center',
  },

  Image: {
    borderRadius: 15,

    height: Dimensions.get('window').height / 9,
  },
});

export default PostFlat;

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
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Config from 'react-native-config';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import {maintypes} from '../reducer/post';

// dayjs.locale('ko');

// dayjs.extend(relativeTime);

// interface Props {
//   item: maintypes;
// }

// const PostFlat = ({item}: Props) => {
//   // console.log('item!:', item);
//   const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

//   const createdAt = item?.createdAt;

//   const day = dayjs(createdAt).fromNow();

//   const gotoExplain = useCallback(() => {
//     navigation.navigate('Explain', {item: item});
//   }, [navigation, item]);

//   return (
//     <Pressable style={styles.maincon} onPress={gotoExplain}>
//       <View style={styles.first}>
//         <View style={styles.second}>
//           <Text style={styles.nickname}>{item?.User?.nickname}</Text>
//           <Text style={styles.day}>{day}</Text>
//         </View>

//         <View style={styles.third}>
//           <View style={styles.contentcon}>
//             <Text numberOfLines={2}>{item?.content}</Text>
//           </View>
//         </View>

//         <View style={styles.forth}>
//           <View style={styles.likecon}>
//             <AntDesign
//               style={styles.likeicon}
//               name="like2"
//               size={14}
//               color="#ed3972"></AntDesign>
//             <Text style={styles.like}>{item?.Likers?.length}</Text>
//           </View>
//           <View style={styles.likecon}>
//             <FontAwesome
//               style={styles.likeicon}
//               name="commenting-o"
//               size={14}
//               color="#60c494"></FontAwesome>
//             <Text style={styles.like}>{item?.Comments?.length}</Text>
//           </View>
//         </View>
//       </View>

//       {item?.Images[0]?.src && (
//         <View style={styles.imagecon}>
//           <Image
//             style={styles.Image}
//             source={{uri: `${Config.API_URL}/${item?.Images[0]?.src}`}}
//           />
//         </View>
//       )}
//     </Pressable>
//   );
// };

// const styles = StyleSheet.create({
//   maincon: {
//     flexDirection: 'row',
//     borderBottomWidth: 0.3,
//     borderBottomColor: '#b0b4b8',
//     flex: 1,
//     marginRight: 3,
//   },

//   first: {
//     paddingLeft: 10,
//     paddingVertical: 10,
//     flex: 5,
//   },

//   second: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   nickname: {
//     color: 'black',
//     fontSize: 16,
//   },

//   day: {marginLeft: 10, fontSize: 13, color: '#959a9e', top: 1},

//   third: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     flex: 1,
//     paddingTop: 15,
//   },

//   contentcon: {
//     flex: 5,
//   },

//   forth: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'flex-end',
//     right: 10,
//     flexDirection: 'row',
//     top: 6,
//   },

//   likecon: {
//     flexDirection: 'row',
//     marginHorizontal: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   likeicon: {
//     right: 4,
//   },

//   like: {},

//   imagecon: {
//     flex: 1.4,
//     justifyContent: 'center',
//   },

//   Image: {
//     borderRadius: 15,

//     height: Dimensions.get('window').height / 9,
//   },
// });

// export default PostFlat;

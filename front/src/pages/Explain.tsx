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
import {LoggedInParamList} from '../../AppInner';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

const Explain = () => {
  const route = useRoute<RouteProp<LoggedInParamList>>();

  const post = route.params?.item;

  console.log('??????????????????????');
  console.log('post:', post);
  return (
    <View>
      <Text>Explain</Text>
    </View>
  );
};

export default Explain;

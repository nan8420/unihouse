import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList, LoggedInParamList} from '../../AppInner';
import {useAppDispatch} from '../store';
import userSlice from '../reducer/user';
import postSlice from '../reducer/post';

const Info = () => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const logoutunf = useCallback(async () => {
    console.log('logoutunf:::::::');
    const accesstoken = await EncryptedStorage.removeItem('accessToken');

    const refreshtoken = await EncryptedStorage.removeItem('refreshToken');

    dispatch(userSlice.actions.reMoveme());
    dispatch(postSlice.actions.purePost());

    navigation.navigate('MainPage');
  }, [navigation, dispatch]);

  const getfunc = useCallback(async () => {
    console.log('getfunc:::::::::');
    const refreshtoken = await EncryptedStorage.getItem('refreshToken');

    const accesstoken = await EncryptedStorage.getItem('refreshToken');

    console.log('refreshtoken:', refreshtoken);

    console.log('accesstoken:', accesstoken);
  }, []);

  return (
    <View style={styles.main}>
      <Pressable style={styles.logoutbtn} onPress={logoutunf}>
        <Text style={styles.logouttxt}>logout</Text>
      </Pressable>

      {/* <Pressable style={styles.logoutbtn} onPress={getfunc}>
        <Text style={styles.logouttxt}>get</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutbtn: {
    backgroundColor: '#a3d6ca',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 130,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width / 1.3,
    height: Dimensions.get('window').height / 10,
  },

  logouttxt: {
    color: 'white',
    fontSize: 18,
  },
});
export default Info;

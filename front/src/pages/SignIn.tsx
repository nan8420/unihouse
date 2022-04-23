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
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import DismissKeyboardView from '../components/DismissKeyboardView';
import useInput from '../hooks/useInputtrim';
import {login} from '../actions/user';
import {useAppDispatch} from '../store';
import {useSelector} from 'react-redux';
import {RootState} from '../reducer';
import {RootStackParamList} from '../../AppInner';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({navigation}: SignInScreenProps) => {
  const dispatch = useAppDispatch();

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const passwordCheckRef = useRef<TextInput | null>(null);

  const canNext = true;

  const onSubmit = useCallback(async () => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력하세요');
    }
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }

    dispatch(login({email, password}));
  }, [email, password, dispatch]);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <View style={styles.first}>
      <DismissKeyboardView>
        <View style={styles.MainWrapper}>
          <View style={styles.inputWrapper}>
            <Text style={styles.text}>이메일</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeEmail}
              placeholder="이메일 입력해 주세요."
              placeholderTextColor="#666"
              textContentType="emailAddress"
              value={email}
              returnKeyType="next"
              clearButtonMode="while-editing"
              ref={emailRef}
              onSubmitEditing={() => passwordRef.current?.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.text}>비밀번호</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangePassword}
              placeholder="비밀번호를 입력해 주세요"
              placeholderTextColor="#666"
              textContentType="password"
              secureTextEntry
              keyboardType={
                Platform.OS === 'android' ? 'default' : 'ascii-capable'
              }
              value={password}
              returnKeyType="next"
              clearButtonMode="while-editing"
              ref={passwordRef}
              onSubmitEditing={onSubmit}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.button}>
            <Pressable
              style={
                canNext
                  ? StyleSheet.compose(
                      styles.SignButton,
                      styles.SignButtonActive,
                    )
                  : styles.SignButton
              }
              onPress={onSubmit}>
              <Text style={styles.SignButtonText}>로그인</Text>
            </Pressable>
            <Pressable onPress={toSignUp}>
              <Text style={{color: 'black'}}>회원가입하기</Text>
            </Pressable>
          </View>
        </View>
      </DismissKeyboardView>
    </View>
  );
};

const styles = StyleSheet.create({
  first: {
    flex: 1,

    flexDirection: 'row',
    alignItems: 'center',
  },
  MainWrapper: {
    flex: 1,
    // backgroundColor: 'orange',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 20,
  },
  inputWrapper: {
    padding: 20,
    // marginTop: 10,
    // backgroundColor: 'yellow',
  },

  inputWrapper2: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    // backgroundColor: 'lightblue',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    fontSize: 15,

    padding: 5,
    // backgroundColor: 'lightblue',
    borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomWidth: 0.2,
    borderBottomColor: 'grey',
  },
  button: {
    alignItems: 'center',
  },
  SignButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },

  SignButtonActive: {
    backgroundColor: '#49c9ab',
  },

  SignButtonText: {
    color: 'white',
    fontSize: 15,
  },
});

export default SignIn;

// import React, {useCallback, useEffect, useRef, useState} from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Platform,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from 'react-native';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import EncryptedStorage from 'react-native-encrypted-storage';
// import axios, {AxiosError} from 'axios';
// import Config from 'react-native-config';
// import DismissKeyboardView from '../components/DismissKeyboardView';
// import useInput from '../hooks/useInput';
// import {login} from '../actions/user';
// import {useAppDispatch} from '../store';
// import {useSelector} from 'react-redux';
// import {RootState} from '../reducer';
// import {RootStackParamList} from '../../AppInner';

// type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

// const SignIn = ({navigation}: SignInScreenProps) => {
//   const dispatch = useAppDispatch();

//   const [email, onChangeEmail] = useInput('');
//   const [password, onChangePassword] = useInput('');

//   const emailRef = useRef<TextInput | null>(null);
//   const passwordRef = useRef<TextInput | null>(null);
//   const passwordCheckRef = useRef<TextInput | null>(null);

//   const canNext = true;

//   // useEffect(() => {
//   //   if (signupError) {
//   //     return Alert.alert('알림', signupError);
//   //   }
//   // }, [signupError]);

//   // const onChangePasswordCheck = useCallback(
//   //   text => {
//   //     setPassworError(text !== password);
//   //     setPasswordCheck(text.trim());
//   //   },
//   //   [password],
//   // );
//   const onSubmit = useCallback(async () => {
//     if (!email || !email.trim()) {
//       return Alert.alert('알림', '이메일을 입력하세요');
//     }
//     if (
//       !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
//         email,
//       )
//     ) {
//       return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
//     }
//     if (!password || !password.trim()) {
//       return Alert.alert('알림', '비밀번호를 입력해주세요.');
//     }

//     dispatch(login({email, password}));
//   }, [email, password, dispatch]);

//   const toSignUp = useCallback(() => {
//     navigation.navigate('SignUp');
//   }, [navigation]);

//   return (
//     <DismissKeyboardView>
//       <View style={styles.MainWrapper}>
//         <View style={styles.inputWrapper}>
//           <Text style={styles.text}>이메일</Text>
//           <TextInput
//             style={styles.textInput}
//             onChangeText={onChangeEmail}
//             placeholder="이메일 입력해 주세요."
//             placeholderTextColor="#666"
//             textContentType="emailAddress"
//             value={email}
//             returnKeyType="next"
//             clearButtonMode="while-editing"
//             ref={emailRef}
//             onSubmitEditing={() => passwordRef.current?.focus()}
//             blurOnSubmit={false}
//           />
//         </View>
//         <View style={styles.inputWrapper}>
//           <Text style={styles.text}>비밀번호</Text>
//           <TextInput
//             style={styles.textInput}
//             onChangeText={onChangePassword}
//             placeholder="비밀번호를 입력해 주세요"
//             placeholderTextColor="#666"
//             textContentType="password"
//             secureTextEntry
//             keyboardType={
//               Platform.OS === 'android' ? 'default' : 'ascii-capable'
//             }
//             value={password}
//             returnKeyType="next"
//             clearButtonMode="while-editing"
//             ref={passwordRef}
//             onSubmitEditing={onSubmit}
//             blurOnSubmit={false}
//           />
//         </View>

//         <View style={styles.button}>
//           <Pressable
//             style={
//               canNext
//                 ? StyleSheet.compose(styles.SignButton, styles.SignButtonActive)
//                 : styles.SignButton
//             }
//             onPress={onSubmit}>
//             <Text style={styles.SignButtonText}>로그인</Text>
//           </Pressable>
//           <Pressable onPress={toSignUp}>
//             <Text style={{color: 'black'}}>회원가입하기</Text>
//           </Pressable>
//         </View>
//       </View>
//     </DismissKeyboardView>
//   );
// };

// const styles = StyleSheet.create({
//   MainWrapper: {
//     flex: 1,
//     // backgroundColor: 'orange',
//     width: '100%',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   inputWrapper: {
//     padding: 20,
//     // marginTop: 10,
//     // backgroundColor: 'yellow',
//   },

//   inputWrapper2: {
//     paddingHorizontal: 20,
//     paddingBottom: 10,
//     // backgroundColor: 'lightblue',
//   },
//   text: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   textInput: {
//     fontSize: 15,

//     padding: 5,
//     // backgroundColor: 'lightblue',
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     // borderBottomWidth: 0.2,
//     borderBottomColor: 'grey',
//   },
//   button: {
//     alignItems: 'center',
//   },
//   SignButton: {
//     backgroundColor: 'gray',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },

//   SignButtonActive: {
//     backgroundColor: '#49c9ab',
//   },

//   SignButtonText: {
//     color: 'white',
//     fontSize: 15,
//   },
// });

// export default SignIn;

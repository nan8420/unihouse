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
import useInput from '../hooks/useInput';
import {login, signup} from '../actions/user';
import {useAppDispatch} from '../store';
import {useSelector} from 'react-redux';
import {RootState} from '../reducer';

const SignUp = () => {
  const canNext = true;
  const dispatch = useAppDispatch();
  const [email, onChangeEmail] = useInput('');

  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPassworError] = useState(false);

  const [nickname, onChangeNickname] = useInput('');

  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const passwordCheckRef = useRef<TextInput | null>(null);
  const nicknameRef = useRef<TextInput | null>(null);

  const {signupError} = useSelector((state: RootState) => state.user);

  console.log('signupError:', signupError);

  useEffect(() => {
    if (signupError) {
      return Alert.alert('알림', signupError);
    }
  }, [signupError]);

  const onChangePasswordCheck = useCallback(
    text => {
      setPassworError(text !== password);
      setPasswordCheck(text.trim());
    },
    [password],
  );
  console.log('nickname:', nickname);
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
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }
    if (password !== passwordCheck) {
      console.log('비밀번호 틀림');
      return setPassworError(true);
    }
    if (!nickname) {
      return Alert.alert('알림', '닉네임을 입력하세요');
    }

    console.log('비밀번호 맞음');

    dispatch(signup({email, password, nickname}));
  }, [email, password, passwordCheck, nickname, dispatch]);

  return (
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
            onSubmitEditing={() => passwordCheckRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>

        <View style={styles.inputWrapper2}>
          <TextInput
            style={styles.textInput}
            placeholder="비밀번호 확인 "
            placeholderTextColor="#666"
            textContentType="password"
            secureTextEntry
            keyboardType={
              Platform.OS === 'android' ? 'default' : 'ascii-capable'
            }
            onChangeText={onChangePasswordCheck}
            value={passwordCheck}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={passwordCheckRef}
            onSubmitEditing={() => nicknameRef.current?.focus()}
            blurOnSubmit={false}
          />
          {passwordError && <Text>비밀번호가 일치하지 않습니다.</Text>}
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.text}>닉네임</Text>
          <TextInput
            style={styles.textInput}
            placeholder="닉네임을 입력해 주세요"
            placeholderTextColor="#666"
            onChangeText={onChangeNickname}
            value={nickname}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={nicknameRef}
          />
        </View>
        <View style={styles.button}>
          <Pressable
            style={
              canNext
                ? StyleSheet.compose(styles.SignButton, styles.SignButtonActive)
                : styles.SignButton
            }
            onPress={onSubmit}>
            <Text style={styles.SignButtonText}>회원가입</Text>
          </Pressable>
        </View>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
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

export default SignUp;

// import React, {useCallback, useRef, useState} from 'react';
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

// const SignIn = () => {
//   const canNext = true;

//   const [email, onChangeEmail] = useInput('');
//   const [password, onChangePassword] = useInput('');
//   const [passwordCheck, setPasswordCheck] = useState('');
//   const [passwordError, setPassworError] = useState(false);

//   const [nickname, onChangeNickname] = useInput('');

//   const emailRef = useRef<TextInput | null>(null);
//   const passwordRef = useRef<TextInput | null>(null);
//   const passwordCheckRef = useRef<TextInput | null>(null);
//   const nicknameRef = useRef<TextInput | null>(null);

//   const onChangePasswordCheck = useCallback(text => {
//     console.log('text:', text);
//   }, []);
//   return (
//     <DismissKeyboardView>
//       <View style={styles.first}>
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
//       </View>
//       <View style={styles.second}>
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
//             onSubmitEditing={() => passwordCheckRef.current?.focus()}
//             blurOnSubmit={false}
//           />
//         </View>

//         <View style={styles.inputWrapper2}>
//           <TextInput
//             style={styles.textInput}
//             placeholder="비밀번호 확인 "
//             placeholderTextColor="#666"
//             textContentType="password"
//             secureTextEntry
//             keyboardType={
//               Platform.OS === 'android' ? 'default' : 'ascii-capable'
//             }
//             onChangeText={onChangePasswordCheck}
//             value={passwordCheck}
//             returnKeyType="next"
//             clearButtonMode="while-editing"
//             ref={passwordCheckRef}
//             onSubmitEditing={() => nicknameRef.current?.focus()}
//             blurOnSubmit={false}
//           />
//         </View>
//       </View>
//       <View style={styles.third}>
//         <View style={styles.inputWrapper}>
//           <Text style={styles.text}>닉네임</Text>
//           <TextInput
//             style={styles.textInput}
//             placeholder="닉네임을 입력해 주세요"
//             placeholderTextColor="#666"
//             onChangeText={onChangeNickname}
//             value={nickname}
//             returnKeyType="next"
//             clearButtonMode="while-editing"
//             ref={nicknameRef}
//           />
//         </View>
//       </View>
//       <View style={styles.button}>
//         <Pressable
//           style={
//             canNext
//               ? StyleSheet.compose(styles.SignButton, styles.SignButtonActive)
//               : styles.SignButton
//           }>
//           <Text style={styles.SignButtonText}>회원가입</Text>
//         </Pressable>
//       </View>
//     </DismissKeyboardView>
//   );
// };

// const styles = StyleSheet.create({
//   first: {flex: 1},
//   second: {flex: 1},
//   third: {flex: 1},
//   inputWrapper: {
//     // padding: 20,
//     // marginTop: 10,
//     backgroundColor: 'yellow',
//   },

//   inputWrapper2: {
//     // paddingHorizontal: 20,
//     // paddingBottom: 10,
//     backgroundColor: 'lightblue',
//   },
//   text: {},
//   textInput: {
//     // padding: 5,
//     // backgroundColor: 'lightblue',
//     // borderBottomWidth: StyleSheet.hairlineWidth,
//     color: 'black',
//   },
//   button: {
//     alignItems: 'center',
//   },
//   SignButton: {
//     backgroundColor: 'gray',
//     // paddingHorizontal: 20,
//     // paddingVertical: 10,
//     // borderRadius: 5,
//     // marginBottom: 10,
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

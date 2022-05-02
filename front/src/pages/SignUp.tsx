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
  ScrollView,
  Dimensions,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import DismissKeyboardView from '../components/DismissKeyboardView';
import useInput from '../hooks/useInputtrim';
import use from '../hooks/useInput';
import {signup} from '../actions/user';
import {useAppDispatch} from '../store';
import {useSelector} from 'react-redux';
import {RootState} from '../reducer';
import {RootStackParamList} from '../../AppInner';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = ({navigation}: SignUpScreenProps) => {
  const dispatch = useAppDispatch();
  const [email, onChangeEmail] = useInput('');

  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPassworError] = useState(false);

  const [nickname, onChangeNickname] = use('');
  // const [univ, onChangeUniv] = useInput('');

  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const passwordCheckRef = useRef<TextInput | null>(null);
  const nicknameRef = useRef<TextInput | null>(null);
  // const univRef = useRef<TextInput | null>(null);

  const {signupError, signupLoading} = useSelector(
    (state: RootState) => state.user,
  );

  const canNext = email && nickname && password;

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
    if (signupLoading) {
      return;
    }
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

    if (nickname.length > 10) {
      return Alert.alert('알림', '닉네임 글자 수를 10 이하로 작성해주세요.');
    }
    // if (!univ) {
    //   return Alert.alert('알림', '닉네임을 입력하세요');
    // }

    console.log('비밀번호 맞음');

    dispatch(signup({email, password, nickname}));

    navigation.navigate('SignIn');
  }, [email, password, passwordCheck, nickname, dispatch, navigation]);

  return (
    <View style={styles.first}>
      <DismissKeyboardView>
        <View style={styles.MainWrapper}>
          <View style={styles.header}>
            <Text style={styles.headertxt}>SignUp!</Text>
          </View>
          <View style={styles.inputWrapper}>
            {/* <Text style={styles.text}>Eamil</Text> */}
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeEmail}
              placeholder="Email"
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
            {/* <Text style={styles.text}>비밀번호</Text> */}
            <TextInput
              style={styles.textInput}
              onChangeText={onChangePassword}
              placeholder="Password"
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

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Password Check"
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
            {passwordError && (
              <Text style={{marginTop: 10}}>비밀번호가 일치하지 않습니다.</Text>
            )}
          </View>
          <View style={styles.inputWrapper}>
            {/* <Text style={styles.text}>닉네임</Text> */}
            <TextInput
              style={styles.textInput}
              placeholder="Nickname"
              placeholderTextColor="#666"
              onChangeText={onChangeNickname}
              value={nickname}
              returnKeyType="next"
              clearButtonMode="while-editing"
              ref={nicknameRef}
              onSubmitEditing={onSubmit}
              blurOnSubmit={false}
            />
          </View>
          {/* <View style={styles.inputWrapper}>
            <Text style={styles.text}>대학교</Text>
            <TextInput
              style={styles.textInput}
              placeholder="소속 대학교를 입력해주세요"
              placeholderTextColor="#666"
              onChangeText={onChangeUniv}
              value={univ}
              returnKeyType="next"
              clearButtonMode="while-editing"
              ref={univRef}
              onSubmitEditing={onSubmit}
            />
          </View> */}
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
              disabled={!canNext || signupLoading}
              onPress={onSubmit}>
              {signupLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.SignButtonText}>SignUp</Text>
              )}

              {/* <Text style={styles.SignButtonText}>회원가입</Text> */}
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
    width: '100%',
  },
  inputWrapper: {
    paddingVertical: 20,
    marginHorizontal: 30,
  },

  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  headertxt: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#6ccca3',
  },

  inputWrapper2: {
    paddingBottom: 10,
    marginHorizontal: 30,
  },
  text: {
    fontSize: 15,
  },
  textInput: {
    fontSize: 15,
    color: '#575958',
    borderBottomWidth: 0.8,
    borderBottomColor: '#93edc6',
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
  },
  SignButton: {
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

  SignButtonActive: {
    backgroundColor: '#49c9ab',
  },

  SignButtonText: {
    color: 'white',
    fontSize: 15,
  },

  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignUp;

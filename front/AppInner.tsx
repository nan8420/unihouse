import React from 'react';

import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import SignUp from './src/pages/SignUp';
import SignIn from './src/pages/SignIn';
import Hey from './src/pages/Hey';
import MainPage from './src/pages/MainPage';
import {useAppDispatch} from './src/store';
import {RootState} from './src/reducer/index';
import userSlice from './src/reducer/user';
import {loadMyInfo} from './src/actions/user';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export type LoggedInParamList = {
  MainPage: undefined;

  // Complete: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppInnger = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.me);
  useEffect(() => {
    const getTokenAndRefresh = async () => {
      try {
        console.log('처음시작!!!!!!!!');
        const rtoken = await EncryptedStorage.getItem('refreshToken');
        if (!rtoken) {
          console.log('토큰이 없네요!!!!');
          return;
        }
        const response = await axios.post(
          `${Config.API_URL}/user/refreshToken`,
          {},
          {
            headers: {
              authorization: `Bearer ${rtoken}`,
            },
          },
        );
        const refreshresponse = await axios.post(
          `${Config.API_URL}/user/refreshRefreshToken`,
          {},
          {
            headers: {
              authorization: `Bearer ${rtoken}`,
            },
          },
        );

        dispatch(loadMyInfo());

        await EncryptedStorage.setItem(
          'accessToken',
          response.data.data.accessToken,
        );

        await EncryptedStorage.setItem(
          'refreshToken',
          refreshresponse.data.data.refreshToken,
        );
      } catch (error) {
        console.error(error);
        if ((error as AxiosError).response?.data.code === 'expired') {
        }
      }
    };
    getTokenAndRefresh();
  }, [dispatch]);

  useEffect(() => {
    axios.interceptors.request.use(
      async config => {
        const accessToken = await EncryptedStorage.getItem('accessToken');

        return {
          ...config,
          headers: {
            authorization: `Bearer ${accessToken}`,
            ...config.headers,
          },
        };
      },
      async error => {
        return Promise.reject(error);
      },
    );

    axios.interceptors.response.use(
      response => {
        console.log('인터셉터!!!!!!!!!!!!!!');
        // console.log('response:::', response);
        return response;
      },
      async error => {
        const {
          config,

          response: {status},
        } = error;
        if (status === 419) {
          if (error.response.data.code === 'expired') {
            console.log('expired!!!!!!!!!!!!!!!!');
            const originalRequest = config;
            const refreshToken = await EncryptedStorage.getItem('refreshToken');
            // token refresh 요청
            const {data} = await axios.post(
              `${Config.API_URL}/user/refreshToken`, // token refresh api
              {},
              {headers: {authorization: `Bearer ${refreshToken}`}},
            );
            console.log('data:', data);
            // 새로운 토큰 저장
            await EncryptedStorage.setItem(
              'accessToken',
              data.data.accessToken,
            );
            originalRequest.headers.authorization = `Bearer ${data.data.accessToken}`;
            // 419로 요청 실패했던 요청 새로운 토큰으로 재요청
            console.log('여기 갇힘!!!!!!!!');
            // console.log('originalRequest::::', originalRequest);
            return axios(originalRequest);
          }
        } else if (status === 420) {
          if (error.response.data.code === 'expired') {
            dispatch(userSlice.actions.reMoveme());
            Alert.alert('알림', '다시 로그인 해주세요.');
          }
        }
        return Promise.reject(error);
      },
    );
  }, [dispatch]);

  return isLoggedIn ? (
    <Tab.Navigator>
      <Tab.Screen
        name="MainPage"
        component={MainPage}
        options={{
          headerShown: false,

          tabBarIcon: ({color}) => (
            <FontAwesome5 name="list" size={20} style={{color}} />
          ),
          tabBarActiveTintColor: 'blue',
        }}
      />
    </Tab.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppInnger;

// import React from 'react';

// import {useEffect} from 'react';
// import {useSelector} from 'react-redux';

// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import EncryptedStorage from 'react-native-encrypted-storage';
// import axios, {AxiosError} from 'axios';
// import Config from 'react-native-config';
// import SignUp from './src/pages/SignUp';
// import SignIn from './src/pages/SignIn';
// import Hey from './src/pages/Hey';
// import {useAppDispatch} from './src/store';
// import {RootState} from './src/reducer/index';
// import userSlice from './src/reducer/user';

// export type RootStackParamList = {
//   SignIn: undefined;
//   SignUp: undefined;
// };

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// const AppInnger = () => {
//   const dispatch = useAppDispatch();
//   const isLoggedIn = useSelector((state: RootState) => state.user.me);

//   useEffect(() => {
//     axios.interceptors.response.use(
//       response => {
//         console.log('인터셉터!!!!!!!!!!!!!!');
//         // console.log('response:::', response);
//         return response;
//       },
//       async error => {
//         const {
//           config,

//           response: {status},
//         } = error;
//         if (status === 419) {
//           if (error.response.data.code === 'expired') {
//             console.log('expired!!!!!!!!!!!!!!!!');
//             const originalRequest = config;
//             const refreshToken = await EncryptedStorage.getItem('refreshToken');
//             // token refresh 요청
//             const {data} = await axios.post(
//               `${Config.API_URL}/user/refreshToken`, // token refresh api
//               {},
//               {headers: {authorization: `Bearer ${refreshToken}`}},
//             );
//             // 새로운 토큰 저장
//             dispatch(userSlice.actions.setAccessToken(data.data.accessToken));
//             originalRequest.headers.authorization = `Bearer ${data.data.accessToken}`;
//             // 419로 요청 실패했던 요청 새로운 토큰으로 재요청
//             console.log('여기 갇힘!!!!!!!!');
//             // console.log('originalRequest::::', originalRequest);
//             return axios(originalRequest);
//           }
//         }
//         return Promise.reject(error);
//       },
//     );
//   }, [dispatch]);

//   return isLoggedIn ? (
//     <Tab.Navigator>
//       <Tab.Screen name="Hey" component={Hey} options={{title: '오더 목록'}} />
//     </Tab.Navigator>
//   ) : (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="SignIn"
//         component={SignIn}
//         options={{title: '로그인'}}
//       />
//       <Stack.Screen
//         name="SignUp"
//         component={SignUp}
//         options={{title: '회원가입'}}
//       />
//     </Stack.Navigator>
//   );
// };

// export default AppInnger;

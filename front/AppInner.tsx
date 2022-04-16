import React from 'react';

import {useEffect} from 'react';
import {useSelector} from 'react-redux';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import SignUp from './src/pages/SignUp';

const AppInnger = () => {
  return <SignUp />;
};

export default AppInnger;

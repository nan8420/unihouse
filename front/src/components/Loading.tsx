import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

const Loading = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const timerId = setTimeout(() => {
      setLoading(false);
    }, 6000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator color="#D3D3D3" size="large" />
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.label}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width / 1,
    height: Dimensions.get('window').height / 1,
    top: -70,
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    fontSize: 18,
  },
});

export default Loading;

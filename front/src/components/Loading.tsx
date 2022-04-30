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
    // console.log('처음');
    setLoading(true);
    const timerId = setTimeout(() => {
      setLoading(false);
    }, 6000);

    return () => {
      // console.log('나중'),
      // console.log('timerId:', timerId),
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
    // backgroundColor: '#feffff',
    // backgroundColor: 'lightblue',
    // flex: 1,
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

// import React, {useEffect, useState} from 'react';
// import {ActivityIndicator} from 'react-native';
// import styled from 'styled-components/native';

// const Container = styled.View`
//   flex: 1;
//   background-color: #feffff;
//   align-items: center;
//   justify-content: center;
// `;

// const Label = styled.Text``;

// const Loading = ({label}) => {
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     const timerId = setTimeout(() => {
//       setLoading(false);
//     }, 6000);

//     return () => clearTimeout(timerId);
//   }, []);

//   return loading ? (
//     <Container>
//       <ActivityIndicator color="#D3D3D3" size="large" />
//     </Container>
//   ) : (
//     <Container>
//       <Label>{label}</Label>
//     </Container>
//   );
// };

// export default Loading;

// import React, {useEffect, useState} from 'react';
// import {ActivityIndicator} from 'react-native';
// import styled from 'styled-components/native';

// const Container = styled.View`
//   /* flex: 1; */
//   background-color: #feffff;
//   align-items: center;
//   justify-content: center;
//   /* background: lightblue; */
//   margin-top: 50%;
// `;

// const Label = styled.Text`
//   font-size: 18px;
// `;

// const Loading = ({label}) => {
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     console.log("처음")
//     setLoading(true);
//     const timerId = setTimeout(() => {
//       setLoading(false);
//     }, 6000);

//     return () => clearTimeout(timerId);
//   }, []);

//   return loading ? (
//     <Container>
//       <ActivityIndicator color="#D3D3D3" size="large" />
//     </Container>
//   ) : (
//     <Container>
//       <Label>{label}</Label>
//     </Container>
//   );
// };

// export default Loading;

// // import React, {useEffect, useState} from 'react';
// // import {ActivityIndicator} from 'react-native';
// // import styled from 'styled-components/native';

// // const Container = styled.View`
// //   flex: 1;
// //   background-color: #feffff;
// //   align-items: center;
// //   justify-content: center;
// // `;

// // const Label = styled.Text``;

// // const Loading = ({label}) => {
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     setLoading(true);
// //     const timerId = setTimeout(() => {
// //       setLoading(false);
// //     }, 6000);

// //     return () => clearTimeout(timerId);
// //   }, []);

// //   return loading ? (
// //     <Container>
// //       <ActivityIndicator color="#D3D3D3" size="large" />
// //     </Container>
// //   ) : (
// //     <Container>
// //       <Label>{label}</Label>
// //     </Container>
// //   );
// // };

// // export default Loading;

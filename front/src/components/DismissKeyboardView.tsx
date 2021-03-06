import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const DismissKeyboardView = ({children, ...props}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    {/* <KeyboardAwareScrollView {...props} style={props.style}> */}
    <KeyboardAwareScrollView
      {...props}
      style={props.style}
      // contentContainerStyle={{flex: 1}}
      // contentContainerStyle={{justifycontent: 'center'}}
    >
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;

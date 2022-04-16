import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import AppInner from './AppInner';

const App = () => {
  return (
    <NavigationContainer>
      <AppInner />
    </NavigationContainer>
  );
};

export default App;

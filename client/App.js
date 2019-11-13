/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  NavigatorIOS,
  Platform
} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from 'react-native/Libraries/NewAppScreen';

import rootReducer from './src/reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import OneWindow from './src/components/OneWindow';
import AddProduct from './src/components/AddProduct';
import DetailProduct from './src/components/DetailProduct';

const store = createStore(rootReducer,applyMiddleware(thunk));

const RootStack = createStackNavigator(
    {
        Home: {screen: OneWindow},
        Add: {screen: AddProduct},
        Detail: {screen: DetailProduct}
    },
    {
        initialRouteName: 'Home'
    }
)

const AppContainer = createAppContainer(RootStack);

const App: () => React$Node = () => {
  return (
      <Provider store={store}>
          <AppContainer />
      </Provider>
  );
};

export default App;

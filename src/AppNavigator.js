import React, { Component } from 'react';
import { BackAndroid, Platform, StatusBar, View, } from 'react-native';
import { connect } from 'react-redux';
  
import { Colors } from '@theme/';
import { StackNavigator } from 'react-navigation';
import Splash from '@containers/Splash';
import Login from '@containers/Authentication/Login'; 
import ListContainer from '@containers/ListContainer';
import DetailView from '@containers/DetailView';
import Accept from '@containers/AcceptReject';
import ChooseAnother from '@containers/ChooseAnother';

const AppNavigator = StackNavigator({
  splash: { screen: Splash },
  login: { screen: Login },
  list: {screen: ListContainer},
  accept: {screen: Accept},
  detail: {screen: DetailView},      
  another: {screen: ChooseAnother},
}, {
  initialRouteName: 'login',
  navigationOptions: {
    header: null,
    gesturesEnabled: false,
    cardStack: { gesturesEnabled: false },
  },
  headerMode: 'screen',
  lazyLoad: true,
});

export default AppNavigator;       

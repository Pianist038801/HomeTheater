import { put, call, takeEvery, takeLatest, select, cps } from 'redux-saga/effects';
import Types from '@actions/actionTypes';  
import {getLogin, getList, getVersion} from '@api/getList';
import React, { Component,  } from 'react';
import {
  Platform,Linking, Alert
 } from 'react-native';
const getGlobals = (state) => state.get('globals');

function* getListFromServer(action) {
  try {
     
    yield put({type: Types.SET_SPINNER_VISIBLE, spinnerVisible: true})
    // let globals = yield select(getGlobals); 
    // const values = yield call(getList, globals.data.userInfo._UserType, globals.data.userInfo._UserID);
    // yield put({
    //   type: Types.SET_DATA,
    //   data: {list: values}, //response data
    // }); 
    yield put({type: Types.SET_SPINNER_VISIBLE, spinnerVisible: false})
  } catch (error) {
    console.log('sss')
  }
}
 
function* logIn(action) {
  try { 
    //yield put({type: Types.SET_SPINNER_VISIBLE, spinnerVisible: true})
    const values =  yield call(getLogin, action.username, action.password, Platform.OS, 'push_token');
    console.log('_______');
    console.log(values);
    if(values.Result == false)
    {
      yield put({type: Types.SET_SPINNER_VISIBLE, spinnerVisible: false});
      alert('Invalid Credential')
    }
    else
    { 
      yield put({
        type: Types.SET_DATA, 
        data: {userid: values.Userid, avatar: values.Avatar, list: values.Requests}, //response data
      }); 
      let globals = yield select(getGlobals); 
      globals.navigator.navigate('list');
      yield put({type: Types.SET_SPINNER_VISIBLE, spinnerVisible: false})
    }
  } catch (error) {
    console.log(error)
  }
}
const root = function* loadTodos() {
  yield takeLatest("GET_LIST", getListFromServer); 
  yield takeLatest("LogIn", logIn);                                   
}

export default root;
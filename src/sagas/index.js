import { put, call, takeEvery, takeLatest, select, cps } from 'redux-saga/effects';
import Types from '@actions/actionTypes';  
import { getLogin, sendAnother, acceptConfirm, getAnother, rejectConfirm } from '@api/getList';
import React, { Component,  } from 'react'; 
import {
  Platform,Linking, Alert
 } from 'react-native';
const getGlobals = (state) => state.get('globals');

function* accept(action) {
  try { 
    //yield put({type: Types.SET_SPINNER_VISIBLE, spinnerVisible: true}) 
    const values =  yield call(action.accept==1?acceptConfirm:rejectConfirm, action.message, action.requestid, action.userid); 
    if(values.success==true)
      alert('Successfuly Sent');
    else
      alert('Failed to send message');
    yield put({type: Types.SET_SPINNER_VISIBLE, spinnerVisible: false})
  } catch (error) {
    console.log('sss')
  }
}
function* getAnothers(action) {
  try { 
    yield put({type: Types.SET_SPINNER_VISIBLE, spinnerVisible: true}) 
    const values =  yield call(getAnother, action.userid); 
    console.log(values); 
      yield put({
        type: Types.SET_DATA, 
        data: {userArray: values}, //response data
      }); 
    yield put({type: Types.SET_SPINNER_VISIBLE, spinnerVisible: false})
  } catch (error) {
    console.log('sss')
  }
} 
function* sendAnothers(action) {
  try { 
    //yield put({type: Types.SET_SPINNER_VISIBLE, spinnerVisible: true}) 
    const values =  yield call(sendAnother, action.userid, action.receiverid, action.requestid); 
    if(values.success==true)
    alert('Successfuly Transfered');
    else
    alert('Failed to transfer job');
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
  yield takeLatest("LogIn", logIn);         
  yield takeLatest("Accept", accept);
  yield takeLatest("getAnother", getAnothers); 
  yield takeLatest("sendAnother", sendAnothers);                       
}

export default root;
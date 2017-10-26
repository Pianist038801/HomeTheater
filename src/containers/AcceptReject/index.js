import React, { Component } from 'react';
import { View, Alert, Linking, WebView, ScrollView, TextInput, Platform, TouchableOpacity, FlatList, Keyboard, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from 'react-native-navbar'; 
import { Styles, Colors, Metrics, Fonts } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';
import Types from '@actions/actionTypes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OverlaySpinner from '@components/OverlaySpinner';
import styles from './styles';

var _this;
class AcceptReject extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            accept: props.navigation.state.params.accept, 
            requestid: props.navigation.state.params.requestid, 
        } 

    } 
    confirm = ()=>
    {
        console.log('Con');
        this.props.dispatch({type: 'Accept', accept: this.state.accept, message: this.state.post, userid: this.props.globals.data.userid, requestid: this.state.requestid})
    }
    render()
    { 
        return(
            <View style={[Styles.fullScreen, {flex: 1,  backgroundColor:  Colors.brandSecondary }] }> 
                <NavigationBar
                statusBar={{ style: 'light-content' }}               
                style={Styles.nav}
                title={CommonWidgets.renderNavBarHeader(this.state.accept==1?'Accept':'Decline')}
                tintColor={Colors.brandPrimary}
                leftButton={CommonWidgets.renderNavBarLeftButton(() => this.props.navigation.goBack())}                
                /> 
                  <TextInput
                    ref={(c) => { this.explanationInput = c; }} 
                    style={[Fonts.style.fieldInput, {height:Math.max(35,this.state.height), flex: 1, width: Metrics.screenWidth - 2*Metrics.defaultMargin ,  margin: Metrics.defaultMargin,  }]}
                    underlineColorAndroid={'transparent'}
                    placeholder='Write your message...'
                    placeholderTextColor={Colors.colGray}
                    textAlignVertical={'center'}
                    autoCapitalize={'none'}
                    multiline
                    autoCorrect 
                    onChangeText={text => this.setState({ post: text  })}
                    value={this.state.post}  
                    maxLength={140}/>
                    <View style={{alignItems: 'center'}}>
                        {CommonWidgets.renderTextButton('Confirm',Colors.pink,  this.confirm )}
                    </View>
                <OverlaySpinner visible={this.props.globals.spinnerVisible} />   
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch, 
  };
}

function mapStateToProps(state) {
  const globals = state.get('globals');
  const navigator = state.get('routes');
  return { globals, navigator};
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptReject);

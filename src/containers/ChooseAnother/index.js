import React, { Component, PureComponent } from 'react';
import { View, StyleSheet , Alert, BackHandler, ScrollView, TouchableOpacity, FlatList, Keyboard, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import NavigationBar from 'react-native-navbar'; 
import { Styles, Colors, Metrics, Fonts } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';
import CT from '@src/constants';
import Types from '@actions/actionTypes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OverlaySpinner from '@components/OverlaySpinner';
import Utils from '@src/utils';
  
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';


class ChooseAnother extends PureComponent {
  constructor(props)
  {
    super(props);
    this.state={
      requestid: props.navigation.state.params.requestid, 
    }
  }
  onGo= (user)=>
  { 
    this.props.dispatch({type: 'sendAnother', userid: this.props.globals.data.userid, receiverid: user.userID, requestid: this.state.requestid });
  } 
  componentDidMount()
  {
    this.props.dispatch({type: 'getAnother', userid: this.props.globals.data.userid});
  }
  render() {
    console.log('RRR');
    console.log(this.props.globals.data.userArray);
    console.log('TTT');
    return (
      <View style={[Styles.fullScreen, {flex:1, backgroundColor:  Colors.brandSecondary }] }> 
             <NavigationBar
             statusBar={{ style: 'light-content' }}
             style={Styles.nav}
             title={CommonWidgets.renderNavBarHeader('Send Job to another technician')}
             tintColor={Colors.brandPrimary}
             leftButton={CommonWidgets.renderNavBarLeftButton(() => this.props.navigation.goBack())}                
               />   
             {this.props.globals.data.userArray
             .filter(data => (data.userID!=this.props.globals.data.userid))
             .map((userinfo, id)=>CommonWidgets.renderUser(userinfo, this.onGo))}
            <OverlaySpinner visible={this.props.globals.spinnerVisible} />       
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
 
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

export default connect(mapStateToProps, mapDispatchToProps)(ChooseAnother);     

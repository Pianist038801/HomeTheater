import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  Platform,
  Image,
  Alert,
  Linking
 } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import I18n from 'react-native-i18n'; 
import Types from '@actions/actionTypes'; 
import OverlaySpinner from '@components/OverlaySpinner';
import CommonWidgets from '@components/CommonWidgets';

import { Styles, Images, Colors, Fonts, Metrics } from '@theme/';
import Utils from '@src/utils';
import styles from './styles';
import { setSpinnerVisible, setNavigator } from '@actions/globals';
import DeviceInfo from 'react-native-device-info';
import {getLogin, getList, getVersion} from '@api/getList';
const Permissions = require('react-native-permissions');
class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: 'booking@hometheaterproz.com',
      password: 'Pa$$w0rd',
    };
    
  }
  componentWillMount()
  {
    this.props.setNavigator(this.props.navigation)
  }
  componentDidMount = () => { 
    Permissions.check('location')
    .then(response => {
      //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      if(response != 'authorized')
        Alert.alert('You should turn on your location service.')
    });
    
    navigator.geolocation.getCurrentPosition(
      (position) => { 
        this.props.dispatch({
          type: Types.SET_DATA, 
          data: {
              location:{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
                }}
          });
      },
      (error) => alert(  error )
      ); 
  }
  
  onTextInputFocus(value) {
    this.setState({ emailFocus: false, passwordFocus: false });
    this.setState({ [`${value}Focus`]: true });
  }

  doLogin() {
    if(this.state.email == '' || this.state.password == '') 
      alert('All fields should be valid');
    else
    { 
      console.log('EMAILEMAIL!!!!!');
      console.log(this.state.email);
       this.props.dispatch({type: 'LogIn', username: this.state.email, password: this.state.password})
    }
     
  }
 

  render() {
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: Colors.brandPrimary }}
        automaticallyAdjustContentInsets={false}>
        <View style={Styles.fullScreen}> 
           
          <View style={[Styles.center, { flex: 5 }]}>
            <Image source={Images.logo} style={{width: Metrics.screenWidth*3/4, resizeMode: 'contain'}} >
              
            </Image>
          </View>

          {/* -----Body---- */}
          <View style={styles.bodyContainer}>
            <View
              style={[Styles.textInputContainerStyle,
              { borderColor: Utils.getTextInputBorderColor(this.state.emailFocus) }]}>
              <TextInput
                autoCapitalize = 'none'
                style={Styles.textInputStyle}
                underlineColorAndroid={'transparent'}
                placeholder={'USERNAME'}
                placeholderTextColor={Colors.textPlaceholder}
                multiline={false}
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })}
                keyboardType={'email-address'}
                returnKeyType={'next'}
                onSubmitEditing={() => this.loginpwd.focus()}
                onFocus={() => this.onTextInputFocus('email')} />
            </View>
            {CommonWidgets.renderSpacer(1)}
            <View
              style={[Styles.textInputContainerStyle,
              { borderColor: Utils.getTextInputBorderColor(this.state.passwordFocus) }]}>
              <TextInput
                ref={(c) => { this.loginpwd = c; }}
                style={Styles.textInputStyle}
                autoCapitalize = 'none'
                underlineColorAndroid={'transparent'}
                placeholder={I18n.t('PASSWORD')}
                placeholderTextColor={Colors.textPlaceholder}
                value={this.state.password}
                multiline={false}
                secureTextEntry
                onChangeText={text => this.setState({ password: text })}
                returnKeyType={'go'}
                onSubmitEditing={() => this.doLogin()}
                onFocus={() => this.onTextInputFocus('password')} />
            </View>
            {CommonWidgets.renderSpacer(20)}
            {CommonWidgets.renderMaterialButton(I18n.t('LOGIN'),
              Colors.brandLogin, () => this.doLogin())}
          </View>
        </View>
        <OverlaySpinner visible={this.props.globals.spinnerVisible} />     
      </KeyboardAwareScrollView>
    );
  }
}

Login.propTypes = {
  dispatch: React.PropTypes.func.isRequired, 
  setSpinnerVisible: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setNavigator: route => dispatch(setNavigator(route)),
    setSpinnerVisible: spinnerVisible => dispatch(setSpinnerVisible(spinnerVisible)),
  };
}
function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);

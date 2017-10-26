import React, { Component } from 'react';
import { View, Alert, Linking, WebView, ScrollView, Platform, TouchableOpacity, FlatList, Keyboard, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from 'react-native-navbar'; 
import { Styles, Colors, Metrics, Fonts } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';
import Types from '@actions/actionTypes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OverlaySpinner from '@components/OverlaySpinner';
import styles from './styles';

var _this;
class DetailView extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            data: props.navigation.state.params.data, 
        }

        _this = this;
    } 
    setMap= (id)=>
    {
        this.setState({bdr1: Colors.brandSecondary, bdr0: Colors.brandSecondary});
        this.setState({[`bdr${id}`] : Colors.borderPrimary});
        if(id==1)
        {
            return Linking.openURL(`http://maps.google.com/maps?saddr=${this.props.globals.data.location.latitude},${this.props.globals.data.location.longitude}&daddr=${this.props.navigation.state.params.data._GPS_Lat},${this.props.navigation.state.params.data._GPS_Lng}`).catch(err=>alert('s'));
        }
        else
        { 
            Linking.canOpenURL(this.state.wazeUrl).then(supported => {
                if (!supported) {
                    if(Platform.OS==='android')
                        return Linking.openURL("market://details?id=com.waze");
                    else
                        return Linking.openURL("http://itunes.apple.com/us/app/id323229106");
                } else {
                  return Linking.openURL(this.state.wazeUrl).catch(err=>alert('s'));
                }
              }).catch(err => console.error('An error occurred', err));
            
        }
        //Linking.openURL("waze://?ll=5.12,35.23&navigate=yes").catch(err=>alert('s'));
        //this.setState({url: this.state.wazeUrl});
    }
    render()
    { 
        return(
            <View style={[Styles.fullScreen, {flex: 1,  backgroundColor:  Colors.brandSecondary }] }> 
                <NavigationBar
                statusBar={{ style: 'light-content' }}
                style={Styles.nav}
                title={CommonWidgets.renderNavBarHeader('Detail')}
                tintColor={Colors.brandPrimary}
                leftButton={CommonWidgets.renderNavBarLeftButton(() => this.props.navigation.goBack())}                
                  /> 
                <View style={{flex:1, flexDirection: 'column'}}>
                    {CommonWidgets.renderDetailRow('Customer Name', this.state.data.Data.customerName)}
                    {CommonWidgets.renderDetailRow('Service Location', this.state.data.Data.serviceLocation)}
                    {CommonWidgets.renderDetailRow('Service Type', this.state.data.Data.serviceType)}
                    {CommonWidgets.renderDetailRow('Service Details', this.state.data.Data.serviceDetails)}
                    {CommonWidgets.renderDetailRow('Telephone', this.state.data.Data.Telephone)}
                    {CommonWidgets.renderDetailRow('Email', this.state.data.Data.Email)}
                    {CommonWidgets.renderDetailImage('Attached Photo', this.state.data.Data.AttachedPhoto)}
                    <View style={{flexDirection: 'row', flex:1, marginTop: 15,   justifyContent: 'center'}}>
                        {CommonWidgets.renderTextButton('Accept', Colors.pink, ()=>{this.props.navigation.navigate('accept',{accept: 1, requestid: this.state.data.requestID})})}
                        {CommonWidgets.renderTextButton('Decline', Colors.green, ()=>{this.props.navigation.navigate('accept',{accept: 0, requestid: this.state.data.requestID})})}
                    </View>
                    <View style={{flexDirection: 'row',   flex:1, justifyContent: 'center'}}>
                    {CommonWidgets.renderTextButton('Send this job to another technician', 'transparent', ()=>{this.props.navigation.navigate('another', {requestid: this.state.data.requestID})})}
                    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);

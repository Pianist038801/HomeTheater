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

const FirstRoute = () => <View style={[ styles.container, { backgroundColor: '#ff4081' } ]} >
         <ScrollView style={{flex: 1}}> 
            {    
                (this.props.globals.data.list!=undefined) && 
                this.props.globals.data.list
                .filter(data=>(data.Type == 0))  
                .map((data, id)=> CommonWidgets.renderCell(data,id, this.props.globals.data.location, this.onGo)
                )   
            }  
        </ScrollView>
</View>;
const SecondRoute = () => <View style={[ styles.container, { backgroundColor: '#673ab7' } ]}  >
<ScrollView style={{flex: 1}}> 
   {    
       (this.props.globals.data.list!=undefined)&&
       this.props.globals.data.list
       .filter(data=>(data.Type == 1))  
       .map((data, id)=> CommonWidgets.renderCell(data,id, this.props.globals.data.location, this.onGo)
       )   
   }  
   </ScrollView>
</View>
class TabViewExample extends PureComponent {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Quote Request' },
      { key: '2', title: 'Second' }
    ]
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = props => SceneMap({
    '1': <FirstRoute {...props} />,
    '2': <SecondRoute {...props} /> 
  });

  render() {
    return (
        <View style={[Styles.fullScreen, {flex:1, backgroundColor:  Colors.brandSecondary }] }> 
            <NavigationBar
            statusBar={{ style: 'light-content' }}
            style={Styles.nav}
            title={<View style={{marginLeft: -35}}>
                        <Text>Dispatcher</Text>           
                    </View>}
            tintColor={Colors.brandPrimary} 
            />  
            <TabViewAnimated
                style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onIndexChange={this._handleIndexChange}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(TabViewExample);     

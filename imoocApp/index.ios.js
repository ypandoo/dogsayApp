/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import Icon from 'react-native-vector-icons/Ionicons'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TabBarIOS,
  View,
  Navigator
} from 'react-native';

import List from './app/creation/index'
import Edit from './app/edit/index'
import Account from './app/account/index'

class imoocApp extends React.Component {
  static title = '<TabBarIOS>';
  static description = 'Tab-based navigation.';
  static displayName = 'TabBarExample';

  state = {
    selectedTab: 'list',
    notifCount: 0,
    presses: 0,
  };

  _renderContent = (color: string, pageText: string, num?: number) => {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      </View>
    );
  };

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="grey"
        tintColor="#ee735c"
        unselectedItemTintColor="red"
        >
        <Icon.TabBarItem
          iconName= 'ios-videocam-outline'
          selectedIconName = 'ios-videocam'
          selected={this.state.selectedTab === 'list'}
          onPress={() => {
            this.setState({
              selectedTab: 'list',
            });
          }}>

          <Navigator 
            initialRoute={{
              name:'list',
              component: List
            }}
            configureScene = {(route)=>{
              return Navigator.SceneConfigs.FloatFromRight
            }}
            renderScene = {(route, navigator)=>{
              var Component =  route.component;
              return <Component {...route.params} navigator = {navigator} />
            }}
            />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName= 'ios-recording-outline'
          selectedIconName = 'ios-recording'
          selected={this.state.selectedTab === 'edit'}
          onPress={() => {
            this.setState({
              selectedTab: 'edit',
            });
          }}>
          <Edit />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName= 'ios-more-outline'
          selectedIconName = 'ios-more'
          selected={this.state.selectedTab === 'more'}
          onPress={() => {
            this.setState({
              selectedTab: 'more',
            });
          }}>
          <Account />
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

AppRegistry.registerComponent('imoocApp', () => imoocApp);

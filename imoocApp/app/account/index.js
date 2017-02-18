import Icon from 'react-native-vector-icons/Ionicons'
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native'; 

//List
export default class Account extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <Text>
          列表页面
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

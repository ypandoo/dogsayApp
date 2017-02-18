import Icon from 'react-native-vector-icons/Ionicons'
import React, { Component } from 'react';
import Video from 'react-native-video'
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native'; 


var width = Dimensions.get('window').width;
//List
export default class Detail extends React.Component{

  constructor(props){
    super(props)
    this.state ={
      video:props.row.video,
      rate: 1,
      mute:false,
      pause:false,
      repeat:false
    }
  }

  _backToList(){
    this.props.navigator.pop()
  }

  _onLoadStart(){
    console.log('_onLoadStart')
  }

  _onLoad(){
    console.log('_onLoad')
  }

  _onProgress(data){
    console.log('_onProgress',data)
  }

  _onEnd(){
console.log('_onEnd')
  }

  _onError(e){
console.log('error':e)
  }



  render(){
    return (
      <View style={styles.container}>
        <Text onPress={this._backToList.bind(this)}>
          详情页{this.props.row._id}
        </Text>
        <View style={styles.videobox} >
          <Video ref='videoPlayer'
            source={{uri: 'http://szv1.mukewang.com/583d5988b3fee311398b457c/H.mp4'}}
            style={styles.video}
            volume= {5}
            pause = {this.state.pause}
            rate = {this.state.rate}
            mute = {this.state.mute}
            repeat ={this.state.repeat}

            onLoadStart={this._onLoadStart.bind(this)}
            onLoad={this._onLoad.bind(this)}
            onProgress = {this._onProgress.bind(this)}
            onEnd = {this._onEnd.bind(this)}
            onError = {this._onError.bind(this)}
            
            />
        </View>
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
 
  videoBox:{
    width:width,
    height:360,
    backgroundColor:'black'
  },

  video:{
    width:width,
    height:360,
    backgroundColor:'black'
  }
});

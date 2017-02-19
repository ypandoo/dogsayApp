import Icon from 'react-native-vector-icons/Ionicons'
import React, { Component } from 'react';
import Video from 'react-native-video'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView
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
      repeat:false,
      videoReady: false,
      videoProgress:0.01,
      videoTotal: 0,
      currentTime:0
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
    if(!this.state.videoReady)
      this.setState({videoReady:true});

    var totalDuration = data.playableDuration;
    var currentTime = data.currentTime;

    var percent = Number(currentTime / totalDuration).toFixed(2);
    this.setState({videoTotal:totalDuration, 
      currentTime: Number(data.currentTime.toFixed(2)),
      videoProgress: percent
  });



  }

  _onEnd(){
console.log('_onEnd')
  }

  _onError(e){
console.log('error',e)
  }


  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBox} onPress={this._backToList.bind(this)}>
            <Icon name='ios-return-left' style={styles.backIcon}/>
            <Text style={styles.backText}>返回</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>视频详情页</Text>
        </View>

        <View style={styles.videobox} >
          <Video ref='videoPlayer'
            source={{uri: this.state.video}}
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
            {
              !this.state.videoReady && <ActivityIndicator style={styles.loading} /> 
            }

            <View style={styles.progressBox}>
              <View style={[styles.progressBar, 
                            {width: width*this.state.videoProgress}]}> 
              </View>
            </View>

            <ScrollView
              automaticallyAdjustContentInsets={false}
              showVerticalScrollIndicator={false}
              enableEmptySections={true}
              style={styles.scrollView}>
              <View style={styles.infoBox}>
                <Image style={styles.avatar} source={{uri: this.props.row.author.avatar}} />
                <View style={styles.descBox}>
                  <Text style={styles.nickname}> {this.props.row.author.nickname}</Text>
                  <Text style={styles.title}> {this.props.row.title}</Text>
                </View>
              </View>
            </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },

  loading:{
    position:'absolute',
    left:0,
    top:140,
    width:width,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },

  progressBox:{
    width:width,
    height:4,
    backgroundColor:'#ccc',
  },

  progressBar:{
    width:1,
    height:4,
    backgroundColor:'#ff6600'
  },

  header:{
    width:width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height:64,
    paddingTop:20,
    paddingLeft:5,
    paddingRight:5,
    borderBottomWidth:1,
    borderColor:'rgba(0,0,0,0.1)',
    backgroundColor:'#000'
  },

  backBox:{
    position:'absolute',
    left:12,
    top:32,
    width:50,
    flexDirection:'row',
    alignItems:'center'
  },

  headerTitle:{
    width:width-120,
    textAlign:'center',
    color: '#999'
  },

  backIcon:{
    color:'#999',
    fontSize:20,
    marginRight:5
  },

  backText:{
    color:'#999'
  },

infoBox: {
  width:width,
  flexDirection:'row',
  justifyContent:'center',
  marginTop:10,
},

avatar:{
  width:60,
  height:60,
  borderRadius:30,
  marginLeft:10,
  marginRight:10
},

descBox:{
  flex:1
},

nickname:{
  marginTop:8,
  fontSize:16,
  color:'#666'
}
});

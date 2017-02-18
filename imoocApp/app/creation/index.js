'use strict';

import Icon from 'react-native-vector-icons/Ionicons'
import Detail from './detail'
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableHighlight,
  Image,
  Dimensions,
  ActivityIndicator,
  RefreshControl
} from 'react-native';

import config from '../common/config.js';
import request from '../common/request.js';


var width = Dimensions.get('window').width;

var cachedResults = {
  nextPage: 1,
  items: [],
  total:0
}

//child
class Item extends Component{
  constructor(props) {
    super(props);
    this.state={row:props.row, up:false};
  }

  _up(){
    var up = !this.state.up;
    var row = this.props.row;
    var url= config.api.base + config.api.up;

    var body ={
      id: row._id,
      up: up ? 'yes' : 'no',
      accessToken: 'yanglei'
    }

    var that = this;
    request.post(url, body)
    .then(function(data){
      if(data && data.success){
        that.setState({
          up:!that.state.up
        })
      }else{
        //
      }
    })
    .catch(function(err){
      // console.log(err);
    })
  }

  render(){
    return(
       <TouchableHighlight onPress={this.props.onSelect}>
        <View style = {styles.item}>
          <Text style={styles.title}>{this.props.row.title}</Text>
          <Image source={{uri:this.props.row.thumb}} style={styles.thumb}>
            <Icon name = 'ios-play' style={styles.play} size={28} />
          </Image>

          <View style={styles.itemFooter}>
            <View style={styles.handleBox}>
              <Icon name = {this.state.up ? 'ios-heart' : 'ios-heart-outline'}
              size={28} 
              style={[styles.up, this.state.up ? null : styles.down]} 
              onPress={this._up.bind(this)}/>
              <Text style={styles.handleText}>喜欢</Text>
            </View>

            <View style={styles.handleBox}>
              <Icon name = 'ios-chatboxes-outline' size={28} style={styles.comment} />
              <Text style={styles.handleText}>评论</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}


//List
export default class List extends Component{
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
      ]),
      isLoadingTail: false,
      refreshing: false
    };
  }

  _renderRow(row){
    return (
      <Item row={row} key={row._id} 
      onSelect={this._loadpage.bind(this,row)}/>
    )
  }

  componentDidMount(){
    this._fectchData(1);
  }

  _fectchData(page){

    //Loading
    this.setState({isLoadingTail:true});

    //request for data
    request.get(config.api.base+config.api.creations,
                 {
                   accessToken:'YangLei',
                   page:page
                })
    .then((data) => {
      var items;
      var that = this;

      //fectch data failure
      if(!data.success)
      {
        this.setState({isLoadingTail:false, refreshing:false});
        console.warn(error);
      }

      //more data
      if (page != 0) {
          items = cachedResults.items.slice();
          items = items.concat(data.data); 
      } else {//refresh
          var items = data.data;
          items = items.concat(cachedResults.items);
      }

      //reset data source
      setTimeout(function(){
          that.setState(
            {
              dataSource: that.state.dataSource.cloneWithRows(cachedResults.items),
              isLoadingTail: false,
              refreshing:false
            })
          cachedResults.items = items;
          cachedResults.total = data.total;
          cachedResults.nextPage++;
        }, 200);

    })
    .catch((error) =>
    {
      this.setState({isLoadingTail:false, refreshing:false});
      console.warn(error);
    })
  }

  //Has more 
  _hasMore(){
    return cachedResults.items.length !== cachedResults.total;
  }

  _fectchMoreData(){
    if(!this._hasMore() || this.state.isLoadingTail)
    {
      return;
    }

    var page  = cachedResults.nextPage; 

    this._fectchData(page);
  }

  _renderFooter(){
    if(this.state.isLoadingTail)
      return (<ActivityIndicator style={styles.loadingMore}/>)
    // else
      // return <View><Text>1</Text></View>;
  }

  _onRefresh(){
    if(this.state.refreshing || !this._hasMore())
      return;

    this.setState({refreshing: true});
    this._fectchData(0);
  }

  _loadpage(row){
    this.props.navigator.push({
      name:'detail',
      component:Detail,
      params:{row:row}
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header} >
          <Text style={styles.header_title}>
            列表页面
          </Text>
        </View>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        enableEmptySections={true}
        automaticallyAdjustContentInsets = {false}
        onEndReached={this._fectchMoreData.bind(this)}
        onEndReachedThredhold = {20}
        renderFooter = {this._renderFooter.bind(this)}
        showVeritcalScroll={false}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  header:{
    paddingTop: 25,
    paddingBottom:12,
    backgroundColor:'#ee735c',
  },
  header_title:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600'
  },
  item:{
    width: width,
    marginBottom:10,
    backgroundColor:'#fff'
  },
  thumb:{
    width:width,
    height:width*0.5,
    resizeMode:'cover'
  },
  title:{
    padding:10,
    fontSize: 18,
    color: '#333'
  },

  itemFooter:{
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee'
  },

  handleBox:{
    padding:10,
    flexDirection:'row',
    width: width/2 - 0.5,
    justifyContent:'center',
    backgroundColor:'#fff'
  },
  play:{
    position:'absolute',
    bottom:14,
    right:14,
    width:46,
    height:46,
    paddingLeft: 18,
    paddingTop: 9,
    backgroundColor:'transparent',
    borderColor:'#fff',
    borderWidth: 1,
    borderRadius: 23,
    color:'#ed7b66'
  },

  handleText:{
    paddingLeft: 12,
    fontSize:18,
    color:'#333'
  },

  up:{
    fontSize:22,
    color:'rgb(255,0,0)'
  },

  down:{
    fontSize:22,
    color:'#333'
  },
  comment:{
    fontSize:22,
    color:'#333'
  },

  loadingMore:{
    marginVertical:30,
  },

  loadingText:{
    textAlign:'center'
  }



});

import Icon from 'react-native-vector-icons/Ionicons'
import React, { Component } from 'react';
import Request from '../common/request';
import Config from '../common/config'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  AlertIOS
} from 'react-native'; 

//List
export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text:'',
      codeSent: false,
      verifyCode: '',
      textVerify:''
    }
  }

  _submit(){
    this.props.logged();
  }

  _sendVerifyCode(){
    var phoneNumber = this.state.text;
    if(!phoneNumber){
      return AlertIOS.alert('phone empty');
    }

    var body = {
      phoneNumber:phoneNumber
    }

    this.setState({codeSent:true});

    // var signupUrl = Config.api.base + Config.api.signup;
    // var that = this;
    // Request.post(signupUrl, body)
    //   .then((data)=>{
    //     if(data && data.success){
    //       that._showVerifyCode()
    //     }
    //     else{
    //       AlertIOS.alert('verify code require failed')
    //     }
    //   })
    //   .catch((err)=>{
    //     AlertIOS.alert('verify code require failed')
    //   })
  }

  _showVerifyCode(){

  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.signupBox}>
          <Text style={styles.title}>快速登录</Text>
          <TextInput
            placeholder = 'Input phone number'
            autoCapitalize='none'
            autoCorrect = {false}
            keyboardType= 'number-pad'
            style={styles.inputField}
            onChangeText={(text)=>{
              this.setState({text})
            }}
            value={this.state.text}
            />
        {
          this.state.codeSent 
            ? <View>
              <TextInput
            placeholder = 'Input verifyCode'
            autoCapitalize='none'
            autoCorrect = {false}
            keyboardType= 'number-pad'
            style={styles.inputField}
            onChangeText={(textVerify)=>{
              this.setState({textVerify})
            }}
            value={this.state.textVerify}
            />
            </View>
            : null
        }
        {
          this.state.codeSent 
            ? 
            <Button
              style={styles.btn}
              onPress={this._submit.bind(this)}
              title="登录"
              />
            : <Button
              style={styles.btn}
              onPress={this._sendVerifyCode.bind(this)}
              title="发送验证码" />

        }

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    backgroundColor: '#f9f9f9',
  },
  signupBox: {
    paddingTop:30
  },
  title: {
    color: '#333',
    fontSize: 20,
    textAlign:'center',
    marginBottom:20
  },

  inputField:{
    height:40,
    padding:5,
    color:'#666',
    backgroundColor:'#FFF',
    fontSize:14
  },
  btn:{
    padding:10,
    borderColor:'#ee735c',
    borderWidth:1,
    borderRadius:4,
    color:'#ee735c'
  }
});

import React, { Component } from 'react'
import {finalFName, finalLName, finalDOB, finalProductName, finalLotNumber, finalDate, finalCSite} from './CheckInputs';
import { StyleSheet, Text, View, Image,TextInput, SafeAreaView, StatusBar, Button, Alert, Platform, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
//import Share from 'react-native-share';

//Simple usage, defaults for all but the value

export default class ResultInputs extends Component {
   state = {
    text: finalFName + finalLName + finalDOB + finalProductName + finalLotNumber + finalDate + finalCSite
  };
   
   render() {
    //let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
    return (
      <View style={styles.container}>

        <QRCode
          value={JSON.stringify({QRcodevalues: this.state.text})} //{QRcodeValue}// {this.state.text}
          getRef={c => (this.svg = c)}
          size={350}
          bgColor='black'
          fgColor='white'
        />

        <TouchableOpacity onPress={this.saveQRCode}>
          <View style={styles.instructions}>
            <Text>Share QR code</Text>
          </View>
        </TouchableOpacity>

        <Text>{"First Name: " + finalFName}</Text>
        <Text>{"Last Name: " + finalLName}</Text>
        <Text>{"Date Of Birth: " + finalDOB}</Text>
        <Text>{"Product Name: " + finalProductName}</Text>
        <Text>{"Lot Number: " + finalLotNumber}</Text>
        <Text>{"Date: " + finalDate}</Text>
        <Text>{"Healthcare Professional or Clinical Site: " + finalCSite}</Text>
        <Text> {this.state.text} </Text>
      </View>
    );
  };
  saveQRCode = () => {
    this.svg.toDataURL(this.callback);
  };

  callback(dataURL) {
    console.log(dataURL);
    let shareImageBase64 = {
      title: 'MyVaccineTracker',
      url: `data:image/png;base64,${dataURL}`,
      subject: 'Share Link', //  for email
    };
    //Share.open(shareImageBase64).catch(error => console.log(error)); 
  } 
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center'
  }
})
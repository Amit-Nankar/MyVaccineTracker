import React, {useRef, useEffect, Component } from 'react';
import { Animated, StyleSheet, Text, View, Image, SafeAreaView, StatusBar, Button, Alert, Platform, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Tile } from 'react-native-elements';
import { Inputs, gFName, gLName, gDOB, gProductName, gLotNumber, gDate, gCSite} from './ManualInputs'
import {CamPic, base} from './ManualInputs';
import PlsScan from '../app/assets/PlsScan.png';
import Dash from 'react-native-dash';
import QRCode from 'react-native-qrcode-svg';
import ProgressCircle from 'react-native-progress-circle'
import {personInfo, doseInfo} from '../App'

import { Dimensions } from 'react-native';
import { doseNum } from './Feeling';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var get_dose_1 = false;
var get_dose_2 = false;

var firstScan = Image.resolveAssetSource(PlsScan).uri
var secondScan = Image.resolveAssetSource(PlsScan).uri

function ImageSeperator() {
  console.log("hi");
  if(CamPic !== Image.resolveAssetSource(PlsScan).uri) {
    if(firstScan === Image.resolveAssetSource(PlsScan).uri){
      firstScan = CamPic;
    }
    else if(firstScan !== CamPic && firstScan !== Image.resolveAssetSource(PlsScan).uri){
      secondScan = CamPic;
    }
  }
}

function Logo (props) {
  const prov = props.provider
  return(
    <View> 
      {prov === "Pfizer" && 
          <Image
            source={require('../app/assets/Screen06/Image-9.png')}
          />
      }
      {prov === 'Moderna' &&
        <Image
          source={require('../app/assets/Screen06/Image-11.png')}
        />
      }
      {(prov !== 'Moderna' && prov !== 'Pfizer') &&
        <Text>Select Provider</Text>
      }
    </View> 
  );
}

function getDoseNum (){
  var result = 0;
  if(get_dose_1){
    result = 1;
  }
  if(get_dose_2){
    result = 2;
  }
  return(result);
}

function Percentage (props) {
  const prov = props.provider;
  const doseNum = getDoseNum();
  return(
    <View>
      {prov === 'Pfizer' &&
        <View>

          {doseNum === 0 &&
            <ProgressCircle
              percent={0}
              radius={45}
              borderWidth={10}
              color="#3399FF"
              shadowColor="#e6e5e3"
              bgColor="#fff"
              >
              <Text style={{ fontSize: 18 }}>{'0%'}</Text>
            </ProgressCircle>
          }


          {doseNum === 1 &&
            <ProgressCircle
              percent={52}
              radius={45}
              borderWidth={10}
              color="#3399FF"
              shadowColor="#e6e5e3"
              bgColor="#fff"
              >
              <Text style={{ fontSize: 18 }}>{'52%'}</Text>
            </ProgressCircle>
          }


          {doseNum === 2 &&
            <ProgressCircle
              percent={95}
              radius={45}
              borderWidth={10}
              color="#3399FF"
              shadowColor="#e6e5e3"
              bgColor="#fff"
              >
              <Text style={{ fontSize: 18 }}>{'95%'}</Text>
            </ProgressCircle>
          }


        </View>
      }



      {prov === 'Moderna' &&
        <View>

          {doseNum === 0 &&
            <ProgressCircle
              percent={0}
              radius={45}
              borderWidth={10}
              color="#3399FF"
              shadowColor="#e6e5e3"
              bgColor="#fff"
              >
              <Text style={{ fontSize: 18 }}>{'0%'}</Text>
            </ProgressCircle>
          }


           {doseNum === 1 &&
              <ProgressCircle
                percent={52}
                radius={45}
                borderWidth={10}
                color="#3399FF"
                shadowColor="#e6e5e3"
                bgColor="#fff"
                >
                <Text style={{ fontSize: 18 }}>{'52%'}</Text>
              </ProgressCircle>
           }


           {doseNum === 2 &&
              <ProgressCircle
                percent={94.1}
                radius={45}
                borderWidth={10}
                color="#3399FF"
                shadowColor="#e6e5e3"
                bgColor="#fff"
                >
                <Text style={{ fontSize: 18 }}>{'94.1%'}</Text>
              </ProgressCircle>
           }


        </View>
      }



      {(prov !== 'Moderna' && prov !== 'Pfizer') &&
        <ProgressCircle
          percent={0}
          radius={45}
          borderWidth={10}
          color="#3399FF"
          shadowColor="#e6e5e3"
          bgColor="#fff"
          >
          <Text style={{ fontSize: 18 }}>{'0%'}</Text>
        </ProgressCircle>
      }
    </View>
  );
}

//GL
export class ImmunityPage extends Component{
    state={
      fname: '...',
      lname: '',
      dob: '...',
      comp: '...',
      lot1: '...',
      site1: '...',
      date1: '...',
      lot2: '...',
      site2: '...',
      date2: '...',
    }
    componentDidMount(){
        if(!(personInfo.firstName === null || personInfo.firstName === '...')){
          this.setState({fname: personInfo.firstName});
        }
        if(!(personInfo.lastName === null || personInfo.lastName === '')){
        this.setState({lname: personInfo.lastName});
        }
        if(!(personInfo.birthDate === null || personInfo.birthDate === '...')){
        this.setState({dob: personInfo.birthDate});
        }
        if(!(personInfo.provider === null || personInfo.provider === '...')){
        this.setState({comp: personInfo.provider});
        }
        if(!(doseInfo.dose1.facility === null || doseInfo.dose1.facility === '...' )){
        this.setState({lot1: doseInfo.dose1.batch});
        this.setState({date1: doseInfo.dose1.dateReceived});
        this.setState({site1: doseInfo.dose1.facility});
        get_dose_1 = true;
        }
        if(!(doseInfo.dose2.facility === null || doseInfo.dose2.facility === '...' )){
        this.setState({lot2: doseInfo.dose2.batch});
        this.setState({date2: doseInfo.dose2.dateReceived});
        this.setState({site2: doseInfo.dose2.facility});
        get_dose_2 = true;
        }
    }
    render(){
      ImageSeperator()
      return(
        <SafeAreaView>
            <View style={styles.rectangle1}>
                <View style={{flexDirection: 'row', padding: 5}}>
                  <View style={{flexDirection: 'row', flex: 1}}> 
                    <Image
                      source={require('../app/assets/Screen06/Image-10.png')}
                      />
                  </View>
                  <View styles={{flexDirection: 'row-reverse', flex: 1, justifyContent: 'space-around'}}>
                    <Logo provider={personInfo.provider}/>
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{paddingRight: 7}}>
                    <Image source={require('../app/assets/Screen04/immunity.png')} />
                  </View>
                  <View>
                    <Text style={{fontFamily: Platform.OS === 'android' ? 'normal' : null, fontWeight: 'bold', fontSize: 16}}>IMMUNITY RATE</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                  <View style={{flexDirection: 'column', justifyContent: 'space-around', padding: 5, flex: 1, alignItems: 'center'}}>  
                    <Percentage provider={personInfo.provider}/>
                    <Text>   </Text>
                    <Text style={{fontWeight: 'normal', color: this.state.date1 === '...' ? 'gray' : '#f0c013', fontSize: 11}}>Dosage 1:</Text>
                    <Text style={styles.TextLine} numberOfLines={1} ellipsizeMode='tail'>{this.state.date1}</Text>
                    <Text>   </Text>
                    <Text style={{fontWeight: 'normal', fontSize: 11, color: 'gray'}}>Batch Number 1:</Text>
                    <Text style={styles.TextLine} numberOfLines={1} ellipsizeMode='tail'>{this.state.lot1}</Text>
                  </View>
                  <View style={{flexDirection: 'column', justifyContent: 'space-around', paddingBottom: 5, flex: 1, alignItems: 'center'}}>
                    <Text style={{fontWeight: 'normal', fontSize: 11, color: 'gray'}}>Name:</Text>
                    <ScrollView horizontal={true} style={styles.TextLineScroll} showsHorizontalScrollIndicator={false}>
                      <Text multiline={true} numberOfLines={1} ellipsizeMode='tail'>{this.state.fname + " " + this.state.lname}</Text>
                    </ScrollView>
                    <Text>   </Text>
                    <Text style={{fontFamily: Platform.OS === 'android' ? 'normal' : null, fontWeight: 'normal', fontSize: 11, color: 'gray'}}>Date of Birth</Text>
                    <Text style={styles.TextLine} numberOfLines={1} ellipsizeMode='tail'>{this.state.dob}</Text>
                    <Text>   </Text>
                    <Text style={{fontWeight: 'normal', color: this.state.date2=== '...' ? 'gray' : '#f0c013', fontSize: 11}}>Dosage 2:</Text>
                    <Text style={styles.TextLine} numberOfLines={1} ellipsizeMode='tail'>{this.state.date2}</Text>
                    <Text>   </Text>
                    <Text style={{fontWeight: 'normal', fontSize: 11, color: 'gray'}}>Batch Number 2:</Text>
                    <Text style={styles.TextLine} numberOfLines={1} ellipsizeMode='tail'>{this.state.lot2}</Text>
                  </View>
                </View>
                <View style={{flex: 1}}>
                  <Text>   </Text>
                </View>
            </View>
            <Dash style={{alignSelf: 'center', width: windowWidth*0.77, height: 2}}/>
            <View style={styles.rectangle2}>
              <View style={{padding: 15}}>
                <QRCode
                  value={JSON.stringify({First_Name: this.state.fname, Last_Name: this.state.lname, DOB: this.state.dob,  Provider: this.state.comp})}
                  getRef={c => (this.svg = c)}
                  size={windowWidth*0.5}
                  bgColor='black'
                  fgColor='white'
                />
              </View>
            </View>

            {/* Image 1*/}
            <View style ={{borderRadius: 15}}>
              {firstScan === Image.resolveAssetSource(PlsScan).uri &&
                <Image
                    source = {require("../app/assets/NoImageScanned.png")}
                    style = {{
                      width: windowWidth*0.85,
                      height: windowHeight*0.4,
                      //backgroundColor: '#1465fb',
                      borderRadius: 15,
                      alignItems: 'center',
                      alignSelf: 'center',
                      resizeMode: 'contain'
                      }}

                    imageStyle={{ borderRadius: 15}}
                />
              }
 
              {firstScan !== Image.resolveAssetSource(PlsScan).uri &&
                <Image
                    source = {{uri: firstScan}}
                    style = {{
                      marginTop: 25,
                      width: windowWidth*0.85,
                      height: windowHeight*0.4,
                      //backgroundColor: '#1465fb',
                      borderRadius: 15,
                      alignItems: 'center',
                      alignSelf: 'center',
                      resizeMode: 'contain'
                      }}

                    imageStyle={{ borderRadius: 15}}
                />
              }
            </View>
            
            {/* Image 2*/}  
            <View style ={{borderRadius: 15}}>
              {secondScan === Image.resolveAssetSource(PlsScan).uri &&
                <Image
                    source = {require("../app/assets/NoImageScanned.png")}
                    style = {{
                      width: windowWidth*0.85,
                      height: windowHeight*0.4,
                      //backgroundColor: '#1465fb',
                      borderRadius: 15,
                      alignItems: 'center',
                      alignSelf: 'center',
                      resizeMode: 'contain'
                      }}

                    imageStyle={{ borderRadius: 15}}
                />
              }
                    
              {secondScan !== Image.resolveAssetSource(PlsScan).uri &&
                <Image
                    source = {{uri: secondScan}}
                    style = {{
                      marginTop: 25,
                      width: windowWidth*0.85,
                      height: windowHeight*0.4,
                      //backgroundColor: '#1465fb',
                      borderRadius: 15,
                      alignItems: 'center',
                      alignSelf: 'center',
                      resizeMode: 'contain'
                      }}

                    imageStyle={{ borderRadius: 15}}
                />
              }
            </View>
          </SafeAreaView>
        );
    }
}



const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'white',
    //alignItems: 'center',
    //justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight/100 : 0, /*add padding to only android and the 
    iOS is set to 0 so that it can use SafeAreaView which is not available on android*/
  },
  homeButtonFormat: {
    flex: 1,
    backgroundColor: 'white',
    //alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight/100 : 0, /*add padding to only android and the 
    iOS is set to 0 so that it can use SafeAreaView which is not available on android*/
    paddingBottom: 50
  },
  banner: {
    flex: 1,
    color: 'black',
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#85B8E3',
    padding: 10,
    borderRadius: 15,
    margin: 5,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerCamera: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttonCamera: {
    backgroundColor: '#85B8E3',
    padding: 10,
    borderRadius: 15,
    margin: 5,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textCamera: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  generalProperties: {
    justifyContent: "space-around",
    alignItems: 'center',
    flex:1
  },
  rectangle1:{
    backgroundColor: 'white', 
    flex:1, 
    width: windowWidth*0.85, 
    alignSelf: 'center', 
    borderRadius: 15,
    padding: 10,
    elevation: Platform.OS === 'android' ? 25 : 0,
    shadowOffset:{
      width: Platform.OS === 'ios' ? 25 : 0,
      height: Platform.OS === 'ios' ? 25 : 0
    },
    flexDirection: 'column'
  },
  rectangle2:{
    backgroundColor: 'white', 
    flexGrow:1, 
    width: windowWidth*0.85, 
    alignSelf: 'center', 
    borderRadius: 15,
    padding: 10,
    elevation: Platform.OS === 'android' ? 25 : 0,
    shadowOffset:{
      width: Platform.OS === 'ios' ? 25 : 0,
      height: Platform.OS === 'ios' ? 25 : 0
    },
    alignItems: 'center',
    justifyContent: 'center'
  },
  TextLine:{
    fontSize: 13
  },
  TextLineScroll:{
    borderBottomColor: 'white', 
    borderWidth: 0.55, 
    borderTopColor: 'white', 
    borderRightColor: 'white', 
    borderLeftColor: 'white',
    fontSize: 13
  }
});

export default ImmunityPage;
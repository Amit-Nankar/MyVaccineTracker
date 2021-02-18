import React, {useRef, useEffect, Component } from 'react';
import { ScrollView, Animated, StyleSheet, Text, View, Image, SafeAreaView, StatusBar, Button, Alert, Platform, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, Pressable } from 'react-native';
import { Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';


import ProgressCircle from 'react-native-progress-circle'

import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {personInfo, doseInfo, retrieveBaseInfo} from '../App';

function alertHome () {
  Alert.alert("Please scan your immunity card before entering this tab")
}

function getDoseNum (){
    var result = 0;
    console.log(personInfo.get_dose_2);
    if(personInfo.get_dose_1){
      result = 1;
    }
    if(personInfo.get_dose_2){
      result = 2;
    }
    return(result);
  }
  
function Percentage (props) {
  const prov = props.provider;
  const focused = useIsFocused();
  var doseNum = getDoseNum();
  if(!focused){
    retrieveBaseInfo();
    doseNum = getDoseNum();
  }
  else{
    return(
      <View>
        {prov === 'Pfizer' &&
          <View style ={{paddingLeft: 50}}>

            {doseNum === 0 &&
              <ProgressCircle
                percent={0}
                radius={55}
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
                radius={55}
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
                radius={55}
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
          <View style ={{paddingLeft: 27}}>

            {doseNum === 0 &&
              <ProgressCircle
                percent={0}
                radius={55}
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
                  radius={55}
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
                  radius={55}
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
            radius={55}
            borderWidth={7}
            color="#3399FF"
            shadowColor="#e6e5e3"
            bgColor="#fff"
            >
            <Text style={{ fontSize: 18 }}>{'0%'}</Text>
          </ProgressCircle>
        }
      </View>
    )
  }
}

export function Circ(){
    const isfocused = useIsFocused();
    const navigation = useNavigation();
    if(!isfocused){
      return null;
    }
    else{
        return(
          <SafeAreaView style={{backgroundColor: '#a8e38d', flex: 1}}>
          <Pressable onPress={()=> (doseInfo.dose1.dateReceived && navigation.navigate('Results')) || (!doseInfo.dose1.dateReceived && alertHome())} style={[styles.rectangle, {borderBottomColor: 'white', flexDirection: 'row', padding: 0}]}>
              <View style={{flexDirection: 'column', paddingTop: 27, flex: 1, alignItems: 'center'}}>
                <View style={{flexDirection: 'row-reverse', justifyContent: 'center'}}>
                  <Image source={require('../app/assets/Screen04/immunity.png')}  resizeMode='center' style={{paddingRight: 15}}/>
                </View>
              </View>   
              <View style={{flexDirection: 'column', paddingTop: 20, flex: 3.5}}>
                  <View>
                    <Text style={{fontWeight: 'bold', fontSize: 24}}>IMMUNITY</Text>
                  </View>
                  <Text style={{color: 'gray', marginTop: 10, marginBottom: 10}}>Check your status here</Text>
                  <View style={{marginTop: 10}}>
                    {personInfo.get_dose_1 === false && personInfo.get_dose_2 === false &&
                      <Image source={require('../app/assets/Screen04/notvaccinated.png')}/>
                    }
                    {personInfo.get_dose_1 === true &&
                      <Image source={require('../app/assets/Screen04/notvaccinated.png')}/>
                    }
                  </View> 
                    <View style={{justifyContent: 'flex-end',marginTop: windowHeight/22}}>
                      {personInfo.get_dose_1 === true &&
                        <View style={{paddingTop: 10, flexDirection: 'row'}}>
                          <Image source={require('../app/assets/Screen06/Image-10.png')} style={{marginRight: 10}}/>
                          {personInfo.provider === 'Pfizer' &&
                            <Image source={require('../app/assets/Screen06/Image-9.png')} style={{marginLeft: 10}}/>
                          }
                          {personInfo.provider === 'Moderna' &&
                            <Image source={require('../app/assets/Screen06/Image-11.png')} style={{marginLeft: 10}}/>
                          }
                        </View> 
                      }
                    </View>
              </View>
              <View style={{flex: 2.5, alignContent: 'center', justifyContent: 'center', paddingBottom: 10, paddingLeft: 10}}>
                <Percentage provider={personInfo.provider}/>
              </View>
              <View style={{flexDirection: 'column-reverse', width: windowWidth*0.9, flex: 1.5}}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Icon 
                  name="arrow-forward-outline"
                  reverse
                  color='#1053fb'
                  size={26}
                  style={{padding: 13}}
                  />
                </View>
              </View>
          </Pressable>
    
          <Pressable onPress={()=>navigation.navigate('Input Data')} style={[styles.rectangle, {borderBottomColor: 'white', flexDirection: 'row', padding: 0}]}>
              <View style={{flexDirection: 'column', paddingTop: 28, flex: 1, alignItems: 'center'}}>
                <View style={{flexDirection: 'row-reverse', justifyContent: 'center'}}>
                  <Image source={require('../app/assets/Screen04/Scan.png')}  resizeMode='center' style={{paddingRight: 15}}/>
                </View>
              </View>   
              <View style={{flexDirection: 'column', paddingTop: 20, flex: 6}}>
                  <View>
                    <Text style={{fontWeight: 'bold', fontSize: 24}}>SCAN/RESCAN</Text>
                  </View>
                  <Text style={{color: 'gray', marginTop: 10}}>Please update your</Text>
                  <Text style={{color: 'gray'}}>latest copy here</Text>
              </View>
              <View style={{flexDirection: 'column-reverse', width: windowWidth*0.9, flex: 1.5}}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Icon 
                  name="arrow-forward-outline"
                  reverse
                  color='#1053fb'
                  size={26}
                  style={{padding: 13}}
                  />
                </View>
              </View>
          </Pressable>
            
          <Pressable onPress={()=> (doseInfo.dose1.dateReceived && navigation.navigate('Symptoms')) || (!doseInfo.dose1.dateReceived && alertHome())} style={[styles.rectangle, {borderBottomColor: 'white', flexDirection: 'row', padding: 0}]}>
              <View style={{flexDirection: 'column', paddingTop: 27, flex: 1, alignItems: 'center'}}>
                <View style={{flexDirection: 'row-reverse', justifyContent: 'center'}}>
                  <Image source={require('../app/assets/Screen04/Side-effects.png')}  resizeMode='center' style={{paddingRight: 15}}/>
                </View>
              </View>   
              <View style={{flexDirection: 'column', paddingTop: 20, flex: 6}}>
                  <View>
                    <Text style={{fontWeight: 'bold', fontSize: 24}}>ADD/VIEW</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 24}}>SIDE EFFECTS</Text>
                  </View>
                  <Text style={{color: 'gray', marginTop: 10}}>Add your side effects here</Text>
              </View>
              <View style={{flexDirection: 'column-reverse', width: windowWidth*0.9, flex: 1.5}}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Icon 
                  name="arrow-forward-outline"
                  reverse
                  color='#1053fb'
                  size={26}
                  style={{padding: 13}}
                  />
                </View>
              </View>
          </Pressable>
        </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight/100 : 0
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
    fontWeight: 'normal',
    fontFamily: Platform.OS === 'android' ? 'normal' : null
  },
  generalProperties: {
    alignItems: 'center'
  },
  rectangle:{
    backgroundColor: 'white', 
    flex:1,
    borderBottomColor: 'black',
    borderTopColor: 'black',
    borderWidth: 1,
    flexDirection: 'row'
  },

});

export default Circ;
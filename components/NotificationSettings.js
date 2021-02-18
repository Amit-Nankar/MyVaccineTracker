import React, { Component } from 'react'
import { KeyboardAwareScrollView, SafeAreaView, View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, KeyboardAvoidingView, Image, Dimensions, ImageBackground } from 'react-native'
import { gDate} from './ManualInputs';
import DropDownPicker from 'react-native-dropdown-picker';
import { dayNum } from './Feeling';
import {storeInfo} from '../App'

export var notifDate = '15';
export var lastDate = '2';
var userPref = 2;
var currentDate = new Date();
var numDate = 0;
var gProductName = 'Pfizier';
//console.log(currentDate);
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const dateCalc = () => {
    //Selects the amount of time between first and second dose by Product
    if(gProductName === 'Pfizier') {
        numDate = 21;
    }
    else if(gProductName === 'Moderna'){
        numDate = 28;
    }
    else{
        numDate = 0;
    }
    notifDate = currentDate - gDate - userPref
    currentDate.setDate(currentDate.getDate() + numDate - userPref);
    //console.log(gProductName);
    //console.log(currentDate);
    lastDate = currentDate;
    storeInfo("lastDate", lastDate)
    console.log(lastDate);
}

export default function NotifSettings () {
    
    handleUserPref = (item) => {
        userPref = item
    } 

    return (
            <View style ={styles.rectangle1}>
            <Text>How many days before would you like the notification</Text>
            <DropDownPicker
                items={[
                    {label: '1 Day', value: '1'},
                    {label: '2 Days', value: '2'},
                    {label: '3 Days', value: '3'},
                    {label: '4 Days', value: '4'},
                    {label: '5 Days', value: '5'},
                    {label: '6 Days', value: '6'},
                    {label: '7 Days', value: '7'},
                ]}
                //defaultValue={this.state.country}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => handleUserPref(item.value)}
            />
            <View>
            <TouchableOpacity onPress={() => dateCalc()} style={styles.buttonCamera}>
                <Text style={styles.textCamera}>Submit</Text>
            </TouchableOpacity>
            </View>
        </View>
         )
    }

const styles = StyleSheet.create({
    DPcontainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        //alignItems: 'center',
        flexDirection: 'row'
      },
      DPtitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
        height: 30,

      },
      DropDowninput: {
        margin: 30,
        height: 50,
        borderColor: 'black',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        width: windowWidth*0.725,
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        justifyContent: 'center'
     },
     DropDownsettings: {
        margin: 30,
        borderColor: 'black',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        width: windowWidth*0.725,
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: 10,
     },
     rectangle1:{
        backgroundColor: 'white', 
        flex:1, 
        width: windowWidth*0.85, 
        alignSelf: 'center', 
        borderRadius: 15,
        padding: 10,
        elevation: 25,
        flexDirection: 'column',
        marginTop: 20,
        marginBottom: 20
      },
      buttonCamera: {
        backgroundColor: '#85B8E3',
        padding: 10,
        borderRadius: 15,
        margin: 5,
        width: windowWidth*0.78,
        justifyContent: 'center',
        alignItems: 'center'
      },
      textCamera: {
        color: '#ffffff',
        fontWeight: 'normal',
        fontFamily: Platform.OS === 'android' ? 'normal' : null
      },
})

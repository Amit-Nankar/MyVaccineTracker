import React, { Component, createRef, useRef, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dimensions, View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, KeyboardAvoidingView, Button, Modal, Linking } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import Slider from 'react-native-slider';
import { sympStore, modalCount, storeInfo, doseInfo, personInfo } from '../App'
import Icon from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns';
import { LogBox } from 'react-native';
import { SafeAreaView } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export var armPain = "";
export var armSwell = "";
export var fever = "";
export var chills = "";
export var fatigue = "";
export var headache = "";
export var doseNum;
export var dayNum;
var date;
var formatDate;
var maxDose;

class Effects extends Component{
    constructor(props) {
        super(props);
        this.state={
            mAPain: 0,
            mASwel: 0,
            mFever: 0,
            mChill: 0,
            mFatig: 0,
            mHeada: 0,
            mModal: false
        }
        date = new Date(doseInfo.dose1.dateReceived);
        this.dateFormatter();
        doseNum = "Dose1";
        dayNum = "Day0";
    }

    componentDidMount(){
        this.setState(sympStore.dose1.day0);
        this.setState({mModal: (modalCount === 1) ? true: false})
    }

    componentWillUnmount() {
        storeInfo('symptoms', sympStore);
    }

    componentDidUpdate() {
        saveChanges(this.state);
    }

    setmAPain = (scale) => {
        this.setState({mAPain: scale})
        armPain = this.state.mAPain;
    }

    setmASwell = (scale) => {
        this.setState({mASwel: scale})
        armSwell = this.state.mASwel;
    }

    setmFever = (scale) => {
        this.setState({mFever: scale})
        fever = this.state.mFever;
    }
    
    setmChill = (scale) => {
        this.setState({mChill: scale})
        chills = this.state.mChill;
    }
    
    setmFatig = (scale) => {
        this.setState({mFatig: scale})
        fatigue = this.state.mFatig;
    }
    
    setmHeada = (scale) => {
        this.setState({mHeada: scale})
        headache = this.state.mHeada;
    }

    dateChange = (dose, day) => {
        newState = newDate(dose, day);
        // console.log(newState);
        this.setState(newState)
        doseNum = dose;
        dayNum = day;
    }

    setmModal = (scale) => {
        this.setState({mModal: scale})
    }

    setDate = (scale) => {
        date = scale;
        this.dateFormatter()
    }

    onArrowChange = (value) => {
        var tempArr = changeDate(value)
        if (tempArr) {
            this.dateChange(tempArr[0], tempArr[1])
            this.setDate(tempArr[2])
        }
    }

    dateFormatter = () => {
        formatDate = format(date, 'MM/dd/yyyy')
    }


    render(){
        return(
            <ScrollView contentContainerStyle ={{justifyContent: 'space-around', flexGrow: 1, width: windowWidth}}>
                <SafeAreaView>
                    <Modal visible={this.state.mModal}>
                        <View style = {{backgroundColor:'#000000aa', flex: 1}}>
                            <View style = {{backgroundColor:'#ffffff', flex: 1, borderRadius: 10}}>
                                <Text style={{fontSize:40}}>Modal Text</Text>
                                <Button title= 'OK' onPress={() => { this.setmModal(false) }}></Button>
                            </View>
                        </View>
                    </Modal>
                </SafeAreaView>
                <View style = {{padding: 23}}>
                    <Text style={{textAlign: 'center', fontStyle: 'italic', fontSize: 16}}>Please rate the severity of your symptoms from a scale of 1-10</Text>
                    <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <View>
                            <Icon 
                                name="chevron-back-outline"
                                color = "black"
                                size = {36}
                                onPress = {() => this.onArrowChange("-")}
                            />
                        </View>
                        <View>
                            <Text style = {{fontSize: 15}}>{formatDate}</Text>
                        </View>
                        <View>
                            <Icon 
                                name="chevron-forward-outline"
                                color = "black"
                                size = {36}
                                onPress = {() => this.onArrowChange("+")}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <View style = {[styles.SliderContainer, {paddingTop: windowHeight*0.04}]}>
                            <Text style = {[styles.text, {flex: 2.5}]}>{'Arm Pain     '}</Text>
                            <Slider
                                style={styles.SliderStyle}
                                trackStyle={styles.SliderStyle}
                                thumbTouchSize={{width: windowWidth*0.1, height: windowWidth*0.1}}
                                animateTransitions={true}
                                value = {this.state.mAPain}
                                minimumValue={0}
                                maximumValue={10}
                                step = {1}
                                minimumTrackTintColor='#f4c92d'
                                maximumTrackTintColor='#c9c9c9'  
                                thumbTintColor= '#20bfec'
                                onValueChange = {this.setmAPain}
                                onSlidingComplete = {this.setmAPain}/> 
                            <Text style = {[styles.text, {flex: 0.5, paddingLeft: windowWidth*0.03}]}>{this.state.mAPain}</Text>
                        </View>
                        

                        <View style = {styles.SliderContainer}>
                            <Text style = {[styles.text, {flex: 2.5}]}>{'Arm Swelling     '}</Text>
                            <Slider
                                style={styles.SliderStyle}
                                trackStyle={styles.SliderStyle}
                                thumbTouchSize={{width: windowWidth*0.1, height: windowWidth*0.1}}
                                value = {this.state.mASwel}
                                minimumValue={0}
                                maximumValue={10}
                                step = {1}
                                minimumTrackTintColor='#f4c92d'
                                maximumTrackTintColor='#c9c9c9'  
                                thumbTintColor= '#20bfec'
                                onValueChange = {this.setmASwell}
                                onSlidingComplete = {this.setmASwell}/> 
                            <Text style = {[styles.text, {flex: 0.5, paddingLeft: windowWidth*0.03}]}>{this.state.mASwel}</Text>
                        </View>
                        
                        <View style = {styles.SliderContainer}>
                            <Text style = {[styles.text, {flex: 2.5}]}>{'Fever     '}</Text>
                            <Slider
                                style={styles.SliderStyle}
                                trackStyle={styles.SliderStyle}
                                thumbTouchSize={{width: windowWidth*0.1, height: windowWidth*0.1}}
                                value = {this.state.mFever}
                                minimumValue={0}
                                maximumValue={10}
                                step = {1}
                                minimumTrackTintColor='#f4c92d'
                                maximumTrackTintColor='#c9c9c9'  
                                thumbTintColor= '#20bfec'
                                onValueChange = {this.setmFever}
                                onSlidingComplete = {this.setmFever}/> 
                            <Text style = {[styles.text, {flex: 0.5, paddingLeft: windowWidth*0.03}]}>{this.state.mFever}</Text>
                        </View>
                        
                        <View style = {styles.SliderContainer}>
                            <Text style = {[styles.text, {flex: 2.5}]}>{'Chills     '}</Text>                    
                            <Slider
                                style={styles.SliderStyle}
                                trackStyle={styles.SliderStyle}
                                thumbTouchSize={{width: windowWidth*0.1, height: windowWidth*0.1}}
                                value = {this.state.mChill}
                                minimumValue={0}
                                maximumValue={10}
                                step = {1}
                                minimumTrackTintColor='#f4c92d'
                                maximumTrackTintColor='#c9c9c9'  
                                thumbTintColor= '#20bfec'
                                onValueChange = {this.setmChill}
                                onSlidingComplete = {this.setmChill}/> 
                            <Text style = {[styles.text, {flex: 0.5, paddingLeft: windowWidth*0.03}]}>{this.state.mChill}</Text>  
                        </View>

                        <View style = {styles.SliderContainer}>
                            <Text style = {[styles.text, {flex: 2.5}]}>{'Fatigue     '}</Text>                
                            <Slider
                                style={styles.SliderStyle}
                                trackStyle={styles.SliderStyle}
                                thumbTouchSize={{width: windowWidth*0.1, height: windowWidth*0.1}}
                                value = {this.state.mFatig}
                                minimumValue={0}
                                maximumValue={10}
                                step = {1}
                                minimumTrackTintColor='#f4c92d'
                                maximumTrackTintColor='#c9c9c9'  
                                thumbTintColor= '#20bfec'
                                onValueChange = {this.setmFatig}
                                onSlidingComplete = {this.setmFatig}/> 
                            <Text style = {[styles.text, {flex: 0.5, paddingLeft: windowWidth*0.03}]}>{this.state.mFatig}</Text> 
                        </View>
                        

                        <View style = {styles.SliderContainer}>
                            <Text style = {[styles.text, {flex: 2.5}]}>{'Headache     '}</Text>                
                            <Slider
                                style={styles.SliderStyle}
                                trackStyle={styles.SliderStyle}
                                thumbTouchSize={{width: windowWidth*0.1, height: windowWidth*0.1}}
                                value = {this.state.mHeada}
                                minimumValue={0}
                                maximumValue={10}
                                step = {1}
                                minimumTrackTintColor='#f4c92d'
                                maximumTrackTintColor='#c9c9c9'  
                                thumbTintColor= '#20bfec'
                                onValueChange = {this.setmHeada}
                                onSlidingComplete = {this.setmHeada}/> 
                            <Text style = {[styles.text, {flex: 0.5, paddingLeft: windowWidth*0.03}]}>{this.state.mHeada}</Text> 
                        </View>
                    </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: windowHeight*0.04}}>
                            <Button
                                title='Email Data As CSV'
                                onPress={() => {csvGen()}}
                            />
                        </View>
                </View>
            </ScrollView>
        )
    }
}
export default Effects;

// const displayDate = (date) => {

// }

function changeDate (direction) {
    // dose2Ref = useRef(null);
    var i;
    var j;
    var temp;
    console.log(doseInfo.dose2.facility);
    if (!doseInfo.dose2.facility) {
        maxDose = 1;
    } else {
        maxDose = 2;
    }
    var dose1Date = new Date(doseInfo.dose1.dateReceived);
    var dose2Date = new Date (doseInfo.dose2.dateReceived);
    console.log(dose2Date);
    var oldDate = new Date(date)

    temp = dayNum.replace('Day', "");
    i = Number(temp)
    temp = doseNum.replace('Dose', "");
    j = Number(temp)
    if (direction === '+') {
        i++;
        oldDate.setDate(oldDate.getDate() + 1) 
        if (i > 2) {
            j++;
            i = 0;
            oldDate = dose2Date
            if(!dose2Date) {
                return null
            }
        }
    } else {
        i--;
        oldDate.setDate(oldDate.getDate() - 1)
        if (i < 0) {
            j--;
            oldDate = dose1Date
            oldDate.setDate(oldDate.getDate() + 2)
            i = 2;  
        }
    }
    if ((j > maxDose) || (j <= 0)) {
        return null
    } else {
        i = i.toString();
        j = j.toString()
        var newDose = ('Dose' + j);
        var newDay = ('Day' +   i);
        return ([newDose, newDay, oldDate])
    }
}

const saveChanges = (nvalues) => {
    values = JSON.parse(JSON.stringify(nvalues));
    delete values.mModal;
    // console.log(values);
    if (doseNum === 'Dose1') {
        if (dayNum === 'Day0') {
            sympStore.dose1.day0 = values;
            // console.log('saved d1 d0');
        } else if (dayNum === 'Day1') {
            sympStore.dose1.day1 = values;
            // console.log('saved d1 d1');
        } else {
            sympStore.dose1.day2 = values;
            // console.log('saved d1 d2');
        }
    } else {
        if (dayNum === 'Day0') {
            sympStore.dose2.day0 = values;
            // console.log('saved d2 d0');
        } else if (dayNum === 'Day1') {
            sympStore.dose2.day1 = values;
            // console.log('saved d2 d1');
        } else {
            sympStore.dose2.day2 = values;
            // console.log('saved d2 d2');
        }
    }
    
}

const newDate = (nDose, nDay) => {
    if (nDose === 'Dose1') {
        if (nDay === 'Day0') {
            console.log('retrieved d1 d0');
            return (sympStore.dose1.day0);
        } else if (nDay === 'Day1') {
            console.log('retrieved d1 d1');
            return (sympStore.dose1.day1);
        } else {
            console.log('retrieved d1 d2');
            return (sympStore.dose1.day2);
        }
    } else {
        if (nDay === 'Day0') {
            console.log('retrieved d2 d0');
            return (sympStore.dose2.day0);
        } else if (nDay === 'Day1') {
            console.log('retrieved d2 d1');
            return (sympStore.dose2.day1);
        } else {
            console.log('retrieved d2 d2');
            return (sympStore.dose2.day2);
        }
    }
}

export const csvGen = () => {
    // var sympArr = [
    //     [
    //     'Dose', 'Day', 'Arm Pain', 'Arm Swelling', 'Fever', 'Chills', 'Fatigue', 'Headache'
    //     ],
    //     [
    //     '1', '0', sympStore.dose1.day0.mAPain, sympStore.dose1.day0.mASwel, sympStore.dose1.day0.mFever,
    //      sympStore.dose1.day0.mChill, sympStore.dose1.day0.mFatig, sympStore.dose1.day0.mHeada
    //     ],
    //     [
    //       '1', '1', sympStore.dose1.day1.mAPain, sympStore.dose1.day1.mASwel, sympStore.dose1.day1.mFever,
    //        sympStore.dose1.day1.mChill, sympStore.dose1.day1.mFatig, sympStore.dose1.day1.mHeada
    //     ],
    //     [
    //       '1', '2', sympStore.dose1.day2.mAPain, sympStore.dose1.day2.mASwel, sympStore.dose1.day2.mFever,
    //        sympStore.dose1.day2.mChill, sympStore.dose1.day2.mFatig, sympStore.dose1.day2.mHeada
    //     ],
    //     [
    //       '2', '0', sympStore.dose2.day0.mAPain, sympStore.dose2.day0.mASwel, sympStore.dose2.day0.mFever,
    //        sympStore.dose2.day0.mChill, sympStore.dose2.day0.mFatig, sympStore.dose2.day0.mHeada
    //     ],
    //     [
    //       '2', '1', sympStore.dose2.day1.mAPain, sympStore.dose2.day1.mASwel, sympStore.dose2.day1.mFever,
    //        sympStore.dose2.day1.mChill, sympStore.dose2.day1.mFatig, sympStore.dose2.day1.mHeada
    //     ],
    //     [
    //       '2', '2', sympStore.dose2.day2.mAPain, sympStore.dose2.day2.mASwel, sympStore.dose2.day2.mFever,
    //        sympStore.dose2.day2.mChill, sympStore.dose2.day2.mFatig, sympStore.dose2.day2.mHeada
    //     ]
    // ]
    // var i;
    // var str1='';
    // var tempArr = [];

    // for (i = 0; i < 7; i++) {
    //     str1 = sympArr[i].join();
    //     tempArr.push(str1)
    // }
    // var csvStr = tempArr.join('\n');

    var i;
    var j;
    var sympString;
    var displayDate = new Date(doseInfo.dose1.dateReceived)
    var sympExport = JSON.parse(JSON.stringify(sympStore))

    for (doses in sympExport) {
        for (days in sympExport[doses]) {
            for (symp in sympExport[doses][days]) {
                if (sympExport[doses][days][symp] === 0) {
                    sympExport[doses][days][symp] = 'None'
                }
            }
        }
    }

    sympString = "Hello,\n\n" + personInfo.firstName + " " + personInfo.lastName + 
                ' would like to share their "MyVaccineTracker Side Effects Report" with you.\n\n' + 
                'Patient Name: ' + personInfo.firstName + " " +personInfo.lastName + "\n" +
                'Patient Vaccine Provider: ' + personInfo.provider + '\n\n'

    sympString += (
        format(displayDate, 'MM/dd/yyyy') + ':' +
        '\n      Arm Pain: ' + sympExport.dose1.day0.mAPain +
        '\n      Arm Swelling: ' + sympExport.dose1.day0.mASwel +
        '\n      Fever: ' + sympExport.dose1.day0.mFever +
        '\n      Chills: ' + sympExport.dose1.day0.mChill +
        '\n      Fatigue: ' + sympExport.dose1.day0.mFatig +
        '\n      Headache: ' + sympExport.dose1.day0.mHeada +
        '\n' + format(displayDate.setDate(displayDate.getDate() + 1),  'MM/dd/yyyy') + ':' +
        '\n      Arm Pain: ' + sympExport.dose1.day1.mAPain +
        '\n      Arm Swelling: ' + sympExport.dose1.day1.mASwel +
        '\n      Fever: ' + sympExport.dose1.day1.mFever +
        '\n      Chills: ' + sympExport.dose1.day1.mChill +
        '\n      Fatigue: ' + sympExport.dose1.day1.mFatig +
        '\n      Headache: ' + sympExport.dose1.day1.mHeada +
        '\n' + format(displayDate.setDate(displayDate.getDate() + 1),  'MM/dd/yyyy') + ':' +
        '\n      Arm Pain: ' + sympExport.dose1.day2.mAPain +
        '\n      Arm Swelling: ' + sympExport.dose1.day2.mASwel +
        '\n      Fever: ' + sympExport.dose1.day2.mFever +
        '\n      Chills: ' + sympExport.dose1.day2.mChill +
        '\n      Fatigue: ' + sympExport.dose1.day2.mFatig +
        '\n      Headache: ' + sympExport.dose1.day2.mHeada
    )

    if (doseInfo.dose2.dateReceived) {
        displayDate = new Date(doseInfo.dose2.dateReceived)
        sympString += (
            '\n' + format(displayDate, 'MM/dd/yyyy') + ':' +
            '\n      Arm Pain: ' + sympExport.dose1.day0.mAPain +
            '\n      Arm Swelling: ' + sympExport.dose1.day0.mASwel +
            '\n      Fever: ' + sympExport.dose1.day0.mFever +
            '\n      Chills: ' + sympExport.dose1.day0.mChill +
            '\n      Fatigue: ' + sympExport.dose1.day0.mFatig +
            '\n      Headache: ' + sympExport.dose1.day0.mHeada +
            '\n' + format(displayDate.setDate(displayDate.getDate() + 1),  'MM/dd/yyyy') + ':' +
            '\n      Arm Pain: ' + sympExport.dose1.day1.mAPain +
            '\n      Arm Swelling: ' + sympExport.dose1.day1.mASwel +
            '\n      Fever: ' + sympExport.dose1.day1.mFever +
            '\n      Chills: ' + sympExport.dose1.day1.mChill +
            '\n      Fatigue: ' + sympExport.dose1.day1.mFatig +
            '\n      Headache: ' + sympExport.dose1.day1.mHeada +
            '\n' + format(displayDate.setDate(displayDate.getDate() + 1),  'MM/dd/yyyy') + ':' +
            '\n      Arm Pain: ' + sympExport.dose1.day2.mAPain +
            '\n      Arm Swelling: ' + sympExport.dose1.day2.mASwel +
            '\n      Fever: ' + sympExport.dose1.day2.mFever +
            '\n      Chills: ' + sympExport.dose1.day2.mChill +
            '\n      Fatigue: ' + sympExport.dose1.day2.mFatig +
            '\n      Headache: ' + sympExport.dose1.day2.mHeada
        )
    }


    Linking.openURL('mailto:%20?body=' + sympString + ',&subject=' + personInfo.firstName + ' ' + personInfo.lastName + 
                    ' would like to share their "MyVaccineTracker Side Effects Report" with you.')
}

const styles = StyleSheet.create({
    container: {
       paddingTop: 23,
       //alignItems: 'center'
    },
    text:{
        alignItems: 'center',
        justifyContent: 'center',
        //position: 'absolute'
        flexDirection: "row",
        fontSize: 16
    },
    input: {
       margin: 15,
       height: 40,
       borderColor: 'black',
       borderWidth: 1,
    },
    submitButton: {
       backgroundColor: '#85B8E3',
       padding: 10,
       borderRadius: 15,
       margin: 5,
       width: 350,
       alignItems: 'center'
    },
    // submitButtonAllign: {
    //  alignItems: 'center'
    // },
    submitButtonText:{
       color: 'white',
       fontWeight: 'normal',
       fontFamily: 'normal'
    },
    DropDowninput: {
        margin: 30,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
    },
    SliderStyle:{
        height: windowHeight*0.008, 
        flex: 5,
        borderRadius: 5,
    },
    SliderContainer:{
        alignItems: 'center',
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        paddingTop: windowHeight*0.08,
    }
 })
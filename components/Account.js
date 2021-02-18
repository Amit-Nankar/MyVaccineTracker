import React, { Component, useState } from 'react'
import DatePicker from 'react-native-datepicker';

import {ImageBackground, SafeAreaView, View, Text, TextInput, StyleSheet, Dimensions} from 'react-native'

export var aFName = "...";
export var aLName = "";
export var aDOB = "...";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DOBPickerInput = () => {
   const [dropDOB, setDate] = useState('12/26/2020');
 
   return (
     <SafeAreaView style={styles.DPcontainer}>
       {/* <View style = {styles.DPcontainer}> */}
         {/* <View style = {styles.row}> */}
            <View style = {styles.inputWrap}>
                <Text>  Date of Birth: </Text>
                <DatePicker
                style={styles.datePickerStyle}
                date={dropDOB} // Initial date from state
                mode="date" // The enum of date, datetime and time
                placeholder="select date"
                format="MM/DD/YYYY"
                minDate="01/02/1903"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    display: 'none',
                },
                dateInput: {
                    marginLeft: 36,
                },
                }}
                onDateChange={(dropDOB) => {
                setDate(dropDOB);
                gDOB = dropDOB
                }}
                />
            </View>
         {/* </View> */}
       {/* </View> */}
     </SafeAreaView>
   );
 };

class AccountScreen extends Component {
   state = {
      bFName: '...',
      bLName: '',
      bDOB: '...',
   } 
   handleFName = (text) => {
       this.setState({ bFName: text })
       aFName = this.state.bFName;
       //console.log(aFName);
   }
   handleLName = (text) => {
      this.setState({ bLName: text })
      console.log("BLname " + this.state.bLName);
      aLName = this.state.bLName;
      console.log("ALname " + aLName);
   }
   handleDOB = (text) => {
      this.setState({ bDOB: text })
      aDOB = this.state.bDOB;
      //console.log(aDOB);
   }

   render() {
      return (
        <SafeAreaView style={{flex: 1, paddingBottom: 13, backgroundColor: 'white'}}>
            {/* <ImageBackground 
                style={styles.background} 
                source={require("../app/assets/Background.png")}
            > */}
               <View style={styles.rectangle1}>
                  
                        {/* <View style = {{flexDirection: 'row'}}> */}
                            <View style={styles.inputWrap, {flexDirection: 'row'}}>
                                <Text>First Name: </Text>
                                <TextInput style = {styles.input}
                                underlineColorAndroid = "transparent"
                                placeholder = " First Name"
                                placeholderTextColor = "gray"
                                autoCapitalize = "none"
                                onChangeText = {this.handleFName}
                                onEndEditing = {this.handleFName}/>
                            </View>
                        {/* </View> */}
                        
                        <View style = {{flexDirection: 'row'}}>
                            <View style={styles.inputWrap}>
                                <Text>First Name: </Text>
                                <TextInput style = {styles.input}
                                underlineColorAndroid = "transparent"
                                placeholder = " Last Name"
                                placeholderTextColor = "gray"
                                autoCapitalize = "none"
                                onChangeText = {this.handleLName}
                                onEndEditing = {this.handleLName}
                                />
                            </View>
                        </View>
                     <View>
                        <DOBPickerInput />
                     </View>
                </View>
            {/* </ImageBackground> */}
        </SafeAreaView>
      )
   }
}
export default AccountScreen

const styles = StyleSheet.create({
   input: {
      margin: 20,
      height: windowHeight/13,
      borderBottomColor: 'black',
      borderWidth: 1.5,
      borderTopColor: 'white',
      borderLeftColor: 'white',
      borderRightColor: 'white',
      fontSize: 17,
      fontFamily: Platform.OS === 'android' ? 'normal' : null,      
      fontVariant: ['oldstyle-nums', 'small-caps']
   },
   rectangle1:{
      backgroundColor: 'white', 
      flex:1, 
      width: windowWidth*0.85, 
      height: windowHeight*0.4,
      alignSelf: 'center', 
      borderRadius: 15,
      padding: 5,
      elevation: 25,
      flexDirection: 'column',
      marginTop: 5,
    },
   row: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    inputWrap: {
      flex: 69,
      borderColor: "#cccccc",
      //borderBottomWidth: 2,
      marginBottom: 5
    },
    DPcontainer: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    },
    datePickerStyle: {
      width: 200,
      marginTop: 20,
    },
    DDButtonAllign: {
      //justifyContent: 'center',
      //alignItems: 'center',
    },
    background:{
      flex: 1,
      height: windowHeight,
      resizeMode: 'cover'
    }
})
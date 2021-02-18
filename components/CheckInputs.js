import React, { Component } from 'react'
import {Inputs, gFName, gLName, gDOB, gProductName, gLotNumber, gDate, gCSite} from './ManualInputs'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, KeyboardAvoidingView, StatusBar } from 'react-native'
//import CheckBox from '@react-native-community/checkbox';

export var finalFName = "";
export var finalLName = "";
export var finalDOB = "";
export var finalProductName = "";
export var finalLotNumber = "";
export var finalDate = "";
export var finalCSite = "";

class FinalInputs extends Component {
   render() {
    const finalInputAssign = () => {
        finalFName = gFName
        finalLName = gLName
        finalDOB = gDOB
        finalProductName = gProductName
        finalLotNumber = gLotNumber
        finalDate = gDate
        finalCSite = gCSite
    }
    //const [toggleCheckBox, setToggleCheckBox] = useState(false)
    
      return (
         <View style = {styles.container}>
             <Text>{"First Name: " + gFName}</Text>
             <Text>{"Last Name: " + gLName}</Text>
             <Text>{"Date Of Birth: " + gDOB}</Text>
             <Text>{"Product Name: " + gProductName}</Text>
             <Text>{"Lot Number: " + gLotNumber}</Text>
             <Text>{"Date: " + gDate}</Text>
             <Text>{"Healthcare Professional or Clinical Site: " + gCSite}</Text>

             {/* <CheckBox
               disabled={false}
               value={toggleCheckBox}
               onValueChange={(newValue) => setToggleCheckBox(newValue)}
             /> */}

             <View style= {styles.homeButtonFormat}>
                <View style={styles.containerCamera}>
                  <TouchableOpacity onPress={() => finalInputAssign()} style={styles.buttonCamera}>
                    <Text style={styles.textCamera}>Correct</Text>
                  </TouchableOpacity>
                </View>
             </View>
         </View>
         
      )
   }
}
export default FinalInputs

const styles = StyleSheet.create({
   container: {
      paddingTop: 23,
      
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
   submitButtonAllign: {
    alignItems: 'center'
   },
   submitButtonText:{
      color: 'white',
      fontWeight: 'bold',
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
    }
})
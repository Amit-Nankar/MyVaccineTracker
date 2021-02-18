import React, { Component, useState } from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import PlsScan from '../app/assets/PlsScan.png';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { useFocusEffect } from '@react-navigation/native';
import { personInfo, doseInfo } from '../App';

import {Alert, SafeAreaView, View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, KeyboardAvoidingView, Image, Dimensions, ImageBackground, Pressable } from 'react-native'
//import Camera,{CamPic, PicWidth, PicHeight, createThreeButtonAlert} from './Camera';

export var gFName = "...";
export var gLName = "";
export var gDOB = "...";
export var gProductName = "...";
export var gLotNumber = "...";
export var gDate = "...";
export var gCSite = "...";

export var CamPic = Image.resolveAssetSource(PlsScan).uri
export var PicWidth = Image.resolveAssetSource(PlsScan).width
export var PicHeight = Image.resolveAssetSource(PlsScan).height
export var base = "";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DOBPickerInput = () => {
   const [dropDOB, setDate] = useState('12/26/2020');
 
   return (
     <SafeAreaView style={styles.DPcontainer}>
       <View style={styles.DPcontainer}>
         <View style = {styles.DDButtonAllign}>
            <Text style = {styles.DDButtonAllign}>  Date of Birth: </Text>
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
       </View>
     </SafeAreaView>
   );
 };

const DatePickerInput = () => {
   const [dropDate, setDate] = useState('12/26/20');
   return (
      <SafeAreaView style={styles.DPcontainer}>
         <View style={styles.DPcontainer}>
         <View style = {styles.DDButtonAllign}>
            <Text style = {styles.DDButtonAllign}>  Date Received: </Text>
            <DatePicker
            style={styles.datePickerStyle}
            date={dropDate} // Initial date from state
            mode="date" // The enum of date, datetime and time
            placeholder="select date"
            format="MM/DD/YYYY"
            minDate="11/01/2020"
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
            onDateChange={(dropDate) => {
               setDate(dropDate);
               gDate = dropDate;
            }}
            />
         </View>
         </View>
      </SafeAreaView>
   );
};

class Inputs extends Component {
   // constructor(props){
   // super(props);
   // this.state ={
   //    FName: '...',
   //    LName: '',
   //    DOB: '...',
   //    LotNumber: '...',
   //    Date: '...',
   //    CSite: '...',
   //    pickURI: Image.resolveAssetSource(PlsScan).uri
   // }
   
   componentDidMount(){
      if(CamPic !== Image.resolveAssetSource(PlsScan).uri){
         this.setState({pickURI: CamPic})
         console.log("didmount");
      }
      if(personInfo.firstName !== null && personInfo.firstName !== '...'){
         this.setState({first: personInfo.firstName})
         this.setState({FName: personInfo.firstName})
      }
      if(personInfo.lastName !== null && personInfo.lastName !== ''){
         this.setState({last: personInfo.lastName})
         this.setState({LName: personInfo.lastName})
      }
   }
   state ={
      first: '',
      last:'',
      birthed: '',
      FName: '...',
      LName: '',
      DOB: '...',
      LotNumber: '...',
      Date: '...',
      CSite: '...',
      pickURI: Image.resolveAssetSource(PlsScan).uri
   }
   handleFName = (text) => {
       this.setState({ FName: text })
       gFName = this.state.FName;
   }
   handleLName = (text) => {
      this.setState({ LName: text })
      gLName = this.state.LName;
   }
   handleDOB = (text) => {
      this.setState({ DOB: text })
      gDOB = this.state.DOB;
   }
   handleProductName = async (text) => {
      gProductName = text;
   }
   handleLotNumber = (text) => {
      this.setState({ LotNumber: text })
      gLotNumber = this.state.LotNumber;
   }
   handleDate = (text) => {
      this.setState({ Date: text })
      gDate = this.state.Date;
   }
   handleCSite = (text) => {
      this.setState({ CSite: text })
      gCSite = this.state.CSite;
   }

   state= {
      data: null
  };

  pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
        quality: 1, //1 means highest quality
        saveToPhotos: true
      });
      if (!data.cancelled) {
        this.setState({data})
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split('.')[1]}`,
          name: `test/${data.uri.split('.')[1]}`,
        };
        this.onUpload(newFile);
      }
    } 
    else {
      Alert.alert('You need to give permissions');
    }
  };

  pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
        quality: 1,
        saveToPhotos: true
      });
      if (!data.cancelled) {
        this.setState({data})
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split('.')[1]}`,
          name: `test/${data.uri.split('.')[1]}`, 
        };
        this.onUpload(newFile);
      }
    } else {
      Alert.alert('You need to give permissions');
    }
  };

  onUpload = async (image) => {
    // Do what ever you need with the image.
    console.log(image.uri);
    CamPic = image.uri;
    //base = `data:image/jpg;base64,${image.base64}`;
    this.forceUpdate()
  };
   
   render() {
      function AlertCaller () {
         return(
            Alert.alert(
               "Vaccine Card Scan",
               "Please choose which method you would like to use to take a picture of the Vaccine Card",
               [
                 {
                   text: "Cancel",
                   onPress: () => console.log("Cancel Pressed"),
                   style: "cancel"
                 },
                 {
                   text: "Pick from Camera",
                   onPress: () => {this.pickFromCamera}
                 },
                 { 
                   text: "Pick from Gallery", 
                   onPress: () => {this.pickFromGallery}
                 },
               ],
               { cancelable: false }
             )
         )
      } 
      return (
            <KeyboardAwareScrollView style={{paddingBottom: 23,}} extraScrollHeight={10} enableOnAndroid={true}>
               <View >
                  <Pressable onPress ={() => {this.pickFromCamera()}}>   
                     <View style={{
                        borderBottomRightRadius: 20, 
                        borderBottomLeftRadius: 20 , 
                        width: windowWidth, 
                        height: windowHeight*0.5, 
                        alignItems: 'center',
                        alignSelf: 'center', 
                        backgroundColor: '#1465fb', 
                        padding: 15,
                        //elevation: 25,
                        paddingBottom: 30}}
                     >
                        {CamPic === Image.resolveAssetSource(PlsScan).uri &&
                        <Image
                           source = {require("../app/assets/ScanImage.png")}
                           style = {{
                              width: windowWidth*0.9,
                              height: windowHeight*0.4,
                              backgroundColor: '#1465fb',
                              //borderRadius: 15,
                              alignItems: 'center',
                              alignSelf: 'center',
                              resizeMode: 'contain'
                              }}

                           imageStyle={{ borderRadius: 15}}
                        />}
                           
                           {CamPic !== Image.resolveAssetSource(PlsScan).uri &&
                              <Image
                                 source = {{uri: CamPic}}
                                 style = {{
                                    width: windowWidth*0.9,
                                    height: windowHeight*0.4,
                                    backgroundColor: '#115afc',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    resizeMode: 'contain'
                                 }}
                                 imageStyle={{ borderRadius: 15}}
                              />
                           } 
                        </View>
                     </Pressable>


                  
                  <View style={{flex: 3, paddingTop: 30, backgroundColor: 'white'}}>
                     <View style={styles.row}>
                        <View style={styles.inputWrap}>
                           <TextInput style = {styles.input}
                           accessible = {true}
                           accessibilityLabel = "Enter first name here"
                           underlineColorAndroid = "transparent"
                           placeholder = " First Name"
                           placeholderTextColor = "gray"
                           autoCapitalize = "none"
                           onChangeText = {this.handleFName}
                           onEndEditing = {this.handleFName}
                           defaultValue={this.state.first}/>
                        </View>

                        <View style={styles.inputWrap}>
                           <TextInput style = {styles.input}
                           underlineColorAndroid = "transparent"
                           placeholder = " Last Name"
                           placeholderTextColor = "gray"
                           autoCapitalize = "none"
                           onChangeText = {this.handleLName}
                           onEndEditing = {this.handleLName}
                           defaultValue={this.state.last}/>
                        </View>
                     </View>

                     <View style = {styles.inputWrap}>
                        <View style = {{marginRight: 38}}>
                           <View style = {styles.row}> 
                              <View style = {styles.inputWrapNoLine}>
                                 <DOBPickerInput />
                              </View>
                              <View style = {styles.inputWrapNoLine}>
                                 <DatePickerInput />
                              </View>
                           </View>
                        </View>
                     </View>
                        
                     <DropDownPicker style = {styles.DropDowninput}
                        placeholder = " Product Name/Manufacturer"
                        placeholderTextColor = "gray"
                        onChangeItem = {item => this.handleProductName(item.value)}
                        placeholderStyle={{
                           fontWeight: 'normal',
                           textAlign: 'center',
                           //color: '#85B8E3'
                       }}
                       searchableStyle={{alignItems: 'self', alignSelf: 'center', justifyContent:'center'}}
                       dropDownStyle={styles.DropDownsettings}
                       labelStyle={{textAlign: 'center'}}
                        items={[
                           {label: 'Pfizer', value: 'Pfizer'},
                           {label: 'Moderna', value: 'Moderna'}
                        ]}
                     />

                     <TextInput style = {styles.input}
                        underlineColorAndroid = "transparent"
                        placeholder = " Lot Number"
                        placeholderTextColor = "gray"
                        autoCapitalize = "none"
                        onChangeText = {this.handleLotNumber}
                        onEndEditing = {this.handleLotNumber}/>

                    {/*  <TextInput style = {styles.input}
                        underlineColorAndroid = "transparent"
                        placeholder = " Date"
                        placeholderTextColor = "#85B8E3"
                        autoCapitalize = "none"
                        onChangeText = {this.handleDate}
                        onEndEditing = {this.handleDate}/> */}

                     <TextInput style = {styles.input}
                        underlineColorAndroid = "transparent"
                        placeholder = " Healthcare Professional/ Clinic Site"
                        placeholderTextColor = "gray"
                        autoCapitalize = "none"
                        onChangeText = {this.handleCSite}
                        onEndEditing = {this.handleCSite}/>
                     <Text>   </Text>
                     <Text>   </Text>
                     <Text>   </Text>
                  </View>
               </View>
            </KeyboardAwareScrollView>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
      paddingTop: 23,
   },
   input: {
      margin: 20,
      height: windowHeight/13,
      borderBottomColor: 'black',
      borderWidth: 1.5,
      borderTopColor: 'white',
      borderLeftColor: 'white',
      borderRightColor: 'white',
      fontSize: 17,
      fontFamily: Platform.OS === 'android' ? 'normal' : null ,
      fontVariant: ['oldstyle-nums', 'small-caps']
   },
   DropDowninput: {
      margin: 30,
      height: windowHeight/15,
      borderColor: 'black',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      width: windowWidth*0.925,
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
      width: windowWidth*0.925,
      alignSelf: 'center',
      alignItems: 'center',
      paddingVertical: 10,
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
      fontWeight: 'normal',
   },
   imageBox:{
      //alignItems: 'center',
      width: windowWidth,
      height: windowHeight*0.333,
      backgroundColor: '#f7f6e9',
      flex: 1
   },
   row: {
      flex: 1,
      flexDirection: "row",
    },
    inputWrap: {
      flex: 1,
      borderColor: "#cccccc",
      borderBottomWidth: 2,
      marginBottom: 20
    },
    inputWrapNoLine: {
      flex: 1,
      //borderColor: "#cccccc",
      //borderBottomWidth: 1,
      //marginBottom: 10
    },
    inputdate: {
      fontSize: 14,
      marginBottom: -12,
      color: "#6a4595"
    },
    inputcvv: {
      fontSize: 14,
      marginBottom: -12,
      color: "#6a4595"
    },
    DPcontainer: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    },
    DPtitle: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      padding: 20,
    },
    datePickerStyle: {
      width: 200,
      marginTop: 20,
    },
    DDButtonAllign: {
      justifyContent: 'center',
      alignItems: 'center',
    }
})
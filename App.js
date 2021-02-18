import React, {useRef, useEffect, Component, useState } from 'react';
import { ScrollView, Animated, StyleSheet, Text, View, Image, SafeAreaView, StatusBar, Button, Alert, Platform, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, Pressable } from 'react-native';
import { Divider } from 'react-native-elements';
import Camera, { CamPic } from './components/Camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';

import Inputs, { gCSite, gDate, gDOB, gFName, gLName, gLotNumber, gProductName } from './components/ManualInputs';
import FinalInputs from './components/CheckInputs';
import ResultInputs from './components/Result';
import Effects, {csvGen} from  './components/Feeling';
import ImmunityPage from './components/Immunity';
import ProgressCircle from 'react-native-progress-circle'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';

import  NotificationsScreen, {wait} from './components/Notifications';
import NotifSettings from './components/NotificationSettings';
import AccountScreen, {aLName, aFName, aDOB} from './components/Account';
import Circ from './components/ProgressCircle';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export var percent = '69%';
export var modalCount = 0;

const HomeScreen = ({navigation}) => {
  return(
    <SafeAreaView style={styles.homeButtonFormat}>
      <Camera /> 
      <View style={styles.containerCamera}>
        <TouchableOpacity onPress={() => navigation.navigate('Input Data')} style={styles.buttonCamera}>
            <Text style={styles.textCamera}>Next</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style='auto' />
    </SafeAreaView>
  )
}

const Feelings = ({navigation}) => {
  modalCount++;
  return(
    <ScrollView style={{backgroundColor: 'white'}}>
      <Effects />
    </ScrollView> 
  )
}

const saveAsyncSymp = async () => {
  await storeInfo('symptoms', savedSymp);
}

const DisclaimerPage = ({navigation}) => {
  return (
    <Circ nav={navigation}/>
  )
}

const ManuallyInputData = ({navigation}) => {
  return (
    <View >
      <Inputs />
        <View style={styles.containerCamera}>
          <TouchableOpacity onPress={() => onSubmit()} style={styles.buttonCamera}>
              <Text style={styles.textCamera}>Next</Text>
          </TouchableOpacity>
        </View>
    </View> 
  )
}


const CheckPage = ({navigation}) => {
  return (
    <View>
      <Text>(Screen 3)</Text>
      <Text>Check Your Inputs</Text>
      <FinalInputs />
      <View>
        <View style={styles.containerCamera}>
          <TouchableOpacity onPress={() => navigation.navigate('Results')} style={styles.buttonCamera}>
              <Text style={styles.textCamera}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Update')} style={styles.buttonCamera}>
              <Text style={styles.textCamera}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View> 
  )
}



const ResultsPage = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={{alignItems: 'center', paddingTop: windowHeight*0.05, paddingBottom: windowHeight*0.05, backgroundColor: '#f7f6e9'}}>
      <ImmunityPage />
    </ScrollView>
  )
}

const NotificationsPage = ({navigation}) => {
  return (
    <NotificationsScreen /> 
  )
}

const NotificationsSettings = ({navigation}) => {
  return (
    <NotifSettings /> 
  )
}

const AccountsPage = ({navigation}) => {
  return (
    <AccountScreen />
  )
}

// const Feelings = ({navigation}) => {
//   return(
//     <ScrollView>
//       <Text style={{textAlign: 'center', fontStyle: 'italic', fontSize: 20}}>How severe are your symptoms?</Text>
//       <Effects />
//         <View style={styles.containerCamera}>
//           <TouchableOpacity onPress={() =>  navigation.navigate('Disclaimer')} style={styles.buttonCamera}>
//               <Text style={styles.textCamera}>Confirm</Text>
//           </TouchableOpacity>
//         </View>
//     </ScrollView> 
//   )
// }

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function onSubmit(){
  var saved = true;
  if (personInfo.firstName === null || personInfo.firstName === '...') {
    personInfo.firstName = gFName
    console.log(gFName);
  }
  if(personInfo.lastName === null || personInfo.lasttName === ''){
    personInfo.lastName = gLName
    console.log(gLName);
  }
  if(personInfo.birthDate === null || personInfo.birthDate === '...'){
    personInfo.birthDate = gDOB
    console.log(gDOB);
  }
  if(personInfo.provider === null || personInfo.provider === '...'){
    personInfo.provider = gProductName
    console.log(gProductName);
  }
  if((gCSite === '...') || (gDate === '...') || (gLotNumber === '...') || (!(personInfo.firstName && personInfo.lastName && personInfo.birthDate && personInfo.provider))){
    Alert.alert(
      "Incomplete Information",
      "Please make sure you provide all information",
      [
        {
          text: "Ok",
          onPress: () => console.log("No"), style: 'cancel'
        }
      ]
    )
    saved = false;
  }
  if((doseInfo.dose1.facility === null || doseInfo.dose1.facility === '...') && (gCSite !== '...') && (gDate !== '...') && (gLotNumber !== '...') && saved){
    doseInfo.dose1.facility = gCSite
    doseInfo.dose1.dateReceived = gDate
    doseInfo.dose1.batch = gLotNumber
    personInfo.get_dose_1 = true;
  }
  else if((doseInfo.dose2.facility === null || doseInfo.dose2.facility === '...') && (gCSite !== '...') && (gDate !== '...' && gDate !== doseInfo.dose1.dateReceived ) && (gLotNumber !== '...' && gLotNumber !== doseInfo.dose1.batch) && saved){
    doseInfo.dose2.facility = gCSite
    doseInfo.dose2.dateReceived = gDate
    doseInfo.dose2.batch = gLotNumber
    personInfo.get_dose_2 = true;
  }
  storeInfo('person', personInfo);
  storeInfo('dose', doseInfo);
  return(saved);
}

function onEdit(){
  if(aFName !== '...')
    personInfo.firstName = aFName;
  if(aLName !== '')
    personInfo.lastName = aLName;
  if(aDOB !== '...')
    personInfo.birthDate = aDOB;
}

export const retrieveBaseInfo = async () => {
  pInfo = await readInfo('person');
  if (pInfo) {
    personInfo = pInfo
  }
  dInfo = await readInfo('dose');
  if (dInfo) {
    doseInfo = dInfo
  }
  savedSymp = await readInfo('symptoms');
  if (savedSymp) {
      sympStore = savedSymp
  }
  savedLastDate = await readInfo('lastDate');
  if (savedLastDate) {
    lastDate = savedLastDate
  }
}

export var sympStore = {
  dose1 : {
      day0 : {
          mAPain : 0,
          mASwel : 0,
          mFever : 0,
          mChill : 0,
          mFatig : 0,
          mHeada : 0
      },
      day1 : {
          mAPain : 0,
          mASwel : 0,
          mFever : 0,
          mChill : 0,
          mFatig : 0,
          mHeada : 0
      },
      day2 : {
          mAPain : 0,
          mASwel : 0,
          mFever : 0,
          mChill : 0,
          mFatig : 0,
          mHeada : 0
      }    
  },
  dose2 : {
      day0 : {
          mAPain : 0,
          mASwel : 0,
          mFever : 0,
          mChill : 0,
          mFatig : 0,
          mHeada : 0
      },
      day1 : {
          mAPain : 0,
          mASwel : 0,
          mFever : 0,
          mChill : 0,
          mFatig : 0,
          mHeada : 0
      },
      day2 : {
          mAPain : 0,
          mASwel : 0,
          mFever : 0,
          mChill : 0,
          mFatig : 0,
          mHeada : 0
      }
  }
}

export var personInfo = {
  firstName: null,
  lastName: null,
  birthDate: null,
  provider: null,
  get_dose_1: false,
  get_dose_2: false
}

export var doseInfo = {
  dose1: {
    facility: null,
    dateReceived: null,
    batch: null
  },
  dose2: {
    facility: null,
    dateReceived: null,
    batch: null
  }
}

export const storeInfo = async (key, obj) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(obj))
    // console.log('saved');
  } catch (error) {
    console.log(error);
  }
}

export const readInfo = async (key) => {
  try {
    retrievedInfo = await AsyncStorage.getItem(key);
    // console.log(retrievedInfo)
    return retrievedInfo != null ? JSON.parse(retrievedInfo) : null;
  } catch (error) {
    console.log(error);
  }
}

export default function App () {
  clearAsyncStorage();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    },3000);
  },[]);

  retrieveBaseInfo()
  if(!loading){
    return ( 
      <NavigationContainer>
        <BottomTabs/>
      </NavigationContainer>
    )
  }
  else{
    return(
      <ImageBackground 
      source={require('./app/assets/All-screens/loading.png')} 
      style={{height: windowHeight*1.09, width: windowWidth}}/>
    )
  }
}

clearAsyncStorage = async() => {
  AsyncStorage.clear();
}

function Title(){
  return(
    <ImageBackground
    source={require('./app/assets/Screen02/background.png')}
    style={{width: windowWidth, height: 90, flexDirection: 'column-reverse', justifyContent: 'flex-start', alignItems: 'center', padding: 10}}>
      <Image source={require('./app/assets/Screen03/logo_header.png')}/>
    </ImageBackground>
  )
}

const MainScreenNavigator = ({navigation})=>{
  return(
  <Stack.Navigator
      screenOptions = {{
        headerTitleAlign: "center",
      }}>
        <Stack.Screen 
          name ="Disclaimer" 
          component = {DisclaimerPage} 
          accessible = {true}
          accessibiltyLabel = "Press here"
          options={{
            header: () => <Title/>
          }}
        />
        <Stack.Screen 
          name ="Home" 
          component = {HomeScreen}
          accessible = {true}
          accessibiltyLabel = "Press here"
          options={{
            title: 'MyVaccineTracker',
          }}
        />
        <Stack.Screen 
          name ="Input Data" 
          component = {ManuallyInputData} 
          accessible = {true}
          accessibiltyLabel = "Press here"
          options={{
            headerTitle: () => <Image source={require('./app/assets/Screen03/logo_header.png')}/>,
            headerLeft: () =>
              <Icon 
              name="arrow-back-outline"
              reverse
              color='black'
              onPress={() => {navigation.navigate("Disclaimer")}}
              size={26}
              style={{padding: 13}}
              />,
            headerStyle:{
              backgroundColor: '#1465fb',
              height: 90,
              elevation: 0,
              shadowOffset:{
                height: 0,
                width: 0
              },
              borderBottomWidth: 0,
            },
            headerRight: () => 
            <Icon
              reverse
              name='checkmark-outline'
              color='black'
              onPress={() => onSubmit() ? navigation.navigate("Results") : null}
              size={30}
            />
          }}
        />
        <Stack.Screen 
          name ="Check Your Data" 
          component = {CheckPage} 
          accessible = {true}
          accessibiltyLabel = "Press here"
        />
         <Stack.Screen 
        name ="Results" 
        component = {ResultsPage} 
        accessible = {true}
        accessibiltyLabel = "Press here"
        options={{
          headerTitle: () => <Image source={require('./app/assets/Screen03/logo_header.png')}/>,
          headerLeft: () =>
            <Icon 
            name="arrow-back-outline"
            reverse
            color='black'
            onPress={() => {navigation.navigate("Disclaimer")}}
            size={26}
            style={{padding: 13}}
            />,
          headerStyle:{
            backgroundColor: '#1465fb',
            height: 90,
          }
        }}
        />
        <Stack.Screen 
        name ="Symptoms" 
        component = {Feelings} 
        accessible = {true}
        accessibiltyLabel = "Press here"
        options={{
          headerTitle: () => <Image source={require('./app/assets/Screen03/logo_header.png')}/>,
          headerLeft: () =>
            <Icon 
            name="arrow-back-outline"
            reverse
            color='black'
            onPress={() => {navigation.navigate("Disclaimer")}}
            size={26}
            style={{padding: 13}}
            />,
            headerRight: () => 
            <Icon
              reverse
              name='checkmark-outline'
              color='black'
              onPress={() => {saveAsyncSymp; navigation.navigate('Disclaimer')}}
              size={30}
              style={{padding: 13}}
            />,
          headerStyle:{
            backgroundColor: '#1465fb',
            height: 90
          }
        }}/>


      </Stack.Navigator>
  )
}
const NotificationStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions = {{
        headerTitleAlign: "center",
      }}>
        <Stack.Screen 
        name ="Notification" 
        component = {NotificationsPage} 
        accessible = {true}
        accessibiltyHint = "Press here"
        options={{
          title: 'Notification',
          headerRight: () => 
          <Icon
            reverse
            name='settings-outline'
            color='black'
            onPress={() => navigation.navigate('Notification Settings')}
            size={26}
            contain
            padding = {10}
            style={{padding: 13}}
          />
        }}
        />
        <Stack.Screen name ="Notification Settings" component = {NotificationsSettings} />
    </Stack.Navigator>
  )
}

const AccountStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions = {{
        headerTitleAlign: "center",
      }}>
       <Stack.Screen 
       name ="Account" 
       component = {AccountsPage} 
       accessible = {true}
       accessibiltyLabel = "Press here"
       options={{
        title: 'Account',
        headerRight: () => 
        <Icon
          reverse
          name='checkmark-outline'
          color='black'
          onPress={() => {onEdit(); navigation.navigate('Home')}}
          size={30}
          style={{padding: 13}}
        />
      }}
      />
    </Stack.Navigator>
  )
}

const BottomTabs = () => {
  return (
    <Tab.Navigator keyboardHidesTabBar={true} 
    tabBarOptions={{
      style: {backgroundColor: '#1465fb', height: windowHeight*0.1},
      labelStyle: {color: 'white', fontSize: 12},
      activeBackgroundColor: '#004cd9'
    }}
    >
        <Tab.Screen 
          name="Home" 
          component={MainScreenNavigator} 
          options ={{
            tabBarLabel: 'Home',
            tabBarIcon: (black) => (
              <Icon name = "ios-home" color='white' size = {26} />
            ),
          }}

        />

        <Tab.Screen 
          name="Account" 
          component={AccountStack} 
          options ={{
            tabBarLabel: 'Account',
            tabBarIcon: (black) => (
              <Icon name = "ios-person" color='white' size = {26} />
              ),
            }}

        />

        <Tab.Screen 
          name="Notification" 
          component={NotificationStack} 
          options ={{
            tabBarLabel: 'Notifications',
            tabBarIcon: (black) => (
              <Icon name = "ios-notifications" color='white' size = {26} />
            ),
          }}

        />
      </Tab.Navigator>
  );
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
    fontFamily: Platform.OS === 'android' ? 'normal' : null  },

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

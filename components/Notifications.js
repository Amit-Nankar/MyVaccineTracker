import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, Alert } from 'react-native';
import { LongPressGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import {notifDate, lastDate} from './NotificationSettings'; 

var currentDate = new Date();

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

export default function NotificationsScreen() {
  const [notif, setNotif] = useState([
    {
      id: 1,
      title: 'Welcome!',
      message: 'Hello!, Welcome to the My Vaccine Tracker app, this is the notifications page where you can set if you want to be reminded of upcoming dates for your second dose and the frequency at which you recieve them. You can always change this by tapping on the settings button on the top right! '
    }, 
  ]);

  //console.log(new Date());
  const pressHandler = (id) => {
      setNotif((prevNotif) => {
        return prevNotif.filter(notif => notif.key != key);
      })
  }
  
  console.log("notifDate: ", notifDate); 
  const newNotif = (notifDate) => {
    setNotif((prevNotif) => {
      if(currentDate === lastDate){
        console.log("current " + currentDate);
        console.log("last " + lastDate);
        return [
          {
            id: (Math.random.toString()), 
            title: "Date Reminder", 
            message: "There are " + notifDate + " days left for your final date to take the second dose",
          },
          ...prevNotif
        ]
    }
    else{
        Alert.alert(
          "No new updates",
          "If you would like to see the notification settings check the top right corner!",
          [
            {
              text: "Ok",
              onPress: () => console.log("Notification Update Cancel"), style: 'cancel'
            }
          ]
        )
        console.log("current " + currentDate);
        console.log("last " + lastDate);
      return [
        ...prevNotif
      ]
    }
    })
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    newNotif();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  
  return (
    <View style={styles.container}>
        <FlatList 
            refreshControl={
                <RefreshControl 
                    refreshing={refreshing} 
                    onRefresh={onRefresh} 
                />
            }
            keyExtractor={(item) => item.id.toString()} 
            data={notif} 
            renderItem={({ item }) => ( 
                <View style ={styles.container}>
                  <View style = {styles.item}>
                    <Text style = {styles.title}>{item.title}</Text>
                    <Text>{item.message}</Text>
                  </View> 
                </View>
            )}
        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    //marginHorizontal: 10,
    marginTop: 24,
    padding: 30,
    backgroundColor: '#5ecfff',
    fontSize: 24,
    borderRadius: 15,
  },
  title: {
    alignItems: 'center',
    fontWeight: 'bold'
  }
});
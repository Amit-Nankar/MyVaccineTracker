import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import App from '../App';
import Inputs from './ManualInputs'
import PlsScan from '../app/assets/PlsScan.png'
import { createIconSetFromFontello } from 'react-native-vector-icons';

export var CamPic = Image.resolveAssetSource(PlsScan).uri
export var PicWidth = Image.resolveAssetSource(PlsScan).width
export var PicHeight = Image.resolveAssetSource(PlsScan).height
export var base = "";


export function createThreeButtonAlert () {
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
          onPress: () => {this.pickFromGallery; console.log("pick from gallery")}
        },
      ],
      { cancelable: false }
    )
  );
} 

export class Camera extends Component {
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
  };

  render() {
    return (
      Alert.alert(
        "Alert Title",
        "My Alert Msg",
        [
          {
            text: "Pick from Camera",
            onPress: () => {this.pickFromCamera}
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { 
            text: "Pick from Gallery", 
            onPress: () => {this.pickFromGallery}
          }
        ],
        { cancelable: false }
      )
    );
  }
}

const styles = StyleSheet.create({
  alertContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center'
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
  text: {
    color: '#ffffff',
    fontWeight: 'normal'
  }
});

export default Camera;
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';
import Button from './Button';
import ImageViewer from './ImageViewer';
import AppStyle from '../theme';

const PlaceholderImage = require('../assets/images/background-image.png');

export default function UploadImageProfile({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const route = useRoute();
  const image = route.params?.selectedImage;
  
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={AppStyle.StyleImageUpload.container}>
      <View style={AppStyle.StyleImageUpload.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage ? selectedImage : image} />
      </View>
      <View style={AppStyle.StyleImageUpload.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <TouchableOpacity label="Use this photo" onPress={
          () => navigation.navigate('EditProfileScreen', { nameImage: selectedImage })
        }>
          <View style={AppStyle.StyleImageUpload.buttonContainer}>
            <View style={AppStyle.StyleImageUpload.button}>
              <Text style={AppStyle.StyleImageUpload.buttonLabel}>Use this photo</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
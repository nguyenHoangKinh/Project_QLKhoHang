import { Image } from 'react-native';
import AppStyle from '../theme';

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
  const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;

  return <Image source={imageSource} style={AppStyle.StyleImageUpload.image} />;
}

import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AppStyle from '../theme';

export default function Button({ label, theme, onPress }) {
  if (theme === "primary") {
    return (
      <View
        style={[
          AppStyle.StyleImageUpload.buttonContainer,
          { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
        ]}>
        <Pressable style={[AppStyle.StyleImageUpload.button, { backgroundColor: '#fff' }]} onPress={onPress}>
          <FontAwesome name="picture-o" size={18} color="#25292e" style={AppStyle.StyleImageUpload.buttonIcon} />
          <Text style={[AppStyle.StyleImageUpload.buttonLabel, { color: '#25292e' }]}>{label}</Text>
        </Pressable>
      </View>      
    );
  }

  return (
    <View style={AppStyle.StyleImageUpload.buttonContainer}>
      <Pressable style={AppStyle.StyleImageUpload.button} onPress={() => alert('You pressed a button.')}>
        <Text style={AppStyle.StyleImageUpload.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}
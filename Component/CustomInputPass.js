import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {TextInput, IconButton} from 'react-native-paper'; // Cần cài đặt react-native-paper
import Colors from '../Style/Colors';
import Style from '../Style/Style';

const PasswordInput = props => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        outlineStyle={{borderRadius: 12}}
        label={props.label}
        activeOutlineColor={Colors.borderSelectedColor}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.textHintColor}
        outlineColor={Colors.borderColor}
        style={Style.input}
        error={props.error}
        secureTextEntry={secureTextEntry}
      />
      <TouchableOpacity onPress={toggleSecureEntry} style={styles.icon}>
        <IconButton
          icon={secureTextEntry ? 'eye-off' : 'eye'} // Biểu tượng thay đổi
          color={Colors.borderSelectedColor}
          size={25}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginVertical: 10,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 8,
  },
});

export default PasswordInput;

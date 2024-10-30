import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../Style/Colors';
import {TextInput} from 'react-native-paper';
import Style from '../Style/Style';
import {Column} from './Box';
import {TextView} from './TextView';

const EditText = props => {
  return (
    <TextInput
      mode="outlined"
      outlineStyle={{borderRadius: props.radius || 12}}
      label={props.label}
      keyboardType={props.keyboardType || 'default'}
      activeOutlineColor={
        props.activeOutlineColor || Colors.borderSelectedColor
      }
      value={props.value}
      onChangeText={props.onChangeText}
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor || Colors.textHintColor}
      outlineColor={Colors.borderColor}
      style={Style.input}
      error={props.error}
    />
  );
};

export default EditText;

const styles = StyleSheet.create({});

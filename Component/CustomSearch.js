import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Row} from './Box';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Style/Colors';
import {TextInput} from 'react-native-paper';
import Style from '../Style/Style';

const CustomSearch = ({value, onchange}) => {
  const [focus, setFocus] = useState(false);

  return (
    <Row style={styles.box}>
      <TouchableOpacity style={[styles.asobulute, styles.search]}>
        <Ionicons name={'search'} size={20} color={Colors.grayColor2} />
      </TouchableOpacity>
      <TextInput
        mode="outlined"
        activeOutlineColor={Colors.borderSelectedColor}
        value={value}
        outlineStyle={{borderRadius: 12}}
        onChangeText={onchange}
        borderRadius={16}
        placeholder={'Hôm nay bạn muốn mua gì?'}
        placeholderTextColor={Colors.textHintColor}
        outlineColor={Colors.borderColor}
        style={[Style.input, {paddingHorizontal: 30}]}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      {focus && (
        <TouchableOpacity style={[styles.asobulute, styles.close]}>
          <Ionicons name={'close'} size={20} color={Colors.blueColor} />
        </TouchableOpacity>
      )}
    </Row>
  );
};

export default CustomSearch;

const styles = StyleSheet.create({
  box: {
    position: 'relative',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 16,
  },
  asobulute: {
    position: 'absolute',
  },
  close: {
    top: 15,
    right: 10,
  },
  search: {
    top: 15,
    left: 10,
    zIndex: 2,
  },
});

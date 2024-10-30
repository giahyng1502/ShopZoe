import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from './Colors';

const Style = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },

  iconButton: {
    width: 55,
    height: 55,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.textColor,
  },
  input: {
    height: 50,
    paddingHorizontal: 8,
    marginBottom: 10,
    borderRadius: 16,
    width: '100%',
  },
  paddingVertical: {
    paddingVertical: 10,
  },
  paddingHorizontal: {
    paddingHorizontal: 15,
  },
  padding: {
    padding: 15,
  },
  between: {
    justifyContent: 'between',
  },
  separator: {
    flex: 1,
    height: 2,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});
export default Style;

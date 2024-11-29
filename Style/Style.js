import {StyleSheet} from 'react-native';
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
    justifyContent: 'space-between',
  },
  separator: {
    flex: 1,
    height: 2,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  snackbar: {
    width: '100%',
    marginLeft: 13,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});
export default Style;

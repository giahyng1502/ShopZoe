import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, Row, Spacer} from '../Component/Box';
import Header from '../Component/Header';
import {useSelector} from 'react-redux';
import {TextView} from '../Component/TextView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Style/Colors';
import {TextInput} from 'react-native-paper';
import Style from '../Style/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = ({navigation}) => {
  const [value, setValue] = useState('');
  const {data} = useSelector(state => state.product);
  const [query, setQuery] = useState([]);
  const [focus, setFocus] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  // Hàm lưu lịch sử tìm kiếm vào AsyncStorage
  const saveSearch = async item => {
    try {
      const existingHistory = await AsyncStorage.getItem('searchHistory');
      let history = existingHistory ? JSON.parse(existingHistory) : [];

      // Thêm mục mới nếu không trùng lặp
      if (!history.some(h => h._id === item._id)) {
        history.unshift(item);
      }

      // Giới hạn số lượng lịch sử (tùy chọn)
      if (history.length > 10) {
        history.pop();
      }

      // Lưu lại lịch sử
      await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
      setSearchHistory(history);
    } catch (error) {
      console.error('Error saving search history', error);
    }
  };

  // Lấy dữ liệu lịch sử từ AsyncStorage khi component được tải
  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const value = await AsyncStorage.getItem('searchHistory');
        if (value) {
          setSearchHistory(JSON.parse(value));
        }
      } catch (error) {
        console.error('Error loading search history', error);
      }
    };
    loadSearchHistory();
  }, []);

  function handlerSearch(value) {
    setValue(value);
    const filteredQuery = data.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    );
    if (value.length > 0) {
      setQuery({_id: filteredQuery._id, name: filteredQuery.name});
    } else {
      setQuery(searchHistory);
    }
  }

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        saveSearch({_id: item._id, name: item.name}).then(
          navigation.navigate('DetailScreen', {product: item}),
        ); // Truyền item vào hàm để lưu vào lịch sử
      }}
      style={styles.item}>
      <TextView>{item.name}</TextView>
    </TouchableOpacity>
  );

  return (
    <Container>
      <Header avatar padding title={'Tìm kiếm'} />
      <Spacer height={15} />
      <Row style={styles.box}>
        <TouchableOpacity style={[styles.absolute, styles.search]}>
          <Ionicons name={'search'} size={20} color={Colors.grayColor2} />
        </TouchableOpacity>
        <TextInput
          mode="outlined"
          activeOutlineColor={Colors.borderSelectedColor}
          value={value}
          outlineStyle={{borderRadius: 12}}
          onChangeText={value => handlerSearch(value)}
          placeholder={'Hôm nay bạn muốn mua gì?'}
          placeholderTextColor={Colors.textHintColor}
          outlineColor={Colors.borderColor}
          style={[Style.input, {paddingHorizontal: 30}]}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        {focus && (
          <TouchableOpacity
            style={[styles.absolute, styles.close]}
            onPress={() => setValue('')}>
            <Ionicons name={'close'} size={20} color={Colors.blueColor} />
          </TouchableOpacity>
        )}
      </Row>
      <FlatList
        data={query}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </Container>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  box: {
    position: 'relative',
  },
  inputWrapper: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden', // Đảm bảo bo tròn góc
  },
  absolute: {
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
  item: {
    borderBottomWidth: 1,
    padding: 15,
    borderColor: Colors.grayColor2,
  },
});

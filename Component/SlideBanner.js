import React, {useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const SlideBanner = ({images, height, autoplay}) => {
  const {width: screenWidth} = Dimensions.get('window');
  // State để theo dõi slide hiện tại
  const [activeSlide, setActiveSlide] = useState(0);

  // Render từng item trong slider
  const renderItem = ({item}) => (
    <View style={styles.slide}>
      <Image
        source={{uri: item}}
        style={[styles.image, {height: height || 150}]}
      />
    </View>
  );

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        data={images}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth} // Chiều rộng của item bằng chiều rộng của màn hình
        loop={true}
        autoplay={autoplay}
        autoplayInterval={3000} // Tự động chuyển slide mỗi 3 giây
        onSnapToItem={index => setActiveSlide(index)} // Cập nhật activeSlide khi chuyển slide
        inactiveSlideScale={1} // Giữ nguyên kích thước khi slide không được chọn
        inactiveSlideOpacity={0.7} // Giữ nguyên độ mờ của các slide không được chọn
        scrollEndDragDebounceValue={200} // Thời gian giữa các lần kéo để điều chỉnh tốc độ
        springConfig={{
          tension: 40, // Cài đặt độ căng của hiệu ứng (giảm xuống giúp slide mượt mà)
          friction: 6, // Cài đặt độ ma sát của hiệu ứng (giảm xuống giúp slide mượt mà hơn)
        }}
      />

      {/* Pagination */}
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.activeDot}
        inactiveDotStyle={styles.inactiveDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    position: 'relative',
    width: '100%',
  },
  slide: {
    borderRadius: 8,
    marginRight: 25,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    borderRadius: 8,
  },
  title: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Để chữ nổi bật hơn trên ảnh
    padding: 4,
    borderRadius: 4,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10, // Đặt pagination ở phía dưới ảnh
    left: 0,
    right: 0,
    backgroundColor: 'transparent', // Giữ trong suốt nền của pagination
    paddingVertical: 10,
    flexDirection: 'row', // Để các dots nằm ngang
    justifyContent: 'center', // Canh giữa các dots
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.92)',
  },
  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: 'rgba(138,138,138,0.4)',
  },
});

export default SlideBanner;

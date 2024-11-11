import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modalize} from 'react-native-modalize';

const BottomSheetDialog = ({isVisible, onClose, children}) => {
  const modalRef = useRef(null);

  // Mở Bottom Sheet khi có yêu cầu
  const openBottomSheet = () => {
    modalRef.current?.open();
  };

  // Đóng Bottom Sheet và gọi callback onClose nếu có
  const closeBottomSheet = () => {
    modalRef.current?.close();
  };

  // Hiển thị Bottom Sheet nếu isVisible thay đổi
  useEffect(() => {
    if (isVisible) {
      openBottomSheet();
    } else {
      closeBottomSheet();
    }
  }, [isVisible]); // Chạy lại mỗi khi isVisible thay đổi

  // Gọi onClose khi Bottom Sheet đóng hoàn tất
  const handleClosed = () => {
    if (onClose) {
      onClose();
    }
  };

  // Gọi onOpened khi Bottom Sheet mở
  const handleOpened = () => {
    if (onOpened) {
      onOpened();
    }
  };

  return (
    <Modalize
      ref={modalRef}
      snapPoint={400} // Độ cao Bottom Sheet khi mở
      adjustToContentHeight={true}
      handlePosition="inside" // Vị trí thanh điều khiển (Handle)
      onClosed={handleClosed} // Gọi callback khi đóng Bottom Sheet
    >
      <View style={styles.contentContainer}>{children}</View>
    </Modalize>
  );
};

export default BottomSheetDialog;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'white',
  },
});

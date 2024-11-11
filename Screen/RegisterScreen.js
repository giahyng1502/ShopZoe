import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Container, Row, Spacer} from '../Component/Box';
import {TextTitle, TextView} from '../Component/TextView';
import EditText from '../Component/EditText';
import PasswordInput from '../Component/CustomInputPass';
import CustomButton from '../Component/CustomButton';
import Style from '../Style/Style';
import Colors from '../Style/Colors';
import {Snackbar} from 'react-native-paper';
import FetchApi from '../API/FetchApi';
import AppLoading from '../Component/AppLoading';

const RegisterScreen = ({navigation}) => {
    const [error, setError] = useState('');
    const [errorName, setErrorName] = useState('');
    const [errorPass, setErrorPass] = useState('');
    const [errorRePass, setErrorRePass] = useState('');
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [visible, setVisible] = useState(false);
    const [textSnapper, setTextSnapper] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        // Kiểm tra lỗi đầu vào trước khi tiếp tục
        if (errorName || error || errorPass || errorRePass) {
            setTextSnapper('Vui lòng điền đầy đủ thông tin');
            setVisible(true);
            return; // Thoát hàm nếu có lỗi
        }
        if (
            account.length === 0 ||
            password.length === 0 ||
            rePassword.length === 0 ||
            fullName.length === 0
        ) {
            setTextSnapper('Vui lòng điền đầy đủ thông tin');
            setVisible(true);
            return;
        }

        // Tạo đối tượng người dùng để đăng ký
        const obj = {
            name: fullName,
            phoneNumber: account,
            password: password,
        };

        try {
            setLoading(true);
            // Gọi hàm FetchApi để gửi dữ liệu đăng ký
            const res = await FetchApi('user/register', 'POST', obj);

            // Kiểm tra xem phản hồi có ở định dạng JSON và xử lý nó
            if (!res.ok) {
                // Xử lý phản hồi lỗi
                if (res.status === 409) {
                    setTextSnapper('Tài khoản đã tồn tại trên hệ thống');
                    setVisible(true);
                }
            } else {
                // Đăng ký thành công
                navigation.navigate('Login', {notification: 'Đăng ký thành công'});
            }
        } catch (error) {
            // Xử lý bất kỳ lỗi không mong muốn nào (sự cố mạng, v.v.)
            setTextSnapper('Đã xảy ra lỗi, vui lòng thử lại');
            setVisible(true);
            console.error('Lỗi trong quá trình đăng ký:', error);
        }
        setLoading(false);
    };

    const handleAccount = input => {
        // Chuyển đổi đầu vào thành chuỗi để kiểm tra

        // Kiểm tra xem đầu vào có phải là một chuỗi số không
        const regex = /^[0-9]+$/; // Biểu thức chính quy để kiểm tra số

        if (input.length === 0) {
            setError('Không được để trống số điện thoại');
            return;
        }

        // Kiểm tra số lượng ký tự
        if (input.length < 10) {
            setError('Số điện thoại phải có ít nhất 10 chữ số');
            return;
        }
        if (input.length > 12) {
            setError('Số điện thoại phải ít hơn 12 chữ số');
            return;
        }

        // Kiểm tra xem tất cả các ký tự có phải là số hay không
        if (!regex.test(input)) {
            setError('Số điện thoại phải là số');
            return;
        }

        // Nếu không có lỗi, reset lỗi
        setError('');
    };

    const handlerErrorName = input => {
        // Kiểm tra xem đầu vào có phải là chuỗi không
        if (typeof input !== 'string') {
            setErrorName('Tên phải là một chuỗi');
            return;
        }

        // Kiểm tra xem đầu vào có rỗng không
        if (input.trim().length === 0) {
            setErrorName('Tên không được để trống');
            return;
        }

        // Kiểm tra độ dài
        if (input.length < 2) {
            setErrorName('Tên của bạn phải có ít nhất 2 ký tự');
            return;
        }

        // Kiểm tra xem tên có chứa ký tự không phải là chữ cái không
        const nameRegex = /^[a-zA-Z\s]+$/; // Cho phép chữ cái và khoảng trắng
        if (!nameRegex.test(input)) {
            setErrorName('Tên chỉ được chứa chữ cái và khoảng trắng');
            return;
        }

        // Nếu không có lỗi, reset lỗi
        setErrorName('');
    };

    const handlePassword = input => {
        setPassword(input);
        // Kiểm tra độ dài mật khẩu
        if (input.length < 6) {
            setErrorPass('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        // Kiểm tra xem mật khẩu có chứa khoảng trắng
        if (/\s/.test(input)) {
            setErrorPass('Mật khẩu không được chứa khoảng trắng');
            return;
        }
        if (!comfirmPassword(input, rePassword)) {
            setErrorRePass('Mật khẩu và mật khẩu nhập lại phải giống nhau');
        } else {
            setErrorRePass('');
        }

        // Nếu không có lỗi, reset lỗi
        setErrorPass('');
    };

    const comfirmPassword = (pass, rePass) => {
        let check = true;
        // console.log(pass);
        // console.log(rePass);
        if (pass !== rePass) {
            check = false;
        }
        return check;
    };
    const handleRePassword = input => {
        setRePassword(input);
        // console.log(password);
        // console.log(rePassword);
        // Kiểm tra xem mật khẩu xác nhận có khớp không
        if (input.length < 6) {
            setErrorRePass('Mật khẩu nhập phải ít nhất 6 ký tự');
            return;
        }
        if (!comfirmPassword(password, input)) {
            setErrorRePass('Mật khẩu và mật khẩu nhập lại phải giống nhau');
            return;
        }
        // Nếu không có lỗi, reset lỗi
        setErrorRePass('');
    };

    return (
        <>
            <Container style={styles.justifyContent}>
                <Snackbar
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    duration={2000}
                    style={Style.snackbar}
                    action={{
                        label: 'X',
                        onPress: () => {
                            setVisible(false);
                        },
                        textColor: Colors.white,
                    }}>
                    <TextView size={14} color={Colors.white}>
                        {textSnapper}
                    </TextView>
                </Snackbar>
                <TextTitle>Đăng Ký Ngay</TextTitle>
                <TextView>Tạo tài khoản</TextView>
                <Spacer height={20}/>

                {/* Họ tên */}
                <EditText
                    placeholder="Nhập họ tên của bạn"
                    label="Họ tên"
                    value={fullName}
                    onChangeText={it => {
                        setFullName(it);
                        handlerErrorName(it);
                    }}
                    error={!!errorName}
                />

                {/* Tài khoản */}
                <EditText
                    placeholder="Nhập số điện thoại của bạn"
                    label="Số điện thoại"
                    value={account}
                    keyboardType="numeric"
                    onChangeText={it => {
                        setAccount(it);
                        handleAccount(it);
                    }}
                    error={error}
                />

                {/* Mật khẩu */}
                <PasswordInput
                    label="Mật khẩu"
                    secureTextEntry={true}
                    placeholder="Vui lòng nhập mật khẩu"
                    value={password}
                    onChangeText={handlePassword}
                    error={!!errorPass}
                />

                {/* Nhập lại mật khẩu */}
                <PasswordInput
                    label="Nhập lại mật khẩu"
                    secureTextEntry={true}
                    placeholder="Vui lòng nhập lại mật khẩu"
                    value={rePassword}
                    onChangeText={handleRePassword}
                    error={!!errorRePass}
                />
                {errorName && (
                    <TextView color={Colors.error} size={12}>
                        * {errorName}
                    </TextView>
                )}
                {error && (
                    <TextView color={Colors.error} size={12}>
                        * {error}
                    </TextView>
                )}
                {errorPass && (
                    <TextView color={Colors.error} size={12}>
                        * {errorPass}
                    </TextView>
                )}
                {errorRePass && (
                    <TextView color={Colors.error} size={12}>
                        * {errorRePass}
                    </TextView>
                )}
                <Spacer height={15}/>
                <CustomButton
                    onPress={() => {
                        handleSubmit();
                    }}>
                    <Text style={{fontSize: 20, fontWeight: '700', color: Colors.white}}>
                        Đăng Ký
                    </Text>
                </CustomButton>
                <Spacer height={15}/>

                <Row style={Style.row}>
                    <View style={Style.separator}></View>
                    <Text style={{marginHorizontal: 10}}>Hoặc</Text>
                    <View style={Style.separator}></View>
                </Row>
                <Row style={Style.padding}>
                    <TouchableOpacity>
                        <Image
                            source={require('../assets/image/google.png')}
                            style={[Style.iconButton, {width: 62}]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require('../assets/image/facebook.png')}
                            style={Style.iconButton}
                        />
                    </TouchableOpacity>
                </Row>

                <Row>
                    <TextView>Bạn đã có tài khoản : </TextView>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <TextView style={{color: Colors.blueColor}}>
                            Đăng nhập ngay
                        </TextView>
                    </TouchableOpacity>
                </Row>
            </Container>
            {loading && <AppLoading/>}
        </>
    );
};

export default RegisterScreen;
const styles = StyleSheet.create({
    justifyContent: {
        justifyContent: 'center'
    }
});

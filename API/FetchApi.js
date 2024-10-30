const FetchApi = async (
  url,
  method = 'GET',
  body = null,
  token = null, // Thêm tham số token
  headers = {
    'Content-Type': 'application/json',
  },
  credentials = 'include',
) => {
  try {
    const linkUrl = `http://10.0.3.2:3000/v1/${url}`;
    if (token) {
      headers['Authorization'] = token;
    }
    console.log(linkUrl);
    // Tạo các tùy chọn cho yêu cầu
    const options = {
      method,
      headers,
      credentials,
    };

    // Nếu có body, chuyển đổi thành chuỗi JSON
    if (body) {
      options.body = JSON.stringify(body);
    }

    // Gửi yêu cầu
    const response = await fetch(linkUrl, options);

    return response;
  } catch (error) {
    console.error('Fetch API Error:', error);
    throw error;
  }
};
export default FetchApi;

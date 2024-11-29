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
    // const linkUrl = `https://apishopzoe-1.onrender.com/v1/${url}`;
    const linkUrl = `http://10.0.2.2:3000/v1/${url}`;
    if (token) {
      headers.Authorization = token;
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
export const uploadImage = async fileUri => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: fileUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    const response = await fetch('http://10.0.2.2:3000/v1/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Upload image error:', error.message || error);
    throw error;
  }
};

export default FetchApi;
export const token =
  'gf eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzQ4NmI4ODUxYzFjNzVmNjdiYzdhNDMiLCJwaG9uZU51bWJlciI6Imh1bmdjeUBnbWFpbC5jb20iLCJuYW1lIjoiaHVuZyIsInJvbGUiOmZhbHNlLCJpYXQiOjE3MzI3OTkzNzMsImV4cCI6MTczNTM5MTM3M30.uqrvd2CoDvUCIgtEWf2CotvIhku4gvKFrDZLDgzM6PI';

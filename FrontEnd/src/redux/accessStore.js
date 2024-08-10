const getAccessToken = () => {
    return localStorage.getItem('token');
};

const setAccessToken = (token) => {
    localStorage.setItem('token', token);
};

const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

const setRefreshToken = (token) => {
    localStorage.setItem('refreshToken', token);
};

export { getAccessToken, setAccessToken, getRefreshToken, setRefreshToken };

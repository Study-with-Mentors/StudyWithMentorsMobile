import axios, {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL:
                'http://studywithmentor.ap-southeast-1.elasticbeanstalk.com/api',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export const getAccessToken = (): string => {
    let access_token;
    AsyncStorage.getItem('access_token').then(data => {
        access_token = data;
    });
    if (access_token) {
        return access_token;
    }
    return '';
};

export const saveAccessToken = (accessToken: string) => {
    AsyncStorage.setItem('access_token', accessToken).then();
};

export const toQueryParams = (data: any): string => {
    const qs = Object.keys(data)
        .map(key =>
            Array.isArray(data[key])
                ? data[key].map((v: string) => `${key}=${v}`).join('&')
                : `${key}=${data[key]}`,
        )
        .join('&');

    return qs;
};

const http = new Http().instance;

http.interceptors.response.use(
    res => {
        if (res && res.data) {
            return res;
        }
        return res;
    },
    err => {
        if (err.response.status == 401) {
            // window.location.href = "http://localhost:3000/signin";
        }
        throw err;
    },
);

export default http;

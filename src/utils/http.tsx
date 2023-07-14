import axios, {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from '@env';

export class Http {
    instance: AxiosInstance;
    constructor() {
        console.log('Connect to server: ' + SERVER_URL);
        this.instance = axios.create({
            baseURL: SERVER_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export const getAccessToken = async (): Promise<string | null> => {
    return AsyncStorage.getItem('access_token');
};

export const saveAccessToken = async (accessToken: string) => {
    await AsyncStorage.setItem('access_token', accessToken);
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

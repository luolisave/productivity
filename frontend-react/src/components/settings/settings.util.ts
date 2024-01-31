import {API_CONFIG, BACKEND_IP, BACKEND_PORT}  from '../../config.const';

export function getValueFromLocalStorage(key: string) {
    let rv = localStorage.getItem(key);
    if(rv) {
        let savedValue = JSON.parse(rv);
        return savedValue;
    }
    return null;
}

export function getApiIpPort() {
    const apiConfig = getValueFromLocalStorage(API_CONFIG);
    let apiDomain = '' ;
    if (apiConfig && apiConfig.ip && apiConfig.port) {
      apiDomain = `//${apiConfig.ip}:${apiConfig.port}`;
    } else {
      apiDomain = `//${BACKEND_IP}:${BACKEND_PORT}`;
    }
    return apiDomain;
}
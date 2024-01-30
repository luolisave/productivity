import useLocalStorage from '../../utility/useLocalstorage.hook';
import { API_CONFIG, BACKEND_IP, BACKEND_PORT } from './../../config.const'; // default value

function Settings() {
  let [apiConfig, setApiConfig] = useLocalStorage(API_CONFIG, {ip:BACKEND_IP, port: BACKEND_PORT });
  return (
    <>
      <h1>Settings</h1>

      <strong>Default: {BACKEND_IP}:{BACKEND_PORT}</strong>

      <div className='mt-3 container-fluid'>
        <div className='row mt-1 mb-1'>
          <div className='col-12'>
            <label>IP</label>
            <input className='form-control' name="ip" value={apiConfig.ip} onChange={e=>setApiConfig({...apiConfig, ip: e.target.value})} />
          </div>
          
        </div>
        <div className='row mt-1 mb-1'>
          <div className='col-12'>
            <label>PORT:</label>
            <input className='form-control' name="port" value={apiConfig.port} onChange={e=>setApiConfig({...apiConfig, port: e.target.value})} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;

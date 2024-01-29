import Axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import { BACKEND_IP, BACKEND_PORT } from './../../config.const';

import './Bookmarks.css';

interface Bookmark{
  _id: string;
  type: string;
  key: string;
  record: {
    title: string;
    url: string; 
    order: number;
  }
}

function Bookmarks() {
  let initLoadRef = useRef(true);
  let [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  let [title, setTitle] = useState('');
  let [order, setOrder] = useState(-1);
  let [url, setUrl] = useState('');

  useEffect(()=>{
    if (initLoadRef.current) { // onl run once when component initial loads (not second time load)
      initLoadRef.current = false;
      Axios.get(`${BACKEND_IP}:${BACKEND_PORT}/atom/list?type=bookmark`).then((res)=> {
        console.log(res.data.records);
        const records = res.data.records;
        let sortedRecords = records.sort((a: Bookmark, b: Bookmark)=>{
          if (a.record.order < b.record.order) {
            return -1
          } else {
            return 1
          }
        });

        setBookmarks(sortedRecords);
      });
    }
    
  },[]);

  return (
    <>
      <h1>Bookmarks</h1>

      <div className='row mt-1 mb-1'>
        <div className='col-9'>
        <input className='form-control' name="title" placeholder='Title' onChange={e => {setTitle(e.target.value)}} /> 
        </div>
        <div className='col-3'>
        <input className='form-control'  name="order" type='number' onChange={e => {setOrder(Number(e.target.value))}} />
        </div>
      </div>
      <div className='row mt-1 mb-1'>
        <div className='col-9'>
          <input className='form-control' name="url" placeholder='http://test.com' onChange={e => {setUrl(e.target.value)}} />
        </div>
        <div className='col-3'>
        <button className='btn btn-success'><i className='bi bi-bookmark-plus'></i> Add</button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col" className='width-99pct'>Title</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          
          {
            bookmarks.map((item, index)=>{
              return <tr key={item.key}>
                <td><a target='_blank' className='bookmark-link' href={item.record.url}>{item.record.title}</a></td>
                <td>
                  <div className='bookmark-btn-div'>
                    <button className='btn btn-primary'><i className='bi bi-brush'></i></button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className='btn btn-danger'><i className='bi bi-trash'></i></button>
                  </div>
                </td>
              </tr>
            })
          }
          
        </tbody>
      </table>
    </>
  );
}

export default Bookmarks;

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

function sortBookmarkRecords(records: Bookmark[]): Bookmark[] {
  let sortedRecords = records.sort((a: Bookmark, b: Bookmark)=>{
    if (a.record.order < b.record.order) {
      return -1
    } else {
      return 1
    }
  });
  console.log(`sortedRecords =`, sortedRecords);
  return sortedRecords;
}

function Bookmarks() {
  let initLoadRef = useRef(true);
  let [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  let [title, setTitle] = useState('');
  let [order, setOrder] = useState(0);
  let [url, setUrl] = useState('');

  useEffect(()=>{
    if (initLoadRef.current) { // onl run once when component initial loads (not second time load)
      initLoadRef.current = false;
      Axios.get(`${BACKEND_IP}:${BACKEND_PORT}/atom/list?type=bookmark`).then((res)=> {
        // console.log(res);
        const records = res.data.records;
        
        setBookmarks(sortBookmarkRecords(records));
      });
    }
    
  },[]);

  let disableSaveBtn = useRef(false);
  function saveBookmark() {
    console.log('saveBookmark()...');
    disableSaveBtn.current = true;
    Axios.post(
      `${BACKEND_IP}:${BACKEND_PORT}/atom?type=bookmark&key=bookmark_${Math.floor(Math.random() * 99999999999)}`,
      {
        title: title ? title: url,
        url,
        order
      })
      .then((res)=> {
        console.log(res);
        const record = res.data.record;
        setBookmarks(preMarks => {
          return [record, ...preMarks]
        });
        setTimeout(() => {
          disableSaveBtn.current = false;
        }, 100);
    });
  }

  function deleteBookmarkRecord(){

  }

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
          <input className='form-control' name="url" placeholder='e.g. http://test.com' onChange={e => {setUrl(e.target.value)}} />
        </div>
        <div className='col-3'>
        <button className='btn btn-success' disabled={disableSaveBtn.current} onClick={saveBookmark}><i className='bi bi-bookmark-plus'></i> Add</button>
        </div>
      </div>
      <div className='mt-3 container-fluid'>
      {
        bookmarks.map((item, index)=>{
          return <div className='row pt-1 pb-1' style={{borderBottom: '1px solid #CCC'}} key={item.key}>
            <div className='col-9' style={{overflow:'hidden'}} ><a target='_blank' className='bookmark-link' title={item.record.url} href={item.record.url}>{item.record.title}</a></div>
            <div className='col-3'>
              <div className='bookmark-btn-div'>
                <button className='btn btn-primary'><i className='bi bi-brush'></i></button>
                &nbsp;
                <button className='btn btn-danger' onClick={deleteBookmarkRecord}><i className='bi bi-trash'></i></button>
              </div>
            </div>
          </div>
        })
      }
      </div>

      <div className='row' style={{height: '5rem'}}></div>
      
    </>
  );
}

export default Bookmarks;

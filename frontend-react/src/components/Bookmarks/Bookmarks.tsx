import Axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import { BACKEND_IP, BACKEND_PORT } from './../../config.const';

import './Bookmarks.css';
import { useParams } from 'react-router';

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
  const { type_surfix } = useParams();
  const bookmarkType = 'bookmark' + (type_surfix ? '_' + type_surfix : '')
  // console.log('Bookmarks.tsx  type_surfix =', type_surfix, ' bookmarkType=',bookmarkType);
  let initLoadRef = useRef(true);
  let [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  let [title, setTitle] = useState('');
  let [order, setOrder] = useState(0);
  let [url, setUrl] = useState('');
  let recordKey = useRef('');

  useEffect(()=>{
    if (initLoadRef.current) { // onl run once when component initial loads (not second time load)
      initLoadRef.current = false;
      Axios.get(`${BACKEND_IP}:${BACKEND_PORT}/atom/list?type=${bookmarkType}`).then((res)=> {
        // console.log(res);
        const records = res.data.records;
        
        setBookmarks(sortBookmarkRecords(records));
      });
    }
    
  },[]);

  let disableSaveBtn = useRef(false);
  function saveBookmark() {
    console.log('saveBookmark()...');
    if(url && url !== '') {
      disableSaveBtn.current = true;

      const postUrl = !recordKey.current ?                              // todo: use uuid instead of this random thing.
          `${BACKEND_IP}:${BACKEND_PORT}/atom?type=${bookmarkType}&key=bk${Math.floor(Math.random() * 99999999999)}` :
          `${BACKEND_IP}:${BACKEND_PORT}/atom?type=${bookmarkType}&key=${recordKey.current}`;
      Axios.post(                                                    
        postUrl,
        {
          title: title ? title: url,
          url,
          order
        })
        .then((res)=> {
          console.log(res);
          const record = res.data.record;
          setBookmarks(preMarks => {
            const tmpBookmarks = preMarks.filter(item=>item.key !== record.key)
            return [record, ...tmpBookmarks]
          });
          setTimeout(() => { // this is a trick to disable Add btn until user change anything
            disableSaveBtn.current = false;
          }, 100);

          // todo: maybe use a function to do reset
          recordKey.current = '';
          setTitle('');
          setOrder(0);
          setUrl('');
      });
    } else {
      alert('URL cannot be empty!');
    }
    
  }

  function deleteBookmarkRecord(key: string, title=''){
    console.log('deleteBookmarkRecord().....');
    const cfm = confirm(`Delete ${title} \n (key = ${key}) ?`);
    console.log('dsaf');
    if(cfm) {
      Axios.delete(`${BACKEND_IP}:${BACKEND_PORT}/atom?type=${bookmarkType}&key=${key}`)
      .then(res => {
         console.log(' delete ....', res.data)
         if(res.data && res.data.status === 1 && res.data.numRemoved > 0) {
           console.log('delete successfully!');
           setBookmarks(bookmarks.filter(item=>item.key !== key));
         } else {
           alert('delete error!');
         }
      })
      .catch(function (error) {
       if (error.response) {}
       else if (error.request) {}
       else {}
       console.log(error.config);
       alert('error when call delete function.');
      }); 
    }
    
  }

  function editBtnAction(item: Bookmark) {
    console.log('editBtnAction()...', item)
    setTitle(item.record.title);
    setOrder(item.record.order);
    setUrl(item.record.url);
    recordKey.current = item.key;
  }

  return (
    <>
      <h1>Bookmarks</h1>

      <div className='row mt-1 mb-1'>
        <div className='col-9'>
        <input className='form-control' value={title} name="title" placeholder='Title' onChange={e => {setTitle(e.target.value)}} /> 
        </div>
        <div className='col-3'>
        <input className='form-control' value={order}  name="order" type='number' onChange={e => {setOrder(Number(e.target.value))}} />
        </div>
      </div>
      <div className='row mt-1 mb-1'>
        <div className='col-9'>
          <input className='form-control' name="url" value={url} placeholder='e.g. http://test.com' onChange={e => {setUrl(e.target.value)}} />
        </div>
        <div className='col-3'>
        <button className='btn btn-success' disabled={disableSaveBtn.current} onClick={saveBookmark}><i className='bi bi-bookmark-plus'></i> {recordKey.current ? 'Update' : 'Create'}</button>
        </div>
      </div>
      <div className='mt-3 container-fluid'>
      {
        bookmarks.map((item, index)=>{
          return <div className='row pt-1 pb-1' style={{borderBottom: '1px solid #CCC'}} key={item.key}>
            <div className='col-9' style={{overflow:'hidden'}} >
              <a target='_blank' className='bookmark-link' title={item.record.url + ' (order# ' + item.record.order + ')'} href={item.record.url}>{item.record.title}</a>
            </div>
            <div className='col-3'>
              <div className='bookmark-btn-div'>
                <button className='btn btn-primary' onClick={()=>{editBtnAction(item)}}><i className='bi bi-brush'></i></button>
                &nbsp;
                <button className='btn btn-danger' title={item.key} onClick={()=>{deleteBookmarkRecord(item.key, item.record?.title)}}><i className='bi bi-trash'></i></button>
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

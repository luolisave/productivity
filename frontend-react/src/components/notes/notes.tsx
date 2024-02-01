import Axios from 'axios';

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { getApiIpPort } from '../settings/settings.util';
import { randomString } from '../../utility/str'

import './notes.css';

interface Note{
  _id: string;
  type: string;
  key: string;
  record: {
    title?: string;
    desc?: string;
    note: string; 
    order: number;
  }
}

function sortRecords(records: Note[]): Note[] {
  let sortedRecords = records.sort((a: Note, b: Note)=>{
    if (a.record.order < b.record.order) {
      return -1
    } else {
      return 1
    }
  });
  console.log(`sortedRecords =`, sortedRecords);
  return sortedRecords;
}

function Notes() {
  let initLoadRef = useRef(true);
  let [notes, setNotes] = useState<Note[]>([]);

  const apiIpPort = getApiIpPort();
  const noteType = 'note';

  useEffect(()=>{
    if (initLoadRef.current) { // onl run once when component initial loads (not second time load)
      initLoadRef.current = false;
      Axios.get(`${apiIpPort}/atom/list?type=${noteType}`).then((res)=> {
        console.log(res);
        const records = res.data.records;
        
        setNotes(sortRecords(records));
      });
    }
    
  },[]);

  function deleteNote(key: string, title?: string) {
    console.log('deleteNote()...');
    const cfm = confirm(`Delete ${title} \n (key = ${key}) ?`);
    console.log('dsaf');
    if(cfm) {
      Axios.delete(`${apiIpPort}/atom?type=${noteType}&key=${key}`)
      .then(res => {
         console.log(' delete ....', res.data)
         if(res.data && res.data.status === 1 && res.data.numRemoved > 0) {
           console.log('delete successfully!');
           setNotes(notes.filter(item=>item.key !== key));
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
  return (
    <>
      <h1>
        Notes
        <span className='float-end' style={{paddingRight: '4rem'}}>
          <Link to={'/note/'+randomString(16)} className='btn btn-success'><i className='bi bi-bookmark-plus'></i> New</Link>
        </span>
      </h1>

      <div className='mt-3 container-fluid'>
      {
        notes.map((item, index)=>{
          return <div className='row pt-1 pb-1' style={{borderBottom: '1px solid #CCC'}} key={item.key}>
            <div className='col-9' style={{overflow:'hidden'}} >
              {/* todo: relative link shoud not refresh the page. */}
              
              <Link className='notes-link' to={'/note/'+item.key}>{item.record.title ? item.record.title : 'Key:'+item.key}</Link>
            </div>
            <div className='col-3'>
              <div className='bookmark-btn-div'>
                
                <button className='btn btn-danger' title={item.key} onClick={()=>{deleteNote(item.key, item.record.title)}}><i className='bi bi-trash'></i></button>
              </div>
            </div>
          </div>
        })
      }
      </div>
    </>
  );
}

export default Notes;

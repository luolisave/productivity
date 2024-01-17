import Axios from 'axios';
import { useEffect, useRef, useState } from 'react';

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

  useEffect(()=>{
    if (initLoadRef.current) { // onl run once when component initial loads (not second time load)
      initLoadRef.current = false;
      Axios.get("http://127.0.0.1:2024/atom/list?type=bookmark").then((res)=> {
        console.log(res.data.records);
        setBookmarks(res.data.records);
      });
    }
    
  },[]);

  return (
    <>
      <h1>Bookmarks</h1>

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

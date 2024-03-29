import Axios from "axios";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { getApiIpPort } from "../settings/settings.util";

function Note() {
  const featureType = 'note';
  const apiIpPort = getApiIpPort();
  const initLoadRef = useRef(true);
  const { id } = useParams();
  let [title, setTitle] = useState('');
  let [note, setNote] = useState('');

  // below block unused yet, only for learning and testing
  const [searchParams, setSearchParams] = useSearchParams(); // useSearchParams({ n: "dfs" });
  const n = searchParams.get("n"); //  e.g. http://localhost:5173/#/note/123?n=dfddddd
  // console.log("n =", n);


  
  useEffect(()=>{
    if (initLoadRef.current) { // onl run once when component initial loads (not second time load)
      initLoadRef.current = false;
      Axios.get(`${apiIpPort}/atom?type=${featureType}&key=${id}`).then((res)=> {
        // console.log(res);
        const record = res.data.record ? res.data.record : {};
        console.log('initial get. record =', record)
        setNote(record?.note ? record?.note : '');
        setTitle(record?.title ? record?.title : '');
      }).catch(function (error) {
        if (error.response) {}
        else if (error.request) {}
        else {}
        console.log(error.config);
        alert('error when call GET function.');
     });
    }
    
  },[]);

  // save data to DB
  
  function save() {
    console.log('save()...');

    const postUrl = `${apiIpPort}/atom?type=${featureType}&key=${id}`;
    console.log('note = ', note);
    Axios.post(                                                    
      postUrl,
      {
        title,
        note,
        order: -1
      })
      .then((res)=> {    
        setNote(res.data.record.record.note);
      }).catch(function (error) {
        if (error.response) {}
        else if (error.request) {}
        else {}
        console.log(error.config);
        alert('error when call create/update function.');
     });

    
  }

  return (
    <>
      <h1>
        Note
        <button 
          className="btn btn-primary"
          style={{float: 'right'}}
          onClick={save}
        >Save</button>
      </h1>
      <div className="pt-2">
        <input 
          className="form-control"
          
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="pt-2">
        <textarea 
          className="form-control"
          style={{minHeight: '480px'}}
          value={note}
          onChange={e => setNote(e.target.value)}
        ></textarea>
      </div>
    </>
  );
}

export default Note;

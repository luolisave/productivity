import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { getApiIpPort } from "../settings/settings.util";
import Axios from "axios";

function Note() {
  const featureType = 'note';
  const apiIpPort = getApiIpPort();
  const { id } = useParams();
  const [note, setNote] = useState('');

  // below block unused yet, only for learning and testing
  const [searchParams, setSearchParams] = useSearchParams(); // useSearchParams({ n: "dfs" });
  const n = searchParams.get("n"); //  e.g. http://localhost:5173/#/note/123?n=dfddddd
  // console.log("n =", n);


  let initLoadRef = useRef(true);
  useEffect(()=>{
    if (initLoadRef.current) { // onl run once when component initial loads (not second time load)
      initLoadRef.current = false;
      Axios.get(`${apiIpPort}/atom?type=${featureType}&key=${id}`).then((res)=> {
        // console.log(res);
        const record = res.data.record;
        console.log(record)
        setNote(record?.note);
      });
    }
    
  },[]);

  // save data to DB
  let disableSaveBtn = useRef(false);
  function save() {
    console.log('save()...');
    disableSaveBtn.current = true;

    const postUrl = `${apiIpPort}/atom?type=${featureType}&key=${id}`;
    console.log('note = ', note);
    Axios.post(                                                    
      postUrl,
      {
        note
      })
      .then((res)=> {
        console.log(res);
        // todo: notify user create/update success.
        
        setTimeout(() => { // this is a trick to disable Add btn until user change anything
          disableSaveBtn.current = false;
        }, 100);
    });

    
  }

  return (
    <>
      <h1>
        Note ({id})
        <button 
          className="btn btn-primary"
          style={{float: 'right'}}
          onClick={()=>{save()}}
        >Save Note</button>
      </h1>
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

// src/pages/Customer/OcrRun.jsx
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { runOcr } from '../../api/ocr';

const OcrRun = () => {
  const { documentId } = useParams();
  const [resp, setResp] = useState(null);
  const run = async ()=> {
    const { data } = await runOcr(documentId);
    setResp(data);
  };

  return (
    <div>
      <h2>OCR</h2>
      <button onClick={run}>Start OCR</button>
      {resp && <pre>{JSON.stringify(resp, null, 2)}</pre>}
    </div>
  );
};
export default OcrRun;
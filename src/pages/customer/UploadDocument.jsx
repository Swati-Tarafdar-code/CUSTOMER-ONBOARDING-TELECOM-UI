// src/pages/Customer/UploadDocument.jsx
import { useState } from 'react';
import { uploadDocument } from '../../api/documents';

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const { data } = await uploadDocument(file);
    setResult(data);
  };

  return (
    <div>
      <h2>Upload Document</h2>
      <form onSubmit={submit}>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
        <button type="submit">Upload</button>
      </form>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};

export default UploadDocument;

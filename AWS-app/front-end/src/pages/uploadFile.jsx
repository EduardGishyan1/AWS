import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    try {
      const response = await fetch('https://vk26fobb99.execute-api.eu-north-1.amazonaws.com/dev/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get signed URL');
      }

      const data = await response.json();
      const uploadUrl = data.uploadUrl;

      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      console.log(uploadResponse);

      if (!uploadResponse.ok) {
        throw new Error('Upload to S3 failed');
      }

      setMessage('Upload successful!');
    } catch (error) {
      console.log(error);
      setMessage('Upload failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Upload File to S3 with Signed URL</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginTop: 10 }}>
        Upload
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FileUpload;
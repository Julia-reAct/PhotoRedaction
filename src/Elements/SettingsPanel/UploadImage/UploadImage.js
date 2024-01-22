import React, { useRef, useState } from "react";
import './UploadImage.css'

export default function UploadImage({setFile}) {
  const inputRef = useRef();

    const [selectedFile, setSelectedFile] = useState(null);

  const handleOnChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(event.target.files[0])
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  }
  return (
    <div className='upload_file'>
        <input
            type="file"
            ref={inputRef}
            onChange={handleOnChange}
            style={{ display: "none" }}
        />
        <button className="file-btn" onClick={onChooseFile}>
             Upload File
        </button>
        {selectedFile && (
            <div className="selected-file">
                <p>{selectedFile.name}</p>
            </div>
        )}
    </div>
  )
}
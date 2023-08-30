import React from "react"

export default function UploadImage(setFile) {

    function handleChange(e) {
        console.log(e.target.files);
        if(e.target.files.length!==0) {
            setFile.setFile(URL.createObjectURL(e.target.files[0]));
        }
    }

    return (
        <div className="upload_image">
            <h2 className="upload_image__header">Add Image:</h2>
            <input className="upload_image__input"
                   accept="image/png, image/jpeg"
                   type="file"
                   onChange={handleChange}
            />
        </div>
    )
}
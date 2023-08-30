import React from "react"

export default function DownloadImage(canvas) {

    const saveImageToLocal = (event) => {
        let link = event.currentTarget;
        link.setAttribute("download", "canvas.png");
        let image = canvas.canvas.current.toDataURL("image/png");
        link.setAttribute("href", image);
    };

    return (
        <div className="download_image">
            <a className="download_image__link"
               id="download_image_link"
               href="download_link"
               download
               onClick={saveImageToLocal}>
                Download
                Image</a>
        </div>
    )
}
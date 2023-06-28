import Cropper from 'react-easy-crop'
import Photo from './golden.jpg'
import React, { useState } from 'react';

const CONTAINER_HEIGHT = 1000

const CroppedImage = () => {
    const [crop, onCropChange] = useState({ x: 0, y: 0 })
    const [zoom, onZoomChange] = useState(1)
    return (
        <Cropper
            image={Photo}
            crop={crop}
            zoom={zoom}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onMediaLoaded={(mediaSize) => {
                // Adapt zoom based on media size to fit max height
                onZoomChange(CONTAINER_HEIGHT / mediaSize.naturalHeight)
            }}
        />
    )
}
export default CroppedImage
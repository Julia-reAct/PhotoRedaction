import React, {useEffect, useRef, useState} from 'react'
import DownloadImage from '../DownloadAndUploadImage/DownloadImage'
import UploadImage from '../DownloadAndUploadImage/UploadImage'
import Filter from '../Filter/Filter'
import BrushConfig from '../ChooseColorSizeBrush/BrushConfig'
import './Drawing.css'

function Drawing() {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const imageRef = useRef(null)
    const drawingPathRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [file, setFile] = useState(null)
    const [sizePhoto, setSizePhoto] = useState()

    useEffect(() => {
        const image = new Image()
        image.src = file
        drawingPathRef.current = new Path2D()
        image.onload = () => {
            const canvas = canvasRef.current
            let width = 500
            let height = 500 / (image.naturalWidth / image.naturalHeight)
            setSizePhoto([width, height])
            canvas.width = width
            canvas.height = height
            const context = canvas.getContext('2d')
            context.lineCap = 'round'
            context.strokeStyle = 'black'
            context.lineWidth = 5
            contextRef.current = context
            context.drawImage(image, 0, 0, width, height)
        }
        imageRef.current = image
    }, [file])

    const startDrawing = ({nativeEvent}) => {
        console.log(nativeEvent)
        const {offsetX, offsetY} = nativeEvent
        drawingPathRef.current.moveTo(offsetX, offsetY)
        drawingPathRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke(drawingPathRef.current)
        setIsDrawing(true)
        nativeEvent.preventDefault()
    }
    const draw = ({nativeEvent}) => {
        if (!isDrawing) {
            return
        }
        const {offsetX, offsetY} = nativeEvent
        drawingPathRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke(drawingPathRef.current)
        nativeEvent.preventDefault()
    }
    const stopDrawing = () => {
        setIsDrawing(false)
    }
    const setToErase = () => {
        drawingPathRef.current = new Path2D()
        contextRef.current.drawImage(imageRef.current, 0, 0, sizePhoto[0], sizePhoto[1])
    }

    function getFilterChange(safeFilter) {
        if (contextRef.current) {
            contextRef.current.filter = safeFilter
            contextRef.current.drawImage(imageRef.current, 0, 0, sizePhoto[0], sizePhoto[1])
            contextRef.current.stroke(drawingPathRef.current)
        }
    }

    function changeColorSize(size, color) {
        drawingPathRef.current = new Path2D()
        contextRef.current.strokeStyle = color
        contextRef.current.lineWidth = size
    }

    return (
        <div className="drawing__container">
            <UploadImage setFile={setFile}/>
            {file === null ? <div className="drawing__wait_image"></div> :
                <div className="drawing__image_upload">
                    <BrushConfig changeColorSize={changeColorSize}/>
                    <button className="drawing__button_clear" onClick={setToErase}>
                        Clear draw
                    </button>
                    <Filter getFilterChange={getFilterChange}/>
                    <DownloadImage canvas={canvasRef}/>
                    <div className="drawing__main_image">
                        <canvas className="drawing__canvas_container"
                                ref={canvasRef}
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}>
                        </canvas>
                    </div>
                </div>
            }
        </div>
    )
}

export default Drawing


import React, {useRef, useState} from 'react'
import DownloadImage from './DownloadImage/DownloadImage'
import UploadImage from './UploadImage/UploadImage'
import Filter from './Filter/Filter'
import BrushConfig from './Drawing/ChooseColorSizeBrush/BrushConfig'
import Drawing from './Drawing/Drawing'
import './Drawing/Drawing.css'

function SettingsPanel() {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const imageRef = useRef(null)
    const drawingPathRef = useRef(null)
    const [file, setFile] = useState(null)
    const [sizePhoto, setSizePhoto] = useState()
    const [pencilDrawingPass,setPencilDrawingPass]=useState([])
    const [settingDraw,setSettingDraw]=useState([[5,'black']])

    const setToErase = () => {
        drawingPathRef.current = new Path2D()
        contextRef.current.drawImage(imageRef.current, 0, 0, sizePhoto[0], sizePhoto[1])
        setPencilDrawingPass([])
        setSettingDraw(settingDraw.slice(-1))
    }
    function getFilterChange(safeFilter) {
        if (contextRef.current) {
            contextRef.current.filter = safeFilter
            contextRef.current.drawImage(imageRef.current, 0, 0, sizePhoto[0], sizePhoto[1])
            pencilDrawingPass.map((a,b)=>{
                contextRef.current.lineWidth = settingDraw[b][0]
                contextRef.current.strokeStyle = settingDraw[b][1]
                contextRef.current.stroke(a)
            })
       }
    }
    return (
        <div className="settings_panel__container">
            <UploadImage setFile={setFile}/>
            {file === null ? <div className="settings_panel__wait_image"></div> :
                <div className="settings_panel__image_upload">
                    <BrushConfig
                        contextRef={contextRef}
                        drawingPathRef={drawingPathRef}
                        setSettingDraw={setSettingDraw}
                        settingDraw={settingDraw}
                    />
                    <button className="settings_panel__button_clear" onClick={setToErase}>
                        Clear draw
                    </button>
                    <Filter getFilterChange={getFilterChange}/>
                    <DownloadImage canvas={canvasRef}/>
                    <Drawing
                        canvasRef={canvasRef}
                        contextRef={contextRef}
                        imageRef={imageRef}
                        drawingPathRef={drawingPathRef}
                        file={file}
                        setSizePhoto={setSizePhoto}
                        pencilDrawingPass={pencilDrawingPass}
                        setPencilDrawingPass={setPencilDrawingPass}
                        settingDraw={settingDraw}
                    />
                </div>
            }
        </div>
    )
}
export default SettingsPanel
import React, {useEffect,  useState} from 'react'
import OptionsSizePhoto from '../../Options/OptionsSizePhoto'
import SaveDrawing from '../../Options/SaveDrawing'

function Drawing ({canvasRef,contextRef,imageRef,drawingPathRef,file,setSizePhoto,pencilDrawingPass,setPencilDrawingPass,settingDraw}){
    const [isDrawing, setIsDrawing] = useState(false)
    const [height,setHeight]=useState()
    const [width,setWidth]=useState()
    const[sizeStyle,setSizeStyle]=useState()
    const[configXY,setConfigXY]=useState()

    useEffect(() => {
        drawingPathRef.current = new Path2D()
        const image = new Image()
        image.src = file
        image.onload = () => {
            OptionsSizePhoto(image,setWidth,setHeight,setSizePhoto,setSizeStyle,setConfigXY)
            const canvas = canvasRef.current
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
    }, [file,height,width])

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent
        const setX=Math.abs((width/configXY[0])*offsetX)
        const setY=Math.abs((height/configXY[1])*offsetY)
        drawingPathRef.current.moveTo(setX, setY)
        drawingPathRef.current.lineTo(setX, setY)
        contextRef.current.stroke(drawingPathRef.current)
        setIsDrawing(true)
        nativeEvent.preventDefault()
    }
    const draw = ({nativeEvent}) => {
        if (!isDrawing) {return}
        const {offsetX, offsetY} = nativeEvent
        const setX=Math.abs((width/configXY[0])*offsetX)
        const setY=Math.abs((height/configXY[1])*offsetY)
        drawingPathRef.current.lineTo(setX, setY)
        contextRef.current.stroke(drawingPathRef.current)
        nativeEvent.preventDefault()
    }
    const stopDrawing = () => {
        setIsDrawing(false)
        SaveDrawing(pencilDrawingPass,setPencilDrawingPass,settingDraw,drawingPathRef)
    }
    return(
        <div className="drawing__main_image">
            <canvas className="drawing__canvas_container"
                    ref={canvasRef}
                    style={sizeStyle}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}>
            </canvas>
        </div>
    )
}
export default Drawing
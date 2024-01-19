

function SaveDrawing(pencilDrawingPass,setPencilDrawingPass,settingDraw,drawingPathRef){
    if(pencilDrawingPass.length===0 && pencilDrawingPass.length!==settingDraw.length) {
    setPencilDrawingPass([drawingPathRef.current])
    }else if(pencilDrawingPass.length!==settingDraw.length){
    setPencilDrawingPass([...pencilDrawingPass,drawingPathRef.current])
    }
}

export default SaveDrawing
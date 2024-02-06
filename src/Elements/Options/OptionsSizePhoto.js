import React from "react"

function OptionSizePhoto(image,setWidth,setHeight,setSizePhoto,setSizeStyle,setConfigXY){

       let heightStyle=500
       let widthStyle=500/(image.naturalHeight/image.naturalWidth)
       let height=image.naturalHeight
       let width=image.naturalWidth
       setWidth(width)
       setHeight(height)
       setSizePhoto([width,height])
       setConfigXY([widthStyle,heightStyle])
       setSizeStyle({
           width: `${widthStyle}px`,
           height:`${heightStyle}px`
       })

}

export default OptionSizePhoto
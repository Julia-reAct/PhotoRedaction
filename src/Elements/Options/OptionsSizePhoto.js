import React from "react"

function OptionSizePhoto(image,setWidth,setHeight,setSizePhoto,setSizeStyle,setConfigXY){
   if(image.naturalWidth>image.naturalHeight){
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
   }else{
       let heightStyle=500/(image.naturalWidth/image.naturalHeight)
       let widthStyle=500
       let height=image.naturalHeight
       let width=image.naturalWidth
       setHeight(height)
       setWidth(width)
       setSizePhoto([width,height])
       setConfigXY([widthStyle,heightStyle])
       setSizeStyle({
           width: `${widthStyle}px`,
           height:`${heightStyle}px`
       })
   }
}

export default OptionSizePhoto
import React from "react"
import  {useForm}  from "react-hook-form";

function BrushConfig({contextRef,drawingPathRef,setSettingDraw,settingDraw}) {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) =>{
        let size = Number(data.size)
        let color = data.color
        if (typeof size !== "undefined") {
            changeColorSize(size,color)
        }
    }
    function changeColorSize(size, color) {
        if(settingDraw[settingDraw.length-1][0]!=size||settingDraw[settingDraw.length-1][1]!=color) {
            setSettingDraw([...settingDraw, [size, color]])
            drawingPathRef.current = new Path2D()
            contextRef.current.strokeStyle = color
            contextRef.current.lineWidth = size
        }
    }

    return (
        <form className="BrushConfig__form" onSubmit={handleSubmit(onSubmit)}>
            <select className="BrushConfig__select"  {...register("size")}>
                <option className="BrushConfig__option" value="1">1px</option>
                <option className="BrushConfig__option" value="5">5px</option>
                <option className="BrushConfig__option" value="10">10px</option>
                <option className="BrushConfig__option" value="15">15px</option>
                <option className="BrushConfig__option" value="20">20px</option>
            </select>
            <select className="BrushConfig__select"  {...register("color")}>
                <option className="BrushConfig__option" value="black">black</option>
                <option className="BrushConfig__option" value="red">red</option>
                <option className="BrushConfig__option" value="green">green</option>
                <option className="BrushConfig__option" value="blue">blue</option>
                <option className="BrushConfig__option" value="white">white</option>
            </select>
            <input className="BrushConfig__input"  type="submit" value="Save"/>
        </form>
    )
}
export default BrushConfig


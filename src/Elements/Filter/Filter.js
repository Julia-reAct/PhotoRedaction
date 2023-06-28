import React, {useEffect, useRef, useState } from 'react';
import Slider from './Slider'
import SidebarItem from './SideBarItem'
import {defaultOptions} from './Options'


function Filter( ){
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const imageRef = useRef(null);

    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
    const [options, setOptions] = useState(defaultOptions)
    const selectedOption = options[selectedOptionIndex]

    const [isDrawing, setIsDrawing] = useState(false);

    let safeFilter

    const [file, setFile] = useState(null);

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }


    useEffect(() => {
        const image = new Image();
        image.src = file;
        const canvas = canvasRef.current
        canvas.width = 500;
        canvas.height = 500;
        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context;
        image.onload = () => {
            context.drawImage(image, 0, 0,500,500)
        }
        imageRef.current = image;

    }, [file]);


    function handleSliderChange({ target }) {
        setOptions(prevOptions => {
            return prevOptions.map((option, index) => {
                if (index !== selectedOptionIndex) return option
                return { ...option, value: target.value }
            })
        })
        safeFilter=(getImageStyle().filter)
        contextRef.current.filter=safeFilter
        contextRef.current.drawImage(imageRef.current, 0 , 0, 500 , 500 )
    }

    function getImageStyle() {
        const filters = options.map(option => {
            return `${option.property}(${option.value}${option.unit})`
        })
        return { filter: filters.join(' ') }
    }


    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        setIsDrawing(true);
        nativeEvent.preventDefault();
    };

    const draw = ({nativeEvent}) => {
        if(!isDrawing) {
            return;
        }
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        nativeEvent.preventDefault();
    };

    const stopDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const setToDraw = () => {
        contextRef.current.globalCompositeOperation = 'source-over';
    };

    const setToErase = () => {
        contextRef.current.globalCompositeOperation = 'destination-out';
    };

    const saveImageToLocal = (event) => {
        let link = event.currentTarget;
        link.setAttribute('download', 'canvas.png');
        let image = canvasRef.current.toDataURL('image/png');
        link.setAttribute('href', image);
    };


    return (
        <div className="container">
            <h2>Add Image:</h2>
            <input type="file" onChange={handleChange} />
            {file === null ? <div></div> :
                <div>
                <button onClick={setToDraw}>
                    Draw
                </button>
                <button onClick={setToErase}>
                Erase
                </button>
                </div>
            }
            <div className="main-image"   >
                <canvas className="canvas-container"
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}>
                </canvas>
            </div>
            {file === null ? <div></div> :
                <div>
            <div className="sidebar">
                {options.map((option, index) => {
                    return (
                        <SidebarItem
                            key={index}
                            name={option.name}
                            active={index === selectedOptionIndex}
                            handleClick={() => setSelectedOptionIndex(index)}
                        />
                    )
                })}
            </div>
            <Slider
                min={selectedOption.range.min}
                max={selectedOption.range.max}
                value={selectedOption.value}
                handleChange={handleSliderChange}
            />
            <a id="download_image_link" href="download_link" download onClick={saveImageToLocal}>Download Image</a>
                </div>
            }
        </div>
    )
}

export default Filter;
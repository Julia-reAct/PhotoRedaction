import React, {useEffect, useState} from 'react'
import {defaultOptions} from "../Options/Options"
import SidebarItem from "../SideBarItem/SideBarItem"
import Slider from "../Slider/Slider"

function Filter({getFilterChange}){
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
    const [options, setOptions] = useState(defaultOptions)
    const selectedOption = options[selectedOptionIndex]
    let safeFilter

    useEffect(() => {
        safeFilter = (getImageStyle().filter)
        getFilterChange(safeFilter)
    }, [options]);

    function handleSliderChange({target}) {
        setOptions(prevOptions => {
            return prevOptions.map((option, index) => {
                if (index !== selectedOptionIndex) return option
                return {...option, value: target.value}
            })
        })
    }

    function getImageStyle() {
        const filters = options.map(option => {
            return `${option.property}(${option.value}${option.unit})`
        })
        return {filter: filters.join(' ')}
    }

    function resetFilter(){
        setOptions(defaultOptions)
    }

    return(
        <div className="filter">
            <div className="filter__sidebar">
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
            <button className="drawing__button_clear" onClick={resetFilter}>
                reset all filters
            </button>
        </div>
    )

}
export default Filter
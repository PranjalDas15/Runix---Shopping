import React, { useState } from 'react'

interface SliderProps {
    min: number,
    max: number,
    step: number
}

const Slider: React.FC<SliderProps> = ( { min, max, step} ) => {
    const [value, setValue] = useState(min)
    const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
    }
  return (
    <div className="w-full py-5">
        <p className='py-2'>Show Products Under <span className='font-semibold'>₹{value}</span></p>
        <input onChange={handleSlider} 
            type='range'
            value={value}
            min={min} 
            step={step} 
            max={max}
            className="w-full accent-orange-400 "/>
        </div>
  )
}

export default Slider
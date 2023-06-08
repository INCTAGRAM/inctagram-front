import Slider from '@mui/material/Slider'
import React from 'react'
import styles from '@/modules/createPost/components/croppingPhotoPopup/controlCroppingElements/ControlCroppingElements.module.scss'

interface IControlSliderProps {
  zoom: number
  setZoom: (zoom: number) => void
}

export const ControlSlider = ({ zoom, setZoom }: IControlSliderProps) => {
  const onChangeSlider = (event: Event, value: number | number[]) => {
    if (typeof value === 'number') setZoom(value / 100)
  }

  return (
    <div className={`${styles.popupControlElement} ${styles.zoomControlElement}`}>
      <Slider
        size="small"
        defaultValue={100}
        value={zoom * 100}
        onChange={onChangeSlider}
        min={100}
        max={300}
        aria-label="Small"
        valueLabelDisplay="off"
      />
    </div>
  )
}

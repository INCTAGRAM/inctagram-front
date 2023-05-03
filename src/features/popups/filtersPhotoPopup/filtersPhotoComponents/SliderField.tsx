import { Box, Slider } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { FilterContext } from '@/features/popups/filtersPhotoPopup/FiltersPhotoPopup'
import { SliderType } from '@/features/popups/filtersPhotoPopup/filtersPhotoComponents/CustomFilter'

export const SliderField = ({ slide }: { slide: SliderType }) => {
  const { label, defaultValue, field } = slide
  const [value, setValue] = useState(defaultValue)
  const { customFilter, setCustomFilter } = useContext(FilterContext)

  useEffect(() => {
    setCustomFilter({ ...customFilter, [field]: value })
  }, [value])

  const handleSliderValue = (e: Event | any) => {
    if (e.target) {
      setValue(e.target.value)
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
      <Box sx={{ minWidth: '6rem', color: '#FFFFFF' }}>{label}</Box>
      <Slider size="small" valueLabelDisplay="auto" value={value} onChange={handleSliderValue} max={200} />
    </Box>
  )
}

import { Box, Slider } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { FilterContext } from '@/features/popups/filtersPhotoPopup/FiltersPhotoPopup'

export const SliderField = ({ slide }: any) => {
  const { label, defaultValue, field } = slide
  const [value, setValue] = useState(defaultValue)
  const { customFilter, setCustomFilter } = useContext(FilterContext)

  useEffect(() => {
    setCustomFilter({ ...customFilter, [field]: value })
  }, [value])

  const handleSliderValue = (e: any) => {
    if (e.target.value) {
      setValue(e.target.value)
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
      <Box sx={{ minWidth: '6rem' }}>{label}</Box>
      <Slider size="small" valueLabelDisplay="auto" value={value} onChange={handleSliderValue} max={200} />
    </Box>
  )
}

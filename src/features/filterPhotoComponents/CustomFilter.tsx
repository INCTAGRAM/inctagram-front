import { Box } from '@mui/material'
import { SliderField } from '@/features/filterPhotoComponents/SliderField'

export type SliderType = {
  label: string
  defaultValue: number
  field: string
}

export const CustomFilter = () => {
  const slider: SliderType[] = [
    { label: 'Contrast', defaultValue: 100, field: 'contrast' },
    { label: 'Brightness', defaultValue: 100, field: 'brightness' },
    { label: 'Saturation', defaultValue: 100, field: 'saturate' },
    { label: 'Sepia', defaultValue: 0, field: 'sepia' },
    { label: 'Gray Scale', defaultValue: 0, field: 'gray' },
  ]
  return (
    <Box sx={{ marginTop: '2rem' }}>
      {slider.map((slide: SliderType) => (
        <SliderField slide={slide} key={slide.field} />
      ))}
    </Box>
  )
}

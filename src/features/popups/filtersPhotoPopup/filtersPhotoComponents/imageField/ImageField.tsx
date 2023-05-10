import { Box, Grid } from '@mui/material'
import { styled } from '@mui/system'
import { forwardRef, Ref, useContext } from 'react'
import { FilterContext } from '@/features/popups/filtersPhotoPopup/FiltersPhotoPopup'
import style from './Instagram.module.css'
import { CustomFilterType } from '@/features/popups/filtersPhotoPopup/types'

const StyleBox = styled(Box)({
  background: '#ddd',
  minHeight: '20rem',
  maxHeight: '100vh',
  marginBottom: '1rem',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const StyledImage = styled('img')((props: { customFilter: Partial<CustomFilterType> }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  filter: `contrast(${props.customFilter.contrast}%) brightness(${props.customFilter.brightness}%) saturate(${props.customFilter.saturate}%) sepia(${props.customFilter.sepia}%) grayScale(${props.customFilter.gray}%)`,
}))

type ImageFieldPropsType = {
  imageFile: string
}

const Image = ({ imageFile }: ImageFieldPropsType, ref: Ref<HTMLImageElement>) => {
  const { filterClass, customFilter } = useContext(FilterContext)
  console.log('filterClass', filterClass)
  console.log('customFilter', customFilter)
  return (
    <Grid item xs={12} md={7}>
      <StyleBox>
        <figure style={{ width: '100%', height: '480px' }}>
          <StyledImage
            customFilter={!filterClass ? customFilter : {}}
            className={style[filterClass]}
            src={imageFile}
            alt=""
            ref={ref}
          />
        </figure>
      </StyleBox>
    </Grid>
  )
}

export const ImageField = forwardRef(Image)

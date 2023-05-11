import { Box, Grid } from '@mui/material'
import { styled } from '@mui/system'
import { forwardRef, Ref } from 'react'
import style from './Instagram.module.css'
import { useAppSelector } from '@/utils/reduxUtils'

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

const StyledImage = styled('img')(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
}))

type ImageFieldPropsType = {
  imageFile: string
}

const Image = ({ imageFile }: ImageFieldPropsType, ref: Ref<HTMLImageElement>) => {
  const activeIndexImage = useAppSelector((state) => state.createPostReducer.activeImage)
  const filterParametrs = useAppSelector((state) => state.createPostReducer.filterParameters)

  const filterClass = filterParametrs[activeIndexImage] || ''

  return (
    <Grid item xs={12} md={7}>
      <StyleBox>
        <figure style={{ width: '100%', height: '480px' }}>
          <StyledImage className={style[filterClass]} src={imageFile} alt="" ref={ref} data-filterClass={filterClass} />
        </figure>
      </StyleBox>
    </Grid>
  )
}

export const ImageField = forwardRef(Image)

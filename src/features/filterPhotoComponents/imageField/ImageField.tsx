import { Box, Grid } from '@mui/material'
import { styled } from '@mui/system'
import { ChangeEvent, useContext, useRef, useState } from 'react'
import { CustomFilterType, FilterContext } from '@/features/popups/filtersPhotoPopup/FiltersPhotoPopup'
import style from './Instagram.module.css'

const StyleBox = styled(Box)({
  background: '#ddd',
  minHeight: '20rem',
  maxHeight: '100vh',
  marginBottom: '1rem',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
})

const StyledImage = styled('img')((props: { customFilter: Partial<CustomFilterType> }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  filter: `contrast(${props.customFilter.contrast}%) brightness(${props.customFilter.brightness}%) saturate(${props.customFilter.saturate}%) sepia(${props.customFilter.sepia}%) grayScale(${props.customFilter.gray}%)`,
}))

export const ImageField = () => {
  const uploadInputRef = useRef<HTMLInputElement>(null)
  const imgResultRef = useRef(null)
  const [imageFile, setImageFile] = useState('')
  const { filterClass, customFilter } = useContext(FilterContext)
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setImageFile(URL.createObjectURL(e.target.files[0]))
    }
  }

  // const handleDownloadImage = () => {м
  //   domtoimage
  //     .toBlob(imgResultRef.current)
  //     .then(function (blob) {
  //       saveAs(blob, 'result.png')
  //     })
  //     .catch(function (error) {
  //       console.error('ooops, something went wrong!', error)
  //     })
  // }

  const renderImage = () => (
    <figure style={{ width: '100%', height: '480px' }}>
      <StyledImage
        customFilter={!filterClass ? customFilter : {}}
        className={style[filterClass]}
        src={imageFile}
        alt=""
        ref={imgResultRef}
      />
    </figure>
  )
  const onClickHandler = () => {
    if (uploadInputRef.current) {
      uploadInputRef.current.click()
    }
  }
  return (
    <Grid item xs={12} md={7}>
      <StyleBox onClick={onClickHandler}>{imageFile ? renderImage() : <p>Upload Image</p>}</StyleBox>
      <input onChange={handleChangeInput} ref={uploadInputRef} type="file" accept="image/*" hidden />
      {/*<Button onClick={handleDownloadImage} disabled={!imageFile} variant="contained" fullWidth>*/}
      {/*  Download Image*/}
      {/*</Button>*/}
    </Grid>
  )
}

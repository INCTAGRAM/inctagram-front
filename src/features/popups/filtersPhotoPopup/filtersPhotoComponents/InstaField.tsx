import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Box } from '@mui/system'
import { filterValues } from '@/constants/filterValues'
import { useAppDispatch, useAppSelector } from '@/utils/reduxUtils'
import { addFilterParams } from '@/services/redux/createPostReducer'

export const InstaField = () => {
  const activeIndexImage = useAppSelector((state) => state.createPostReducer.activeImage)
  const arrFilterClass = useAppSelector((state) => state.createPostReducer.filterParameters)
  const changedFilterClass = arrFilterClass[activeIndexImage] || ''
  const dispatch = useAppDispatch()

  const handleChange = (e: SelectChangeEvent) => {
    const filterClass = e.target.value
    dispatch(addFilterParams({ imageIndex: activeIndexImage, filterClass: filterClass }))
  }

  return (
    <Box sx={{ maxWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel>Filter</InputLabel>
        <Select onChange={handleChange} value={changedFilterClass} label="Filter" sx={{ backgroundColor: '#ffffff' }}>
          {filterValues.map((filter) => (
            <MenuItem value={filter.class} key={filter.class}>
              {filter.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

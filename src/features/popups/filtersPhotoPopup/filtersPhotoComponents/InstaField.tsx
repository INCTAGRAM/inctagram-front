import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Box } from '@mui/system'
import { useContext } from 'react'
import { filterValues } from '@/constants/filterValues'
import { FilterContext } from '@/features/popups/filtersPhotoPopup/FiltersPhotoPopup'

export const InstaFitler = () => {
  const { filterClass, setFilterClass } = useContext(FilterContext)

  const handleChange = (e: SelectChangeEvent) => setFilterClass(e.target.value)

  return (
    <Box sx={{ maxWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel>Filter</InputLabel>
        <Select onChange={handleChange} value={filterClass} label="Filter" sx={{ backgroundColor: '#ffffff' }}>
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

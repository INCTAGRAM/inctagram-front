import { Box, Tab, Tabs } from '@mui/material'
import { SyntheticEvent, useContext } from 'react'
import { FilterContext } from '@/features/popups/filtersPhotoPopup/FiltersPhotoPopup'

export const FilterTabs = () => {
  const { tabFilter, setTabFilter, setFilterClass } = useContext(FilterContext)

  const handleChange = (e: SyntheticEvent<Element, Event>, newValue: string) => {
    setTabFilter(newValue)
    if (newValue === 'customFilter') {
      setFilterClass('')
    }
  }

  return (
    <Box sx={{ marginBottom: '2rem', color: '#FFFFFF' }}>
      <Tabs value={tabFilter} onChange={handleChange} textColor="inherit" indicatorColor="primary">
        <Tab value="instaFilter" label="Instagram Filter" />
        <Tab value="customFilter" label="Custom Filter" />
      </Tabs>
    </Box>
  )
}

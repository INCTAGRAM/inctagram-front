import Skeleton from '@mui/material/Skeleton'

export const SkeletonDevice = () => {
  return (
    <>
      <Skeleton variant="text" width={100} sx={{ bgcolor: '#171717', fontSize: '2rem' }} />
      <Skeleton variant="rectangular" width={726} height={120} sx={{ bgcolor: '#171717' }} />
    </>
  )
}

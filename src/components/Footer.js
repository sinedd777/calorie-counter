import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      mt="5px"
      pt="10px"
      bgcolor='#2a3eb1'
      sx={{
        color: 'white'
      }}
    >
      <Stack gap="5px" alignItems="center" px="40px" pt="24px">
        <Typography variant='h5' mt='20px'>
          Calorie Tracker
        </Typography>
        <Typography variant='h6' pb='40px' mt='20px'>
          Made with ❤ by Toptal
        </Typography>
      </Stack>
    </Box>
  )
}

export default Footer
import React from 'react';
import { Spinner, AbsoluteCenter, Box } from '@chakra-ui/react';

const LoadingSpinner = () => {
  return (
    <Box position='relative' minHeight='100vh'>
      <AbsoluteCenter p='4' axis='both'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='pink.500'
          size='xl'
        />
      </AbsoluteCenter>
    </Box>
  )
}

export default LoadingSpinner;
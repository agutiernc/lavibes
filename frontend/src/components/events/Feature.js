import React from 'react';
import {
  Box,
  VStack,
  chakra,
  GridItem,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';

// Component to be used in EventsDetails.js

const Feature = ({ heading, icon, text1, text2 }) => {
  const textColor = useColorModeValue('black', 'white');
  const headingColor = useColorModeValue('pink.700', 'pink.400');

  return (
    <GridItem textAlign={'center'}>
      <chakra.h3 fontSize="xl" fontWeight="600" color={headingColor}>
        <Icon as={icon} color={headingColor} /> {heading}
      </chakra.h3>

      <VStack fontSize={'14px'} color={textColor}>
        <Box>{text1}</Box>
        <Box>{text2}</Box>
      </VStack>
    </GridItem>
  );
};

export default Feature;
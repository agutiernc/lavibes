import React from 'react';
import { FaGithub } from 'react-icons/fa'
import {
  Box,
  Container,
  Stack,
  Text,
  Icon,
  Center,
  Link,
  Flex
} from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      bg={'pink.700'}
      color={'white'}
      width={'100%'}
      position="fixed"
      bottom={0}
      left={0}
    >
      <Center>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'center' }}
          align={{ base: 'center', md: 'center', lg: 'center' }}
        >
          <Flex justifyContent="space-between" alignItems="center" fontSize={['0.7rem', '0.9rem']}>
            <Text textAlign="center" mr={2}>
              By Alfonso Gutierrez
            </Text>
            <Link href="https://github.com/agutiernc/capstone2">
              <Icon as={FaGithub} mx={3} boxSize={5} />
            </Link>
            <Text ml={2}>All rights reserved © 2023</Text>
          </Flex>
        </Container>
      </Center>
    </Box>
  );
}

export default Footer;
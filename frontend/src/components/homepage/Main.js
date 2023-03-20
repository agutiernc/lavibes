import React from 'react';
import ImageCarousel from './ImageCarousel';
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
} from '@chakra-ui/react';

const Main = () => {
  return (
    <Box
      bgImage="url('/images/background-concert.jpg')"
      bgSize="cover"
      backgroundPosition="center"
      bgRepeat="no-repeat"
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      right={0}
      zIndex={-1}
      width="100vw"
      height="100vh"
    >
      <Container
        maxW={'7xl'}
        zIndex="2"
        position="relative"
        mt={7}
      >
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={2.1}
              fontWeight={600}
            >
              <Text
                as={'span'}
                color={'white'}
                position={'relative'}
                fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
                textShadow='0px 0px 5px white'
                _after={{
                  content: "''",
                  width: 'full',
                  height: '20%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'pink.600',
                  zIndex: -1,
                }}
              >
                Los Angeles County,
              </Text>
              <br />
              <Text
                as={'span'}
                color={'pink.600'}
                fontSize={{ base: '2xl', sm: '3xl', lg: '5xl' }}
                textShadow="0px 0px 10px white"
              >
                Free Summer Concerts
              </Text>
            </Heading>
            <Text color={'white'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: 'column', sm: 'row' }}
            >
              <Button
                boxShadow={'0px 0px 6px white'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                colorScheme={'red'}
                bg={'pink.600'}
                _hover={{ bg: 'pink.500' }}
              >
                See Concerts Near You
              </Button>
              <Button
                boxShadow={'0px 0px 8px white'}
                _hover={{ bg: 'pink.500', color: 'white' }}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
              >
                Sign Up
              </Button>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w={'full'}
          >
            <Box
              position={'relative'}
              height={'300px'}
              rounded={'2xl'}
              boxShadow="0 0 10px 3px white"
              width={'90%'}
              overflow={'hidden'}
            >
              <ImageCarousel
                
              />
            </Box>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}

export default Main;
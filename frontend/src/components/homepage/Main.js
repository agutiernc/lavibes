import React, { useContext,  useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../user/UserContext';
import ImageCarousel from './ImageCarousel';
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Wrap
} from '@chakra-ui/react';

const Main = () => {
  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate();

  // redirect currently logged user to events page
  useEffect(() => {
    if (currentUser) {
      return navigate('/events')
    }
  }, [currentUser, navigate])

  
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
      boxShadow={"inset 0 0 0 1000px rgba(0, 0, 0, 0.2)"}
      mb={{ base: '3rem', md: '6rem' }} 
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
                textShadow='0px 0px 3px white'
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
                color={'pink.700'}
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                textShadow={{
                  base: "0px 0px 3px white",
                  md: "0px 0px 7px white",
                  lg: "0px 0px 8px white",
                }}
                fontWeight={'bolder'}
              >
                Free Summer Concerts
              </Text>
            </Heading>
            <Wrap>
            <Text 
              color={'white'} 
              fontSize={["sm", "md", "lg"]} 
              fontWeight={'bold'} 
              textShadow={{
                base: "0px 0px 6px black",
                md: "0px 0px 7px black",
                lg: "0px 0px 8px black",
                }}
              >
                Don't miss out on any of the free concerts happening in LA County this summer!
                Sign up for an account to save your favorite events. 
            </Text>
            </Wrap>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: 'column', sm: 'row' }}
              alignItems="center"
            >
              <Link to={'/events'}>
                <Button
                  boxShadow={'0px 0px 7px white'}
                  size={'lg'}
                  fontWeight={'normal'}
                  px={6}
                  colorScheme={'red'}
                  bg={'pink.600'}
                  _hover={{ bg: 'pink.500' }}
                  color={'white'}
                >
                  See Concerts Near You
                </Button>
              </Link>
              <Link to={'/signup'}>
                <Button
                  boxShadow={'0px 0px 7px white'}
                  _hover={{ bg: 'pink.500', color: 'white' }}
                  size={'lg'}
                  fontWeight={'normal'}
                  px={6}
                  bg={'pink.600'}
                  color={'white'}
                >
                  Sign Up
                </Button>
              </Link>
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
              height={[130, 200, 300]}
              rounded={'2xl'}
              boxShadow="0 0 10px 3px white"
              w={['60%', '70%', '90%']}
              overflow={'hidden'}
            >
              <ImageCarousel />
            </Box>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}

export default Main;
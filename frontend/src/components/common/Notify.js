import React from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';

const Notify = ({ message }) => {
  if (message.type === 'success') {
    return (
      <Alert status='success' rounded={'lg'}>
        <AlertIcon /> {message.msg}
      </Alert>
    );
  } else if (message.type === 'error') {
    return (
      <Alert status='error' rounded={'lg'}>
        <AlertIcon /> {message.msg}
      </Alert>
    );
  } else {
    return;
  }
}

export default Notify;
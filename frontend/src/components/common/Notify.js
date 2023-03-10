import React from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';

const Notify = ({ message }) => {
  if (message.type === 'success') {
    return (
      <Alert status='success'>
        <AlertIcon /> {message.msg}
      </Alert>
    );
  } else if (message.type === 'error') {
    return (
      <Alert status='error'>
        <AlertIcon /> {message.msg}
      </Alert>
    );
  } else {
    return;
  }
}

export default Notify;
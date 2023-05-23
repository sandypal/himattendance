import React from 'react';
import {Avatar, Box, Center, HStack, Square, Text} from 'native-base';

import Layout from '../../layout';

const Profile = () => {
  return (
    <Layout>
      <Center>
        <Avatar
          bg="amber.500"
          size="xl"
          source={{
            uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          }}>
          TS
        </Avatar>
        <Text fontSize="3xl" fontWeight="bold">
          Sophie Jews
        </Text>
        <Text fontSize="lg">Product Manager</Text>
        <Box w="100%">
          <HStack justifyContent="space-between" my={5}>
            <Square p={2} size="110px" bg="white" shadow={1} rounded="md">
              <Text fontSize="3xl" fontWeight="bold">
                2
              </Text>
              <Text fontSize="sm" fontWeight="normal">
                Applied
              </Text>
            </Square>
            <Square p={2} size="110px" bg="white" shadow={1} rounded="md">
              <Text fontSize="3xl" fontWeight="bold">
                2
              </Text>
              <Text fontSize="sm" fontWeight="normal">
                Remained
              </Text>
            </Square>
            <Square p={2} size="110px" bg="white" shadow={1} rounded="md">
              <Text fontSize="3xl" fontWeight="bold">
                1
              </Text>
              <Text fontSize="sm" fontWeight="normal">
                Approved
              </Text>
            </Square>
          </HStack>
          <Square p={3} bg="white" shadow={1} rounded="md" mb={20}>
            <Box w="100%">
              <Text fontSize="xl" mb={2} fontWeight="semibold">
                About
              </Text>
            </Box>
            <Text fontSize="md">
              Sophie Jews is an accomplished Product Manager with a diverse
              background and a passion for creating innovative solutions. With
              several years of experience in the tech industry, Sophie has
              established herself as a leader in driving product development and
              managing successful product launches.
            </Text>
          </Square>
        </Box>
      </Center>
    </Layout>
  );
};

export default Profile;

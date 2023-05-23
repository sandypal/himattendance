import {HStack, Square, Text} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import Layout from '../../layout';
import dayjs from 'dayjs';

const Attendance = () => {
  const [tableData, setTableData] = useState([
    ['01-05-2023', 'Present'],
    ['02-05-2023', 'Present'],
    ['03-05-2023', 'Present'],
    ['04-05-2023', 'Present'],
    ['05-05-2023', 'Present'],
    ['06-05-2023', 'Present'],
    ['07-05-2023', 'Present'],
    ['08-05-2023', 'Present'],
    ['09-05-2023', 'Present'],
    ['10-05-2023', 'Present'],
    ['11-05-2023', 'Present'],
    ['12-05-2023', 'Present'],
    ['13-05-2023', 'Present'],
    ['14-05-2023', 'Absent'],
    ['15-05-2023', 'Present'],
    ['16-05-2023', 'Present'],
    ['17-05-2023', 'Present'],
    ['18-05-2023', 'Absent'],
    ['19-05-2023', 'Absent'],
    ['20-05-2023', 'Present'],
    ['21-05-2023', 'Present'],
    ['22-05-2023', 'Present'],
    ['23-05-2023', ''],
    ['24-05-2023', ''],
    ['25-05-2023', ''],
    ['26-05-2023', ''],
    ['27-05-2023', ''],
    ['28-05-2023', ''],
    ['29-05-2023', ''],
    ['30-05-2023', ''],
  ]);

  return (
    <Layout>
      <Text textAlign="center" my={4} fontSize="2xl">
        Attendance for {dayjs().format('MMMM-YYYY')}
      </Text>
      <Square w="100%" p={5} bg="white" shadow={1} rounded="md" mb={100}>
        {tableData?.map((data, i) => (
          <HStack key={i} mb={3} w="90%" justifyContent="space-around">
            <Text
              fontSize="lg"
              color={data[1] === 'Absent' ? 'red.400' : 'gray.600'}>
              {data[0]}
            </Text>
            <Text
              fontSize="lg"
              color={data[1] === 'Absent' ? 'red.400' : 'gray.600'}
              fontWeight="medium">
              {data[1]}
            </Text>
          </HStack>
        ))}
      </Square>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
});

export default Attendance;

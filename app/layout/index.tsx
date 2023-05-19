import React from 'react';
import {ScrollView, View} from 'native-base';

import Footer from './footer';

const Layout = ({children}: any) => {
  return (
    <View flex={1}>
      <ScrollView
        backgroundColor="#F5F7F9"
        px={5}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        {children}
      </ScrollView>
      <Footer />
    </View>
  );
};

export default Layout;

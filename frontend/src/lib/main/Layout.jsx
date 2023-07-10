import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import Footer from './Footer';

export const Layout = ({ children }) => {
  return (
    <div>
      <HeaderContainer />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

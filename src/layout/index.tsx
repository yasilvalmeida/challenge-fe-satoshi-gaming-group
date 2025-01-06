import * as React from 'react';
import { Sidebar } from './sidebar';

const Layout = (props: any) => {
  return (
    <div className='flex flex-col h-screen w-full'>
      <div className='flex-grow flex p-4'>
        <Sidebar />
        <section className='flex overflow-x-auto w-full'>
          {props?.children}
        </section>
      </div>
    </div>
  );
};

export default Layout;

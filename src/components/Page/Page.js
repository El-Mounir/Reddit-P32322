import React from 'react';
import './Page.css';

export const Page = (props) => {
  return <div className={`${props.className} Page`}>{props.children}</div>;
};

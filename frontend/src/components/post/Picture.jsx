import React from 'react';

const Picture = ({ post }) => {
  console.log('post data : ', post);
  return <div>Picture</div>;
};

export default React.memo(Picture);

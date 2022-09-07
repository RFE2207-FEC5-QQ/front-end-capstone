import React from 'react';

const RelatedCardMock = ({ item, onClick }) => {

  const handleRemove = () => {
    onClick(item);
  };

  return (<button onClick={handleRemove}>Related Cards Mock</button>);
};

export default RelatedCardMock;
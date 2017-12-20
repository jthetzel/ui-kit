import React from 'react';
import Container from './Container';
import Item from './Item';

const MenuOuter = (props) => {
  const { value, onClick, options } = props;

  return (
    <Container onClick={e => e.stopPropagation()}>
      {
        options.map(option => (
          <Item
            key={option.value}
            style={{ background: value === option.value ? '#f5f4f5' : '#FFFFFF' }}
            onClick={onClick.bind(null, option.value)}
          >
            {option.label}
          </Item>
        ))
      }
    </Container>
  );
};

export default MenuOuter;

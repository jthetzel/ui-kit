import styled from 'react-emotion';

const Item = styled.li`
  position: relative;
  display: flex;
  list-style-type: none;
  height: 50px;
  padding: 10px;
  box-sizing: border-box;
  align-items: center;
  user-select: none;
  background: ${props => (props.isActive ? '#f5f4f5' : '#FFFFFF')};

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    margin: 0 10px;
    background: ${props => (props.isActive ? '#f5f4f5' : '#faf9fa')};
    content: ' ';
  }

  &:hover {
    color: #223bf2;
    background: #faf9fa;
    cursor: pointer;
  }

  &:last-child {
    &:after {
      background: transparent;
    }
  }
`;

export default Item;

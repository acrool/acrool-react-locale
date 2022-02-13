import styled from 'styled-components/macro';
import {EDirection, ERowAlign} from './types';
import CSS from 'csstype';



const Flex = styled.div<{
    style?: CSS.Properties,
    className?: string,
    direction?: EDirection
    vertical?: ERowAlign; // 垂直
    horizontal?: ERowAlign; // 水平
}>`
  box-sizing: border-box;
  display: flex;
  flex-direction: ${props => props.direction ? props.direction : EDirection.row};
  justify-content: ${props => props.horizontal ? props.horizontal : ERowAlign.start};
  align-items: ${props => props.vertical ? props.vertical : ERowAlign.start};
`;

export default Flex;

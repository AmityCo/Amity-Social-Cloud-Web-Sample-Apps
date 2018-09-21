import styled from 'styled-components';
import { Icon, Dropdown } from 'antd';

export const HeaderContainer = styled.div`
  height: 50px;
  background: #28cb72;
  border-bottom: 1px solid #d4dadf;
  box-shadow: 0 1px 1px 0 rgba(116, 129, 141, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

export const Title = styled.div`
  padding-left: 30px;
  h1 {
    font-size: 18px;
    color: white;
    margin: 0;
  }
`;

export const Setting = styled(Dropdown)`
  display: inline-block;
  padding: 10px 15px;
  margin-left: 15px;
  height: 100%;
  border-left: 1px solid white;
  display: flex;
  align-items: center;
  color: white;
`;

export const DisplayName = styled.div`
  span {
    font-size: 16px;
  }
  height: 100%;
  display: flex;
  align-items: center;
`;

export const StyledIcon = styled(Icon)`
  font-size: 20px;
  cursor: pointer;
`;

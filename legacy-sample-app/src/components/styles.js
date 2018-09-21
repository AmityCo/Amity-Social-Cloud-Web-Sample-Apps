import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
`;

export const Row = styled.div`
  display: flex;
  height: calc(100vh - 50px);
`;

export const ChannelList = styled.div`
  width: 280px;
  display: inline-block;
  background-color: #fff;
  border-right: 1px solid #ececec;
  overflow: scroll;
`;

export const MessageListPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: calc(100% - 280px);
`;

import React from 'react';
import {
  Channel,
  ChannelInfo,
  ChannelTags,
  MemberCount,
  StyledTag,
  StyledButton,
  StyledButtonTop,
} from './styles';

const ChannelList = ({ channels, currentChannelId, joinChannel, leaveChannel }) => {
  return (
    <ul>
      {channels.map(channel => (
        <Channel
          className={`channel-tab ${
            currentChannelId === channel.channelId ? 'active' : 'inactive'
          }`}
          key={channel.channelId}
        >
          <ChannelInfo>
            <h3>{channel.channelId}</h3>
            <MemberCount>
              Member count: <b>{channel.memberCount}</b>
            </MemberCount>
            <ChannelTags>
              {channel.tags && channel.tags.map(tag => <StyledTag key={tag}>{tag}</StyledTag>)}
            </ChannelTags>
          </ChannelInfo>
          {currentChannelId !== channel.channelId ? (
            <StyledButtonTop type="primary" onClick={() => joinChannel(channel.channelId)}>
              Join
            </StyledButtonTop>
          ) : (
            <StyledButton onClick={() => leaveChannel(channel.channelId)}>Leave</StyledButton>
          )}
        </Channel>
      ))}
    </ul>
  );
};

export default ChannelList;

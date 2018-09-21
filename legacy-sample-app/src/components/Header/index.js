import React, { Component } from 'react';
import { Menu, Input } from 'antd';
import { HeaderContainer, Title, Setting, DisplayName, StyledIcon } from './styles';
import { version } from '../../../package.json';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      isMetadata: false,
      shouldShowInput: false,
    };
  }

  toggleInput = value => {
    const { shouldShowInput } = this.state;
    this.setState({
      input: value,
      shouldShowInput: !shouldShowInput,
    });
  };

  handleChangeUser = e => {
    if (!e) return;
    const { changeUser } = this.props;
    const { key: userId } = e;
    changeUser(userId, `${userId}_name`);
  };

  handleDisplayNameChange = e => {
    return this.setState({
      input: e.target.value,
    });
  };

  render() {
    const { displayName, changeDisplayName, changeUserMetadata, metadata } = this.props;
    const { shouldShowInput, input, isMetadata } = this.state;
    const menu = (
      <Menu>
        <Menu.Item onClick={() => this.toggleInput(displayName)}>Change Display Name</Menu.Item>
        <Menu.Divider />
        <Menu.SubMenu title="User Metadata">
          <Menu.Item disabled>{JSON.stringify(metadata)}</Menu.Item>
          <Menu.Divider />
          <Menu.Item
            onClick={() => {
              this.setState({ isMetadata: true });
              this.toggleInput(JSON.stringify(metadata));
            }}
          >
            Change Metadata
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Divider />
        <Menu.SubMenu title="Change User" onClick={this.handleChangeUser}>
          <Menu.Item key="web_switch_user_1">web_switch_user_1_name</Menu.Item>
          <Menu.Item key="web_switch_user_2">web_switch_user_2_name</Menu.Item>
          <Menu.Item key="web_switch_user_3">web_switch_user_3_name</Menu.Item>
        </Menu.SubMenu>
        <Menu.Divider />
        <Menu.Item disabled>Version {version}</Menu.Item>
      </Menu>
    );

    return (
      <HeaderContainer>
        <Title>
          <h1>eko-sdk Sample App</h1>
        </Title>
        <DisplayName>
          <span>
            {shouldShowInput ? (
              <Input
                type="text"
                defaultValue={input}
                onChange={this.handleDisplayNameChange}
                onPressEnter={() => {
                  if (isMetadata) {
                    changeUserMetadata(input);
                  } else {
                    changeDisplayName(input);
                  }
                  this.toggleInput('');
                  this.setState({ isMetadata: false });
                }}
              />
            ) : (
              displayName
            )}
          </span>
          <Setting overlay={menu} placement="bottomRight" trigger={['click']}>
            <StyledIcon type="setting" />
          </Setting>
        </DisplayName>
      </HeaderContainer>
    );
  }
}

export default Header;

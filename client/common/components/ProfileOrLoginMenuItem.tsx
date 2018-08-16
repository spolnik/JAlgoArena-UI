import * as React from 'react';
import { NavDropdown, NavItem, ProgressBar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {MenuItem as ReactMenuItem} from 'react-bootstrap';
import FontAwesome from './FontAwesome';
import { User } from '../../users/domain/User';
import MenuItem from './MenuItem';

const ProfileOrLoginMenuItem = ({
  user,
  currentPath,
  onLogout,
  progress,
}: {
  user: User;
  currentPath: string;
  onLogout: (() => void);
  progress: number;
}) =>
  user ? (
    <NavDropdown
      id="profile-login-dropdown"
      // @ts-ignore
      title={
        <span>
          <FontAwesome prefix="fas" name="user" lg={true} /> {user.username}{' '}
        </span>
      }
    >
      <ReactMenuItem header>
        <ProgressBar bsStyle="success" now={progress} style={{ marginBottom: '0px' }} />
      </ReactMenuItem>
      <ReactMenuItem divider />
      <MenuItem path={'/profile/' + user.username} title="Profile" icon="" prefix="" currentPath={currentPath} />
      <ReactMenuItem divider />
      <NavItem onClick={onLogout}>Logout</NavItem>
    </NavDropdown>
  ) : (
    <LinkContainer to="/login" isActive={(match) => match && match.isExact}>
      <NavItem>
        <FontAwesome prefix="fas" name="sign-in-alt" lg={true} /> Login
      </NavItem>
    </LinkContainer>
  );

export default ProfileOrLoginMenuItem;

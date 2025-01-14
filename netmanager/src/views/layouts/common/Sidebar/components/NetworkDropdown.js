import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import { Button, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {
  addActiveNetwork,
  fetchNetworkUsers,
  loadUserRoles,
  fetchAvailableNetworkUsers
} from 'redux/AccessControl/operations';
import { loadDevicesData } from 'redux/DeviceRegistry/operations';
import { loadSitesData } from 'redux/SiteRegistry/operations';
import { ArrowDropDown } from '@material-ui/icons';
import 'assets/css/dropdown.css';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    width: '200px',
    borderRadius: '4px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    maxHeight: '200px',
    overflowY: 'auto'
  }
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#2a3daa',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      },

      '&:hover': {
        backgroundColor: 'lightgray',
        '& .MuiListItemText-primary': {
          color: '#175df5'
        }
      }
    },
    '& .MuiListItemText-primary': {
      fontWeight: 'bold',
      color: '#175df5'
    }
  }
}))(MenuItem);

export default function NetworkDropdown({ userNetworks }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState(null);

  useEffect(() => {
    const activeNetwork = JSON.parse(localStorage.getItem('activeNetwork'));
    if (activeNetwork) {
      setSelectedNetwork(activeNetwork);
    } else {
      setSelectedNetwork(userNetworks[0]);
      localStorage.setItem('activeNetwork', JSON.stringify(userNetworks[0]));
      dispatch(addActiveNetwork(userNetworks[0]));
      dispatch(loadDevicesData(userNetworks[0].net_name));
      dispatch(loadSitesData(userNetworks[0].net_name));
      dispatch(fetchNetworkUsers(userNetworks[0]._id));
      dispatch(loadUserRoles(userNetworks[0]._id));
      dispatch(fetchAvailableNetworkUsers(userNetworks[0]._id));
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (network) => {
    setSelectedNetwork(network);
    localStorage.setItem('activeNetwork', JSON.stringify(network));
    localStorage.setItem('currentUserRole', JSON.stringify(network.role));
    dispatch(loadDevicesData(network.net_name));
    dispatch(loadSitesData(network.net_name));
    dispatch(fetchNetworkUsers(network._id));
    dispatch(fetchAvailableNetworkUsers(network._id));
    dispatch(loadUserRoles(network._id));
    handleClose();
    window.location.reload();
  };

  return (
    <>
      <Tooltip title="Organizations" placement="bottom">
        <Button
          aria-controls="network-menu"
          aria-haspopup="true"
          onClick={handleClick}
          variant="contained"
          color="primary"
        >
          {selectedNetwork && selectedNetwork.net_name} <ArrowDropDown />
        </Button>
      </Tooltip>
      <StyledMenu
        id="network-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {userNetworks &&
          userNetworks.map((network) => (
            <StyledMenuItem
              key={network.net_id}
              onClick={() => handleSelect(network)}
              selected={selectedNetwork && selectedNetwork.net_name === network.net_name}
            >
              <ListItemText>{network.net_name.toUpperCase()}</ListItemText>
            </StyledMenuItem>
          ))}
      </StyledMenu>
    </>
  );
}

/* eslint-disable */
import { connect, connectAdvanced } from "react-redux";
import * as userActions from "../../../../redux/Join/actions";
import UserList from "../../../UserList/UserList";
import UsersTable from "../../../UserList/components/UsersTable/UsersTable";
import UsersToolBar from "../../../UserList/components/UsersToolbar/UsersToolbar";

import { AccountDetails, AccountProfile } from "views/pages/Account/components";
import SettingsNotifications from "views/pages/Settings/components/Notifications/Notifications";
import SettingsPassword from "views/pagesSettings/components/Password/Password";
import SetDefaults from "views/hocs/SetDefaults";
import Dashboard from "views/pages/Dashboard/Dashboard";
import SideBar from "layouts/Main/components/Sidebar/Sidebar";
import CandidateList from "views/pages/CandidateList/CandidateList";
import CandidatesTable from "views/pages/CandidateList/components/CandidatesTable/CandidatesTable";
import CandidatesToolBar from "views/pages/CandidateList/components/CandidatesToolbar/CandidatesToolbar";

import { SignUp, Register } from "views/pages/SignUp";

// map state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    mappeduserState: state.userState,
    mappedAuth: state.auth,
    mappedErrors: state.errors,
  };
};

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(userActions.fetchUsers()),
    fetchCandidates: () => dispatch(userActions.fetchCandidates()),
    fetchDefaults: (userId) => dispatch(userActions.fetchDefaults(userId)),

    mappedshowEditDialog: (userToEdit) =>
      dispatch(userActions.showEditDialog(userToEdit)),
    mappedhideEditDialog: () => dispatch(userActions.hideEditDialog()),
    mappedEditUser: (userToEdit) => dispatch(userActions.editUser(userToEdit)),

    mappedShowDeleteDialog: (userToDelete) =>
      dispatch(userActions.deleteUserDialog(userToDelete)),
    mappedHideDeleteDialog: () => dispatch(userActions.hideDeleteDialog()),
    mappedConfirmDeleteUser: (userToDelete) =>
      dispatch(userActions.deleteUser(userToDelete)),

    mappedShowConfirmDialog: (userToConfirm) =>
      dispatch(userActions.confirmUserDialog(userToConfirm)),
    mappedHideConfirmDialog: () => dispatch(userActions.hideConfirmDialog()),
    mappedApproveConfirmUser: (userToConfirm) =>
      dispatch(userActions.confirmUser(userToConfirm)),

    mappedAddUser: (userToAdd) => dispatch(userActions.addNewUser(userToAdd)),
    mappedShowAddDialog: () => dispatch(userActions.showAddDialog()),
    mappedHideAddDialog: () => dispatch(userActions.hideAddDialog()),

    mappedUpdateAuthenticatedUser: (userToUpdate) =>
      dispatch(userActions.updateAuthenticatedUser(userToUpdate)),

    mappedUpdatePassword: (userToUpdate) =>
      dispatch(userActions.updatePassword(userToUpdate)),

    mappedSetDefaults: (defaultSettings) =>
      dispatch(userActions.setDefaults(defaultSettings)),
  };
};

const containerCreator = connect(mapStateToProps, mapDispatchToProps);

const connectedUserList = containerCreator(UserList);

const connectedUsersTable = containerCreator(UsersTable);

const connectedUsersToolbar = containerCreator(UsersToolBar);

const connectedCandidateList = containerCreator(CandidateList);

const connectedCandidatesTable = containerCreator(CandidatesTable);

const connectedCandidatesToolbar = containerCreator(CandidatesToolBar);

const connectedAccountsDetails = containerCreator(AccountDetails);

const connectedAccountProfile = containerCreator(AccountProfile);

const connectedSettingsNotifications = containerCreator(SettingsNotifications);

const connnectedSettingsPassword = containerCreator(SettingsPassword);

const connectedSetDefaults = containerCreator(SetDefaults);

const connectedSideBar = containerCreator(SideBar);

const connectedDashboard = containerCreator(Dashboard);

const connectedRegisterAnalytics = containerCreator(Register);

export {
  connectedUserList,
  connectedUsersTable,
  connectedUsersToolbar,
  connectedCandidateList,
  connectedCandidatesTable,
  connectedCandidatesToolbar,
  connectedAccountsDetails,
  connectedAccountProfile,
  connectedSettingsNotifications,
  connnectedSettingsPassword,
  connectedSetDefaults,
  connectedSideBar,
  connectedDashboard,
  connectedRegisterAnalytics,
};

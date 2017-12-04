import React from 'react';
import PropTypes from 'prop-types';

const Profile = (props) => {
  const { user } = props.location.state;
  return (
    <div className="profile">
      <h1>Profile</h1>
      <div>{user}</div>
    </div>
  );
};

Profile.propTypes = {
  // user: PropTypes.string.isRequired,
  // location: PropTypes.instanceOf(object).isRequired,
};

export default Profile;

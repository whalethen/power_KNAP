import React from 'react';
import PropTypes from 'prop-types';

const Profile = (props) => {
  const { user } = props.location.state;
  const userInfo = user.split('*');
  const name = userInfo[0];
  const photo = userInfo[1];
  const tagline = userInfo[2];
  const about = userInfo[3];
  console.log(photo)
  return (
    <div className="profile">
      <h1>Profile</h1>
      <div>{name}</div>
      <img src={photo} alt={name} />
      <div>{tagline}</div>
      <div>{about}</div>
    </div>
  );
};

Profile.propTypes = {
  // user: PropTypes.string.isRequired,
  // location: PropTypes.instanceOf(object).isRequired,
};

export default Profile;

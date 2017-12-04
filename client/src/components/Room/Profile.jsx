import React from 'react';
import PropTypes from 'prop-types';

const Profile = (props) => {
  const { user } = props.location.state;
  const userInfo = user.split('*');
  const name = userInfo[0];
  const photo = userInfo[1];
  let tagline = userInfo[2];
  let about = userInfo[3];

  if (tagline === 'null') tagline = '';
  if (about === 'null') about = '';

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div>{name}</div>
      <img src={photo} alt={name} />
      <div>Tagline: {tagline}</div>
      <div>About Me: {about}</div>
    </div>
  );
};

Profile.propTypes = {
  // user: PropTypes.string.isRequired,
  // location: PropTypes.instanceOf(object).isRequired,
};

export default Profile;

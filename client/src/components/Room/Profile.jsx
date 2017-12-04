import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
      <div className="container navbar">
        <Link to='/'>
          fam.ly
        </Link>
      </div>
      <a href="/auth/logout">Logout</a>
      <h1>Profile</h1>
      <h3>{name}</h3>
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

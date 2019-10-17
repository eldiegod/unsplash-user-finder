import React, { useState } from 'react';
import axios from 'axios';

const getSearchUsersUrl = userName =>
  `https://api.unsplash.com/search/users?page=1&query=${userName}&client_id=aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5`;

export default function Sidebar({ onUsernameClick }) {
  const [usersSearched, setusersSearched] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(false);

  if (error) {
    return (
      <div className="w-1/6 p-4 bg-teal-800">
        Something ocurred while searching for an username please click here to reload the page
      </div>
    );
  }
  return (
    <div className="w-1/6 p-4 bg-teal-800 overflow-y-scroll">
      <input
        className="px-3 py-1 text-black w-full rounded-full text-center"
        type="search"
        placeholder="Search Username"
        onChange={async e => {
          // don't hit the api if the name is not valid
          if (!e.target.value) return;

          try {
            setisLoading(true);
            const { data } = await axios.get(getSearchUsersUrl(e.target.value));
            setusersSearched(data.results);
          } catch (e) {
            seterror(e);
            console.log(e);
          }
          setisLoading(false);
        }}
      ></input>
      <div className="mt-4">
        {isLoading ? (
          <div>Loading Users...</div>
        ) : (
          usersSearched.map(user => (
            <button
              className="mt-1 block text-gray-300 hover:text-gray-500 uppercase underline"
              key={user.id}
              onClick={() => onUsernameClick(user.username)}
            >
              {user.username}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

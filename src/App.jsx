import React, { useState } from 'react';
import { useAPI } from 'react-api-hooks';

import Sidebar from './components/Sidebar';
import ImagesGrid from './components/ImagesGrid';

const getUserImagesUrl = username =>
  `https://api.unsplash.com/users/${username ||
    0}/photos?client_id=aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5`;

export const App = () => {
  const [username, setusername] = useState('');

  const { data: imagesData = [], error, isLoading } = useAPI(getUserImagesUrl(username));

  return (
    <div className="h-full text-white">
      <div className="h-11/12 flex content-start">
        <Sidebar onUsernameClick={setusername}></Sidebar>
        <div className="w-5/6 p-8 bg-teal-700 overflow-y-scroll text-center">
          <ImagesGrid
            imagesData={imagesData}
            isLoading={isLoading}
            username={username}
            error={error}
          ></ImagesGrid>
        </div>
      </div>
      {/* footer */}
      <div className="text-sm h-1/12 bg-teal-800 flex items-center justify-center">
        <div>© 2019 Diego Cardenas</div>
      </div>
    </div>
  );
};

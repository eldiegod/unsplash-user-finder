import React from 'react';

export default function ImagesGrid({ imagesData = [], isLoading, username, error }) {
  const noImagesUploaded = username && imagesData.length === 0;

  if (isLoading) return <div className="text-2xl ">Loading Images...</div>;
  if (error && error.response.status === 404 && username)
    return <div className="text-2xl ">Couldn't find user "{username}"</div>;
  if (error && username)
    return <div className="text-2xl ">Something went wrong please refresh the page.</div>;
  return (
    <div>
      {username && <div className="uppercase">User: {username}</div>}
      {noImagesUploaded && <div className="mt-8 text-2xl">No images uploaded by {username} yet.</div>}
      <div className="px-4 px-8 h-full w-full flex flex-wrap items-center overflow-y-scroll">
        {imagesData.map(imageData => (
          <div key={imageData.id} className="p-4 max-w-1/3 flex-auto align-center ">
            <img
              className="rounded-sm shadow-lg"
              src={imageData.urls.small}
              alt={imageData.alt_description}
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
}

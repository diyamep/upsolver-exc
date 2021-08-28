import React from "react";

const GifItem = (props) => {
  return (
    <div className="gif-item">
      <img src={props?.gif?.images?.downsized?.url} />
      {props.isFavorite ? (
        <button
          onClick={() => {
            props.addToFavorites(props.gif);
          }}
        >
          Add to favorites
        </button>
      ) : (
        <button
          onClick={() => {
            props.removeFromFavorites(props.gif);
          }}
        >
          Remove from favorites
        </button>
      )}
    </div>
  );
};

export default GifItem;

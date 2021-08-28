import React from "react";
import GifItem from "./GifItem";

const GifList = (props) => {
  const gifItems = props.gifs.map((image) => {
    return (
      <GifItem
        key={image.id}
        gif={image}
        addToFavorites={props.addToFavorites}
        removeFromFavorites={props.removeFromFavorites}
        isFavorite={!props.favorites.has(image.id)}
      />
    );
  });

  return <div className="gif-list">{gifItems}</div>;
};

export default GifList;

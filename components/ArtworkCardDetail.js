import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useAtom } from "jotai";
import { favouritesAtom, showAddedAtom } from "../store";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCardDetail({ objectID }) {
  const [artwork, setArtwork] = useState(null);
  const [favouritesList, setFavouriteList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));

  function favouritesClicked() {
    if (showAdded) {
      // remove the objectID from the favourites list
      setFavouriteList((current) => current.filter((id) => id !== objectID));
      setShowAdded(false);
    } else {
      // add the objectID to the favourites list
      setFavouriteList((current) => [...current, objectID]);
      setShowAdded(true);
    }
  }

  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setArtwork(data);
    }
  }, [data]);

  if (error)
    return (
      <div className="text-center">
        <strong>Failed to load artwork data</strong>
      </div>
    );
  if (!artwork)
    return (
      <div className="text-center">
        <strong>Loading Artworks...</strong>
      </div>
    );

  return (
    <Card>
      <Card.Img variant="top" src={artwork?.primaryImage} />
      <Card.Body>
        <Card.Title>
          <strong>{artwork?.title || "N/A"}</strong>
        </Card.Title>
        <Card.Text>
          <strong>Date: </strong>
          {artwork?.objectDate || "N/A"}
          <br />
          <strong>Classification: </strong>
          {artwork?.classification || "N/A"}
          <br />
          <strong>Medium: </strong>
          {artwork?.medium || "N/A"} <br />
          <br />
          <br />
          <strong>Artist: </strong>
          {artwork?.artistDisplayName || "N/A"}{" "}
          <a
            href={artwork?.artistWikidata_URL}
            target="_blank"
            rel="noreferrer"
          >
            (wiki profile)
          </a>
          <br />
          <strong>Credit Line: </strong>
          {artwork?.creditLine || "N/A"}
          <br />
          <strong>Dimensions: </strong>
          {artwork?.dimensions || "N/A"}
          <br />
          <br></br>
          <Button
            variant={showAdded ? "primary" : "outline-primary"}
            onClick={favouritesClicked}
          >
            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

import useSWR from "swr";
import Error from "next/error";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Link from "next/link";

export default function ArtworkCard({ objectID }) {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  // fetch data from the API
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    fetcher
  );

  //  if there is no data, return null
  if (!data) {
    return null;
  }

  // if there is an error, return an error code 404
  if (error) {
    return <Error statusCode={404} />;
  }

  // if data is fetched successfully, return the artwork card
  return (
    <Card>
      <Card.Img
        variant="top"
        src={
          data?.primaryImageSmall ||
          "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
        }
      />
      <Card.Body>
        <Card.Title>
          <strong>{data?.title || "N/A"}</strong>
        </Card.Title>
        <Card.Text>
          <strong>Date: </strong>
          {data?.objectDate || "N/A"}
          <br />
          <strong>Classification: </strong>
          {data?.classification || "N/A"}
          <br />
          <strong>Medium: </strong>
          {data?.medium || "N/A"} <br />
          <br />
          <br />
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="primary">{objectID}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

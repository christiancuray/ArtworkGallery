import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Error from "next/error";
import ArtworkCard from "@/components/ArtworkCard";
import Card from "react-bootstrap/Card";
import useSWR from "swr";
import { Button, Col, Pagination, Row } from "react-bootstrap";
import validObjectIDList from "@/public/data/validObjectIDList.json";

// maximum number of artworks per page
const PER_PAGE = 12;

export default function Artwork() {
  const [page, setPage] = useState(1);
  const [artworkList, setArtworkList] = useState([]);

  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];

  // fetch artwork list from the API
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  // Add console log to debug the response
  useEffect(() => {
    if (data) {
      console.log("API Response:", data);
    }
  }, [data]);

  // decrease the page number to go back to the previous page
  function previousPage() {
    if (page > 1) setPage(page - 1);
  }

  // increase the page number to go to the next page
  function nextPage() {
    if (page < artworkList.length) setPage(page + 1);
  }

  // filter the objectIDs from the validObjectIDList.json.
  // Eliminate the objectIDs that are not in the validObjectIDList.json
  let filteredResults = validObjectIDList.objectIDs.filter((x) =>
    data?.objectIDs?.includes(x)
  );

  // set the artwork list and page number when data is fetched, also proces when the data is changed
  useEffect(() => {
    if (data) {
      let result = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        result.push(chunk);
      }
      // set the artwork list from the result list page number and set the page to 1
      setArtworkList(result);
      setPage(1);
    }
    // dependency array. It will trigger the effect when the data is changed
  }, [data]);

  // Error handling for fetching data
  if (error) return <Error statusCode={404} />;

  // if there is no data, return null
  if (artworkList === null) return null;

  return (
    <>
      <Row className="gy-4 m-3">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((objID) => (
            <Col lg={3} key={objID} className="mb-4 ">
              <ArtworkCard objectID={objID} />
            </Col>
          ))
        ) : (
          <Card className="bg-dark text-white d-flex justify-content-center align-items-center p-5">
            <Card.Text className=" text-center">
              <strong>Nothing to see here.</strong>
              <br />
              Try searching different artwork.
            </Card.Text>
            <Card.Img
              src="/sadness.png"
              alt="Card image"
              className="customImg"
            />
            <Button variant="secondary" onClick={(e) => router.push("/")}>
              Go Back
            </Button>
            <br />
          </Card>
        )}
      </Row>

      {/* pagination */}
      {artworkList.length > 0 && (
        <Pagination className="justify-content-center">
          <Pagination.Prev onClick={previousPage} disabled={page === 1} />
          <Pagination.Item active>{page}</Pagination.Item>
          <Pagination.Next
            onClick={nextPage}
            disabled={page === artworkList.length}
          />
        </Pagination>
      )}
    </>
  );
}

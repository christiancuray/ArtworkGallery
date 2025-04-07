import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { Row, Col, Card, Button } from "react-bootstrap";
import router from "next/router";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {
  const [favouritesList, setFavouriteList] = useAtom(favouritesAtom);

  return (
    <Card>
      <Card.Header className="bg-dark text-white text-center">
        Search History
      </Card.Header>
      <Row className="p-4">
        {favouritesList.length > 0 ? (
          favouritesList.map((objID) => (
            <Col lg={3} key={objID} className="mb-4 ">
              <ArtworkCard objectID={objID} />
            </Col>
          ))
        ) : (
          <Card className="bg-dark text-white d-flex justify-content-center align-items-center p-5">
            <Card.Text className=" text-center">
              <strong>Nothing to see here.</strong>
              <br />
              Try adding some new artwork to the list.
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
    </Card>
  );
}

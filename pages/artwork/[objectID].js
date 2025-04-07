import ArtworkCardDetail from "../../components/ArtworkCardDetail";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";

export default function ArtworkById() {
  const router = useRouter();
  const { objectID } = router.query;
  return (
    <Row>
      <Col>{objectID && <ArtworkCardDetail objectID={objectID} />}</Col>
    </Row>
  );
}

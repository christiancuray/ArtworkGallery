import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { useRouter } from "next/router";
import { Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import styles from "@/styles/History.module.css";

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  let parsedHistory = [];
  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(e, index) {
    e.preventDefault();
    // navigate to the search page with the search query from the history
    router.push(`/artwork?${searchHistory[index]}`);
  }

  function removeHistoryClicked(e, index) {
    e.stopPropagation();
    setSearchHistory((current) => {
      let x = [...current];
      x.splice(index, 1);
      return x;
    });
  }

  return (
    <Card className="bg-dark text-white">
      <Card.Header className="text-center">Search History</Card.Header>
      {parsedHistory.length > 0 ? (
        <ListGroup variant="flush">
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              className={styles.historyListItem}
              key={index}
              onClick={(e) => historyClicked(e, index)}
            >
              {Object.keys(historyItem).map((key) => (
                <>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </>
              ))}
              {/* remove button */}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Card className="bg-dark text-white d-flex justify-content-center align-items-center p-5">
          <Card.Text className=" text-center">
            <strong>Nothing to see here.</strong>
            <br />
            Try searching some artwork.
          </Card.Text>
          <Card.Img src="/sadness.png" alt="Card image" className="customImg" />
          <Button variant="secondary" onClick={(e) => router.push("/")}>
            Go Back
          </Button>
          <br />
        </Card>
      )}
    </Card>
  );
}

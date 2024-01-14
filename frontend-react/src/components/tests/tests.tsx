import ListGroup from "../ListGroup";

function Tests() {
  let items = ["New York", "Tokyo", "Londo", "Paris", "Hongkong"];

  return (
    <>
      <h1>Tests</h1>

      <ListGroup
        items={items}
        heading={"Cities"}
        onSelectItem={function (item: string): void {
          console.log(item);
        }}
      ></ListGroup>
    </>
  );
}

export default Tests;

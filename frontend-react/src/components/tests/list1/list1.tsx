import ListGroup from "../../ListGroup";

function List1() {
  let items = ["New York", "Tokyo", "Londo", "Paris", "Hongkong"];
  return (
    <>
      <h1>List1</h1>

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

export default List1;

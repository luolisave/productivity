import { MouseEvent, useState } from "react";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void; // onClick
}

function ListGroup(props: Props) {
  // items = [];

  // let selectedIndex = -1; // this will NOT work, we need use below 'useState' hook
  // useState Hook:
  // const arr = useState(-1);
  // arr[0]; // variable (selectedIndex)
  // arr[1]; // updater function
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const getMessage = () => {
    return props.items.length === 0 ? <p>No item found</p> : null;
  };

  return (
    // use <> is same as use <Fragment>
    <>
      <h1>List {props.heading}</h1>
      {
        getMessage() // same as:  items.length === 0 && <p>No item found</p>
      }
      <ul className="list-group">
        {props.items.map((item, index) => (
          <li
            key={item}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
              props.onSelectItem(item);
            }}
          >
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;

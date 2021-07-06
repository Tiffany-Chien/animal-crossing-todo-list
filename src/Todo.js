import { Button, ListItemText, ListItem } from "@material-ui/core";
import React from "react";
import { db } from "./firebase_config";

function TodoListImage({ text }) {
  let image = "https://dodo.ac/np/images/0/08/Leaf_NH_Icon_cropped.png";
  let size = 40;
  const lowercase = text.toLowerCase();
  if (lowercase.indexOf("bells") !== -1) {
    image = "https://dodo.ac/np/images/4/49/99k_Bells_NH_Inv_Icon_cropped.png";
    size = 35;
  }

  if (lowercase.indexOf("turnip") !== -1) {
    image =
      "https://dodo.ac/np/images/thumb/8/86/Turnips_NH_Inv_Icon.png/50px-Turnips_NH_Inv_Icon.png";
    size = 50;
  }

  if (lowercase.indexOf("fossil") !== -1 || lowercase.indexOf("kill") !== -1) {
    image = "https://dodo.ac/np/images/f/fc/Identified_Fossil_NH_Inv_Icon.png";
    size = 50;
  }

  if (lowercase.indexOf("move") !== -1) {
    image = "https://dodo.ac/np/images/f/fd/Package_NH_Inv_Icon.png";
    size = 50;
  }

  if (lowercase.indexOf("fruit") !== -1) {
    image = "https://dodo.ac/np/images/f/f4/Apple_NH_Inv_Icon.png";
    size = 50;
  }

  if (lowercase.indexOf("chop") !== -1) {
    image = "https://dodo.ac/np/images/0/0b/Golden_Axe_NH_Inv_Icon.png";
    size = 50;
  }

  if (lowercase.indexOf("recipe") !== -1) {
    image = "https://dodo.ac/np/images/0/0a/Message_Bottle_NH_Inv_Icon.png";
    size = 50;
  }

  return (
    <div
      style={{
        width: 50,
        height: 50,
        marginRight: 10,
        marginLeft: -22,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img style={{ height: size, width: size }} src={image} />
    </div>
  );
}

export default function TodoListItem({ todo, inProgress, id }) {
  function toggleInProgress() {
    db.collection("todos").doc(id).update({
      inProgress: !inProgress,
    });
  }

  function deleteTodo() {
    db.collection("todos").doc(id).delete();
  }

  return (
    <div style={{ display: "flex" }}>
      <ListItem>
        <TodoListImage text={todo} />
        <ListItemText
          primary={todo}
          secondary={inProgress ? "In Progress" : "Completed"}
        />
      </ListItem>
      <Button onClick={toggleInProgress}>
        {" "}
        {inProgress ? "Done" : "Undo"}{" "}
      </Button>
      <Button onClick={deleteTodo}> X </Button>
    </div>
  );
}

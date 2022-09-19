import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@material-ui/core";
import Axios from "axios";


const AddProd_form = () => {
  const [name, setName] = useState("");
  const [rate, setRate] = useState(0);
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");

  const postData = () => {
    const formData = new FormData();
    formData.append('image', image);
    Axios.post("http://localhost:3001/createUser", {
      name,
      rate,
      formData,
      desc
    }).then((response) => {
      alert("user created");
    });

  }
  return (
    <>
    {/* <form method="POST" action="http://localhost:3001/upload" encType="multipart/form-data"> */}
      <TextField
        id="outlined-basic"
        label="Product Name"
        variant="outlined"
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <TextField
        id="outlined-basic"
        label="Product Rate"
        variant="outlined"
        type="number"
        onChange={(e) => {
          setRate(e.target.value);
        }}
      />

      <TextField
        id="outlined-basic"
        label=""
        variant="outlined"
        type="file"
        name="image"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />

      <TextField
        id="outlined-basic"
        label="Product Description"
        variant="outlined"
        type="text"
        onChange={(e) => {
          setDesc(e.target.value);
        }}
      />

      <Button
        color="primary"
        variant="contained"
        onClick={postData}
   
      >
       Add Data
      </Button>
      {/* </form> */}
    </>
  );
};

export default AddProd_form;

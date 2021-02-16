import React, { useState } from "react";
import { Typography, Box } from "@material-ui/core";
import { BiImageAdd } from "react-icons/bi";
import { BsImageAlt } from "react-icons/bs";

export default function ImageUploader({
  setFieldValue,
  prevImageValue = null,
}) {
  const [url, setUrl] = useState(null);
  // console.log(prevImageValue);
  const [prevImage, setPrevImage] = useState(prevImageValue);

  const addImage = (e) => {
    try {
      const file = e.currentTarget.files[0];
      const result = URL.createObjectURL(file);
      setPrevImage(null);
      setUrl(result);
      setFieldValue("image", file);
    } catch (err) {
      console.log(err);
    }
  };

  const boxWithPhoto = {
    margin: "1rem 1.5rem 0.5rem 1.5rem",
    height: "14rem",
    display: "flex",
    borderRadius: "0.5rem",
    justifyContent: "center",
    alignItems: "center",
    objectFit: "cover",
  };
  const boxStyle = {
    margin: "1rem 1.5rem 0.5rem 1.5rem",
    borderRadius: "0.5rem",
    border: "1px solid grey",
    height: "14rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div>
      <Box
        style={
          url && url.length > 0
            ? boxWithPhoto
            : prevImage && prevImage.length > 0
            ? boxWithPhoto
            : boxStyle
        }
      >
        {url && url.length > 0 ? (
          <img
            width="100%"
            height="100%"
            style={{
              objectFit: "contain",
              borderRadius: "0.8rem",
            }}
            src={url}
            alt="service"
          />
        ) : prevImage && prevImage.length > 0 ? (
          <img
            width="100%"
            height="100%"
            style={{
              objectFit: "contain",
              borderRadius: "0.8rem",
            }}
            src={require(`../../images/${prevImage}`).default}
            alt="service"
          />
        ) : (
          <span>
            <BsImageAlt style={{ padding: "1rem" }} size={100} />
          </span>
        )}
      </Box>
      <label htmlFor="file">
        <Box>
          <Typography type="button" variant="body2" className="ml-4">
            <BiImageAdd size={25} />{" "}
            {url ? (
              <span>Change Image</span>
            ) : prevImage && prevImage.length > 0 ? (
              <span>Change Image</span>
            ) : (
              <span>Upload Image</span>
            )}
          </Typography>
        </Box>
      </label>
      <input
        type="file"
        name="image"
        id="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => addImage(e)}
      />
    </div>
  );
}

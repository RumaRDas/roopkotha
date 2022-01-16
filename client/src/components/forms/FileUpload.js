import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";

const FileUpload = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndREsize = (e) => {
    //console.log(e.target.files);
    //resize
    let files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            //console.log(uri);
            
          },
          "base64"
        );
      }
    }
    //send bck to upload to cloudinary
    //set url to images [] in the parent component - fro product create
  };

  return (
    <div className="row">
      <label className="btn btn-info">
        Choose File
        <input
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={fileUploadAndREsize}
        />
      </label>
    </div>
  );
};
export default FileUpload;

import React from "react";

const FileUpload = () => {
  const fileUploadAndREsize = (e) => {
    //console.log(e.target.files);
    //resize
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

import axios from "axios";
import heic2any from "heic2any";
import React, { useRef } from "react";
import { useState } from "react";

function ImageUpload({ setImage }) {
  const fileInput = useRef();

  function handleImage() {
    let file = fileInput.current.files[0];
    if (file.name.split(".")[1] === "heic") {
      let blob = fileInput.current.files[0];

      heic2any({ blob: blob, toType: "image/jpeg" }).then(function (
        resultBlob
      ) {
        file = new File([resultBlob], file.name.split(".")[0] + ".jpg", {
          type: "image/jpeg",
          lastModified: new Date().getTime(),
        });
        setImage(file);
      });
    } else {
      const type = file.type.split("/");
      if (type[0] !== "image") {
        alert("이미지만 업로드 할 수 있습니다.");
        return;
      }
      setImage(file);
    }
  }

  return (
    <div>
      <input type="file" ref={fileInput} name="file" onChange={handleImage} />
      {/* <button onClick={handleApi}>Submit</button> */}
    </div>
  );
}
export default ImageUpload;

import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import LoadingSmall from "./LoadingSmall";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "components/Firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { handleChangeProduct } from "reducers/productSlice";
import { hideUploadImage } from "reducers/uploadImage";
interface MultiImageProps {
  onSave: (values: string) => void;
}
function MultiImage(props: MultiImageProps) {
  const product = useSelector((state: RootState) => state.productReducer);
  const { isShow } = useSelector((state: RootState) => state.uploadReducer);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [choseImage, setChoseImage] = useState("");

  const handleOnChange = (e: any) => {
    const file = e.target.files[0];
    uploadFiles(file);
  };
  const uploadFiles = (file: any): any => {
    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setIsLoading(true);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsLoading(false);
          const newImages = product.image?.concat(" ", downloadURL);
          const action = handleChangeProduct({ ...product, image: newImages });
          dispatch(action);
          return downloadURL;
        });
      }
    );
    return;
  };

  const handleRemove = (indexImage: number) => {
    const newImages = product.image
      ?.split(" ")
      .filter((item, index) => index !== indexImage)
      .join();
    const action = handleChangeProduct({ ...product, image: newImages });
    dispatch(action);
  };
  return (
    <Modal size="lg" show={isShow}>
      <Modal.Header>
        <Modal.Title>Chọn ảnh</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex multi-images">
          <label
            htmlFor="multi-image"
            className="mb-0 d-flex justify-content-center align-items-center image-box"
            style={{ fontSize: 20 }}
          >
            {isLoading ? <LoadingSmall /> : "+"}
          </label>
          <input
            type="file"
            id="multi-image"
            className="d-none"
            onChange={handleOnChange}
          />
          {product.image &&
            product.image
              .trimStart()
              ?.split(" ")
              .map((item, index) => {
                return (
                  <div
                    className="image-box position-relative"
                    key={item + index}
                    onClick={() => setChoseImage(item)}
                  >
                    <img
                      src={item}
                      alt="product"
                      style={{
                        width: 74,
                        height: 74,
                        borderRadius: 3,
                      }}
                      className={choseImage === item ? "picked-image" : ""}
                    />

                    <span
                      onClick={() => handleRemove(index)}
                      className="delete-image-btn"
                    >
                      x
                    </span>
                  </div>
                );
              })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-danger"
          onClick={() => {
            const action = hideUploadImage();
            dispatch(action);
          }}
        >
          Hủy
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            props.onSave(choseImage);
          }}
        >
          Lưu
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default MultiImage;

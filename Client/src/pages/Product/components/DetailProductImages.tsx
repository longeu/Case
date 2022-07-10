import { RootState } from "app/store";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideDetailImages } from "reducers/uploadImage";
import ShowImage from "./ShowImage";

function DetailProductImages() {
  const product = useSelector((state: RootState) => state.productReducer);
  const { isShowImages } = useSelector(
    (state: RootState) => state.uploadReducer
  );
  const dispatch = useDispatch();
  const [isShowDetailImage, setIsShowDetailImage] = useState(false);
  const [currentDetailImage, setCurrentDetailImage] = useState("");
  return (
    <>
      <Modal size="lg" show={isShowImages}>
        <Modal.Header>
          <Modal.Title>Ảnh sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex multi-images">
            {product.image &&
              product.image
                .trimStart()
                ?.split(" ")
                .map((item, index) => {
                  return (
                    <div
                      className="image-box position-relative"
                      key={item + index}
                      onClick={() => {
                        setCurrentDetailImage(item);
                        setIsShowDetailImage(true);
                      }}
                    >
                      <img
                        src={item}
                        alt="product"
                        style={{
                          width: 74,
                          height: 74,
                          borderRadius: 3,
                        }}
                      />
                    </div>
                  );
                })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={() => {
              const action = hideDetailImages();
              dispatch(action);
            }}
          >
            Hủy
          </button>
        </Modal.Footer>
      </Modal>
      <ShowImage
        isOpen={isShowDetailImage}
        value={currentDetailImage}
        onHide={() => setIsShowDetailImage(!isShowDetailImage)}
      />
    </>
  );
}

export default DetailProductImages;

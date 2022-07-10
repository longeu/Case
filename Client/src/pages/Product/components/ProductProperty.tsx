import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
// @ts-ignore
import MultipleValueTextInput from "react-multivalue-text-input";
import { handleChangeProduct } from "reducers/productSlice";
import { useParams } from "react-router";
import { setShow } from "reducers/toastSlice";

function ProductProperty(props: any) {
  const product = useSelector((state: RootState) => state.productReducer);
  const { id } = useParams() as any;
  const newProductDetailValues = {
    productId: id,
    productName: "",
    size: "",
    color: "",
    code: "",
    barCode: "",
    price: 0,
    priceSell: 0,
    discountSell: 0,
    discount: 0,
    quantity: 0,
    description: "",
    image: "",
    status: 1,
    isChecked: false,
  };
  const [listColors, setListColors] = useState([""] as string[]);
  const [listSizes, setListSizes] = useState([""] as string[]);
  const dispatch = useDispatch();
  return (
    <div className="card">
      <div className="card-header-custom">Thuộc tính sản phẩm</div>

      <div className="card-body">
        <form className="row">
          <div className="col-lg-12">
            <label htmlFor="name" className="form-label">
              Màu sắc
            </label>
            <MultipleValueTextInput
              values={props.value}
              name="color"
              className="form-control"
              onItemAdded={(item: any, allItems: any) => {
                setListColors([...listColors, item]);
                if (listSizes.length === 1) {
                  const newProduct = {
                    ...product,
                    productDetails: [
                      ...product.productDetails,
                      { ...newProductDetailValues, color: item, size: "" },
                    ],
                  };
                  const action = handleChangeProduct({ ...newProduct });
                  dispatch(action);
                } else {
                  const newProductDetails = listSizes
                    .filter((i) => i !== "")
                    .map((i) => {
                      return {
                        ...newProductDetailValues,
                        color: item,
                        size: i,
                      };
                    });
                  const newProduct = {
                    ...product,
                    productDetails: [
                      ...product.productDetails.filter((i) => i.color !== ""),
                      ...newProductDetails,
                    ],
                  };

                  const action = handleChangeProduct({ ...newProduct });
                  dispatch(action);
                }
              }}
              onItemDeleted={(item: any, allItems: any) => {
                const newColors = listColors.filter((i) => i !== item);
                setListColors([...newColors]);
                if (product.productDetails.some((e) => e.color === item)) {
                  const newProducts = product.productDetails.filter(
                    (i) => i.id || i.color !== item
                  );
                  const action = handleChangeProduct({
                    ...product,
                    productDetails: newProducts,
                  });
                  dispatch(action);
                  return;
                }
                if (listColors.length > 2 || listSizes.length === 1) {
                  const newProductDetails = product.productDetails.filter(
                    (i) => i.color !== item
                  );
                  const newProduct = {
                    ...product,
                    productDetails: [...newProductDetails],
                  };
                  const action = handleChangeProduct({ ...newProduct });
                  dispatch(action);
                } else {
                  const test = product.productDetails.map((i) => {
                    if (i.color === item) {
                      return { ...i, color: "" };
                    } else {
                      return i;
                    }
                  });
                  const newProduct = { ...product, productDetails: [...test] };
                  const action = handleChangeProduct({ ...newProduct });
                  dispatch(action);
                }
              }}
              deleteButton={<i className="fas fa-times"></i>}
            />
          </div>
          <div className="col-lg-12 mt-2">
            <label htmlFor="name" className="form-label">
              Kích thước
            </label>
            <MultipleValueTextInput
              name="size"
              onItemAdded={(item: any, allItems: any) => {
                setListSizes([...listSizes, item]);

                if (listColors.length === 1) {
                  const newProduct = {
                    ...product,
                    productDetails: [
                      ...product.productDetails,
                      { ...newProductDetailValues, color: "", size: item },
                    ],
                  };
                  const action = handleChangeProduct({ ...newProduct });
                  dispatch(action);
                } else {
                  const newProductDetails = listColors
                    .filter((i) => i !== "")
                    .map((i) => {
                      return {
                        ...newProductDetailValues,
                        color: i,
                        size: item,
                      };
                    });
                  const newProduct = {
                    ...product,
                    productDetails: [
                      ...product.productDetails.filter((i) => i.size !== ""),
                      ...newProductDetails,
                    ],
                  };

                  const action = handleChangeProduct({ ...newProduct });
                  dispatch(action);
                }
              }}
              onItemDeleted={(item: any, allItems: any) => {
                const newSizes = listSizes.filter((i) => i !== item);
                setListSizes([...newSizes]);
                if (product.productDetails.some((e) => e.size === item)) {
                  const newProducts = product.productDetails.filter(
                    (i) => i.id || i.size !== item
                  );
                  const action = handleChangeProduct({
                    ...product,
                    productDetails: newProducts,
                  });
                  dispatch(action);
                  return;
                }
                if (listSizes.length > 2 || listColors.length === 1) {
                  const newProductDetails = product.productDetails.filter(
                    (i) => i.size !== item
                  );
                  const newProduct = {
                    ...product,
                    productDetails: [...newProductDetails],
                  };
                  const action = handleChangeProduct({ ...newProduct });
                  dispatch(action);
                } else {
                  const test = product.productDetails.map((i) => {
                    if (i.size === item) {
                      return { ...i, size: "" };
                    } else {
                      return i;
                    }
                  });
                  const newProduct = { ...product, productDetails: [...test] };
                  const action = handleChangeProduct({ ...newProduct });
                  dispatch(action);
                }
              }}
              className="form-control"
              deleteButton={<i className="fas fa-times"></i>}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductProperty;

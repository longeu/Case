import React, { ChangeEvent, useState } from "react";
import CurrencyFormat from "react-currency-format";
import MultiImage from "./MultiImage";
import placeholder from "assets/dist/img/placeholder-image.png";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { handleChangeProductDetails } from "reducers/productSlice";
import { SelectOption } from "./../types";
import { hideUploadImage, showUploadImage } from "reducers/uploadImage";
import MyBadge from "components/Bedge/MyBadge";
import { convertProductStatus } from "utils/convertStatus";
interface ColumnState {
  title: string;
  isNumber?: boolean;
  suffix?: string;
}

const columns: ColumnState[] = [
  {
    title: "#",
  },
  {
    title: "Ảnh",
  },
  {
    title: "Mã code",
  },
  {
    title: "Barcode",
  },
  {
    title: "Màu",
  },
  {
    title: "Kích thước",
    isNumber: true,
  },
  {
    title: "Giá nhập",
    isNumber: true,
    suffix: " đ",
  },
  {
    title: "Giá bán",
    isNumber: true,
    suffix: " đ",
  },
  {
    title: "Số lượng",
    isNumber: true,
    suffix: "",
  },
  {
    title: "Giảm giá",
    isNumber: true,
    suffix: "%",
  },
  {
    title: "Trạng thái",
    isNumber: true,
    suffix: "%",
  },
];
const newProductDetailValues = {
  productId: 1,
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

const selectOptions: SelectOption[] = [
  {
    value: 1,
    label: "Xóa sản phẩm",
  },
  {
    value: 2,
    label: "Chuyển trạng thái",
  },
];

interface DataTableProductDetailProps {
  onDelete: () => void;
  onTranfer: () => void;
}
function DataTableProductDetail(props: DataTableProductDetailProps) {
  const [currentItemFocused, setCurrentItemFocused] = useState(0);

  const dispatch = useDispatch();

  const product = useSelector((state: RootState) => state.productReducer);

  const handleOnNew = () => {
    const action = handleChangeProductDetails([
      ...product.productDetails,
      newProductDetailValues,
    ]);
    dispatch(action);
  };

  const handleOnChangNumber = (index: number, name: string, value: string) => {
    const action = handleChangeProductDetails([
      ...product.productDetails.filter((pd) => pd.status !== 3).slice(0, index),
      {
        ...product.productDetails.filter((pd) => pd.status !== 3)[index],
        [name]: parseFloat(value),
      },
      ...product.productDetails
        .filter((pd) => pd.status !== 3)
        .slice(index + 1),
    ]);
    dispatch(action);
  };

  const handleOnChangeText = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    const action = handleChangeProductDetails([
      ...product.productDetails.filter((pd) => pd.status !== 3).slice(0, index),
      {
        ...product.productDetails.filter((pd) => pd.status !== 3)[index],
        [name]: value,
      },
      ...product.productDetails
        .filter((pd) => pd.status !== 3)
        .slice(index + 1),
    ]);

    dispatch(action);
  };

  const handleOnSaveImages = (value: string) => {
    const action = handleChangeProductDetails([
      ...product.productDetails
        .filter((pd) => pd.status !== 3)
        .slice(0, currentItemFocused),
      {
        ...product.productDetails.filter((pd) => pd.status !== 3)[
          currentItemFocused
        ],
        image: value,
      },
      ...product.productDetails
        .filter((pd) => pd.status !== 3)
        .slice(currentItemFocused + 1),
    ]);
    dispatch(action);
  };

  const handleCheck = (e: any, index?: number) => {
    const { name, checked } = e.target;
    let action = null;
    if (name === "allSelect") {
      let tempProductDetails = product.productDetails
        .filter((pd) => pd.status !== 3)
        .map((pd) => {
          return { ...pd, isChecked: checked };
        });
      action = handleChangeProductDetails([...tempProductDetails]);
    } else {
      let tempProductDetails = product.productDetails
        .filter((pd) => pd.status !== 3)
        .map((pd, i) => (index === i ? { ...pd, isChecked: checked } : pd));
      action = handleChangeProductDetails([...tempProductDetails]);
    }
    dispatch(action);
  };

  const handleCheckRule = (e: any, index: number) => {
    const name = e.target.name;
    if (
      product.productDetails
        .filter((pd) => pd.status !== 3)
        .some(
          (pd, i) =>
            product.productDetails.filter((pd) => pd.status !== 3)[index]
              .color === pd.color &&
            product.productDetails.filter((pd) => pd.status !== 3)[index]
              .color !== "" &&
            product.productDetails.filter((pd) => pd.status !== 3)[index]
              .size === pd.size &&
            product.productDetails.filter((pd) => pd.status !== 3)[index]
              .size !== "" &&
            index !== i
        )
    ) {
      const action = handleChangeProductDetails([
        ...product.productDetails
          .filter((pd) => pd.status !== 3)
          .slice(0, index),
        {
          ...product.productDetails.filter((pd) => pd.status !== 3)[index],
          [name]: "",
        },
        ...product.productDetails
          .filter((pd) => pd.status !== 3)
          .slice(index + 1),
      ]);
      dispatch(action);
    }
  };

  const handleOnChangeSelect = (value: any) => {
    if (value.value === 1) {
      props.onDelete();
    }
    if (value.value === 2) {
      props.onTranfer();
    }
  };

  return (
    <div className="card">
      <div className="card-header-custom d-flex align-items-center">
        <span className="text-center">Thông tin các phiên bản</span>

        <button
          className=" btn btn-default ml-auto"
          onClick={handleOnNew}
          style={{ height: "35px" }}
        >
          Thêm mới phiên bản
        </button>
      </div>

      <div className="card-body d-flex justify-content-center align-items-center p-0">
        {product.productDetails.filter((pd) => pd.status !== 3).length === 0 ? (
          <div>
            <h5 className="mt-5 mb-5">Chưa có phiên bản</h5>
          </div>
        ) : (
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                {product.productDetails.some((pd) => pd.isChecked) ? (
                  <>
                    <th>
                      <div className="d-flex">
                        <input
                          type="checkbox"
                          name="allSelect"
                          checked={
                            !product.productDetails
                              .filter((pd) => pd.status !== 3)
                              .some((pd) => pd.isChecked !== true)
                          }
                          onChange={handleCheck}
                        />
                      </div>
                    </th>
                    <th colSpan={10} style={{ padding: "5px 0" }}>
                      <div className="d-flex">
                        <Select
                          className="btn-sm p-0"
                          placeholder="Chọn thao tác"
                          options={selectOptions}
                          onChange={(value) => handleOnChangeSelect(value)}
                        />
                        <div style={{ flex: 1 }}></div>
                      </div>
                    </th>
                  </>
                ) : (
                  <>
                    <th>
                      <div>
                        <input
                          type="checkbox"
                          name="allSelect"
                          checked={
                            !product.productDetails.some(
                              (pd) => pd.isChecked !== true
                            )
                          }
                          onChange={handleCheck}
                        />
                      </div>
                    </th>
                    {columns.map((col, index) => {
                      return (
                        <th
                          key={index + "-" + col.title}
                          className="custom-product-th"
                        >
                          {col.title}
                        </th>
                      );
                    })}
                  </>
                )}
              </tr>
            </thead>

            <tbody>
              {product.productDetails
                .filter((pd) => pd.status !== 3)
                .map((item, index) => {
                  return (
                    <tr key={item.id + "-" + index}>
                      <td>
                        <div>
                          <input
                            type="checkbox"
                            name={index.toString()}
                            checked={item?.isChecked || false}
                            onChange={(e) => handleCheck(e, index)}
                          />
                        </div>
                      </td>
                      <td>
                        <div>{index}</div>
                      </td>
                      <td>
                        <div
                          className="position-relative"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            const action = showUploadImage();
                            dispatch(action);
                            setCurrentItemFocused(index);
                          }}
                        >
                          <img
                            src={item.image ? item.image : placeholder}
                            style={{ width: 35, height: 38, borderRadius: 3 }}
                            alt="product-avatar"
                          />
                          <span className="add-images">+</span>
                        </div>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="code"
                          disabled
                          className="form-control custom-form-control input-text-right"
                          value={item.code}
                          onChange={(e) => handleOnChangeText(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          disabled
                          type="text"
                          name="barCode"
                          className="form-control custom-form-control input-text-right"
                          value={item.barCode}
                          onChange={(e) => handleOnChangeText(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="color"
                          id={"color-0"}
                          className="form-control custom-form-control input-text-right"
                          value={item.color}
                          onChange={(e) => handleOnChangeText(index, e)}
                          onBlur={(e) => handleCheckRule(e, index)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="size"
                          className="form-control custom-form-control input-text-right"
                          value={item.size}
                          onChange={(e) => handleOnChangeText(index, e)}
                          onBlur={(e) => handleCheckRule(e, index)}
                        />
                      </td>
                      <td>
                        <CurrencyFormat
                          name="price"
                          className="form-control custom-form-control input-text-right"
                          value={item.price || 0}
                          defaultValue={item.price}
                          decimalSeparator={","}
                          thousandSeparator={"."}
                          onValueChange={(values) => {
                            handleOnChangNumber(index, "price", values.value);
                          }}
                          suffix={" ₫"}
                          isAllowed={(val: any) => {
                            const { value } = val;
                            return value >= 0;
                          }}
                        />
                      </td>
                      <td>
                        <CurrencyFormat
                          name="priceSell"
                          className="form-control custom-form-control input-text-right"
                          value={item.priceSell || 0}
                          defaultValue={item.priceSell}
                          decimalSeparator={","}
                          thousandSeparator={"."}
                          onValueChange={(values) => {
                            handleOnChangNumber(
                              index,
                              "priceSell",
                              values.value
                            );
                          }}
                          suffix={" ₫"}
                          isAllowed={(val: any) => {
                            const { value } = val;
                            return value >= 0;
                          }}
                        />
                      </td>
                      <td>
                        <CurrencyFormat
                          name="quantity"
                          className="form-control custom-form-control input-text-right"
                          value={item.quantity || 0}
                          defaultValue={item.quantity}
                          suffix={""}
                          onValueChange={(values) => {
                            handleOnChangNumber(
                              index,
                              "quantity",
                              values.value
                            );
                          }}
                          isAllowed={(val: any) => {
                            const { value } = val;
                            return value >= 0;
                          }}
                        />
                      </td>
                      <td>
                        <CurrencyFormat
                          name="discountSell"
                          className="form-control custom-form-control input-text-right"
                          value={item.discountSell || 0}
                          defaultValue={item.discountSell}
                          decimalSeparator={","}
                          thousandSeparator={"."}
                          onValueChange={(values) => {
                            handleOnChangNumber(
                              index,
                              "discountSell",
                              values.value
                            );
                          }}
                          suffix={"%"}
                          isAllowed={(val: any) => {
                            const { value } = val;
                            return value >= 0 && value <= 100;
                          }}
                        />
                      </td>
                      <td>
                        <MyBadge
                          content={convertProductStatus(item.status)}
                          color={item.status === 1 ? "primary" : "danger"}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
      <MultiImage
        onSave={(values) => {
          handleOnSaveImages(values);
          const action = hideUploadImage();
          dispatch(action);
        }}
      />
    </div>
  );
}

export default DataTableProductDetail;

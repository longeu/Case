import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { convertProductStatus } from "../../../utils/convertStatus";
import { ProductResponse, SelectOption } from "../types";
import MyBadge from "components/Bedge/MyBadge";
import Sort from "./Sort";
import moment from "moment";
import Select from "react-select";
interface DataTableProps {
  data: ProductResponse[];
  onDelete: (productIds: ProductResponse[]) => void;
  onTranferStatus: (productIds: ProductResponse[]) => void;
  onChange: (products: ProductResponse[]) => void;
}

interface ColumnState {
  title: string;
  isSort?: boolean;
  sort?: string;
  order?: string;
}
const columns: ColumnState[] = [
  {
    title: "STT",
    isSort: false,
  },
  {
    title: "Ảnh",
  },
  {
    title: "Tên sản phẩm",
    isSort: true,
    sort: "name",
  },
  {
    title: "Loại",
  },

  {
    title: "Trạng thái",
  },
  {
    title: "Ngày tạo",
    isSort: true,
    sort: "createdAt",
  },
];
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
function DataTable(props: DataTableProps) {
  const history = useHistory();
  const [checkedProduct, setCheckedProduct] = useState([] as ProductResponse[]);
  const handleCheck = (e: any, index?: number) => {
    const { name, checked } = e.target;
    console.log(name, checked);

    if (name === "allSelect") {
      let tempProducts = props.data.map((p) => {
        return { ...p, isChecked: checked };
      });
      setCheckedProduct([...tempProducts]);
      props.onChange([...tempProducts]);
    } else {
      let tempProducts = props.data.map((pd, i) =>
        index === i ? { ...pd, isChecked: checked } : pd
      );
      setCheckedProduct([...tempProducts]);
      props.onChange([...tempProducts]);
    }
  };

  const handleOnSelect = (value: any) => {
    if (value.value === 1) {
      const productIds = checkedProduct.filter((pd) => pd.isChecked);
      props.onDelete(productIds);
    }
    if (value.value === 2) {
      const productIds = checkedProduct.filter((pd) => pd.isChecked);
      props.onTranferStatus(productIds);
    }
  };

  if (props.data.length === 0) {
    return (
      <div className="container">
        <div className="row">
          <div className="text-center">Không tìm thấy sản phẩm nào</div>
        </div>
      </div>
    );
  } else {
    return (
      <table className="table table-hover  position-relative">
        <thead className="table-light">
          <tr>
            {props.data.some((p) => p.isChecked) ? (
              <>
                <th>
                  <div>
                    <input
                      type="checkbox"
                      name="allSelect"
                      checked={!props.data.some((p) => p.isChecked !== true)}
                      onChange={handleCheck}
                    />
                  </div>
                </th>
                <th colSpan={10} style={{ padding: 0 }}>
                  <div className="d-flex">
                    <Select
                      className="form-select-sm p-0"
                      placeholder="Chọn thao tác"
                      options={selectOptions}
                      onChange={(value) => handleOnSelect(value)}
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
                      checked={!props.data.some((p) => p.isChecked !== true)}
                      onChange={handleCheck}
                    />
                  </div>
                </th>
                {columns.map((col, index) => {
                  return <th key={index + "-" + col.title}>{col.title}</th>;
                })}
              </>
            )}
          </tr>
        </thead>

        <tbody>
          {props.data &&
            props.data.map((item, index) => {
              return (
                <tr key={item.id + "-" + index} style={{ cursor: "pointer" }}>
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
                  <td
                    className="text-left"
                    onClick={() => {
                      history.push(`/product/${item.id}/detail`);
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    onClick={() => {
                      history.push(`/product/${item.id}/detail`);
                    }}
                  >
                    <img
                      style={{ width: "50px", height: "50px" }}
                      src={item.image}
                      alt="product"
                    />
                  </td>
                  <td>
                    <Link to={`/product/${item.id}/detail`}>
                      {item.name.toUpperCase()}{" "}
                    </Link>
                  </td>
                  <td
                    onClick={() => {
                      history.push(`/product/${item.id}/detail`);
                    }}
                  >
                    {item.categoryName}
                  </td>

                  <td
                    onClick={() => {
                      history.push(`/product/${item.id}/detail`);
                    }}
                  >
                    <MyBadge
                      content={convertProductStatus(item.status)}
                      color={item.status === 1 ? "primary" : "danger"}
                    />
                  </td>
                  <td>{moment(item.createdAt).format("L")}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

export default DataTable;

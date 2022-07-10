import React, { ReactInstance, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ProductDetailRequest, SelectOption } from "pages/Product/types";
import Sort from "pages/Product/components/Sort";
import moment from "moment";
import Select from "react-select";
import { formatter } from "types";
import { useReactToPrint } from "react-to-print";
import PrintBarCodes from "./PrintBarCode";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
interface DataTableProps {
  data: ProductDetailRequest[];
  onDelete: (productIds: ProductDetailRequest[]) => void;
  onChange: (products: ProductDetailRequest[]) => void;
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
  },
  {
    title: "Ảnh",
  },
  {
    title: "Code",
  },
  {
    title: "Barcode",
  },
  {
    title: "Tên sản phẩm",
  },
  {
    title: "Màu",
  },
  {
    title: "Kích thước",
  },
  {
    title: "Số lượng",
  },
  {
    title: "Số lượng bán",
  },
  {
    title: "Ngày tạo",
    isSort: true,
    sort: "createdAt",
  },
  {
    title: "Giá bán",
  },
  {
    title: "Giá nhập",
  },
];
const selectOptions: SelectOption[] = [
  {
    value: 1,
    label: "Xóa sản phẩm",
  },
  {
    value: 2,
    label: "In barcode",
  },
];
function DataTableStorageList(props: DataTableProps) {
  const history = useHistory();
  const [checkedProduct, setCheckedProduct] = useState(
    [] as ProductDetailRequest[]
  );
  const { isShowSideBar } = useSelector(
    (state: RootState) => state.sideBarReducer
  );
  const printComponentRef = useRef<ReactInstance>(null);
  const handleCheck = (e: any, index?: number) => {
    const { name, checked } = e.target;
    console.log(name, checked);

    if (name === "allSelect") {
      let tempProductDetails = props.data.map((p) => {
        return { ...p, isChecked: checked };
      });
      setCheckedProduct([...tempProductDetails]);
      props.onChange([...tempProductDetails]);
    } else {
      let tempProductDetails = props.data.map((pd, i) =>
        index === i ? { ...pd, isChecked: checked } : pd
      );
      setCheckedProduct([...tempProductDetails]);
      props.onChange([...tempProductDetails]);
    }
  };

  const handleOnSelect = (value: any) => {
    if (value.value === 1) {
      const productDetailsIds = checkedProduct.filter((pd) => pd.isChecked);
      props.onDelete(productDetailsIds);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
  });

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
      <table
        className={
          !isShowSideBar
            ? "table table-hover position-relative"
            : "table table-hover position-relative "
        }
      >
        <thead className="table-light">
          <tr>
            {columns.map((col, index) => {
              return <th key={index + "-" + col.title}>{col.title}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          <button className="d-none" onClick={handlePrint}>
            DSD
          </button>
          {props.data &&
            props.data.map((item, index) => {
              return (
                <tr
                  key={item.productId + "-" + index}
                  style={{ cursor: "pointer" }}
                >
                  <td
                    className="text-left"
                    onClick={() => {
                      history.push(`/product/${item.productId}/detail`);
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    onClick={() => {
                      history.push(`/product/${item.productId}/detail`);
                    }}
                  >
                    <img
                      style={{ width: "50px", height: "50px" }}
                      src={item.image}
                      alt="product"
                    />
                  </td>
                  <td
                    className="text-center"
                    onClick={() => {
                      history.push(`/product/${item.productId}/detail`);
                    }}
                  >
                    {item.code}
                  </td>
                  <td
                    className="text-center"
                    onClick={() => {
                      history.push(`/product/${item.productId}/detail`);
                    }}
                  >
                    {item.barCode}
                  </td>
                  <td>
                    <Link to={`/product/${item.productId}/detail`}>
                      {item.productName}
                    </Link>
                  </td>
                  <td
                    onClick={() => {
                      history.push(`/product/${item.productId}/detail`);
                    }}
                  >
                    {item.color}
                  </td>
                  <td
                    className="text-center"
                    onClick={() => {
                      history.push(`/product/${item.productId}/detail`);
                    }}
                  >
                    {item.size}
                  </td>

                  <td
                    className="text-center"
                    onClick={() => {
                      history.push(`/product/${item.productId}/detail`);
                    }}
                  >
                    {item.quantity}
                  </td>
                  <td
                    className="text-center"
                    onClick={() => {
                      history.push(`/product/${item.productId}/detail`);
                    }}
                  >
                    {item.quantitySell}
                  </td>
                  <td>{moment(item.createdAt).format("L")}</td>
                  <td
                    onClick={() => {
                      history.push(`/product/${item.productId}/detail`);
                    }}
                  >
                    {formatter.format(item.priceSell)}
                  </td>
                  <td
                    onClick={() => {
                      history.push(`/product/${item.productId}/detail`);
                    }}
                  >
                    {formatter.format(item.price)}
                  </td>
                </tr>
              );
            })}
        </tbody>
        {/* <PrintBarCodes
          ref={printComponentRef}
          barCodes={props.data.map((bc, index) => {
            return {
              name: bc.productName,
              barCode: bc.barCode,
              color: bc.color,
              size: bc.size,
              price: bc.price,
            };
          })}
        /> */}
      </table>
    );
  }
}

export default DataTableStorageList;

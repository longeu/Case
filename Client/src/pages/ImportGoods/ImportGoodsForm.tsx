import React, { ReactElement } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import "react-confirm-alert/src/react-confirm-alert.css";

import baseApi from "api/baseApi";
import ImportGoods from "interfaces/import-goods.interface";
import ProductDetail from "interfaces/product-detail.interface";
import styles from "./index.module.css";
import ProductDetails from "./ProductDetails";
import { PurchaseOrderDetailInterface } from "interfaces/import-goods-detail.interface";
import { formatter } from "types";
import InfiniteScroll from "react-infinite-scroll-component";
import { setTimeout } from "timers";
import { SupplierInterface } from "interfaces/supplier.interface";
import Supplier from "./components/Supplier";
import ProductResult from "./components/ProductResult";
import { setShow } from "reducers/toastSlice";
import { useDispatch } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { hideSideBar } from "reducers/sideBarSlice";
import ModalDiscount from "./components/ModalDiscount";
import CurrencyFormat from "react-currency-format";

export default function ImportGoodsForm(): ReactElement {
  const confirmClearOrder = () => {
    confirmAlert({
      title: "Xác nhận",
      message:
        "Hệ thống sẽ không lưu lại thông tin của đơn hàng này. Bạn có chắc chắn hủy đơn hàng này không?",
      buttons: [
        {
          label: "Đồng ý",
          className: "btn-confirm-success",
          onClick: () => handleOnClear(),
        },
        {
          label: "Thoát",
          onClick: () => {},
        },
      ],
    });
  };
  const dispatch = useDispatch();
  const id: any = useParams();
  const history = useHistory();
  const handleBack = () => {
    history.push("/import-goods");
  };
  const [importGoods, setImportGoods] = React.useState({} as ImportGoods);
  const [products, setProducts] = React.useState([] as Array<ProductDetail>);
  const [suppliers, setSuppliers] = React.useState<Array<SupplierInterface>>(
    [] as Array<SupplierInterface>
  );
  const [supplier, setSupplier] = React.useState({} as SupplierInterface);
  const [isShowSuppliers, setIsShowSuppliers] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchSupplierValue, setSearchSupplierValue] = React.useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [showResult, setShowResult] = React.useState({
    overflowY: "scroll",
    maxHeight: "500px",
    display: "none",
  } as any);
  const [totalDiscountModal, setTotalDiscountModal] = React.useState({} as any);
  const [productDetailModal, setProductDetailModal] = React.useState({} as any);
  const [productResult, setProductResult] = React.useState(
    [] as Array<PurchaseOrderDetailInterface>
  );
  const [isEdit, setIsEdit] = React.useState(false);
  const getImportGoods = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/import-goods/${id.id}`
      );
      const data = await response.json();
      if (data.status === 1) {
        setIsEdit(false);
      }
      setIsEdit(true);
      setImportGoods(data);
      console.log(data);
      setSupplier({
        ...supplier,
        id: data.supplierId,
        name: data.supplierName,
      });
      const pResult = data.importGoodsDetails.map((item: any) => {
        return {
          ...item,
          productDetail: {
            ...item.productDetail,
          },
        } as PurchaseOrderDetailInterface;
      });
      setProductResult(pResult);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const [size, setSize] = React.useState(10);
  const refs = React.useRef(products.map(() => React.createRef()) as any);
  const inputQuantityRef = React.useRef(
    productResult.map(() => React.createRef()) as any
  );
  const updateQuantityRefLength = (e: number) => {
    inputQuantityRef.current = inputQuantityRef.current.slice(0, e);
    for (let i = 0; i < e; i++) {
      inputQuantityRef.current[i] =
        inputQuantityRef.current[i] || React.createRef();
    }
    inputQuantityRef.current = inputQuantityRef.current.map(
      (item: any) => item || React.createRef()
    );
  };
  function updateLength({ target: { value } }: any) {
    refs.current = refs.current.splice(0, value);
    for (let i = 0; i < value + 1; i++) {
      refs.current[i] = refs.current[i] || React.createRef();
    }
    refs.current = refs.current.map((item: any) => item || React.createRef());
  }

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await baseApi.get("product_details", {
        search: searchValue.trim(),
        status: 1,
        page: 0,
        size: size,
      });
      setProducts(response.data.data);
      updateLength({ target: { value: response.data.data.length } });
    } catch (err) {
      console.log(err);
    }
  };
  const handleOnAddProduct = (productDetail: ProductDetail) => {
    console.log(productDetail);
    updateQuantityRefLength(productResult.length + 1);
    if (productResult.length === 0) {
      setProductResult([
        {
          productDetailId: productDetail.id,
          productDetail: productDetail,
          quantity: 1,
          discount: 0,
          productCode: productDetail.code,
          price: productDetail.price,
          color: productDetail.color,
          size: productDetail.size,
        },
      ]);
    } else if (
      productResult.find(
        (item: any) => item.productDetailId === productDetail.id
      )
    ) {
      let newData;
      let new1: any = {};
      productResult.forEach((item: any) => {
        if (item.productDetailId === productDetail.id) {
          new1 = item;
        }
      });
      newData = productResult.filter(
        (item) => item.productDetailId !== productDetail.id
      );
      setProductResult([
        {
          ...new1,
          quantity: new1.quantity + 1,
          productCode: productDetail.code,
          productDetailId: productDetail.id,
          price: productDetail.price,
          productDetail: productDetail,
          discount: productDetail.discount,
          color: productDetail.color,
          size: productDetail.size,
        },
        ...newData,
      ]);
    } else {
      setProductResult([
        {
          productDetailId: productDetail.id,
          productDetail: productDetail,
          quantity: 1,
          discount: 0,
          price: productDetail.price,
          productCode: productDetail.code,
        },
        ...productResult,
      ]);
    }
    setTimeout(() => {
      inputQuantityRef.current[0].current.focus();
    }, 500);
  };
  const [discount, setDiscount] = React.useState(0);

  const handleDiscountOnChange = (e: any, product: any) => {
    console.log(e);
    setDiscount(e);
    const newData = productResult.map((item: any) => {
      console.log(item.quantity);
      if (item.productDetailId === product.productDetailId) {
        item.discount = parseFloat(e) || 0;
        item.totalPrice = item.quantity * item.price - e;
        console.log(item.totalPrice);
      }
      return item;
    });
    console.log(newData);
    setProductResult(newData);
  };
  const handleQuantityOnChange = (
    e: any,
    product: PurchaseOrderDetailInterface
  ) => {
    const value = e.target.value;
    if (parseInt(value) === 0) {
      const newProduct = productResult.filter((item) => {
        return item.productDetailId !== product.productDetailId;
      });
      setProductResult(newProduct);
    } else {
      const newData = productResult.map((item) => {
        if (item.productDetailId === product.productDetailId) {
          return {
            ...item,
            quantity: parseInt(value),
            totalPrice:
              item.quantity *
              (item.price || 0) *
              (1 - (item.discount || 0) / 100),
          };
        }
        return item;
      });
      setProductResult(newData);
    }
  };
  const handleOnPlus = (id: number) => {
    const newData = productResult.map((item) => {
      if (item.productDetailId === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
          totalPrice:
            (item.quantity + 1) *
            (item.price || 0) *
            (1 - (item.discount || 0) / 100),
        };
      }
      return item;
    });
    setProductResult(newData);
  };

  const handleOnMinus = (id: number) => {
    if (id) {
      const newData = productResult.map((item) => {
        if (item.productDetailId === id) {
          if (item.quantity > 0) {
            return {
              ...item,
              quantity: item.quantity - 1,
              totalPrice:
                (item.quantity - 1) *
                (item.price || 0) *
                (1 - (item.discount || 0) / 100),
            };
          }
        }
        return item;
      });
      setProductResult(newData);
    } else {
      const newData = productResult.filter((item) => {
        return item.id !== id;
      });
      setProductResult(newData);
    }
  };
  const handleOnClear = () => {
    setProductResult([]);
  };
  const [totalDiscount, setTotalDiscount] = React.useState({
    value: "0",
    label: "0",
  } as any);

  const handleOnSave = () => {
    if (supplier.id === undefined) {
      const action = setShow({
        show: true,
        content: "Chưa chọn nhà cung cấp!",
        type: "error",
      });
      dispatch(action);
    } else {
      if (id.id !== undefined) {
        const response = baseApi.put(`/import-goods`, {
          ...importGoods,
          supplierId: supplier.id,
          importGoodsDetails: productResult,
          id: id.id,
          status: 0,
        });
        response
          .then((res) => {
            const action = setShow({
              show: true,
              content: "Đã lưu thông tin đơn nhập",
              type: "success",
            });
            dispatch(action);
            history.push("/bill/import/list");
          })
          .catch(() => {
            const action = setShow({
              show: true,
              content: "Lưu thông tin đơn thất bại !",
              type: "error",
            });
            dispatch(action);
          });
      } else {
        const response = baseApi.post(`/import-goods`, {
          ...importGoods,
          status: 0,
          supplierId: supplier.id,
          importGoodsDetails: productResult,
        });
        response
          .then((res) => {
            const action = setShow({
              show: true,
              content: "Đã lưu thông tin đơn nhập",
              type: "success",
            });
            dispatch(action);
            history.push("/bill/import/list");
          })
          .catch(() => {
            const action = setShow({
              show: true,
              content: "Lưu thông tin đơn thất bại!",
              type: "error",
            });
            dispatch(action);
          });
      }
    }
  };

  const handleOnImportSuccess = () => {
    if (supplier.id === undefined) {
      const action = setShow({
        show: true,
        content: "Chưa chọn nhà cung cấp!",
        type: "error",
      });
      dispatch(action);
    } else {
      const data = {
        importGoods,
        supplierId: supplier.id,
        importGoodsDetails: productResult,
      };
      const response = baseApi.put(`/import-goods`, {
        ...importGoods,
        id: id.id,
        status: 1,
        supplierId: supplier.id,
        importGoodsDetails: productResult,
      });
      response
        .then((res) => {
          const action = setShow({
            show: true,
            content: "Đã lưu thông tin đơn nhập",
            type: "success",
          });
          dispatch(action);
          history.push("/bill/import/list");
        })
        .catch((err) => {
          const action = setShow({
            show: true,
            content: "Bạn chưa chọn sản phẩm !",
            type: "error",
          });
          dispatch(action);
        });
    }
  };
  const loadMore = () => {
    setTimeout(() => {
      setSize(size + 7);
    }, 1000);
  };
  const getSuppliers = async () => {
    const response = await baseApi.get(`suppliers`, {
      page: 1,
      size: 10,
      status: 1,
      search: searchSupplierValue.trim(),
    });
    setSuppliers(response.data.data);
    console.log(response);
  };
  const hasMore = true;
  window.onkeydown = (e) => {
    if (e.key === "F2" && searchBoxRef.current) {
      searchBoxRef.current.focus();
    }
  };
  const onSelectItem = (e: any) => {
    console.log(e.key);
    if (e.key === "ArrowDown") {
      console.log({ refs });
      if (index === products.length - 1) {
        refs.current[index].current.focus();
        refs.current[index].current.scrollIntoView();
      } else {
        refs.current[index].current.focus();
        refs.current[index].current.scrollIntoView();
        setIndex(index + 1);
      }
      if (index < refs.current.length - 3) {
        loadMore();
      }
    }
    if (e.key === "Enter") {
      const product = products[index];
      handleOnAddProduct(product);
      setShowResult({ display: "none" });
      setSearchValue("");
      setIndex(0);
    }
    if (e.key === "ArrowUp") {
      if (index === 0) {
        refs.current[index].current.scrollIntoView();
        refs.current[index].current.focus();
      } else {
        refs.current[index].current.focus();
        refs.current[index].current.scrollIntoView();
        setIndex(index - 1);
      }
    }
  };
  const [index, setIndex] = React.useState(0);
  const searchBoxRef = React.useRef<HTMLInputElement>(null);
  const handleSelectSupplier = (e: any) => {
    setSupplier(e);
  };
  React.useEffect(() => {
    const action = hideSideBar();
    dispatch(action);
  });
  React.useEffect(() => {
    if (id.id) {
      getImportGoods();
    } else {
      setIsEdit(true);
    }
    getProduct();
  }, [id.id, searchValue, size]);
  React.useEffect(() => {
    let val1 = productResult.reduce((total, item) => {
      return (
        total + (item.quantity || 0) * (item.price || 0) - (item.discount || 0)
      );
    }, 0);
    setImportGoods({
      ...importGoods,
      totalQuantity: productResult.reduce((total, item) => {
        return total + item.quantity;
      }, 0),
      discount: totalDiscount.value || 0,
      totalPrice: val1,
      price: val1 - discount,
      purchaseOrderDetails: productResult,
    });
    console.log("23");
    return () => {
      setImportGoods({} as ImportGoods);
    };
  }, [productResult, totalDiscount]);
  const handleOnShowModalDiscount = () => {
    setModalShow(true);
    setTotalDiscountModal({
      isTotalDiscount: true,
      totalPrice: importGoods.totalPrice,
    });
  };
  const handleOnShowProductDetailModalDiscount = (product: any) => {
    setModalShow(true);
    if (product) {
      setTotalDiscountModal({
        isTotalDiscount: false,
      });
      setProductDetailModal(product);
    }
  };
  return (
    <div>
      <ModalDiscount
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={productDetailModal}
        discount={discount}
        setDiscount={setDiscount}
        totalDiscountModal={totalDiscountModal}
        setTotalDiscountModal={setTotalDiscountModal}
        importGoods={importGoods}
        setImportGoods={setImportGoods}
        productDetailModal={productDetailModal}
        setProductDetailModal={setProductDetailModal}
        handleDiscountOnChange={(e: any, p: any) => {
          handleDiscountOnChange(e, p);
        }}
      />
      <section className="content-header" style={{ padding: "15px 25px" }}>
        <div className="container-fluid">
          <div className="d-flex algin-items-center justify-content-space-between">
            <div>
              <h1>
                <i className="fas fa-truck"></i> Nhập hàng
              </h1>
            </div>
            <div style={{ flex: "1" }}> </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid" style={{ width: "98%" }}>
          <div className="row p-0">
            <div
              className="col-md-8 col"
              style={{ backgroundColor: "#fff", height: 620, paddingTop: 20 }}
            >
              {importGoods.status !== 1 && (
                <div
                  className={[styles.search_product, "p-0 col-12"].join(" ")}
                >
                  <div>
                    <input
                      onKeyDown={(e) => onSelectItem(e)}
                      type="search"
                      className="form-control m-0 mb-3"
                      placeholder="Thêm sản phẩm vào đơn (F2)"
                      value={searchValue}
                      onFocus={() => {
                        setShowResult({ display: "block" });
                        getProduct();
                      }}
                      onBlur={() => {
                        setTimeout(() => {
                          setSearchValue("");
                          setShowResult({ display: "none" });
                          setIndex(0);
                        }, 200);
                      }}
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                      }}
                      style={{ float: "right", width: "100%" }}
                      ref={searchBoxRef}
                    />
                  </div>
                  <div
                    style={showResult}
                    className={[
                      styles.result_search,
                      "mt-2 overflow-auto",
                      "border",
                    ].join(" ")}
                  >
                    {products && (
                      <InfiniteScroll
                        dataLength={products.length}
                        next={loadMore}
                        hasMore={hasMore}
                        height={500}
                        loader={
                          <div className="text-center text-primary">
                            <div
                              className="spinner-border spinner-border-sm"
                              role="status"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        }
                      >
                        {products.map((product, i) => {
                          return (
                            <ProductDetails
                              productRef={refs.current[i]}
                              product={product}
                              key={i}
                              isSelected={i === index}
                              handleOnAddProduct={() =>
                                handleOnAddProduct(product)
                              }
                            />
                          );
                        })}
                      </InfiniteScroll>
                    )}
                  </div>
                </div>
              )}
              <table className="table table-sm col-12 mt-2">
                <thead>
                  <tr className="text-center">
                    <th scope="col text-left">Mã sản phẩm</th>
                    <th scope="col text-left">Tên sản phẩm</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Đơn giá</th>
                    <th scope="col">Chiết khấu</th>
                    <th scope="col">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {productResult
                    ? productResult.map((product, index) => (
                        <ProductResult
                          product={product}
                          key={index}
                          index={index}
                          handleOnMinus={(id) => handleOnMinus(id)}
                          handleOnPlus={(id) => handleOnPlus(id)}
                          handleQuantityOnChange={(
                            e,
                            p: PurchaseOrderDetailInterface
                          ) => handleQuantityOnChange(e, p)}
                          status={importGoods.status}
                          handleOnShowProductDetailModalDiscount={() =>
                            handleOnShowProductDetailModalDiscount(product)
                          }
                          productResult={productResult}
                          setProductResult={setProductResult}
                          inputQuantityRef={
                            inputQuantityRef.current[index || 0]
                          }
                          updateQuantityRefLength={updateQuantityRefLength}
                        />
                      ))
                    : null}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5}>Tổng tiền</td>
                    <td className="text-end">
                      {formatter.format(
                        productResult.reduce((total, item) => {
                          return (
                            total +
                            (item.quantity || 0) * (item.price || 0) -
                            (item.discount || 0)
                          );
                        }, 0)
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="col-md-4 col">
              <div
                className="card text-left m-0 bg-white"
                style={{ height: "100%" }}
              >
                <div className="card-body row">
                  <div
                    className={[styles.search, "mb-2"].join(" ")}
                    style={{ borderBottom: "1px solid", height: "45px" }}
                  >
                    {supplier.id && (
                      <div style={{ fontSize: 20, lineHeight: 2.3 }}>
                        <i className="fas fa-dolly"></i>{" "}
                        <span>{supplier.name}</span>
                        {importGoods.status !== 1 && (
                          <i
                            className="fas fa-times-circle"
                            onClick={() => {
                              setSupplier({} as SupplierInterface);
                            }}
                            style={{ float: "right", lineHeight: 2.3 }}
                          ></i>
                        )}
                      </div>
                    )}
                    {!supplier.id && (
                      <div className="input-group input-group-md mb-3">
                        <div
                          className={["col-10", styles.supplier_search].join(
                            " "
                          )}
                          style={{ paddingLeft: 0 }}
                        >
                          {" "}
                          <input
                            style={{ outline: "none" }}
                            className="form-control form-control-navbar border "
                            type="search"
                            placeholder="Thêm nhà cung cấp vào đơn"
                            value={searchSupplierValue}
                            aria-label="Search"
                            onChange={(e) => {
                              setSearchSupplierValue(e.target.value.trim());
                              getSuppliers();
                            }}
                            onFocus={() => {
                              setIsShowSuppliers(true);
                              getSuppliers();
                            }}
                            onBlur={() => {
                              setTimeout(() => {
                                setSearchSupplierValue("");
                                setIsShowSuppliers(false);
                                console.log("onBlur");
                              }, 200);
                            }}
                          />
                          <div
                            className={[styles.suppliers_response].join(" ")}
                            style={{
                              display: isShowSuppliers ? "block" : "none",
                            }}
                          >
                            {suppliers.map((item, i) => (
                              <Supplier
                                key={i}
                                supplier={item}
                                onSelectSupplier={(e: any) =>
                                  handleSelectSupplier(e)
                                }
                              />
                            ))}
                          </div>
                        </div>
                        <div
                          className="col-2 text-right "
                          style={{ paddingRight: 0 }}
                        >
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => {
                              history.push("/suppliers/create");
                            }}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-12 row">
                    <span className="col-8">Số loại sản phẩm: </span>
                    <span className="col-4" style={{ textAlign: "right" }}>
                      {productResult.length || 0}
                    </span>
                  </div>
                  <div className="col-12 row mt-2">
                    <span
                      className="col-8 font-weight-bold"
                      style={{ fontSize: 22 }}
                    >
                      Tổng số sản phẩm:{" "}
                    </span>
                    <span
                      className="col-4 font-weight-bold"
                      style={{ textAlign: "right", fontSize: 22 }}
                    >
                      {importGoods.totalQuantity || 0}
                    </span>
                  </div>
                  <div className="col-12 row mt-2" style={{ fontSize: 20 }}>
                    <span className="col-8" style={{ lineHeight: 2.1 }}>
                      Trạng thái:
                    </span>
                    <span className="col-4" style={{ textAlign: "right" }}>
                      {importGoods.status !== 1 && (
                        <span className="badge badge-danger">Lên đơn</span>
                      )}
                      {importGoods.status === 1 && (
                        <span className="badge badge-success">Hoàn thành</span>
                      )}
                    </span>
                  </div>
                  <div
                    className="col-12 row mt-2"
                    style={{ borderBottom: "1px solid darkgray", fontSize: 20 }}
                  >
                    <span className="col-8" style={{ lineHeight: 3 }}>
                      Chiết khấu:
                    </span>
                    {importGoods.status !== 1 ? (
                      <div
                        onClick={() => {
                          handleOnShowModalDiscount();
                        }}
                        className="col-4 text-right"
                        style={{ cursor: "pointer" }}
                      >
                        <CurrencyFormat
                          type="text"
                          disabled={true}
                          style={{
                            textAlign: "right",
                            cursor: "pointer",
                            border: "none",
                            borderBottom: "1.5px solid darkgray",
                            borderRadius: 0,
                            padding: 0,
                            background: "#fff",
                            fontSize: "17px",
                            color: "black",
                          }}
                          className="form-control"
                          value={importGoods.discount}
                          decimalSeparator={","}
                          thousandSeparator={"."}
                          suffix={" ₫"}
                        />
                      </div>
                    ) : (
                      <span
                        className="col-4 text-end"
                        style={{ lineHeight: 3 }}
                      >
                        {formatter.format(importGoods.discount || 0)}
                      </span>
                    )}
                  </div>
                  <div
                    className="row mt-3 font-weight-bold"
                    style={{ fontSize: 20 }}
                  >
                    <span className="col-md-6 " style={{ paddingLeft: 3 }}>
                      Số tiền ban đầu:
                    </span>
                    <span
                      className="col-md-6  text-success"
                      style={{ textAlign: "right" }}
                    >
                      {formatter.format(importGoods.totalPrice) || 0}
                    </span>
                  </div>
                  <div
                    className="row font-weight-bold"
                    style={{ fontSize: "25px" }}
                  >
                    <span className="col-md-6" style={{ paddingLeft: 3 }}>
                      Số tiền trả:
                    </span>
                    <p
                      className="col-md-6 text-danger"
                      style={{ textAlign: "right" }}
                    >
                      {formatter.format(importGoods.price) || 0}
                    </p>
                  </div>
                </div>
                <div className="card-footer bg-white">
                  <label htmlFor="description">Ghi chú: </label>
                  {importGoods.status !== 1 && (
                    <textarea
                      name="description"
                      id=""
                      rows={3}
                      className="form-control"
                      value={importGoods.description}
                      onChange={(e) => {
                        setImportGoods({
                          ...importGoods,
                          description: e.target.value,
                        });
                      }}
                      style={{ resize: "none" }}
                    ></textarea>
                  )}
                  {importGoods.status === 1 && (
                    <div style={{ marginBottom: 80 }}>
                      <span>{importGoods.description}</span>
                    </div>
                  )}
                  {importGoods.status !== 1 && (
                    <div>
                      {isEdit && (
                        <button
                          type="button"
                          className="btn btn-default mt-2 mr-2"
                          onClick={() => {
                            confirmClearOrder();
                          }}
                        >
                          Dọn dẹp đơn hàng
                        </button>
                      )}

                      <div style={{ float: "right" }}>
                        <button
                          type="button"
                          className="btn btn-primary mt-2 mr-2"
                          onClick={() => {
                            handleOnSave();
                          }}
                          disabled={supplier.id ? false : true}
                        >
                          {/* {importGoods.status && "Tạo đơn"} */}
                          {importGoods.status === 0 ? "Cập nhật" : "Tạo đơn"}
                        </button>
                        <button
                          className="btn btn-success mt-2"
                          style={{ float: "right" }}
                          onClick={() => {
                            handleOnImportSuccess();
                          }}
                        >
                          Hoàn Thành
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

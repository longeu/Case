import baseApi from "api/baseApi";
import { RootState } from "app/store";
import ModalCreateCustomer from "components/Modal/ModalCreateCustomer";
import { customerType } from "interfaces/customerType.interface";
import orderDetail from "interfaces/orderDetail.interface";
import orderType from "interfaces/orderType.interface";
import { initialCustomer } from "pages/Customer/Initial";
import { ProductDetailRequest } from "pages/Product/types";
import React, { ReactInstance, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactToPrint from "react-to-print";
import {
  add,
  addCustomer,
  addOrderTabs,
  changeMoney,
  changeNote,
  changePayment,
  remove,
  removeAll,
  removeCustomer,
  update,
} from "reducers/orderSlice";
import { hideSideBar } from "reducers/sideBarSlice";
import { setShow } from "reducers/toastSlice";
import { discountPrice } from "utils/countPrice";
import { ComponentProps } from "../../types";
import CheckOut from "./Components/checkout";

import SearchCustomerResult from "./Components/Search/searchResultCustomer";
import SearchResultProduct from "./Components/Search/searchResultProduct";
import ListProductResult from "./Components/Table/ListProductResult";
import styles from "./index.module.css";
import moment from "moment";
import ComponentToPrint from "./ComponentToPrint/ComponentToPrint";
function SaleCreate(props: ComponentProps) {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);
  const orderSlice = useSelector((state: RootState) => state.orderReducer);
  const { user } = useSelector((state: RootState) => state.currentUser);
  const [activeOrder, setActiveOrder] = useState(0);
  const [order, setOrder] = useState(orderSlice[0]);
  const [orderCode, setOderCode] = useState("");

  const [productDetails, setProductDetails] = useState(
    [] as ProductDetailRequest[]
  );
  const [showResult, setShowResult] = React.useState<any>({
    display: "none",
  });
  const [searchResultCustomer, setSearchResultCustomer] = React.useState("");
  const [hasMore, setHasMore] = useState(true);
  const [customers, setCustomers] = useState([] as customerType[]);
  const [showResultCustomer, setShowResultCustomer] = React.useState<any>({
    display: "none",
  });
  const [filterProduct, setFilterProduct] = useState({
    size: 10,
    search: "",
  });
  const [totalProduct, setTotalProduct] = useState(0);
  const [tabs, setTabs] = React.useState([
    {
      id: 0,
      isActive: true,
    },
  ] as any);
  useEffect(() => {
    const action = hideSideBar();
    dispatch(action);
  });
  useEffect(() => {
    setOrder(orderSlice[activeOrder]);
  }, [activeOrder, orderSlice[activeOrder]]);
  const [customer, setCustomer] = useState<customerType>(
    order?.customer || initialCustomer
  );
  useEffect(() => {
    setCustomer(order?.customer || initialCustomer);
  }, [order?.customer]);
  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await baseApi.get("customers", {
          page: 1,
          size: 5,
          fromDate: "2000-01-01",
          toDate: moment(new Date()).format("yyyy-MM-DD"),
          search: searchResultCustomer,
        });
        const { data } = response.data;

        setCustomers(data);
        updateLengthCustomerRef(data.length);
        console.log(data.length);
      } catch (error) {}
    };
    getCustomers();
  }, [searchResultCustomer, modalShow]);
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await baseApi.get(
          "product_details/sale",
          filterProduct
        );

        setProductDetails(response.data);
        setTotalProduct(response.data.length);
        updateLength(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    getProductDetails();
  }, [filterProduct]);
  useEffect(() => {
    const tabs = orderSlice.map((obj: orderType, index: number) => {
      if (index == 0) {
        return {
          id: index,
          isActive: true,
        };
      }
      return {
        id: index,
        isActive: false,
      };
    });
    setTabs(
      tabs[0]
        ? tabs
        : [
            {
              id: 0,
              isActive: true,
            },
          ]
    );
  }, []);
  useEffect(() => {
    const currentTab = tabs.filter((tab: any) => tab.isActive);
    setActiveOrder(currentTab[0]?.id || 0);
  }, [tabs]);
  const alertMessage = () => {
    const action = setShow({
      show: true,
      content: "Sản phẩm này hiện tại đã hết hàng !",
      type: "error",
    });
    dispatch(action);
  };

  const showModalCustomer = () => {
    setModalShow(true);
  };
  const handleClick = async (
    productDetail: ProductDetailRequest,
    quantity: number = 1
  ) => {
    const orderDetail: orderDetail = {
      price: productDetail.priceSell,
      quantity: quantity,
      productDetailModel: productDetail,
      discount:
        quantity *
        discountPrice(productDetail.priceSell, productDetail.discountSell),
    };
    const action = add({ orderDetail: orderDetail, index: activeOrder });
    dispatch(action);

    const productIndex = order?.orderDetails.findIndex(
      (orderDetail: orderDetail) =>
        orderDetail.productDetailModel.id === productDetail.id
    );
    if (productIndex == -1 && order?.orderDetails.length === 0) {
      updateLengthInput(1);

      setTimeout(() => {
        listProductRefs.current[0].current.focus();
      }, 500);
    } else if (productIndex == -1 && order?.orderDetails.length !== 0) {
      updateLengthInput(order?.orderDetails.length + 1);
      setTimeout(() => {
        listProductRefs.current[order?.orderDetails.length].current.focus();
      }, 500);
    } else {
      updateLengthInput(order?.orderDetails.length);
      listProductRefs.current[productIndex].current.focus();
    }
    setShowResult({ display: "none" });
    setFilterProduct({
      ...filterProduct,
      search: "",
    });
    setIndex(0);
  };

  const handleClickUpdate = async (
    productDetail: ProductDetailRequest,
    quantity: number
  ) => {
    const orderDetail: orderDetail = {
      price: productDetail.priceSell,
      quantity: quantity,
      discount:
        quantity *
        discountPrice(productDetail.priceSell, productDetail.discountSell),
      productDetailModel: productDetail,
    };
    const action = update({ orderDetail: orderDetail, index: activeOrder });

    dispatch(action);
  };

  const handleClickRemove = (productDetailId: Number) => {
    if (order?.orderDetails.length === 1) {
      const action = removeAll({ index: activeOrder });
      dispatch(action);
      removeTab(activeOrder);
    } else {
      const action = remove({ index: activeOrder, productDetailId });
      dispatch(action);
    }
  };
  const handleClickRemoveAll = (index: number) => {
    const action = removeAll({ index: activeOrder });
    dispatch(action);
    removeTab(activeOrder);
  };

  function updateLengthCustomerRef(value: any) {
    listCustomerRefs.current = listCustomerRefs.current.splice(0, value || 0);
    for (let i = 0; i < value + 1; i++) {
      listCustomerRefs.current[i] =
        listCustomerRefs.current[i] || React.createRef();
    }
    listCustomerRefs.current = listCustomerRefs.current.map(
      (item: any) => item || React.createRef()
    );
  }

  const handleClickCustomer = (customer: customerType) => {
    setCustomer(customer);
    const action = addCustomer({ customer: customer, index: activeOrder });
    dispatch(action);
  };

  const handleChangeMoney = (money: number) => {
    const action = changeMoney({ money: money, index: activeOrder });
    dispatch(action);
  };
  const handleChangePayment = (e: any) => {
    const action = changePayment({
      payment: e.target.value,
      index: activeOrder,
    });
    dispatch(action);
  };
  const handleChangeNote = (e: any) => {
    const action = changeNote({ note: e.target.value, index: activeOrder });
    dispatch(action);
  };

  const handleClickRemoveCustomer = () => {
    setCustomer(initialCustomer);
    const action = removeCustomer({ index: activeOrder });
    dispatch(action);
  };

  const fetchMoreData = () => {
    if (productDetails.length < filterProduct.size) {
      setHasMore(false);
    } else {
      setTimeout(() => {
        setFilterProduct({
          ...filterProduct,
          size: filterProduct.size + 7,
        });
      }, 1000);
    }
  };
  const componentRef = useRef<ReactInstance>(null);
  const onBeforeGetContentResolve = React.useRef<any>(null);
  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [order, orderCode]);

  const handleOnBeforeGetContent = React.useCallback(() => {
    return new Promise<void>((resolve) => {
      onBeforeGetContentResolve.current = resolve;
      setTimeout(async () => {
        try {
          const data: orderType = {
            ...order,
            accountId: user.id,
          };
          const response = await baseApi.post("orders", data);
          const orderModel = response.data;
          setOderCode(orderModel.code);
        } catch (error) {
          console.log(error);
        }
        resolve();
      }, 500);
    });
  }, [order, setOderCode]);
  React.useEffect(() => {
    if (typeof onBeforeGetContentResolve.current === "function") {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, order, orderCode]);
  const refs = React.useRef(productDetails.map(() => React.createRef()) as any);
  const listProductRefs = React.useRef(
    order?.orderDetails.map(() => React.createRef()) as any
  );
  const listCustomerRefs = React.useRef(
    customers.map(() => React.createRef()) as any
  );
  function updateLength(value: any) {
    refs.current = refs.current.splice(0, value);
    for (let i = 0; i < value; i++) {
      refs.current[i] = refs.current[i] || React.createRef();
    }
    refs.current = refs.current.map((item: any) => item || React.createRef());
  }
  function updateLengthInput(value: any) {
    listProductRefs.current = listProductRefs.current.splice(0, value || 0);
    for (let i = 0; i < value; i++) {
      listProductRefs.current[i] =
        listProductRefs.current[i] || React.createRef();
    }
    listProductRefs.current = listProductRefs.current.map(
      (item: any) => item || React.createRef()
    );
  }

  const [index, setIndex] = React.useState(0);
  const searchBoxRef = React.useRef<HTMLInputElement>(null);
  const [indexCustomer, setIndexCustomer] = React.useState(0);
  const searchBoxCustomerRef = React.useRef<HTMLInputElement>(null);

  window.onkeyup = (e) => {
    if (e.key === "F2" && searchBoxRef.current) {
      searchBoxRef.current.focus();
    }
    if (e.key === "F3" && searchBoxCustomerRef.current) {
      searchBoxCustomerRef.current.focus();
    }
  };
  const onSelectItem = (e: any) => {
    if (e.key === "ArrowDown") {
      if (index === totalProduct - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
      refs.current[index].current.scrollIntoView();
      refs.current[index].current.focus();
      if (index < refs.current.length - 3) {
        fetchMoreData();
      }
    }
    if (e.key === "Enter") {
      const product = productDetails[index];
      if (product.quantity == 0) {
        alertMessage();
      } else {
        setTimeout(() => {
          handleClick(product);
        }, 100);
      }
    }
    if (e.key === "ArrowUp") {
      if (index === 0) {
        setIndex(totalProduct - 1);
      } else {
        setIndex(index - 1);
      }
      refs.current[index].current.scrollIntoView();
      refs.current[index].current.focus();
    }
  };
  const onSelectCustomerItem = (e: any) => {
    if (e.key === "ArrowDown") {
      if (indexCustomer === customers.length) {
        listCustomerRefs.current[0].current.focus();
        setIndexCustomer(0);
      } else {
        listCustomerRefs.current[indexCustomer].current.focus();
        setIndexCustomer(indexCustomer + 1);
      }
    }
    if (e.key === "Enter") {
      if (indexCustomer === 0) {
        setModalShow(true);
      } else {
        const customer = customers[indexCustomer - 1];
        handleClickCustomer(customer);
      }

      setShowResultCustomer({ display: "none" });
      setSearchResultCustomer("");
      setIndexCustomer(0);
    }
    if (e.key === "ArrowUp") {
      if (indexCustomer === 0) {
        setIndexCustomer(customers.length);
      } else {
        setIndexCustomer(indexCustomer - 1);
      }
      listCustomerRefs.current[indexCustomer].current.focus();
    }
  };

  const handleClickAddTab = () => {
    const newTabs: any = [];
    tabs.forEach((tab: any) => {
      newTabs.push({
        id: tab.id,
        isActive: false,
      });
    });
    newTabs.push({
      id: newTabs.length,
      isActive: true,
    });

    setTabs(newTabs);
    const action = addOrderTabs();
    dispatch(action);
  };
  const removeTab = (id: number) => {
    const newTabs: any = [];
    let newIndex = 0;
    tabs.forEach((item: any) => {
      if (item.id !== id) {
        newTabs.push({
          id: newIndex,
          isActive: item.isActive,
        });
        newIndex++;
      }
    });
    if (newTabs.length < 2) {
      setTabs([
        {
          id: 0,
          isActive: true,
        },
      ]);
    } else {
      setTabs(newTabs);
    }
  };
  const handleClickRemoveTab = (id: number) => {
    confirmAlert({
      title: "Xác nhận",
      message:
        "Hệ thống sẽ không lưu lại thông tin của đơn hàng này. Bạn có chắc chắn hủy đơn hàng này không?",
      buttons: [
        {
          label: "Đồng ý",
          className: "btn-confirm-success",
          onClick: () => {
            handleClickRemoveAll(id);
            removeTab(id);
          },
        },
        {
          label: "Thoát",
          className: "btn-confirm-exit",
          onClick: () => {},
        },
      ],
    });
  };
  const handleSetActiveTab = (id: number) => {
    const newTabs: any = [];
    tabs.forEach((tab: any) => {
      tab.isActive = false;
      if (tab.id === id) {
        tab.isActive = true;
      }
      newTabs.push(tab);
    });
    setTabs(newTabs);
  };
  return (
    <div className="sale_create">
      <ModalCreateCustomer
        activeOrder={activeOrder}
        customer={customer}
        show={modalShow}
        updateCustomerOrder={true}
        onHide={() => setModalShow(false)}
      />

      <div style={{ display: "none" }}>
        <ComponentToPrint
          activeOrder={activeOrder}
          ref={componentRef}
          code={orderCode}
          key={Math.floor(Math.random() * 1000)}
        />
      </div>
      <div className="tab sale_tab" id="sale_tab">
        {tabs.map((item: any, i: number) => (
          <div
            className={[
              "sale_tab_item ",
              item.isActive ? "bg-primary" : "",
            ].join(" ")}
            key={i}
          >
            <div className="ml-1">
              <span
                className=""
                onClick={() => {
                  handleSetActiveTab(item.id);
                }}
              >
                Đơn {item.id + 1}
              </span>
            </div>
            <i
              className="far fa-times-circle icon_delete"
              onClick={() => {
                handleClickRemoveTab(item.id);
              }}
            ></i>
          </div>
        ))}
        <div id="sale_tab_plus">
          <i
            className="fas fa-plus"
            onClick={() => {
              handleClickAddTab();
            }}
          ></i>
        </div>
      </div>
      <div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-8 card mt-3">
                <div className="">
                  <div className="card-body" style={{ height: 640 }}>
                    <div className={[styles.search].join(" ")}>
                      <div className="input-group input-group-md ">
                        <div style={{ width: "100%" }}>
                          <input
                            onKeyDown={(e) => onSelectItem(e)}
                            ref={searchBoxRef}
                            style={{ outline: "none" }}
                            className="form-control form-control-navbar border "
                            type="search"
                            value={filterProduct.search}
                            placeholder="Thêm sản phẩm vào đơn (F2)"
                            aria-label="Search"
                            onChange={(e) =>
                              setFilterProduct({
                                ...filterProduct,
                                search: e.target.value.trim(),
                              })
                            }
                            onFocus={() =>
                              setShowResult({
                                display: "block",
                              })
                            }
                            onBlur={() => {
                              setTimeout(() => {
                                setHasMore(true);
                                setIndex(0);
                                setFilterProduct({
                                  ...filterProduct,
                                  search: "",
                                });
                                setShowResult({ display: "none" });
                              }, 200);
                            }}
                          />
                        </div>

                        <SearchResultProduct
                          productRef={refs.current}
                          isSelected={index}
                          hasMore={hasMore}
                          fetchMoreData={fetchMoreData}
                          showResult={showResult}
                          productDetails={productDetails}
                          handleClick={handleClick}
                        />
                      </div>
                    </div>
                    <div className=" mt-3">
                      <div className="">
                        {order?.orderDetails.length > 0 ? (
                          <ListProductResult
                            refs={listProductRefs.current}
                            order={order}
                            handleClickRemove={handleClickRemove}
                            handleClickUpdate={handleClickUpdate}
                          />
                        ) : (
                          <div
                            style={{
                              height: 550,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              // backgroundImage: `url("https://1.bp.blogspot.com/-F-NLaPv-bhY/YUwe0EnAAVI/AAAAAAAAGRw/hgi5GK_D8lAUc4nDVWltwvRiyoR6IvIaACLcBGAsYHQ/s2048/haravan-sapo.jpg")`,
                              // backgroundSize: "cover",
                            }}
                          >
                            <div className="text-center">
                              <div>
                                <h6 style={{ fontWeight: "bold" }}>
                                  Đơn hàng của bạn chưa có sản phẩm nào
                                </h6>
                              </div>
                              <div>
                                <button
                                  className="btn btn-default mt-3"
                                  onClick={() => {
                                    setIndex(0);
                                    searchBoxRef.current?.focus();
                                    setShowResult({
                                      display: "block",
                                    });
                                  }}
                                >
                                  Thêm sản phẩm ngay
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4 mt-3" style={{ paddingRight: 0 }}>
                <div className="card">
                  <div className="card-body" style={{ height: 640 }}>
                    {order?.customer ? (
                      <div
                        className="mb-2"
                        style={{ borderBottom: "1px solid" }}
                      >
                        <div className="row mb-2">
                          <div className="col-9">
                            <i className="far fa-user mr-2"></i>
                            <span
                              onClick={() => setModalShow(true)}
                              style={{
                                cursor: "pointer",
                                color: "rgb(0 136 255)",
                              }}
                            >
                              {order?.customer?.name}
                            </span>
                            <span className="mr-2 ml-2">-</span>
                            <span>{order?.customer?.phone}</span>
                          </div>
                          <div className="col-3 text-right">
                            <i
                              onClick={() => handleClickRemoveCustomer()}
                              className={[
                                styles.icon_delete_customer,
                                "fas fa-times-circle",
                              ].join(" ")}
                            ></i>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={[styles.search, "mb-3"].join(" ")}>
                        <div className="input-group input-group-md mb-3">
                          <div className="col-10" style={{ paddingLeft: 0 }}>
                            <input
                              style={{ outline: "none" }}
                              onKeyDown={(e) => onSelectCustomerItem(e)}
                              ref={searchBoxCustomerRef}
                              className="form-control form-control-navbar border "
                              type="search"
                              value={searchResultCustomer}
                              placeholder="Thêm khách hàng vào đơn (F3)"
                              aria-label="Search"
                              onChange={(e) =>
                                setSearchResultCustomer(e.target.value.trim())
                              }
                              onFocus={() =>
                                setShowResultCustomer({
                                  display: "block",
                                })
                              }
                              onBlur={() => {
                                setTimeout(() => {
                                  setSearchResultCustomer("");
                                  setShowResultCustomer({
                                    display: "none",
                                  });
                                }, 200);
                              }}
                            />
                          </div>
                          <div
                            className="col-2 text-right "
                            style={{ paddingRight: 0 }}
                          >
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => showModalCustomer()}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                        </div>
                        <SearchCustomerResult
                          customerRef={listCustomerRefs.current}
                          isSelected={indexCustomer}
                          showModalCustomer={showModalCustomer}
                          showResultCustomer={showResultCustomer}
                          customers={customers}
                          handleClickCustomer={handleClickCustomer}
                        />
                      </div>
                    )}
                    <CheckOut
                      activeOrder={activeOrder}
                      order={order}
                      handleChangeMoney={handleChangeMoney}
                      handleChangeNote={handleChangeNote}
                      handleChangePayment={handleChangePayment}
                    />

                    <div className="form-group mt-5 text-center">
                      <ReactToPrint
                        trigger={() => (
                          <button
                            disabled={!(order?.orderDetails.length > 0)}
                            className="btn btn-success"
                            style={{
                              width: "100%",
                              height: 60,
                              cursor: "pointer",
                              fontSize: 25,
                            }}
                          >
                            <i className="far fa-save"></i> Thanh Toán
                          </button>
                        )}
                        key={Math.floor(Math.random() * 1000)}
                        onBeforeGetContent={handleOnBeforeGetContent}
                        onAfterPrint={() => handleClickRemoveAll(activeOrder)}
                        content={reactToPrintContent}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SaleCreate;

import { createSlice } from "@reduxjs/toolkit";
import orderDetail from "interfaces/orderDetail.interface";
import orderType from "interfaces/orderType.interface";

export const getTotalQuantity = (orderDetails: orderDetail[]): number => {
  const quantity = orderDetails.reduce(
    (quantity: number, orderDetail: orderDetail) => {
      return quantity + orderDetail.quantity;
    },
    0
  );
  return quantity;
};
export const getTotalPrice = (orderDetails: orderDetail[]): number => {
  const price = orderDetails.reduce(
    (price: number, orderDetail: orderDetail) => {
      return price + orderDetail.quantity * orderDetail.price;
    },
    0
  );
  return price;
};
export const getTotalDiscount = (orderDetails: orderDetail[]): number => {
  const price = orderDetails.reduce(
    (price: number, orderDetail: orderDetail) => {
      return price + orderDetail.discount;
    },
    0
  );
  return price;
};

export const getIndex = (
  orderDetails: orderDetail[],
  productDetailModelId: number
): number => {
  const index = orderDetails.findIndex(
    (orderDetail: orderDetail) =>
      orderDetail.productDetailModel.id === productDetailModelId
  );
  return index;
};
const getCustomerPay = (order: orderType): number => {
  return order.totalPrice - order.totalDiscount - order.discount;
};
const orderDefault: orderType[] = [
  {
    orderDetails: [],
    totalPrice: 0,
    totalDiscount: 0,
    discount: 0,
    totalQuantity: 0,
    customerPay: 0,
    money: 0,
    note: "",
    payment: "Tiền mặt",
    code: "",
  },
];
const order = JSON.parse(localStorage.getItem("order") || "{}");

const initialState: orderType[] = order[0]
  ? (order as orderType[])
  : orderDefault;
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderTabs(state) {
      state.push(orderDefault[0]);
      localStorage.setItem("order", JSON.stringify(state));
    },
    changeMoney(state, action) {
      const { index } = action.payload;
      state[index].money = action.payload.money;
      localStorage.setItem("order", JSON.stringify(state));
    },
    changePayment(state, action) {
      const { index } = action.payload;
      state[index].payment = action.payload.payment;
      localStorage.setItem("order", JSON.stringify(state));
    },
    changeNote(state, action) {
      const { index } = action.payload;
      state[index].note = action.payload.note;
      localStorage.setItem("order", JSON.stringify(state));
    },
    addCustomer(state, action) {
      const { index } = action.payload;
      state[index].customer = action.payload.customer;
      localStorage.setItem("order", JSON.stringify(state));
    },
    removeCustomer(state, action) {
      const { index } = action.payload;
      state[index].customer = undefined;
      localStorage.setItem("order", JSON.stringify(state));
    },
    setDiscountFu(state, action) {
      const { index } = action.payload;
      state[index].discount = action.payload.discountOrder;
      state[index].customerPay = getCustomerPay(state[index]);
      state[index].money = state[index].customerPay;
      localStorage.setItem("order", JSON.stringify(state));
    },
    update(state, action) {
      const { index, orderDetail } = action.payload;
      const orderDetailIndex = getIndex(
        state[index].orderDetails,
        orderDetail.productDetailModel.id
      );

      if (orderDetail.quantity > 0) {
        state[index].orderDetails[orderDetailIndex].quantity =
          orderDetail.quantity;
        state[index].orderDetails[orderDetailIndex].discount =
          orderDetail.discount;
      } else {
        state[index].orderDetails[orderDetailIndex].quantity = 1;
        state[index].orderDetails[orderDetailIndex].discount =
          orderDetail.discount;
      }
      state[index].totalQuantity = getTotalQuantity(state[index].orderDetails);

      state[index].totalPrice = getTotalPrice(state[index].orderDetails);
      state[index].totalDiscount = getTotalDiscount(state[index].orderDetails);

      state[index].customerPay = getCustomerPay(state[index]);
      state[index].money = state[index].customerPay;
      localStorage.setItem("order", JSON.stringify(state));
    },
    add(state, action) {
      const { index, orderDetail } = action.payload;
      const orderDetailIndex = getIndex(
        state[index].orderDetails,
        orderDetail.productDetailModel.id
      );

      if (orderDetailIndex !== -1) {
        if (
          state[index].orderDetails[orderDetailIndex].quantity <
          orderDetail.productDetailModel.quantity
        ) {
          state[index].orderDetails[orderDetailIndex].quantity += 1;
          state[index].orderDetails[orderDetailIndex].discount +=
            orderDetail.discount;
        }
      } else {
        state[index].orderDetails.push(orderDetail);
      }
      state[index].totalQuantity = getTotalQuantity(state[index].orderDetails);

      state[index].totalPrice = getTotalPrice(state[index].orderDetails);
      state[index].totalDiscount = getTotalDiscount(state[index].orderDetails);

      state[index].money = getCustomerPay(state[index]);
      state[index].money = state[index].customerPay;

      localStorage.setItem("order", JSON.stringify(state));
    },
    remove(state, action) {
      const { index } = action.payload;
      const newData = state[index].orderDetails.filter(
        (obj: orderDetail) =>
          obj.productDetailModel.id !== action.payload.productDetailId
      );
      state[index].orderDetails = newData;
      state[index].totalQuantity = getTotalQuantity(state[index].orderDetails);

      state[index].totalPrice = getTotalPrice(state[index].orderDetails);
      state[index].totalDiscount = getTotalDiscount(state[index].orderDetails);

      state[index].customerPay = getCustomerPay(state[index]);
      state[index].money = state[index].customerPay;
      localStorage.setItem("order", JSON.stringify(state));
    },
    removeAll(state, action) {
      const newOrders: orderType[] = state.filter(
        (obj: orderType, index: number) => {
          return index !== action.payload.index;
        }
      );
      if (newOrders[0]) {
        localStorage.setItem("order", JSON.stringify(newOrders));
      } else {
        localStorage.removeItem("order");
      }
      if (newOrders[0]) {
        return [...newOrders];
      } else {
        return orderDefault;
      }
    },
  },
});
const { reducer, actions } = orderSlice;
export const {
  addOrderTabs,
  add,
  setDiscountFu,
  remove,
  removeAll,
  addCustomer,
  update,
  changeMoney,
  changePayment,
  removeCustomer,
  changeNote,
} = actions;
export default reducer;

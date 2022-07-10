export const convertProductStatus = (status: number) => {
  if (status === 1) {
    return "Đang bán";
  } else {
    return "Ngừng bán";
  }
};

export const convertProductDetailStatus = (status: number) => {
  if (status === 1) {
    return "Đang bán";
  } else {
    return "Ngừng bán";
  }
};

export const convertOrderStatus = (status: number) => {
  if (status === 1) {
    return "Hoàn thành";
  } else {
    return "Trả hàng";
  }
};

export const convertOrderDetailStatus = (status: number) => {
  if (status === 1) {
    return "Hoàn thành";
  } else {
    return "Trả hàng";
  }
};

export const convertStatusStaff = (status: number) => {
  if (status === 1) {
    return "Đang làm";
  } else {
    return "Đã nghỉ việc";
  }
};
export const convertRole = (status: number) => {
  switch (status) {
    case 1:
      return "Quản lý";

    case 2:
      return "Nhân viên bán hàng";
    case 3:
      return "Nhân viên kho";
    case 4:
      return "Nhân viên CSKH";
  }
};

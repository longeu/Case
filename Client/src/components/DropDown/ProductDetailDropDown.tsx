import baseApi from "api/baseApi";
import React, { useEffect, useState } from "react";
import Select, { OptionProps } from "react-select";
import "./style.css";
interface ProductDetailInitial {
  id: number;
  productId: number;
  productName: string;
  code: string;
  barCode: string;
  image: string;
  status: number;
  price: number;
  quantity: number;
  quantitySell: number;
  discount: number;
}
interface ProductDetailDropDownProps {
  onChange: (value: ProductDetailInitial) => void;
}

interface ProductDetailOption {
  value: number;
  label: string;
  isFixed?: boolean;
  isDisabled?: boolean;
  className?: string;
  //   productDetail: ProductDetailInitial;
}

const Option = (props: OptionProps<ProductDetailOption>) => {
  const {
    label,
    cx,
    className,
    isDisabled,
    isFocused,
    isSelected,
    innerRef,
    innerProps,
  } = props;
  const values = label.split("+");
  const name = values[0];
  const price = values[1];
  const image = values[2];
  const size = values[3];
  const quantity = values[4];
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={cx(
        {
          option: true,
          "option--is-disabled": isDisabled,
          "option--is-focused": isFocused,
          "option--is-selected": isSelected,
        },
        className
      )}
    >
      <div className="container product-detail">
        <div className="row">
          <div className="col-lg-2">
            <div className="product-image">
              <img src={image} alt="product-detail" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="product-name">{name}</div>
            <div className="product-code">{price}</div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="product-price">Size: {size}</div>
          <div className="product-quantity">Số lượng: {quantity}</div>
        </div>
      </div>
    </div>
  );
};

function ProductDetailDropDown(props: ProductDetailDropDownProps) {
  const [options, setOptions] = useState<ProductDetailOption[]>([
    {
      value: 1,
      label:
        "Áo khoác+129,000+https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2Fsaturn.png?alt=media&token=3aad0934-6927-4218-a719-217bb0009edb",
      //   productDetail: {}
    },
  ]);
  const [currentOption, setCurrentOption] = useState<ProductDetailOption>();
  useEffect(() => {
    async function getProductDetails() {
      const response = await baseApi.get("product_details", {
        search: "xv",
      });
      console.log(response);
      //       const result: ProductDetailOption[] = response.data.map((item: any) => {
      //         return {
      //           value: item.id,
      //           label: item.name + item.price,
      //           productDetail: item,
      //         };
      //       });
      //       setOptions(result);
    }
    getProductDetails();
  }, [currentOption]);
  return (
    <Select
      placeholder="Tìm kiếm sản phẩm"
      components={{ Option }}
      options={options}
      onChange={(e: any) => {
        setCurrentOption(e);
        // props.onChange();
      }}
    />
  );
}

export default ProductDetailDropDown;

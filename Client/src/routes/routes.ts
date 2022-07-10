import UpdateAndCreateCustomer from "pages/Customer/UpdateAndCreateCustomer";
import ImportGoods_index from "pages/ImportGoods";
import ImportGoodsDetail from "pages/ImportGoods/ImportGoodsDetail";
import ImportGoodsForm from "pages/ImportGoods/ImportGoodsForm";
import ImportGoodsList from "pages/ImportGoods/ImportGoodsList";
import Supplier_index from "pages/Supplier";
import SupplierDetail from "pages/Supplier/SupplierDetail";
import SupplierEdit from "pages/Supplier/SupplierEdit";
import SupplierList from "pages/Supplier/SupplierList";
import { LazyLoading } from "../components/LazyLoading/LazyLoading";
import { MyRoute } from "../types";
const MainLayout = LazyLoading(
  () => import("../layouts/MainLayout/MainLayout")
);

const LoginLayout = LazyLoading(
  () => import("../layouts/LoginLayout/LoginLayout")
);

const Customer = LazyLoading(() => import("../pages/Customer/Customer"));
const CustomerList = LazyLoading(
  () => import("../pages/Customer/CustomerList")
);
const CustomerDetail = LazyLoading(
  () => import("../pages/Customer/CustomerDetail")
);
const UpdateAndCreateProduct = LazyLoading(
  () => import("../pages/Product/UpdateAndCreateProduct")
);

const ProductList = LazyLoading(() => import("../pages/Product/ProductList"));

const Product = LazyLoading(() => import("../pages/Product/Product"));

const Home = LazyLoading(() => import("../pages/Home/Home"));

// Bill component and children
const Bill = LazyLoading(() => import("../pages/Bill/Bill"));

const SaleBill = LazyLoading(() => import("../pages/Bill/SaleBill/SaleBill"));

const SaleBillDetail = LazyLoading(
  () => import("../pages/Bill/SaleBill/SaleBillDetail")
);

const SaleBillList = LazyLoading(
  () => import("../pages/Bill/SaleBill/SaleBillList")
);

const Sale = LazyLoading(() => import("../pages/Sale/Sale"));
const SaleCreate = LazyLoading(() => import("../pages/Sale/SaleCreate"));
const Storage = LazyLoading(() => import("../pages/Storage/Storage"));
const StorageList = LazyLoading(() => import("../pages/Storage/StorageList"));

//Staff and children
const Staff = LazyLoading(() => import("../pages/Staff/Staff"));
const StaffList = LazyLoading(() => import("../pages/Staff/StaffList"));
const StaffDetail = LazyLoading(() => import("../pages/Staff/StaffDetail"));
const UpdateAndCreateStaff = LazyLoading(
  () => import("../pages/Staff/UpdateAndCreateStaff")
);
const ProductDetail = LazyLoading(
  () => import("../pages/Product/ProductDetail")
);

const routes: MyRoute[] = [
  {
    title: "Login",
    path: "/login",
    isExact: false,
    component: LoginLayout,
  },
  {
    title: "Admin",
    path: "/",
    component: MainLayout,
    scope: "dashboard",
    isExact: false,
    redirect: "/dashboard",
    routes: [
      {
        title: "Tổng quan",
        path: "/dashboard",
        scope: "dashboard",
        component: Home,
        isExact: false,
        icon: "nav-icon fa fa-home",
      },
      {
        title: "Sản phẩm",
        path: "/product",
        scope: "product_list",
        icon: "nav-icon fa fa-cube",
        component: Product,
        notShowChildren: true,
        redirect: "/product/list",
        isExact: false,
        routes: [
          {
            title: "Danh sách sản phẩm",
            path: "/product/list",
            component: ProductList,
            scope: "product_list",
            isExact: false,
          },
          {
            title: "Thêm mới sản phẩm",
            path: "/product/create",
            scope: "product_create",
            component: UpdateAndCreateProduct,
            isExact: false,
          },
          {
            title: "Sửa sản phẩm",
            path: "/product/:id/update",
            scope: "product_update",
            component: UpdateAndCreateProduct,
          },
          {
            title: "Chi tiết sản phẩm",
            path: "/product/:id",
            scope: "product_detail",
            component: ProductDetail,
          },
        ],
      },
      {
        title: "Khách hàng",
        component: Customer,
        path: "/customer",
        icon: "nav-icon fa fa-user",
        notShowChildren: true,
        scope: "customer_list",
        redirect: "/customer/list",
        isExact: false,
        routes: [
          {
            title: "Danh sách khách hàng",
            component: CustomerList,
            path: "/customer/list",
            scope: "customer_list",
          },
          {
            title: "Chi tiết khách hàng",
            component: CustomerDetail,
            path: "/customer/:id/detail",
            scope: "customer_detail",
          },
          {
            title: "Thêm mới khách hàng",
            component: UpdateAndCreateCustomer,
            path: "/customer/create",
            scope: "customer_create",
          },
          {
            title: "Sửa đổi khách hàng",
            component: UpdateAndCreateCustomer,
            path: "/customer/:id/update",
            scope: "customer_update",
          },
        ],
      },
      {
        title: "Kho",
        component: Storage,
        path: "/storage",
        icon: "nav-icon fa fa-cubes",
        notShowChildren: true,
        scope: "storage_list",
        redirect: "/storage/list",
        isExact: false,
        routes: [
          {
            title: "Danh sách kho",
            component: StorageList,
            path: "/storage/list",
            scope: "storage_list",
          },
          {
            title: "Chi tiết kho",
            component: CustomerDetail,
            path: "/storage/detail",
            scope: "storage_detail",
          },
          {
            title: "Thêm mới kho",
            component: Customer,
            path: "/storage/create",
            scope: "storage_create",
          },
          {
            title: "Sửa đổi kho",
            component: Customer,
            path: "/storage/:id",
            scope: "storage_detail",
          },
        ],
      },
      {
        title: "Bán hàng",
        component: Sale,
        path: "/sale",
        isExact: false,
        scope: "sale_create",
        redirect: "/sale/create",

        notShowChildren: true,
        icon: "nav-icon fa fa-calculator",
        routes: [
          {
            title: "Bán hàng",
            component: SaleCreate,
            path: "/sale/create",
            isExact: false,
            scope: "sale_create",
            icon: "nav-icon fa fa-calculator",
          },
        ],
      },
      {
        title: "Hóa đơn",
        path: "/bill",
        component: Bill,
        isExact: true,
        scope: "bill_list",
        icon: "nav-icon fa fa-file-text-o",
        routes: [
          {
            title: "Hóa đơn bán",
            component: SaleBill,
            path: "/bill/sale",
            redirect: "/bill/sale/list",
            scope: "sale_bill_list",
            isExact: false,
            routes: [
              {
                title: "Danh sach hóa đơn bán",
                component: SaleBillList,
                scope: "sale_bill_list",
                path: "/bill/sale/list",
                isExact: false,
              },
              {
                title: "Chi tiết hóa đơn bán",
                component: SaleBillDetail,
                path: "/bill/sale/:id/detail",
                scope: "sale_bill_detail",
                isExact: false,
              },
            ],
          },
          {
            title: "Hóa đơn nhập",
            component: ImportGoods_index,
            path: "/bill/import",
            redirect: "/bill/import/list",
            scope: "import_bill_list",
            isExact: false,
            routes: [
              {
                title: "Danh sách hóa đơn nhập",
                component: ImportGoodsList,
                path: "/bill/import/list",
                scope: "import_bill_list",
                isExact: false,
              },
              {
                title: "Chi tiết hóa đơn bán",
                component: ImportGoodsDetail,
                path: "/bill/import/:id/detail",
                scope: "import_bill_detail",
                isExact: false,
              },
              {
                title: "Thêm mới nhập hàng",
                component: ImportGoodsForm,
                path: "/bill/import/create",
                scope: "import_bill_create",
                isExact: false,
              },
              {
                title: "Sửa hóa đơn bán",
                component: ImportGoodsForm,
                path: "/bill/import/:id/update",
                scope: "import_bill_update",
                isExact: false,
              },
            ],
          },
        ],
      },
      {
        title: "Nhân viên",
        component: Staff,
        path: "/staff",
        isExact: false,
        scope: "staff_list",
        notShowChildren: true,
        redirect: "/staff/list",
        icon: "nav-icon fa fa-users",
        routes: [
          {
            title: "Danh sách Nhân viên",
            component: StaffList,
            path: "/staff/list",
            isExact: false,
            scope: "staff_list",
          },
          {
            title: "Thêm Nhân viên",
            component: UpdateAndCreateStaff,
            path: "/staff/create",
            isExact: false,
            scope: "staff_create",
          },
          {
            title: "Sửa Nhân viên",
            component: UpdateAndCreateStaff,
            path: "/staff/:id/update",
            isExact: false,
            scope: "staff_update",
          },
          {
            title: "Chi tiết Nhân viên",
            component: StaffDetail,
            path: "/staff/:id/detail",
            isExact: false,
            scope: "staff_detail",
          },
        ],
      },
      {
        title: "Nhà cung câp",
        component: Supplier_index,
        path: "/suppliers",
        redirect: "/suppliers/list",
        isExact: false,
        scope: "suppliers_list",
        icon: "nav-icon fas fa-handshake",
        notShowChildren: true,
        routes: [
          {
            title: "Danh sách nhà cung cấp",
            component: SupplierList,
            path: "/suppliers/list",
            scope: "suppliers_list",
            isExact: false,
          },
          {
            title: "Chỉnh sửa nhà cung cấp",
            component: SupplierEdit,
            path: "/suppliers/:id/update",
            scope: "suppliers_update",
            isExact: false,
          },
          {
            title: "Thêm mới nhà cung cấp",
            component: SupplierEdit,
            path: "/suppliers/create",
            scope: "suppliers_create",
            isExact: false,
          },
          {
            title: "Chi tiết nhà cung cấp",
            component: SupplierDetail,
            path: "/suppliers/:id/detail",
            scope: "suppliers_detail",
            isExact: false,
          },
        ],
      },
    ],
  },
];
export default routes;

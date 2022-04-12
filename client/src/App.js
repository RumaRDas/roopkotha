import React, { useEffect, lazy, Suspense } from "react";
//import from toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import from react-router-dom
import { Switch, Route } from "react-router-dom";

import SideDrawer from "./components/drawer/SideDrawer";

//import from component
import { auth } from "./firebase";

//import from react-redux
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";
//using Lazy

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Header = lazy(() => import("./components/nav/Header"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));

//For Home dispaly
const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/Category/CategoryHome"));
const SubCateHome = lazy(() => import("./pages/subcate/SubCateHome"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
// User dashboard
const UserRoute = lazy(() => import("./components/routes/UserRoutes"));
const WishList = lazy(() => import("./pages/user/WishList"));
const Password = lazy(() => import("./pages/user/Password"));
const History = lazy(() => import("./pages/user/History"));
const Payment = lazy(() => import("./pages/Payment"));

//import Admin Dashboard
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

//Admin  for category
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const UpdateCategory = lazy(() =>
  import("./pages/admin/category/UpdateCategory")
);
const CreateCouponPage = lazy(() =>
  import("./pages/admin/coupon/CreateCouponPage")
);
//Admin  for Sub category
const SubCateCreate = lazy(() => import("./pages/admin/subcate/SubCateCreate"));
const SubCateUpdate = lazy(() => import("./pages/admin/subcate/SubCateUpdate"));
//Admin  for  Product
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const Shop = lazy(() => import("./pages/Shop"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("new USER ", user);
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                roll: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });

    //cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          <div>____Roopkotha Boson_____</div>
          ___
          <LoadingOutlined />
          ___
        </div>
      }
    >
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/subcate/:slug" component={SubCateHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />

        {/* User Access Route */}
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={WishList} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <UserRoute exact path="/payment" component={Payment} />

        {/* Admin Access Route */}
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />

        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={UpdateCategory}
        />
        <AdminRoute exact path="/admin/subcate" component={SubCateCreate} />
        <AdminRoute
          exact
          path="/admin/subcate/:slug"
          component={SubCateUpdate}
        />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />

        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
      </Switch>
    </Suspense>
  );
};

export default App;

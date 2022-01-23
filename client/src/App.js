import React, { useEffect } from "react";
//import from toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import from react-router-dom
import { Switch, Route } from "react-router-dom";


//import from component
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";

//For Home dispaly
import Home from "./pages/Home";
import Product from "./pages/Product";
import CategoryHome from "./pages/Category/CategoryHome";
// User dashboard
import UserRoute from "./components/routes/UserRoutes";
import WishList from "./pages/user/WishList";
import Password from "./pages/user/Password";
import History from "./pages/user/History";

//import Admin Dashboard
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
//Admin  for category
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import UpdateCategory from "./pages/admin/category/UpdateCategory";
//Admin  for Sub category
import SubCateCreate from "./pages/admin/subcate/SubCateCreate";
import SubCateUpdate from "./pages/admin/subcate/SubCateUpdate";
//Admin  for  Product
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";

import { auth } from "./firebase";
//import from react-redux
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";

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
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        {/* User Access Route */}
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={WishList} />
        {/* Admin Access Route */}
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />

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
    </>
  );
};

export default App;

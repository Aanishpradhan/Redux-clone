import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, Fragment } from "react";
// import { uiActions } from "./store/ui.-slice";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  // dispatch(sendCartData(cart));// same tow time use
  // const sendCartData = async () => {
  // dispatch(
  //   uiActions.showNotification({
  //     status: "pending",
  //     title: "Sending...",
  //     message: "Sending cart data!",
  //   })
  // );
  // const response = await fetch(
  //   "https://react-http-ec96e-default-rtdb.firebaseio.com/cart.json",
  //   {
  //     method: "PUT",
  //     body: JSON.stringify(cart),
  //   }
  // );
  // if (!response.ok) {
  //   throw new Error("Sending cart failed");
  // }

  // const responseData = await response.json();
  //   dispatch(
  //     uiActions.showNotification({
  //       status: "success",
  //       title: "success!",
  //       message: "Sent cart successfully!",
  //     })
  //   );
  // };
  // if (inInitial) {
  //   inInitial = false;
  //   return;
  // }
  // sendCartData().catch((error) => {
  // dispatch(
  //   uiActions.showNotification({
  //     status: "error",
  //     title: "error!",
  //     message: "Sending cart data failed!",
  //   })
  // );
  // });
  // }, [cart, dispatch]);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

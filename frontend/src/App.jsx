import "./App.css";

import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Route, Switch } from "wouter";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/notFound";
import ProductsPage from "./pages/products";
import ShoppingCartPage from "./pages/shoppingCart";
import SingleCategoryPage from "./pages/singleCategory";
import SingleProductPage from "./pages/singleProduct";

export default function App() {
  const [show, setShow] = useState(true);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <body>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/auth/login" component={LoginPage} />
          <Route path="/auth/register" component={RegisterPage} />
          <Route path="/categories/:id">
            {(params) => <SingleCategoryPage {...params} />}
          </Route>
          <Route path="/products" component={ProductsPage} />
          <Route path="/products/:id">
            {(params) => <SingleProductPage {...params} />}
          </Route>
          <Route path="/shopping-cart" component={ShoppingCartPage} />
          <Route component={NotFoundPage}></Route>
        </Switch>
      </body>
      <footer>
        <Footer />
      </footer>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition show={show}>
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <CheckCircleIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-green-400"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      Successfully saved!
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Anyone with a link can now view this file.
                    </p>
                  </div>
                  <div className="ml-4 flex shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setShow(false);
                      }}
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}

/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
"use client";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const currencies = ["CAD", "USD", "AUD", "EUR", "GBP"];
const navigation = {
  categories: [
    {
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
        {
          name: "Accessories",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-03.jpg",
          imageAlt:
            "Model wearing minimalist watch with black wristband and white watch face.",
        },
        {
          name: "Carry",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-04.jpg",
          imageAlt:
            "Model opening tan leather long wallet with credit card pockets and cash pouch.",
        },
      ],
    },
    {
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-01-men-category-01.jpg",
          imageAlt:
            "Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-01-men-category-02.jpg",
          imageAlt: "Model wearing light heather gray t-shirt.",
        },
        {
          name: "Accessories",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-01-men-category-03.jpg",
          imageAlt:
            "Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.",
        },
        {
          name: "Carry",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-01-men-category-04.jpg",
          imageAlt:
            "Model putting folded cash into slim card holder olive leather wallet with hand stitching.",
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Products", href: "/products" },
    { name: "Login", href: "/auth/login" },
    { name: "Register", href: "/auth/register" },
  ],
};
const sortOptions = [
  { name: "Most Popular", href: "#" },
  { name: "Best Rating", href: "#" },
  { name: "Newest", href: "#" },
  { name: "Price: Low to High", href: "#" },
  { name: "Price: High to Low", href: "#" },
];
const filters = [
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "clothing-company", label: "Clothing Company" },
      { value: "fashion-inc", label: "Fashion Inc." },
      { value: "shoes-n-more", label: "Shoes 'n More" },
      { value: "supplies-n-stuff", label: "Supplies 'n Stuff" },
    ],
  },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "black", label: "Black" },
      { value: "grey", label: "Grey" },
      { value: "blue", label: "Blue" },
      { value: "olive", label: "Olive" },
      { value: "tan", label: "Tan" },
    ],
  },
  {
    id: "sizes",
    name: "Sizes",
    options: [
      { value: "xs", label: "XS" },
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
      { value: "xl", label: "XL" },
      { value: "2xl", label: "2XL" },
    ],
  },
];
const products1 = [
  {
    id: 1,
    name: "Focus Paper Refill",
    href: "#",
    price: "$13",
    description: "3 sizes available",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-01-image-card-01.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 2,
    name: "Focus Card Holder",
    href: "#",
    price: "$64",
    description: "Walnut",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-01-image-card-02.jpg",
    imageAlt: "Paper card sitting upright in walnut card holder on desk.",
  },
  {
    id: 3,
    name: "Focus Carry Pouch",
    href: "#",
    price: "$32",
    description: "Heather Gray",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-01-image-card-03.jpg",
    imageAlt:
      "Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.",
  },
  // More products...
];
const products2 = [
  {
    id: 7,
    name: "Electric Kettle",
    href: "#",
    price: "$149",
    description: "Black",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-01-image-card-07.jpg",
    imageAlt:
      "Close up of long kettle spout pouring boiling water into pour-over coffee mug with frothy coffee.",
  },
  {
    id: 8,
    name: "Leather Workspace Pad",
    href: "#",
    price: "$165",
    description: "Black",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-01-image-card-08.jpg",
    imageAlt:
      "Extra large black leather workspace pad on desk with computer, wooden shelf, desk organizer, and computer peripherals.",
  },
  {
    id: 9,
    name: "Leather Long Wallet",
    href: "#",
    price: "$118",
    description: "Natural",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-01-image-card-09.jpg",
    imageAlt:
      "Leather long wallet held open with hand-stitched card dividers, full-length bill pocket, and simple tab closure.",
  },
  // More products...
];
const footerNavigation = {
  products: [
    { name: "Bags", href: "#" },
    { name: "Tees", href: "#" },
    { name: "Objects", href: "#" },
    { name: "Home Goods", href: "#" },
    { name: "Accessories", href: "#" },
  ],
  company: [
    { name: "Who we are", href: "#" },
    { name: "Sustainability", href: "#" },
    { name: "Press", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy", href: "#" },
  ],
  customerService: [
    { name: "Contact", href: "#" },
    { name: "Shipping", href: "#" },
    { name: "Returns", href: "#" },
    { name: "Warranty", href: "#" },
    { name: "Secure Payments", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Find a store", href: "#" },
  ],
};

export default function SingleCategoryPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div>
      {/* Mobile filter dialog */}
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-40 sm:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4">
              {filters.map((section) => (
                <Disclosure
                  key={section.name}
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                      <span className="font-medium text-gray-900">
                        {section.name}
                      </span>
                      <span className="ml-6 flex items-center">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="size-5 rotate-0 transform group-data-[open]:-rotate-180"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            defaultValue={option.value}
                            defaultChecked={option.checked}
                            id={`filter-mobile-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            type="checkbox"
                            className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                            className="ml-3 text-sm text-gray-500"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            New Arrivals
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-gray-500">
            Thoughtfully designed objects for the workspace, home, and travel.
          </p>
        </div>

        {/* Filters */}
        <section
          aria-labelledby="filter-heading"
          className="border-t border-gray-200 pt-6"
        >
          <h2 id="filter-heading" className="sr-only">
            Product filters
          </h2>

          <div className="flex items-center justify-between">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <MenuItem key={option}>
                      <a
                        href={option.href}
                        className="block px-4 py-2 text-sm font-medium text-gray-900 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        {option.name}
                      </a>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
            >
              Filters
            </button>

            <PopoverGroup className="hidden sm:flex sm:items-baseline sm:space-x-8">
              {filters.map((section, sectionIdx) => (
                <Popover
                  key={section.name}
                  id="menu"
                  className="relative inline-block text-left"
                >
                  <div>
                    <PopoverButton className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      <span>{section.name}</span>
                      {/* {sectionIdx === 0 ? (
                        <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                          1
                        </span>
                      ) : null} */}
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </PopoverButton>
                  </div>

                  <PopoverPanel
                    transition
                    className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <form className="space-y-4">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            defaultValue={option.value}
                            defaultChecked={option.checked}
                            id={`filter-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            type="checkbox"
                            className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-${section.id}-${optionIdx}`}
                            className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </form>
                  </PopoverPanel>
                </Popover>
              ))}
            </PopoverGroup>
          </div>
        </section>

        {/* Product grid */}
        <section aria-labelledby="products-heading" className="mt-8 mb-16">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products1.map((product) => (
              <a key={product.id} href={product.href} className="group">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="aspect-square w-full rounded-lg object-cover group-hover:opacity-75 sm:aspect-[2/3]"
                />
                <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                </div>
                <p className="mt-1 text-sm italic text-gray-500">
                  {product.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

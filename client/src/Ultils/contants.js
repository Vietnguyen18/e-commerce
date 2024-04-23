import icons from "./icon";
import path from "./path";

export const navigation = [
  {
    id: 1,
    value: "Home",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "Products",
    path: `/${path.PRODUCTS}`,
  },
  {
    id: 3,
    value: "Blogs",
    path: `/${path.BLOGS}`,
  },
  {
    id: 4,
    value: "Out services",
    path: `/${path.OUT_SERVICES}`,
  },
  {
    id: 5,
    value: "FAQS",
    path: `/${path.FAQS}`,
  },
];

const {BsShieldShaded,FaTruck,AiFillGift,BsFillReplyFill,FaTty} = icons
export const extraInfor = [
  {
    id: 1,
    title: 'Guarantee',
    sub: 'Quality Checked',
    icon: <BsShieldShaded />,
  },
  {
    id: 2,
    title: 'Free Shipping',
    sub: 'Free On All Products',
    icon: <FaTruck />,
  },
  {
    id: 3,
    title: 'Special Gift Cards',
    sub: 'Special Gift Cards',
    icon: <AiFillGift/>,
  },
  {
    id: 4,
    title: 'Free Return',
    sub: 'Within 7 Days',
    icon: <BsFillReplyFill />,
  },
  {
    id: 5,
    title: 'Consultancy',
    sub: 'Lifetime 24/7/356',
    icon: <FaTty />,
  },
]

export const tabs = [
  {
    id: 1,
    title: 'Description',
    content: `Processor: Intel® Pentium® N3700 Processor
    Memory: DDR3 2 GB
    Display: 14.0" 1920x1080
    Graphic: Integrated Intel® HD Graphics
    Storage: 500GB HDD 5400
    Camera: VGA Web Camera
    Networking: 802.11 b/g/n
    Battery: 2Cells 32 Whrs
    Dimensions: 339 x 235 x 21.9 cmM
    Weight: 1.65 kg`
  },
  {
    id: 2,
    title: 'Warranty',
    content: `WARRANTY INFORMATION
    LIMITED WARRANTIES
    Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
    
    Frames Used In Upholstered and Leather Products
    Limited Lifetime Warranty
    A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`
  },
  {
    id: 3,
    title: 'Delivery',
    content: `PURCHASING & DELIVERY
    Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
    Picking up at the store
    Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
    Delivery
    Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
    In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`
  },
  {
    id: 4,
    title: 'Payment', 
    content: `PURCHASING & DELIVERY
    Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
    Picking up at the store
    Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
    Delivery
    Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
    In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`
  },
  {
    id: 5,
    title: 'Customer',
    content: `CUSTOMER REVIEWS
    Based on 1 review
    Write a review`
  },
]

export const colors = ['black', 'brown', 'gray', 'white', 'pink', 'yellow', 'orange','purple','green','blue']


 const {AiOutlineDashboard,FaUsers,FaProductHunt} = icons

export const adminSidebar = [
  {
    id: 1,
    type: 'SINGLE',
    text: 'Dashboard',
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icons: <AiOutlineDashboard />,
  },
  {
    id: 2,
    type: 'SINGLE',
    text: 'Manage users',
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icons: <FaUsers />,
  },
  {
    id: 3,
    type: 'PARENT',
    text: 'Manage products',
    icons: <FaProductHunt />,
    submenu: [
      {
        text: 'Create product',
        path: `/${path.ADMIN}/${path.CREATE_PRODUCTS}`,
      },
      {
        text: 'Manage product',
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
      },
    ]
  }
]

export const roles = [
  {
    role: '101',
    value: "Admin",
  },
  {
    role: '102',
    value: "User",
  },
]
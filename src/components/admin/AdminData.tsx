export interface AdminUserProps {
  id: number;
  image: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  status: "Active" | "Inactive";
}

export interface AdminStaffProps {
  id: number;
  image: string;
  name: string;
  password: string;
  email: string;
  address: string;
  phone: string;
  role: "Admin" | "Staff";
}

export interface AdminProductProps {
  id: number;
  image: string;
  name: string;
  quantity: number;
  description: string;
  buy_price: number;
  sell_price: number;
  category: string;
}

export interface AdminCategoryProps {
  id: number;
  name: string;
}

export interface AdminOrderProps {
  id: number;
  user: string;
  email: string;
  product: string;
  quantity: number;
  category: string;
  price: number;
  date: string;
  status: "Pending" | "Completed" | "Cancelled";
}

const adminUser: AdminUserProps[] = [
  {
    id: 1,
    name: "Linn",
    image: "public/images/download (1).jpg",
    email: "alice@gmail.com",
    password: "Lnch@12344",
    address: "No. 89, Main Street",
    phone: "+959111222333",
    status: "Active",
  },
  {
    id: 2,
    name: "Eydis",
    image: "public/images/woman.jpg",
    email: "eydis@gmail.com",
    password: "Lnch@1234",
    address: "No. 90, Main Street",
    phone: "+959111222333",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Alice Zuberg",
    image: "public/images/woman.jpg",
    email: "alice@gmail.com",
    password: "Lnch@1234",
    address: "No. 73, Main Street",
    phone: "+959111222333",
    status: "Active",
  },
  {
    id: 4,
    name: "Alice Zuberg",
    image: "public/images/woman.jpg",
    email: "alice@gmail.com",
    password: "Lnch@1234",
    address: "No. 44, Main Street",
    phone: "+959111222333",
    status: "Active",
  },
  {
    id: 5,
    name: "Alice Zuberg",
    image: "public/images/woman.jpg",
    email: "alice@gmail.com",
    password: "Lnch@1234",
    address: "No. 23, Main Street",
    phone: "+959111222333",
    status: "Active",
  },
];

const adminStaff: AdminStaffProps[] = [
  {
    id: 1,
    image: "public/images/download (1).jpg",
    name: "Rita Linn",
    email: "ritalinn@gmail.com",
    password: "Lnch@12344",
    address: "No. 46, Main Street",
    phone: "+959111222333",
    role: "Admin",
  },
  {
    id: 2,
    image: "public/images/woman.jpg",
    name: "Linn",
    email: "linn@gmail.com",
    password: "Lnch@12345",
    address: "No. 46, Main Street",
    phone: "+959111222333",
    role: "Staff",
  },
  {
    id: 3,
    image: "public/images/woman.jpg",
    name: "Linn 2",
    email: "linn2@gmail.com",
    password: "Lnch@1234",
    address: "No. 46, Main Street",
    phone: "+959111222333",
    role: "Staff",
  },
];

const adminProduct: AdminProductProps[] = [
  {
    id: 1,
    image: "public/images/perfumes/540.png",
    name: "540",
    quantity: 20,
    description: "jgrihtrbtrjtrjr",
    buy_price: 200,
    sell_price: 250,
    category: "Unisex",
  },

  {
    id: 2,
    image: "public/images/perfumes/A la rose.png",
    name: "A la rose",
    quantity: 0,
    description: "jgrihtrbtrjtrjr",
    buy_price: 230,
    sell_price: 280,
    category: "Women",
  },

  {
    id: 3,
    image: "public/images/perfumes/Grand Soir.png",
    name: "Grand Soir",
    quantity: 20,
    description: "jgrihtrbtrjtrjr",
    buy_price: 150,
    sell_price: 200,
    category: "Men",
  },

  {
    id: 4,
    image: "public/images/perfumes/Kurky.png",
    name: "Kurky",
    quantity: 20,
    description: "jgrihtrbtrjtrjr",
    buy_price: 180,
    sell_price: 230,
    category: "Women",
  },
];

const adminCategory: AdminCategoryProps[] = [
  {
    id: 1,
    name: "Women",
  },

  {
    id: 2,
    name: "Men",
  },

  {
    id: 3,
    name: "Unisex",
  },
];

const adminOrder: AdminOrderProps[] = [
  {
    id: 1,
    user: "Alice 1",
    email: "alice1@gmail.com",
    product: "A la rose",
    quantity: 2,
    category: "Women",
    price: 500,
    date: "16/10/2025",
    status: "Pending",
  },

  {
    id: 2,
    user: "Alice 2",
    email: "alice2@gmail.com",
    product: "A la rose",
    quantity: 2,
    category: "Women",
    price: 500,
    date: "16/10/2025",
    status: "Pending",
  },

  {
    id: 3,
    user: "Alice 3",
    email: "alice3@gmail.com",
    product: "A la rose",
    quantity: 2,
    category: "Women",
    price: 500,
    date: "16/10/2025",
    status: "Completed",
  },

  {
    id: 4,
    user: "Alice 4",
    email: "alice4@gmail.com",
    product: "A la rose",
    quantity: 2,
    category: "Women",
    price: 500,
    date: "16/10/2025",
    status: "Cancelled",
  },
];

export { adminUser, adminProduct, adminCategory, adminStaff, adminOrder };
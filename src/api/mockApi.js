const LS_KEY = 'mock_products_v1'

// Default data with unique IDs
const defaultData = {
  categories: [
    { name: "Handmade Soaps", slug: "soaps", id: "c1758170659037" },
    { name: "Handmade Shampoo", slug: "shampoo", id: "c1758170865224" },
    { name: "Essential Oils", slug: "essential-oils", id: "c1758171200001" },
    { name: "Body Lotions", slug: "body-lotions", id: "c1758171200002" },
    { name: "Hair Oils", slug: "hair-oils", id: "c1758171200003" },
    { name: "Face Creams", slug: "face-creams", id: "c1758171200004" }
  ],
  coupons: [
    { code: 'SAVE100', type: 'fixed', amount: 100 },
    { code: 'SAVE50', type: 'fixed', amount: 50 },
    { code: 'WELCOME200', type: 'fixed', amount: 200 }
  ],
  products: [
    // Soaps
    {
      title: "Harbel Glow Soap",
      slug: "harbel-glow-soap",
      price: 50,
      categoryId: "c1758170659037",
      description: "🌿 Herbal Glow Handmade Soap – A gentle blend of nature’s goodness...",
      image: "https://tse2.mm.bing.net/th/id/OIP.DR0GPmsk1U6cuFa4g-OeCgHaEt?rs=1&pid=ImgDetMain&o=7&rm=3",
      weight: "100g",
      size: "Standard bar",
      manufacturer: "Herbal Naturals Co.",
      warranty: "Not applicable",
      usage: "Apply to wet skin, lather gently, and rinse with water.",
      id: "p1758170783855"
    },
    {
      title: "Refreshing Lavender Soap",
      slug: "refreshing-lavender-soap",
      price: 60,
      categoryId: "c1758170659037",
      description: "Lavender infused soap for a calming bath experience...",
      image: "https://images.pexels.com/photos/2253832/pexels-photo-2253832.jpeg",
      weight: "100g",
      size: "Standard bar",
      manufacturer: "Nature's Essence",
      warranty: "Not applicable",
      usage: "Lather on skin and rinse thoroughly.",
      id: "p1758170783856"
    },
    // Shampoo
    {
      title: "Harbel Glow Shampoo",
      slug: "harbel-glow-shampoo",
      price: 200,
      categoryId: "c1758170865224",
      description: "🌿 Herbal Glow Shampoo – A natural blend of herbal extracts...",
      image: "https://img.freepik.com/premium-psd/cosmetic-pump-bottle-packaging-mockup_140261-1103.jpg?w=2000",
      weight: "200ml",
      size: "Bottle",
      manufacturer: "Herbal Naturals Co.",
      warranty: "Not applicable",
      usage: "Apply to wet hair, massage scalp, rinse thoroughly.",
      id: "p1758171029027"
    },
    {
      title: "Herbal Glow Nourishing Shampoo",
      slug: "herbal-glow-nourishing-shampoo",
      price: 249,
      categoryId: "c1758170865224",
      description: "A refreshing herbal blend that gently cleanses and nourishes hair...",
      image: "https://static.vecteezy.com/system/resources/previews/034/494/874/non_2x/cosmetic-mockup-on-premium-style-stone-psd.png",
      weight: "250ml",
      size: "Bottle",
      manufacturer: "Nature's Essence",
      warranty: "Not applicable",
      usage: "Apply on wet hair, lather and rinse.",
      id: "p1758171152817"
    },
    // Essential Oils
    {
      title: "Lavender Essential Oil",
      slug: "lavender-essential-oil",
      price: 350,
      categoryId: "c1758171200001",
      description: "Pure Lavender essential oil for aromatherapy and skincare.",
      image: "https://images.pexels.com/photos/4050395/pexels-photo-4050395.jpeg",
      weight: "30ml",
      size: "Bottle",
      manufacturer: "Aroma Naturals",
      warranty: "Not applicable",
      usage: "Use in diffuser or dilute for topical use.",
      id: "p1758171200001"
    },
    {
      title: "Tea Tree Essential Oil",
      slug: "tea-tree-essential-oil",
      price: 400,
      categoryId: "c1758171200001",
      description: "Antiseptic Tea Tree Oil for skin and hair care.",
      image: "https://images.pexels.com/photos/5699654/pexels-photo-5699654.jpeg",
      weight: "30ml",
      size: "Bottle",
      manufacturer: "Aroma Naturals",
      warranty: "Not applicable",
      usage: "Dilute before applying to skin.",
      id: "p1758171200002"
    },
    // Body Lotions
    {
      title: "Aloe Vera Body Lotion",
      slug: "aloe-vera-body-lotion",
      price: 299,
      categoryId: "c1758171200002",
      description: "Soothing Aloe Vera lotion for all skin types.",
      image: "https://images.pexels.com/photos/4065142/pexels-photo-4065142.jpeg",
      weight: "150ml",
      size: "Bottle",
      manufacturer: "SkinCare Co.",
      warranty: "Not applicable",
      usage: "Apply daily on skin.",
      id: "p1758171200003"
    },
    {
      title: "Coconut Body Lotion",
      slug: "coconut-body-lotion",
      price: 320,
      categoryId: "c1758171200002",
      description: "Moisturizing coconut lotion to keep skin soft and smooth.",
      image: "https://images.pexels.com/photos/4473943/pexels-photo-4473943.jpeg",
      weight: "150ml",
      size: "Bottle",
      manufacturer: "SkinCare Co.",
      warranty: "Not applicable",
      usage: "Apply on clean skin daily.",
      id: "p1758171200004"
    },
    // Hair Oils
    {
      title: "Herbal Hair Oil",
      slug: "herbal-hair-oil",
      price: 180,
      categoryId: "c1758171200003",
      description: "Strengthening herbal hair oil for healthy hair growth.",
      image: "https://images.pexels.com/photos/4050413/pexels-photo-4050413.jpeg",
      weight: "100ml",
      size: "Bottle",
      manufacturer: "HairCare Naturals",
      warranty: "Not applicable",
      usage: "Massage into scalp and leave for 30 mins before washing.",
      id: "p1758171200005"
    },
    // Face Creams
    {
      title: "Vitamin C Face Cream",
      slug: "vitamin-c-face-cream",
      price: 499,
      categoryId: "c1758171200004",
      description: "Brightening cream enriched with Vitamin C for glowing skin.",
      image: "https://images.pexels.com/photos/4050401/pexels-photo-4050401.jpeg",
      weight: "50g",
      size: "Jar",
      manufacturer: "Glow Naturals",
      warranty: "Not applicable",
      usage: "Apply on cleansed face twice daily.",
      id: "p1758171200006"
    },
    {
      title: "Aloe Vera Face Cream",
      slug: "aloe-vera-face-cream",
      price: 450,
      categoryId: "c1758171200004",
      description: "Hydrating Aloe Vera cream suitable for all skin types.",
      image: "https://images.pexels.com/photos/4050402/pexels-photo-4050402.jpeg",
      weight: "50g",
      size: "Jar",
      manufacturer: "Glow Naturals",
      warranty: "Not applicable",
      usage: "Apply on cleansed face daily.",
      id: "p1758171200007"
    }
  ]
}


function read() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : defaultData
  } catch {
    return defaultData
  }
}

function write(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data))
}

function withDefaultImage(product) {
  if (!product.image || product.image.trim() === '') {
    product.image = "https://via.placeholder.com/150x150.png?text=No+Image"
  }
  return product
}
export default {
  getProducts() {
    const { products } = read()
    return Promise.resolve(products)
  },
  getProduct(id) {
    const { products } = read()
    return Promise.resolve(products.find(p => p.id === id))
  },
  getProductsByCategory(categoryId) {
    const { products } = read()
    return Promise.resolve(products.filter(p => p.categoryId === categoryId))
  },
  getCategories() {
    const { categories } = read()
    return Promise.resolve(categories)
  },
  addCategory(cat) {
    const data = read()
    cat.id = 'c' + Date.now()
    data.categories.push(cat)
    write(data)
    return Promise.resolve(cat)
  },
  
  // ===== NEW: updateCategory =====
  updateCategory(id, patch) {
    const data = read()
    const idx = data.categories.findIndex(c => c.id === id)
    if (idx === -1) return Promise.reject(new Error('Category not found'))
    data.categories[idx] = { ...data.categories[idx], ...patch }
    write(data)
    return Promise.resolve(data.categories[idx])
  },

  // ===== NEW: deleteCategory =====
  deleteCategory(id) {
    const data = read()
    const idx = data.categories.findIndex(c => c.id === id)
    if (idx === -1) return Promise.reject(new Error('Category not found'))
    data.categories.splice(idx, 1)
    write(data)
    return Promise.resolve()
  },

  addProduct(product) {
    const data = read()
    product.id = 'p' + Date.now()
    data.products.push(withDefaultImage(product))
    write(data)
    return Promise.resolve(product)
  },
  updateProduct(id, patch) {
    const data = read()
    const idx = data.products.findIndex(p => p.id === id)
    if (idx === -1) return Promise.reject('not found')
    data.products[idx] = withDefaultImage({ ...data.products[idx], ...patch })
    write(data)
    return Promise.resolve(data.products[idx])
  },
  deleteProduct(id) {
    const data = read()
    data.products = data.products.filter(p => p.id !== id)
    write(data)
    return Promise.resolve()
  },
// Functions to get coupon by code
getCoupon(code) {
  const data = read()                 // read localStorage or defaultData
  return data.coupons.find(c => c.code.toLowerCase() === code.toLowerCase()) || null
},

getAllCoupons() {
  const data = read()
  return [...data.coupons]
}


}
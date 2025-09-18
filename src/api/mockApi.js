const LS_KEY = 'mock_products_v1'

// Default data with unique IDs
const defaultData = {
  categories: [
//    {id:"c1",name:"Electronics",slug:"electronics"},
//    {id:"c2",name:"Books",slug:"books"},
   {name:"Handmade-soaps",slug:"soaps",id:"c1758170659037"},
   {name:"Handmade-Shampoo",slug:"shampoo",id:"c1758170865224"}  ],
  // List of coupons
 coupons:[
  { code: 'SAVE100', type: 'fixed', amount: 100 },
  { code: 'SAVE50', type: 'fixed', amount: 50 },
  { code: 'WELCOME200', type: 'fixed', amount: 200 }
],

products:[
// {id:"p1",

//     image:"https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg",
//     images:["https://tse3.mm.bing.net/th/id/OIP.A6b-u63TfCfJjkwBdohbUQHaHE","https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg","https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg"],
//     title:"Wireless Headphones",
//     price:1999,
//     categoryId:"c1",
//     slug:"wireless-headphones",
//     description:"Good sound."},
//     {id:"p2",
//         image:"https://tse3.mm.bing.net/th/id/OIP.A6b-u63TfCfJjkwBdohbUQHaHE",
//         images:["https://tse3.mm.bing.net/th/id/OIP.A6b-u63TfCfJjkwBdohbUQHaHE","https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg","https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg"],
//         title:"Fantasy Novel",
//         price:499,categoryId:"c2",
//         slug:"fantasy-novel",
//         description:"A great story."},
//         {id:"p3",
//         image:"https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
//         images:["https://tse3.mm.bing.net/th/id/OIP.A6b-u63TfCfJjkwBdohbUQHaHE","https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg","https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg"],
//         title:"Wireless Headphones2",
//         price:1999,
//         categoryId:"c1",
//         slug:"wireless-headphones2",
//         description:"Good sound."},
//         {id:"p4",
//             image:"https://burst.shopifycdn.com/photos/photography-product-download.jpg",
//             images:["https://tse3.mm.bing.net/th/id/OIP.A6b-u63TfCfJjkwBdohbUQHaHE","https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg","https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg"],
//             title:"Fantasy Novel2",
//             price:499,
//             categoryId:"c2",
//             slug:"fantasy-novel2",
//             description:"A great story."},
            {title:"Harbel Glow Soap",
                slug:"harbel-glow-soap",
                price:50,
                categoryId:"c1758170659037",
                description:"🌿 Herbal Glow Handmade Soap – A gentle blend of nature’s goodness, crafted to nourish and rejuvenate your skin. Made with pure herbal extracts and natural oils, this soap deeply cleanses while locking in moisture, leaving your skin soft, radiant, and glowing. Free from harsh chemicals, it’s perfect for everyday freshness and a natural skincare routine.\n\n✨ Key Benefits:\n\nEnriched with herbal extracts for a natural glow\n\nGently cleanses without drying the skin\n\nHandmade with care, using natural oils\n\nSuitable for all skin types",
                image:"https://tse2.mm.bing.net/th/id/OIP.DR0GPmsk1U6cuFa4g-OeCgHaEt?rs=1&pid=ImgDetMain&o=7&rm=3",
                id:"p1758170783855"},
                {title:"Harbel Glow Shampoo",
                    slug:"harbel-glow-shampoo",
                    price:200,categoryId:"c1758170865224",description:"🌿 Herbal Glow Shampoo – A natural blend of herbal extracts and nourishing oils, designed to gently cleanse your scalp and hair while restoring shine and strength. Infused with the goodness of nature, it helps reduce dryness, frizz, and dullness, leaving your hair soft, silky, and full of life. Free from harsh chemicals, it’s suitable for daily use and all hair types.\n\n✨ Key Benefits:\n\nPromotes healthy, shiny, and manageable hair\n\nGently cleanses scalp without stripping natural oils\n\nHerbal extracts help strengthen and reduce hair fall\n\nFree from parabens, sulfates & harmful chemicals",
                    image:"https://img.freepik.com/premium-psd/cosmetic-pump-bottle-packaging-mockup_140261-1103.jpg?w=2000",
                    id:"p1758171029027"},
                    {title:"Herbal Glow Nourishing Shampoo",
                        slug:"herbal-glow-nourishing-shampoo",
                        price:249,
                        categoryId:"c1758170865224",
                        description:"A refreshing herbal blend that gently cleanses and deeply nourishes, leaving your hair soft, silky, and naturally radiant.",
                        image:"https://static.vecteezy.com/system/resources/previews/034/494/874/non_2x/cosmetic-mockup-on-premium-style-stone-psd.png",
                        id:"p1758171152817"}
                    ]





//   products: [
//     { 
//       id: 'p1', 
//       image: "https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg", 
//        images: [ "https://tse3.mm.bing.net/th/id/OIP.A6b-u63TfCfJjkwBdohbUQHaHE",
//         "https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg",
//       "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",

//     ],
//       title: 'Wireless Headphones', 
//       price: 1999, 
//       categoryId: 'c1', 
//       slug: 'wireless-headphones', 
//       description: 'Good sound.' 
//     },
//     { 
//       id: 'p2',  
//       image: "https://tse3.mm.bing.net/th/id/OIP.A6b-u63TfCfJjkwBdohbUQHaHE", 
//           images: [ "https://tse3.mm.bing.net/th/id/OIP.A6b-u63TfCfJjkwBdohbUQHaHE",
//         "https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg",
//       "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",

//     ],
//       title: 'Fantasy Novel', 
//       price: 499, 
//       categoryId: 'c2', 
//       slug: 'fantasy-novel', 
//       description: 'A great story.' 
//     },
//     { 
//       id: 'p3', 
//       image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg", 
//           images: [ "https://tse3.mm.bing.net/th/id/OIP.A6b-u63TfCfJjkwBdohbUQHaHE",
//         "https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg",
//       "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",

//     ],
//       title: 'Wireless Headphones2', 
//       price: 1999, 
//       categoryId: 'c1', 
//       slug: 'wireless-headphones2', 
//       description: 'Good sound.' 
//     },
//     { 
//       id: 'p4',  
//       image: "https://burst.shopifycdn.com/photos/photography-product-download.jpg", 
//           images: [ "https://tse3.mm.bing.net/th/id/OIP.A6b-u63TfCfJjkwBdohbUQHaHE",
//         "https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg",
//       "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",

//     ],
//       title: 'Fantasy Novel2', 
//       price: 499, 
//       categoryId: 'c2', 
//       slug: 'fantasy-novel2', 
//       description: 'A great story.' 
//     }
//   ]
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
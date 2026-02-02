
export const menuData = {
  // ==================== PIZZAS ====================
  pizzas: {
    id: 'pizzas',
    name: 'Fresh Hand-Tossed Pizzas',
    icon: '🍕',
    color: 'from-orange-400 to-red-500',
    items: [
      // SIMPLE VEG Category
      {
        id: 'p1',
        name: 'Cheese Onion Pizza',
        description: 'Crispy onion + mozzarella cheese',
        category: 'pizzas',
        sizes: [
          { size: 'Small (7")', price: 90 },
          { size: 'Medium (10")', price: 160 },
          { size: 'Large (12")', price: 300 }
        ],
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '15-20 mins',
        subcategory: 'Simple Veg'
      },
      {
        id: 'p2',
        name: 'Cheese Tomato Pizza',
        description: 'Fresh tomato + mozzarella cheese',
        category: 'pizzas',
        sizes: [
          { size: 'Small (7")', price: 90 },
          { size: 'Medium (10")', price: 160 },
          { size: 'Large (12")', price: 300 }
        ],
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '15-20 mins',
        subcategory: 'Simple Veg'
      },
      {
        id: 'p3',
        name: 'Cheese Capsicum Pizza',
        description: 'Fresh capsicum + mozzarella cheese',
        category: 'pizzas',
        sizes: [
          { size: 'Small (7")', price: 90 },
          { size: 'Medium (10")', price: 160 },
          { size: 'Large (12")', price: 300 }
        ],
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '15-20 mins',
        subcategory: 'Simple Veg'
      },
      {
        id: 'p4',
        name: 'Cheese Sweet Corn Pizza',
        description: 'Sweet corn + mozzarella cheese',
        category: 'pizzas',
        sizes: [
          { size: 'Small (7")', price: 90 },
          { size: 'Medium (10")', price: 160 },
          { size: 'Large (12")', price: 300 }
        ],
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '15-20 mins',
        subcategory: 'Simple Veg'
      },

      // VEG MANIA Category
      {
        id: 'p5',
        name: 'Veggie Lover Pizza',
        description: 'Onion + tomato + capsicum',
        category: 'pizzas',
        sizes: [
          { size: 'Small (7")', price: 150 },
          { size: 'Medium (10")', price: 260 },
          { size: 'Large (12")', price: 450 }
        ],
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        prepTime: '20-25 mins',
        subcategory: 'Veg Mania'
      },
      {
        id: 'p6',
        name: 'Yammy Pizza',
        description: 'Onion + tomato + sweet corn',
        category: 'pizzas',
        sizes: [
          { size: 'Small (7")', price: 150 },
          { size: 'Medium (10")', price: 260 },
          { size: 'Large (12")', price: 450 }
        ],
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '20-25 mins',
        subcategory: 'Veg Mania'
      },
      {
        id: 'p7',
        name: 'Classic Pizza',
        description: 'Paneer + onion + capsicum',
        category: 'pizzas',
        sizes: [
          { size: 'Small (7")', price: 150 },
          { size: 'Medium (10")', price: 260 },
          { size: 'Large (12")', price: 450 }
        ],
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '20-25 mins',
        subcategory: 'Veg Mania'
      },
      {
        id: 'p8',
        name: 'Mexican Pizza',
        description: 'Onion + capsicum + red paprika',
        category: 'pizzas',
        sizes: [
          { size: 'Small (7")', price: 150 },
          { size: 'Medium (10")', price: 260 },
          { size: 'Large (12")', price: 450 }
        ],
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        spicyLevel: 2,
        prepTime: '20-25 mins',
        subcategory: 'Veg Mania'
      },
      {
        id: 'p9',
        name: 'Three Topping Pizza',
        description: 'Choose any three toppings',
        category: 'pizzas',
        sizes: [
          { size: 'Small (7")', price: 150 },
          { size: 'Medium (10")', price: 260 },
          { size: 'Large (12")', price: 450 }
        ],
        badge: 'Customizable',
        badgeColor: 'bg-blue-500',
        prepTime: '20-25 mins',
        subcategory: 'Veg Mania',
        customizable: true
      },
      {
        id: 'p10',
        name: 'Makhani Pizza',
        description: 'Paneer + onion + makhani sauce',
        category: 'pizzas',
        sizes: [
          { size: 'Small (7")', price: 150 },
          { size: 'Medium (10")', price: 260 },
          { size: 'Large (12")', price: 450 }
        ],
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '20-25 mins',
        subcategory: 'Veg Mania'
      },

      // SPICY MANIA Category
      {
        id: 'p11',
        name: 'Spicy Tango Pizza',
        description: 'Capsicum + sweet corn + red paprika + jalapeno',
        category: 'pizzas',
        sizes: [
          { size: 'Small (7")', price: 190 },
          { size: 'Medium (10")', price: 340 },
          { size: 'Large (12")', price: 500 }
        ],
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 3,
        prepTime: '20-25 mins',
        subcategory: 'Spicy Mania'
      },
      {
        id: 'p12',
        name: 'Peppy Paneer Pizza',
        description: 'Capsicum + red paprika + paneer',
        category: 'pizzas',
        sizes: [
          { size: 'Small (7")', price: 190 },
          { size: 'Medium (10")', price: 340 },
          { size: 'Large (12")', price: 500 }
        ],
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        spicyLevel: 2,
        prepTime: '20-25 mins',
        subcategory: 'Spicy Mania'
      },
      {
        id: 'p13',
        name: 'Delight Pizza',
        description: 'Black olive + sweet corn + jalapeno',
        category: 'pizzas',
        sizes: [
          { size: 'Small (7")', price: 190 },
          { size: 'Medium (10")', price: 340 },
          { size: 'Large (12")', price: 500 }
        ],
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        spicyLevel: 2,
        prepTime: '20-25 mins',
        subcategory: 'Spicy Mania'
      },
      {
        id: 'p14',
        name: 'Hot and Sour Pizza',
        description: 'Jalapeno + onion + spicy sauce + garlic',
        category: 'pizzas',
        sizes: [
          { size: 'Small (7")', price: 190 },
          { size: 'Medium (10")', price: 340 },
          { size: 'Large (12")', price: 500 }
        ],
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 3,
        prepTime: '20-25 mins',
        subcategory: 'Spicy Mania'
      },
      {
        id: 'p15',
        name: 'Sweet and Spicy Pizza',
        description: 'Paneer + sweet corn + onion + sweet chili',
        category: 'pizzas',
        sizes: [
          { size: 'Small (7")', price: 190 },
          { size: 'Medium (10")', price: 340 },
          { size: 'Large (12")', price: 500 }
        ],
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        spicyLevel: 2,
        prepTime: '20-25 mins',
        subcategory: 'Spicy Mania'
      },
      {
        id: 'p16',
        name: 'Harissa Pizza',
        description: 'Red paprika + onion + capsicum + harissa sauce',
        category: 'pizzas',
        sizes: [
          { size: 'Small (7")', price: 190 },
          { size: 'Medium (10")', price: 340 },
          { size: 'Large (12")', price: 500 }
        ],
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 3,
        prepTime: '20-25 mins',
        subcategory: 'Spicy Mania'
      },

      // SUPREME MANIA Category
      {
        id: 'p17',
        name: 'Punjabi Pizza',
        description: 'Onion + tomato + capsicum + sweet corn + paneer + jalapeno',
        category: 'pizzas',
        sizes: [
          { size: 'Small (7")', price: 220 },
          { size: 'Medium (10")', price: 410 },
          { size: 'Large (12")', price: 750 }
        ],
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        prepTime: '25-30 mins',
        subcategory: 'Supreme Mania'
      },
      {
        id: 'p18',
        name: 'Wonder Pizza',
        description: 'Red paprika + capsicum + black olives + paneer + sweet corn',
        category: 'pizzas',
        sizes: [
          { size: 'Small (7")', price: 220 },
          { size: 'Medium (10")', price: 410 },
          { size: 'Large (12")', price: 750 }
        ],
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '25-30 mins',
        subcategory: 'Supreme Mania'
      },

      // EXTRA TOPPINGS
      {
        id: 'p19',
        name: 'Extra Topping',
        description: 'Paneer, Onion, Fresh Tomato, Capsicum, Sweet Corn, Red Paprika, Black Olives, Jalapeno',
        category: 'pizzas',
        sizes: [
          { size: 'Small', price: 30 },
          { size: 'Medium', price: 50 },
          { size: 'Large', price: 70 }
        ],
        badge: 'Add-on',
        badgeColor: 'bg-purple-500',
        prepTime: '2 mins',
        subcategory: 'Extras'
      },
      {
        id: 'p20',
        name: 'Extra Cheese',
        description: 'Add extra mozzarella cheese',
        category: 'pizzas',
        sizes: [
          { size: 'Small', price: 30 },
          { size: 'Medium', price: 50 },
          { size: 'Large', price: 70 }
        ],
        badge: 'Add-on',
        badgeColor: 'bg-purple-500',
        prepTime: '2 mins',
        subcategory: 'Extras'
      },
      {
        id: 'p21',
        name: 'Cheese Burst',
        description: 'Molten cheese burst crust',
        category: 'pizzas',
        sizes: [
          { size: 'Small', price: 60 },
          { size: 'Medium', price: 90 },
          { size: 'Large', price: 120 }
        ],
        badge: 'Premium',
        badgeColor: 'bg-orange-500',
        popular: true,
        prepTime: '5 mins',
        subcategory: 'Extras'
      }
    ]
  },

  // ==================== BURGERS ====================
  burgers: {
    id: 'burgers',
    name: 'Burgers & Sandwiches',
    icon: '🍔',
    color: 'from-yellow-400 to-orange-500',
    items: [
      {
        id: 'b1',
        name: 'Aloo Tikki Burger',
        description: 'Crispy aloo patty with fresh veggies',
        price: 40,
        category: 'burgers',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '8-10 mins'
      },
      {
        id: 'b2',
        name: 'Paneer Burger',
        description: 'Grilled paneer patty with special sauce',
        price: 50,
        category: 'burgers',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '10-12 mins'
      },
      {
        id: 'b3',
        name: 'Mexican Burger',
        description: 'Spicy Mexican style burger',
        price: 60,
        category: 'burgers',
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 2,
        prepTime: '10-12 mins'
      },
      {
        id: 'b4',
        name: 'Cheese Burger',
        description: 'Loaded with melted cheese',
        price: 60,
        category: 'burgers',
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        prepTime: '10-12 mins'
      },
      {
        id: 'b5',
        name: 'Tandoori Burger',
        description: 'Tandoori spiced patty',
        price: 60,
        category: 'burgers',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        spicyLevel: 2,
        prepTime: '10-12 mins'
      },
      {
        id: 'b6',
        name: 'Maharaja Burger',
        description: 'King size burger with premium toppings',
        price: 90,
        category: 'burgers',
        badge: 'Premium',
        badgeColor: 'bg-orange-500',
        prepTime: '12-15 mins'
      }
    ]
  },

  // ==================== FRENCH FRIES ====================
  fries: {
    id: 'fries',
    name: 'French Fries',
    icon: '🍟',
    color: 'from-amber-400 to-yellow-500',
    items: [
      {
        id: 'f1',
        name: 'Small Fries',
        description: 'Crispy golden french fries',
        price: 50,
        category: 'fries',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '5-8 mins'
      },
      {
        id: 'f2',
        name: 'Medium Fries',
        description: 'Crispy golden french fries',
        price: 70,
        category: 'fries',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '5-8 mins'
      },
      {
        id: 'f3',
        name: 'Large Fries',
        description: 'Crispy golden french fries',
        price: 100,
        category: 'fries',
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        prepTime: '5-8 mins'
      }
    ]
  },

  // ==================== PASTA ====================
  pasta: {
    id: 'pasta',
    name: 'Pasta',
    icon: '🍝',
    color: 'from-red-400 to-pink-500',
    items: [
      {
        id: 'pa1',
        name: 'Red Sauce Pasta',
        description: 'Tangy tomato basil pasta',
        price: 100,
        category: 'pasta',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '12-15 mins'
      },
      {
        id: 'pa2',
        name: 'White Sauce Pasta',
        description: 'Creamy alfredo pasta',
        price: 150,
        category: 'pasta',
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        prepTime: '12-15 mins'
      },
      {
        id: 'pa3',
        name: 'Mix Sauce Pasta',
        description: 'Best of both - red & white',
        price: 180,
        category: 'pasta',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '12-15 mins'
      },
      {
        id: 'pa4',
        name: 'Makhan Sauce Pasta',
        description: 'Rich makhani sauce pasta',
        price: 180,
        category: 'pasta',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '12-15 mins'
      }
    ]
  },

  // ==================== WRAPS & ROLLS ====================
  wraps: {
    id: 'wraps',
    name: 'Wraps & Rolls',
    icon: '🌯',
    color: 'from-lime-400 to-green-500',
    items: [
      {
        id: 'w1',
        name: 'Aloo Tikki Roll',
        description: 'Crispy aloo tikki wrapped in soft tortilla',
        price: 50,
        category: 'wraps',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '8-10 mins'
      },
      {
        id: 'w2',
        name: 'French Fries Roll',
        description: 'Crunchy fries with sauces',
        price: 70,
        category: 'wraps',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '8-10 mins'
      },
      {
        id: 'w3',
        name: 'Paneer Roll',
        description: 'Grilled paneer with veggies',
        price: 90,
        category: 'wraps',
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        prepTime: '10-12 mins'
      },
      {
        id: 'w4',
        name: 'Spicy Roll',
        description: 'Hot and spicy roll',
        price: 100,
        category: 'wraps',
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 3,
        prepTime: '10-12 mins'
      },
      {
        id: 'w5',
        name: 'Tandoori Roll',
        description: 'Tandoori spiced roll',
        price: 100,
        category: 'wraps',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        spicyLevel: 2,
        prepTime: '10-12 mins'
      },
      {
        id: 'w6',
        name: 'Mexican Roll',
        description: 'Spicy Mexican flavored roll',
        price: 120,
        category: 'wraps',
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 3,
        prepTime: '10-12 mins'
      }
    ]
  },

  // ==================== DRY CHILLY DISHES ====================
  dryChilly: {
    id: 'dryChilly',
    name: 'Dry Chilly Specials',
    icon: '🌶️',
    color: 'from-red-500 to-orange-600',
    items: [
      {
        id: 'dc1',
        name: 'Dry Chilly Potato (Medium)',
        description: 'Crispy potatoes tossed in chilly sauce',
        price: 80,
        category: 'dryChilly',
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 3,
        prepTime: '12-15 mins'
      },
      {
        id: 'dc2',
        name: 'Dry Chilly Potato (Large)',
        description: 'Crispy potatoes tossed in chilly sauce',
        price: 120,
        category: 'dryChilly',
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 3,
        prepTime: '12-15 mins'
      },
      {
        id: 'dc3',
        name: 'Dry Chilli Paneer (Medium)',
        description: 'Paneer cubes in spicy dry chilli sauce',
        price: 180,
        category: 'dryChilly',
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        spicyLevel: 3,
        prepTime: '15-18 mins'
      },
      {
        id: 'dc4',
        name: 'Dry Chilli Paneer (Large)',
        description: 'Paneer cubes in spicy dry chilli sauce',
        price: 230,
        category: 'dryChilly',
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 3,
        prepTime: '15-18 mins'
      }
    ]
  },

  // ==================== GARLIC BREAD ====================
  garlicBread: {
    id: 'garlicBread',
    name: 'Garlic Bread',
    icon: '🥖',
    color: 'from-yellow-300 to-amber-400',
    items: [
      {
        id: 'gb1',
        name: 'Stuffed Garlic Bread',
        description: 'Crispy garlic bread with cheese filling',
        price: 120,
        category: 'garlicBread',
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        prepTime: '10-12 mins'
      }
    ]
  },

  // ==================== SANDWICHES ====================
  sandwiches: {
    id: 'sandwiches',
    name: 'Sandwiches',
    icon: '🥪',
    color: 'from-green-400 to-teal-500',
    items: [
      {
        id: 's1',
        name: 'Veg Sandwich',
        description: 'Fresh vegetables with chutneys',
        price: 50,
        category: 'sandwiches',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '8-10 mins'
      },
      {
        id: 's2',
        name: 'Grill Sandwich',
        description: 'Grilled sandwich with cheese',
        price: 70,
        category: 'sandwiches',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '10-12 mins'
      },
      {
        id: 's3',
        name: 'Tandoori Grill Sandwich',
        description: 'Tandoori spiced grilled sandwich',
        price: 70,
        category: 'sandwiches',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        spicyLevel: 2,
        prepTime: '10-12 mins'
      },
      {
        id: 's4',
        name: 'Mexican Grill Sandwich',
        description: 'Mexican style grilled sandwich',
        price: 70,
        category: 'sandwiches',
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 2,
        prepTime: '10-12 mins'
      },
      {
        id: 's5',
        name: 'Paneer Grill Sandwich',
        description: 'Grilled paneer sandwich',
        price: 120,
        category: 'sandwiches',
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        prepTime: '12-15 mins'
      },
      {
        id: 's6',
        name: 'Grill Cheese Sandwich',
        description: 'Extra cheese grilled sandwich',
        price: 120,
        category: 'sandwiches',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '10-12 mins'
      }
    ]
  },

  // ==================== SWEET CORN ====================
  sweetCorn: {
    id: 'sweetCorn',
    name: 'Sweet Corn',
    icon: '🌽',
    color: 'from-yellow-400 to-orange-400',
    items: [
      {
        id: 'sc1',
        name: 'Sweet and Salty Corn',
        description: 'Classic sweet corn',
        price: 50,
        category: 'sweetCorn',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '5-8 mins'
      },
      {
        id: 'sc2',
        name: 'Mexican Corn',
        description: 'Spicy Mexican style corn',
        price: 60,
        category: 'sweetCorn',
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 2,
        prepTime: '5-8 mins'
      },
      {
        id: 'sc3',
        name: 'Butter Spicy Corn',
        description: 'Buttery and spicy corn',
        price: 60,
        category: 'sweetCorn',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        spicyLevel: 1,
        prepTime: '5-8 mins'
      },
      {
        id: 'sc4',
        name: 'Rich Creamy Corn',
        description: 'Creamy style sweet corn',
        price: 80,
        category: 'sweetCorn',
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        prepTime: '8-10 mins'
      }
    ]
  },

  // ==================== MAGGI ====================
  maggi: {
    id: 'maggi',
    name: 'Maggi Varieties',
    icon: '🍜',
    color: 'from-orange-400 to-red-400',
    items: [
      {
        id: 'm1',
        name: 'Veg Maggi',
        description: 'Classic maggi with vegetables',
        price: 70,
        category: 'maggi',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '8-10 mins'
      },
      {
        id: 'm2',
        name: 'Mexican Maggi',
        description: 'Spicy Mexican style maggi',
        price: 90,
        category: 'maggi',
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 2,
        prepTime: '8-10 mins'
      },
      {
        id: 'm3',
        name: 'Tandoori Maggi',
        description: 'Tandoori flavored maggi',
        price: 90,
        category: 'maggi',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        spicyLevel: 2,
        prepTime: '8-10 mins'
      },
      {
        id: 'm4',
        name: 'Gravy Maggi',
        description: 'Maggi in rich gravy',
        price: 90,
        category: 'maggi',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '10-12 mins'
      },
      {
        id: 'm5',
        name: 'Spicy Maggi',
        description: 'Extra spicy maggi',
        price: 100,
        category: 'maggi',
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 3,
        prepTime: '8-10 mins'
      },
      {
        id: 'm6',
        name: 'Paneer Maggi',
        description: 'Maggi with paneer cubes',
        price: 100,
        category: 'maggi',
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        prepTime: '10-12 mins'
      }
    ]
  },

  // ==================== COFFEE ====================
  coffee: {
    id: 'coffee',
    name: 'Coffee',
    icon: '☕',
    color: 'from-amber-600 to-brown-500',
    items: [
      {
        id: 'cf1',
        name: 'Cold Coffee',
        description: 'Refreshing iced coffee',
        price: 50,
        category: 'coffee',
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        prepTime: '5-8 mins'
      },
      {
        id: 'cf2',
        name: 'Truffle Cold Coffee',
        description: 'Cold coffee with truffle flavor',
        price: 80,
        category: 'coffee',
        badge: 'Premium',
        badgeColor: 'bg-orange-500',
        prepTime: '5-8 mins'
      },
      {
        id: 'cf3',
        name: 'Vanilla Cold Coffee',
        description: 'Cold coffee with vanilla essence',
        price: 100,
        category: 'coffee',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '5-8 mins'
      }
    ]
  },

  // ==================== SHAKES ====================
  shakes: {
    id: 'shakes',
    name: 'Shakes',
    icon: '🥤',
    color: 'from-pink-400 to-purple-500',
    items: [
      {
        id: 'sh1',
        name: 'Butter Scotch Shake',
        description: 'Creamy butterscotch shake',
        price: 80,
        category: 'shakes',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '5-8 mins'
      },
      {
        id: 'sh2',
        name: 'Strawberry Shake',
        description: 'Fresh strawberry milkshake',
        price: 80,
        category: 'shakes',
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        prepTime: '5-8 mins'
      },
      {
        id: 'sh3',
        name: 'Oreo Shake',
        description: 'Crushed oreo milkshake',
        price: 80,
        category: 'shakes',
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        prepTime: '5-8 mins'
      },
      {
        id: 'sh4',
        name: 'Kitkat Shake',
        description: 'Chocolate kitkat shake',
        price: 100,
        category: 'shakes',
        badge: 'Premium',
        badgeColor: 'bg-orange-500',
        prepTime: '5-8 mins'
      }
    ]
  },

  // ==================== NOODLES ====================
  noodles: {
    id: 'noodles',
    name: 'Noodles',
    icon: '🍝',
    color: 'from-red-400 to-orange-500',
    items: [
      {
        id: 'n1',
        name: 'Veg Noodles',
        description: 'Classic vegetable noodles',
        price: 70,
        category: 'noodles',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '12-15 mins'
      },
      {
        id: 'n2',
        name: 'Hakka Noodles',
        description: 'Indo-Chinese hakka noodles',
        price: 120,
        category: 'noodles',
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        prepTime: '12-15 mins'
      },
      {
        id: 'n3',
        name: 'Schezwan Noodles',
        description: 'Spicy schezwan sauce noodles',
        price: 100,
        category: 'noodles',
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 3,
        prepTime: '12-15 mins'
      },
      {
        id: 'n4',
        name: 'Singapuri Noodles',
        description: 'Singapore style noodles',
        price: 120,
        category: 'noodles',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '12-15 mins'
      },
      {
        id: 'n5',
        name: 'Chilli Garlic Noodles',
        description: 'Garlic flavored spicy noodles',
        price: 130,
        category: 'noodles',
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 3,
        prepTime: '12-15 mins'
      },
      {
        id: 'n6',
        name: 'Chilli Potato Dry',
        description: 'Crispy potato in chilli sauce',
        price: 100,
        category: 'noodles',
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 3,
        prepTime: '12-15 mins'
      },
      {
        id: 'n7',
        name: 'Honey Chilli Potato',
        description: 'Sweet and spicy potato',
        price: 130,
        category: 'noodles',
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        spicyLevel: 2,
        prepTime: '12-15 mins'
      },
      {
        id: 'n8',
        name: 'Chilli Paneer Dry',
        description: 'Dry chilli paneer',
        price: 160,
        category: 'noodles',
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 3,
        prepTime: '15-18 mins'
      },
      {
        id: 'n9',
        name: 'Chilli Paneer Gravy',
        description: 'Paneer in spicy gravy',
        price: 180,
        category: 'noodles',
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 3,
        prepTime: '15-18 mins'
      },
      {
        id: 'n10',
        name: 'Chilli Mushroom Dry',
        description: 'Dry chilli mushroom',
        price: 160,
        category: 'noodles',
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 3,
        prepTime: '15-18 mins'
      },
      {
        id: 'n11',
        name: 'Manchurian Dry',
        description: 'Dry vegetable manchurian',
        price: 120,
        category: 'noodles',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '12-15 mins'
      },
      {
        id: 'n12',
        name: 'Manchurian Gravy',
        description: 'Manchurian in rich gravy',
        price: 150,
        category: 'noodles',
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        prepTime: '15-18 mins'
      }
    ]
  },

  // ==================== SPRING ROLLS ====================
  springRolls: {
    id: 'springRolls',
    name: 'Spring & Veg Rolls',
    icon: '🥢',
    color: 'from-green-400 to-lime-500',
    items: [
      {
        id: 'sr1',
        name: 'Spring Roll',
        description: 'Crispy vegetable spring rolls',
        price: 80,
        category: 'springRolls',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '10-12 mins'
      },
      {
        id: 'sr2',
        name: 'Veg Roll',
        description: 'Vegetable rolls',
        price: 60,
        category: 'springRolls',
        badge: 'Veg',
        badgeColor: 'bg-green-500',
        prepTime: '8-10 mins'
      },
      {
        id: 'sr3',
        name: 'Paneer Roll',
        description: 'Paneer filled rolls',
        price: 100,
        category: 'springRolls',
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        prepTime: '10-12 mins'
      }
    ]
  },

  // ==================== PANEER DISHES ====================
  paneerDishes: {
    id: 'paneerDishes',
    name: 'Paneer Specials',
    icon: '🧀',
    color: 'from-yellow-300 to-orange-400',
    items: [
      {
        id: 'pd1',
        name: 'Paneer 65',
        description: 'South Indian style paneer',
        price: 170,
        category: 'paneerDishes',
        badge: 'Spicy',
        badgeColor: 'bg-red-500',
        spicyLevel: 3,
        prepTime: '15-18 mins'
      }
    ]
  },

  // ==================== CORN DISHES ====================
  cornDishes: {
    id: 'cornDishes',
    name: 'Crispy Corn',
    icon: '🌽',
    color: 'from-yellow-400 to-amber-500',
    items: [
      {
        id: 'cd1',
        name: 'Crispy Corn',
        description: 'Crunchy fried corn kernels',
        price: 120,
        category: 'cornDishes',
        badge: 'Popular',
        badgeColor: 'bg-red-500',
        popular: true,
        prepTime: '10-12 mins'
      }
    ]
  }
};

// ==================== HELPER FUNCTIONS ====================

export const getAllMenuItems = () => {
  return Object.values(menuData).flatMap(category => category.items);
};

export const getPopularItems = () => {
  return getAllMenuItems().filter(item => item.popular);
};

export const searchMenuItems = (query) => {
  const lowerQuery = query.toLowerCase();
  return getAllMenuItems().filter(item => 
    item.name.toLowerCase().includes(lowerQuery) || 
    item.description.toLowerCase().includes(lowerQuery) ||
    item.subcategory?.toLowerCase().includes(lowerQuery)
  );
};

export const getItemsByCategory = (categoryId) => {
  return menuData[categoryId]?.items || [];
};

export const getCategoryInfo = (categoryId) => {
  return menuData[categoryId] || null;
};
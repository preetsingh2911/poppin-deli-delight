import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/Reveal";
import { StrokeReveal } from "@/components/StrokeReveal";
import { Leaf } from "lucide-react";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Poppin' Deli, Bhopal" },
      { name: "description", content: "Browse the full Poppin' Deli menu: tapas, tacos, burgers, pizza, pasta, ramen, biryani, coffee, matcha, desserts and more — crafted fresh in Bhopal." },
      { property: "og:title", content: "Menu — Poppin' Deli" },
    ],
  }),
  component: MenuPage,
});

/* ─── Menu Data ─── */

interface MenuItem {
  name: string;
  price: string;
  desc: string;
  veg?: boolean;
}

interface Category {
  id: string;
  label: string;
  items: MenuItem[];
}

const categories: Category[] = [
  {
    id: "winter-menu",
    label: "Winter Menu",
    items: [
      { name: "Japanese Sesame Chicken", price: "₹400", desc: "Crispy chicken tossed in a sweet-savory sesame glaze." },
      { name: "Sweet Potato Fries", price: "₹290", desc: "Crispy, golden sweet potato fries with a hint of natural sweetness.", veg: true },
    ],
  },
  {
    id: "tapas",
    label: "Tapas",
    items: [
      { name: "Avocado Bhel", price: "₹290", desc: "A twist on the traditional bhel, combining crunchy puffed rice, tangy chutneys, and fresh guacamole for a burst of flavor.", veg: true },
      { name: "Falafel Hummus Board", price: "₹250", desc: "Creamy hummus with pita, fresh veggies, and falafel.", veg: true },
      { name: "Garlic Honey Crispy Chicken", price: "₹450", desc: "Crispy chicken tenders with a side of sweet and savory garlic honey sauce, perfect as an appetizer or a snack." },
      { name: "Korean BBQ Chicken", price: "₹390", desc: "Tender fried chicken coated in a flavorful Korean BBQ sauce, served with sautéed veggies." },
      { name: "Korean BBQ Paneer", price: "₹370", desc: "Tender fried paneer coated in a flavorful Korean BBQ sauce, served with sautéed veggies.", veg: true },
      { name: "Korean Corn Dog", price: "₹360", desc: "A crunchy, cheesy corn dog with bold Korean street-style flair.", veg: true },
      { name: "Pita Chips & Dips", price: "₹210", desc: "Toasted pita crisps served with hummus, chipotle, salsa, and sour cream.", veg: true },
      { name: "Smoked Chicken Hummus Board", price: "₹285", desc: "Creamy hummus with pita, fresh veggies, and smoked chicken." },
    ],
  },
  {
    id: "sliders",
    label: "Sliders",
    items: [
      { name: "BBQ Cheese & Bean Slider", price: "₹260", desc: "Soft mini bun stuffed with spiced Mexican beans, salsa, and cheese.", veg: true },
      { name: "Chicken Chapli Sliders", price: "₹280", desc: "Juicy chicken chapli patties served in soft slider buns with mint chutney." },
      { name: "Dabheli Sliders", price: "₹190", desc: "Mini Gujarati-style spicy potato burgers packed with chutneys, peanuts and sev.", veg: true },
      { name: "Vada Pav Sliders", price: "₹250", desc: "Mini batata vadas sandwiched in buttery pav with spicy chutney.", veg: true },
    ],
  },
  {
    id: "shareable-bites",
    label: "Shareable Bites",
    items: [
      { name: "Cajun Potato Fries", price: "₹280", desc: "Crispy golden fries, Cajun seasoning and served hot with your fav dip.", veg: true },
      { name: "Chicken Kathi Roll", price: "₹280", desc: "Succulent chicken, sautéed onions, and masalas rolled in paratha." },
      { name: "Classic Salted Fries", price: "₹270", desc: "Crispy golden fries, lightly salted and served hot with your fav dip.", veg: true },
      { name: "Paneer Kathi Roll", price: "₹260", desc: "Succulent paneer, sautéed onions, and masalas rolled in paratha.", veg: true },
      { name: "Malai Broccoli", price: "₹250", desc: "Char-grilled broccoli coated in creamy malai and perfect balance of spices.", veg: true },
    ],
  },
  {
    id: "coffee",
    label: "Coffee / Cold",
    items: [
      { name: "Aeropress", price: "₹225", desc: "A clean, balanced cup highlighting pure coffee flavors.", veg: true },
      { name: "Berry Brew", price: "₹260", desc: "A bold shot of espresso paired with the sweet and tart flavors of cranberry, offering a unique and refreshing coffee experience.", veg: true },
      { name: "Classic Cold Coffee", price: "₹240", desc: "Chilled coffee served with milk and ice, for a refreshing and energizing drink.", veg: true },
      { name: "Iced Americano", price: "₹175", desc: "A bold espresso combined with cold water and ice, served chilled for a light and refreshing coffee.", veg: true },
      { name: "Iced Cappuccino", price: "₹190", desc: "A chilled version of the classic cappuccino, with bold espresso and frothy milk served over ice.", veg: true },
      { name: "Iced Flat White", price: "₹220", desc: "A smooth and creamy iced flat white with espresso and micro-foam milk, served cold.", veg: true },
      { name: "Iced Latte", price: "₹215", desc: "Cold espresso combined with milk and served over ice, for a refreshing twist on a classic latte.", veg: true },
      { name: "Iced Long Black", price: "₹200", desc: "Bold, chilled espresso with zero frills and all the flavor.", veg: true },
      { name: "Pineapple Cold Brew Tonic", price: "₹270", desc: "Tropical pineapple and fizzy tonic give cold brew a juicy-bright twist.", veg: true },
      { name: "Pop Espresso", price: "₹260", desc: "Bright passionfruit, zesty lemongrass, and bold espresso — Poppin's tropical twist on a wake-up call.", veg: true },
      { name: "Pour Over", price: "₹225", desc: "A clean, balanced cup highlighting pure coffee flavors.", veg: true },
      { name: "Saigon Coconut Iced Latte", price: "₹260", desc: "Chilled espresso with coconut and condensed milk, inspired by Vietnamese coffee.", veg: true },
      { name: "Shaken Vanilla Latte", price: "₹280", desc: "A creamy vanilla latte, espresso shaken with vanilla flavour and ice for a smooth and refreshing coffee.", veg: true },
      { name: "Vanilla Sweet Cream Cold Brew", price: "₹260", desc: "Smooth cold brew swirled with lush vanilla cream, like a summer cloud in a cup.", veg: true },
      { name: "Vietnamese Cold Brew", price: "₹280", desc: "A smooth cold brew coffee served with sweetened condensed milk for a rich and creamy twist.", veg: true },
    ],
  },
  {
    id: "matcha",
    label: "Matcha",
    items: [
      { name: "Blueberry Matcha Latte", price: "₹270", desc: "Velvety matcha with a splash of blueberry magic, berry bliss in every sip.", veg: true },
      { name: "Iced Matcha Latte", price: "₹225", desc: "Earthy matcha and cold milk, the green pick-me-up your summer needs.", veg: true },
      { name: "Shaken Vanilla Matcha Latte", price: "₹260", desc: "Matcha, vanilla, and ice come together in a cool, creamy shake-up.", veg: true },
      { name: "Strawberry Matcha Latte", price: "₹270", desc: "Sweet strawberries and bold matcha, where fruity meets fresh.", veg: true },
    ],
  },
  {
    id: "coolers",
    label: "Coolers",
    items: [
      { name: "Fresh Lime Soda", price: "₹175", desc: "A revitalizing blend of fresh lime juice and sparkling or still water, perfect for cooling off.", veg: true },
      { name: "Fresh Lime Water", price: "₹175", desc: "A revitalizing blend of fresh lime juice and sparkling or still water, perfect for cooling off.", veg: true },
      { name: "Guava Chilli", price: "₹225", desc: "Unique blend of sweet guava juice and a hint of chili for a zesty, fruity, and slightly spicy drink.", veg: true },
      { name: "Lychee Lemon Bliss", price: "₹200", desc: "Lychee and lemon over ice, light, zesty, and made to refresh.", veg: true },
      { name: "Masala Lemonade", price: "₹175", desc: "Refreshing lemonade infused with Indian spices and herbs for a zesty and flavorful drink.", veg: true },
      { name: "Orange Cranberry", price: "₹250", desc: "A fruity and tangy combination of orange and cranberry soda, served over ice.", veg: true },
      { name: "Passion Pop", price: "₹275", desc: "A bubbly soda with the sweet and tangy flavor of passion fruit and lemongrass, with a hint of kaffir lime leaves.", veg: true },
      { name: "Pink Lemonade", price: "₹235", desc: "A sweet and tangy pink lemonade, bursting with watermelon flavor and served chilled.", veg: true },
    ],
  },
  {
    id: "tea",
    label: "Tea",
    items: [
      { name: "Lemon Iced Tea", price: "₹175", desc: "A refreshing iced tea with a splash of lemon, served over ice for a cool and crisp drink.", veg: true },
      { name: "Peach Iced Tea", price: "₹190", desc: "A sweet and fruity iced tea made with ripe peaches, served cold for a delightful summer drink.", veg: true },
    ],
  },
  {
    id: "between-breads",
    label: "Between Breads",
    items: [
      { name: "BBQ Mushroom Burger", price: "₹440", desc: "Crunchy BBQ mushrooms layered with lettuce, cheese and house sauce in a soft bun.", veg: true },
      { name: "Big Papi Burger", price: "₹480", desc: "A crispy chicken burger topped with a smoky chipotle sauce, fresh lettuce, all served in a soft, toasted bun." },
      { name: "Cajun Fried Paneer Burger", price: "₹450", desc: "Crispy Cajun-spiced paneer with creamy mayo and tangy pickles for the perfect crunch.", veg: true },
      { name: "Chicken Firecracker Burger", price: "₹480", desc: "A spicy burger featuring a succulent chicken patty, topped with fiery jalapeños, spicy mayo, and a crisp lettuce mix." },
      { name: "Chicken Pesto Sandwich", price: "₹385", desc: "Fresh basil pesto paired with grilled chicken, packed with bold flavours." },
      { name: "Chicken Tikka Sandwich", price: "₹375", desc: "Smoky chicken tikka stuffed between toasted bread with mint chutney and fresh crunch." },
      { name: "Classic BLT Sandwich", price: "₹520", desc: "A timeless favorite with crispy bacon, fresh lettuce, juicy tomato slices, and a layer of creamy mayo, stacked between a French loaf." },
      { name: "Mumbai Masala Sandwich", price: "₹320", desc: "A spiced potato, beetroot & cheese delight, layered with chutney and toasted between buttered bread.", veg: true },
      { name: "Paneer Pesto Sandwich", price: "₹360", desc: "Fresh basil pesto paired with grilled paneer, packed with bold flavours.", veg: true },
      { name: "Paneer Tikka Sandwich", price: "₹350", desc: "Smoky paneer tikka stuffed between toasted bread with mint chutney and fresh crunch.", veg: true },
      { name: "Philly Cheese Sandwich", price: "₹350", desc: "A deliciously savory sandwich loaded with sautéed mushrooms, melted cheese, caramelized onions, served in a perfectly grilled bread.", veg: true },
      { name: "Pulled Lamb Sandwich", price: "₹435", desc: "Slow-cooked lamb, caramelised onions, and cheese for a melt-in-your-mouth experience." },
      { name: "Smash Lamb Burger", price: "₹525", desc: "Juicy smashed lamb double patty with cheese served with lettuce, caramelised onion, and special animal sauce, all inside a toasted bun." },
      { name: "Veg Firecracker Burger", price: "₹420", desc: "A spicy burger featuring a succulent potato patty, topped with fiery jalapeños, spicy mayo, and a crisp lettuce mix.", veg: true },
    ],
  },
  {
    id: "tacos",
    label: "Tacos",
    items: [
      { name: "Cajun Paneer Taco", price: "₹390", desc: "Spicy Cajun-seasoned paneer served in a soft tortilla with fresh veggies and a drizzle of sauce.", veg: true },
      { name: "Chicken Tikka Taco", price: "₹360", desc: "Chicken tikka marinated in traditional tikka spices, served in a soft taco shell with pickled onions and mint chutney." },
      { name: "Chimichurri Chicken Taco", price: "₹360", desc: "Soft tacos filled with grilled chicken, topped with fresh chimichurri sauce, crunchy slaw, and a drizzle of chipotle." },
      { name: "Chimichurri Cottage Cheese Taco", price: "₹320", desc: "Soft tacos filled with grilled cottage cheese, topped with fresh chimichurri sauce, crunchy slaw, and a drizzle of chipotle.", veg: true },
      { name: "Crispy Southwest Taco", price: "₹400", desc: "A soft shell taco filled with crispy chicken and drizzled with smoky chipotle sauce, topped with fresh lettuce and salsa." },
      { name: "Mexican Bean Taco", price: "₹250", desc: "A vegetarian taco with spiced beans, salsa, and avocado, wrapped in a soft tortilla for a hearty meal.", veg: true },
      { name: "Paneer Tikka Taco", price: "₹350", desc: "Tandoori paneer marinated in traditional tikka spices, served in a soft taco shell with pickled onions and mint chutney.", veg: true },
      { name: "Quesso Birria Taco", price: "₹430", desc: "A delicious taco featuring tender, slow-cooked lamb, and a rich birria sauce, served with a side of broth for dipping." },
    ],
  },
  {
    id: "mexican-bowls",
    label: "Mexican Bowls",
    items: [
      { name: "Cajun Paneer Bowl", price: "₹425", desc: "Spicy Cajun, grilled paneer and fresh veggies with Mexican rice.", veg: true },
      { name: "Chicken Fajita Bowl", price: "₹445", desc: "Grilled chicken in fajita seasoning served with sautéed vegetables and rice, topped with salsa, guacamole and sour cream." },
      { name: "Chicken Tikka Bowl", price: "₹445", desc: "Char-grilled chicken tikka served on a bed of herbed rice with chutneys and slaw." },
      { name: "Jerk Chicken Bowl", price: "₹445", desc: "Jerk seasoned chicken, sautéed vegetables and rice, topped with salsa, guacamole and sour cream." },
      { name: "Lamb Birria Bowl", price: "₹480", desc: "Tender, slow-cooked lamb served in a flavorful birria sauce over rice, with fresh sautéed vegetables." },
      { name: "Mushroom Fajita Bowl", price: "₹395", desc: "Sautéed mushrooms tossed with fajita spices, fresh veggies, and sauces — served on a hearty rice bowl.", veg: true },
      { name: "Paneer Tikka Bowl", price: "₹425", desc: "Char-grilled paneer served on a bed of herbed rice with chutneys and slaw.", veg: true },
    ],
  },
  {
    id: "burritos",
    label: "Burritos",
    items: [
      { name: "Chicken Fajita Burrito", price: "₹370", desc: "Grilled chicken in fajita seasoning served with sautéed vegetables and rice, topped with salsa, guacamole and sour cream." },
      { name: "Chimichurri Paneer Burrito", price: "₹350", desc: "Zesty chimichurri sauce, grilled paneer and fresh veggies wrapped to perfection.", veg: true },
      { name: "Jerk Chicken Burrito", price: "₹370", desc: "Jerk seasoned chicken, sautéed vegetables and rice, topped with salsa, guacamole and sour cream." },
      { name: "Mushroom Fajita Burrito", price: "₹350", desc: "Sautéed mushrooms tossed with fajita spices, fresh veggies, and sauces, wrapped up.", veg: true },
    ],
  },
  {
    id: "pasta",
    label: "Pasta",
    items: [
      { name: "Aglio e Olio Spaghetti", price: "₹410", desc: "A simple yet flavorful pasta dish with garlic, olive oil, and red pepper flakes, tossed with spaghetti.", veg: true },
      { name: "Alfredo Penne Pasta", price: "₹410", desc: "Silky white sauce tossed with perfectly cooked pasta for a creamy classic.", veg: true },
      { name: "Arrabiata Penne Pasta", price: "₹430", desc: "A spicy tomato-based pasta dish made with penne and flavored with garlic, chili, and fresh herbs.", veg: true },
      { name: "Cajun Alfredo Spaghetti", price: "₹430", desc: "Spaghetti tossed in a creamy Cajun sauce with a blend of tomatoes and cream, offering a smooth and tangy flavor.", veg: true },
      { name: "Pesto Spaghetti", price: "₹410", desc: "A simple yet flavorful dish featuring spaghetti tossed in a vibrant basil pesto sauce, topped with parmesan cheese and toasted pine nuts.", veg: true },
    ],
  },
  {
    id: "pizza",
    label: "Pizza",
    items: [
      { name: "Classic Margherita Pizza", price: "₹460", desc: "San Marzano tomato sauce with mozzarella & cheddar blend cheese and fresh basil.", veg: true },
      { name: "Four Cheese Pizza", price: "₹550", desc: "A rich medley of four cheeses, gooey and golden.", veg: true },
      { name: "Loaded Chicken Pizza", price: "₹585", desc: "A meaty chicken lover's dream, loaded with toppings." },
      { name: "Mexican Pizza", price: "₹530", desc: "Red hot sauce, sweet corn, onion, capsicum, jalapeño with mozzarella & cheddar blend cheese.", veg: true },
      { name: "Park Avenue Pizza", price: "₹540", desc: "Mushroom, bell pepper and broccoli on San Marzano tomato sauce with mozzarella & cheddar blend cheese.", veg: true },
      { name: "Pesto Fried Chicken Pizza", price: "₹560", desc: "Golden fried chicken bites on a pesto-smeared base with mozzarella & cheddar blend cheese." },
      { name: "Pesto Mushroom Pizza", price: "₹535", desc: "Mushroom bites on a pesto-smeared base with mozzarella & cheddar blend cheese.", veg: true },
      { name: "Sunny Shroom Pizza", price: "₹495", desc: "Mushrooms, olives, and cheese on a crisp crust.", veg: true },
      { name: "Wicked Pepperoni Pizza", price: "₹590", desc: "Lamb pepperoni, San Marzano tomato sauce, mozzarella blend & cheddar blend cheese." },
    ],
  },
  {
    id: "continental-mains",
    label: "Continental Mains",
    items: [
      { name: "Chicken Creamy Cajun Rice Bowl", price: "₹460", desc: "Spicy Cajun-seasoned chicken with roasted vegetables in a creamy gravy over rice." },
      { name: "Chicken Korean Ramen", price: "₹485", desc: "Fiery Korean ramen with juicy chicken and bold flavors." },
      { name: "Chicken Miso Ramen", price: "₹485", desc: "Tender chicken served in a deep, comforting miso broth." },
      { name: "Chilli Paprika Chicken", price: "₹465", desc: "Chicken tossed in a tangy paprika sauce with a fiery kick and served with garlic bread." },
      { name: "Chilli Paprika Paneer", price: "₹445", desc: "Paneer tossed in a tangy paprika sauce with a fiery kick and served with garlic bread.", veg: true },
      { name: "Fiery Chicken with Corn Rice", price: "₹465", desc: "A bold, spicy stir-fry served with comforting egg corn rice." },
      { name: "Fiery Paneer with Corn Rice", price: "₹445", desc: "A bold, spicy stir-fry served with comforting egg corn rice." },
      { name: "Grilled Chicken on Hummus", price: "₹385", desc: "Herb-spiced grilled chicken on creamy hummus with baked pita sticks and salad." },
      { name: "Grilled Chicken Steak", price: "₹450", desc: "A hearty grilled chicken steak, marinated in spices and served with vegetables and red wine deglazed sauce." },
      { name: "Grilled Fish with Berry Coulis", price: "₹650", desc: "Freshly grilled fish drizzled with a sweet-tart berry reduction alongside mashed potato & veggies." },
      { name: "Grilled Paneer Steak", price: "₹425", desc: "A hearty grilled paneer steak, marinated in spices and served with vegetables and red wine deglazed sauce.", veg: true },
      { name: "Harissa Baked Fish", price: "₹650", desc: "Oven-baked fish coated in smoky, spicy harissa marinade served with rice & veggies." },
      { name: "Paneer Roulade on Hummus", price: "₹350", desc: "Herb-spiced paneer roulade on creamy hummus with baked pita sticks and salad.", veg: true },
      { name: "Veg Creamy Cajun Rice Bowl", price: "₹440", desc: "Spicy Cajun-seasoned paneer with roasted vegetables in a creamy gravy over rice.", veg: true },
      { name: "Veg Korean Ramen", price: "₹450", desc: "Spicy Korean-style ramen loaded with vegetables.", veg: true },
      { name: "Veg Miso Ramen", price: "₹450", desc: "A hearty bowl of veggies in a rich, umami miso broth.", veg: true },
    ],
  },
  {
    id: "indian-mains",
    label: "Indian Mains",
    items: [
      { name: "Chicken Chettinad with Laccha Paratha", price: "₹325", desc: "A fiery, peppery Chettinad-style chicken curry paired with crisp paratha." },
      { name: "Chicken Kadhai with Lacha Paratha", price: "₹350", desc: "Bold Kadhai-style chicken curry paired with soft lacha parathas." },
      { name: "Chicken Makhani & Laccha Paratha", price: "₹420", desc: "Classic butter chicken paired with a traditional laccha paratha for a rich and hearty meal." },
      { name: "Dal Makhani & Laccha Paratha", price: "₹295", desc: "Slow-cooked black lentils in a creamy, buttery sauce, served with laccha paratha.", veg: true },
      { name: "Dal Makhani Rice Bowl", price: "₹340", desc: "Slow-cooked black lentils in a creamy, buttery sauce, served with aromatic herb rice.", veg: true },
      { name: "Dum Ka Murgh Rice Bowl", price: "₹395", desc: "Flavorful dum-cooked herb rice paired with marinated chicken for a rich and satisfying meal." },
      { name: "Dum Ka Paneer Rice Bowl", price: "₹375", desc: "Flavorful dum-cooked herb rice paired with marinated paneer for a rich and satisfying meal.", veg: true },
      { name: "Paneer Kadhai with Lacha Paratha", price: "₹315", desc: "Bold Kadhai-style paneer curry paired with soft lacha parathas.", veg: true },
      { name: "Paneer Makhani & Laccha Paratha", price: "₹385", desc: "Classic butter paneer paired with a traditional laccha paratha for a rich and hearty meal.", veg: true },
    ],
  },
  {
    id: "biryani",
    label: "Biryani",
    items: [
      { name: "Chicken Makhani Biryani", price: "₹460", desc: "Butter chicken meets biryani in this rich and indulgent dish." },
      { name: "Chicken Tikka Biryani with Raita", price: "₹440", desc: "Succulent pieces of chicken tikka layered with fragrant rice and spices, accompanied by raita." },
      { name: "Paneer Makhani Biryani", price: "₹340", desc: "Butter paneer meets biryani in this rich and indulgent dish.", veg: true },
      { name: "Veg Biryani with Raita", price: "₹360", desc: "Assorted vegetables layered with fragrant rice and spices, accompanied by raita.", veg: true },
    ],
  },
  {
    id: "breakfast",
    label: "All Day Breakfast",
    items: [
      { name: "Anda Bhurji Pao", price: "₹395", desc: "Soft pao served with spiced eggs, a hearty Indian-style street favourite." },
      { name: "Avo Snob (House Salad)", price: "₹395", desc: "Creamy mashed avocado served on toasted sourdough, with house salad; topped with herbs.", veg: true },
      { name: "Berry Smoothie", price: "₹310", desc: "A cool and creamy blend of blueberries, yogurt, and a touch of sweetness to energize your day.", veg: true },
      { name: "Hummus Avocado Toast", price: "₹420", desc: "Creamy hummus layered on sourdough, topped with creamy avocados for a Mediterranean bite.", veg: true },
      { name: "Hummus Falafel Toast", price: "₹370", desc: "Creamy hummus layered on sourdough, topped with crispy falafel for a Mediterranean bite.", veg: true },
      { name: "Hummus Smoked Chicken Toast", price: "₹380", desc: "Creamy hummus layered on sourdough, topped with juicy chicken for a Mediterranean bite." },
      { name: "Paneer Bhurji Pao", price: "₹405", desc: "Soft pao served with spiced paneer bhurji, a hearty Indian-style street favourite.", veg: true },
      { name: "Seasonal Berry Bowl", price: "₹430", desc: "A refreshing mix of seasonal berries, topped with crunchy granola and a drizzle of honey.", veg: true },
      { name: "Strawberry Smoothie", price: "₹310", desc: "A cool and creamy blend of strawberry, yogurt, and a touch of sweetness to energize your day.", veg: true },
      { name: "Strawberry Smoothie Bowl", price: "₹430", desc: "A refreshing mix of strawberries, topped with crunchy granola and a drizzle of honey.", veg: true },
      { name: "Keema Pao", price: "₹440", desc: "Soft pao served with chicken keema, a hearty Indian-style street favourite." },
    ],
  },
  {
    id: "salad",
    label: "Salad",
    items: [
      { name: "Chickpea Hummus Salad", price: "₹270", desc: "Creamy hummus meets crisp greens and hearty chickpeas. Plant powered and delicious.", veg: true },
      { name: "Greek Salad", price: "₹300", desc: "A classic Mediterranean salad with fresh cucumbers, tomatoes, olives, feta cheese, and a light olive oil dressing.", veg: true },
      { name: "Non Veg Caesar Salad", price: "₹360", desc: "Crisp romaine lettuce and chicken tossed in a creamy Caesar dressing, topped with croutons and shaved parmesan." },
      { name: "Non Veg Pesto Salad", price: "₹320", desc: "A fresh and flavorful salad made with mixed greens, roasted vegetables, chicken and a tangy pesto dressing." },
      { name: "Veg Caesar Salad", price: "₹300", desc: "Crisp romaine lettuce tossed in a creamy Caesar dressing, topped with croutons and shaved parmesan.", veg: true },
      { name: "Veg Pesto Salad", price: "₹290", desc: "A fresh and flavorful salad made with mixed greens, roasted vegetables, and a tangy pesto dressing.", veg: true },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      { name: "Churros", price: "₹290", desc: "Golden, crispy churros dusted with cinnamon sugar, served with a side of warm hazelnut ganache for dipping.", veg: true },
      { name: "Hazelnut Cheesecake", price: "₹320", desc: "A rich and creamy cheesecake infused with the nutty flavor of hazelnut, served with a crunchy graham cracker crust.", veg: true },
      { name: "Pancake", price: "₹250", desc: "Fluffy pancakes served with a side of syrup and whipped cream, perfect for a sweet breakfast or brunch.", veg: true },
      { name: "Tiramisu", price: "₹315", desc: "A classic Italian dessert made with layers of coffee-soaked ladyfingers, mascarpone cheese, and a dusting of cocoa powder. (Contains Rum)" },
      { name: "Waffles", price: "₹290", desc: "Crisp and golden waffles, served with syrup, whipped cream, and fresh fruit for a delicious breakfast treat.", veg: true },
    ],
  },
];

/* ─── Component ─── */

function MenuPage() {
  const [active, setActive] = useState(categories[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [isScrolling, setIsScrolling] = useState(false);

  // scroll to category when pill is clicked
  function scrollTo(id: string) {
    setIsScrolling(true);
    setActive(id);
    const el = sectionRefs.current[id];
    if (el) {
      const offset = 160; // header + pill bar
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setTimeout(() => setIsScrolling(false), 600);
    }
  }

  // Update active on scroll
  useEffect(() => {
    function onScroll() {
      if (isScrolling) return;
      const offset = 200;
      for (let i = categories.length - 1; i >= 0; i--) {
        const el = sectionRefs.current[categories[i].id];
        if (el && el.getBoundingClientRect().top <= offset) {
          setActive(categories[i].id);
          return;
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isScrolling]);

  // scroll active pill into view
  const pillContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = pillContainerRef.current;
    if (!container) return;
    const activeBtn = container.querySelector(`[data-cat="${active}"]`) as HTMLElement;
    if (activeBtn) {
      activeBtn.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    }
  }, [active]);

  return (
    <div>
      {/* Hero */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 bg-cream">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
          <Reveal>
            <span className="text-terracotta text-sm font-semibold tracking-[0.3em] uppercase">The menu</span>
            <h1 className="mt-4 font-display text-5xl sm:text-7xl font-bold">Brunch, coffee, repeat.</h1>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
              150+ items crafted fresh all day — from Korean tapas and wood-fired pizza to matcha lattes and house tiramisu.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sticky category bar */}
      <div className="sticky top-16 z-30 bg-background/90 backdrop-blur border-b border-border/60">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div ref={pillContainerRef} className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((c) => (
              <button
                key={c.id}
                data-cat={c.id}
                data-cursor
                onClick={() => scrollTo(c.id)}
                className={`relative shrink-0 px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                  active === c.id ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {active === c.id && (
                  <motion.span layoutId="menu-pill" className="absolute inset-0 rounded-full bg-terracotta" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                <span className="relative">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu sections */}
      <StrokeReveal text="The Menu" className="bg-cream" />
      <section className="py-12 sm:py-20 bg-cream">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          {categories.map((cat, catIdx) => (
            <div
              key={cat.id}
              ref={(el) => { sectionRefs.current[cat.id] = el; }}
              className={catIdx > 0 ? "mt-16" : ""}
            >
              <Reveal>
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">{cat.label}</h2>
                <div className="h-1 w-16 rounded-full bg-terracotta mb-8" />
              </Reveal>

              <div className="divide-y divide-border/60">
                {cat.items.map((item, i) => (
                  <Reveal key={item.name} delay={Math.min(i * 0.03, 0.25)}>
                    <div className="group py-5 flex gap-4 items-start">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display text-lg font-bold group-hover:text-terracotta transition-colors">{item.name}</h3>
                          {item.veg && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase text-green-700 bg-green-100 rounded-full px-2.5 py-0.5">
                              <Leaf size={11} /> Veg
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                      <span className="text-terracotta font-bold text-base shrink-0 pt-0.5">{item.price}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <StrokeReveal text="Bon Appetit" />
    </div>
  );
}

import foodFriedRice from "@/assets/food-fried-rice.jpg";
import foodGarlicNoodles from "@/assets/food-garlic-noodles.jpg";
import foodStirFry from "@/assets/food-stir-fry.jpg";
import foodOmelette from "@/assets/food-omelette.jpg";
import foodRamen from "@/assets/food-ramen.jpg";

export interface Recipe {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  image: string;
  cookTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  likes: number;
  comments: number;
  ingredients: { name: string; amount: string }[];
  steps: string[];
  tags: string[];
  source?: "imported" | "ai" | "community" | "scanned";
}

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Egg Fried Rice",
    author: "Chef Alex",
    authorAvatar: "A",
    image: foodFriedRice,
    cookTime: "15 min",
    difficulty: "Easy",
    likes: 2340,
    comments: 189,
    ingredients: [
      { name: "Cooked rice", amount: "3 cups" },
      { name: "Eggs", amount: "3" },
      { name: "Soy sauce", amount: "2 tbsp" },
      { name: "Sesame oil", amount: "1 tsp" },
      { name: "Green onions", amount: "3 stalks" },
      { name: "Garlic", amount: "2 cloves" },
    ],
    steps: [
      "Heat oil in a large wok over high heat",
      "Scramble eggs and set aside",
      "Add garlic and fry for 30 seconds",
      "Add cold rice and stir-fry for 3 minutes",
      "Add soy sauce and sesame oil",
      "Toss in eggs and green onions",
      "Serve hot with extra soy sauce",
    ],
    tags: ["Quick", "Asian", "Budget"],
  },
  {
    id: "2",
    title: "Garlic Butter Noodles",
    author: "Jamie Cooks",
    authorAvatar: "J",
    image: foodGarlicNoodles,
    cookTime: "20 min",
    difficulty: "Easy",
    likes: 4120,
    comments: 312,
    ingredients: [
      { name: "Spaghetti", amount: "400g" },
      { name: "Butter", amount: "4 tbsp" },
      { name: "Garlic", amount: "6 cloves" },
      { name: "Parmesan", amount: "1/2 cup" },
      { name: "Parsley", amount: "2 tbsp" },
      { name: "Red pepper flakes", amount: "1/2 tsp" },
    ],
    steps: [
      "Cook pasta al dente, reserve 1 cup pasta water",
      "Melt butter in a large pan over medium heat",
      "Add minced garlic and cook until fragrant",
      "Add red pepper flakes",
      "Toss in pasta with some pasta water",
      "Add parmesan and toss until creamy",
      "Garnish with parsley and serve",
    ],
    tags: ["Pasta", "Italian", "Comfort"],
  },
  {
    id: "3",
    title: "Chicken Stir Fry",
    author: "WokMaster",
    authorAvatar: "W",
    image: foodStirFry,
    cookTime: "25 min",
    difficulty: "Medium",
    likes: 1890,
    comments: 145,
    ingredients: [
      { name: "Chicken breast", amount: "500g" },
      { name: "Bell peppers", amount: "2" },
      { name: "Broccoli", amount: "1 head" },
      { name: "Soy sauce", amount: "3 tbsp" },
      { name: "Oyster sauce", amount: "2 tbsp" },
      { name: "Cornstarch", amount: "1 tbsp" },
    ],
    steps: [
      "Slice chicken and marinate with soy sauce and cornstarch",
      "Cut vegetables into bite-sized pieces",
      "Heat wok until smoking hot",
      "Stir-fry chicken until golden, set aside",
      "Stir-fry vegetables for 2 minutes",
      "Add chicken back with oyster sauce",
      "Toss everything and serve over rice",
    ],
    tags: ["Healthy", "Asian", "Protein"],
  },
  {
    id: "4",
    title: "Classic Omelette",
    author: "BreakfastKing",
    authorAvatar: "B",
    image: foodOmelette,
    cookTime: "10 min",
    difficulty: "Easy",
    likes: 980,
    comments: 67,
    ingredients: [
      { name: "Eggs", amount: "3" },
      { name: "Butter", amount: "1 tbsp" },
      { name: "Cheese", amount: "1/4 cup" },
      { name: "Salt & pepper", amount: "To taste" },
      { name: "Herbs", amount: "1 tbsp" },
    ],
    steps: [
      "Beat eggs with salt and pepper",
      "Melt butter in a non-stick pan over medium heat",
      "Pour in eggs and let set for 30 seconds",
      "Gently push edges to center, tilting pan",
      "Add cheese and herbs to one half",
      "Fold and slide onto plate",
    ],
    tags: ["Breakfast", "Quick", "Keto"],
  },
  {
    id: "5",
    title: "Spicy Ramen",
    author: "NoodleQueen",
    authorAvatar: "N",
    image: foodRamen,
    cookTime: "30 min",
    difficulty: "Medium",
    likes: 5670,
    comments: 423,
    ingredients: [
      { name: "Ramen noodles", amount: "2 packs" },
      { name: "Chicken broth", amount: "4 cups" },
      { name: "Soft boiled eggs", amount: "2" },
      { name: "Chili paste", amount: "2 tbsp" },
      { name: "Nori seaweed", amount: "4 sheets" },
      { name: "Green onions", amount: "2 stalks" },
    ],
    steps: [
      "Bring broth to a boil with chili paste",
      "Cook ramen noodles separately",
      "Soft boil eggs (6.5 minutes)",
      "Assemble: noodles in bowl, pour broth",
      "Top with halved egg, nori, and green onions",
      "Add extra chili if desired",
      "Slurp and enjoy!",
    ],
    tags: ["Japanese", "Spicy", "Soup"],
  },
];

export const mascotMessages = {
  import: [
    "Nice find! Let's turn that video into dinner 🦝",
    "Ooh I love this one! Let me break it down for you 🦝🍳",
    "Another banger recipe spotted! 🦝🔥",
  ],
  scan: [
    "Looks like you've got the start of something good.",
    "Let me see what we're working with here... 🦝👀",
    "I spy some delicious possibilities! 🦝",
  ],
  cookTogether: [
    "Cooking with friends? That's elite chef behavior 🦝🔥",
    "Squad cooking activated! Let's gooo 🦝",
    "Nothing beats cooking with the crew! 🦝❤️",
  ],
  cooking: [
    "You got this, chef! 🦝",
    "Looking good! Keep stirring 🦝🥄",
    "Almost there! The kitchen smells amazing 🦝",
  ],
  welcome: [
    "Hey chef! What are we cooking today? 🦝",
    "Welcome back! Your kitchen awaits 🦝🍽️",
  ],
};

export function getRandomMascotMessage(category: keyof typeof mascotMessages): string {
  const messages = mascotMessages[category];
  return messages[Math.floor(Math.random() * messages.length)];
}

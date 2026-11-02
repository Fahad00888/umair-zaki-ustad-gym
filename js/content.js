/* All the website's text lives here. Edit this file to change what the site says. */
const SITE = {
  // Set to false once you have replaced the sample photos, mentors, timetable and plans.
  showSampleNotes: true,
  // Fill these in and they appear on the Contact page. Empty ones stay hidden.
  contact: { phone: "", whatsapp: "", email: "", address: "", hours: "" },
};

const FAQ = [
  ["I have never been to a gym. Can I join?", "Yes. Beginner coaching starts with the main movements at a light weight, so you learn safe technique before adding load."],
  ["What should I bring to my first session?", "Comfortable clothes, clean indoor shoes, a towel and a water bottle."],
  ["Do you make diet plans?", "Yes. Start with the calculator and seven-day plans on the Diet Plans page, then ask a mentor to adjust them for you."],
  ["Can I train if I have an injury?", "Tell your mentor before you start. Serious or recent injuries should be checked by a doctor before you train."],
  ["How often should I train?", "Three days a week is a good starting point for most people. Your mentor can adjust this as you progress."],
];

const SERVICES = [
  { name: "Strength Training", goal: "Strength", img: "barbell-lift", short: "Barbell programs that build real strength, step by step.", forWho: "Anyone who wants to get stronger, from first-time lifters to experienced athletes.", includes: ["Squat, bench press, deadlift and overhead press coaching", "A progressive plan with weights tracked week by week", "Form checks and safe spotting", "Regular strength re-tests"] },
  { name: "Muscle Building", goal: "Strength", img: "group-barbells", short: "Structured splits and progressive overload for size and shape.", forWho: "People who want to gain muscle and improve their physique.", includes: ["A training split that fits your schedule", "Exercise selection for each muscle group", "Sets, reps and progression targets", "Calorie and protein guidance for muscle gain"] },
  { name: "Weight Loss", goal: "Weight loss", img: "cardio-weights", short: "Training, cardio and diet guidance to lose fat and keep it off.", forWho: "People who want a steady, sustainable way to lose fat.", includes: ["Resistance training to protect your muscle", "Cardio sessions matched to your fitness level", "A calorie target and meal plan", "Weight and measurement check-ins"] },
  { name: "Personal Training", goal: "Coaching", img: "trainer-plan", short: "One-to-one sessions planned around your own goal.", forWho: "Anyone who wants full attention and faster feedback from a mentor.", includes: ["A private session with your mentor", "A program written for your goal and schedule", "Hands-on technique correction", "Ongoing progress reviews"] },
  { name: "Cardio & Conditioning", goal: "Weight loss", img: "battle-ropes", short: "Circuits, intervals and machines to build your stamina.", forWho: "Anyone who wants better fitness and more energy day to day.", includes: ["Treadmill, bike and rowing work", "Battle rope and circuit sessions", "Interval training at your level", "Heart-healthy routines for beginners"] },
  { name: "Beginner Coaching", goal: "Coaching", img: "trainer-spot", short: "Learn the main lifts and safe technique from day one.", forWho: "People who are new to the gym or returning after a long break.", includes: ["A guided tour of the gym and equipment", "Step-by-step coaching on key movements", "A simple routine to follow on your own", "Support as you build confidence"] },
  { name: "Boxing & Pad Work", goal: "Combat", img: "sparring", short: "Footwork, combinations and pad work for fitness and skill.", forWho: "Anyone who wants a high-energy workout or to learn boxing basics.", includes: ["Stance, guard and footwork", "Punch combinations on pads and bags", "Boxing-style conditioning rounds", "Optional light technical drills"] },
  { name: "Group Classes", goal: "Weight loss", img: "group-class", short: "Energetic mentor-led sessions that keep you motivated.", forWho: "People who enjoy training alongside others.", includes: ["Circuit and full-body classes", "Options to make each exercise easier or harder", "A set weekly timetable", "A supportive group atmosphere"] },
  { name: "Women's Fitness", goal: "Coaching", img: "group-dumbbells", short: "Strength and toning programs designed around women's goals.", forWho: "Women at any level who want to get stronger, fitter and more confident.", includes: ["Strength and toning routines", "Coaching on technique and confidence with weights", "Conditioning and class options", "Diet guidance for your goal"] },
  { name: "Mobility & Recovery", goal: "Wellness", img: "mentor-f", short: "Stretching and mobility work so you move and recover better.", forWho: "Desk workers, stiff lifters and anyone who wants to move more freely.", includes: ["A movement and flexibility check", "Mobility routines for hips, back and shoulders", "Warm-up and cool-down plans", "Recovery guidance for rest days"] },
  { name: "Diet Coaching", goal: "Wellness", img: "food-bowl", short: "Practical eating plans built around food you already enjoy.", forWho: "Anyone who wants their diet to match their training goal.", includes: ["Calorie and protein targets", "A meal plan based on everyday food", "Vegetarian options", "Regular reviews and adjustments"] },
  { name: "Fitness Assessment", goal: "Wellness", img: "trainer-tablet", short: "Know your starting point and measure your progress.", forWho: "Anyone starting a new plan or wanting clear numbers on their progress.", includes: ["Weight, BMI and body measurements", "Basic strength and stamina tests", "Goal setting with your mentor", "Re-tests to measure your progress"] },
];

const PLANS = [
  { name: "Gym Access", price: "", featured: false, features: ["Full use of the gym floor", "Free weights, machines and cardio", "A beginner orientation session", "Access to the diet plans"] },
  { name: "Gym + Classes", price: "", featured: true, features: ["Everything in Gym Access", "All group classes", "Boxing and conditioning sessions", "A fitness assessment"] },
  { name: "Personal Coaching", price: "", featured: false, features: ["Everything in Gym + Classes", "One-to-one training with a mentor", "A personal training program", "A personal diet plan and reviews"] },
];

// Sample timetable: [time, class, mentor]
const WEEKDAY_A = [["6:30 AM", "Strength Foundations", "Umair Zaki"], ["8:00 AM", "Mobility & Stretch", "Coach Usman"], ["6:00 PM", "Boxing Basics", "Coach Bilal"], ["7:30 PM", "Full Body Circuit", "Coach Hamza"]];
const WEEKDAY_B = [["6:30 AM", "Cardio Conditioning", "Coach Sara"], ["10:00 AM", "Women's Strength", "Coach Sara"], ["6:00 PM", "Muscle Building", "Coach Bilal"], ["7:30 PM", "Beginner Lifting", "Coach Hamza"]];
const TIMETABLE = {
  Mon: WEEKDAY_A, Tue: WEEKDAY_B, Wed: WEEKDAY_A, Thu: WEEKDAY_B, Fri: WEEKDAY_A,
  Sat: [["9:00 AM", "Group Conditioning", "Coach Sara"], ["11:00 AM", "Strength Clinic", "Umair Zaki"], ["5:00 PM", "Boxing Rounds", "Coach Bilal"]],
  Sun: [],
};

const PICTURES = [
  { img: "hall-industrial", cat: "Training floor", caption: "Main training hall" },
  { img: "barbell-lift", cat: "Free weights", caption: "Setting up for a barbell lift" },
  { img: "cardio-windows", cat: "Cardio", caption: "Treadmills by the windows" },
  { img: "sparring", cat: "Boxing", caption: "Pad work with a coach" },
  { img: "machines-row", cat: "Training floor", caption: "Strength machines" },
  { img: "trainer-plan", cat: "Coaching", caption: "Planning a program with a mentor" },
  { img: "dumbbell-rack", cat: "Free weights", caption: "Dumbbell rack" },
  { img: "group-class", cat: "Classes", caption: "High-energy group class" },
  { img: "equipment-room", cat: "Training floor", caption: "Bench and weights area" },
  { img: "cardio-weights", cat: "Cardio", caption: "Cardio and weights zones" },
  { img: "trainer-spot", cat: "Coaching", caption: "Deadlift technique coaching" },
  { img: "woman-equipment", cat: "Free weights", caption: "Dumbbell training" },
  { img: "group-dumbbells", cat: "Classes", caption: "Women's dumbbell class" },
  { img: "boxing-gloves", cat: "Boxing", caption: "Boxing gloves" },
  { img: "equipment-mono", cat: "Training floor", caption: "Power rack" },
  { img: "battle-ropes", cat: "Cardio", caption: "Battle rope conditioning" },
  { img: "group-barbells", cat: "Classes", caption: "Barbell class" },
  { img: "trainer-tablet", cat: "Coaching", caption: "Reviewing progress" },
  { img: "equipment-wall", cat: "Training floor", caption: "Accessories wall" },
  { img: "yoga", cat: "Classes", caption: "Dumbbell squat class" },
];

const MENTORS = [
  { name: "Umair Zaki", role: "Head Ustad", tags: ["Strength", "Muscle"], img: "mentor-e", bio: "Leads the gym and its coaching team, with a focus on heavy compound lifts and clean technique.", skills: ["Squat, bench press and deadlift", "Strength programs", "Mentor development"], style: "Clear standards and steady progress." },
  { name: "Coach Hamza", role: "Personal Trainer", tags: ["Beginners", "Muscle"], img: "mentor-a", bio: "Helps new members build confidence and good habits in their first months of training.", skills: ["Beginner programs", "One-to-one training", "Exercise technique"], style: "Patient, friendly and detail-focused." },
  { name: "Coach Bilal", role: "Muscle & Boxing Coach", tags: ["Muscle", "Conditioning"], img: "mentor-c", bio: "Combines bodybuilding methods with boxing conditioning for size, shape and stamina.", skills: ["Muscle-building splits", "Boxing and pad work", "Conditioning rounds"], style: "High energy and motivating." },
  { name: "Coach Sara", role: "Women's Fitness Coach", tags: ["Conditioning", "Beginners"], img: "mentor-d", bio: "Runs strength and conditioning sessions for women at every level.", skills: ["Women's strength training", "Weight loss programs", "Group classes"], style: "Supportive, with clear targets." },
  { name: "Coach Usman", role: "Mobility Coach", tags: ["Mobility", "Beginners"], img: "mentor-f", bio: "Helps members move better, warm up properly and recover between sessions.", skills: ["Mobility routines", "Warm-ups and cool-downs", "Recovery planning"], style: "Calm and methodical." },
];

const VIDEOS = [
  { id: "bEv6CCg2BC8", cat: "Technique", title: "How To Get A Huge Squat With Perfect Technique", by: "Jeff Nippard" },
  { id: "VL5Ab0T07e4", cat: "Technique", title: "Build A Bigger Deadlift With Perfect Technique", by: "Jeff Nippard" },
  { id: "ptpmRrzRtWQ", cat: "Technique", title: "The Fastest Way To Blow Up Your Bench Press", by: "Jeff Nippard" },
  { id: "67IKq2obfFU", cat: "Full body", title: "Beginner Full Body Workout Routine", by: "KevTheTrainer" },
  { id: "5JmWguyvu7Y", cat: "Full body", title: "The Best Science-Based Full Body Workout (Workout A)", by: "Jeremy Ethier" },
  { id: "MWcJuLKB7RY", cat: "Full body", title: "The Best Science-Based Full Body Workout (Workout B)", by: "Jeremy Ethier" },
  { id: "QumlYxt5T6c", cat: "Full body", title: "Full Body Workout for Beginners, No Equipment", by: "Shubhyogini" },
  { id: "_Q0wB9fiiKU", cat: "Boxing & HIIT", title: "10 Min Beginner Boxing HIIT Workout", by: "Spence Crosby" },
  { id: "9ALtwoTyj_Y", cat: "Boxing & HIIT", title: "19 Min Boxing Inspired HIIT Cardio", by: "SquatCouple" },
  { id: "MuCJl9b9aPc", cat: "Boxing & HIIT", title: "Punch Away the Calories: Cardio Boxing", by: "Get Fit With Rick" },
  { id: "fZLv3GCpf14", cat: "Boxing & HIIT", title: "Easy 30 Minute Shadow Boxing HIIT", by: "NateBowerFitness" },
  { id: "zGIe_keQM_8", cat: "Mobility", title: "10 Minute Total Body Mobility", by: "Tone and Tighten" },
  { id: "KNeqD-U-KVg", cat: "Mobility", title: "15 Min Full Body Stretch for Rest Days", by: "growingannanas" },
  { id: "DppDOK2SvP0", cat: "Mobility", title: "20 Min Full Body Stretch and Mobility Routine", by: "Tom Peto Training" },
  { id: "MdaRrIboXzU", cat: "Nutrition", title: "Top 5 Easy High Protein Meals", by: "Quinton Pulliam" },
  { id: "cbgE7T8Cflw", cat: "Nutrition", title: "Easy High Protein Weight Loss Meal Prep", by: "Aseel Soueid" },
  { id: "4rEE2K9Gwi8", cat: "Nutrition", title: "High Protein Meals to Lose Fat & Build Muscle", by: "Melanie Faris" },
  { id: "p82QBrNDF_M", cat: "Nutrition", title: "How I Eat to Lose Fat & Build Muscle", by: "Ellison Scar" },
];

// Each meal: [description, estimated kcal, estimated protein g, vegetarian 1/0, grocery items]
const DIET_PLANS = {
  fat: { name: "Fat Loss", meals: {
    Breakfast: [
      ["2 boiled eggs, 2 whole wheat rotis, green tea", 400, 21, 0, "Eggs, Whole wheat flour, Green tea"],
      ["50 g oats, a glass of low-fat milk and an apple", 400, 16, 1, "Oats, Low-fat milk, Apples"],
      ["2-egg vegetable omelette, 2 slices brown bread", 380, 20, 0, "Eggs, Mixed vegetables, Brown bread"],
      ["250 g plain yogurt with fruit, chia seeds and a slice of toast", 400, 19, 1, "Plain yogurt, Seasonal fruit, Chia seeds, Brown bread"],
    ],
    Lunch: [
      ["150 g grilled chicken, large salad, 2 small rotis", 580, 51, 0, "Chicken breast, Salad vegetables, Whole wheat flour"],
      ["1.5 cups daal, salad, 2 small rotis", 550, 25, 1, "Lentils (daal), Salad vegetables, Whole wheat flour"],
      ["150 g fish, vegetables, 1 cup of rice", 570, 40, 0, "Fish, Mixed vegetables, Rice"],
      ["Chickpea salad, a bowl of yogurt, 1 small roti", 530, 24, 1, "Chickpeas, Salad vegetables, Plain yogurt, Whole wheat flour"],
    ],
    Snack: [
      ["1 apple and 10 almonds", 170, 4, 1, "Apples, Almonds"],
      ["40 g roasted chana", 160, 8, 1, "Roasted chana"],
      ["150 g yogurt with cucumber", 110, 7, 1, "Plain yogurt, Cucumber"],
      ["1 boiled egg and an orange", 140, 7, 0, "Eggs, Oranges"],
    ],
    Dinner: [
      ["150 g chicken karahi with little oil, vegetables, 1 small roti", 520, 42, 0, "Chicken breast, Mixed vegetables, Whole wheat flour"],
      ["Palak with 100 g paneer, 1 small roti", 480, 24, 1, "Spinach, Paneer, Whole wheat flour"],
      ["Grilled fish with sauteed vegetables, 1 small roti", 500, 39, 0, "Fish, Mixed vegetables, Whole wheat flour"],
      ["1.5 cups moong daal, mixed vegetables, 1 small roti", 500, 26, 1, "Lentils (daal), Mixed vegetables, Whole wheat flour"],
    ],
  }},
  muscle: { name: "Muscle Gain", meals: {
    Breakfast: [
      ["80 g oats with milk and banana, 3 eggs", 760, 38, 0, "Oats, Milk, Bananas, Eggs"],
      ["2 whole wheat parathas, 200 g yogurt, banana with peanut butter", 720, 24, 1, "Whole wheat flour, Plain yogurt, Bananas, Peanut butter"],
      ["4-egg omelette, 2 rotis, a glass of milk", 700, 42, 0, "Eggs, Whole wheat flour, Milk"],
      ["3 besan chillas with 100 g paneer, a glass of milk", 680, 38, 1, "Gram flour (besan), Paneer, Milk"],
    ],
    Lunch: [
      ["200 g chicken, 1.5 cups rice, daal and salad", 850, 65, 0, "Chicken breast, Rice, Lentils (daal), Salad vegetables"],
      ["1.5 cups rajma, 1.5 cups rice, yogurt", 780, 30, 1, "Kidney beans (rajma), Rice, Plain yogurt"],
      ["180 g lean beef curry, 2 rotis, salad", 820, 52, 0, "Lean beef, Whole wheat flour, Salad vegetables"],
      ["Chana and paneer curry, 2 rotis", 800, 36, 1, "Chickpeas, Paneer, Whole wheat flour"],
    ],
    Snack: [
      ["2 slices peanut butter toast and a glass of milk", 480, 20, 1, "Brown bread, Peanut butter, Milk"],
      ["Banana shake with milk, oats and nuts", 500, 18, 1, "Bananas, Milk, Oats, Almonds"],
      ["Chicken sandwich and a piece of fruit", 450, 30, 0, "Chicken breast, Brown bread, Seasonal fruit"],
      ["Dates and mixed nuts with yogurt", 420, 14, 1, "Dates, Almonds, Plain yogurt"],
    ],
    Dinner: [
      ["200 g chicken curry, 2 rotis, yogurt", 780, 58, 0, "Chicken breast, Whole wheat flour, Plain yogurt"],
      ["200 g fish, 1.5 cups rice, vegetables", 720, 48, 0, "Fish, Rice, Mixed vegetables"],
      ["150 g paneer bhurji, 2 rotis, salad", 760, 36, 1, "Paneer, Whole wheat flour, Salad vegetables"],
      ["Daal and vegetables, 1.5 cups rice, yogurt", 700, 28, 1, "Lentils (daal), Mixed vegetables, Rice, Plain yogurt"],
    ],
  }},
  balanced: { name: "Balanced Fitness", meals: {
    Breakfast: [
      ["2 eggs, 1 paratha with little oil, fruit", 470, 18, 0, "Eggs, Whole wheat flour, Seasonal fruit"],
      ["60 g oats with milk and nuts", 440, 16, 1, "Oats, Milk, Almonds"],
      ["Chicken sandwich on brown bread, tea", 450, 28, 0, "Chicken breast, Brown bread"],
      ["Yogurt, fruit, 2 slices toast with peanut butter", 480, 20, 1, "Plain yogurt, Seasonal fruit, Brown bread, Peanut butter"],
    ],
    Lunch: [
      ["150 g chicken, 1 cup rice, salad", 650, 45, 0, "Chicken breast, Rice, Salad vegetables"],
      ["1.5 cups daal, 1 cup rice, salad", 600, 22, 1, "Lentils (daal), Rice, Salad vegetables"],
      ["150 g fish, 2 rotis, vegetables", 620, 40, 0, "Fish, Whole wheat flour, Mixed vegetables"],
      ["Chana curry, 2 rotis, yogurt", 620, 24, 1, "Chickpeas, Whole wheat flour, Plain yogurt"],
    ],
    Snack: [
      ["Seasonal fruit and a handful of nuts", 220, 5, 1, "Seasonal fruit, Almonds"],
      ["Yogurt with nuts", 240, 11, 1, "Plain yogurt, Almonds"],
      ["Roasted chana and tea", 200, 9, 1, "Roasted chana"],
      ["1 boiled egg and fruit", 160, 7, 0, "Eggs, Seasonal fruit"],
    ],
    Dinner: [
      ["120 g chicken with vegetable curry, 2 rotis", 620, 36, 0, "Chicken breast, Mixed vegetables, Whole wheat flour"],
      ["120 g lean keema with peas, 1.5 rotis", 640, 34, 0, "Lean beef, Peas, Whole wheat flour"],
      ["Paneer and vegetables, 2 rotis", 620, 26, 1, "Paneer, Mixed vegetables, Whole wheat flour"],
      ["Mixed daal, vegetables, 1.5 rotis", 540, 22, 1, "Lentils (daal), Mixed vegetables, Whole wheat flour"],
    ],
  }},
};

const PHOTO_CREDITS = ["Aalo Lens", "Anh Nguyen", "Anna Pelzer", "Bogdan Yukhymchuk", "Brett Jordan", "Brooke Lark", "Bruce Mars", "Caroline Badran", "Danielle Cerullo", "Geert Pieters", "Jannis Brandt", "Juls P", "Karsten Winegeart", "Mark Adriane", "Mohamed Fareed", "Rahul Singh", "Risen Wang", "Sam Moghadam", "Samuel Girven", "Spencer Davis", "Sumit Bhatia", "Sven Mieke", "Victor Freitas", "Vitaly Gariev"];

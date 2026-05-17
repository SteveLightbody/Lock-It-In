const STORAGE_KEY = "lockInTracker.v7";
const OLD_STORAGE_KEYS = ["lockInTracker.v6", "lockInTracker.v5", "lockInTracker.v4", "lockInTracker.v3", "lockInTracker.v2", "lockInTracker.v1"];
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

const morningItems = [
  "Wake up on time",
  "Prayer / spiritual reading",
  "Hydrate",
  "Plan the day",
  "No phone scrolling before first anchor task"
];

const eveningItems = [
  "Review calories",
  "Lay out tomorrow's plan",
  "No late doom-scrolling",
  "Short prayer / examen",
  "In bed on time"
];

const weeklyChores = [
  "Laundry",
  "Wash sheets / towels",
  "Clean bathroom",
  "Clean kitchen surfaces",
  "Vacuum / sweep floors",
  "Grocery shopping",
  "Meal prep / plan simple meals",
  "Tidy desk and reset room",
  "Review budget / receipts"
];

const spiritualItems = [
  "Morning offering / morning prayer",
  "Rosary or at least one decade",
  "Scriptural reading",
  "Spiritual reading",
  "Evening examen"
];

const ntReadingPlan = [
  ["Week 1", "Matthew 1–14"],
  ["Week 2", "Matthew 15–28"],
  ["Week 3", "Mark 1–16"],
  ["Week 4", "Luke 1–12"],
  ["Week 5", "Luke 13–24"],
  ["Week 6", "John 1–11"],
  ["Week 7", "John 12–21; Acts 1–4"],
  ["Week 8", "Acts 5–16"],
  ["Week 9", "Acts 17–28"],
  ["Week 10", "Romans; 1 Corinthians 1–8"],
  ["Week 11", "1 Corinthians 9–16; 2 Corinthians"],
  ["Week 12", "Galatians; Ephesians; Philippians; Colossians; 1–2 Thessalonians"],
  ["Week 13", "1–2 Timothy; Titus; Philemon; Hebrews 1–7"],
  ["Week 14", "Hebrews 8–13; James; 1 Peter"],
  ["Week 15", "2 Peter; 1–3 John; Jude; Revelation 1–7"],
  ["Week 16", "Revelation 8–22"],
  ["Week 17", "Catch-up, reread John 1–3, and review notes"]
];

const strengthRotations = [
  {
    label: "Week 1 — Base Strength",
    workouts: [
      { name: "Strength A — Squat Base", type: "Strength", length: "45–60 min", focus: "Squat, bench, row", description: "Main lower-body strength day. Squat for steady sets, then bench press, a horizontal row, and one or two accessories. Keep reps crisp and stop before ugly failure." },
      { name: "Strength B — Pull Base", type: "Strength", length: "45–60 min", focus: "Deadlift, overhead press, upper back", description: "Posterior-chain and shoulder emphasis. Deadlift or RDL first, then overhead press, pull-ups or pulldowns, and trunk work." },
      { name: "Strength C — Volume Base", type: "Strength", length: "40–55 min", focus: "Bench, single-leg work, hypertrophy", description: "Moderate-intensity strength and muscle-building day. Bench or incline press first, then lunges or split squats, rows, curls/triceps, and optional calves/core." }
    ]
  },
  {
    label: "Week 2 — Volume & Hypertrophy",
    workouts: [
      { name: "Strength A — Front Squat / Leg Volume", type: "Strength", length: "45–60 min", focus: "Front squat, incline press, row", description: "Slightly lighter, higher-volume lower-body day. Front squat or goblet squat first, then incline press, chest-supported row, hamstring curls, and abs." },
      { name: "Strength B — RDL / Shoulder Volume", type: "Strength", length: "45–60 min", focus: "RDL, dumbbell press, lats", description: "Hinge volume without maxing out. Romanian deadlift, dumbbell overhead press, pulldowns, rear delts, and carries. Leave the gym feeling worked but not crushed." },
      { name: "Strength C — Upper Volume", type: "Strength", length: "40–55 min", focus: "Pressing volume, rows, arms", description: "Upper-body and hypertrophy emphasis. Use bench variation, rows, lateral raises, curls, triceps, and a short core finisher." }
    ]
  },
  {
    label: "Week 3 — Intensity & Athleticism",
    workouts: [
      { name: "Strength A — Heavy Squat / Power", type: "Strength", length: "45–60 min", focus: "Heavy squat, explosive push, pull", description: "The heavier squat week. Work up to strong but clean sets, then add explosive push-ups or speed bench, rows, and light accessories." },
      { name: "Strength B — Heavy Pull / Power", type: "Strength", length: "45–60 min", focus: "Deadlift intensity, press, posterior chain", description: "Heavier pull week. Deadlift or trap-bar deadlift for clean intensity, then strict press, chin-ups, hip extension work, and trunk bracing." },
      { name: "Strength C — Athletic Full Body", type: "Strength", length: "35–50 min", focus: "Full-body speed, carries, unilateral work", description: "Athletic full-body session. Jumps or med-ball throws, unilateral legs, push/pull superset, carries, and mobility. Keep it fast and clean." }
    ]
  }
];

const nonStrengthWorkouts = [
  { name: "Run / Intervals", type: "Cardio", length: "25–40 min", focus: "Speed and conditioning", description: "Warm up thoroughly. Then alternate hard efforts with easy recovery. Keep this controlled enough that you could repeat it weekly without wrecking the rest of training." },
  { name: "Long Cardio", type: "Cardio", length: "60+ min", focus: "Aerobic base", description: "Low-to-moderate intensity. The goal is time on feet or steady movement, not hero pace. Running, incline walking, swimming, or bike all count." },
  { name: "Easy Cardio", type: "Cardio", length: "30–45 min", focus: "Recovery and calorie burn", description: "Keep it conversational. This should make you feel better when you finish, not drained. Good day for walking, swimming, light cycling, or easy treadmill." },
  { name: "Mobility / Flexibility", type: "Recovery", length: "20–35 min", focus: "Hips, hamstrings, shoulders, spine", description: "Gentle mobility and flexibility session. Include slow breathing, hip openers, hamstring work, thoracic rotation, and shoulder mobility." },
  { name: "Optional Conditioning", type: "Conditioning", length: "15–30 min", focus: "Work capacity", description: "A short finisher or calisthenics circuit. Keep it optional: sled pushes, boxing rounds, burpees, carries, or bodyweight circuits. Do not let this sabotage recovery." }
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getMorningItemsForDate(dateKey = selectedDate) {
  const items = [
    "Wake up on time",
    "Brush teeth",
    "Make bed",
    "Prayer / spiritual reading",
    "Hydrate"
  ];

  if (dateFromKey(dateKey).getDay() !== 0) items.push("Morning workout");

  return [
    ...items,
    "Plan the day",
    "No phone scrolling before first anchor task"
  ];
}

function getEveningItemsForDate() {
  return [
    "Review calories",
    "Lay out tomorrow's plan",
    "No late doom-scrolling",
    "Short prayer / examen",
    "Brush teeth",
    "In bed on time"
  ];
}

function isEveningPriorityNow(date = new Date()) {
  const hour = date.getHours();
  return hour >= 15 || hour < 3;
}

const rosaryMysteries = {
  Joyful: ["The Annunciation", "The Visitation", "The Nativity", "The Presentation", "The Finding in the Temple"],
  Luminous: ["The Baptism of Christ", "The Wedding at Cana", "The Proclamation of the Kingdom", "The Transfiguration", "The Institution of the Eucharist"],
  Sorrowful: ["The Agony in the Garden", "The Scourging at the Pillar", "The Crowning with Thorns", "The Carrying of the Cross", "The Crucifixion"],
  Glorious: ["The Resurrection", "The Ascension", "The Descent of the Holy Spirit", "The Assumption", "The Coronation of Mary"]
};

function getTraditionalRosarySet(dateKey) {
  const day = dateFromKey(dateKey).getDay();
  if (day === 0 || day === 3) return { name: "Glorious Mysteries", key: "Glorious", note: "Traditionally prayed on Sunday and Wednesday." };
  if (day === 1 || day === 6) return { name: "Joyful Mysteries", key: "Joyful", note: "Traditionally prayed on Monday and Saturday." };
  if (day === 2 || day === 5) return { name: "Sorrowful Mysteries", key: "Sorrowful", note: "Traditionally prayed on Tuesday and Friday." };
  return { name: "Luminous Mysteries", key: "Luminous", note: "Traditionally prayed on Thursday." };
}

function getTodayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function dateFromKey(dateKey) {
  return new Date(`${dateKey}T12:00:00`);
}

function getStartOfWeek(date = new Date()) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(12, 0, 0, 0);
  return d;
}

function getWeekKey(date = new Date()) {
  return getTodayKey(getStartOfWeek(date));
}

function addToDateKey(dateKey, unit, amount) {
  const d = dateFromKey(dateKey);
  if (unit === "day") d.setDate(d.getDate() + amount);
  if (unit === "week") d.setDate(d.getDate() + amount * 7);
  if (unit === "month") d.setMonth(d.getMonth() + amount);
  if (unit === "year") d.setFullYear(d.getFullYear() + amount);
  return getTodayKey(d);
}

function createDefaultState() {
  const todayKey = getTodayKey();
  return {
    activeTab: "dashboard",
    selectedDate: todayKey,
    currentDayKey: todayKey,
    programStartWeekKey: getWeekKey(new Date()),
    calorieTarget: 2500,
    calorieGoal: {
      useSmartBudget: true,
      mode: "cut",
      adjustment: 500
    },
    days: {},
    weeks: {}
  };
}

function migrateOldState(parsed) {
  const fresh = createDefaultState();
  const migrated = { ...fresh, ...parsed };
  if (!migrated.currentDayKey) migrated.currentDayKey = getTodayKey();
  if (!migrated.programStartWeekKey) migrated.programStartWeekKey = getWeekKey(dateFromKey(migrated.selectedDate || getTodayKey()));
  if (!migrated.calorieGoal) migrated.calorieGoal = { useSmartBudget: true, mode: "cut", adjustment: 500 };
  if (!migrated.calorieGoal.mode) migrated.calorieGoal.mode = "cut";
  if (migrated.calorieGoal.adjustment === undefined || migrated.calorieGoal.adjustment === "") migrated.calorieGoal.adjustment = 500;
  if (migrated.calorieGoal.useSmartBudget === undefined) migrated.calorieGoal.useSmartBudget = true;

  Object.keys(migrated.days || {}).forEach(dateKey => {
    const day = migrated.days[dateKey];
    if (!Array.isArray(day.meals)) day.meals = [];
    if (day.caloriesActual && day.meals.length === 0) day.meals.push({ name: "Manually entered calories", calories: Number(day.caloriesActual) || 0 });
    if (!day.spiritual) day.spiritual = {};
    if (!day.measurements) day.measurements = {};
    if (!day.activity) day.activity = {};
    if (typeof day.spiritualNotes !== "string") day.spiritualNotes = "";
    if (typeof day.notes !== "string") day.notes = "";
  });

  Object.keys(migrated.weeks || {}).forEach(weekKey => {
    const week = migrated.weeks[weekKey];
    if (!Array.isArray(week.chores)) week.chores = weeklyChores.map(name => ({ name, done: false }));
  });

  return migrated;
}

function loadState() {
  const rawCurrent = localStorage.getItem(STORAGE_KEY);
  const rawOld = OLD_STORAGE_KEYS.map(key => localStorage.getItem(key)).find(Boolean);
  const raw = rawCurrent || rawOld;
  if (!raw) return createDefaultState();

  try {
    return migrateOldState(JSON.parse(raw));
  } catch {
    return createDefaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function ensureDay(dateKey) {
  if (!state.days[dateKey]) state.days[dateKey] = { morning: {}, evening: {}, meals: [], spiritual: {}, measurements: {}, activity: {}, spiritualNotes: "", notes: "" };
  if (!Array.isArray(state.days[dateKey].meals)) state.days[dateKey].meals = [];
  if (!state.days[dateKey].spiritual) state.days[dateKey].spiritual = {};
  if (!state.days[dateKey].measurements) state.days[dateKey].measurements = {};
  if (!state.days[dateKey].activity) state.days[dateKey].activity = {};
  if (typeof state.days[dateKey].spiritualNotes !== "string") state.days[dateKey].spiritualNotes = "";
  if (typeof state.days[dateKey].notes !== "string") state.days[dateKey].notes = "";
  return state.days[dateKey];
}

function getRotationIndexForDate(dateKey) {
  const selectedWeekStart = getStartOfWeek(dateFromKey(dateKey));
  const programWeekStart = getStartOfWeek(dateFromKey(state.programStartWeekKey));
  const weeksElapsed = Math.floor((selectedWeekStart - programWeekStart) / MS_PER_WEEK);
  return ((weeksElapsed % 3) + 3) % 3;
}

function getRotationLabelForDate(dateKey) {
  return strengthRotations[getRotationIndexForDate(dateKey)].label;
}

function getWorkoutPlansForDate(dateKey) {
  const rotation = strengthRotations[getRotationIndexForDate(dateKey)];
  return [...rotation.workouts, ...nonStrengthWorkouts];
}

function ensureWeek(weekKey) {
  if (!state.weeks[weekKey]) {
    const plans = getWorkoutPlansForDate(weekKey);
    state.weeks[weekKey] = {
      rotationLabel: getRotationLabelForDate(weekKey),
      workouts: plans.map(plan => ({ name: plan.name, done: false })),
      chores: weeklyChores.map(name => ({ name, done: false }))
    };
  }

  if (!Array.isArray(state.weeks[weekKey].chores)) state.weeks[weekKey].chores = weeklyChores.map(name => ({ name, done: false }));

  const currentPlans = getWorkoutPlansForDate(weekKey);
  const saved = state.weeks[weekKey].workouts || [];
  const savedByName = Object.fromEntries(saved.map(workout => [workout.name, workout.done]));
  state.weeks[weekKey].rotationLabel = getRotationLabelForDate(weekKey);
  state.weeks[weekKey].workouts = currentPlans.map(plan => ({ name: plan.name, done: Boolean(savedByName[plan.name]) }));
  return state.weeks[weekKey];
}

function getMealCalories(dateKey) {
  return ensureDay(dateKey).meals.reduce((sum, meal) => sum + (Number(meal.calories) || 0), 0);
}

function getMealNutritionTotals(dateKey) {
  const meals = ensureDay(dateKey).meals || [];
  const totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    hasProtein: false,
    hasCarbs: false,
    hasFat: false,
    hasFiber: false
  };

  meals.forEach(meal => {
    totals.calories += Number(meal.calories) || 0;

    ["protein", "carbs", "fat", "fiber"].forEach(field => {
      if (meal[field] !== undefined && meal[field] !== "") {
        const value = Number(meal[field]);
        if (Number.isFinite(value) && value >= 0) {
          totals[field] += value;
          totals[`has${field.charAt(0).toUpperCase()}${field.slice(1)}`] = true;
        }
      }
    });
  });

  return totals;
}

function formatGramTotal(value, hasValue = true) {
  if (!hasValue) return "—";
  const num = Number(value);
  if (!Number.isFinite(num)) return "—";
  return `${formatNumber(num, 0)}g`;
}

function toPositiveNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) && num > 0 ? num : 0;
}

function formatNumber(value, decimals = 1) {
  if (!Number.isFinite(value)) return "—";
  return Number(value).toFixed(decimals).replace(/\.0$/, "");
}

function roundCalorieBudget(value) {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return 0;
  return Math.round(num / 25) * 25;
}

function getActiveCalories(dateKey) {
  const activity = ensureDay(dateKey).activity || {};
  return toPositiveNumber(activity.activeCalories);
}

function getWorkoutCalories(dateKey) {
  const activity = ensureDay(dateKey).activity || {};
  return toPositiveNumber(activity.workoutCalories);
}

function getEffectiveCalorieBurn(dateKey) {
  const activity = ensureDay(dateKey).activity || {};
  const watchActive = toPositiveNumber(activity.activeCalories);
  const workoutBurn = toPositiveNumber(activity.workoutCalories);
  const useWorkoutFallback = activity.useWorkoutCalories !== false;

  if (watchActive) {
    return {
      burn: watchActive,
      source: "Apple Watch active calories",
      watchActive,
      workoutBurn,
      workoutFallbackUsed: false
    };
  }

  if (useWorkoutFallback && workoutBurn) {
    return {
      burn: workoutBurn,
      source: "manual workout estimate",
      watchActive,
      workoutBurn,
      workoutFallbackUsed: true
    };
  }

  return {
    burn: 0,
    source: "none logged",
    watchActive,
    workoutBurn,
    workoutFallbackUsed: false
  };
}

function getCalorieGoalSettings() {
  const goal = state.calorieGoal || {};
  const mode = ["cut", "maintain", "gain"].includes(goal.mode) ? goal.mode : "cut";
  return {
    useSmartBudget: goal.useSmartBudget !== false,
    mode,
    adjustment: toPositiveNumber(goal.adjustment || 0)
  };
}

function getGoalAdjustmentLabel(settings = getCalorieGoalSettings()) {
  if (settings.mode === "maintain") return "maintenance";
  if (settings.mode === "gain") return `${Math.round(settings.adjustment)} cal surplus`;
  return `${Math.round(settings.adjustment)} cal deficit`;
}

function getRollingBurnAverage(dateKey, daysBack = 14) {
  let total = 0;
  let loggedDays = 0;
  const end = dateFromKey(dateKey);

  for (let i = daysBack - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    const key = getTodayKey(d);
    const activity = state.days?.[key]?.activity || {};
    const burnSummary = getEffectiveCalorieBurn(key);

    if (hasActivityLog(activity) && burnSummary.burn) {
      total += burnSummary.burn;
      loggedDays++;
    }
  }

  return {
    average: loggedDays ? total / loggedDays : 0,
    loggedDays,
    daysBack
  };
}

function getMealCaloriesReadOnly(dateKey) {
  const meals = state.days?.[dateKey]?.meals || [];
  return meals.reduce((sum, meal) => sum + (Number(meal.calories) || 0), 0);
}

function getAverageIntake(dateKey, daysBack = 28) {
  let total = 0;
  let loggedDays = 0;
  const end = dateFromKey(dateKey);

  for (let i = daysBack - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    const key = getTodayKey(d);
    const meals = state.days?.[key]?.meals || [];

    if (meals.length) {
      total += getMealCaloriesReadOnly(key);
      loggedDays++;
    }
  }

  return {
    average: loggedDays ? total / loggedDays : 0,
    loggedDays,
    daysBack
  };
}

function getMeasurementEntries(dateKey, daysBack = 42) {
  const endTime = dateFromKey(dateKey).getTime();
  const start = dateFromKey(dateKey);
  start.setDate(start.getDate() - (daysBack - 1));
  const startTime = start.getTime();

  return Object.keys(state.days || {})
    .filter(key => {
      const time = dateFromKey(key).getTime();
      const measurements = state.days[key]?.measurements || {};
      return time >= startTime && time <= endTime && toPositiveNumber(measurements.weight);
    })
    .sort()
    .map(key => {
      const measurements = getLatestMeasurements(key);
      const composition = calculateBodyComposition(measurements);
      return {
        key,
        time: dateFromKey(key).getTime(),
        weight: composition.weight,
        bodyFat: composition.bodyFat,
        fatMass: composition.weight && composition.bodyFat ? composition.weight * composition.bodyFat / 100 : 0,
        leanMass: composition.leanMass
      };
    });
}

function getMaintenanceCalibration(dateKey = selectedDate) {
  const formula = getSmartCalorieBudgetFormula(dateKey);
  const intake = getAverageIntake(dateKey, 28);
  const entries = getMeasurementEntries(dateKey, 42);
  const latest = entries[entries.length - 1];
  const earliest = entries.find(entry => latest && (latest.time - entry.time) / 86400000 >= 21);

  if (!formula.maintenanceEstimate || !intake.average || intake.loggedDays < 14 || !earliest || !latest) {
    return {
      formulaMaintenance: formula.maintenanceEstimate,
      observedMaintenance: 0,
      calibratedMaintenance: formula.maintenanceEstimate,
      confidence: "low",
      active: false,
      intakeLoggedDays: intake.loggedDays,
      intakeWindow: intake.daysBack,
      measurementDays: 0,
      note: "Using formula estimate until enough intake and measurement history is logged."
    };
  }

  const daysBetween = Math.max(1, Math.round((latest.time - earliest.time) / 86400000));
  const weightDelta = latest.weight - earliest.weight;
  let dailyEnergyBalance = (weightDelta * 3500) / daysBetween;
  let bodyCompUsed = false;

  if (earliest.fatMass && latest.fatMass && earliest.leanMass && latest.leanMass) {
    const fatDelta = latest.fatMass - earliest.fatMass;
    const leanDelta = latest.leanMass - earliest.leanMass;
    const bodyCompDailyBalance = ((fatDelta * 3500) + (leanDelta * 1000)) / daysBetween;

    if (Number.isFinite(bodyCompDailyBalance) && Math.abs(bodyCompDailyBalance) < 1500) {
      dailyEnergyBalance = (dailyEnergyBalance * 0.65) + (bodyCompDailyBalance * 0.35);
      bodyCompUsed = true;
    }
  }

  const observedMaintenance = Math.round(intake.average - dailyEnergyBalance);
  const validObserved = observedMaintenance > 1000 && observedMaintenance < 6000;

  if (!validObserved) {
    return {
      formulaMaintenance: formula.maintenanceEstimate,
      observedMaintenance: 0,
      calibratedMaintenance: formula.maintenanceEstimate,
      confidence: "low",
      active: false,
      intakeLoggedDays: intake.loggedDays,
      intakeWindow: intake.daysBack,
      measurementDays: daysBetween,
      note: "Using formula estimate because recent trend data looked too noisy."
    };
  }

  const confidence = intake.loggedDays >= 22 && daysBetween >= 28 ? "high" : "medium";
  const observedWeight = confidence === "high" ? 0.7 : 0.5;
  const calibratedMaintenance = Math.round((observedMaintenance * observedWeight) + (formula.maintenanceEstimate * (1 - observedWeight)));

  return {
    formulaMaintenance: formula.maintenanceEstimate,
    observedMaintenance,
    calibratedMaintenance,
    confidence,
    active: true,
    bodyCompUsed,
    intakeLoggedDays: intake.loggedDays,
    intakeWindow: intake.daysBack,
    measurementDays: daysBetween,
    weightDelta,
    note: bodyCompUsed
      ? "Calibrated from recent intake, weight trend, and body-composition trend."
      : "Calibrated from recent intake and weight trend."
  };
}

function getSmartCalorieBudgetFormula(dateKey = selectedDate) {
  const settings = getCalorieGoalSettings();
  const manualTarget = roundCalorieBudget(Number(state.calorieTarget) || 0);
  const measurements = getLatestMeasurements(dateKey);
  const composition = calculateBodyComposition(measurements);
  const rollingBurn = getRollingBurnAverage(dateKey, 14);
  const bmr = composition.bmr || 0;
  const maintenanceEstimate = bmr && rollingBurn.average ? bmr + rollingBurn.average : 0;

  let goalAdjustment = 0;
  if (settings.mode === "cut") goalAdjustment = -settings.adjustment;
  if (settings.mode === "gain") goalAdjustment = settings.adjustment;

  const smartBudget = maintenanceEstimate ? roundCalorieBudget(maintenanceEstimate + goalAdjustment) : 0;
  const useSmartBudget = Boolean(settings.useSmartBudget && smartBudget);
  const budget = useSmartBudget ? smartBudget : manualTarget;

  return {
    budget,
    source: useSmartBudget ? "smart budget" : "manual target",
    smartBudget,
    manualTarget,
    useSmartBudget,
    settings,
    bmr,
    bodyFat: composition.bodyFat,
    leanMass: composition.leanMass,
    rollingBurnAverage: rollingBurn.average,
    rollingBurnLoggedDays: rollingBurn.loggedDays,
    rollingBurnWindow: rollingBurn.daysBack,
    maintenanceEstimate,
    goalAdjustment
  };
}

function getSmartCalorieBudget(dateKey = selectedDate) {
  const formula = getSmartCalorieBudgetFormula(dateKey);
  const calibration = getMaintenanceCalibration(dateKey);
  const useCalibratedMaintenance = Boolean(formula.useSmartBudget && calibration.active && calibration.calibratedMaintenance);
  const maintenanceEstimate = useCalibratedMaintenance ? calibration.calibratedMaintenance : formula.maintenanceEstimate;
  const smartBudget = maintenanceEstimate ? roundCalorieBudget(maintenanceEstimate + formula.goalAdjustment) : 0;
  const useSmartBudget = Boolean(formula.settings.useSmartBudget && smartBudget);

  return {
    ...formula,
    budget: useSmartBudget ? smartBudget : formula.manualTarget,
    source: useSmartBudget ? (useCalibratedMaintenance ? "calibrated smart budget" : "smart budget") : "manual target",
    smartBudget,
    useSmartBudget,
    maintenanceEstimate,
    formulaMaintenance: formula.maintenanceEstimate,
    observedMaintenance: calibration.observedMaintenance,
    calibratedMaintenance: calibration.calibratedMaintenance,
    calibrationActive: calibration.active,
    calibrationConfidence: calibration.confidence,
    calibrationNote: calibration.note,
    calibrationIntakeLoggedDays: calibration.intakeLoggedDays,
    calibrationIntakeWindow: calibration.intakeWindow,
    calibrationMeasurementDays: calibration.measurementDays
  };
}

function getDailyEnergySummary(dateKey = selectedDate) {
  const intake = getMealCalories(dateKey);
  const burnSummary = getEffectiveCalorieBurn(dateKey);
  const activeBurn = burnSummary.burn;
  const budgetSummary = getSmartCalorieBudget(dateKey);
  const target = budgetSummary.budget || 0;
  const budgetIncludesRollingBurn = budgetSummary.useSmartBudget;
  const adjustedTarget = target ? (budgetIncludesRollingBurn ? target : target + activeBurn) : 0;
  const netCalories = intake - activeBurn;
  const burnAdjustedRemaining = adjustedTarget ? adjustedTarget - intake : 0;
  const netVsTarget = target ? (budgetIncludesRollingBurn ? intake - target : netCalories - target) : 0;

  return {
    intake,
    activeBurn,
    burnSource: burnSummary.source,
    watchActiveCalories: burnSummary.watchActive,
    workoutCalories: burnSummary.workoutBurn,
    workoutFallbackUsed: burnSummary.workoutFallbackUsed,
    target,
    adjustedTarget,
    netCalories,
    burnAdjustedRemaining,
    netVsTarget,
    budgetSource: budgetSummary.source,
    smartBudget: budgetSummary.smartBudget,
    manualTarget: budgetSummary.manualTarget,
    bmr: budgetSummary.bmr,
    rollingBurnAverage: budgetSummary.rollingBurnAverage,
    rollingBurnLoggedDays: budgetSummary.rollingBurnLoggedDays,
    rollingBurnWindow: budgetSummary.rollingBurnWindow,
    maintenanceEstimate: budgetSummary.maintenanceEstimate,
    formulaMaintenance: budgetSummary.formulaMaintenance,
    calibratedMaintenance: budgetSummary.calibratedMaintenance,
    observedMaintenance: budgetSummary.observedMaintenance,
    calibrationActive: budgetSummary.calibrationActive,
    calibrationConfidence: budgetSummary.calibrationConfidence,
    budgetIncludesRollingBurn,
    goalLabel: getGoalAdjustmentLabel(budgetSummary.settings)
  };
}


function getActivityLog(dateKey) {
  const activity = ensureDay(dateKey).activity || {};
  return {
    activeCalories: activity.activeCalories || "",
    workoutCalories: activity.workoutCalories || "",
    useWorkoutCalories: activity.useWorkoutCalories !== false
  };
}

function hasActivityLog(activity) {
  return Boolean(activity && (
    (activity.activeCalories !== undefined && activity.activeCalories !== "") ||
    (activity.workoutCalories !== undefined && activity.workoutCalories !== "")
  ));
}

function saveActivityFromForm() {
  const section = document.getElementById("activitySection");
  if (!section) return;

  const day = ensureDay(selectedDate);
  day.activity = {
    activeCalories: section.querySelector("#watchActiveCalories")?.value.trim() || "",
    workoutCalories: section.querySelector("#manualWorkoutCalories")?.value.trim() || "",
    useWorkoutCalories: section.querySelector("#useWorkoutCalories")?.checked !== false
  };

  saveState();
  renderActivity();
  renderMeals();
  renderStats();
  renderAnalytics();
}

function renderActivity() {
  const parent = document.getElementById("trackingDataPanel");
  if (!parent) return;

  let section = document.getElementById("activitySection");
  if (!section) {
    section = document.createElement("div");
    section.id = "activitySection";
    section.className = "card span-12";
    parent.appendChild(section);
  }

  const activity = getActivityLog(selectedDate);
  const active = toPositiveNumber(activity.activeCalories);
  const workout = toPositiveNumber(activity.workoutCalories);
  const effectiveBurn = getEffectiveCalorieBurn(selectedDate);

  section.innerHTML = `
    <h2>Activity burn</h2>
    <p class="tiny">Log Apple Watch active calories when you have them. If Apple Watch active calories are blank, the app can use a manual workout estimate instead. It will not add both together.</p>
    <div class="grid compact-grid">
      <label class="field span-6">
        <span>Apple Watch active calories</span>
        <input id="watchActiveCalories" type="number" inputmode="decimal" min="0" step="1" value="${activity.activeCalories}" placeholder="650" style="min-height: 48px; font-size: 1.1rem; padding: 12px 14px;" />
      </label>
      <label class="field span-6">
        <span>Manual workout calories</span>
        <input id="manualWorkoutCalories" type="number" inputmode="decimal" min="0" step="1" value="${activity.workoutCalories}" placeholder="optional" style="min-height: 48px; font-size: 1.1rem; padding: 12px 14px;" />
      </label>
      <label class="field span-12" style="display: flex; gap: 10px; align-items: center;">
        <input id="useWorkoutCalories" type="checkbox" ${activity.useWorkoutCalories ? "checked" : ""} />
        <span>Use manual workout calories only when Apple Watch active calories are blank</span>
      </label>
      <div class="stat-card span-3">
        <strong>${active ? `${Math.round(active)} cal` : "—"}</strong>
        <span class="tiny">Apple Watch active</span>
      </div>
      <div class="stat-card span-3">
        <strong>${workout ? `${Math.round(workout)} cal` : "—"}</strong>
        <span class="tiny">manual workout estimate</span>
      </div>
      <div class="stat-card span-3">
        <strong>${effectiveBurn.burn ? `${Math.round(effectiveBurn.burn)} cal` : "—"}</strong>
        <span class="tiny">used for net calories</span>
      </div>
      <div class="stat-card span-3">
        <strong>${effectiveBurn.source}</strong>
        <span class="tiny">burn source</span>
      </div>
    </div>
    <button id="saveActivity" type="button">Save activity burn</button>
  `;

  section.querySelector("#saveActivity").addEventListener("click", saveActivityFromForm);
}

function saveCalorieGoalFromForm() {
  const section = document.getElementById("calorieGoalSection");
  if (!section) return;

  state.calorieGoal = {
    useSmartBudget: section.querySelector("#useSmartBudget")?.checked !== false,
    mode: section.querySelector("#calorieGoalMode")?.value || "cut",
    adjustment: section.querySelector("#calorieGoalAdjustment")?.value.trim() || "0"
  };

  saveState();
  renderCalorieGoal();
  renderMeals();
  renderStats();
  renderAnalytics();
}

function renderCalorieGoal() {
  const parent = document.getElementById("trackingDataPanel");
  if (!parent) return;

  let section = document.getElementById("calorieGoalSection");
  if (!section) {
    section = document.createElement("div");
    section.id = "calorieGoalSection";
    section.className = "card span-12";
    parent.appendChild(section);
  }

  const settings = getCalorieGoalSettings();
  const budget = getSmartCalorieBudget(selectedDate);

  section.innerHTML = `
    <h2>Daily calorie budget</h2>
    <p class="tiny">Uses body-composition BMR, your 14-day rolling average burn, and — when enough history exists — your actual intake and body-change trend. If calibration data is missing, the app uses the formula estimate until enough history is available.</p>
    <div class="grid compact-grid">
      <label class="field span-12" style="display: flex; gap: 10px; align-items: center;">
        <input id="useSmartBudget" type="checkbox" ${settings.useSmartBudget ? "checked" : ""} />
        <span>Use smart calorie budget when available</span>
      </label>
      <label class="field span-6">
        <span>Goal</span>
        <select id="calorieGoalMode" style="min-height: 48px; font-size: 1.1rem; padding: 12px 14px;">
          <option value="cut" ${settings.mode === "cut" ? "selected" : ""}>Cut</option>
          <option value="maintain" ${settings.mode === "maintain" ? "selected" : ""}>Maintain</option>
          <option value="gain" ${settings.mode === "gain" ? "selected" : ""}>Gain</option>
        </select>
      </label>
      <label class="field span-6">
        <span>Deficit / surplus calories</span>
        <input id="calorieGoalAdjustment" type="number" inputmode="decimal" min="0" step="50" value="${settings.adjustment || ""}" placeholder="500" style="min-height: 48px; font-size: 1.1rem; padding: 12px 14px;" />
      </label>
      <div class="stat-card span-4">
        <strong>${budget.calibratedMaintenance ? `${Math.round(budget.calibratedMaintenance)} cal` : "—"}</strong>
        <span class="tiny">calibrated maintenance (${budget.calibrationConfidence})</span>
      </div>
      <div class="stat-card span-4">
        <strong>${budget.budget ? `${roundCalorieBudget(budget.budget)} cal` : "—"}</strong>
        <span class="tiny">recommended daily budget</span>
      </div>
      <div class="stat-card span-4">
        <strong>${budget.rollingBurnAverage ? `${Math.round(budget.rollingBurnAverage)} cal` : "—"}</strong>
        <span class="tiny">14-day avg burn (${budget.rollingBurnLoggedDays}/${budget.rollingBurnWindow})</span>
      </div>
      <p class="tiny span-12">${budget.calibrationNote || ""}</p>
    </div>
    <button id="saveCalorieGoal" type="button">Save calorie goal</button>
  `;

  section.querySelector("#saveCalorieGoal").addEventListener("click", saveCalorieGoalFromForm);
}

function getLatestMeasurements(dateKey) {
  const merged = {};
  const selectedTime = dateFromKey(dateKey).getTime();

  Object.keys(state.days || {})
    .filter(key => dateFromKey(key).getTime() <= selectedTime)
    .sort()
    .forEach(key => {
      const measurements = state.days[key]?.measurements || {};
      ["weight", "height", "waist", "neck", "bodyFatManual"].forEach(field => {
        if (measurements[field] !== undefined && measurements[field] !== "") merged[field] = measurements[field];
      });
    });

  return merged;
}

function calculateBodyComposition(measurements) {
  const weight = toPositiveNumber(measurements.weight);
  const height = toPositiveNumber(measurements.height);
  const waist = toPositiveNumber(measurements.waist);
  const neck = toPositiveNumber(measurements.neck);
  const manualBodyFat = toPositiveNumber(measurements.bodyFatManual);

  let estimatedBodyFat = 0;
  if (height && waist && neck && waist > neck) {
    estimatedBodyFat = 86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
  }

  const bodyFat = manualBodyFat || estimatedBodyFat;
  const leanMass = weight && bodyFat ? weight * (1 - bodyFat / 100) : 0;
  const leanMassKg = leanMass / 2.20462;
  const bmr = leanMassKg ? 370 + (21.6 * leanMassKg) : 0;

  return {
    weight,
    height,
    waist,
    neck,
    bodyFat: bodyFat && bodyFat > 0 && bodyFat < 70 ? bodyFat : 0,
    bodyFatSource: manualBodyFat ? "manual" : "Navy estimate",
    leanMass,
    bmr
  };
}

function saveMeasurementsFromForm() {
  const section = document.getElementById("measurementSection");
  if (!section) return;

  const day = ensureDay(selectedDate);
  day.measurements = {
    weight: section.querySelector("#measurementWeight")?.value.trim() || "",
    height: section.querySelector("#measurementHeight")?.value.trim() || "",
    waist: section.querySelector("#measurementWaist")?.value.trim() || "",
    neck: section.querySelector("#measurementNeck")?.value.trim() || "",
    bodyFatManual: section.querySelector("#measurementBodyFat")?.value.trim() || ""
  };

  saveState();
  renderMeasurements();
  renderCalorieGoal();
  renderMeals();
  renderStats();
  renderAnalytics();
}

function renderMeasurements() {
  const parent = document.getElementById("trackingDataPanel");
  if (!parent) return;

  let section = document.getElementById("measurementSection");
  if (!section) {
    section = document.createElement("div");
    section.id = "measurementSection";
    section.className = "card span-12";
    parent.appendChild(section);
  }

  const measurements = getLatestMeasurements(selectedDate);
  const composition = calculateBodyComposition(measurements);

  section.innerHTML = `
    <h2>Measurements & body composition</h2>
    <p class="tiny">Log measurements here when they change. The app carries your latest earlier measurements forward for the selected date.</p>
    <div class="grid compact-grid">
      <label class="field span-6">
        <span>Weight (lb)</span>
        <input id="measurementWeight" type="number" inputmode="decimal" min="0" step="0.1" value="${measurements.weight || ""}" placeholder="211" style="min-height: 48px; font-size: 1.1rem; padding: 12px 14px;" />
      </label>
      <label class="field span-6">
        <span>Height (in)</span>
        <input id="measurementHeight" type="number" inputmode="decimal" min="0" step="0.1" value="${measurements.height || ""}" placeholder="69.5" style="min-height: 48px; font-size: 1.1rem; padding: 12px 14px;" />
      </label>
      <label class="field span-6">
        <span>Waist (in)</span>
        <input id="measurementWaist" type="number" inputmode="decimal" min="0" step="0.1" value="${measurements.waist || ""}" placeholder="at navel" style="min-height: 48px; font-size: 1.1rem; padding: 12px 14px;" />
      </label>
      <label class="field span-6">
        <span>Neck (in)</span>
        <input id="measurementNeck" type="number" inputmode="decimal" min="0" step="0.1" value="${measurements.neck || ""}" placeholder="below Adam's apple" style="min-height: 48px; font-size: 1.1rem; padding: 12px 14px;" />
      </label>
      <label class="field span-6">
        <span>Manual body fat %</span>
        <input id="measurementBodyFat" type="number" inputmode="decimal" min="0" step="0.1" value="${measurements.bodyFatManual || ""}" placeholder="optional" style="min-height: 48px; font-size: 1.1rem; padding: 12px 14px;" />
      </label>
      <div class="stat-card span-3">
        <strong>${composition.bodyFat ? `${formatNumber(composition.bodyFat)}%` : "—"}</strong>
        <span class="tiny">body fat (${composition.bodyFat ? composition.bodyFatSource : "needs waist, neck, height"})</span>
      </div>
      <div class="stat-card span-3">
        <strong>${composition.leanMass ? `${formatNumber(composition.leanMass)} lb` : "—"}</strong>
        <span class="tiny">estimated lean mass</span>
      </div>
      <div class="stat-card span-3">
        <strong>${composition.bmr ? `${Math.round(composition.bmr)} cal` : "—"}</strong>
        <span class="tiny">body-composition BMR</span>
      </div>
    </div>
    <button id="saveMeasurements" type="button">Save measurements</button>
  `;

  section.querySelector("#saveMeasurements").addEventListener("click", saveMeasurementsFromForm);
}

let state = loadState();
let selectedDate = state.selectedDate || getTodayKey();
let notesSaveTimer;

const elements = {
  todayLabel: document.getElementById("todayLabel"),
  datePanel: document.getElementById("datePanel"),
  datePicker: document.getElementById("datePicker"),
  datePanelSelectedLabel: document.getElementById("datePanelSelectedLabel"),
  selectedDayLabel: document.getElementById("selectedDayLabel"),
  mealDayLabel: document.getElementById("mealDayLabel"),
  spiritualDayLabel: document.getElementById("spiritualDayLabel"),
  analyticsDayLabel: document.getElementById("analyticsDayLabel"),
  trackingDayLabel: document.getElementById("trackingDayLabel"),
  dayTabs: document.getElementById("dayTabs"),
  mealDayTabs: document.getElementById("mealDayTabs"),
  spiritualDayTabs: document.getElementById("spiritualDayTabs"),
  morningList: document.getElementById("morningList"),
  eveningList: document.getElementById("eveningList"),
  workoutCompletionList: document.getElementById("workoutCompletionList"),
  workoutPlanList: document.getElementById("workoutPlanList"),
  weeklyWorkoutCount: document.getElementById("weeklyWorkoutCount"),
  workoutProgress: document.getElementById("workoutProgress"),
  routineScore: document.getElementById("routineScore"),
  routineProgress: document.getElementById("routineProgress"),
  calorieStatus: document.getElementById("calorieStatus"),
  calorieProgress: document.getElementById("calorieProgress"),
  calorieTargetInput: document.getElementById("calorieTarget"),
  calorieActualInput: document.getElementById("calorieActual"),
  dailyNotes: document.getElementById("dailyNotes"),
  mealNameInput: document.getElementById("mealName"),
  mealCaloriesInput: document.getElementById("mealCalories"),
  mealList: document.getElementById("mealList"),
  mealTotal: document.getElementById("mealTotal"),
  mealRemaining: document.getElementById("mealRemaining"),
  mealProgress: document.getElementById("mealProgress"),
  workoutRotationLabel: document.getElementById("workoutRotationLabel"),
  dashboardRotationLabel: document.getElementById("dashboardRotationLabel"),
  choreList: document.getElementById("choreList"),
  choresTabList: document.getElementById("choresTabList"),
  choresTabScoreLabel: document.getElementById("choresTabScoreLabel"),
  choreScoreLabel: document.getElementById("choreScoreLabel"),
  spiritualChecklist: document.getElementById("spiritualChecklist"),
  spiritualNotes: document.getElementById("spiritualNotes"),
  scriptureWeekTitle: document.getElementById("scriptureWeekTitle"),
  scriptureWeekReading: document.getElementById("scriptureWeekReading"),
  periodAnalyticsGrid: document.getElementById("periodAnalyticsGrid"),
  rosaryMysteryTitle: document.getElementById("rosaryMysteryTitle"),
  rosaryMysteryList: document.getElementById("rosaryMysteryList"),
  rosaryMysteryNote: document.getElementById("rosaryMysteryNote")
};

function setSelectedDate(dateKey) {
  selectedDate = dateKey;
  state.selectedDate = selectedDate;
  saveState();
  render();
}

function setActiveTab(tabName) {
  state.activeTab = tabName;
  saveState();

  document.querySelectorAll(".tab-button").forEach(button => button.classList.toggle("active", button.dataset.tab === tabName));
  document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.toggle("active", panel.id === tabName));
}

function formatSelectedDate(dateKey) {
  return dateFromKey(dateKey).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function updateClockWidget() {
  const now = new Date();
  const selectedIsToday = selectedDate === getTodayKey(now);
  const dateText = now.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  const timeText = now.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });

  elements.todayLabel.innerHTML = `
    <strong>${selectedIsToday ? dateText : formatSelectedDate(selectedDate)}</strong>
    <span>${selectedIsToday ? `Live clock · ${timeText}` : `Viewing past/future · live time ${timeText}`}</span>
  `;
}

function checkDateRollover() {
  const todayKey = getTodayKey();
  if (state.currentDayKey !== todayKey) {
    const wasViewingOldToday = selectedDate === state.currentDayKey;
    state.currentDayKey = todayKey;
    ensureDay(todayKey);
    if (wasViewingOldToday) selectedDate = todayKey;
    state.selectedDate = selectedDate;
    saveState();
    render();
  } else {
    updateClockWidget();
  }
}

function renderDateLabels() {
  updateClockWidget();
  const formatted = formatSelectedDate(selectedDate);
  elements.selectedDayLabel.textContent = formatted;
  elements.mealDayLabel.textContent = formatted;
  elements.spiritualDayLabel.textContent = formatted;
  elements.analyticsDayLabel.textContent = formatted;
  if (elements.trackingDayLabel) elements.trackingDayLabel.textContent = formatted;
  elements.datePanelSelectedLabel.textContent = formatted;
  elements.datePicker.value = selectedDate;
}

function ensureDashboardFocusLayout() {
  const grid = document.querySelector("#dashboard .dashboard-grid");
  if (!grid) return;

  if (grid.dataset.focusLayout === "true") {
    reorderDashboardFocusCards();
    return;
  }

  const originalCaloriesCard = elements.calorieActualInput?.closest(".card");
  const originalNotesCard = elements.dailyNotes?.closest(".card");
  const morningCard = document.createElement("div");
  morningCard.id = "dashboardMorningCard";
  morningCard.className = "card span-12";
  morningCard.innerHTML = `
    <div class="section-title">
      <h2>Morning Checklist</h2>
      <span class="tiny" id="selectedDayLabel"></span>
    </div>
    <div class="day-tabs" id="dayTabs"></div>
    <div class="checklist" id="morningList"></div>
  `;

  const spiritualCard = document.createElement("div");
  spiritualCard.id = "dashboardSpiritualCard";
  spiritualCard.className = "card span-12";
  spiritualCard.innerHTML = `
    <div class="section-title">
      <h2>Spiritual Checklist</h2>
      <span class="tiny">rosary · scripture · spiritual reading</span>
    </div>
    <div class="checklist" id="dashboardSpiritualChecklist"></div>
  `;

  const eveningCard = document.createElement("div");
  eveningCard.id = "dashboardEveningCard";
  eveningCard.className = "card span-12";
  eveningCard.innerHTML = `
    <div class="section-title">
      <h2>Evening Checklist</h2>
      <span class="tiny">daily closeout</span>
    </div>
    <div class="checklist" id="eveningList"></div>
  `;

  grid.innerHTML = "";
  grid.appendChild(morningCard);
  if (originalCaloriesCard) grid.appendChild(originalCaloriesCard);
  grid.appendChild(spiritualCard);
  if (originalNotesCard) grid.appendChild(originalNotesCard);
  grid.appendChild(eveningCard);

  elements.selectedDayLabel = document.getElementById("selectedDayLabel");
  elements.dayTabs = document.getElementById("dayTabs");
  elements.morningList = document.getElementById("morningList");
  elements.eveningList = document.getElementById("eveningList");
  elements.dashboardSpiritualChecklist = document.getElementById("dashboardSpiritualChecklist");

  if (originalCaloriesCard) configureDashboardCaloriesCard(originalCaloriesCard);
  if (originalNotesCard) {
    originalNotesCard.className = "card span-12";
    const title = originalNotesCard.querySelector("h2");
    const label = originalNotesCard.querySelector(".section-title .tiny");
    if (title) title.textContent = "Daily Notes";
    if (label) label.textContent = "below spiritual checklist · autosaves";
  }

  grid.dataset.focusLayout = "true";
  reorderDashboardFocusCards();
}

function configureDashboardCaloriesCard(card) {
  card.className = "card span-12";
  const title = card.querySelector(".section-title h2");
  const label = card.querySelector(".section-title .tiny");
  if (title) title.textContent = "Daily Calories";
  if (label) label.textContent = "simple daily budget";

  card.querySelectorAll(".calorie-grid, .button-row").forEach(node => node.style.display = "none");
  card.querySelectorAll("p.tiny").forEach(node => {
    if (node.textContent.includes("Actual calories")) node.style.display = "none";
  });
  card.querySelectorAll("hr").forEach(node => node.style.display = "none");

  const choreTitle = document.getElementById("choreScoreLabel")?.closest(".section-title");
  if (choreTitle) choreTitle.style.display = "none";
  if (elements.choreList) elements.choreList.style.display = "none";
}

function reorderDashboardFocusCards() {
  const grid = document.querySelector("#dashboard .dashboard-grid");
  const morningCard = document.getElementById("dashboardMorningCard");
  const eveningCard = document.getElementById("dashboardEveningCard");
  const spiritualCard = document.getElementById("dashboardSpiritualCard");
  const caloriesCard = elements.calorieActualInput?.closest(".card");
  const notesCard = elements.dailyNotes?.closest(".card");
  if (!grid || !morningCard || !eveningCard || !spiritualCard || !caloriesCard || !notesCard) return;

  const order = isEveningPriorityNow()
    ? [eveningCard, caloriesCard, spiritualCard, notesCard, morningCard]
    : [morningCard, caloriesCard, spiritualCard, notesCard, eveningCard];

  order.forEach(card => grid.appendChild(card));
}

function renderDayTabsInto(container) {
  container.innerHTML = "";
  const start = getStartOfWeek(dateFromKey(selectedDate));

  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = getTodayKey(d);

    const button = document.createElement("button");
    button.className = "day-tab" + (key === selectedDate ? " active" : "");
    button.textContent = dayNames[d.getDay()];
    button.addEventListener("click", () => setSelectedDate(key));
    container.appendChild(button);
  }
}

function renderChecklist(container, items, section) {
  container.innerHTML = "";
  const day = ensureDay(selectedDate);

  items.forEach(item => {
    const label = document.createElement("label");
    label.className = "check";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(day[section][item]);
    checkbox.addEventListener("change", () => {
      day[section][item] = checkbox.checked;
      saveState();
      renderStats();
      renderAnalytics();
    });

    const span = document.createElement("span");
    span.textContent = item;
    label.appendChild(checkbox);
    label.appendChild(span);
    container.appendChild(label);
  });
}

function renderWorkoutCompletion() {
  elements.workoutCompletionList.innerHTML = "";
  const week = ensureWeek(getWeekKey(dateFromKey(selectedDate)));

  week.workouts.forEach((workout, index) => {
    const row = document.createElement("div");
    row.className = "workout-row";
    const name = document.createElement("div");
    name.className = "workout-name";
    name.textContent = workout.name;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = workout.done;
    checkbox.addEventListener("change", () => {
      week.workouts[index].done = checkbox.checked;
      saveState();
      renderStats();
      renderAnalytics();
    });

    row.appendChild(name);
    row.appendChild(checkbox);
    elements.workoutCompletionList.appendChild(row);
  });
}

function renderWorkoutPlan() {
  elements.workoutPlanList.innerHTML = "";
  const plans = getWorkoutPlansForDate(selectedDate);
  const rotationLabel = getRotationLabelForDate(selectedDate);
  const week = ensureWeek(getWeekKey(dateFromKey(selectedDate)));
  const workoutIndexByName = Object.fromEntries(week.workouts.map((workout, index) => [workout.name, index]));

  elements.workoutRotationLabel.textContent = rotationLabel;
  elements.dashboardRotationLabel.textContent = `${rotationLabel} · goal: 8`;

  plans.forEach(plan => {
    const card = document.createElement("div");
    card.className = "card span-6 workout-card";

    const completionLabel = document.createElement("label");
    completionLabel.className = "check";
    completionLabel.style.marginBottom = "12px";
    const completionBox = document.createElement("input");
    completionBox.type = "checkbox";
    const workoutIndex = workoutIndexByName[plan.name];
    completionBox.checked = workoutIndex !== undefined ? Boolean(week.workouts[workoutIndex].done) : false;
    completionBox.addEventListener("change", () => {
      if (workoutIndex !== undefined) {
        week.workouts[workoutIndex].done = completionBox.checked;
        saveState();
        renderWorkoutCompletion();
        renderWorkoutPlan();
        renderStats();
        renderAnalytics();
      }
    });
    const completionText = document.createElement("span");
    completionText.textContent = completionBox.checked ? "Completed this week" : "Mark complete this week";
    completionLabel.appendChild(completionBox);
    completionLabel.appendChild(completionText);

    const title = document.createElement("h3");
    title.textContent = plan.name;
    const meta = document.createElement("div");
    meta.className = "workout-meta";

    [plan.type, plan.length, plan.focus].forEach(value => {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = value;
      meta.appendChild(tag);
    });

    const description = document.createElement("p");
    description.className = "workout-description";
    description.textContent = plan.description;
    card.appendChild(completionLabel);
    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(description);
    elements.workoutPlanList.appendChild(card);
  });
}

function renderCaloriesAndNotes() {
  const day = ensureDay(selectedDate);
  const energy = getDailyEnergySummary(selectedDate);
  const targetLabel = document.querySelector('label[for="calorieTarget"]');
  const saveTargetButton = document.getElementById("saveCalorieTarget");
  const caloriesCard = elements.calorieActualInput?.closest(".card");
  const caloriesSourceLabel = caloriesCard?.querySelector(".section-title .tiny");

  if (targetLabel) targetLabel.textContent = "Budget";
  if (caloriesSourceLabel) caloriesSourceLabel.textContent = energy.calibrationActive ? "calibrated" : "estimated";

  elements.calorieTargetInput.value = energy.target ? roundCalorieBudget(energy.target) : "";
  elements.calorieTargetInput.readOnly = true;
  elements.calorieTargetInput.setAttribute("aria-label", "Recommended daily calorie budget");
  elements.calorieTargetInput.title = "Automatically calculated from your body-composition estimate, rolling activity burn, and calibration when enough history is available.";

  if (saveTargetButton) saveTargetButton.style.display = "none";

  elements.calorieActualInput.value = getMealCalories(selectedDate);
  elements.dailyNotes.value = day.notes;
}

function renderChores() {
  const week = ensureWeek(getWeekKey(dateFromKey(selectedDate)));
  const containers = [elements.choreList, elements.choresTabList].filter(Boolean);

  containers.forEach(container => {
    container.innerHTML = "";

    week.chores.forEach((chore, index) => {
      const label = document.createElement("label");
      label.className = "check";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = Boolean(chore.done);
      checkbox.addEventListener("change", () => {
        week.chores[index].done = checkbox.checked;
        saveState();
        renderChores();
        renderStats();
        renderAnalytics();
      });

      const span = document.createElement("span");
      span.textContent = chore.name;
      label.appendChild(checkbox);
      label.appendChild(span);
      container.appendChild(label);
    });
  });
}

function renderSpiritual() {
  const day = ensureDay(selectedDate);
  elements.spiritualChecklist.innerHTML = "";

  spiritualItems.forEach(item => {
    const label = document.createElement("label");
    label.className = "check";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(day.spiritual[item]);
    checkbox.addEventListener("change", () => {
      day.spiritual[item] = checkbox.checked;
      saveState();
      renderAnalytics();
    });

    const span = document.createElement("span");
    span.textContent = item;
    label.appendChild(checkbox);
    label.appendChild(span);
    elements.spiritualChecklist.appendChild(label);
  });

  elements.spiritualNotes.value = day.spiritualNotes;
  renderTodayObservance();
}

function renderTodayObservance() {
  const rosary = getTraditionalRosarySet(selectedDate);
  elements.rosaryMysteryTitle.textContent = rosary.name;
  elements.rosaryMysteryNote.textContent = rosary.note;
  elements.rosaryMysteryList.innerHTML = rosaryMysteries[rosary.key].map(mystery => `<div class="mystery-item">${mystery}</div>`).join("");

  const selectedWeekStart = getStartOfWeek(dateFromKey(selectedDate));
  const programWeekStart = getStartOfWeek(dateFromKey(state.programStartWeekKey));
  const weeksElapsed = Math.max(0, Math.floor((selectedWeekStart - programWeekStart) / MS_PER_WEEK));
  const planIndex = Math.min(ntReadingPlan.length - 1, weeksElapsed);
  elements.scriptureWeekTitle.textContent = ntReadingPlan[planIndex][0];
  elements.scriptureWeekReading.textContent = ntReadingPlan[planIndex][1];
}

function getDashboardSpiritualItems(dateKey = selectedDate) {
  const rosary = getTraditionalRosarySet(dateKey);
  const selectedWeekStart = getStartOfWeek(dateFromKey(dateKey));
  const programWeekStart = getStartOfWeek(dateFromKey(state.programStartWeekKey));
  const weeksElapsed = Math.max(0, Math.floor((selectedWeekStart - programWeekStart) / MS_PER_WEEK));
  const planIndex = Math.min(ntReadingPlan.length - 1, weeksElapsed);

  return [
    { key: "Rosary or at least one decade", label: `Rosary — ${rosary.name}` },
    { key: "Scriptural reading", label: `Scripture — ${ntReadingPlan[planIndex][1]}` },
    { key: "Spiritual reading", label: "Spiritual reading" }
  ];
}

function renderDashboardSpiritualChecklist() {
  const container = document.getElementById("dashboardSpiritualChecklist");
  if (!container) return;

  const day = ensureDay(selectedDate);
  container.innerHTML = "";

  getDashboardSpiritualItems(selectedDate).forEach(item => {
    const label = document.createElement("label");
    label.className = "check";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(day.spiritual[item.key]);
    checkbox.addEventListener("change", () => {
      day.spiritual[item.key] = checkbox.checked;
      saveState();
      renderDashboardSpiritualChecklist();
      renderSpiritual();
      renderAnalytics();
    });

    const span = document.createElement("span");
    span.textContent = item.label;
    label.appendChild(checkbox);
    label.appendChild(span);
    container.appendChild(label);
  });
}

function summarizeRange(startKey, endKey) {
  let days = 0;
  let calories = 0, calorieDays = 0;
  let routine = 0, routineDays = 0;
  let spiritual = 0, spiritualDays = 0;
  let activeCalories = 0, activityDays = 0;
  let netCalories = 0, netDays = 0;
  let budgets = 0, budgetDays = 0;
  let protein = 0, proteinDays = 0;
  let carbs = 0, carbDays = 0;
  let fat = 0, fatDays = 0;
  let fiber = 0, fiberDays = 0;
  let loggedDays = 0;
  let d = dateFromKey(startKey);
  const end = dateFromKey(endKey);

  while (d <= end) {
    const key = getTodayKey(d);
    const day = ensureDay(key);
    const mealCalories = day.meals.reduce((sum, meal) => sum + (Number(meal.calories) || 0), 0);
    const morningChecklistItems = getMorningItemsForDate(key);
    const eveningChecklistItems = getEveningItemsForDate(key);
    const routineDone = morningChecklistItems.filter(item => day.morning[item]).length + eveningChecklistItems.filter(item => day.evening[item]).length;
    const routineTotal = morningChecklistItems.length + eveningChecklistItems.length;
    const spiritualDone = spiritualItems.filter(item => day.spiritual[item]).length;
    const hasMeals = day.meals.length > 0;
    const hasRoutineLog = routineDone > 0;
    const hasSpiritualLog = spiritualDone > 0;
    const activity = day.activity || {};
    const active = toPositiveNumber(activity.activeCalories);
    const effectiveBurn = getEffectiveCalorieBurn(key).burn;
    const hasActivity = hasActivityLog(activity);

    if (hasMeals) {
      calories += mealCalories;
      calorieDays++;

      const nutrition = getMealNutritionTotals(key);
      if (nutrition.hasProtein) {
        protein += nutrition.protein;
        proteinDays++;
      }
      if (nutrition.hasCarbs) {
        carbs += nutrition.carbs;
        carbDays++;
      }
      if (nutrition.hasFat) {
        fat += nutrition.fat;
        fatDays++;
      }
      if (nutrition.hasFiber) {
        fiber += nutrition.fiber;
        fiberDays++;
      }
    }

    if (hasRoutineLog) {
      routine += routineTotal ? Math.round((routineDone / routineTotal) * 100) : 0;
      routineDays++;
    }

    if (hasSpiritualLog) {
      spiritual += Math.round((spiritualDone / spiritualItems.length) * 100);
      spiritualDays++;
    }

    if (hasActivity && active) {
      activeCalories += active;
      activityDays++;
    }

    if (hasMeals || hasActivity) {
      netCalories += mealCalories - effectiveBurn;
      netDays++;
    }

    const budget = getSmartCalorieBudget(key).budget;
    if (budget) {
      budgets += budget;
      budgetDays++;
    }

    const hasMeasurements = day.measurements && Object.values(day.measurements).some(value => value !== undefined && value !== "");
    if (hasMeals || hasRoutineLog || hasSpiritualLog || hasActivity || hasMeasurements || day.notes || day.spiritualNotes) loggedDays++;
    days++;
    d.setDate(d.getDate() + 1);
  }

  return {
    days,
    loggedDays,
    avgCalories: calorieDays ? Math.round(calories / calorieDays) : 0,
    avgRoutine: routineDays ? Math.round(routine / routineDays) : 0,
    avgSpiritual: spiritualDays ? Math.round(spiritual / spiritualDays) : 0,
    avgActiveCalories: activityDays ? Math.round(activeCalories / activityDays) : 0,
    avgNetCalories: netDays ? Math.round(netCalories / netDays) : 0,
    avgBudget: budgetDays ? Math.round(budgets / budgetDays) : 0,
    avgProtein: proteinDays ? Math.round(protein / proteinDays) : 0,
    avgCarbs: carbDays ? Math.round(carbs / carbDays) : 0,
    avgFat: fatDays ? Math.round(fat / fatDays) : 0,
    avgFiber: fiberDays ? Math.round(fiber / fiberDays) : 0
  };
}

function renderAnalytics() {
  const selected = dateFromKey(selectedDate);
  const weekStart = getStartOfWeek(selected);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  const monthStart = new Date(selected.getFullYear(), selected.getMonth(), 1, 12);
  const monthEnd = new Date(selected.getFullYear(), selected.getMonth() + 1, 0, 12);
  const threeMonthStart = new Date(selected);
  threeMonthStart.setMonth(selected.getMonth() - 3);
  threeMonthStart.setDate(1);
  const yearStart = new Date(selected.getFullYear(), 0, 1, 12);
  const yearEnd = new Date(selected.getFullYear(), 11, 31, 12);

  const periods = [
    ["Week", summarizeRange(getTodayKey(weekStart), getTodayKey(weekEnd))],
    ["Month", summarizeRange(getTodayKey(monthStart), getTodayKey(monthEnd))],
    ["3 Months", summarizeRange(getTodayKey(threeMonthStart), selectedDate)],
    ["Year", summarizeRange(getTodayKey(yearStart), getTodayKey(yearEnd))]
  ];

  elements.periodAnalyticsGrid.innerHTML = periods.map(([name, s]) => `
    <div class="stat-card">
      <strong>${name}</strong>
      <span class="tiny">logged days: ${s.loggedDays}/${s.days}</span><br />
      <span class="tiny">avg cal: ${s.avgCalories}</span><br />
      <span class="tiny">routine: ${s.avgRoutine}%</span><br />
      <span class="tiny">spiritual: ${s.avgSpiritual}%</span><br />
      <span class="tiny">avg active: ${s.avgActiveCalories}</span><br />
      <span class="tiny">avg budget: ${s.avgBudget}</span><br />
      <span class="tiny">avg net: ${s.avgNetCalories}</span><br />
      <span class="tiny">avg protein: ${s.avgProtein}g</span><br />
      <span class="tiny">avg fiber: ${s.avgFiber}g</span>
    </div>
  `).join("");
}

function renderEnergySummary() {
  if (!elements.calorieActualInput) return;

  const caloriesCard = elements.calorieActualInput.closest(".card");
  if (!caloriesCard) return;

  let summary = document.getElementById("dailyEnergySummary");
  if (!summary) {
    summary = document.createElement("div");
    summary.id = "dailyEnergySummary";
    summary.style.marginTop = "14px";
    caloriesCard.appendChild(summary);
  }

  const energy = getDailyEnergySummary(selectedDate);
  const nutrition = getMealNutritionTotals(selectedDate);
  const netDisplay = Math.round(energy.netCalories);
  const remainingDisplay = energy.target ? Math.round(energy.burnAdjustedRemaining) : "—";
  const netStatus = !energy.target
    ? "Set a target to calculate status."
    : energy.netVsTarget <= 0
      ? `${Math.abs(Math.round(energy.netVsTarget))} under active budget`
      : `${Math.round(energy.netVsTarget)} over active budget`;

  summary.innerHTML = `
    <div class="stat-grid">
      <div class="stat-card">
        <strong>${Math.round(energy.intake)}</strong>
        <span class="tiny">calories logged</span>
      </div>
      <div class="stat-card">
        <strong>${energy.adjustedTarget ? roundCalorieBudget(energy.adjustedTarget) : "—"}</strong>
        <span class="tiny">total budget</span>
      </div>
      <div class="stat-card">
        <strong>${remainingDisplay}</strong>
        <span class="tiny">calories remaining</span>
      </div>
    </div>
    <p class="tiny" style="margin-top: 10px; opacity: 0.78;">Protein: ${formatGramTotal(nutrition.protein, nutrition.hasProtein)} · Fiber: ${formatGramTotal(nutrition.fiber, nutrition.hasFiber)}</p>
  `;
}


function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"]/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  }[char]));
}

function ensureMealNutritionFields() {
  const mealGrid = document.querySelector("#meals .meal-grid");
  const addButton = document.getElementById("addMeal");
  if (!mealGrid || !addButton || document.getElementById("mealNutritionFields")) return;

  const fields = document.createElement("div");
  fields.id = "mealNutritionFields";
  fields.className = "grid span-12";
  fields.style.marginTop = "10px";
  fields.innerHTML = `
    <label class="field span-6">
      <span class="tiny">Meal type</span>
      <select id="mealType" style="min-height: 44px; font-size: 1rem; padding: 10px 12px;">
        <option value="">Optional</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>
    </label>
    <label class="field span-6">
      <span class="tiny">Protein (g)</span>
      <input id="mealProtein" type="number" min="0" step="1" inputmode="decimal" placeholder="optional" style="min-height: 44px; font-size: 1rem; padding: 10px 12px;" />
    </label>
    <label class="field span-4">
      <span class="tiny">Carbs (g)</span>
      <input id="mealCarbs" type="number" min="0" step="1" inputmode="decimal" placeholder="optional" style="min-height: 44px; font-size: 1rem; padding: 10px 12px;" />
    </label>
    <label class="field span-4">
      <span class="tiny">Fat (g)</span>
      <input id="mealFat" type="number" min="0" step="1" inputmode="decimal" placeholder="optional" style="min-height: 44px; font-size: 1rem; padding: 10px 12px;" />
    </label>
    <label class="field span-4">
      <span class="tiny">Fiber (g)</span>
      <input id="mealFiber" type="number" min="0" step="1" inputmode="decimal" placeholder="optional" style="min-height: 44px; font-size: 1rem; padding: 10px 12px;" />
    </label>
    <label class="field span-12">
      <span class="tiny">Meal notes</span>
      <input id="mealNotes" type="text" placeholder="optional notes, ingredients, estimate source" autocomplete="off" style="min-height: 44px; font-size: 1rem; padding: 10px 12px;" />
    </label>
  `;

  mealGrid.insertBefore(fields, addButton);
}

function getOptionalMealNumber(id) {
  const raw = document.getElementById(id)?.value.trim();
  if (raw === undefined || raw === "") return "";
  const num = Number(raw);
  return Number.isFinite(num) && num >= 0 ? num : "";
}

function clearOptionalMealFields() {
  ["mealProtein", "mealCarbs", "mealFat", "mealFiber", "mealNotes"].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = "";
  });
  const type = document.getElementById("mealType");
  if (type) type.value = "";
}

function getMealMacroLine(meal) {
  const parts = [];
  if (meal.protein !== undefined && meal.protein !== "") parts.push(`${formatNumber(Number(meal.protein), 0)}g protein`);
  if (meal.carbs !== undefined && meal.carbs !== "") parts.push(`${formatNumber(Number(meal.carbs), 0)}g carbs`);
  if (meal.fat !== undefined && meal.fat !== "") parts.push(`${formatNumber(Number(meal.fat), 0)}g fat`);
  if (meal.fiber !== undefined && meal.fiber !== "") parts.push(`${formatNumber(Number(meal.fiber), 0)}g fiber`);
  return parts.join(" · ");
}

function renderMeals() {
  const day = ensureDay(selectedDate);
  elements.mealList.innerHTML = "";

  const nutrition = getMealNutritionTotals(selectedDate);
  const summary = document.createElement("div");
  summary.className = "stat-grid";
  summary.style.marginBottom = "14px";
  summary.innerHTML = `
    <div class="stat-card">
      <strong>${formatGramTotal(nutrition.protein, nutrition.hasProtein)}</strong>
      <span class="tiny">protein</span>
    </div>
    <div class="stat-card">
      <strong>${formatGramTotal(nutrition.carbs, nutrition.hasCarbs)}</strong>
      <span class="tiny">carbs</span>
    </div>
    <div class="stat-card">
      <strong>${formatGramTotal(nutrition.fat, nutrition.hasFat)}</strong>
      <span class="tiny">fat</span>
    </div>
    <div class="stat-card">
      <strong>${formatGramTotal(nutrition.fiber, nutrition.hasFiber)}</strong>
      <span class="tiny">fiber</span>
    </div>
  `;
  elements.mealList.appendChild(summary);

  if (day.meals.length === 0) {
    const empty = document.createElement("p");
    empty.className = "tiny";
    empty.textContent = "No meals or snacks logged yet.";
    elements.mealList.appendChild(empty);
  }

  day.meals.forEach((meal, index) => {
    const row = document.createElement("div");
    row.className = "meal-row";
    const name = document.createElement("div");
    name.className = "meal-name";
    const macroLine = getMealMacroLine(meal);
    const typeLabel = meal.type ? `<span class="tiny">${escapeHTML(meal.type)}</span><br />` : "";
    const notesLine = meal.notes ? `<br /><span class="tiny">${escapeHTML(meal.notes)}</span>` : "";
    name.innerHTML = `${typeLabel}<strong>${escapeHTML(meal.name)}</strong>${macroLine ? `<br /><span class="tiny">${escapeHTML(macroLine)}</span>` : ""}${notesLine}`;
    const calories = document.createElement("div");
    calories.className = "meal-calories";
    calories.textContent = `${Number(meal.calories) || 0} cal`;
    const remove = document.createElement("button");
    remove.className = "danger";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      day.meals.splice(index, 1);
      saveState();
      render();
    });

    row.appendChild(name);
    row.appendChild(calories);
    row.appendChild(remove);
    elements.mealList.appendChild(row);
  });

  const energy = getDailyEnergySummary(selectedDate);
  elements.mealTotal.textContent = energy.intake;
  elements.mealRemaining.textContent = energy.adjustedTarget ? Math.round(energy.burnAdjustedRemaining) : "—";
  elements.mealProgress.style.width = energy.adjustedTarget ? `${Math.min(100, (energy.intake / energy.adjustedTarget) * 100)}%` : "0%";
}

function renderStats() {
  const day = ensureDay(selectedDate);
  const week = ensureWeek(getWeekKey(dateFromKey(selectedDate)));
  const completedWorkouts = week.workouts.filter(w => w.done).length;
  if (elements.weeklyWorkoutCount) elements.weeklyWorkoutCount.textContent = completedWorkouts;
  if (elements.workoutProgress) elements.workoutProgress.style.width = `${Math.min(100, (completedWorkouts / 8) * 100)}%`;

  const completedChores = week.chores.filter(chore => chore.done).length;
  if (elements.choreScoreLabel) elements.choreScoreLabel.textContent = `${completedChores}/${weeklyChores.length}`;
  if (elements.choresTabScoreLabel) elements.choresTabScoreLabel.textContent = `${completedChores}/${weeklyChores.length} complete`;

  const morningChecklistItems = getMorningItemsForDate(selectedDate);
  const eveningChecklistItems = getEveningItemsForDate(selectedDate);
  const totalRoutineItems = morningChecklistItems.length + eveningChecklistItems.length;
  const completedMorning = morningChecklistItems.filter(item => day.morning[item]).length;
  const completedEvening = eveningChecklistItems.filter(item => day.evening[item]).length;
  const routinePercent = totalRoutineItems ? Math.round(((completedMorning + completedEvening) / totalRoutineItems) * 100) : 0;
  elements.routineScore.textContent = routinePercent;
  elements.routineProgress.style.width = `${routinePercent}%`;

  const energy = getDailyEnergySummary(selectedDate);
  elements.calorieActualInput.value = energy.intake;

  if (!energy.target) {
    elements.calorieStatus.textContent = "—";
    elements.calorieProgress.style.width = "0%";
  } else {
    const difference = Math.round(energy.netVsTarget);
    elements.calorieStatus.textContent = difference <= 0 ? `${Math.abs(difference)} under budget` : `${difference} over budget`;
    elements.calorieProgress.style.width = `${Math.min(100, (energy.intake / energy.adjustedTarget) * 100)}%`;
  }

  renderEnergySummary();
}

function render() {
  ensureDay(selectedDate);
  ensureWeek(getWeekKey(dateFromKey(selectedDate)));
  ensureDashboardFocusLayout();
  renderDateLabels();
  renderDayTabsInto(elements.dayTabs);
  renderDayTabsInto(elements.mealDayTabs);
  renderDayTabsInto(elements.spiritualDayTabs);
  renderChecklist(elements.morningList, getMorningItemsForDate(selectedDate), "morning");
  renderChecklist(elements.eveningList, getEveningItemsForDate(selectedDate), "evening");
  renderWorkoutCompletion();
  renderWorkoutPlan();
  renderCaloriesAndNotes();
  renderChores();
  renderSpiritual();
  renderDashboardSpiritualChecklist();
  ensureMealNutritionFields();
  renderMeals();
  renderStats();
  renderMeasurements();
  renderActivity();
  renderCalorieGoal();
  renderAnalytics();
  setActiveTab(state.activeTab || "dashboard");
}

function setupEventListeners() {
  document.querySelectorAll(".tab-button").forEach(button => button.addEventListener("click", () => setActiveTab(button.dataset.tab)));

  elements.todayLabel.addEventListener("click", event => {
    event.stopPropagation();
    const isOpen = elements.datePanel.classList.toggle("open");
    elements.todayLabel.setAttribute("aria-expanded", String(isOpen));
  });

  elements.datePanel.addEventListener("click", event => event.stopPropagation());

  document.addEventListener("click", () => {
    elements.datePanel.classList.remove("open");
    elements.todayLabel.setAttribute("aria-expanded", "false");
  });

  elements.datePicker.addEventListener("change", () => {
    if (elements.datePicker.value) setSelectedDate(elements.datePicker.value);
  });

  document.getElementById("goToToday").addEventListener("click", () => setSelectedDate(getTodayKey()));

  document.querySelectorAll("[data-jump]").forEach(button => {
    button.addEventListener("click", () => {
      setSelectedDate(addToDateKey(selectedDate, button.dataset.jump, Number(button.dataset.direction)));
    });
  });

  const saveCalorieTargetButton = document.getElementById("saveCalorieTarget");
  if (saveCalorieTargetButton) {
    saveCalorieTargetButton.style.display = "none";
  }

  document.getElementById("addMeal").addEventListener("click", () => {
    const name = elements.mealNameInput.value.trim();
    const calories = Number(elements.mealCaloriesInput.value);
    if (!name || !calories) return;

    const meal = {
      name,
      calories,
      type: document.getElementById("mealType")?.value || "",
      protein: getOptionalMealNumber("mealProtein"),
      carbs: getOptionalMealNumber("mealCarbs"),
      fat: getOptionalMealNumber("mealFat"),
      fiber: getOptionalMealNumber("mealFiber"),
      notes: document.getElementById("mealNotes")?.value.trim() || ""
    };

    ensureDay(selectedDate).meals.push(meal);
    elements.mealNameInput.value = "";
    elements.mealCaloriesInput.value = "";
    clearOptionalMealFields();
    saveState();
    render();
  });

  elements.mealCaloriesInput.addEventListener("keydown", event => {
    if (event.key === "Enter") document.getElementById("addMeal").click();
  });

  elements.mealNameInput.addEventListener("keydown", event => {
    if (event.key === "Enter") elements.mealCaloriesInput.focus();
  });

  elements.dailyNotes.addEventListener("input", () => {
    clearTimeout(notesSaveTimer);
    notesSaveTimer = setTimeout(() => {
      ensureDay(selectedDate).notes = elements.dailyNotes.value;
      saveState();
    }, 350);
  });

  elements.spiritualNotes.addEventListener("input", () => {
    clearTimeout(notesSaveTimer);
    notesSaveTimer = setTimeout(() => {
      ensureDay(selectedDate).spiritualNotes = elements.spiritualNotes.value;
      saveState();
    }, 350);
  });

  document.getElementById("resetWeek").addEventListener("click", () => {
    const confirmed = confirm("Reset this week's workouts and chores?");
    if (!confirmed) return;

    const weekKey = getWeekKey(dateFromKey(selectedDate));
    state.weeks[weekKey] = {
      rotationLabel: getRotationLabelForDate(selectedDate),
      workouts: getWorkoutPlansForDate(selectedDate).map(plan => ({ name: plan.name, done: false })),
      chores: weeklyChores.map(name => ({ name, done: false }))
    };

    saveState();
    render();
  });

  document.getElementById("exportData").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lock-in-tracker-data.json";
    link.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById("clearAll").addEventListener("click", () => {
    const firstConfirm = confirm("Clear all tracker data? This cannot be undone.");
    if (!firstConfirm) return;
    const secondConfirm = confirm("Are you absolutely sure? Export first if you want a backup.");
    if (!secondConfirm) return;

    localStorage.removeItem(STORAGE_KEY);
    OLD_STORAGE_KEYS.forEach(key => localStorage.removeItem(key));
    state = createDefaultState();
    selectedDate = getTodayKey();
    render();
  });
}

setupEventListeners();
render();
setInterval(checkDateRollover, 30 * 1000);

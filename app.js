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
    days: {},
    weeks: {}
  };
}

function migrateOldState(parsed) {
  const fresh = createDefaultState();
  const migrated = { ...fresh, ...parsed };
  if (!migrated.currentDayKey) migrated.currentDayKey = getTodayKey();
  if (!migrated.programStartWeekKey) migrated.programStartWeekKey = getWeekKey(dateFromKey(migrated.selectedDate || getTodayKey()));

  Object.keys(migrated.days || {}).forEach(dateKey => {
    const day = migrated.days[dateKey];
    if (!Array.isArray(day.meals)) day.meals = [];
    if (day.caloriesActual && day.meals.length === 0) day.meals.push({ name: "Manually entered calories", calories: Number(day.caloriesActual) || 0 });
    if (!day.spiritual) day.spiritual = {};
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
  if (!state.days[dateKey]) state.days[dateKey] = { morning: {}, evening: {}, meals: [], spiritual: {}, spiritualNotes: "", notes: "" };
  if (!Array.isArray(state.days[dateKey].meals)) state.days[dateKey].meals = [];
  if (!state.days[dateKey].spiritual) state.days[dateKey].spiritual = {};
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
  elements.datePanelSelectedLabel.textContent = formatted;
  elements.datePicker.value = selectedDate;
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

  elements.workoutRotationLabel.textContent = rotationLabel;
  elements.dashboardRotationLabel.textContent = `${rotationLabel} · goal: 8`;

  plans.forEach(plan => {
    const card = document.createElement("div");
    card.className = "card span-6 workout-card";
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
    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(description);
    elements.workoutPlanList.appendChild(card);
  });
}

function renderCaloriesAndNotes() {
  const day = ensureDay(selectedDate);
  elements.calorieTargetInput.value = state.calorieTarget;
  elements.calorieActualInput.value = getMealCalories(selectedDate);
  elements.dailyNotes.value = day.notes;
}

function renderChores() {
  elements.choreList.innerHTML = "";
  const week = ensureWeek(getWeekKey(dateFromKey(selectedDate)));

  week.chores.forEach((chore, index) => {
    const label = document.createElement("label");
    label.className = "check";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(chore.done);
    checkbox.addEventListener("change", () => {
      week.chores[index].done = checkbox.checked;
      saveState();
      renderStats();
      renderAnalytics();
    });

    const span = document.createElement("span");
    span.textContent = chore.name;
    label.appendChild(checkbox);
    label.appendChild(span);
    elements.choreList.appendChild(label);
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

function summarizeRange(startKey, endKey) {
  let days = 0, calories = 0, routine = 0, spiritual = 0, loggedDays = 0;
  let d = dateFromKey(startKey);
  const end = dateFromKey(endKey);

  while (d <= end) {
    const key = getTodayKey(d);
    const day = ensureDay(key);
    const mealCalories = getMealCalories(key);
    const routineDone = morningItems.filter(item => day.morning[item]).length + eveningItems.filter(item => day.evening[item]).length;
    const spiritualDone = spiritualItems.filter(item => day.spiritual[item]).length;

    calories += mealCalories;
    routine += Math.round((routineDone / (morningItems.length + eveningItems.length)) * 100);
    spiritual += Math.round((spiritualDone / spiritualItems.length) * 100);

    if (mealCalories || routineDone || spiritualDone || day.notes || day.spiritualNotes) loggedDays++;
    days++;
    d.setDate(d.getDate() + 1);
  }

  return {
    days,
    loggedDays,
    avgCalories: days ? Math.round(calories / days) : 0,
    avgRoutine: days ? Math.round(routine / days) : 0,
    avgSpiritual: days ? Math.round(spiritual / days) : 0
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
      <span class="tiny">spiritual: ${s.avgSpiritual}%</span>
    </div>
  `).join("");
}

function renderMeals() {
  const day = ensureDay(selectedDate);
  elements.mealList.innerHTML = "";

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
    name.textContent = meal.name;
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

  const total = getMealCalories(selectedDate);
  const target = Number(state.calorieTarget) || 0;
  const remaining = target - total;
  elements.mealTotal.textContent = total;
  elements.mealRemaining.textContent = target ? remaining : "—";
  elements.mealProgress.style.width = target ? `${Math.min(100, (total / target) * 100)}%` : "0%";
}

function renderStats() {
  const day = ensureDay(selectedDate);
  const week = ensureWeek(getWeekKey(dateFromKey(selectedDate)));
  const completedWorkouts = week.workouts.filter(w => w.done).length;
  elements.weeklyWorkoutCount.textContent = completedWorkouts;
  elements.workoutProgress.style.width = `${Math.min(100, (completedWorkouts / 8) * 100)}%`;

  const completedChores = week.chores.filter(chore => chore.done).length;
  elements.choreScoreLabel.textContent = `${completedChores}/${weeklyChores.length}`;

  const totalRoutineItems = morningItems.length + eveningItems.length;
  const completedMorning = morningItems.filter(item => day.morning[item]).length;
  const completedEvening = eveningItems.filter(item => day.evening[item]).length;
  const routinePercent = Math.round(((completedMorning + completedEvening) / totalRoutineItems) * 100);
  elements.routineScore.textContent = routinePercent;
  elements.routineProgress.style.width = `${routinePercent}%`;

  const actual = getMealCalories(selectedDate);
  const target = Number(state.calorieTarget);
  elements.calorieActualInput.value = actual;

  if (!target) {
    elements.calorieStatus.textContent = "—";
    elements.calorieProgress.style.width = "0%";
  } else {
    const difference = actual - target;
    elements.calorieStatus.textContent = difference <= 0 ? `${Math.abs(difference)} under` : `${difference} over`;
    elements.calorieProgress.style.width = `${Math.min(100, (actual / target) * 100)}%`;
  }
}

function render() {
  ensureDay(selectedDate);
  ensureWeek(getWeekKey(dateFromKey(selectedDate)));
  renderDateLabels();
  renderDayTabsInto(elements.dayTabs);
  renderDayTabsInto(elements.mealDayTabs);
  renderDayTabsInto(elements.spiritualDayTabs);
  renderChecklist(elements.morningList, morningItems, "morning");
  renderChecklist(elements.eveningList, eveningItems, "evening");
  renderWorkoutCompletion();
  renderWorkoutPlan();
  renderCaloriesAndNotes();
  renderChores();
  renderSpiritual();
  renderMeals();
  renderStats();
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

  document.getElementById("saveCalorieTarget").addEventListener("click", () => {
    state.calorieTarget = Number(elements.calorieTargetInput.value) || 2500;
    saveState();
    render();
  });

  document.getElementById("addMeal").addEventListener("click", () => {
    const name = elements.mealNameInput.value.trim();
    const calories = Number(elements.mealCaloriesInput.value);
    if (!name || !calories) return;

    ensureDay(selectedDate).meals.push({ name, calories });
    elements.mealNameInput.value = "";
    elements.mealCaloriesInput.value = "";
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

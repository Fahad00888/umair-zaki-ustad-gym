"use strict";
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const photo = name => `images/${name}.jpg`;
const store = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Convenience only. */ } },
};

/* ---------- Routing: each button opens a page, and the back button works ---------- */
const PAGES = ["home", "services", "pictures", "mentors", "videos", "diet", "contact"];
function route() {
  const name = location.hash.slice(1);
  const current = PAGES.includes(name) ? name : "home";
  PAGES.forEach(p => { $(`#page-${p}`).hidden = p !== current; });
  $$(".tabs a").forEach(a => {
    if (a.getAttribute("href") === `#${current}`) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  document.title = current === "home"
    ? "Umair Zaki Ustad | Gym & Fitness Coaching"
    : `${$(`#page-${current} .title`).textContent} | Umair Zaki Ustad`;
  scrollTo(0, 0);
}
addEventListener("hashchange", route);

/* ---------- Reusable filter buttons ---------- */
function chips(id, options, onChange, initial = options[0]) {
  const box = $(id);
  box.setAttribute("role", "group");
  const select = value => {
    $$(".chip", box).forEach(c => c.setAttribute("aria-pressed", String(c.dataset.value === value)));
    onChange(value);
  };
  box.replaceChildren(...options.map(option => {
    const [value, label] = Array.isArray(option) ? option : [option, option];
    const b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.dataset.value = value; b.textContent = label;
    b.addEventListener("click", () => select(value));
    return b;
  }));
  select(Array.isArray(initial) ? initial[0] : initial);
  return select;
}
const uniq = list => [...new Set(list)];

/* ---------- Pop-up details ---------- */
const modal = $("#modal");
function openModal(html) {
  $("#modal-body").innerHTML = html;
  modal.showModal();
  modal.scrollTop = 0;
}
$$("dialog").forEach(d => {
  $(".close", d).addEventListener("click", () => d.close());
  d.addEventListener("click", e => { if (e.target === d) d.close(); });
});
modal.addEventListener("click", e => {
  const book = e.target.closest("[data-book]");
  if (book) { modal.close(); bookFor(book.dataset.book, book.dataset.note || ""); }
});

/* ---------- Booking form ---------- */
const INTERESTS = ["Free trial session", ...SERVICES.map(s => s.name), ...PLANS.map(p => `${p.name} membership`), ...MENTORS.map(m => `Session with ${m.name}`)];
$("#interest").replaceChildren(...INTERESTS.map(text => new Option(text, text)));

function bookFor(interest, note = "") {
  $("#interest").value = INTERESTS.includes(interest) ? interest : INTERESTS[0];
  $("#message").value = note;
  $("#form-status").textContent = "";
  location.hash = "contact";
  setTimeout(() => $('#enquiry [name="name"]').focus({ preventScroll: true }), 50);
}

$("#enquiry").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.currentTarget, status = $("#form-status"), button = $("button", form);
  const say = (text, kind) => { status.textContent = text; status.className = `form-status ${kind}`; };
  const data = Object.fromEntries(new FormData(form));
  if (data.name.trim().length < 2) { form.name.focus(); return say("Please enter your name.", "err"); }
  if (!/^\+?[0-9][0-9 ()-]{6,18}$/.test(data.phone.trim())) { form.phone.focus(); return say("Please enter a valid phone number.", "err"); }
  if (data.email && !form.email.checkValidity()) { form.email.focus(); return say("Please enter a valid email address.", "err"); }
  // Hosted online there is no server to save requests, so they go by WhatsApp or email instead.
  const summary = `Booking request\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || "-"}\nInterested in: ${data.interest}\nBest time: ${data.time}\nMessage: ${data.message || "-"}`;
  if (whatsapp) {
    open(`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(summary)}`, "_blank", "noopener");
    return say("WhatsApp has opened with your request. Press send to finish.", "ok");
  }
  if (email) {
    location.href = `mailto:${email}?subject=${encodeURIComponent("Booking request")}&body=${encodeURIComponent(summary)}`;
    return say("Your email app has opened with your request. Press send to finish.", "ok");
  }
  button.disabled = true;
  say("Sending your request...", "");
  try {
    const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const reply = await res.json();
    if (!res.ok) throw new Error(reply.error);
    form.reset();
    say("Thank you. Your request has been received and the gym will contact you soon.", "ok");
  } catch (err) {
    say(err.message && !err.message.includes("fetch") ? err.message : "Your request could not be sent. Please try again.", "err");
  } finally {
    button.disabled = false;
  }
});

const { phone, whatsapp, email, address, hours } = SITE.contact;
$("#contact-list").innerHTML = [
  phone && `<li><b>Phone</b><a href="tel:${phone}">${phone}</a></li>`,
  whatsapp && `<li><b>WhatsApp</b><a href="https://wa.me/${whatsapp.replace(/\D/g, "")}" target="_blank" rel="noopener">${whatsapp}</a></li>`,
  email && `<li><b>Email</b><a href="mailto:${email}">${email}</a></li>`,
  address && `<li><b>Address</b>${address}</li>`,
  hours && `<li><b>Opening hours</b>${hours}</li>`,
].filter(Boolean).join("");

// Without WhatsApp, email or the local server, a request would have nowhere to go, so hide the form.
const hasLocalServer = ["localhost", "127.0.0.1"].includes(location.hostname);
if (!whatsapp && !email && !hasLocalServer) {
  $("#enquiry").hidden = true;
  $("#contact-intro").textContent = "Online booking is opening soon. Please speak to the gym directly to book your session.";
}

/* ---------- Home ---------- */
$("#home-tiles").innerHTML = [
  ["services", "Our Services", "trainer-plan"], ["pictures", "Gym Pictures", "machines-row"],
  ["mentors", "Our Mentors", "trainer-tablet"], ["videos", "Gym Videos", "barbell-lift"], ["diet", "Diet Plans", "food-bowl"],
].map(([href, label, img]) => `<a class="tile" href="#${href}"><img src="${photo(img)}" alt="" loading="lazy"><b>${label}</b></a>`).join("");
$("#faq").innerHTML = FAQ.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("");

/* ---------- Services ---------- */
chips("#service-filter", ["All", ...uniq(SERVICES.map(s => s.goal))], goal => {
  $("#service-list").innerHTML = SERVICES.map((s, i) => [s, i]).filter(([s]) => goal === "All" || s.goal === goal).map(([s, i]) => `
    <button type="button" class="card pick" data-service="${i}">
      <img src="${photo(s.img)}" alt="" loading="lazy">
      <span class="pick-body"><h3>${s.name}</h3><p>${s.short}</p><span class="more">View details</span></span>
    </button>`).join("");
});
$("#service-list").addEventListener("click", e => {
  const card = e.target.closest("[data-service]");
  if (!card) return;
  const s = SERVICES[card.dataset.service];
  openModal(`<img class="modal-img" src="${photo(s.img)}" alt="">
    <div class="modal-body"><h2>${s.name}</h2><p>${s.short}</p>
      <h3>Who it is for</h3><p>${s.forWho}</p>
      <h3>What is included</h3><ul>${s.includes.map(x => `<li>${x}</li>`).join("")}</ul>
      <button type="button" class="btn" data-book="${s.name}">Book this service</button></div>`);
});

const DAYS = Object.keys(TIMETABLE);
const today = DAYS[(new Date().getDay() + 6) % 7];
chips("#day-filter", DAYS, day => {
  const rows = TIMETABLE[day];
  $("#timetable").innerHTML = rows.length
    ? rows.map(([time, name, who]) => `<tr><td>${time}</td><td>${name}</td><td>${who}</td>
        <td><button type="button" class="btn ghost small" data-class="${name}" data-when="${day} ${time}">Book</button></td></tr>`).join("")
    : `<tr><td colspan="4" class="empty-msg">No classes on this day.</td></tr>`;
}, today);
$("#timetable").addEventListener("click", e => {
  const b = e.target.closest("[data-class]");
  if (b) bookFor("Group Classes", `I would like to join ${b.dataset.class} on ${b.dataset.when}.`);
});

$("#plans").innerHTML = PLANS.map(p => `
  <article class="card ${p.featured ? "featured" : ""}">
    <h3>${p.name}</h3>
    <p class="price">${p.price || "Ask for price"}</p>
    <ul>${p.features.map(f => `<li>${f}</li>`).join("")}</ul>
    <button type="button" class="btn ${p.featured ? "" : "ghost"}" data-plan="${p.name} membership">Choose plan</button>
  </article>`).join("");
$("#plans").addEventListener("click", e => {
  const b = e.target.closest("[data-plan]");
  if (b) bookFor(b.dataset.plan);
});

/* ---------- Pictures ---------- */
let shown = PICTURES, lbIndex = 0;
const lightbox = $("#lightbox");
chips("#picture-filter", ["All", ...uniq(PICTURES.map(p => p.cat))], cat => {
  shown = PICTURES.filter(p => cat === "All" || p.cat === cat);
  $("#picture-list").innerHTML = shown.map((p, i) => `
    <button type="button" class="shot" data-i="${i}" aria-label="View picture: ${p.caption}">
      <img src="${photo(p.img)}" alt="${p.caption}" loading="lazy"><span>${p.caption}</span>
    </button>`).join("");
});
function showPicture(i) {
  lbIndex = (i + shown.length) % shown.length;
  const p = shown[lbIndex];
  $("#lb-img").src = photo(p.img);
  $("#lb-img").alt = p.caption;
  $("#lb-cap").textContent = `${p.caption} (${lbIndex + 1} of ${shown.length})`;
}
$("#picture-list").addEventListener("click", e => {
  const b = e.target.closest(".shot");
  if (b) { showPicture(+b.dataset.i); lightbox.showModal(); }
});
$(".prev", lightbox).addEventListener("click", () => showPicture(lbIndex - 1));
$(".next", lightbox).addEventListener("click", () => showPicture(lbIndex + 1));
lightbox.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") showPicture(lbIndex - 1);
  if (e.key === "ArrowRight") showPicture(lbIndex + 1);
});
let touchX = null;
lightbox.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener("touchend", e => {
  if (touchX === null) return;
  const moved = e.changedTouches[0].clientX - touchX;
  if (Math.abs(moved) > 50) showPicture(lbIndex + (moved < 0 ? 1 : -1));
  touchX = null;
});

/* ---------- Mentors ---------- */
chips("#mentor-filter", ["All", ...uniq(MENTORS.flatMap(m => m.tags))], tag => {
  $("#mentor-list").innerHTML = MENTORS.map((m, i) => [m, i]).filter(([m]) => tag === "All" || m.tags.includes(tag)).map(([m, i]) => `
    <button type="button" class="card pick" data-mentor="${i}">
      <img src="${photo(m.img)}" alt="" loading="lazy">
      <span class="pick-body">
        ${SITE.showSampleNotes ? `<span class="badge">Sample profile</span>` : ""}
        <h3>${m.name}</h3><p class="role">${m.role}</p><p>${m.bio}</p><span class="more">View profile</span>
      </span>
    </button>`).join("");
});
$("#mentor-list").addEventListener("click", e => {
  const card = e.target.closest("[data-mentor]");
  if (!card) return;
  const m = MENTORS[card.dataset.mentor];
  openModal(`<img class="modal-img person" src="${photo(m.img)}" alt="">
    <div class="modal-body"><h2>${m.name}</h2><p class="role">${m.role}</p><p>${m.bio}</p>
      <h3>Specialties</h3><ul>${m.skills.map(x => `<li>${x}</li>`).join("")}</ul>
      <h3>Coaching style</h3><p>${m.style}</p>
      <button type="button" class="btn" data-book="Session with ${m.name}">Book a session</button></div>`);
});

/* ---------- Videos ---------- */
let currentVideo = VIDEOS[0], videoCat = "All";
function loadVideo(video, autoplay) {
  currentVideo = video;
  $("#now-title").textContent = video.title;
  $("#now-meta").innerHTML = `By ${video.by} &middot; <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener">Watch on YouTube</a>`;
  const player = $("#player");
  if (autoplay) {
    const frame = document.createElement("iframe");
    frame.src = `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`;
    frame.title = video.title;
    frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    frame.allowFullscreen = true;
    player.replaceChildren(frame);
  } else {
    // YouTube only loads once the visitor presses play.
    player.innerHTML = `<button type="button" class="poster" aria-label="Play ${video.title}">
      <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt=""><i aria-hidden="true">&#9654;</i></button>`;
    $(".poster", player).addEventListener("click", () => loadVideo(video, true));
  }
  renderPlaylist();
}
function renderPlaylist() {
  const q = $("#video-search").value.trim().toLowerCase();
  const list = VIDEOS.filter(v => (videoCat === "All" || v.cat === videoCat) && `${v.title} ${v.by} ${v.cat}`.toLowerCase().includes(q));
  $("#playlist").innerHTML = list.length ? list.map(v => `
    <li><button type="button" data-video="${v.id}" aria-current="${v === currentVideo}">
      <img src="https://i.ytimg.com/vi/${v.id}/mqdefault.jpg" alt="" loading="lazy">
      <span>${v.title}<small>${v.by}</small></span>
    </button></li>`).join("") : `<li class="empty-msg">No videos match your search.</li>`;
}
$("#playlist").addEventListener("click", e => {
  const b = e.target.closest("[data-video]");
  if (b) loadVideo(VIDEOS.find(v => v.id === b.dataset.video), true);
});
$("#video-search").addEventListener("input", renderPlaylist);
loadVideo(currentVideo, false);
chips("#video-filter", ["All", ...uniq(VIDEOS.map(v => v.cat))], cat => { videoCat = cat; renderPlaylist(); });
// Stop playback when leaving the Videos page.
addEventListener("hashchange", () => { if (location.hash !== "#videos" && $("#player iframe")) loadVideo(currentVideo, false); });

/* ---------- Diet ---------- */
const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = ["Breakfast", "Lunch", "Snack", "Dinner"];
const SLOT_PHOTOS = { Breakfast: "food-egg", Lunch: "food-rice", Snack: "food-fruit", Dinner: "food-salad" };
const diet = { plan: "fat", day: WEEK[(new Date().getDay() + 6) % 7], veg: false };

// Rotates through each meal's options so the seven days differ from one another.
function mealsForDay(planKey, dayIndex, veg) {
  return SLOTS.map((slot, s) => {
    const options = DIET_PLANS[planKey].meals[slot].filter(m => !veg || m[3]);
    return { slot, meal: options[(dayIndex + s) % options.length] };
  });
}
function weekOf(planKey, veg) { return WEEK.map((_, i) => mealsForDay(planKey, i, veg)); }
const dayKcal = day => day.reduce((t, x) => t + x.meal[1], 0);
const round = (n, to = 10) => Math.round(n / to) * to;

function renderDiet() {
  const week = weekOf(diet.plan, diet.veg);
  const avg = week.reduce((t, d) => t + dayKcal(d), 0) / 7;
  const name = DIET_PLANS[diet.plan].name;
  $("#plan-summary").textContent = `${name}${diet.veg ? " (vegetarian)" : ""}: about ${round(avg, 50).toLocaleString()} kcal a day on average.`;
  $("#print-heading").textContent = `Umair Zaki Ustad: ${name} plan, ${diet.day}`;
  const today = week[WEEK.indexOf(diet.day)];
  $("#meals").innerHTML = today.map(({ slot, meal }) => `
    <article class="card meal"><img src="${photo(SLOT_PHOTOS[slot])}" alt="" loading="lazy"><h3>${slot}</h3><p>${meal[0]}</p><small>About ${meal[1]} kcal, ${meal[2]} g protein</small></article>`).join("");
  const protein = today.reduce((t, x) => t + x.meal[2], 0);
  $("#day-total").textContent = `${diet.day} total: about ${dayKcal(today).toLocaleString()} kcal and ${protein} g protein.`;
  renderGrocery(week);
}
function renderGrocery(week) {
  const items = uniq(week.flat().flatMap(x => x.meal[4].split(", "))).sort();
  const ticked = store.get("grocery", []);
  $("#grocery").innerHTML = items.map(item => `
    <li><label class="check"><input type="checkbox" data-item="${item}" ${ticked.includes(item) ? "checked" : ""}><span>${item}</span></label></li>`).join("");
}
$("#grocery").addEventListener("change", e => {
  const ticked = new Set(store.get("grocery", []));
  if (e.target.checked) ticked.add(e.target.dataset.item); else ticked.delete(e.target.dataset.item);
  store.set("grocery", [...ticked]);
});

const selectPlan = chips("#plan-filter", Object.entries(DIET_PLANS).map(([k, p]) => [k, p.name]), plan => { diet.plan = plan; renderDiet(); }, "fat");
chips("#diet-day-filter", WEEK, day => { diet.day = day; renderDiet(); }, diet.day);
$("#veg-only").addEventListener("change", e => { diet.veg = e.target.checked; renderDiet(); });
$("#print-plan").addEventListener("click", () => print());

function bmiLabel(bmi) {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "a healthy weight";
  if (bmi < 30) return "overweight";
  return "obese";
}
const CM_PER_INCH = 2.54;
// Switching units shows the matching boxes and carries the current height across.
$("#height-unit").addEventListener("change", e => {
  const form = e.target.form, unit = e.target.value;
  if (unit === "cm") {
    form.height.value = Math.round((Number(form.feet.value) * 12 + Number(form.inches.value)) * CM_PER_INCH);
  } else {
    const totalInches = Math.round(Number(form.height.value) / CM_PER_INCH);
    form.feet.value = Math.floor(totalInches / 12);
    form.inches.value = totalInches % 12;
  }
  $$("[data-height]", form).forEach(label => {
    const active = label.dataset.height === unit;
    label.hidden = !active;
    $("input", label).disabled = !active;
  });
});
function calculate(form) {
  const f = Object.fromEntries(new FormData(form));
  const [age, weight, activity] = [f.age, f.weight, f.activity].map(Number);
  const height = f.unit === "ft" ? (Number(f.feet) * 12 + Number(f.inches)) * CM_PER_INCH : Number(f.height);
  const bmi = weight / (height / 100) ** 2;
  const bmr = 10 * weight + 6.25 * height - 5 * age + (f.sex === "m" ? 5 : -161);
  const maintain = bmr * activity;
  const floor = f.sex === "m" ? 1500 : 1200; // Keeps the target from falling too low.
  const target = Math.max(floor, f.goal === "fat" ? maintain - 500 : f.goal === "muscle" ? maintain + 300 : maintain);
  const [low, high] = f.goal === "balanced" ? [1.4, 1.6] : [1.6, 2.0];
  const fat = target * 0.25 / 9;
  const midProtein = weight * (low + high) / 2;
  const carbs = Math.max(0, (target - fat * 9 - midProtein * 4) / 4);
  $("#calc-result").innerHTML = `
    <h2>Your daily targets</h2>
    <div class="stats">
      <div class="stat"><b>${round(target, 50).toLocaleString()}</b><span>kcal a day</span></div>
      <div class="stat"><b>${round(weight * low, 5)}-${round(weight * high, 5)} g</b><span>protein</span></div>
      <div class="stat"><b>${round(carbs, 5)} g</b><span>carbohydrates</span></div>
      <div class="stat"><b>${round(fat, 5)} g</b><span>fat</span></div>
    </div>
    <p>Your BMI is ${bmi.toFixed(1)}, which is classed as ${bmiLabel(bmi)}. BMI does not separate muscle from fat, so use it as a rough guide. Your maintenance level is about ${round(maintain, 50).toLocaleString()} kcal a day.</p>
    <p>We suggest the <b>${DIET_PLANS[f.goal].name}</b> plan below. Adjust portions to get close to your calorie target. Some days are lower in protein, so add eggs, chicken, fish, yogurt or paneer to reach your protein target.</p>
    <a class="btn ghost small" href="#diet" id="see-plan">See my plan</a>`;
  selectPlan(f.goal);
  $("#see-plan").addEventListener("click", e => { e.preventDefault(); $("#diet-plan").scrollIntoView(); });
}
$("#calc-form").addEventListener("submit", e => { e.preventDefault(); calculate(e.currentTarget); });
calculate($("#calc-form"));

/* ---------- Footer and sample labels ---------- */
$("#year").textContent = new Date().getFullYear();
$$("[data-sample]").forEach(el => { el.hidden = !SITE.showSampleNotes; });
$("#open-credits").addEventListener("click", () => {
  openModal(`<div class="modal-body"><h2>Photo credits</h2><p>Photos from <a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash</a>, by:</p>
    <ul>${PHOTO_CREDITS.map(n => `<li>${n}</li>`).join("")}</ul>
    <p>Videos are hosted on YouTube and belong to the channels named beside them.</p></div>`);
});

route();

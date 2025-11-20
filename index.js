alert("Assalomu alaykum ");

let tasks = [];

const el = (s) => document.querySelector(s);
const title = el("#title");
const desc = el(".desc");
const priority = el(".priority");
const category = el(".category");
const addBtn = el(".addBtn");
const removeLast = el(".removeLast");
const taskList = el(".taskList");
const count = el("#count");

const shortText = (t) => t.slice(0, 20) + (t.length > 20 ? "..." : "");
const flatCats = ["work", "home", ["urgent", "study"]].flat();
console.log("Recommended categories:", flatCats.join(" - "));

function render(list = tasks) {
    taskList.innerHTML = "";
    count.textContent = tasks.length;

    list.forEach(t => {
        const card = document.createElement("div");

        let color = "";
        switch (t.priority) {
            case "high": color = "red"; break;
            case "medium": color = "yellow"; break;
            case "low": color = "lightgreen"; break;
        }

        card.innerHTML = `
            <h3>${t.title}</h3>
            <p>${shortText(t.description)}</p>
            <p>Category: ${t.category}</p>
            <span style="background:${color}">${t.priority}</span>
            <p>Status: ${t.completed ? "Done" : "In progress"}</p>

            <button onclick="completeTask(${t.id})">Complete</button>
            <button onclick="deleteTask(${t.id})">Delete</button>
            <button onclick="editTask(${t.id})">Edit</button>
        `;

        taskList.appendChild(card);
    });
}

function addTask() {
    const t = title.value.trim();
    const d = desc.value.trim().toLowerCase();
    const p = priority.value;
    const c = category.value.trim();

    if (!t || !d) return alert("Input larni to'ldiring");

    tasks.push({
        id: Date.now(),
        title: t.charAt(0).toUpperCase() + t.slice(1),
        description: d,
        priority: p,
        category: c,
        completed: false
    });

    render();
    title.value = desc.value = category.value = "";
}

addBtn.addEventListener("click", addTask);

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    render();
}

function completeTask(id) {
    tasks = tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
    );
    render();
}

function editTask(id) {
    const t = tasks.find(x => x.id === id);
    t.title = prompt("New title:", t.title).trim();
    t.description = prompt("New description:", t.description).trim();
    render();
}

document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", () => {
        const f = btn.dataset.filter;

        if (f === "all") return render();
        if (f === "completed") return render(tasks.filter(t => t.completed));
        render(tasks.filter(t => t.priority === f));
    });
});

removeLast.addEventListener("click", () => {
    tasks.pop();
    render();
});

console.log("Words:", "hello world from task".split(" ").length);
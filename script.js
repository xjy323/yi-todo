let tasks = [];

// 添加任务
function addTask() {
    const text = document.getElementById("taskInput").value;
    const priority = document.getElementById("priority").value;
    const deadline = document.getElementById("deadline").value;

    if (!text) {
        alert("请输入任务！");
        return;
    }

    tasks.push({
        text,
        priority: Number(priority),
        deadline,
        completed: false
    });

    update();

    document.getElementById("taskInput").value = "";
}

// 排序逻辑（重点）
function sortTasks() {
    tasks.sort((a, b) => {

        // ① 优先级排序（1高 → 3低）
        if (a.priority !== b.priority) {
            return a.priority - b.priority;
        }

        // ② DDL排序（越早越前）
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;

        return new Date(a.deadline) - new Date(b.deadline);
    });
}

// 渲染列表
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        // 完成状态
        if (task.completed) {
            li.classList.add("completed");
        }

        // 优先级颜色
        if (task.priority === 1) {
            li.classList.add("high");
        } else if (task.priority === 2) {
            li.classList.add("medium");
        } else {
            li.classList.add("low");
        }

        li.innerHTML = `
            <div>
                <strong>${task.text}</strong><br>
                优先级: ${getPriorityText(task.priority)} |
                截止: ${task.deadline || "无"}
            </div>

            <div>
                <button onclick="toggleComplete(${index})">✔</button>
                <button onclick="deleteTask(${index})">🗑</button>
            </div>
        `;

        list.appendChild(li);
    });
}

// 优先级文字
function getPriorityText(p) {
    if (p === 1) return "高";
    if (p === 2) return "中";
    return "低";
}

// 完成任务
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    update();
}

// 删除任务
function deleteTask(index) {
    tasks.splice(index, 1);
    update();
}

// 统一更新（关键）
function update() {
    sortTasks();
    renderTasks();
}
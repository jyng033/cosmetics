const STORAGE_KEYS = {
  members: "benatural-admin-members",
  orders: "benatural-admin-orders"
};

function formatDate(date) {
  return new Date(date).toLocaleDateString("ko-KR");
}

function formatNumber(num) {
  return Number(num).toLocaleString("ko-KR");
}

function readStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("스토리지 파싱 오류:", error);
    return [];
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function createSeedData() {
  const members = [
    {
      id: crypto.randomUUID(),
      name: "김서연",
      email: "seoyeon@example.com",
      grade: "VIP",
      status: "ACTIVE",
      joinedAt: "2026-01-10"
    },
    {
      id: crypto.randomUUID(),
      name: "이현우",
      email: "hyunwoo@example.com",
      grade: "BASIC",
      status: "DORMANT",
      joinedAt: "2026-02-01"
    }
  ];

  const orders = [
    {
      id: crypto.randomUUID(),
      orderNo: "ORD-20260304-001",
      memberEmail: "seoyeon@example.com",
      amount: 62000,
      status: "PAID",
      orderedAt: "2026-03-04"
    },
    {
      id: crypto.randomUUID(),
      orderNo: "ORD-20260304-002",
      memberEmail: "hyunwoo@example.com",
      amount: 19000,
      status: "PENDING",
      orderedAt: "2026-03-04"
    }
  ];

  writeStorage(STORAGE_KEYS.members, members);
  writeStorage(STORAGE_KEYS.orders, orders);
}

function ensureData() {
  const members = readStorage(STORAGE_KEYS.members);
  const orders = readStorage(STORAGE_KEYS.orders);
  if (!members.length && !orders.length) {
    createSeedData();
  }
}

function getState() {
  return {
    members: readStorage(STORAGE_KEYS.members),
    orders: readStorage(STORAGE_KEYS.orders)
  };
}

function renderCards(state) {
  const totalRevenue = state.orders
    .filter((order) => order.status !== "CANCELLED")
    .reduce((sum, order) => sum + Number(order.amount), 0);

  document.getElementById("totalMembers").textContent = formatNumber(state.members.length);
  document.getElementById("totalOrders").textContent = formatNumber(state.orders.length);
  document.getElementById("pendingOrders").textContent = formatNumber(
    state.orders.filter((order) => order.status === "PENDING").length
  );
  document.getElementById("totalRevenue").textContent = `${formatNumber(totalRevenue)}원`;
}

function renderMembers(state) {
  const tbody = document.getElementById("memberTableBody");
  const keyword = document.getElementById("memberSearchInput").value.trim().toLowerCase();
  const filtered = state.members.filter((member) => {
    if (!keyword) return true;
    return member.name.toLowerCase().includes(keyword) || member.email.toLowerCase().includes(keyword);
  });

  tbody.innerHTML = filtered
    .map(
      (member) => `
        <tr>
          <td>${member.name}</td>
          <td>${member.email}</td>
          <td>${member.grade}</td>
          <td><span class="status-badge">${member.status}</span></td>
          <td>${formatDate(member.joinedAt)}</td>
          <td>
            <button data-delete-member="${member.id}" class="danger">삭제</button>
          </td>
        </tr>
      `
    )
    .join("");
}

function renderOrders(state) {
  const tbody = document.getElementById("orderTableBody");
  const keyword = document.getElementById("orderSearchInput").value.trim().toLowerCase();
  const filtered = state.orders.filter((order) => {
    if (!keyword) return true;
    return (
      order.orderNo.toLowerCase().includes(keyword) ||
      order.memberEmail.toLowerCase().includes(keyword)
    );
  });

  tbody.innerHTML = filtered
    .map(
      (order) => `
        <tr>
          <td>${order.orderNo}</td>
          <td>${order.memberEmail}</td>
          <td>${formatNumber(order.amount)}원</td>
          <td>
            <select data-order-status="${order.id}">
              <option value="PENDING" ${order.status === "PENDING" ? "selected" : ""}>PENDING</option>
              <option value="PAID" ${order.status === "PAID" ? "selected" : ""}>PAID</option>
              <option value="SHIPPING" ${order.status === "SHIPPING" ? "selected" : ""}>SHIPPING</option>
              <option value="DONE" ${order.status === "DONE" ? "selected" : ""}>DONE</option>
              <option value="CANCELLED" ${order.status === "CANCELLED" ? "selected" : ""}>CANCELLED</option>
            </select>
          </td>
          <td>${formatDate(order.orderedAt)}</td>
          <td>
            <button data-delete-order="${order.id}" class="danger">삭제</button>
          </td>
        </tr>
      `
    )
    .join("");
}

function renderAll() {
  const state = getState();
  renderCards(state);
  renderMembers(state);
  renderOrders(state);
}

function bindMemberForm() {
  const form = document.getElementById("memberForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const newMember = {
      id: crypto.randomUUID(),
      name: String(formData.get("name")).trim(),
      email: String(formData.get("email")).trim().toLowerCase(),
      grade: String(formData.get("grade")),
      status: String(formData.get("status")),
      joinedAt: new Date().toISOString()
    };

    const members = readStorage(STORAGE_KEYS.members);
    const exists = members.some((member) => member.email === newMember.email);
    if (exists) {
      alert("이미 등록된 이메일입니다.");
      return;
    }

    members.unshift(newMember);
    writeStorage(STORAGE_KEYS.members, members);
    form.reset();
    renderAll();
  });
}

function bindOrderForm() {
  const form = document.getElementById("orderForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const newOrder = {
      id: crypto.randomUUID(),
      orderNo: String(formData.get("orderNo")).trim().toUpperCase(),
      memberEmail: String(formData.get("memberEmail")).trim().toLowerCase(),
      amount: Number(formData.get("amount")),
      status: String(formData.get("status")),
      orderedAt: new Date().toISOString()
    };

    const orders = readStorage(STORAGE_KEYS.orders);
    const exists = orders.some((order) => order.orderNo === newOrder.orderNo);
    if (exists) {
      alert("이미 존재하는 주문번호입니다.");
      return;
    }

    orders.unshift(newOrder);
    writeStorage(STORAGE_KEYS.orders, orders);
    form.reset();
    renderAll();
  });
}

function bindTableActions() {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const memberId = target.getAttribute("data-delete-member");
    if (memberId) {
      const members = readStorage(STORAGE_KEYS.members).filter((member) => member.id !== memberId);
      writeStorage(STORAGE_KEYS.members, members);
      renderAll();
      return;
    }

    const orderId = target.getAttribute("data-delete-order");
    if (orderId) {
      const orders = readStorage(STORAGE_KEYS.orders).filter((order) => order.id !== orderId);
      writeStorage(STORAGE_KEYS.orders, orders);
      renderAll();
    }
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) return;

    const orderId = target.getAttribute("data-order-status");
    if (!orderId) return;

    const orders = readStorage(STORAGE_KEYS.orders).map((order) => {
      if (order.id === orderId) {
        return { ...order, status: target.value };
      }
      return order;
    });

    writeStorage(STORAGE_KEYS.orders, orders);
    renderAll();
  });
}

function bindSearch() {
  document.getElementById("memberSearchInput").addEventListener("input", renderAll);
  document.getElementById("orderSearchInput").addEventListener("input", renderAll);
}

function bindDataTools() {
  document.getElementById("seedDataBtn").addEventListener("click", () => {
    if (!confirm("현재 데이터를 샘플 데이터로 덮어쓸까요?")) return;
    createSeedData();
    renderAll();
  });

  document.getElementById("backupBtn").addEventListener("click", () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      members: readStorage(STORAGE_KEYS.members),
      orders: readStorage(STORAGE_KEYS.orders)
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `benatural-admin-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById("restoreInput").addEventListener("change", async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || !target.files || !target.files[0]) return;

    try {
      const content = await target.files[0].text();
      const parsed = JSON.parse(content);
      if (!Array.isArray(parsed.members) || !Array.isArray(parsed.orders)) {
        throw new Error("잘못된 백업 파일 형식");
      }

      writeStorage(STORAGE_KEYS.members, parsed.members);
      writeStorage(STORAGE_KEYS.orders, parsed.orders);
      renderAll();
      alert("복원이 완료되었습니다.");
    } catch (error) {
      console.error(error);
      alert("복원에 실패했습니다. 백업 파일 형식을 확인해주세요.");
    } finally {
      target.value = "";
    }
  });
}

function initAdminPage() {
  ensureData();
  bindMemberForm();
  bindOrderForm();
  bindTableActions();
  bindSearch();
  bindDataTools();
  renderAll();
}

initAdminPage();

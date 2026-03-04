const API_BASE = "http://localhost:4000";

const signupTab = document.getElementById("signupTab");
const loginTab = document.getElementById("loginTab");
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const messageBox = document.getElementById("messageBox");

function setMessage(message, type = "") {
  messageBox.textContent = message;
  messageBox.className = "message";
  if (type) {
    messageBox.classList.add(type);
  }
}

function calculateAge(birthDate) {
  const birth = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
}

function validPassword(password) {
  return /^(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);
}

function switchToSignup() {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  setMessage("");
}

function switchToLogin() {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
  setMessage("");
}

signupTab.addEventListener("click", switchToSignup);
loginTab.addEventListener("click", switchToLogin);

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setMessage("");

  const formData = new FormData(signupForm);
  const payload = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim().toLowerCase(),
    password: String(formData.get("password") || ""),
    contact: String(formData.get("contact") || "").trim(),
    address: String(formData.get("address") || "").trim(),
    gender: String(formData.get("gender") || "NONE"),
    birthDate: String(formData.get("birthDate") || ""),
    ageConfirmed: formData.get("ageConfirmed") === "on"
  };

  if (!payload.birthDate) {
    setMessage("생년월일을 선택해주세요.", "error");
    return;
  }

  const age = calculateAge(payload.birthDate);
  if (age < 14) {
    setMessage("만 14세 미만은 가입할 수 없습니다.", "error");
    return;
  }

  if (!payload.ageConfirmed) {
    setMessage("만 14세 이상 확인 체크가 필요합니다.", "error");
    return;
  }

  if (!validPassword(payload.password)) {
    setMessage("비밀번호는 소문자/숫자/특수문자를 각각 1개 이상 포함해야 합니다.", "error");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "회원가입 실패");
    }

    setMessage(data.message, "success");
    signupForm.reset();
    switchToLogin();
  } catch (error) {
    setMessage(error.message || "회원가입 처리 중 오류가 발생했습니다.", "error");
  }
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setMessage("");

  const formData = new FormData(loginForm);
  const payload = {
    email: String(formData.get("email") || "").trim().toLowerCase(),
    password: String(formData.get("password") || "")
  };

  try {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "로그인 실패");
    }

    localStorage.setItem("benatural-auth-token", data.token);
    localStorage.setItem("benatural-auth-user", JSON.stringify(data.user));
    setMessage(`${data.user.name}님, 로그인되었습니다.`, "success");
    loginForm.reset();
  } catch (error) {
    setMessage(error.message || "로그인 처리 중 오류가 발생했습니다.", "error");
  }
});

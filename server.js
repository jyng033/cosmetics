const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = Number(process.env.PORT || 4000);
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5500";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const DB_FILE = path.join(__dirname, "users.db.json");

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

function ensureDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [] }, null, 2), "utf-8");
  }
}

function readDb() {
  ensureDb();
  const raw = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

function createId() {
  return crypto.randomUUID();
}

function createToken() {
  return crypto.randomBytes(32).toString("hex");
}

function calculateAge(birthDate) {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }
  return age;
}

function isValidPassword(password) {
  // 영어 소문자, 숫자, 특수문자 각각 1개 이상 + 8자 이상
  return /^(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);
}

async function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });
  }

  // SMTP 미설정 시 테스트 계정 사용
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
}

async function sendVerificationEmail(email, token, name) {
  const transporter = await createTransporter();
  const verifyUrl = `http://localhost:${PORT}/api/auth/verify-email?token=${token}`;
  const from = process.env.SMTP_FROM || "Be Natural <no-reply@benatural.com>";
  const mail = await transporter.sendMail({
    from,
    to: email,
    subject: "[Be Natural] 이메일 인증을 완료해주세요",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>안녕하세요, ${name}님</h2>
        <p>아래 버튼을 눌러 이메일 인증을 완료하면 가입이 승인됩니다.</p>
        <p>
          <a href="${verifyUrl}" style="display:inline-block;padding:10px 16px;background:#4e2d0f;color:#fff;text-decoration:none;border-radius:6px;">
            이메일 인증 완료하기
          </a>
        </p>
        <p>링크가 동작하지 않으면 아래 주소를 브라우저에 붙여넣어 주세요.</p>
        <p>${verifyUrl}</p>
      </div>
    `
  });

  const preview = nodemailer.getTestMessageUrl(mail);
  if (preview) {
    console.log("이메일 미리보기 URL:", preview);
  }
}

app.post("/api/auth/signup", async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      contact,
      address,
      gender,
      birthDate,
      ageConfirmed
    } = req.body;

    if (!email || !password || !name || !contact || !address || !birthDate) {
      return res.status(400).json({ message: "필수 항목을 모두 입력해주세요." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "아이디는 이메일 형식이어야 합니다." });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        message: "비밀번호는 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다."
      });
    }

    const age = calculateAge(birthDate);
    if (age < 14 || ageConfirmed !== true) {
      return res.status(400).json({ message: "만 14세 이상 확인이 필요합니다." });
    }

    const db = readDb();
    const normalizedEmail = String(email).trim().toLowerCase();
    const exists = db.users.find((user) => user.email === normalizedEmail);
    if (exists) {
      return res.status(409).json({ message: "이미 가입된 이메일입니다." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const verificationToken = createToken();
    const verificationExpiresAt = Date.now() + 1000 * 60 * 60 * 24; // 24시간

    db.users.push({
      id: createId(),
      email: normalizedEmail,
      passwordHash,
      name: String(name).trim(),
      contact: String(contact).trim(),
      address: String(address).trim(),
      gender: gender || "NONE",
      birthDate,
      ageConfirmed: true,
      verified: false,
      verificationToken,
      verificationExpiresAt,
      createdAt: new Date().toISOString()
    });
    writeDb(db);

    await sendVerificationEmail(normalizedEmail, verificationToken, name);

    return res.status(201).json({
      message: "가입 신청이 완료되었습니다. 이메일 인증 후 로그인할 수 있습니다."
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "회원가입 처리 중 오류가 발생했습니다." });
  }
});

app.get("/api/auth/verify-email", (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.status(400).send("유효하지 않은 인증 링크입니다.");
  }

  const db = readDb();
  const user = db.users.find((u) => u.verificationToken === token);
  if (!user) {
    return res.status(400).send("이미 사용되었거나 잘못된 인증 토큰입니다.");
  }

  if (Date.now() > Number(user.verificationExpiresAt)) {
    return res.status(400).send("인증 토큰이 만료되었습니다. 다시 가입을 시도해주세요.");
  }

  user.verified = true;
  user.verificationToken = null;
  user.verificationExpiresAt = null;
  user.verifiedAt = new Date().toISOString();
  writeDb(db);

  return res.send(`
    <html lang="ko">
      <body style="font-family: Arial, sans-serif; padding: 24px;">
        <h2>이메일 인증이 완료되었습니다.</h2>
        <p>이제 로그인할 수 있습니다.</p>
        <a href="${FRONTEND_URL}/auth.html">로그인 페이지로 이동</a>
      </body>
    </html>
  `);
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "이메일과 비밀번호를 입력해주세요." });
    }

    const db = readDb();
    const normalizedEmail = String(email).trim().toLowerCase();
    const user = db.users.find((u) => u.email === normalizedEmail);
    if (!user) {
      return res.status(401).json({ message: "이메일 또는 비밀번호가 올바르지 않습니다." });
    }

    if (!user.verified) {
      return res.status(403).json({ message: "이메일 인증이 완료되지 않았습니다." });
    }

    const matched = await bcrypt.compare(password, user.passwordHash);
    if (!matched) {
      return res.status(401).json({ message: "이메일 또는 비밀번호가 올바르지 않습니다." });
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "로그인 성공",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "로그인 처리 중 오류가 발생했습니다." });
  }
});

app.get("/api/auth/me", (req, res) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) {
    return res.status(401).json({ message: "인증 토큰이 없습니다." });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return res.json({ user: payload });
  } catch (error) {
    return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
});

app.listen(PORT, () => {
  ensureDb();
  console.log(`Auth server started: http://localhost:${PORT}`);
});

require('dotenv').config({ path: '../.env' });
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL 데이터베이스 설정
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// 로그인 엔드포인트
app.post('/api/signin', (req, res) => {
  const { email, password } = req.body;

  console.log('got request', email, password);

  // 사용자 확인
  const query = 'SELECT * FROM user_credentials WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).send(err);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    // 비밀번호 검증
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send(err);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name } });
    });
  });
});

// 회원가입 엔드포인트
app.post('/api/signup', (req, res) => {
  console.log(req.body);
  const { name, password, email } = req.body;

  // 비밀번호 암호화
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send(err);

    // 사용자 정보 저장
    const query = 'INSERT INTO user_credentials (name, password, email) VALUES (?, ?, ?)';
    db.query(query, [name, hashedPassword, email], (err, result) => {
      if (err) return res.status(500).send(err);

      res.status(200).json({ message: 'User registered successfully' });
    });
  });
});

// 서버 시작
const PORT = process.env.WAS_PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

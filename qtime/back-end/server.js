const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL 데이터베이스 설정
const db = mysql.createConnection({
  host: 'db-private-2a.c9oaa8seu3yz.ap-northeast-2.rds.amazonaws.com',
  user: 'seungmin',
  password: 'your_db_password', // 여기에 실제 비밀번호를 입력하세요
  database: 'qt_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// 로그인 엔드포인트
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // 사용자 확인
  const query = 'SELECT * FROM users WHERE email = ?';
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

      res.json({ message: 'Login successful', user: { id: user.id, name: user.name } });
    });
  });
});

// 회원가입 엔드포인트
app.post('/signup', (req, res) => {
  const { name, password, email } = req.body;

  // 비밀번호 암호화
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send(err);

    // 사용자 정보 저장
    const query = 'INSERT INTO users (name, password, email) VALUES (?, ?, ?)';
    db.query(query, [name, hashedPassword, email], (err, result) => {
      if (err) return res.status(500).send(err);

      res.json({ message: 'User registered successfully' });
    });
  });
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

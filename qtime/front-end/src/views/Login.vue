<template>
    <div class="container d-flex align-items-center justify-content-center" style="height: 100vh;">
      <b-card class="text-center p-4" style="max-width: 400px;">
        <h3 class="mb-3">로그인</h3>
        <b-form @submit.prevent="onLogin">
          <b-form-group label="Email" label-for="input-email">
            <b-form-input
              id="input-email"
              v-model="email"
              type="text"
              placeholder="이메일을 입력하세요"
              required
            ></b-form-input>
          </b-form-group>
  
          <b-form-group label="비밀번호" label-for="input-password" class="mb-3">
            <b-form-input
              id="input-password"
              v-model="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              required
            ></b-form-input>
          </b-form-group>
  
          <b-button type="submit" variant="primary" class="w-100 mb-3">로그인</b-button>
          <b-button variant="secondary" class="w-100 mb-3" @click="showSignUpModal">회원가입</b-button>
  
          <hr />
  
          <b-button variant="warning" class="w-100" @click="onKakaoLogin">
            <i class="fab fa-kakao"></i> 카카오톡으로 로그인
          </b-button>
        </b-form>
      </b-card>
  
      <!-- Sign-up Modal -->
      <b-modal v-model="showModal" title="회원가입" @ok="onSignUp">
        <b-form @submit.prevent="onSignUp">
          <b-form-group label="이름" label-for="signup-name">
            <b-form-input
              id="signup-name"
              v-model="signUpName"
              type="text"
              placeholder="이름을 입력하세요"
              required
            ></b-form-input>
          </b-form-group>
  
          <b-form-group label="Email" label-for="signup-email">
            <b-form-input
              id="signup-email"
              v-model="signUpEmail"
              type="text"
              placeholder="이메일을 입력하세요"
              required
            ></b-form-input>
          </b-form-group>
  
          <b-form-group label="비밀번호" label-for="signup-password">
            <b-form-input
              id="signup-password"
              v-model="signUpPassword"
              type="password"
              placeholder="비밀번호를 입력하세요"
              required
            ></b-form-input>
          </b-form-group>
        </b-form>
      </b-modal>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        showModal: false,
        signUpName: '',
        signUpEmail: '',
        signUpPassword: ''
      };
    },
    methods: {
      async onLogin() {
        try {
          const response = await axios.post('/api/signin', {
            email: this.email,
            password: this.password
          });
  
          if (response.status !== 200) {
            throw new Error(response.data.message || 'Login failed');
          }
  
          alert('로그인 성공: ' + response.data.message);
          // 로그인 성공 후 추가 작업 (예: 사용자 정보 저장 또는 화면 전환)
        } catch (error) {
          console.error('Login error:', error);
          alert('로그인 실패: ' + error.message);
        }
      },
      async onSignUp() {
        try {
          const response = await axios.post('/api/signup', {
            name: this.signUpName,
            email: this.signUpEmail,
            password: this.signUpPassword
          });
  
          if (response.status !== 200) {
            throw new Error(response.data.message || 'Sign-up failed');
          }
  
          alert('회원가입 성공: ' + response.data.message);
          this.showModal = false;
          // 초기화
          this.signUpName = '';
          this.signUpEmail = '';
          this.signUpPassword = '';
        } catch (error) {
          console.error('Sign-up error:', error);
          alert('회원가입 실패: ' + error.message);
        }
      },
      showSignUpModal() {
        this.showModal = true;
      },
      onKakaoLogin() {
        console.log("카카오톡으로 로그인");
      }
    }
  };
  </script>
  
  <style scoped>
  /* 로그인 화면 스타일을 추가할 수 있습니다 */
  </style>
  
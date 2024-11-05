<!-- Login.vue -->
<template>
    <div class="container d-flex align-items-center justify-content-center" style="height: 100vh;">
      <b-card class="text-center p-4" style="max-width: 400px;">
        <h3 class="mb-3">로그인</h3>
        <b-form @submit.prevent="onLogin">
          <b-form-group label="ID" label-for="input-id">
            <b-form-input
              id="input-id"
              v-model="id"
              type="text"
              placeholder="아이디를 입력하세요"
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
          <b-button variant="secondary" class="w-100 mb-3">회원가입</b-button>
  
          <hr />
  
          <b-button variant="warning" class="w-100" @click="onKakaoLogin">
            <i class="fab fa-kakao"></i> 카카오톡으로 로그인
          </b-button>
        </b-form>
      </b-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        id: '',
        password: ''
      };
    },
    methods: {
      onLogin() {
        // 로그인 로직 구현
        console.log("ID:", this.id);
        console.log("Password:", this.password);
      },
      onKakaoLogin() {
        // KakaoTalk OAuth 로그인 로직 구현
        console.log("카카오톡으로 로그인");
      }
    }
  };
  </script>
  
  <style scoped>
  /* 로그인 화면 스타일을 추가할 수 있습니다 */
  </style>
  
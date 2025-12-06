<template>
  <div id="app" class="app-container">
    <div class="header">
    <header class="navbar">
      <div class="logo">爱宠管理系统</div>
    </header>

    </div>
    <main class="main-content">
      <router-view />
    </main>
    <footer class="footer">
      <p>&copy; {{ new Date().getFullYear() }} MyApp. 保留所有权利。</p>
    </footer>
  </div>
</template>

<script setup>
</script>
<style>
* {
    padding: 0;
    margin: 0;
}
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: white;
  width: 100%;
  height:100px;
  border: #333;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 20px;
}

.search {
  position: relative;
  margin-right: 20px;
}

.search input {
  padding: 0.5rem 0.5rem 0.5rem 2.5rem; 
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  width: 260px;
  height: 36px;
}

.search .el-icon {
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 20px;
}


.main-content {
  flex: 1;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
}

.footer {
  text-align: center;
  padding: 1rem;
  background-color: #f5f5f5;
  border-top: 1px solid #e0e0e0;
}

</style>
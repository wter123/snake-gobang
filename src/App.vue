<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
</style>

<script>
export default {
  created() {
    if (localStorage.getItem("userInfo")) {
      this.$store.dispatch("login", true);
    }
  },
};
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
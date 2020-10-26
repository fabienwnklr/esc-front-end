<template>
  <div>
    <span style="display:none;"></span>
    <h1 class="text-center ma-10">Admin dashboad</h1>
    <router-link to="/admin/add-game">About</router-link>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$on('logged', () => console.log("logged"))
  }
}
</script>

<style>

</style>

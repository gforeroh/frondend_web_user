<template>
  <div>
    <h1>Desde vista de usuario</h1>
  </div>
</template>
<script>
export default {
  created () {
    console.log("usersView");
    let nose = this.$route
    console.log(nose);
    
  },
}
</script>

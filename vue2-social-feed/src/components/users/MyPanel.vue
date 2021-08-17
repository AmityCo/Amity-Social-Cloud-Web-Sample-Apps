<template>
    <div class = "me-panel">
      <router-link to="/me/edit" class="border" >Edit Profile</router-link>
    </div>
</template>

<script>
</script>

<style lang="stylus" scoped>
.me-panel
  display grid
  grid-row 3
  grid-column 1 / 5
  grid-template-columns 100%
  grid-template-rows auto
  margin-top 1rem
  gap 0.25rem
  a 
    display flex 
    align-items: center;
    justify-content: center;
    background: none;
    height: 2.5rem;
    border-radius: 4px;
    font-weight: 600;
    font-size: 1rem;

  
</style>


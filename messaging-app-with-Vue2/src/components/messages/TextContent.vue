<template>
  <div class="text-content">
    <slot>{{ data.text }}</slot>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style>
.text-content {
  padding: 0.5rem;
}
</style>

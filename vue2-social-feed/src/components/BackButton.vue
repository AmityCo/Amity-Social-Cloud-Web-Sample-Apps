<template>
  <a onclick="history.back()">
    <BackIcon />
    </a>
</template>

<script>
import BackIcon from '@/components/icons/BackIcon'

export default {
  components: { BackIcon },
}
</script>
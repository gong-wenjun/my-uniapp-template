<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <view>
    <text>
      {{ title }}
    </text>
  </view>
</template>

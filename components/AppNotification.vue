<script setup lang="ts">
const { notification, timeout = 5000 } = defineProps<{
  notification: Jamfluencer.Notification;
  timeout?: number;
}>();

const emit = defineEmits<{
  expired: [id: string];
}>();

onMounted(() => {
  setTimeout(() => {
    emit('expired', notification.id);
  }, timeout);
});
</script>

<template>
  <li
    class="max-w-80 rounded p-2"
    :class="{
      'bg-red-800': notification.type === 'error',
      'bg-slate-800 text-white': notification.type === 'info',
    }"
  >
    {{ notification.message }}
  </li>
</template>

<script setup lang="ts">
const notifications = useNotifications();

function closeNotification(notificationId: string) {
  const index = notifications.value.findIndex((n) => n.id === notificationId);
  notifications.value.splice(index, 1);
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-10">
    <TransitionGroup
      name="notification-list"
      tag="ul"
      class="relative flex flex-col gap-2 items-end"
    >
      <AppNotification
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
        @expired="closeNotification"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.notification-list-move,
.notification-list-enter-active,
.notification-list-leave-active {
  transition: all 0.5s ease;
}

.notification-list-enter-from,
.notification-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

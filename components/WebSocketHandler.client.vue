<script setup lang="ts">
const emit = defineEmits<{
  (event: 'message', data: string): void;
}>();

const socket = new WebSocket('ws://192.168.1.245:8080');

socket.onmessage = function (event) {
  emit('message', event.data);
};
</script>

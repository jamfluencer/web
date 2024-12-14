<script setup lang="ts">
const currentChannel = defineModel<number>('channel', { required: true });

const props = defineProps<{
  poweredOn: boolean;
}>();

const emit = defineEmits<{
  'click:power': [];
}>();

const ChannelButton = (channel: number, enabled: boolean = true) => {
  const label = channel.toString();

  const action = enabled
    ? () => {
        if (!props.poweredOn) return;
        currentChannel.value = channel;
      }
    : undefined;

  return { label, action };
};

const channelButtons: ReturnType<typeof ChannelButton>[] = [
  ChannelButton(1),
  ChannelButton(2),
  ChannelButton(3),
  ChannelButton(4),
  ChannelButton(5, false),
  ChannelButton(6, false),
  ChannelButton(7, false),
  ChannelButton(8, false),
  ChannelButton(9, false),
];

const channelButtonGroups = [
  channelButtons.slice(0, 3),
  channelButtons.slice(3, 6),
  channelButtons.slice(6, 9),
];
</script>

<template>
  <div
    class="absolute bottom-0 right-12 bg-neutral-800 rounded-t-2xl w-[180px] h-[195px] overflow-hidden pt-6 px-4 flex flex-col gap-4"
  >
    <div class="flex justify-between items-center">
      <div class="flex-1 flex justify-center">
        <button
          class="bg-red-500 w-10 h-10 rounded-full flex items-center justify-center text-white"
          @click="emit('click:power')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="currentColor"
          >
            <path
              d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-84 31.5-156.5T197-763l56 56q-44 44-68.5 102T160-480q0 134 93 227t227 93q134 0 227-93t93-227q0-67-24.5-125T707-707l56-56q54 54 85.5 126.5T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-360v-440h80v440h-80Z"
            />
          </svg>
          <span class="sr-only">on</span>
        </button>
      </div>
      <div class="flex-1 flex justify-center">
        <button class="bg-neutral-600 w-6 h-6 rounded-full">
          <span class="sr-only">???</span>
        </button>
      </div>
      <div class="flex-1 flex justify-center">
        <button class="bg-neutral-600 w-6 h-6 rounded-full">
          <span class="sr-only">???</span>
        </button>
      </div>
    </div>
    <div
      v-for="(channelGroup, cgi) in channelButtonGroups"
      :key="`'channel-group'_${cgi}`"
      class="flex justify-between items-center"
    >
      <div
        v-for="(channel, i) in channelGroup"
        :key="`'channel'_${cgi}_${i}`"
        class="flex-1 flex justify-center"
      >
        <button
          class="bg-neutral-600 text-white w-8 h-8 rounded-full border border-white/0 transition-all duration-200"
          :class="{
            'opacity-50': !channel.action,
            'border-white/100':
              poweredOn && channel.label === currentChannel.toString(),
          }"
          :tabindex="channel.action ? 0 : -1"
          :disabled="!channel.action"
          @click="channel.action"
        >
          {{ channel.label }}
        </button>
      </div>
    </div>
  </div>
</template>

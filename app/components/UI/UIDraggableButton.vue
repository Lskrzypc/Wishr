<script setup lang="ts">
interface Emits {
  (event: 'click'): void;
}

interface Props {
  topOffset?: number;
  leftOffset?: number;
  bottomOffset?: number;
  rightOffset?: number;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const positions = ref({
  clientX: 0,
  clientY: 0,
  movementX: 0,
  movementY: 0,
});

const dragged = ref(false);

const draggableContainer = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (!draggableContainer.value) {
    return;
  }
  if (props.topOffset) {
    draggableContainer.value.style.top = `${props.topOffset}px`;
  }
  if (props.leftOffset) {
    draggableContainer.value.style.left = `${props.leftOffset}px`;
  }
  if (props.bottomOffset) {
    draggableContainer.value.style.bottom = `${props.bottomOffset}px`;
  }
  if (props.rightOffset) {
    draggableContainer.value.style.right = `${props.rightOffset}px`;
  }
});

const clientPosition = (event: MouseEvent | TouchEvent) => {
  let clientX = 0;
  let clientY = 0;
  if (event instanceof MouseEvent) {
    clientX = event.clientX;
    clientY = event.clientY;
  } else if (event instanceof TouchEvent) {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
  }
  return {
    clientX,
    clientY,
  };
};

function handleDragStart(event: MouseEvent | TouchEvent) {
  dragged.value = false;
  event.preventDefault();

  const { clientX, clientY } = clientPosition(event);

  positions.value.clientX = clientX;
  positions.value.clientY = clientY;

  document.onmousemove = handleDragMove;
  document.ontouchmove = handleDragMove;
  document.onmouseup = handleDragEnd;
  document.ontouchend = handleDragEnd;
}

function handleDragMove(event: MouseEvent | TouchEvent) {
  event.stopPropagation();

  const { clientX, clientY } = clientPosition(event);

  positions.value.movementX = positions.value.clientX - clientX;
  positions.value.movementY = positions.value.clientY - clientY;
  positions.value.clientX = clientX;
  positions.value.clientY = clientY;
  // set the element's new position:
  if (!draggableContainer.value) {
    return;
  }
  draggableContainer.value.style.top = `${draggableContainer.value.offsetTop - positions.value.movementY}px`;
  draggableContainer.value.style.left = `${draggableContainer.value.offsetLeft - positions.value.movementX}px`;
  draggableContainer.value.style.bottom = '';
  draggableContainer.value.style.right = '';

  if (
    (positions.value.movementX > 0.1 || positions.value.movementX < -0.1) &&
    (positions.value.movementY > 0.1 || positions.value.movementY < -0.1)
  ) {
    dragged.value = true;
  }
}

function handleDragEnd() {
  // if no movement happens we throw the click event
  if (!dragged.value) {
    emits('click');
  } else {
    dragged.value = false;
  }

  document.onmouseup = null;
  document.onmousemove = null;
  document.ontouchmove = null;
  document.ontouchend = null;
}
</script>

<template>
  <div
    ref="draggableContainer"
    class="fixed z-50 cursor-pointer"
    :class="{ 'cursor-move opacity-50': dragged }"
    @mousedown="handleDragStart"
    @touchstart="handleDragStart"
  >
    <slot></slot>
  </div>
</template>

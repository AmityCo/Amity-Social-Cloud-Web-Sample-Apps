<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    display="block"
    preserveAspectRatio="xMidYMid"
    width="2rem"
    height="2rem"
    viewBox="0 0 100 100"
  >
    <circle
      cx="50"
      cy="50"
      r="35"
      fill="none"
      stroke="var(--primary)"
      stroke-dasharray="164.93361431 56.97787144"
      stroke-width="10"
    >
      <animateTransform
        attributeName="transform"
        dur="1s"
        keyTimes="0;1"
        repeatCount="indefinite"
        type="rotate"
        values="0 50 50;360 50 50"
      />
    </circle>
  </svg>
</template>

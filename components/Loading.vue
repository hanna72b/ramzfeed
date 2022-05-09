<template>
  <div>
    <div
      v-for="(tweet, index) in 20"
      :key="index"
      class="pt-4 font-font-weight-light"
    >
      <v-skeleton-loader type="paragraph" dark></v-skeleton-loader>
    </div>
  </div>
</template>

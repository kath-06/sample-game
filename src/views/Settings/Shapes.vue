<template>
  <div class="page-header">
    <span class="page-title-primary h-12">
      {{ getRouteName() }}
    </span>
  </div>
  <div class="container-flex-col h-fit md:container-flex-row md:p-12 fade-down-in animate-delay-600">
    <shape-list />
  </div>
</template>
<script lang="ts" setup>
import { getRouteName } from "../../utils/routes"

</script>

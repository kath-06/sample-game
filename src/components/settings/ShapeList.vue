<template>
    <div class="page-line-card">
        <main-table :columns="tableColumns" />
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const tableColumns = ref([
    { name: 'Name', prop: 'name' },
    { name: 'Shape', prop: 'shape' }
])
</script>
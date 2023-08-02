<template>
    <div>
        <table class="primary-table">
            <thead class="primary-table-header">
                <tr>
                    <th
                        scope="col"
                        class="px-6 py-3"
                        v-for="(column, index) in columns" :key="index"
                    >
                        {{ column.name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="data.length > 0" class="primary-table-row">
                    <td class="px-6 py-4">
                    </td>
                </tr>
            </tbody>
        </table>
        <div
            v-if="data.length === 0"
            class="w-full flex justify-center items-center text-md m-4 text-sky-950">
            No Data
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps({
    columns: {
        type: Object,
        required: true 
    },
    data: {
        type: Array,
        default: []
    }
})
</script>

<template>
    <div>
        <div class="website-header">{{ header }}</div>
        <div></div>
    </div>
</template>

<script>
export default {
    name: 'uptime-longest-downtime',
    props: {
        uptimes: {
            required: true,
        },
        header: {
            type: String,
            required: true,
        }
    },
}
</script>


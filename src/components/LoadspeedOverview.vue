<template>
    <div>{{ header }}</div>
</template>

<script>
export default {
    name: 'loadspeed-overview',
    props: {
        urls: {
            required: true,
        },
        header: {
            type: String,
            required: true,
        }
    }
}
</script>


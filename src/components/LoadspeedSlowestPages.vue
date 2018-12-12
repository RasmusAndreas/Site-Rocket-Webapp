<template>
    <div v-if="urls.length > 0">Hej</div>
</template>

<script>
export default {
    name: 'loadspeed-slowest-pages',
    props: {
        urls: {
            required: true,
        },
    },
}
</script>


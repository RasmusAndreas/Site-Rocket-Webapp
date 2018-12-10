<template>
    <div>
        Hej 4
        <v-btn @click="next">Next step</v-btn>
    </div>
</template>

<script>
export default {
    name: 'add-new-step-four',
    methods: {
        next() {
            this.$emit('next');
        }
    },
}
</script>


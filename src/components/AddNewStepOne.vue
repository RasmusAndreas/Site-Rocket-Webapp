<template>
    <div>
        <h1 class="header-caps">CREATE MONITOR</h1>
        <p>Use the form below to start creating a monitor.</p>
        <v-form v-model="valid">
            <v-text-field
                v-model="name"
                label="Name"
                required
                ></v-text-field>
            <v-text-field
                v-model="domain"
                label="Domain"
                required
                ></v-text-field>
            <div v-if="error">{{ error }}</div>
            <v-btn 
                @click.prevent="next"
                >NEXT STEP</v-btn>
        </v-form>
    </div>
</template>

<script>
export default {
    name: 'add-new-step-one',
    data() {
        return {
            valid: false,
            name: '',
            domain: '',
            error: '',
        }
    },
    methods: {
        next() {
            if (this.name !== '' && this.domain !== '') {
                this.$emit('nextData', {name: this.name, domain: this.domain});
            } else {
                this.error = 'Both fields needs to be filled out.';
            }
        }
    },
}
</script>


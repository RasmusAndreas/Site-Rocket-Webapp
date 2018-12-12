<template>
    <div>
        <h1 class="header-caps">WELCOME ABOARD</h1>
        <p>Please fill out the form below to create an account.</p>
        <v-form v-model="valid">
            <v-text-field
            v-model="name"
            label="Company / Name"
            required></v-text-field>
            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>
            <v-text-field
                v-model="password"
                :append-icon="show ? 'visibility_off' : 'visibility'"
                :rules="[passRules.required]"
                :type="show ? 'text' : 'password'"
                label="Password"
                @click:append="show = !show"
            ></v-text-field>
            <v-text-field
                v-model="passwordrepeat"
                :append-icon="show ? 'visibility_off' : 'visibility'"
                :rules="[passRules.required]"
                :type="show ? 'text' : 'password'"
                label="Confirm password"
                @click:append="show = !show"
            ></v-text-field>
            <div v-if="error">{{ error }}</div>
            <v-btn 
                @click.prevent="signup"
                >SIGN UP</v-btn>
            <v-btn @click="navigateTo('/login')" outline>BACK TO LOGIN</v-btn>
        </v-form>
    </div>
</template>

<script>
export default {
    name: 'signup-form',
    data() {
        return {
            valid: false,
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            password: '',
            show: false,
            passRules: {
                required: value => !!value || 'Required.',
            },
            name: '',
            passwordrepeat: '',
            error: '',
        }
    },
    methods: {
        signup() {
            if (this.password == this.passwordrepeat) {
                this.$store.dispatch('signup', {
                    email: this.email,
                    password: this.password,
                    name: this.name,
                }).then(() => {
                    this.$router.push({ name: 'dashboard' })
                }).catch(error => {
                    this.error = 'Something went wrong'
                    // eslint-disable-next-line
                    console.log(error.response.data.message)
                })
            } else {
                this.error = 'The password needs to be the same';
            }
        },
        navigateTo(path) {
            this.$router.push(path);
        }
    },
}
</script>

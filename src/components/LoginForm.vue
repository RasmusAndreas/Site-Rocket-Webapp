<template>
    <div>
        <h1 class="header-caps">WELCOME</h1>
        <p>Please login to your account.</p>
        <v-form v-model="valid">
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
            <div v-if="error">{{ error }}</div>
            <router-link class="forgot-link" :to="{ name: 'forgot' }">Forgot password</router-link>
            <v-btn 
                @click.prevent="login"
                >Login</v-btn>
            <v-btn @click="navigateTo('/signup')" outline>SIGN UP</v-btn>
        </v-form>
    </div>
</template>

<script>
export default {
    name: 'login-form',
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
            error: '',
        }
    },
    methods: {
        login() {
            this.$store.dispatch('retrieveToken', {
                email: this.email,
                password: this.password,
            }).then(() => {
                this.saveUser();
                this.$router.push({ name: 'dashboard' })
            }).catch(error => {
                this.error = 'E-mail or password is incorrect'
                // eslint-disable-next-line
                console.log(error.response.data.message)
            })
        },
        navigateTo(path) {
            this.$router.push(path);
        }
    }
}
</script>


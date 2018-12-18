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
            <a class="button-primary float-left"
                @click.prevent="signup"
                >SIGN UP</a>
            <a class="button-outline-primary float-left twobutton-margin" @click="navigateTo('/login')" outline>BACK TO LOGIN</a>
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
            reg: /.+@.+/,
        }
    },
    methods: {
        signup() {
            if (this.isEmailValid() == true) {
                if (this.password == this.passwordrepeat) {
                    this.$store.dispatch('signup', {
                        email: this.email,
                        password: this.password,
                        name: this.name,
                    }).then(() => {
                        this.$router.push({ name: 'login' })
                    }).catch(error => {
                        this.error = 'Something went wrong'
                        // eslint-disable-next-line
                        console.log(error.response.data.message)
                    })
                } else {
                    this.error = 'The password needs to be the same';
                }
            } else {
                this.error = 'Are you sure this email is valid?';
            }
        },
        navigateTo(path) {
            this.$router.push(path);
        },
        isEmailValid() {
            return (this.email == "")? "" : (this.reg.test(this.email)) ? true : false;
        },
    },
}
</script>

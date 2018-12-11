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
                v-model="oldPassword"
                :append-icon="show ? 'visibility_off' : 'visibility'"
                :rules="[passRules.required]"
                :type="show ? 'text' : 'password'"
                label="Current password"
                @click:append="show = !show"
            ></v-text-field>
            <v-text-field
                v-model="password"
                :append-icon="show ? 'visibility_off' : 'visibility'"
                :rules="[passRules.required]"
                :type="show ? 'text' : 'password'"
                label="New password"
                @click:append="show = !show"
            ></v-text-field>
            <v-text-field
                v-model="passwordRepeat"
                :append-icon="show ? 'visibility_off' : 'visibility'"
                :rules="[passRules.required]"
                :type="show ? 'text' : 'password'"
                label="Confirm password"
                @click:append="show = !show"
            ></v-text-field>
            <div v-if="error">{{ error }}</div>
            <v-btn @click.prevent="update">Update</v-btn>
        </v-form>
        <v-btn outline @click="logout">SIGN OUT</v-btn>
    </div>
</template>

<script>
export default {
    name: 'account-settings',
    data() {
        return {
            name: this.$store.state.user.name,
            email: this.$store.state.user.email,
            valid: false,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            oldPassword: '',
            password: '',
            show: false,
            passRules: {
                required: value => !!value || 'Required.',
            },
            passwordRepeat: '',
            error: '',
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('destroyToken')
            .then(() => {
                this.$router.push({name: 'login' })
            });
        },
        update() {
            this.$store.dispatch('updateUser', {
                name: this.name,
                email: this.email,
                password: this.password,
                passwordRepeat: this.passwordPepeat,
                oldpassword: this.oldPassword,
            }).then(() => {
                this.$emit('accountSaved', 'Awesome! Account updated succesfully');
            }).catch(error => {
                // eslint-disable-next-line
                console.log(error.response.data)
            })
        },
        navigateTo(path) {
            this.$router.push(path);
        }
    }
}
</script>

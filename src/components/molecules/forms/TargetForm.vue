<template>
    <form @submit.prevent="submitMethod">
        <div class="w-4/5 mx-auto">
            <base-alert v-if="alert.turn" :mode="alert.mode" :message="alert.message"></base-alert>

            <form-input @formChange="setName" @formIsValid="setNameValidity" type="text" label="Name" :isReadonly="true"
                formName="name" placeholder="Name" :isRequired="true" :defaultValue="name"  idCode="name"></form-input>
            <form-input @formChange="setInput" @formIsValid="setInputValidity" type="number" label="Input"
                :isReadonly="false" formName="input" placeholder="Input" :isRequired="true"
                :defaultValue="input" idCode="input"></form-input>
            <form-input @formChange="setTarget" @formIsValid="setTargetValidity" type="number" label="Target"
                :isReadonly="false" formName="target" placeholder="Target" :isRequired="true"
                :defaultValue="target" idCode="target"></form-input>


            <div class="flex justify-end mt-7">
                <button-danger :link="true" :to="{ name: 'change target' }" size="sm">
                    Batal
                </button-danger>

                <button-primary class="ml-1" :class="loadingState" size="sm" type="submit">
                    Simpan
                </button-primary>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        mode: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            id: "",
            name: "",
            input: 0,
            target: 0,
            alert: {
                turn: false,
                mode: "",
                message: "",
            },
            isLoading: false,
            nameIsValid: true,
            inputIsValid: true,
            targetIsValid: true,
        };
    },
    computed: {
        loadingState() {
            if (this.isLoading) {
                return {
                    loading: true,
                };
            } else {
                return {
                    loading: false,
                };
            }
        },
    },
    methods: {
        submitMethod() {
            if (this.mode == "update" && this.$route.params.id) {
                this.updateTarget();
            }
        },
        async loadTarget(id) {
            try {
                await this.$store.dispatch("target/getTargetById", {
                    id: id,
                });
                const target = this.$store.getters["target/getTarget"];
                this.id = target.id;
                this.name = target.name;
                this.input = target.input;
                this.target = target.target;
            } catch (error) {
                this.turnOnAlert("error", error.message);
            }
        },
        async updateTarget() {
            this.isLoading = true;
            if (!this.nameIsValid || !this.inputIsValid || !this.targetIsValid) {
                this.isLoading = false;
                this.turnOnAlert("error", "Pastikan form terisi dengan benar");
            } else {
                try {
                    await this.$store.dispatch("target/updateTargetById", {
                        id: this.$route.params.id,
                        input: this.input,
                        target: this.target,
                    });

                    this.$store.commit("alert/setAlert", {
                        operation: "update",
                        isSucceed: true,
                    });

                    this.$router.push({
                        name: "change target"
                    });
                } catch (error) {
                    this.turnOnAlert("error", error.message);
                }
            }
            this.isLoading = false;
        },
        turnOnAlert(mode, message) {
            this.alert.turn = true;
            this.alert.mode = mode;
            this.alert.message = message;
        },
        setNameValidity(formIsValid) {
            this.nameIsValid = formIsValid;
        },
        setInputValidity(formIsValid) {
            this.inputIsValid = formIsValid;
        },
        setTargetValidity(formIsValid) {
            this.targetIsValid = formIsValid;
        },
        setName(name) {
            this.name = name;
        },
        setInput(input) {
            this.input = input;
        },
        setTarget(target) {
            this.target = target;
        },
    },
    created() {
        if (this.mode == "update" && this.$route.params.id) {
            this.loadTarget(this.$route.params.id);
        }
    },
};
</script>
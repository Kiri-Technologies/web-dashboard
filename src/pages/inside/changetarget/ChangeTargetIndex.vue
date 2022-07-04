<template>
    <loading v-if="isLoading"></loading>
    <section class="flex justify-center mt-4" v-else>
        <card class="shadow-lg w-11/12">
            <card-body>
                <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
                <p>
                    <menu-title :path="{ path: '/' }">
                        <template v-slot:default> Change Target </template>
                        <template v-slot:menuName> Mengubah Target yang Telah Ditentukan </template>
                    </menu-title>
                </p>
                <base-alert v-if="alert.turn" :mode="alert.mode" :message="alert.message"></base-alert>

                <div class="overflow-x-auto mt-2">
                    <target-data-table :entries="targets" @saveButtonClicked="saveButtonClicked"></target-data-table>
                </div>
            </card-body>
        </card>
    </section>
</template>

<script>
import TargetDataTable from '../../../components/molecules/datatable/TargetDataTable.vue';

export default {
    components: {
        TargetDataTable
    },
    data() {
        return {
            isLoading: false,
            alert: {
                turn: false,
                mode: "",
                message: "",
            },
            targets: [],
            crumbs: [
                {
                    title: "Change Target",
                    link: {
                        path: "/changetarget",
                    },
                },
            ],
        };
    },
    methods: {
        async loadAllTarget() {
            try {
                await this.$store.dispatch("target/getAllTarget");
                const target = this.$store.getters["target/getAllTarget"];
                this.targets = target;
            } catch (error) {
                this.turnOnAlert("error", error.message);
            }
        },
        saveButtonClicked(mode, isSucceed) {
            this.turnOnAlert(mode, isSucceed);
        },
        turnOnAlert(operation, isSucceed) {
            this.alert.turn = true;
            if (isSucceed) {
                this.alert.mode = "success";
                if (operation == "update") {
                    this.alert.message = "Berhasil mengubah target";
                }
            } else if (!isSucceed) {
                this.alert.mode = "error";
                if (operation == "update") {
                    this.alert.message = "Gagal mengupdate target";
                }
            }
            setTimeout(() => {
                this.alert.turn = false;
            }, 5000);
        },
        setAlert() {
            const alert = this.$store.getters["alert/getAlert"];
            if (alert.isActive) {
                this.turnOnAlert(alert.operation, alert.isSucceed);
                this.$store.commit("alert/revokeAlert");
            }
        },
    },
    async created() {
        this.isLoading = true;
        try {
            await this.loadAllTarget();
            this.setAlert();
        } catch (error) {
            console.log(error.message);
        }
        this.isLoading = false;
    },
};
</script>
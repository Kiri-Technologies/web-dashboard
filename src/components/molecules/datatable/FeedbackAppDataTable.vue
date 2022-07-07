<template>
    <div class="grid grid-flow-row auto-rows-auto gap-3">
        <div class="grid grid-flow-col auto-cols-auto">
            <div>
                <label for="showEntries" class="mr-3">Show</label>
                <select class="select select-bordered" v-model="showedEntries" @change="paginateEntries(1)" ref="show">
                    <option v-for="sh in showEntries" :key="sh" :value="sh">{{ sh }}</option>
                </select>
            </div>
            <div class="flex justify-end">
                <input type="search" placeholder="Search" class="input input-bordered w-full max-w-xs"
                    v-model="searchInput" @keyup="searchEvent" />
            </div>
        </div>
        <div>
            <table class="table w-full">
                <!-- head -->
                <thead>
                    <tr>
                        <td>Nama</td>
                        <td>Review</td>
                        <td>Tanggapan</td>
                        <td v-if="currentTab == 'All Feedback' || currentTab == 'Pending'">
                            Change Status
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="filteredEntries.length < 1">
                        <td colspan="100%" class="text-center text-gray-500">
                            Feedback Kosong
                        </td>
                    </tr>
                    <tr v-for="fa in filteredEntries" :key="fa.id">
                        <td>{{ fa.user_id }}</td>
                        <td :class="{
                            'text-red-600': fa.review == 'awful' || fa.review == 'sad',
                            'font-bold': fa.review == 'awful' || fa.review == 'excellent',
                            'text-green-600': fa.review == 'excellent' || fa.review == 'happy',
                            'text-black': fa.review == 'neutral',
                        }">{{ fa.review }}</td>
                        <td>
                            {{ fa.tanggapan }}
                        </td>
                        <td v-if="
                            currentTab !== 'Cancelled' || currentTab !== 'Processed'
                        ">
                            <save-modal :id="fa.id + 'pending'" @saveButtonClicked="changeStatusToPending"
                                v-if="currentTab == 'All Feedback'">
                                <template v-slot:default>
                                    <button-warning size="sm">
                                        Pending
                                    </button-warning>
                                </template>
                                <template v-slot:title> Edit Status </template>
                                <template v-slot:body>
                                    Anda yakin untuk mengubah status menjadi
                                    <span class="text-yellow-600">pending</span>?
                                </template>
                            </save-modal>

                            <save-modal :id="fa.id + 'cancelled'" @saveButtonClicked="changeStatusToCancelled"
                                v-if="currentTab == 'Pending'">
                                <template v-slot:default>
                                    <button-danger class="mr-2" size="sm">
                                        Cancelled
                                    </button-danger>
                                </template>
                                <template v-slot:title> Edit Status </template>
                                <template v-slot:body>
                                    Anda yakin untuk mengubah status menjadi
                                    <span class="text-red-600">cancelled</span>?
                                </template>
                            </save-modal>

                            <save-modal :id="fa.id + 'processed'" @saveButtonClicked="changeStatusToProcessed"
                                v-if="currentTab == 'Pending'">
                                <template v-slot:default>
                                    <button-success size="sm">
                                        Processed
                                    </button-success>
                                </template>
                                <template v-slot:title> Edit Status </template>
                                <template v-slot:body>
                                    Anda yakin untuk mengubah status menjadi
                                    <span class="text-green-600">processed</span>?
                                </template>
                            </save-modal>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="grid grid-flow-col auto-cols-auto">
            <div>
                <p>Show {{ showInfo.from }} to {{ showInfo.to }} of {{ showInfo.of }}</p>
            </div>
            <div class="flex justify-end btn-group">
                <button
                    class="btn bg-white border-green-500 text-black hover:bg-green-500 hover:text-white hover:border-green-500"
                    @click.prevent="changePage(1)">First</button>
                <button
                    class="btn bg-white border-green-500 text-black hover:bg-green-500 hover:text-white hover:border-green-500"
                    v-for="sp in showPagination" :key="sp" :class="{
                        'bg-green-500': sp == currentPage,
                        'text-white': sp == currentPage,
                    }" @click.prevent="changePage(sp)">{{ sp }}</button>
                <button
                    class="btn bg-white border-green-500 text-black hover:bg-green-500 hover:text-white hover:border-green-500"
                    @click.prevent="changePage(allPages)">Last</button>
            </div>

        </div>
    </div>


</template>

<script>
import { $array } from 'alga-js';
export default {
    emits: ['changeStatus'],
    props: {
        entries: {
            type: Array,
            required: true,
        },
        currentTab: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            showEntries: [5, 10, 20, 30, 40, 50, 100],
            showedEntries: 5,
            filteredEntries: [],
            currentPage: 1,
            positionOfEllipsis: 1,
            searchInput: '',
            searchEntries: [],
        }
    },
    computed: {
        tableHeader() {
            return this.columns || [];
        },
        allPages() { // buat nampilin ada berapa page
            const getCurrentEntries = this.searchEntries.length <= 0 ? this.entries : this.searchEntries;
            return $array.pages(getCurrentEntries, this.showedEntries);
        },
        tableData() { // buat filter data sesuai entries
            if (this.entries) {
                return $array.paginate(this.entries, this.currentPage, this.showedEntries);
            }
            return [];
        },
        showInfo() {
            const getCurrentEntries = this.searchEntries.length <= 0 ? this.entries : this.searchEntries;
            return $array.show(getCurrentEntries, this.currentPage, this.showedEntries);
        },
        showPagination() {
            return $array.pagination(this.allPages, this.currentPage, this.positionOfEllipsis);
        }
    },
    methods: {
        paginateEntries(page) {
            this.currentPage = page;
            if (this.searchInput.length >= 3) {
                this.searchEntries = $array.search(this.entries, this.searchInput);
                this.filteredEntries = $array.paginate(this.searchEntries, this.currentPage, this.showedEntries);
            } else {
                this.searchEntries = [];
                this.filteredEntries = $array.paginate(this.entries, this.currentPage, this.showedEntries);
            }
        },
        changePage(page) {
            this.paginateEntries(page);
        },
        searchEvent() {
            this.paginateEntries(1);
        },
        async changeStatusToPending(id) {
            try {
                await this.changeStatus(id, "pending");
            } catch (error) {
                this.turnOnAlert(false);
            }
        },
        async changeStatusToProcessed(id) {
            try {
                await this.changeStatus(id, "processed");
            } catch (error) {
                this.turnOnAlert(false);
            }
        },
        async changeStatusToCancelled(id) {
            try {
                await this.changeStatus(id, "cancelled");
            } catch (error) {
                this.turnOnAlert(false);
            }
        },
        async changeStatus(id, status) {
            try {
                await this.$store.dispatch("feedbackApp/updateFeedbackAppById", {
                    id: id,
                    status: status,
                });
                // await this.loadAllFeedbackApp();
                // this.turnOnAlert(true);
                this.$emit('changeStatus', true, status);
            } catch (error) {
                // this.turnOnAlert(false);
                this.$emit('changeStatus', true, status);
            }
        },
    },
    created() {
        this.paginateEntries(1);
    }
}

</script>

<style scoped>
.green-kiri-active {
    background-color: #39ac00;
    color: white;
}
</style>
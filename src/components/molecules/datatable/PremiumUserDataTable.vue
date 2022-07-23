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
            <table class="table-fixed w-full" id="myTable">
                <!-- head -->
                <thead class="bg-gray-100 font-bold text-xs leading-4 uppercase align-middle">
                    <tr>
                        <td class="p-4 rounded-l-lg">User ID</td>
                        <td class="p-4">Nama</td>
                        <td class="p-4">No HP</td>
                        <td class="p-4">Payment Date</td>
                        <td class="p-4">From</td>
                        <td class="p-4">To</td>
                        <td class="p-4">Status</td>
                        <td class="p-4 rounded-r-lg">Action</td>
                    </tr>
                </thead>
                <tbody class="align-top">
                    <tr v-if="filteredEntries.length < 1">
                        <td colspan="8" class="text-center text-gray-500 p-4">
                            Tidak ada premium user yang terdaftar
                        </td>
                    </tr>
                    <tr v-else v-for="premiumUser in filteredEntries" :key="premiumUser.id">
                        <td class="p-4 border-b border-gray-50">{{ premiumUser.user_id }}</td>
                        <td class="p-4 border-b border-gray-50">{{ premiumUser.user.name }}</td>
                        <td class="p-4 border-b border-gray-50">{{ premiumUser.user.phone_number }}</td>
                        <td class="p-4 border-b border-gray-50">{{ premiumUser.payment_date }}</td>
                        <td class="p-4 border-b border-gray-50">{{ premiumUser.from }}</td>
                        <td class="p-4 border-b border-gray-50">{{ premiumUser.to }}</td>
                        <td class="p-4 border-b border-gray-50">
                            <div class="badge badge-lg" :class="{
                                'badge-success': premiumUser.to > todayDate,
                                'badge-warning': premiumUser.to < todayDate,
                            }">{{ premiumUser.to > todayDate ? 'Active' : 'Expired' }}</div>
                        </td>
                        <td class="p-4 border-b border-gray-50">
                            <router-link :to="{
                                name: 'update premium user',
                                params: {
                                    id: premiumUser.id,
                                },
                            }">
                                <font-awesome-icon icon="pen-square" class="text-lg text-blue-600 ml-2" />
                            </router-link>

                            <delete-modal :id="premiumUser.id" @deleteButtonClicked="deleteButtonClicked">
                                <template v-slot:default>
                                    <font-awesome-icon icon="trash" class="text-lg text-red-600 ml-2" />
                                </template>
                                <template v-slot:title> Hapus Premium User? </template>
                                <template v-slot:body>
                                    Anda yakin untuk menghapus Premium User yang dipilih?
                                </template>
                            </delete-modal>
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
import moment from 'moment';

export default {
    emits: ['deleteButtonClicked'],
    props: {
        entries: {
            type: Array,
            required: true,
        },
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
            todayDate: moment().format("yyyy-MM-D")
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
            if (typeof page === 'number') {
                this.paginateEntries(page);
            }
        },
        searchEvent() {
            this.paginateEntries(1);
        },
        async deleteButtonClicked(id) {
            try {
                await this.$store.dispatch("premiumUser/deletePremiumUserById", {
                    id: id,
                });

                await this.$store.dispatch("premiumUser/getAllPremiumUser");
                const premiumUser = this.$store.getters["premiumUser/getAllPremiumUser"];

                this.filteredEntries = $array.paginate(premiumUser, this.currentPage, this.showedEntries);
                this.$emit('deleteButtonClicked', 'delete', true);
            } catch (error) {
                this.$emit('deleteButtonClicked', 'delete', false);
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
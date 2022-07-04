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
            <table class="table w-full" id="myTable">
                <!-- head -->
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Nama</th>
                        <th>No HP</th>
                        <th>Payment Date</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="filteredEntries.length < 1">
                        <td colspan="100%" class="text-center text-gray-500">
                            Tidak ada premium user yang terdaftar
                        </td>
                    </tr>
                    <tr v-else v-for="premiumUser in filteredEntries" :key="premiumUser.id">
                        <td>{{ premiumUser.user_id }}</td>
                        <td>{{ premiumUser.user.name }}</td>
                        <td>{{ premiumUser.user.phone_number }}</td>
                        <td>{{ premiumUser.payment_date }}</td>
                        <td>{{ premiumUser.from }}</td>
                        <td>{{ premiumUser.to }}</td>
                        <td>
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
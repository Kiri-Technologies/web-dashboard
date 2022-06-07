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
                        <td>Nama Pemilik</td>
                        <td>Plat Nomor</td>
                        <td>Nomor HP Owner</td>
                        <td>Trayek Angkot</td>
                        <td>Email</td>
                        <td v-if="currentTab == 'pending'">Action</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="filteredEntries.length < 1">
                        <td colspan="100%" class="text-center text-gray-500">
                            Angkot {{ currentTab }} tidak ditemukan
                        </td>
                    </tr>
                    <tr v-else v-for="angkot in filteredEntries" :key="angkot.id">
                        <td>{{ angkot.user_owner.name }}</td>
                        <td>{{ angkot.plat_nomor }}</td>
                        <td>{{ angkot.user_owner.phone_number }}</td>
                        <td>
                            {{ angkot.route.titik_awal }} - {{ angkot.route.titik_akhir }}
                        </td>
                        <td>{{ angkot.user_owner.email }}</td>
                        <td v-if="currentTab == 'pending'">
                            <button @click="updateStatusAngkot(angkot.id, 'approved')">
                                <font-awesome-icon icon="check-square" class="text-lg text-green-600" />
                            </button>

                            <button @click="updateStatusAngkot(angkot.id, 'declined')">
                                <font-awesome-icon icon="window-close" class="text-lg text-red-600 ml-2" />
                            </button>
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
    emits: ['updateStatusAngkot'],
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
        async updateStatusAngkot(id, status) {
            try {
                await this.$store.dispatch("angkot/updateStatusAngkot", { id, status });
                this.$emit('updateStatusAngkot', `Berhasil update status angkot menjadi ${status}`, true);
            } catch (error) {
                this.turnOnAlert(error.message, false);
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
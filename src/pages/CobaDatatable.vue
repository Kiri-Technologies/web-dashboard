<template>
    <data-table :columns="columns" :entries="entries"></data-table>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                {
                    name: 'id', text: 'ID'
                },
                {
                    name: 'name', text: 'name'
                },
                {
                    name: 'position', text: 'position'
                },
                {
                    name: 'office', text: 'office'
                },
            ],
            entries: [
                {
                    id: 1,
                    name: 'Tiger Nixon',
                    position: 'System Architect',
                    office: 'Edinburgh',
                },
                {
                    id: 2,
                    name: 'Garrett Winters',
                    position: 'Accountant',
                    office: 'Tokyo',
                },
                {
                    id: 3,
                    name: 'Ashton Cox',
                    position: 'Junior Technical Author',
                    office: 'San Francisco',
                },
                {
                    id: 4,
                    name: 'Andre',
                    position: 'Pelawak',
                    office: 'Jakarta',
                },
                {
                    id: 5,
                    name: 'Komeng',
                    position: 'Supir',
                    office: 'Bandung',
                },
                {
                    id: 6,
                    name: 'Sule',
                    position: 'Penyanyi',
                    office: 'Depok',
                },
                {
                    id: 7,
                    name: 'Wahyu',
                    position: 'Wibu',
                    office: 'Semarang',
                },
                {
                    id: 8,
                    name: 'Adul',
                    position: 'MC',
                    office: 'Klaten',
                },
                {
                    id: 9,
                    name: 'Jokowi',
                    position: 'Presiden',
                    office: 'Solo',
                },
                {
                    id: 10,
                    name: 'Soekarno',
                    position: 'Presiden',
                    office: 'Jakarta',
                },
                {
                    id: 11,
                    name: 'Tiger Nixon',
                    position: 'System Architect',
                    office: 'Edinburgh',
                },
                {
                    id: 12,
                    name: 'Garrett Winters',
                    position: 'Accountant',
                    office: 'Tokyo',
                },
                {
                    id: 13,
                    name: 'Ashton Cox',
                    position: 'Junior Technical Author',
                    office: 'San Francisco',
                },
                {
                    id: 14,
                    name: 'Andre',
                    position: 'Pelawak',
                    office: 'Jakarta',
                },
                {
                    id: 15,
                    name: 'Komeng',
                    position: 'Supir',
                    office: 'Bandung',
                },
                {
                    id: 16,
                    name: 'Sule',
                    position: 'Penyanyi',
                    office: 'Depok',
                },
                {
                    id: 17,
                    name: 'Wahyu',
                    position: 'Wibu',
                    office: 'Semarang',
                },
                {
                    id: 18,
                    name: 'Adul',
                    position: 'MC',
                    office: 'Klaten',
                },
                {
                    id: 19,
                    name: 'Jokowi',
                    position: 'Presiden',
                    office: 'Solo',
                },
                {
                    id: 20,
                    name: 'Soekarno',
                    position: 'Presiden',
                    office: 'Jakarta',
                },
                {
                    id: 21,
                    name: 'Tiger Nixon',
                    position: 'System Architect',
                    office: 'Edinburgh',
                },
                {
                    id: 22,
                    name: 'Garrett Winters',
                    position: 'Accountant',
                    office: 'Tokyo',
                },
                {
                    id: 23,
                    name: 'Ashton Cox',
                    position: 'Junior Technical Author',
                    office: 'San Francisco',
                },
                {
                    id: 24,
                    name: 'Andre',
                    position: 'Pelawak',
                    office: 'Jakarta',
                },
                {
                    id: 25,
                    name: 'Komeng',
                    position: 'Supir',
                    office: 'Bandung',
                },
                {
                    id: 26,
                    name: 'Sule',
                    position: 'Penyanyi',
                    office: 'Depok',
                },
                {
                    id: 27,
                    name: 'Wahyu',
                    position: 'Wibu',
                    office: 'Semarang',
                },
                {
                    id: 28,
                    name: 'Adul',
                    position: 'MC',
                    office: 'Klaten',
                },
                {
                    id: 29,
                    name: 'Jokowi',
                    position: 'Presiden',
                    office: 'Solo',
                },
                {
                    id: 30,
                    name: 'Soekarno',
                    position: 'Presiden',
                    office: 'Jakarta',
                },
                {
                    id: 31,
                    name: 'Tiger Nixon',
                    position: 'System Architect',
                    office: 'Edinburgh',
                },
                {
                    id: 32,
                    name: 'Garrett Winters',
                    position: 'Accountant',
                    office: 'Tokyo',
                },
                {
                    id: 33,
                    name: 'Ashton Cox',
                    position: 'Junior Technical Author',
                    office: 'San Francisco',
                },
                {
                    id: 34,
                    name: 'Andre',
                    position: 'Pelawak',
                    office: 'Jakarta',
                },
                {
                    id: 35,
                    name: 'Komeng',
                    position: 'Supir',
                    office: 'Bandung',
                },
                {
                    id: 36,
                    name: 'Sule',
                    position: 'Penyanyi',
                    office: 'Depok',
                },
                {
                    id: 37,
                    name: 'Wahyu',
                    position: 'Wibu',
                    office: 'Semarang',
                },
                {
                    id: 38,
                    name: 'Adul',
                    position: 'MC',
                    office: 'Klaten',
                },
                {
                    id: 39,
                    name: 'Jokowi',
                    position: 'Presiden',
                    office: 'Solo',
                },
                {
                    id: 40,
                    name: 'Soekarno',
                    position: 'Presiden',
                    office: 'Jakarta',
                },
                {
                    id: 41,
                    name: 'Tiger Nixon',
                    position: 'System Architect',
                    office: 'Edinburgh',
                },
                {
                    id: 42,
                    name: 'Garrett Winters',
                    position: 'Accountant',
                    office: 'Tokyo',
                },
                {
                    id: 43,
                    name: 'Ashton Cox',
                    position: 'Junior Technical Author',
                    office: 'San Francisco',
                },
                {
                    id: 44,
                    name: 'Andre',
                    position: 'Pelawak',
                    office: 'Jakarta',
                },
                {
                    id: 45,
                    name: 'Komeng',
                    position: 'Supir',
                    office: 'Bandung',
                },
                {
                    id: 46,
                    name: 'Sule',
                    position: 'Penyanyi',
                    office: 'Depok',
                },
                {
                    id: 47,
                    name: 'Wahyu',
                    position: 'Wibu',
                    office: 'Semarang',
                },
                {
                    id: 48,
                    name: 'Adul',
                    position: 'MC',
                    office: 'Klaten',
                },
                {
                    id: 49,
                    name: 'Jokowi',
                    position: 'Presiden',
                    office: 'Solo',
                },
                {
                    id: 50,
                    name: 'Soekarno',
                    position: 'Presiden',
                    office: 'Jakarta',
                },
            ]
        }
    }
}
</script>
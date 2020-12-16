<template>
    <div>
        <h1>Edit Necessity</h1>
        <form class="custom-form" v-on:submit.prevent="onSubmit">
             <div class="form-group">
                <label for="category">Category</label>
                <input v-model="nest.category" type="text" class="form-control" id="category" name="category" placeholder="Category" />
            </div>
            <div class="form-group">
                <label for="item">Item</label>
                <input v-model="nest.item" type="text" class="form-control" id="item" name="item" placeholder="Item" />
            </div>
             <div class="form-group">
                <label for="brand">Brand</label>
                <input v-model="nest.brand" type="text" class="form-control" id="brand" name="brand" placeholder="Brand" />
            </div>
             <div class="form-group">
                <label for="qty">Quantity</label>
                <input v-model="nest.qty" type="text" class="form-control" id="qty" name="qty" placeholder="Quantity" />
            </div>
             <div class="form-group">
                <label for="size">Size</label>
                <input v-model="nest.size" type="text" class="form-control" id="size" name="size" placeholder="Size" />
            </div>
             <div class="form-group">
                <label for="settime">Set time</label>
                <input v-model="nest.settime" type="text" class="form-control" id="settime" name="settime" placeholder="Set time" />
            </div>

            <div class="form-group">
                <label for="body">Body</label>
                <textarea placeholder="Body" class="form-control" v-model="nest.body" name="body" id="body" cols="30" rows="10"></textarea>
            </div>
            <div class="form-group">
                <label for="due-date">Due Date</label>
                <input name="due-date" v-model="nest.dueDate" type="date" class="form-control" id="due-date" placeholder="Due Date" />
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-secondary">Save Changes</button>
            </div>
        </form>
    </div>
</template>

<script>
    import * as nestService from '../../services/NestService'
    import moment from 'moment';

    export default {
        name: 'nests-edit',
        data: function() {
            return {
                nest: {
                     category: '',
                    item: '',
                    size: '',
                    qty: '',
                    brand: '',
                    settime: '',
                    body: '',
                    dueDate: ''
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            nestService.getNestById(to.params.id)
                .then(response => {
                    if (!response) {
                        next('/nests');
                    } else {
                        next(vm => {
                            const nest = response.data.nest;
                            nest.dueDate = moment(nest.dueDate).format('YYYY-MM-DD');
                            vm.nest = nest;
                        })
                    }
                });
        },
        methods: {
            onSubmit: async function() {
                const request = {
                    nest: this.nest
                }
                await nestService.updateNest(request);
                this.$router.push({ name: 'nests-all' });
            }
        }
    }
</script>
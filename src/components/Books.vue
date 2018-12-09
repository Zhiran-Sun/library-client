<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="books" :options="options">
        <a slot="upvote" slot-scope="props" class="fa fa-thumbs-up fa-2x" @click="upvote(props.row._id)"></a>
        <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editBook(props.row._id)"></a>
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteBook(props.row._id)"></a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import BookService from '@/services/BookService'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Books',
  data () {
    return {
      messagetitle: ' Books List ',
      books: [],
      props: ['_id'],
      errors: [],
      columns: ['_id', 'book_name', 'author', 'publishing', 'status', 'upvotes', 'upvote', 'edit', 'remove'],
      options: {
        perPage: 10,
        filterable: ['book_name', 'author', 'publishing', 'status', 'upvotes'],
        sortable: ['upvotes'],
        headings: {
          _id: 'ID',
          book_name: 'Book Name',
          author: 'Author',
          publishing: 'Book Press',
          status: 'Status',
          upvotes: 'Upvotes'
        }
      }
    }
  },
  // Fetches Donations when the component is created.
  created () {
    this.loadBooks()
  },
  methods: {
    loadBooks: function () {
      BookService.fetchBooks()
        .then(response => {
          // JSON responses are automatically parsed.
          this.books = response.data
          console.log(this.books)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    upvote: function (id) {
      BookService.upvoteBook(id)
        .then(response => {
          // JSON responses are automatically parsed.
          this.loadBooks()
          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    editBook: function (id) {
      this.$router.params = id
      this.$router.push('editBook')
    },
    deleteBook: function (id) {
      this.$swal({
        title: 'Are you totaly sure?',
        text: 'You can\'t Undo this action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete it',
        cancelButtonText: 'Cancel',
        showCloseButton: true
        // showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result.value)
        if (result.value === true) {
          BookService.deleteBook(id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              console.log(this.message)
              this.loadBooks()
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal('Deleted', 'You successfully deleted this Book ' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          console.log('SWAL Else Result : ' + result.value)
          this.$swal('Cancelled', 'Your Book still Counts!', 'info')
        }
      })
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>

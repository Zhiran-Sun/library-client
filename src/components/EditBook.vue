<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <template v-if="childDataLoaded">
            <book-form :book="book" bookBtnTitle="Update Book"
                           @book-is-created-updated="updateBook"></book-form>
          </template>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
import BookService from '@/services/BookService'
import BookForm from '@/components/BookForm'

export default {
  data () {
    return {
      book: {},
      childDataLoaded: false,
      temp: {},
      messagetitle: ' Update Book '
    }
  },
  components: {
    'book-form': BookForm
  },
  created () {
    this.getBook()
  },
  methods: {
    getBook: function () {
      BookService.fetchBook(this.$router.params)
        .then(response => {
          this.temp = response.data
          this.book = this.temp[0]
          this.childDataLoaded = true
          console.log('Getting Book in Edit: ' + JSON.stringify(this.book, null, 5))
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    updateBook: function (book) {
      console.log('Before PUT ' + JSON.stringify(book, null, 5))
      BookService.putBook(this.$router.params, book)
        .then(response => {
          console.log(response)
          console.log('AFTER PUT ' + JSON.stringify(book, null, 5))
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>

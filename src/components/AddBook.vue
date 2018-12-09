<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <book-form :book="book" bookBtnTitle="Add Book"
                         @book-is-created-updated="submitBook"></book-form>
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
      book: {book_name: '', author: '', publishing: ''},
      messagetitle: ' Add Book '
    }
  },
  components: {
    'book-form': BookForm
  },
  methods: {
    submitBook: function (book) {
      BookService.postBook(book)
        .then(response => {
          console.log(response)
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

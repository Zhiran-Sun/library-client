<template>
  <form @submit.prevent="submit">
    <div class="form-group" :class="{ 'form-group--error': $v.book_name.$error }">
      <label class="form__label">Book Name</label>
      <input class="form__input" placeholder="enter book name here" v-model.trim="$v.book_name.$model"/>
    </div>
    <div class="error" v-if="!$v.book_name.required">Book name is Required</div>
    <div class="form-group" :class="{ 'form-group--error': $v.author.$error }">
      <label class="form__label">Book Author</label>
      <input class="form__input" placeholder="enter book author here" v-model.trim="$v.author.$model"/>
    </div>
    <div class="error" v-if="!$v.author.required">Author is Required</div>
    <div class="form-group" :class="{ 'form-group--error': $v.publishing.$error }">
      <label class="form__label">Book Press</label>
      <input class="form__input" placeholder="enter book press here" v-model.trim="$v.publishing.$model"/>
    </div>
    <div class="error" v-if="!$v.publishing.required">Press is Required</div>
    <p>
      <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">{{ bookBtnTitle }}</button>
    </p>
    <p>
      <a href="#/books" class="btn btn-primary btn1" role="button">Manage Books</a>
    </p>
    <p class="typo__p" v-if="submitStatus === 'OK'">Successfully added!</p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
    <p class="typo__p" v-if="submitStatus === 'PENDING'">Adding...</p>
  </form>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)

export default {
  name: 'FormData',
  props: ['bookBtnTitle', 'book'],
  data () {
    return {
      messagetitle: ' Add book ',
      book_name: this.book.book_name,
      author: this.book.author,
      publishing: this.book.publishing,
      upvotes: 0,
      status: true,
      submitStatus: null
    }
  },
  validations: {
    book_name: {
      required
    },
    author: {
      required
    },
    publishing: {
      required
    }
  },
  methods: {
    submit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          var book = {
            book_name: this.book_name,
            author: this.author,
            publishing: this.publishing,
            upvotes: this.upvotes,
            status: this.status
          }
          this.book = book
          console.log('Submitting in BookForm : ' +
            JSON.stringify(this.book, null, 5))
          this.$emit('book-is-created-updated', this.book)
        }, 500)
      }
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .book-form .form-control-label.text-left{
    text-align: left;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>

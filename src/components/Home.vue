<template>
  <div class="hero">
    <h1 class="vue-title">My Library System </h1>

    <table align="center">
      <tr>
        <td>
          <p class="lead"><b><i>It's a choice to visit our library~~</i></b>
          <p>You can view books, add books, edit books, delete books and so on.</p>
          <p> <a href ="#/addBook">Go</a> and have fun!</p>
          <p>First you need to add a new book.</p>
        </td>
        <td>
          <img src="../assets/libraryLogo.jpg" alt="Library logo here" />
        </td>
      </tr>
    </table>

    <p></p>
    <p class="lead">This is the homepage of my <b>LIBRARY</b> System Test</p>
  </div>
</template>

<style>
  .hero {
    height: 100vh;
    margin-top: 30px;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .hero .lead {
    font-weight: 200;
    font-size: 2.5rem;
  }
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
  .vue-title {
    font-size: 70pt;
    margin-bottom: 10px;
  }
</style>

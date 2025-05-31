use plp_bookstore;
db.books.insertMany(
[
  {
  title: "The Lord of the Rings",
  author: "J.R.R. Tolkien",
  genre: "Fantasy",
  published_year: 1954,
  price: 19.99,
  in_stock: true,
  pages: 1176,
  publisher: "Allen & Unwin"
},

    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      published_year: 1937,
      price: 16.99,
      in_stock: true,
      pages: 310,
      publisher: "Allen & Unwin"
    },
{
  title: "The Two Towers",
  author: "J.R.R. Tolkien",
  genre: "Fantasy",
  published_year: 1954,
  price: 19.99,
  in_stock: true,
  pages: 1176,
  publisher: "Allen & Unwin"
},
{
  title: "The Fellowship of the Ring",
  author: "J.R.R. Tolkien",
  genre: "Fantasy",
  published_year: 1954,
  price: 19.99,
  in_stock: true,
  pages: 1176,
  publisher: "Allen & Unwin"
},
{
  title: "The Silmarillion",
  author: "J.R.R. Tolkien",
  genre: "Fantasy",
  published_year: 1954,
  price: 19.99,
  in_stock: true,
  pages: 1176,
  publisher: "Allen & Unwin"
},
{
  title: "The Return of the King",
  author: "J.R.R. Tolkien",
  genre: "Fantasy",
  published_year: 1954,
  price: 19.99,
  in_stock: true,
  pages: 1176,
  publisher: "Allen & Unwin"
},
{
  title: "The Children of Hurin",
  author: "J.R.R. Tolkien",
  genre: "Fantasy",
  published_year: 1954,
  price: 19.99,
  in_stock: true,
  pages: 1176,
  publisher: "Allen & Unwin"},
  {
    title: "The Silmarillion",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1176,
    publisher: "Allen & Unwin"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1937,
    price: 16.99,
    in_stock: true,
    pages: 310,
    publisher: "Allen & Unwin"
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1176,
    publisher: "Allen & Unwin"
  }






























]











)
//2.b
db.books.find({genre:"J.R.R. Tolkien"}).pretty()
//2.c
db.books.find({ published_year: 1937 }).pretty()
//2.d
db.books.find({author: "J.R.R. Tolkien"}).pretty()
//2.e

db.books.updateMany({title: "The Hobbit"}, {$set: {price: 20.99}})
db.books.find({title: "The Hobbit"}).pretty()
//2.f
db.books.deleteOne({title: "The Hobbit"})
db.books.find({title: "The Hobbit"}).pretty()
//task3
//3.a
db.books.find({} ,{published_year:{$gt:2010},in_stock:{$eq:true}}).pretty()
//3.b
db.books.find({},{title:1,author:1})
//3.c1
db.books.find({},{title:1,author:1,price:1}).sort({price:1})
//3.c2
db.books.find({},{price:1,author:1,title:1}).sort({price:-1})
//3.d
db.books.find({},{title:1,author:1,price:1}).sort({price:-1}).skip(5).limit(5)
db.books.find({},{title:1,author:1,price:1}).sort({author:-1}).skip(5).limit(5)
//4.a
db.books.aggregate([{$group:{_id:"$genre",average_price:{$avg:"$price"}}}])
//4.b
db.books.aggregate([
  {
    $group: {
      _id: "$author",         // Group by author
      totalBooks: { $sum: 1 } // Count each book as 1
    }
  },
  {
    $sort: { totalBooks: -1 } // Sort authors by book count (descending)
  },
  {
    $limit: 1                 // Show only the top author
  }
])
//4.c
db.books.aggregate([
  {
    $project: {
      decade: { $subtract: [ "$publishedYear", { $mod: [ "$publishedYear", 10 ] } ] }
    }
  },
  {
    $group: {
      _id: "$decade",
      totalBooks: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 } // Sort decades from oldest to newest
  }
])
//question 5
db.books.createIndex({ title: 1 })
//5.b
db.books.createIndex({ author: 1, published_year: 1 })
//5.c
db.books.find({ author: "Chinua Achebe", published_year: 1958 }).explain("executionStats")

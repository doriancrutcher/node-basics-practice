const express = require("express");
const app = express();
let { people, products, employees } = require("./data");
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get("/", (req, res) => {
  res.status(200).send("<h1>Home</h1>");
  console.log(people);
});

app.get("/api/people/:name?", (req, res) => {
  const name = req.params.name;
  if (name) {
    const sortedPeople = people.filter((person) => {
      return person.name === name;
    });

    if (sortedPeople.length > 0) {
      res.status(200).json({ success: true, data: sortedPeople });
    } else {
      res.status(404).json({ success: false, message: "No name found" });
    }
  } else {
    res.status(200).json({ success: true, data: people });
  }
});

//   products: [
//     { id: 101, name: 'Product A', price: 20.99 },
//     { id: 102, name: 'Product B', price: 15.49 },
//     { id: 103, name: 'Product C', price: 10.99 },
//     // Add more products as needed
//   ]
app.get("/api/products/:id?/", (req, res) => {
    let id = req.params.id;
    let filteredProducts = products;
  
    if (id) {
      filteredProducts = products.filter((product) => product.id === Number(id));
    }
  
    if (filteredProducts.length > 0) {
      res.status(200).json({ success: true, data: filteredProducts });
    } else {
      res.status(404).json({ success: false, message: "Not Found" });
    }
  });

  app.post('/api/postme',(req, res) => {
    console.log(req.body);
    res.send('info posted');
    
  })
  
  

app.listen(5001, () => {
  console.log("express server started on port 5001...");
});


const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()
 
var Publishable_Key = 'pk_test_51NLgCEEDE4HTgQxBAEEqW5gfjws96FfJAnZGgZV0OvR1Y2ga8rzgLgJwOgg9RPk61RlB3OmhXEBiR0eg3baKoDsv00Ica8yMeu'
var Secret_Key = 'sk_test_51NLgCEEDE4HTgQxBdTHyHJuvrQzvD6VGjzOewQzlYswRojahm802vVsAV30dBvKX1iakzr0t0J78Fu4evGsdj0JQ00DERdUhQV'
 
const stripe = require('stripe')(Secret_Key)
 
const PORT = process.env.PORT || 3002
 
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
 
// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
 
app.get('/', function(req, res){
    res.render('Home', {
       key: Publishable_Key
    })
})
 
app.post('/payment', function(req, res){
 
    // Moreover you can take more details from user
    // like Address, Name, etc from form
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: ' Abel Makkonen Tesfaye',
          address: {
            line1: 'street number 5',
            postal_code: '33800',
            city: 'pokhara',
            country: 'nepal',
        }
    })
    .then((customer) => {
 
        return stripe.charges.create({
            amount: 5000,     // Charging $40
            description: 'Hotel booking payment',
            currency: 'usd',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.send("Success")  // If no error occurs
    })
    .catch((err) => {
        res.send(err)       // If some error occurs
    });
})
 
app.listen(PORT, function(error){
    if(error) throw error
    console.log("Server created Successfully")
})
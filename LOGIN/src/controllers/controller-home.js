const config = require('../config/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    home(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                'SELECT petugas,DATE_FORMAT(wktlogin, "%Y-%m-%d") as tanggal, jenisk, count(*) as jumlah_kendaraan, count(NULLIF(tarif,0)) as bayar, SUM(tarif) as total, SUM(tiketmasalah) AS minus, COUNT(NULLIF(tiketmasalah,0)) as masalah FROM keluar GROUP BY petugas, jenisk, Date(wktlogin) ORDER BY Date(wktlogin) asc'
                , function (err, rows) {
            // if (err) {
            //     req.flash('error', err);
            //     res.render('home', {
            //         data: ''
            //     });
            // } else {
                //render ke view posts index
                // res.render("home", {
                //     userName: req.session.username,
                //     data: rows ,// <-- data posts
                // });
            // }

            res.render("home",{
                    url: 'http://localhost:5050/',
                    userName: req.session.username,
                    data: rows,
                });
        });
        });
        // res.render("home",{
        //     url: 'http://localhost:5050/',
        //     userName: req.session.username,
        // });
    }
}
var TelegramBot = require('node-telegram-bot-api');
var token = '1349714520:AAH4CXzrim2LpWgj4xOpeAtivTr70pR4E2I';
var bot = new TelegramBot(token, {polling:true});
var request = require('request');

process.on('uncaughtException', function (error) {
	console.log("\x1b[31m", "Exception: ", error, "\x1b[0m");
});
process.on('unhandledRejection', function (error, p) {
	console.log("\x1b[31m","Error: ", error.message, "\x1b[0m");
});


bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, `Selamat Datang di Bot PDAM Padang Unofficial\n
Bot ini tidak resmi dari PDAM Padang dan ditujukan untuk warga kota padang untuk melihat tagihan secara mudah dengan telegram
    
/cektagihan#xx.xxx.xxx (untuk melihat tagihan)
/cekrincian#xx.xxx.xxx (untuk melihat rincian tagihan)
/help (untuk melihat cara penggunaan bot)
/donasi (untuk donasi ke pembuat agar bot dapat selalu aktif)
/caradonasi (cara donasi)
/kontak (live chat dengan pembuat bot)
`,{
"reply_markup": {
    "keyboard": [["/donasi", "/caradonasi"],   ["/kontak"], ["/help"]]
    }
});
        
});

bot.onText(/\/help/, (msg) => {

    bot.sendMessage(msg.chat.id, `Cara Penggunaan Bot :\n
/cektagihan#xx.xxx.xxx (untuk melihat tagihan)
/cekrincian#xx.xxx.xxx (untuk melihat rincian tagihan)
        
Note : xx.xxx.xxx <- Kode Pelanggan (Wajib menggunakan titik(.))
    
Contoh : /cektagihan#00.000.000

Untuk Menu Lainnya : 

/help (untuk melihat cara penggunaan bot)
/donasi (untuk donasi ke pembuat agar bot dapat selalu aktif)
/caradonasi (cara donasi)
/kontak (live chat dengan pembuat bot)
`,{
    "reply_markup": {
        "keyboard": [["/donasi", "/caradonasi"],   ["/kontak"], ["/help"]]
        }
    });
            
});
 

bot.onText(/\/donasi/, (msg) => {

    bot.sendMessage(msg.chat.id, `Terima Kasih Telah Berkontribusi Untuk Bot ini Dengan Berdonasi\n
Link Donasi : https://trakteer.id/bloodlineinv

/caradonasi (cara donasi)
/help (untuk melihat cara penggunaan bot)
`);
            
});

bot.onText(/\/caradonasi/, (msg) => {

    bot.sendMessage(msg.chat.id, `Cara Berdonasi :\n
1. Buka Link Donasi pada Browser : https://trakteer.id/bloodlineinv
2. Klik Tombol Trakteer
3. Masukkan Jumlah Cendol (Donasi) yang Ingin Diberikan
4. Masukkan Nama dan Pesan
5. Pilih Metode Pembayaran (Gopay,OVO,Dana,LinkAja,TransferBank)
6. Pilih Sekali (Tip) / Setiap Bulan
7. Klik Tombol Lanjutkan
8. Dan Ikuti Tahap Selanjutnya Sesuai Dengan Metode Pembayaran yang Dipilih

/donasi (link donasi)
/help (untuk melihat cara penggunaan bot)
`);
            
});

bot.onText(/\/kontak/, (msg) => {

    bot.sendMessage(msg.chat.id, `Live Chat Dengan Pembuat Bot\n
Telegram : https://t.me/bloodlineinv

/donasi (link donasi)
/caradonasi (cara donasi)
/help (untuk melihat cara penggunaan bot)
`);
            
});


bot.onText(/\/cekrincian#(.+)/, function(msg,match){
    var cekRincian = match[1];
    var chatId = msg.chat.id;
    var options = {
        'method': 'GET',
        'url': `http://mobile.pdampadang.co.id:8082/new_mobilepdampdg/apiservice/index.php/mobile/Pelanggan/getTagihanRekening?kodepelanggan=${cekRincian}`,
        'headers': {
          'CLIENT-TOKEN': 'eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQREFNIFBBREFORyBBUEkgdi4xLjAiLCJpYXQiOjE2MDk2ODExMDAsImF1ZCI6IlBEQU0gS09UQSBQQURBTkciLCJpZF91c2VyIjoiMTY0MCIsImVtYWlsIjoibXVoYW1tYWRuYWppYmludkBnbWFpbC5jb20iLCJuYW1hIjoiS3UgUm9ja3MiLCJwaG90b19wcm9maWxlIjoiYW5kcm9pZC5yZXNvdXJjZTpcL1wvY29tLnBkYW1wYWRhbmcudG9tc1wvMjEzMTIzMTEyMiIsImlkcGVsYW5nZ2FuIjoiW3tcImlkeFwiOjEsXCJrb2RlcGVsYW5nZ2FuXCI6XCIwNS4xODYuMjI2XCJ9XSIsImlkcm9sZSI6IkEwLjEiLCJpcGFkZHJlcyI6IjExNC42LjIyNy4zMCJ9.dl_Mr7-OEnc-VXDBSW-eNDwhoHfuDjO7QXPMsehCn3o:'
        }
      };
  
    request(options, function (error, response,body) {
      if (error) throw new Error(error);
      bot.sendMessage(chatId, '_Mencari Kode Pelanggan _' + cekRincian + '... \n\nInformasi Jika Data Tidak Tampil : \n\n1. Server Bermasalah\n2. Tagihan Sudah Dibayar\n3. Kode Pelanggan Salah\n\nJika Kode Pelanggan Benar dan Tagihan Belum Dibayar, Mohon Ulangi Kirim \n/cekrincian#xx.xxx.xxx', {parse_mode:'Markdown'})
      .then(function(msg){ 
        let payload = JSON.parse(body)
        console.log(payload[0].nama)
        bot.sendPhoto(msg.chat.id,"https://trakteer.id/storage/images/avatar/ava-XQYbmWUvPQ0Xm0tRPHFk01Kgny0E7gYs1611621770.jpg",
        {caption: 'Info Tagihan PDAM Padang Unofficial :\n\nKode Pelanggan : ' + payload[0].kodepelanggan + 
        '\nNama Pelanggan : ' + payload[0].nama + 
        '\nAlamat : ' + payload[0].alamat + 
        '\nGolongan : ' + payload[0].kodegoltarif + 
        '\nBulan Tagihan : ' + payload[0].bulan + 
        '\nTahun Tagihan : ' + payload[0].tahun + 
        '\nMeter Awal : ' + payload[0].mawal + 
        '\nMeter Akhir : ' + payload[0].makhir + 
        '\nPemakaian : ' + payload[0].pemakaian + 
        ' m3\nMinimal Pemakaian Air : ' + payload[0].minpemakaianair +  
        ' m3\nHarga Air : Rp.' + payload[0].hargaair + 
        '\nDana Meter : Rp.' + payload[0].danameter + 
        '\nAdministrasi : Rp.' + payload[0].administrasi + 
        '\nSampah : Rp.' + payload[0].sampah + 
        '\nDenda : Rp.' + payload[0].denda + 
        '\nMaterai : Rp.' + payload[0].materai + 
        '\nDisisihkan : Rp.' + payload[0].disisihkan + 
        '\nTotal Tagihan : Rp.' + payload[0].total + 
        '\n\nBot ini tidak resmi dari PDAM Padang, dibuat oleh hamba allah. \n\nJika Ingin Berdonasi Klik Link : \nhttps://trakteer.id/bloodlineinv\n\n/help (untuk melihat cara penggunaan bot)' });
    })
    });
});

bot.onText(/\/cektagihan#(.+)/, function(msg,match){
    var cekTagihan = match[1];
    var chatId = msg.chat.id;
    var options = {
        'method': 'GET',
        'url': `http://mobile.pdampadang.co.id:8082/new_mobilepdampdg/apiservice/index.php/mobile/Pelanggan/getTagihanRekening?kodepelanggan=${cekTagihan}`,
        'headers': {
          'CLIENT-TOKEN': 'eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQREFNIFBBREFORyBBUEkgdi4xLjAiLCJpYXQiOjE2MDk2ODExMDAsImF1ZCI6IlBEQU0gS09UQSBQQURBTkciLCJpZF91c2VyIjoiMTY0MCIsImVtYWlsIjoibXVoYW1tYWRuYWppYmludkBnbWFpbC5jb20iLCJuYW1hIjoiS3UgUm9ja3MiLCJwaG90b19wcm9maWxlIjoiYW5kcm9pZC5yZXNvdXJjZTpcL1wvY29tLnBkYW1wYWRhbmcudG9tc1wvMjEzMTIzMTEyMiIsImlkcGVsYW5nZ2FuIjoiW3tcImlkeFwiOjEsXCJrb2RlcGVsYW5nZ2FuXCI6XCIwNS4xODYuMjI2XCJ9XSIsImlkcm9sZSI6IkEwLjEiLCJpcGFkZHJlcyI6IjExNC42LjIyNy4zMCJ9.dl_Mr7-OEnc-VXDBSW-eNDwhoHfuDjO7QXPMsehCn3o:'
        }
      };
  
    request(options, function (error, response,body) {
      if (error) throw new Error(error);
      bot.sendMessage(chatId, '_Mencari Kode Pelanggan _' + cekTagihan + '... \n\nInformasi Jika Data Tidak Tampil : \n\n1. Server Bermasalah\n2. Tagihan Sudah Dibayar\n3. Kode Pelanggan Salah\n\nJika Kode Pelanggan Benar dan Tagihan Belum Dibayar, Mohon Ulangi Kirim \n/cektagihan#xx.xxx.xxx', {parse_mode:'Markdown'})
      .then(function(msg){ 
        let payload = JSON.parse(body)
        console.log(payload[0].nama)
        bot.sendPhoto(msg.chat.id,"https://trakteer.id/storage/images/avatar/ava-XQYbmWUvPQ0Xm0tRPHFk01Kgny0E7gYs1611621770.jpg",
        {caption: 'Info Tagihan PDAM Padang Unofficial :\n\nKode Pelanggan : ' + payload[0].kodepelanggan + 
        '\nNama Pelanggan : ' + payload[0].nama + 
        '\nAlamat : ' + payload[0].alamat + 
        '\nBulan Tagihan : ' + payload[0].bulan + 
        '\nTahun Tagihan : ' + payload[0].tahun +
        '\nTotal Tagihan : Rp.' + payload[0].total + 
        '\n\nBot ini tidak resmi dari PDAM Padang, dibuat oleh hamba allah. \n\nJika Ingin Berdonasi Klik Link : \nhttps://trakteer.id/bloodlineinv\n\n/help (untuk melihat cara penggunaan bot)' });
    })
    });
});




// bot.onText(/\/cekhistory (.+)/, function(msg,match){
//     var cekHistory = match[1];
//     var chatId = msg.chat.id;
//     var options = {
//         'method': 'GET',
//         'url': `http://mobile.pdampadang.co.id:8082/new_mobilepdampdg/apiservice/index.php/mobile/Pelanggan/historyPelanggan?kodepelanggan=${cekHistory}`,
//         'headers': {
//           'CLIENT-TOKEN': 'eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQREFNIFBBREFORyBBUEkgdi4xLjAiLCJpYXQiOjE2MDk2ODExMDAsImF1ZCI6IlBEQU0gS09UQSBQQURBTkciLCJpZF91c2VyIjoiMTY0MCIsImVtYWlsIjoibXVoYW1tYWRuYWppYmludkBnbWFpbC5jb20iLCJuYW1hIjoiS3UgUm9ja3MiLCJwaG90b19wcm9maWxlIjoiYW5kcm9pZC5yZXNvdXJjZTpcL1wvY29tLnBkYW1wYWRhbmcudG9tc1wvMjEzMTIzMTEyMiIsImlkcGVsYW5nZ2FuIjoiW3tcImlkeFwiOjEsXCJrb2RlcGVsYW5nZ2FuXCI6XCIwNS4xODYuMjI2XCJ9XSIsImlkcm9sZSI6IkEwLjEiLCJpcGFkZHJlcyI6IjExNC42LjIyNy4zMCJ9.dl_Mr7-OEnc-VXDBSW-eNDwhoHfuDjO7QXPMsehCn3o:'
//         }
//       };
  
//     request(options, function (error, response,body) {
//       if (error) throw new Error(error);
//       bot.sendMessage(chatId, '_Mencari Kode Pelanggan _' + cekHistory + '...', {parse_mode:'Markdown'})
//       .then(function(msg){ 
//         let payload = JSON.parse(body)
//         console.log(payload.bulan)
//         bot.sendMessage(chatId, 'Info History Tagihan :\nNama : ' + payload.bulan + '\n')

//       })

//     });

// });


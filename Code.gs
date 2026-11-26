// Fungsi menerima data laporan (POST) dari website GitHub
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Buat header kolom otomatis jika Google Sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Nama Pelapor", "Kategori", "Ringkasan Pesan", "Status"]);
    }
    
    // Simpan data baru ke baris paling bawah
    sheet.appendRow([
      new Date(),
      data.pelapor,
      data.kategori,
      data.ringkasan,
      "Laporan Simulasi"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success", 
      message: "Data berhasil disimpan ke Google Sheets!" 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "error", 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Fungsi mengambil seluruh data laporan (GET) untuk ditampilkan di website
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rows = sheet.getDataRange().getValues();
  var data = [];
  
  // Mulai dari indeks 1 untuk melewati baris header
  for (var i = 1; i < rows.length; i++) {
    data.push({
      pelapor: rows[i][1],
      kategori: rows[i][2],
      ringkasan: rows[i][3],
      status: rows[i][4]
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify({ 
    status: "success", 
    data: data 
  })).setMimeType(ContentService.MimeType.JSON);
}

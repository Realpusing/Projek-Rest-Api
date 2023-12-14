import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/Components/Navbar';
import { Head } from '@inertiajs/react';
import './Tabel.css'; // Import file CSS untuk styling

function handleClick() {
    axios
        .get("http://localhost:8000/api/panggil")
        .then((response) => {
            // Handle response dari API jika diperlukan
            console.log("Response:", response.data);
        })
        .catch((error) => {
            // Handle error jika terjadi kesalahan dalam permintaan
            console.error("Error:", error);
        });
}

function YourComponent() {
    return (
        <div>
            <label htmlFor="my_modal_5" className="btn" onClick={handleClick}>
                Ajukan Penghubungan Admin
            </label>
        </div>
    );
}

function Tabel() {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Menambah satu hari ke tanggal saat ini
    
    const daysOfWeek = [];
    
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
    
        const year = currentDate.getFullYear(); // Mendapatkan tahun dalam format numerik (e.g., 2023)
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Mendapatkan bulan dalam format numerik (01-12)
        const date = ('0' + currentDate.getDate()).slice(-2); // Mendapatkan tanggal dalam format numerik (01-31)
    
        const formattedDate = `${year}-${month}-${date}`; // Menggabungkan nilai tahun, bulan, dan tanggal
        daysOfWeek.push(formattedDate);
    }
    const hours = Array.from({ length: 8 }, (_, index) => index + 8);

    const [peminjaman, setPeminjaman] = useState({});
    const [buttonAPressed, setButtonAPressed] = useState(false);

    // Simulasi data dari database
    const dataFromDatabase = {
        // Contoh data dari database (gunakan data dari database Anda)
        "2023-12-14": 1,
        "2023-12-13": 0,
        "2023-12-16": 2,
    };

    useEffect(() => {
        // Mengatur data peminjaman dari database saat komponen dimuat
        setPeminjaman(dataFromDatabase);
    }, []);

    const handleBoxClick = (day, hour) => {
        if (!buttonAPressed) {
            // Saat tombol A tidak ditekan
            if (peminjaman[`${day}-${hour}`] === 0 || !peminjaman[`${day}-${hour}`]) {
                setPeminjaman((prevPeminjaman) => ({
                    ...prevPeminjaman,
                    [`${day}-${hour}`]: 2, // Mengubah kuning (0) atau hijau (belum ada) menjadi biru (2)
                }));
            } else if (peminjaman[`${day}-${hour}`] === 1) {
                setPeminjaman((prevPeminjaman) => ({
                    ...prevPeminjaman,
                    [`${day}-${hour}`]: 2, // Mengubah merah (1) menjadi biru (2)
                }));
            } else if (peminjaman[`${day}-${hour}`] === 2) {
                // Mengembalikan biru (2) ke warna sebelumnya (0 atau 1)
                const previousColor = peminjaman[`previous-${day}-${hour}`]; // Mendapatkan nilai sebelumnya
    
                setPeminjaman((prevPeminjaman) => ({
                    ...prevPeminjaman,
                    [`${day}-${hour}`]: previousColor, // Mengembalikan ke warna sebelumnya
                }));
            }
        } else {
            // Saat tombol A ditekan
            if (peminjaman[`${day}-${hour}`] === 0) {
                setPeminjaman((prevPeminjaman) => ({
                    ...prevPeminjaman,
                    [`${day}-${hour}`]: 2, // Mengubah kuning (0) menjadi biru (2)
                }));
            } else if (peminjaman[`${day}-${hour}`] === 1 || peminjaman[`${day}-${hour}`] === 2) {
                const previousColor = peminjaman[`${day}-${hour}`] === 1 ? 1 : 0; // Nilai merah (1) atau hijau (0) sebelumnya
                setPeminjaman((prevPeminjaman) => ({
                    ...prevPeminjaman,
                    [`${day}-${hour}`]: 2, // Mengubah merah (1) atau biru (2) menjadi biru (2)
                    [`previous-${day}-${hour}`]: previousColor, // Menyimpan nilai sebelumnya
                }));
            }
        }
    };
    
    const handleButtonAClick = async () => {
        setButtonAPressed(true);
        
        const updatedPeminjaman = Object.fromEntries(
            Object.entries(peminjaman).map(([key, value]) => {
                if (value === 2) {
                    return [key, 0]; // Mengubah biru (2) menjadi kuning (0)
                }
                return [key, value];
            })
        );
    
        setPeminjaman(updatedPeminjaman);
    
        try {
            const response = await fetch('http://localhost:8000/api/addpeminjaman', {
                method: 'POST',
                body: JSON.stringify(updatedPeminjaman),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log('Data telah dikirim ke database:', data);
        } catch (error) {
            console.error('Gagal mengirim data ke database:', error);
        }
    };
return (
    <div>
        <div className="peminjaman-container">
            <p>Jadwal Tersedia</p>

            <table className="peminjaman-table">
                <thead>
                    <tr>
                        <th></th>
                        {daysOfWeek.map((day) => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {hours.map((hour) => (
                        <tr key={hour}>
                            <td>{`${hour}:00`}</td>
                            {daysOfWeek.map((day) => (
                                <td key={`${day}-${hour}`}>
                                    <div
                                        className={`jbox ${
                                            peminjaman[`${day}-${hour}`] === 1
                                                ? "peminjaman"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleBoxClick(day, hour)
                                        }
                                        style={{
                                            backgroundColor:
                                                peminjaman[`${day}-${hour}`] === 1
                                                    ? "red"
                                                    : peminjaman[`${day}-${hour}`] === 0
                                                    ? "yellow"
                                                    : peminjaman[`${day}-${hour}`] === 2
                                                    ? "blue"
                                                    : "green",
                                        }}
                                    >
                                        {peminjaman[`${day}-${hour}`] === 1
                                            ? "ACC"
                                            : peminjaman[`${day}-${hour}`] === 0
                                            ? "Proses"
                                            : peminjaman[`${day}-${hour}`] === 2
                                            ? "pilih"
                                            : "Tersedia"}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "15px",
                    marginTop: "20px",
                }}
            >
                <div style={{ margin: "10px 0" }}>
                    <label htmlFor="my_modal_6" className="btn btn-success">
                        Ajukan Peminjaman/pembatalan
                    </label>
                    <label
                        htmlFor="my_modal_5"
                        className="btn btn-success"
                        style={{ marginLeft: "10px" }}
                    >
                        Hubungi admin
                    </label>
                </div>

                {/* Modal 1 */}
                <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <div
                            className="navbar bg-base-100"
                            style={{ backgroundColor: "navy", color: "white" }}
                        >
                            <div className="flex-1">
                                <a className="btn btn-ghost normal-case text-xl">
                                    <div className="w-10 rounded-full">
                                        <img src="asett/sadhar.png" />
                                    </div>
                                </a>
                                <div>
                                    <h1>
                                        <b>Informatika</b>
                                    </h1>
                                    <h1>Fakultas Sains Dan Teknologi</h1>
                                </div>
                            </div>
                        </div>
                        <p className="py-4" style={{ fontSize: "25px" }}>
                            Apakah ada yakin ingin meminjam/pembatalan komputer ini?
                        </p>
                        <div className="modal-action">
                        <label htmlFor="my_modal_6" className="btn" onClick={handleButtonAClick}>
                            Ajukan Peminjaman atau pembatalan
                        </label>
                        </div>
                    </div>
                </div>

                {/* Modal 2 */}
                <input type="checkbox" id="my_modal_5" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <div
                            className="navbar bg-base-100"
                            style={{ backgroundColor: "navy", color: "white" }}
                        >
                            <div className="flex-1">
                                <a className="btn btn-ghost normal-case text-xl">
                                    <div className="w-10 rounded-full">
                                        <img src="asett/sadhar.png" />
                                    </div>
                                </a>
                                <div>
                                    <h1>
                                        <b>Informatika</b>
                                    </h1>
                                    <h1>Fakultas Sains Dan Teknologi</h1>
                                </div>
                            </div>
                        </div>
                        <p className="py-4" style={{ fontSize: "25px" }}>
                            Apakah ada yakin ingin menghubungi admin?
                        </p>
                        <YourComponent />
                    </div>
                </div>
            
            
        </div>
    </div>
);

}






function Komputer({ selectedImageIdz }) {
    const handleButtonAClick = async () => {
        setButtonAPressed(true);
        
        const updatedPeminjaman = Object.fromEntries(
            Object.entries(peminjaman).map(([key, value]) => {
                if (value === 2) {
                    return [key, 0]; // Mengubah biru (2) menjadi kuning (0)
                }
                return [key, value];
            })
        );
    
        setPeminjaman(updatedPeminjaman);
    
        try {
            const response = await axios.post('http://localhost:8000/api/addpeminjaman', updatedPeminjaman);
            console.log('Data telah dikirim ke database:', response.data);
            // Lakukan tindakan setelah berhasil mengirim data ke backend, jika diperlukan
        } catch (error) {
            console.error('Gagal mengirim data ke database:', error);
            // Tangani kesalahan saat mengirim permintaan ke server
        }
    };
    
    
    const [jumlahpc, setJumlahPc] = useState(31); // Nilai default jika tidak ada data
    const [buttonColors, setButtonColors] = useState(new Array(jumlahpc).fill("#3498db"));
    
    useEffect(() => {
      const fetchJumlahKomputer = async () => {
        try {
          if (selectedImageIdz) {
            const response = await axios.get(`http://localhost:8000/api/kelas_tampil/${selectedImageIdz}`);
            const { jumlah_komputer } = response.data; // Sesuaikan dengan respons yang benar dari server
            setJumlahPc(jumlah_komputer);
            setButtonColors(new Array(jumlah_komputer).fill("#3498db"));
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchJumlahKomputer();
    }, [selectedImageIdz]);
  
    const handleButtonClick = (buttonNumber) => {
      const updatedColors = [...buttonColors];
  
      if (updatedColors[buttonNumber - 1] === "#f28910") {
        updatedColors[buttonNumber - 1] = "#3498db";
      } else {
        updatedColors[buttonNumber - 1] = "#f28910";
      }
  
      setButtonColors(updatedColors);
    };
  
    const buttonStyle = {
      padding: "10px",
      margin: "5px",
      color: "#ffffff",
      cursor: "pointer",
    };
  
    const buttons = [];
  
    for (let i = 1; i <= jumlahpc; i++) {
      buttons.push(
        <button
          key={i}
          style={{ ...buttonStyle, backgroundColor: buttonColors[i - 1] }}
          onClick={() => handleButtonClick(i)}
        >
          Komputer {i}
        </button>,
      );
    }
  
    return (
      <div>
        {/* Menampilkan jumlah komputer yang diperoleh dari database */}
        <p>Jumlah Komputer: {jumlahpc}</p>
        <div>{buttons}</div>
      </div>
    );
  }




export default function Homepage(proops) {
    console.log(proops);
    const selectedImageId =1;
    const buttonStyle = {
        padding: "5px 10px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        marginRight: "10px", // Jarak antara tombol
        background: "navy", // Warna latar belakang biru tua
        color: "white", // Warna teks putih
        verticalAlign: "top", // Mengatur tombol sejajar dengan teks di atasnya
        transition: "background 0.3s, color 0.3s", // Efek transisi saat hover
        cursor: "pointer", // Mengubah kursor saat hover
        boxShadow: "0 0 10px rgba(255, 255, 255, 0)", // Efek bayangan awal (tidak terlihat)
    };
    const inputStyle = {
        width: "300px", // Lebar elemen input
        height: "60px", // Tinggi elemen input
        background: "navy", // Warna latar belakang biru tua
        color: "white", // Warna teks putih
        border: "1px solid white", // Warna border putih
        borderRadius: "5px", // Sudut elemen bulat
        verticalAlign: "top", // Mengatur inputan dimulai dari atas
        maxWidth: "100%",
    };
    const inputStyle2 = {
        width: "300px", // Lebar elemen input
        height: "110px", // Tinggi elemen input
        background: "navy", // Warna latar belakang biru tua
        color: "white", // Warna teks putih
        border: "1px solid white", // Warna border putih
        borderRadius: "5px", // Sudut elemen bulat
        verticalAlign: "top", // Mengatur inputan dimulai dari atas
        maxWidth: "100%",
    };

    const handleButtonHover = (event) => {
        event.target.style.background = "rgb(0, 0, 255)"; // Mengubah warna latar belakang tombol saat hover (warna biru)
        event.target.style.boxShadow = "0 0 10px rgba(0, 0, 255, 0.7)"; // Menampilkan efek cahaya saat hover
    };

    const handleButtonLeave = (event) => {
        event.target.style.background = "navy"; // Kembali ke warna latar belakang semula setelah hover
        event.target.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0)"; // Hilangkan efek bayangan
    };
    const tableBorderStyle = {
        border: "1px solid black",
    };

    const cellBorderStyle = {
        border: "1px solid black",
        padding: "8px",
        width: "14.28%",
    };

    return (
        <div>
            <Head title="Foundasi-App" />
            <Navbar user={proops.auth.user} />

            <div
                className="d-flex p-3"
                style={{ marginTop: "20px", paddingLeft: "50px" }}
            >
                <b style={{ fontSize: "30px" }}>Jadwal Komputer</b>
            </div>

            <div
                className="d-flex p-3"
                style={{ marginTop: "20px", paddingLeft: "50px" }}
            >
                <b style={{ fontSize: "20px" }}>Pilihan Komputer</b>
            </div>
            <div className="d-flex p-3" style={{ paddingLeft: "50px" }}>
                <div className="scrollable-buttons">
                <Komputer selectedImageIdz={selectedImageId} />
                </div>
            </div>

            <div
                className="d-flex p-3"
                style={{ marginTop: "20px", paddingLeft: "50px" }}
            >
                <b style={{ fontSize: "20px" }}>Tujuan Peminjaman</b>
                <br />
                <input type="text" style={inputStyle} />
            </div>
            <div
                className="d-flex p-3"
                style={{ marginTop: "20px", paddingLeft: "50px" }}
            ></div>
            <br />
            <br />
            <div className="overflow-x-auto">
                <tabel>
                    <Tabel />
                </tabel>
            </div>
            <br />
            
        </div>
    );
}

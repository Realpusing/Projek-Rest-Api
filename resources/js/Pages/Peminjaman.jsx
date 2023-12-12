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
    const daysOfWeek = [
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
        "Minggu",
    ];
    const hours = Array.from({ length: 8 }, (_, index) => index + 8);

    const [peminjaman, setPeminjaman] = useState({});
    const [buttonAPressed, setButtonAPressed] = useState(false);

    // Simulasi data dari database
    const dataFromDatabase = {
        // Contoh data dari database (gunakan data dari database Anda)
        "Senin-8": 1,
        "Selasa-9": 0,
        // ...
    };

    useEffect(() => {
        // Mengatur data peminjaman dari database saat komponen dimuat
        setPeminjaman(dataFromDatabase);
    }, []);

    const handleBoxClick = (day, hour) => {
        if (!buttonAPressed) {
            // Tindakan saat tombol A tidak ditekan
            if (peminjaman[`${day}-${hour}`] === 0 || !peminjaman[`${day}-${hour}`]) {
                // Jika data adalah kuning (0) atau hijau (belum ada), maka saat diklik akan menjadi biru
                setPeminjaman((prevPeminjaman) => ({
                    ...prevPeminjaman,
                    [`${day}-${hour}`]: 2, // Menjadikan biru (2)
                }));
            } else if (peminjaman[`${day}-${hour}`] === 1) {
                // Jika data adalah merah (1), saat diklik akan menjadi biru (2)
                setPeminjaman((prevPeminjaman) => ({
                    ...prevPeminjaman,
                    [`${day}-${hour}`]: 2, // Menjadikan biru (2)
                }));
            } else if (peminjaman[`${day}-${hour}`] === 2) {
                // Jika data adalah biru (2), saat diklik akan menjadi hijau (0) kembali
                setPeminjaman((prevPeminjaman) => ({
                    ...prevPeminjaman,
                    [`${day}-${hour}`]: 0, // Menjadikan hijau (0)
                }));
            }
        } else {
            // Tindakan saat tombol A ditekan
            if (peminjaman[`${day}-${hour}`] === 0) {
                // Jika data adalah kuning (0), saat diklik akan menjadi biru (2)
                setPeminjaman((prevPeminjaman) => ({
                    ...prevPeminjaman,
                    [`${day}-${hour}`]: 2, // Menjadikan biru (2)
                }));
            }
            // Jika tombol A ditekan, mengubah warna merah menjadi biru
            if (peminjaman[`${day}-${hour}`] === 1) {
                setPeminjaman((prevPeminjaman) => ({
                    ...prevPeminjaman,
                    [`${day}-${hour}`]: 2, // Menjadikan biru (2)
                }));
            }
        }
    }

    const handleButtonAClick = async () => {
        setButtonAPressed(true);

        // Mengubah semua warna biru (2) menjadi kuning (0)
        const updatedPeminjaman = Object.fromEntries(
            Object.entries(peminjaman).map(([key, value]) => {
                if (value === 2) {
                    return [key, 0]; // Mengubah biru (2) menjadi kuning (0)
                }
                return [key, value];
            })
        );

        setPeminjaman(updatedPeminjaman);

        // Kirim data ke server
        try {
            // Simulasi pengiriman data ke server dengan metode POST
            const response = await fetch('url_database', {
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
        <div className="peminjaman-container">
            <p>Jadwal Tersedia</p>
            <button onClick={handleButtonAClick}>Button A</button>
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
                                            : "Tersedia"}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}






function Komputer({ selectedImageIdz, data }) {
    const [jumlahpc, setJumlahPc] = useState(data ? data.jumlah_komputer : 31);
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
  
    return <div>{buttons}</div>;
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

                {/* Put this part before </body> tag */}
                <input
                    type="checkbox"
                    id="my_modal_6"
                    className="modal-toggle"
                />
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
                            Apakah ada yakin ingin meminjam/pembatalan komputer
                            ini ?
                        </p>
                        <div className="modal-action">
                            <label htmlFor="my_modal_6" className="btn">
                                Ajukan Peminjaman atau pembatalan
                            </label>
                        </div>
                    </div>
                </div>
                <input
                    type="checkbox"
                    id="my_modal_5"
                    className="modal-toggle"
                />

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
                            Apakah ada yakin ingin mengubungi admin ? ?
                        </p>

                        <YourComponent />
                    </div>
                </div>
            </div>
        </div>
    );
}

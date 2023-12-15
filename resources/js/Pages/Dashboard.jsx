import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import "./Homepage.css"; // Mengimpor file CSS
import "./Dashboard.css"; // Mengimpor file CSS

import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Tabel.css";
import React, { useState, useEffect } from 'react';





function ProfilKelas() {
    const [namakelas, setName] = useState('');
    const [jumlah_komputer, setJumlah] = useState('');
    const [idadmin, setIdAdmin] = useState('');
    const [file, setImage] = useState(null);
    const [submitStatus, setSubmitStatus] = useState(''); // State untuk status submit

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleJumlahChange = (event) => {
        setJumlah(event.target.value);
    };

    const handleIdAdminChange = (event) => {
        setIdAdmin(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('namakelas', namakelas);
        formData.append('jumlah_komputer', jumlah_komputer);
        formData.append('idadmin', idadmin);
        formData.append('file', file);
    
        try {
            const response = await fetch('http://localhost:8000/api/posts', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                // Berhasil mengirim data ke backend
                console.log('Data berhasil dikirim');
                setSubmitStatus('success'); // Set status submit berhasil
            } else {
                // Gagal mengirim data ke backend
                console.error('Gagal mengirim data');
                setSubmitStatus('error'); // Set status submit gagal
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            setSubmitStatus('error'); // Set status submit gagal
        }
    };

    return (
        <div className="profil-kelas">
            <div className="profile-content">
                {submitStatus === 'success' && (
                    <div className="success-message">Data berhasil dikirim!</div>
                )}
                {submitStatus === 'error' && (
                    <div className="error-message">Gagal mengirim data.</div>
                )}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="namakelas">
                        Masukan Nama Kelas :
                        <input
                            type="text"
                            id="namakelas"
                            value={namakelas}
                            onChange={handleNameChange}
                            
                        />
                    </label>
                    <br />
                    <label htmlFor="jumlah_komputer">
                        Masukan Jumlah Komputer : 
                        <input
                            type="text"
                            id="jumlah_komputer"
                            value={jumlah_komputer}
                            onChange={handleJumlahChange}
                        />
                    </label>
                    <br />
                    <label htmlFor="idadmin">
                        id_admin :   
                        <input
                            type="text"
                            id="idadmin"
                            value={idadmin}
                            onChange={handleIdAdminChange}
                        />
                    </label>
                    <br />
                    <label htmlFor="fotokelas">
                        Gambar Kelas:
                        <input
                            type="file"
                            id="fotokelas"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>
                    <br />
                    <button type="submit">Simpan Perubahan</button>
                </form>
            </div>
        </div>
    );
}


const Dashboard = (props) => {
    const [content, setContent] = useState(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);

    const handleProfileClick = () => {
        setContent("profile");
    };
    const peminjamanklik = () => {
        setContent("peminjaman");
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simpan perubahan ke server atau lakukan operasi lainnya
        console.log("Nama:", name);
        console.log("No Handphone:", phone);
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Gambar:", image); // Menampilkan informasi gambar
    };
    function YourComponent() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Buat objek FormData untuk mengirim data gambar
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('image', image);

        try {
            // Kirim data ke backend menggunakan fetch atau library seperti axios
            const response = await fetch('http://localhost:8000/api/endpoint', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Berhasil mengirim data ke backend
                console.log('Data berhasil dikirim');
                // Tambahkan kode untuk menampilkan pesan sukses atau tindakan lainnya
            } else {
                // Gagal mengirim data ke backend
                console.error('Gagal mengirim data');
                // Tambahkan kode untuk menampilkan pesan error atau tindakan lainnya
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            // Tambahkan kode untuk menampilkan pesan error atau tindakan lainnya
        }
    };

    return (
        <div className="profil-kelas">
            <div className="profile-content">
                <form onSubmit={handleSubmit}>
                    {/* ... Input fields seperti yang Anda punya */}
                    <button type="submit">Simpan Perubahan</button>
                </form>
            </div>
        </div>
    );
}
    

function Tabel() {
    const [dataPeminjaman, setDataPeminjaman] = useState([]);
    const [acceptedIds, setAcceptedIds] = useState([]);
  
    const handleAccept = async (dataId) => {
      try {
        const response = await fetch(`http://localhost:8000/api/peminzam/${dataId}/accept`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: '1' }),
        });
  
        if (response.ok) {
          console.log('Status berhasil diubah');
          setAcceptedIds([...acceptedIds, dataId]);
        } else {
          console.error('Gagal mengubah status');
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    };
  
    const handleReject = async (dataId) => {
        try {
          const response = await fetch(`http://localhost:8000/api/peminzam/${dataId}/reject`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: '0' }),
          });
    
          if (response.ok) {
            console.log('Status berhasil diubah');
            const updatedData = dataPeminjaman.filter((data) => data.id !== dataId);
            setDataPeminjaman(updatedData);
          } else {
            console.error('Gagal mengubah status');
          }
        } catch (error) {
          console.error('Terjadi kesalahan:', error);
        }
      };
  
    useEffect(() => {
      fetch('http://localhost:8000/api/peminjamez')
        .then(response => response.json())
        .then(data => {
          setDataPeminjaman(data);
        })
        .catch(error => {
          console.error('Terjadi kesalahan saat mengambil data:', error);
        });
    }, []);
  
    return (
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Peminjam</th>
                <th>NIM</th>
                <th>Alasan Peminjaman atau Pembatalan</th>
                <th>Jumlah Dipinjam</th>
                <th>Tanggal & Jam Peminjaman</th>
                <th>Tanggal & Jam Kembali</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dataPeminjaman.map((data, index) => (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.iduser.name || '-'}</td>
                  <td>{data.iduser.nim || '-'}</td>
                  <td>{data.alasan}</td>
                  <td>{data.jumlahPinjam}</td>
                  <td>{data.tanggal_dan_jam_pinjam}</td>
                  <td>{data.tanggal_dan_jam_kembali}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                      {data.status !== 0 ? (
                        <div
                          style={{
                            backgroundColor: 'green',
                            padding: '8px',
                            borderRadius: '5px',
                            color: 'white',
                          }}
                        >
                          Disetujui
                        </div>
                      ) : (
                        <>
                          {!acceptedIds.includes(data.id) && (
                            <>
                              <button
                                style={{
                                  backgroundColor: 'green',
                                  padding: '8px 12px',
                                  borderRadius: '5px',
                                  border: 'none',
                                  color: 'white',
                                }}
                                onClick={() => handleAccept(data.id)}
                              >
                                Menerima
                              </button>
                              <button
                                style={{
                                  backgroundColor: 'red',
                                  padding: '8px 12px',
                                  borderRadius: '5px',
                                  border: 'none',
                                  color: 'white',
                                }}
                                onClick={() => handleReject(data.id)}
                              >
                                Menolak
                              </button>
                            </>
                          )}
                          {acceptedIds.includes(data.id) && (
                            <div
                              style={{
                                backgroundColor: 'green',
                                padding: '8px',
                                borderRadius: '5px',
                                color: 'white',
                              }}
                            >
                              Disetujui
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
    
   
    
    
   

    const renderProfileContent = () => {
        if (content === "profile") {
            return (
                <div className="profile-content">
                    <h2>Profile Content</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Nama:
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                placeholder="Input Nama anda"
                            />
                        </label>
                        <br />
                        <label>
                            No Handphone:
                            <input
                                type="text"
                                value={phone}
                                onChange={handlePhoneChange}
                                placeholder="Input No Telepon Anda "
                            />
                        </label>
                        <br />
                        <label>
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Input Email Anda"
                            />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="password"
                            />
                        </label>
                        <br />
                        <label>
                            Gambar Profil:
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                placeholder="Pilih Gambar"
                            />
                        </label>
                        <br />
                        <button type="submit">Simpan Perubahan</button>
                    </form>
                </div>
            );
        } else if (content === "peminjaman") {
            return (
                <Tabs>
                    <TabList className="menu menu-horizontal mb-3 flex justify-center">
                        <Tab className="tab bg-base-200 rounded-box">
                            Daftar Peminjaman
                        </Tab>
                        <Tab className="tab bg-base-200 rounded-box">
                            Profil kelas
                        </Tab>
                        <Tab className="tab bg-base-200 rounded-box">
                            Daftar Pembatalan
                        </Tab>
                    </TabList>
                    <TabPanel>
                        <div className="peminjaman-content">
                            {
                                <div className="overflow-x-auto">
                                    <tabel>
                                        <Tabel />
                                    </tabel>
                                </div>
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="profil-kelas">
                            <ProfilKelas />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="pembatalan-content">
                            
                            <Tabel />
                        </div>
                    </TabPanel>
                </Tabs>
            );
        }
        return null;
    };

    return (
        <div className="dashboard-layout">
            <Head title="Foundasi-App" />
            <Navbar user={props.auth.user} />
            <div className="content-wrapper">
                <aside className="sidebar">
                    <ul className="sidebar-menu">
                        <li>
                            <a href="#" onClick={handleProfileClick}>
                                Profile
                            </a>
                        </li>

                        <li>
                            <a href="#" onClick={peminjamanklik}>
                                peminjaman
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => setContent("help")}>
                                Help
                            </a>
                        </li>
                    </ul>
                </aside>
                <main className="main-content">{renderProfileContent()}</main>
            </div>
        </div>
    );
};

export default Dashboard;

import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MenuPeminjaman.css";
import Background from "../../../public/asett/sadhar.png";

function Carousel() {
    const [carouselItems, setCarouselItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/kelas_tampil",
                );
                const data = response.data;
                const items = data.map((menupeminjaman, index) => (
                  <div className="carousel carousel-center rounded-box">
                    <div
                        className="carousel-item"
                        key={`item-${index}`}
                        onClick={() => handleImageClick(menupeminjaman.id)} // Handle click on image
                    >
                        <img
                            className="gambar d-flex p-1"
                            src={`http://localhost:8000/api/ambil-gambar/${menupeminjaman.fotokelas}`}
                            alt={`Item ${index}`}
                        />
                    </div>
                  </div>
                    
                ));

                setCarouselItems(items);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleImageClick = (id) => {
        console.log(`Image clicked with ID: ${id}`);
        window.location.href = `http://127.0.0.1:8000/peminjaman?id=${id}`; // Add ID as query parameter
    };

    return (
        <div className="carousel carousel-end rounded-box">{carouselItems}</div>
    );
}

export default function Homepage(proops) {
    console.log(proops);

    return (
        <div className="background"
            style={{
                backgroundImage: `url(${Background})`
            }}
        >
            <Head title="Project Rest API" />
            <Navbar user={proops.auth.user} />
            <div class="content-after-navbar">
            <div style={{ overflowX: "auto" }}>
                <p className="fontLab">Ruangan Lab Informatika</p>
                <br />
                <Carousel />
            </div>
            <div
                className="d-flex p-3"
                style={{ marginTop: "20px", paddingLeft: "50px" }}
            >
                <b style={{ fontSize: "20px" }}>Tutorial Peminjaman Komputer</b>
                <br />
                <iframe
                    src="https://www.youtube.com/embed/gZHR51DsTQs"
                    frameborder="0"
                    allowfullscreen
                    style={{
                        width: "400px",
                        height: "250px",
                        marginTop: "10px",
                    }}
                ></iframe>
            </div>
            <div className="d-flex p-3 aboutP">
                <b className="aboutHead">About</b>
                <div>
                    <p className="aboutContent">
                        Ini adalah tampilan "About" dengan sembarang kalimat di
                        dalamnya.
                    </p>
                </div>
            </div>
            </div>
            
        </div>
    );
}

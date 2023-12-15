import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react"
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MenuPeminjaman.css"

function Carousel() {
    const [carouselItems, setCarouselItems] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/kelas_tampil");
          const data = response.data;
          const items = data.map((menupeminjaman, index) => (
            <div
              className="carousel-item"
              key={`item-${index}`}
              onClick={() => handleImageClick(menupeminjaman.id)} // Handle click on image
            >
              <img className="gambar"
                src={`http://localhost:8000/api/ambil-gambar/${menupeminjaman.fotokelas}`}
                alt={`Item ${index}`}
              />
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
    const aboutStyles = {
        backgroundColor: "navy",
        borderRadius: "20px ",
        color: "white",
        marginTop: "20px",
        padding: "60px",
        width: "auto",
        margin: "20px 0px",
    };
    return (
        <div>
            <Head title="Foundasi-App" />
            <Navbar user={proops.auth.user} />
            <div style={{ overflowX: "auto" }}>
                <p
                    style={{
                        fontSize: "20px",
                        fontStyle: "italic",
                        marginTop: "10px",
                        paddingLeft: "50px",
                        fontWeight: "bold",
                    }}
                >
                    Ruangan Lab Informatika
                </p>
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
            <div
                className="d-flex p-3"
                style={{ marginTop: "20px", paddingLeft: "50px" }}
            >
                <b style={{ fontSize: "20px", fontStyle: "italic" }}>About</b>
                <div style={aboutStyles}>
                    <p>
                        Ini adalah tampilan "About" dengan sembarang kalimat di
                        dalamnya.
                    </p>
                </div>
            </div>
        </div>
    );
}

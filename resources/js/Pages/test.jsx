import React, { useState, useEffect } from "react";
import axios from "axios";

function GambarComponent() {
    const [gambar, setGambar] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/gambar"); // Ganti dengan endpoint yang sesuai
                setGambar(response.data); // Mengatur data gambar ke state
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Panggil fungsi fetchData saat komponen dimount
    }, []);

    return (
        <div>
            <h1>Daftar Gambar</h1>
            <ul>
                {gambar.map((item) => (
                    <li key={item.fotokelas}>
                        <img src={item.url} alt={item.alt} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GambarComponent;

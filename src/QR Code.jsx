
import { useState } from 'react';
import './qrcode.css';

export default function Qrcode() {
    const [img,setImg]= useState("");
    const[loading,setLoading] = useState("");
    const [qrdata,setQrdata] = useState("https://youtube.com/");
    const [sizeQr, setSizeQr] = useState("150")

   async function handleimg(){
      setLoading(true);
      try {
        const url =(`https://api.qrserver.com/v1/create-qr-code/?size=${sizeQr}x${sizeQr}&data=${encodeURIComponent(qrdata)}`)
        setImg(url);
        
      } catch (error) {
        console.error("summa",error);
      }finally{
        setLoading(false)
      }
    }
    function downloadQr() {
        fetch(img).then((response)=>response.blob()).then((blob)=>{
            const link = document.createElement("a")
            link.href = URL.createObjectURL(blob)
            link.download="qr.png";
            document.body.appendChild(link);
            link.click()
            document.body.removeChild(link);
        }).catch((error)=>{
            console.error("Error Downloading QR Code" ,error);
        })
    }
    

    return(
        <div className="app-container">
            <h2>QR CODE GENERATOR</h2>
            { loading && <p>Please Wait...</p>}
            {img && <img src={img}  className='img'/>}

            <label htmlFor="datainput" className="input-label" > QR Code Generate Link:</label>
            <input type="text" id="datainput" placeholder="Enter Data for QR code" onChange={(e)=>setQrdata(
                e.target.value
            )} value={qrdata}/>

            <label htmlFor="sizeinput" className="size-label" >Image Size for QR Code:</label>
            <input type="text" id="sizeinput" value={sizeQr}placeholder=" Enter Image Size (e.g., 150)" onChange={(e)=>setSizeQr(
               e.target.value
            )} />

       
        <div className='btn'>
             <button className='generate-btn ' onClick={handleimg} disabled={loading}>Generate QR Code</button>
            <button className='download-btn' onClick={downloadQr} > Download QR Code</button>
            {/* <button onClick={Delete}>delete</button> */}
        </div>
        <p>Designed by <a href="https://github.com/mythilisaminathan">Mythili</a></p>
        </div>
    );

}

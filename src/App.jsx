import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {  
  const [textcolor,settxtcolor] = useState();
  const [bgcolor,setbgcolor] = useState();
  const [fontsize,setfontsize] = useState();
  // const [clear,setclear] = useState();
  // const [savesig,setsavesig] = useState();
  // const [retrive,setretrive] = useState();
  const canvasRef = useRef(null); //useRef is used to access canvas element and perform operation on it.
  const [isDrawing, setIsDrawing] = useState(false);
  const [prevX, setPrevX] = useState(0);
  const [prevY, setPrevY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleMouseDown = (event) => {
      setIsDrawing(true);
      setPrevX(event.clientX - canvas.offsetLeft);
      setPrevY(event.clientY - canvas.offsetTop);
    };

    const handleMouseMove = (event) => {
      if (!isDrawing) return;
      const x = event.clientX - canvas.offsetLeft;
      const y = event.clientY - canvas.offsetTop;

      ctx.beginPath();
      
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = textcolor; // Change color if needed
      ctx.lineWidth = fontsize;
      ctx.stroke();
     

      setPrevX(x);
      setPrevY(y);
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDrawing, prevX, prevY]);
  const changebackground = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setbgcolor(e.target.value);
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  const cleardata =() =>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,800,500)
   
  }
  const savesignature = () =>{
    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a')
    link.download = 'signature.jpg';
    link.href = url;
    link.click();
  }
  

  return (
    <>
    <div className='flex flex-col my-3 mx-28  p-1 maindiv'>
      <div className='flex justify-around mb-3 mx-5 align-center text-center justify-center text-lg colorpiker '>
        <div className='flex-col  '>
          <p>text color</p>
          <input onChange={(e)=> settxtcolor(e.target.value)} type="color" className='w-full' />
        </div>
        <div>
          <p>background color</p>
          <input onChange={changebackground}  type="color" className='w-full' />
        </div>
        <div className='selectfont'>
          <p>font size</p>
          <select onChange={(e)=> setfontsize(e.target.value)}  className='bg-blue-200 p-0.5 rounded-md outline-none ' name="font" id="size">
            <option value="5">5px</option>
            <option value="8">8px</option>
            <option value="10">10px</option>
            <option value="14">14px</option>
            <option value="20">20px</option>
            <option value="24">24px</option>

          </select>
          </div>
      </div>
      <div className='flex justify-center align-center'>
        <canvas ref={canvasRef}  style={{border:'1px solid black'}} className='flex align-center justify-center  ' width={800} height={500} >
        </canvas>
      </div>
      <div className='allbtn flex justify-around mt-2 mx-6'>
        <button onClick={cleardata}  className='bg-red-500 py-1 px-4 px-2 rounded '>clear</button>
        <button onClick={savesignature} className='bg-green-500 py-1 px-2 rounded ' >save signature</button>
        <button className='bg-yellow-500 py-1 px-2 rounded '>retrive signature</button>
      </div>
    </div>
    </>
  )
}

export default App

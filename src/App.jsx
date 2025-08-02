import { useState } from 'react'
import './App.css'
import Lottie from "lottie-react";
import AIanimation from './assets/Ai_animation.json'
import axios from 'axios'
function App() {
 
  const [input,setinput]=useState("")
  const[mess,setmess]=useState([])
  const[loading ,isloading]=useState(false)
  const endpoint='https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA3kZea3G8WCFPQZKO48MqT5oOmISUUnx0'
 
  const sendmess=async()=>{
    if (!input.trim()) return;
    isloading(true)   
    setmess(prev=>[...prev,{ role: "user" , content:input}]) 
    try {
    const res= await axios.post(endpoint,{
    contents: [
      {
        parts: [
          {
            text:input
          }
        ]
      }
    ]
  })
   
    isloading(false)
    const data=await res.data
    setmess(prev=>[...prev,{role:  <Lottie animationData={AIanimation} loop={true} className="h-5 w-5"/> , content:data.candidates[0].content.parts[0].text}])
    setinput("")
    } 
    catch (error) {
      console.error(error)
    }
  }
    
  
  return (
    <div className="flex justify-center items-center h-dvh w-dvw bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="flex flex-col p-6 rounded-2xl shadow-xl h-[80vh] w-[400px] items-center border-2 border-gray-300 bg-white/80">
        <div className="flex items-center gap-2 mb-4">
          <Lottie animationData={AIanimation} loop={true} className="h-16 w-16"/>
          <h1 className="text-2xl font-bold text-gray-700">Ai Chatbot</h1>
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto w-full flex-1 mb-4 px-2 max-h-[55vh] rounded-2xl" >
          {mess.map((value, idx) => {
            if (value.role === "user") {
              return (
                <div key={idx} className="self-end max-w-[80%] bg-blue-400 text-white rounded-xl px-4 py-2 shadow text-right">
                  <span className="font-semibold">You:</span> {value.content}
                </div>
              )
            } else {
              return (
                <div key={idx} className="self-start max-w-[80%] bg-purple-300 text-gray-800 rounded-xl px-4 py-2 shadow flex items-center gap-2">
                  <Lottie animationData={AIanimation} loop={true} className="h-6 w-6"/>
                  <span className="font-semibold " >Bot:</span> {value.content}
                </div>
              )
            }
          })}
          {loading && <div className="self-start max-w-[80%] bg-purple-100 text-gray-500 rounded-xl px-4 py-2 shadow flex items-center gap-2"><Lottie animationData={AIanimation} loop={true} className="h-6 w-6"/> <span>Thinking...</span></div>}
        </div>
        <div className="flex w-full gap-2 mt-auto">
          <input value={input} placeholder='Ask me anything...' onChange={(e)=>{setinput(e.target.value)}} className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <button onClick={sendmess} className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Send</button>
        </div>
      </div>
    </div>
  )
}

export default App

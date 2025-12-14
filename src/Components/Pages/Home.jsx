import { useState, useEffect } from 'react';
import PopupLoginReminder from '../PopupLoginReminder';


function Home() {

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    if (!user) {
      setShowPopup(true);
    }
  }, []);
 

  return (<>
  
       {showPopup && <PopupLoginReminder />}

      <div className={`home  ${showPopup ? "blurred" : ""}`}>
       <h2 className='text-overlay'>Every Craft Has a Story</h2>

       <div className='container'>
        <h1>hy</h1>
       </div>


    </div>

    </>
  )
}

export default Home
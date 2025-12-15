import { useState, useEffect } from 'react';
import PopupLoginReminder from '../PopupLoginReminder';
import Navbar from '../Navbar';

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

      <div className={`home-hero ${showPopup ? "blurred" : ""}`}>
        <h1 className='text-overlay'>Every Craft Has a Story</h1>
      </div>



    </>
  )
}

export default Home
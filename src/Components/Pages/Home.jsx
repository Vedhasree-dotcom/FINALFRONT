import { useState, useEffect } from 'react';
import PopupLoginReminder from '../PopupLoginReminder';
import { Link } from 'react-router-dom';

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

      <section className="about-section">
      <div className="about-container">
        
        <div className="about-content">
          <h1>
            Art & Craft <br />
            <span>Education</span>
          </h1>

          <p>
            Discover the beauty of handmade crafts and artistic skills.
            Learn traditional and modern techniques through guided
            workshops and creative exploration.
          </p>

          <Link to='/about' className="about-btn">Learn More</Link>
        </div>

        <div className="about-image">
          <img
            src="https://images.pexels.com/photos/10585186/pexels-photo-10585186.jpeg"
            alt="Art and Craft"
          />
        </div>

      </div>
    </section>




    </>
  )
}

export default Home
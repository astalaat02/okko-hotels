import './Room.css';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Slider from '../../Components/Slider/Slider';
import Footer from '../../Components/Footer/Footer';

import Stars from '../../imgs/landing.png'
import './Dates.css';

import { useEffect, useState, useContext } from 'react';
import{loginContext} from '../../App';

export default function Room(props){

    const login = useContext(loginContext);

    const[room, setRoom] = useState([]);
    const[payment, setPayment] = useState(false);
    const[paymentDone, setPaymentDone] = useState(false);

    useEffect(() => {
        fetch('https://astalaat02.github.io/api/okko.json')
        .then((res) => res.json())
        .then((data) => setRoom(data['rooms'][props.id]));
    }, [])
    
        const[arrival, setArrival] = useState('');
    
        const[departure, setDeparture] = useState('');
    
        const[adult, setAdult] = useState(1);
    
        function increaseAdult(adult){
            let num = adult => (adult += 1);
            setAdult(num)
        }
    
        function decreaseAdult(adult){
            let num = adult => (adult <= 0 ? setAdult(0) : (adult -= 1));
            setAdult(num)
        }

        const dateOne = new Date(arrival);
        const dateTwo = new Date(departure);
        const time = Math.abs(dateOne - dateTwo);
        const days = Math.ceil(time / (1000 * 60 * 60 * 24));
        
        const totalPrice = (days * room.price) * adult;

        const [visaInput, setVisaInput] = useState('');
        const [pinInput, setPinInput] = useState('');

        function paymentStart(){
            setPayment(true);
        }

        const handleCheck = (e) => {
              e.preventDefault();
              if(login){
                  if (visaInput.length === 16 && /^\d+$/.test(visaInput) && pinInput.length === 4 && /^\d+$/.test(pinInput)) {
                    window.localStorage.setItem('hotel', JSON.stringify(room.title));
                    window.localStorage.setItem('adults', JSON.stringify(adult));
                    window.localStorage.setItem('arrival', JSON.stringify(arrival));
                    window.localStorage.setItem('departure', JSON.stringify(departure));
                    window.localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
                    setPaymentDone(true);
                    setTimeout(() => {
                        window.location.pathname = '/MyBooking';
                    }, 3000)
                }
                else{
                    alert('The visa number must consist of 16 digits and the PIN code must be 4 digits');
                }
            }else{
                window.location.pathname = '/login';
            }
        }


    return(
        <div className='room'>
            <Header />
            <Slider imgOne={room.imgOne} imgTwo={room.imgTwo} imgThree={room.imgThree}/>

            <div className='dates'>
            <form>

                <div className="arrival">
                    <p>ARRIVAL</p>
                    <input type="date" value={arrival} onChange={ (e) => setArrival(e.target.value)}></input>
                </div>
                
                <div className="departure">
                    <p>DEPARTURE</p>
                    <input type="date" value={departure} onChange={ (e) => setDeparture(e.target.value)}></input>
                </div>

                <div className='adults'>
                    <p>ADULTS</p>
                    <span>
                        <i className="fa-solid fa-minus" onClick={decreaseAdult}></i>
                        {adult}
                        <i className="fa-solid fa-plus" onClick={increaseAdult}></i>
                    </span>
                </div>
                <Link to='' onClick={paymentStart}>Book</Link>
            </form>
        </div>
            
            <div className={`booking${payment ? ' active' : ''}`}>
                { paymentDone ? 
                <div className='done'>
                    <i className="fa-solid fa-circle-check"></i>
                    <h2>Your request has been completed successfully</h2>
                </div>
                :
                <form onSubmit={handleCheck}>
                    <input type='text' placeholder='your visa' value={visaInput} onChange={(e) => setVisaInput(e.target.value)} ></input>
                    <input type='text' placeholder='PIN' value={pinInput} onChange={(e) => setPinInput(e.target.value)}></input>
                    <p>Form : <span>{arrival}</span></p>
                    <p>To : <span>{departure}</span></p>
                    <p>Adults : <span>{adult}</span></p>
                    <p>Total Price : {totalPrice} €</p>
                    <button type='submit'>Pay Now</button>
                </form> }
            </div>


            <div className='title'>
                <h3>OKKO Hotels {room.CityName} Centre</h3>
                <img src={Stars}></img>
                <p>four Stars and no clouds</p>
            </div>
            <div className='discover'>
                <div className='text'>
                    <h3>{room.title}</h3>
                    <span>{room.info}</span>
                    <p>{room.roomDetails}</p>
                    <Link to=''>Discover</Link>
                </div>
            <Slider imgOne={room.imgOne} imgTwo={room.imgTwo} imgThree={room.imgThree}/>
            </div>
            <div className='features'>
                <div className='head'>
                    <h2>OKKO Hotels +</h2>
                    <p>services included during your stay</p>
                </div>
                <div className='con'>
                    <span>
                        <i className="fa-solid fa-wifi"></i>
                        Free wifi everywhere in the hotel
                    </span>
                    <span>
                        <i className="fa-solid fa-dumbbell"></i>
                        Gym: from 7 am to 10 pm
                    </span>
                    <span>
                        <i className="fa-solid fa-bacon"></i>
                        Snacking
                    </span>
                    <span>
                        <i className="fa-solid fa-bag-shopping"></i>
                        Local products
                    </span>
                    <span>
                        <i className="fa-solid fa-land-mine-on"></i>
                        Club: 24-hour access
                    </span>
                    <span>
                        <i className="fa-solid fa-paw"></i>
                        Animals on request (without extra charge)
                    </span>
                </div>
            </div>
            <div className='details'>
            <Slider imgOne={room.imgFour} imgTwo={room.imgFive} imgThree={room.imgSix}/>
                <div className='info'>
                    <h3>{room.roomTitle}</h3>
                    <span>{room.roomInfo}</span>
                    <p>{room.roomDetails}</p>
                    <Link to=''>The Rooms</Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}
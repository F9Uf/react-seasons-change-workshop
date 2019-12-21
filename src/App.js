import React from 'react';
import './App.css'
import { useState } from 'react';
import moment from 'moment';
import Input from './Input';
import axios from 'axios';

const subjects = ['Javascript', 'Golang', 'Ruby', 'React'];
const targetDate = moment("12/21/2019 17:00:00")

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [timer, setTimer] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  
  const updateTimer = () => {
    const diffHours = targetDate.diff(moment(), "hours");
    const diffMinutes = targetDate.diff(moment(), "minutes") % 60;
    const diffSeconds = targetDate.diff(moment(), "seconds") % 60;
    setTimer(`${diffHours} hours, ${diffMinutes} minutes, ${diffSeconds} seconds`);
  }

  React.useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    axios.get("http://www.mocky.io/v2/5dfde8a6310000551ec96e5b?fbclid=IwAR2hS0inzUoFKnKbKkOZlPmVeYpHPHNR-nM86nGB7gwYQJryaQSyo5ESKTA")
      .then(res => {
        setSubject(res.data.subject)
      })
    return () => clearInterval(interval);
  }, []);

  const handleSubject = (event) => {
    setSubject(event.target.value);
  }
  const handleChecked = (event) => {
    setChecked(event.target.checked);
  }

  const handleSubmit = () => {
    setLoading(true)
    axios.get('http://www.mocky.io/v2/5dfde561310000ed1ac96e39?mocky-delay=4000ms&fbclid=IwAR1EOUIN6jYansArP73hHH6BaAmwOdbO12jS0f16Ntfg0kX4OXntoIWtgKo')
      .then(res => {
        const { data } = res
        setMessage(data.response)
        setLoading(false)
      })
  }

  return (
    <div className="App">
      <section className="section">
        <div className="container">
          <div className="title">Seasons Change Registration</div>
          <p>from ends in 5.00pm</p>
          <p>{timer}</p>

          <Input
            label="Name"
            value={name}
            onChangeFromComponent={value => setName(value)}
          />

          <Input
            label="Email"
            value={email}
            onChangeFromComponent={value => setEmail(value)}
          /> 

          <div className="field">
            <label className="label">Subject</label>
            <div className="control">
              <div className="select">
                <select value={subject} onChange={handleSubject}>
                  {
                    subjects
                      .map(subject =>
                        <option key={subject}>{subject}</option>
                      )
                  }
                </select>
              </div>
            </div>
          </div>
          
          <div className="field">
            <label className="checkbox">
              <input type="checkbox" value={isChecked} onChange={handleChecked} />
                I agree to the <a href="#">terms and conditions</a>
            </label>
          </div>
            
          <div className="field is-grouped">
            <div className="control">
              <button className={"button is-link " + (isLoading && "is-loading")} onClick={handleSubmit} disabled={isLoading}>Submit</button>
            </div>
            <div className="control">
              <button className="button is-link is-light">Cancel</button>
            </div>
          </div>
          {message}
        </div>
      </section>
    </div>
  );
}
    
export default App;

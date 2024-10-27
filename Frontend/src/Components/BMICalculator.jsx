import {useState} from "react";
import {toast } from "react-toastify";

const BMICalculator = () => {

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [bmi, setBmi] = useState("");
  
  const calculateBmi = (e) => {
    e.preventDefault();

    if(!height || !weight || !gender) {
      toast.error("Please enter valid height, weight and gender");
      return ;
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    if(bmiValue < 18.5) {
      toast.warning("You are underweight. It is recommended to seek advice from a healthcare specialist.");
    } else if(bmiValue >= 18.5 && bmiValue <= 24.9) {
      toast.success("You are in normal weight category. Keep maintaining such healthy lifestyle.");
    } else if(bmiValue >= 25 && bmiValue < 29.9){
      toast.warning("You are overweight. It is recommended to seek advice from a healthcare specialist.");
    } else {
      toast.error("You are in obese category. It is necessary to seek advice from a healthcare specialist.")
    }
  }
  return (
    <section className="bmi">
      <h1>BMI CALCULATOR</h1>
      <div className="container">
        <div className="wrapper">
          <form action="" onSubmit={calculateBmi}>
            <div>
              <label htmlFor="">Height (cm)</label>
              <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} required/>
            </div>

            <div>
              <label htmlFor="">Weight (kg)</label>
              <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} required/>
            </div>

            <div>
              <label htmlFor="">Gender</label>
              <select name=""  id="" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <button type="submit">Calculate BMI</button>
          </form>
        </div>
        <div className="wrapper">
          <img src="/bmi.jpg" alt="bmiImage" />
        </div>
      </div>
    </section>
  )
}

export default BMICalculator;
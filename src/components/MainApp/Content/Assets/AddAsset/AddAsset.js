import React, { useState, useEffect } from 'react';
import './AddAsset.scss'
import axios from 'axios';
import { useSelector } from 'react-redux';


const AddAsset = ({toggleFn}) => {
  const assetTypes = useSelector((state) => state.assetTypes);
  const assetModel = useSelector((state) => state.models)
  const [isAnimated, setIsAnimated] = useState(false);
  useEffect(() => {
    console.log(assetModel)
    const timeout = setTimeout(() => setIsAnimated(true), 10); // Opóźnienie dodania klasy
    return () => clearTimeout(timeout); // Czyszczenie, gdyby komponent został odmontowany
  }, []);
    const initialFormState = {
        status: '',
        serialNumber: '',
        category: '',
        model: '',
        assignedToUser: '',
        department: '',
        location: '',
        brand: '',
        customer: '',
        purchaseDate: '',
        notes: ''
      };
      const [formData, setFormData] = useState(initialFormState);
      const [submittedData, setSubmittedData] = useState(null);
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
      const handleClose = () =>{
        setIsAnimated(false)
        setTimeout(()=> toggleFn(false), 200)
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedData(formData);
        console.log(formData);
        axios({
          method: 'post',
          url: 'https://socialback.bieda.it/createAsset',
          withCredentials: false,
          data: formData,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(function (response){
          console.log(response)
        })
        .catch(function (error){
          console.log(error)
        })
           // Resetowanie formularza
        setFormData(initialFormState);
      };
      
  return (
    <div className={`addAsset__wrapper ${isAnimated ? "animated" : ""}`}>
      <div className='addAsset__buttonBar'>
       <button className='addAsset__buttonBar--closeButton' onClick={()=>handleClose()}>Close</button> 
      </div>
      <form onSubmit={handleSubmit} className='assets__form'>
        <div className='form-group'>

          <label>Status</label>
          <select id="select-form" name="status" value={formData.status} onChange={handleChange} >
            <option value="" disabled selected hidden>select status</option>
            <option value="In Use">In use</option>
            <option value="In storage">In storage</option>
            <option value="Scrapper">Scrapped</option>
            <option value="On lease">On lease</option>
          </select>
        </div>

        <div className='form-group'>
          <label>Serial number</label>
          <input type="text" name="serialNumber" placeholder='serial number' value={formData.serialNumber} onChange={handleChange} />
        </div>
        <div className='form-group'>

          <label>Category</label>
          <select id="category-select" name="category" placeholder='choose category' value={formData.category} onChange={handleChange}>
            <option value="" disabled selected hidden>select category</option>
            {assetTypes.map((x)=>
            <option value={x.name}>{x.name}</option>
            )}
          </select>

        </div>


        <div className='form-group'>
          <label>Model</label>
          <select id="select-form" name="status" onChange={handleChange} >
            <option value="" disabled selected hidden>select status</option>
            {assetModel.map((x)=>
            <option value={x._id}>{`${x.category} - ${x.brand} - ${x.name}`}</option>
            )}
          </select>
        </div>
        <div className='form-group'>
          <label>Assigned to user</label>
          <input type="text" name="assignedToUser" placeholder='user' value={formData.assignedToUser} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label>Department</label>
          <input type="text" name="department" placeholder='department' value={formData.department} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label>Location</label>
          <input type="text" name="location" placeholder='location' value={formData.location} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label>Brand</label>
          <input type="text" name="brand" placeholder='brand' value={formData.brand} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label>Customer</label>
          <input type="text" name="customer" placeholder='customer' value={formData.customer} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label>Purchase date</label>
          <input type="text" name="purchaseDate" placeholder='purchase date' value={formData.purchaseDate} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label>Notes</label>
          <input type="text" name="notes" placeholder='notes' value={formData.notes} onChange={handleChange} />
        </div>
        <button type='submit'>Submit</button>
      </form>

      {submittedData && (
        <div className='submitted-data'>
          <h2>Asset successfully added.</h2>
         </div>
      )}
    </div>
  )
}

export default AddAsset

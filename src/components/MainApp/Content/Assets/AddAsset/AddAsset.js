import React, { useState, useEffect } from 'react';
import './AddAsset.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddAsset = ({ toggleFn }) => {
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
    notes: '',
  };
  const assetTypes = useSelector((state) => state.assetTypes);
  const assetModel = useSelector((state) => state.models);
  const assetUsers = useSelector((state) => state.usersList);
  const [formData, setFormData] = useState(initialFormState);
  const [isAnimated, setIsAnimated] = useState(false);
  useEffect(() => {
    console.log(assetModel);
    console.log('uwaaagaaaaa', assetUsers);
    const timeout = setTimeout(() => setIsAnimated(true), 10); // Opóźnienie dodania klasy
    return () => clearTimeout(timeout); // Czyszczenie, gdyby komponent został odmontowany
  }, []);
  useEffect(() => {
    console.log('chage in formData', formData);
  }, [formData]);
  const [submittedData, setSubmittedData] = useState(null);
  const handleChange = (e) => {
    const { name, value, selectedOptions } = e.target;
    if (name === 'model') {
      const brand = selectedOptions[0].getAttribute('data-brand');
      setFormData((prev) => ({
        ...prev,
        model: value,
        brand: brand,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleClose = () => {
    setIsAnimated(false);
    setTimeout(() => toggleFn(false), 200);
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.status || !formData.model || !formData.serialNumber) {
      alert("Please fill in all required fields!"); // prosty alert
      return; // przerwij wysyłkę formularza
    }
    e.preventDefault();
    setSubmittedData(formData);
    console.log(formData);
    axios({
      method: 'post',
      url: 'https://socialback.bieda.it/createAsset',
      withCredentials: false,
      data: formData,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // Resetowanie formularza
    setFormData(initialFormState);
  };

  return (
    <div className={`addAsset__wrapper ${isAnimated ? 'animated' : ''}`}>
      <div className="addAsset__buttonBar">
        <button className="addAsset__buttonBar--closeButton" onClick={() => handleClose()}>
          Close
        </button>
      </div>
      <form onSubmit={handleSubmit} className="assets__form">
        <div className="form-group">
          <label>Status</label>
          <select
            id="select-form"
            name="status"
            value={formData.status} // steruje wybraną opcją
            onChange={handleChange}
          >
            <option value="" disabled hidden>
              select status
            </option>
            <option value="In Use">In use</option>
            <option value="In storage">In storage</option>
            <option value="Scrapped">Scrapped</option>
            <option value="On lease">On lease</option>
          </select>
        </div>
        <div className="form-group">
          <label>Serial number</label>
          <input
            type="text"
            name="serialNumber"
            placeholder="serial number"
            value={formData.serialNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            id="category-select"
            name="category"
            placeholder="choose category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="" disabled selected hidden>
              select category
            </option>
            {assetTypes.map((x) => (
              <option value={x.name}>{x.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Model</label>
          <select id="select-form" name="model" onChange={handleChange}>
            <option value="" disabled selected hidden>
              select model
            </option>
            {assetModel.map((x) => (
              <option key={x._id} value={x.name} data-brand={x.brand}>
                {`${x.category} - ${x.brand} - ${x.name}`}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Assigned to user</label>
          <select id="select-form" name="assignedToUser" onChange={handleChange}>
            <option value="" disabled selected hidden>
              select user
            </option>
            {assetUsers.map((x) => (
              <option value={x.email}>{x.email}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            placeholder="department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" name="location" placeholder="location" value={formData.location} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Customer</label>
          <input type="text" name="customer" placeholder="customer" value={formData.customer} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Purchase date</label>
          <input
            type="text"
            name="purchaseDate"
            placeholder="purchase date"
            value={formData.purchaseDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Notes</label>
          <input type="text" name="notes" placeholder="notes" value={formData.notes} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      {submittedData && (
        <div className="submitted-data">
          <h2>Asset successfully added.</h2>
        </div>
      )}
    </div>
  );
};

export default AddAsset;

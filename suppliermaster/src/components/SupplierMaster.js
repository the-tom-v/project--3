import React, { useState, useEffect } from 'react';



function SupplierMaster() {
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('');
  const [editingSupplierId, setEditingSupplierId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('name');
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const url ="http://localhost:5000/suppliers"
  

  useEffect(()=>{
    getSupplier()        
},[])

const getSupplier=()=>{
    fetch(url)
    .then(response=>response.json())
   .then(json=>setSuppliers(json))

}

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, mobile, location }),
    });

    if (!response.ok) {
      throw new Error('Failed to add supplier');
    }

    // Clear form fields after successful submission
    setName('');
    setEmail('');
    setMobile('');
    setLocation('');
    

    alert('Supplier added successfully');
  } catch (error) {
    console.error(error);
    alert('Failed to add supplier');
  }
};
 

const deleteSupplier = async (id) => {

  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete supplier');
    }

    setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier.id !== id));
    alert('Supplier deleted successfully');
  } catch (error) {
    console.error('Error deleting supplier:', error);
    alert('Failed to delete supplier');
  }
};



const fetchSupplierById = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch supplier');
    }
    const data = await response.json();
    setName(data.name);
    setEmail(data.email);
    setMobile(data.mobile);
    setLocation(data.location);
    setEditingSupplierId(id);
  } catch (error) {
    console.error(error);
    alert('Failed to fetch supplier');
  }
};

const handleEditSupplier = (id) => {
  fetchSupplierById(id);
};


const updateSupplier = async () => {
  try {
    const response = await fetch(`${url}/${editingSupplierId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: editingSupplierId, name, email, mobile, location }),
    });

    if (!response.ok) {
      throw new Error('Failed to update supplier');
    }

    alert('Supplier updated successfully');
    getSupplier();
    clearFields();
    setEditingSupplierId(null);
  } catch (error) {
    console.error(error);
    alert('Failed to update supplier');
  }
};


  // useEffect to update filteredSuppliers whenever suppliers or searchQuery change
  useEffect(() => {
    const filtered = suppliers.filter(supplier => {
      return (
        supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredSuppliers(filtered);
  }, [searchQuery, suppliers]);

  // Function to filter suppliers based on name
  const handleFilterByName = () => {
    const filtered = suppliers.filter(supplier => {
      return supplier.name.toLowerCase().includes(name.toLowerCase());
    });
    setFilteredSuppliers(filtered);
  };

  
  const handleAddSupplier = () => {
    const newSupplier = {
      id: suppliers.length + 1,
      name: name,
      email: email,
      mobile: mobile,
      location: location
    };
    setSuppliers([...suppliers, newSupplier]);
    clearFields();
  };

  /** 
  const handleEditSupplier = (id) => {
    const supplierToEdit = suppliers.find(supplier => supplier.id === id);
    setName(supplierToEdit.name);
    setEmail(supplierToEdit.email);
    setMobile(supplierToEdit.mobile);
    setLocation(supplierToEdit.location);
    setEditingSupplierId(id);
  };

  */
  /** 
  const handleUpdateSupplier = () => {
    const updatedSuppliers = suppliers.map(supplier => {
      if (supplier.id === editingSupplierId) {
        return {
          ...supplier,
          name: name,
          email: email,
          mobile: mobile,
          location: location
        };
      }
      return supplier;
    });
    setSuppliers(updatedSuppliers);
    clearFields();
    setEditingSupplierId(null);
  };

  */

/** 
  const handleDeleteSupplier = (id) => {
    const updatedSuppliers = suppliers.filter(supplier => supplier.id !== id);
    setSuppliers(updatedSuppliers);
    
    
    
    
  };
  */

  const handleSearch = () => {
    // This function is already handled by useEffect
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  const clearFields = () => {
    setName('');
    setEmail('');
    setMobile('');
    setLocation('');
  };

  return (
    <center>
      <div>
        <h1>Supplier Master</h1>
        <div>
          <h2>Add Supplier</h2>
          
          <label>Name:</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          /><br></br>
          <label>Email:</label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br></br>
          <label>Mobile:</label>
          <input
            type="text"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          /><br></br>
          <label>Location:</label>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          /><br></br> 
           
          {editingSupplierId ? (
            <button onClick={updateSupplier}>Update Supplier</button>
          ) : (
            <form onClick={handleSubmit}>
            <button onClick={handleAddSupplier}>Add Supplier</button>
            </form>
          )}
          
        </div>
        
        
        <div>
          <h2>Supplier List</h2>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <select value={filterOption} onChange={handleFilterChange}>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="mobile">Mobile</option>
            <option value="location">Location</option>
          </select>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Location</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map(supplier => (
                <tr key={supplier.id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.mobile}</td>
                  <td>{supplier.location}</td>
                  <td>
                    <button onClick={() => handleEditSupplier(supplier.id)}>Edit</button>
                  </td>
                  
                  <td>
                   
                    <button onClick={() => deleteSupplier(supplier.id)}>Delete</button>
              

                    
                  </td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div>
          <h2>Filter</h2>
          <label>Filter by Name:</label>
          <input
            type="text"
            placeholder="Enter name to filter"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleFilterByName}>Filter</button>
        </div>
      </div>
      <ul>
        {suppliers.map(supplier => (
          <li key={supplier.id}>{supplier.name}</li>
        ))}
      </ul>

    </center>
  );
}

export default SupplierMaster;

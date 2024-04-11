import React from 'react';

function SupplierForm({ 
    name,
    email,
    mobile,
    location,
    setName,
    setEmail,
    setMobile,
    setLocation,
    handleAddSupplier,
    handleUpdateSupplier,
    editingSupplierId
}) {
    return (
        <div>
            <h2>{editingSupplierId ? 'Edit Supplier' : 'Add Supplier'}</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            />
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            {editingSupplierId ? (
                <button onClick={handleUpdateSupplier}>Update Supplier</button>
            ) : (
                <button onClick={handleAddSupplier}>Add Supplier</button>
            )}
        </div>
    );
}

export default SupplierForm;

import React from 'react';

function SupplierList({ suppliers, handleEditSupplier, handleDeleteSupplier }) {
    return (
        <div>
            <h2>Supplier List</h2>
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
                    {suppliers.map(supplier => (
                        <tr key={supplier.id}>
                            <td>{supplier.name}</td>
                            <td>{supplier.email}</td>
                            <td>{supplier.mobile}</td>
                            <td>{supplier.location}</td>
                            <td>
                                <button onClick={() => handleEditSupplier(supplier.id)}>Edit</button>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteSupplier(supplier.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SupplierList;

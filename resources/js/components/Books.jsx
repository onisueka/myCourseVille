import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function Books() {
    const [bookDatas, setBookDatas] = useState([]);

    useEffect(() => {

        async function getBooks() {
            const result = await axios(
                'api/books',
            );
            setBookDatas(result.data || []);
        }

        getBooks();


    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="py-4">
                        <button className="btn btn-primary">
                            Create Book
                        </button>
                    </div>
                    <div className="card">
                        <div className="card-header">Books</div>

                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Authour</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Created At</th>
                                        <th scope="col">Updated At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookDatas.map(item => (
                                        <tr key={item.book_id}>
                                            <th scope="row">
                                                <button className="btn btn-secondary">
                                                    Edit
                                                </button>
                                                <button className="btn btn-danger ms-2">
                                                    Delete
                                                </button>
                                            </th>
                                            <td>{item.title}</td>
                                            <td>{`${item.author_first_name} ${item.author_last_name}`}</td>
                                            <td>{item.price}</td>
                                            <td>{item.created_at}</td>
                                            <td>{item.updated_at}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Books;

if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));

    Index.render(
        <React.StrictMode>
            <Books />
        </React.StrictMode>
    )
}

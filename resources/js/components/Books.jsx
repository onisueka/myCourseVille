import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import Multiselect from 'multiselect-react-dropdown';

function Books() {
    const [bookDatas, setBookDatas] = useState([]);
    const [openFormBook, setOpenFormBook] = useState(false);
    const [openFormSearchBook, setOpenFormSearchBook] = useState(false);
    const [tagDatas, setTagDatas] = useState([]);
    const [tagSelected, setTagSelected] = useState([]);
    const [authorDatas, setAuthorDatas] = useState([]);

    const [formBook, setformBook] = useState({
        title: '',
        author: '',
        price: '',
        tags: []
    });

    const fetchAllData = async () => {

        try {
            // Book Datas
            const bookDatas = await axios(
                'api/books',
            );
            setBookDatas(bookDatas.data);

            // Tag Datas
            const tagDatas = await axios(
                'api/tags',
            );
            setTagDatas(tagDatas.data);

            // Author Datas
            const authorDatas = await axios(
                'api/authors',
            );
            setAuthorDatas(authorDatas.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        fetchAllData();

    }, []);

    const onSelectTag = (selectedList, selectedItem) => {
        setformBook({
            ...formBook,
            tags: selectedList
        });
        setTagSelected(selectedList)
    }

    const onRemoveTag = (selectedList, selectedItem) => {
        setformBook({
            ...formBook,
            tags: selectedList
        });
        setTagSelected(selectedList)
    }

    const onHandleDelete = async (item) => {
        const resultData = await axios({
            method: 'delete',
            url: '/api/book',
            data: {
                book_id: item.book_id
            }
        });

        if (resultData.status === 204) {
            fetchAllData();
        }
    }

    const onHandleEdit = async (item) => {
        const resultData = await axios(
            `api/book/${item.book_id}`,
        );
        const bookData = resultData.data || {};
        const authorData = authorDatas.find(item => item.author_id === bookData.author_id);
        const tagIds = (JSON.parse(bookData.tag_ids) || []);
        let tagData = [];
        tagIds.forEach(item => {
            tagData.push(tagDatas.find(i => i.tag_id === item));
        });

        setformBook({
            title: bookData.title,
            author: authorData,
            price: bookData.price,
            tags: tagData
        })
        setTagSelected(tagData);
        setOpenFormBook(true);
    }

    const onHandleCreate = () => {
        resetFormBook();
        setOpenFormBook(!openFormBook);
        setOpenFormSearchBook(false)
    }

    const onHandleSearch = () => {
        resetFormBook();
        setOpenFormSearchBook(!openFormSearchBook)
        setOpenFormBook(false)
    }

    const onSearch = async (event) => {
        event.preventDefault();
        const resultData = await axios({
            method: 'get',
            url: '/api/books',
            params: formBook
        });
        setBookDatas(resultData.data);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const resultData = await axios({
            method: 'post',
            url: '/api/book',
            data: formBook
        });

        if (resultData.status === 201) {
            resetFormBook();
            setOpenFormBook(false);
            fetchAllData();
        } else {
            console.log('Error Create Book');
        }
    }

    const resetFormBook = () => {
        setformBook({
            title: '',
            author: '',
            price: '',
            tags: []
        });
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="py-4">
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={onHandleCreate}
                        >
                            Create Book
                        </button>

                        <button
                            type="button"
                            className="btn btn-info ms-2"
                            onClick={onHandleSearch}
                        >
                            Search Book
                        </button>



                        {(openFormBook) && (
                            <form className="mt-3" onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={formBook.title}
                                        onChange={(e) => setformBook({ ...formBook, title: e.target.value })}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label>Author</label>
                                    <select
                                        className="form-select"
                                        value={formBook.author?.author_id}
                                        onChange={(e) => setformBook({ ...formBook, author: parseInt(e.target.value) })}
                                        required>
                                        <option value="">Open this select Author</option>
                                        {authorDatas.map(item => (
                                            <option value={item.author_id} key={item.author_id}>{`${item.first_name} ${item.last_name}`}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="number" className="form-control" id="price"
                                        value={formBook.price}
                                        onChange={(e) => setformBook({ ...formBook, price: parseInt(e.target.value) })}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label>Tags</label>
                                    <Multiselect
                                        options={tagDatas}
                                        defaultValue={formBook.tags}
                                        selectedValues={tagSelected}
                                        onSelect={onSelectTag}
                                        onRemove={onRemoveTag}
                                        displayValue="name"
                                        id="tag_id"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">Submit</button>
                            </form>
                        )}

                        {(openFormSearchBook) && (
                            <form className="mt-3" onSubmit={onSearch}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={formBook.title}
                                        onChange={(e) => setformBook({ ...formBook, title: e.target.value })}
                                         />
                                </div>
                                <div className="form-group">
                                    <label>Author</label>
                                    <select
                                        className="form-select"
                                        value={formBook.author?.author_id}
                                        onChange={(e) => setformBook({ ...formBook, author: parseInt(e.target.value) })}
                                        >
                                        <option value="0">Open this select Author</option>
                                        {authorDatas.map(item => (
                                            <option value={item.author_id} key={item.author_id}>{`${item.first_name} ${item.last_name}`}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="number" className="form-control" id="price"
                                        value={formBook.price}
                                        onChange={(e) => setformBook({ ...formBook, price: parseInt(e.target.value) })}
                                         />
                                </div>
                                <div className="form-group">
                                    <label>Tags</label>
                                    <Multiselect
                                        options={tagDatas}
                                        defaultValue={formBook.tags}
                                        selectedValues={tagSelected}
                                        onSelect={onSelectTag}
                                        onRemove={onRemoveTag}
                                        displayValue="name"
                                        id="tag_id"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">Search</button>
                            </form>
                        )}

                    </div>
                    <div className="card">
                        <div className="card-header">Books</div>

                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
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
                                                <button type="button"
                                                    onClick={() => onHandleEdit(item)}
                                                    className="btn btn-secondary">
                                                    Edit
                                                </button>
                                                <button type="button"
                                                    onClick={() => onHandleDelete(item)}
                                                    className="btn btn-danger ms-2">
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
        <Books />
    )
}

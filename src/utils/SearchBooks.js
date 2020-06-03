import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import SingleBook from '../components/SingleBook'

class SearchBooks extends Component {
	onChangeHandle = (e) => {
		const {onSearch} = this.props;
		
		onSearch(e);
	}
	
	searchItemsRender = (books) => {
		const {onUpdate} = this.props;
		
		return books.map(book => (
			<li key={book.id}>
				<SingleBook book={book}
										onUpdate={onUpdate} />
			</li>
		));
	}
	
	render() {
		const {books} = this.props;
		
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to='/'>
						<button className="close-search">Close</button>
					</Link>
					<div className="search-books-input-wrapper">
						<input type="text"
									 placeholder="Search by title or author"
									 onChange={(e) => this.onChangeHandle(e.target.value)} />
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{books.length ? this.searchItemsRender(books) : 'Not Found or Empty Query!'}
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchBooks;
import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import SingleBook from './components/SingleBook'

class ListBooks extends Component {
	shelfRender = (shelf) => {
		const {shelves, update} = this.props;
		const shelvesName = {
			currentlyReading: 'Currently Reading',
			wantToRead: 'Want to Read',
			read: 'Read'
		};
		
		return (
			<div id={shelf} className="bookshelf">
				<h2 className="bookshelf-title">{shelvesName[shelf]}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{shelves[shelf].map(book => (
							<li key={book.id}>
								<SingleBook book={book}
														onUpdate={update} />
							</li>
						))}
					</ol>
				</div>
			</div>
		)
	}
	
	render() {
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						{this.shelfRender('currentlyReading')}
						{this.shelfRender('wantToRead')}
						{this.shelfRender('read')}
					</div>
				</div>
				
				<div className="open-search">
					<Link to="/search">
						<button type="button">Add a book</button>
					</Link>
				</div>
			</div>
		)
	}
}

export default ListBooks;
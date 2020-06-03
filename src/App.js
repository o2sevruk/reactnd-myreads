import React, {Component} from 'react'
import {Route} from 'react-router-dom'

import * as BooksAPI from './utils/BooksAPI'

import ListBooks from './ListBooks'
import SearchBooks from './utils/SearchBooks'

import './App.css'

class BooksApp extends Component {
	state = {
		currentlyReading: [],
		wantToRead: [],
		read: [],
		books: []
	}
	
	componentDidMount() {
		this.getBooks();
	}
	
	getBooks = () => {
		BooksAPI.getAll().then(shelves => {
			this.setState((currentState) => ({
				currentlyReading: shelves.filter(book => book.shelf === 'currentlyReading'),
				wantToRead: shelves.filter(book => book.shelf === 'wantToRead'),
				read: shelves.filter(book => book.shelf === 'read')
			}));
		});
	}
	
	updateBooks = (book, shelf) => {
		BooksAPI.update(book, shelf).then(() => {
			this.getBooks();
		});
	}
	
	searchBooks = (query) => {
		const {currentlyReading, wantToRead, read} = this.state;
		
		if (query.length) {
			BooksAPI.search(query).then((books) => {
				if (books.length) {
					this.setState(() => ({
						books: books.filter(book =>
							!currentlyReading.some(el => el.id === book.id) &&
							!wantToRead.some(el => el.id === book.id) &&
							!read.some(el => el.id === book.id)
						)
					}));
				} else {
					this.setState(() => ({
						books: []
					}));
				}
			});
		} else {
			this.setState(() => ({
				books: []
			}));
		}
	}
	
	render() {
		const {currentlyReading, wantToRead, read, books} = this.state;
		
		return (
			<div className="app">
				<Route exact path='/'
							 render={() => (
								 <ListBooks shelves={{currentlyReading, wantToRead, read}}
														update={this.updateBooks} />
							 )} />
				
				<Route path='/search'
							 render={() => (
								 <SearchBooks books={books}
															onSearch={this.searchBooks}
															onUpdate={this.updateBooks} />
							 )} />
			</div>
		)
	}
}

export default BooksApp

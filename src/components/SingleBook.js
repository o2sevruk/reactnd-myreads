import React, {Component} from 'react'

class SingleBook extends Component {
	changeHandler = (e, book) => {
		const {onUpdate} = this.props;
		
		onUpdate(book, e.target.value);
	}
	
	render() {
		const {book} = this.props;
		
		return (
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{
						width: 128,
						height: 192,
						backgroundImage: `url("${book.imageLinks.thumbnail}")`
					}} />
					<div className="book-shelf-changer">
						<select onChange={(e) => this.changeHandler(e, book)} value={book.shelf || 'none'}>
							<option value="move" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{book.authors}</div>
			</div>
		)
	}
}

export default SingleBook
import React from 'react'
import './ProductDetails.css'
import bookImg from '../../Assets/bookIcon.jpg'
const ProductDetails = () => {
  return (
    <div className='productDetails-container'>
       <div className='productDetails-box'>
          <div className='productImg'>
            <img src={bookImg} alt="book-Img"/>
          </div>
          <div className='productRestDetails'>
            <div className='product-name'>
                <h2>Drama book</h2>
            </div>
            <div className='product-short-desc'>
                <p>this book is totally free of cost if u want u can...</p>
            </div>
            <div className='product-autor'>
              <h5>author:</h5>
              <span>Khushboo</span>
            </div>
            <div className='product-price'>
                <h5>price:</h5>
                <span>2500</span>
            </div>
            <div className='product-stock-count-and-type'>
                <div className='in-stock'>
                    <h6>In stock:</h6>
                    <span>10</span>
                </div>
                <div className='type'>
                    <div>Free</div>
                </div>
            </div>
            <div className='product-desc'>
                <h4>Product Description</h4>
                <p>A book description is a brief overview of the plot, main characters, and themes of the story.
                 Its an important tool that helps in book promotion and sales.
                  Many times, book descriptions also include information about the author. 
                  This helps to build credibility and establish a connection with the reader. 
                  The book description is usually written in the 3rd persons point of view (using the characters
                   names, he, she, it, they, them, etc). It usually has short paragraphs to ensure a better reader experience.
                    You can also bold and italicize key aspects of the book to highlight them in the book description.
                    A book is a medium for recording information in the form of writing or images. Modern books are typically in codex format, composed of many pages that are bound together and protected by a cover; they were preceded by several earlier formats, including the scroll and the tablet. The book publishing process is the series of steps involved in their creation and dissemination.
                  As a conceptual object, a book refers to a written work of substantial length,
                     which may be distributed either physically or digitally as an ebook.
                  These works can be broadly classified into fiction (containing invented content, often narratives) 
                  and non-fiction (containing content intended as factual truth). A physical book may not contain such a work: 
                 for example, it may contain only drawings, engravings, photographs, puzzles, or removable content like paper dolls.
                It may also be left empty for personal use, as in the case of account books, appointment books, autograph books,
                 notebooks, diaries and sketchbooks.
                 {/* These works can be broadly classified into fiction (containing invented content, often narratives) 
                  and non-fiction (containing content intended as factual truth). A physical book may not contain such a work: 
                 for example, it may contain only drawings, engravings, photographs, puzzles, or removable content like paper dolls.
                It may also be left empty for personal use, as in the case of account books, appointment books, autograph books,
                 notebooks, diaries and sketchbooks. */}
                 {/* These works can be broadly classified into fiction (containing invented content, often narratives) 
                  and non-fiction (containing content intended as factual truth). A physical book may not contain such a work: 
                 for example, it may contain only drawings, engravings, photographs, puzzles, or removable content like paper dolls.
                It may also be left empty for personal use, as in the case of account books, appointment books, autograph books,
                 notebooks, diaries and sketchbooks.
                 These works can be broadly classified into fiction (containing invented content, often narratives) 
                  and non-fiction (containing content intended as factual truth). A physical book may not contain such a work: 
                 for example, it may contain only drawings, engravings, photographs, puzzles, or removable content like paper dolls.
                It may also be left empty for personal use, as in the case of account books, appointment books, autograph books,
                 notebooks, diaries and sketchbooks.
                 These works can be broadly classified into fiction (containing invented content, often narratives) 
                  and non-fiction (containing content intended as factual truth). A physical book may not contain such a work: 
                 for example, it may contain only drawings, engravings, photographs, puzzles, or removable content like paper dolls.
                It may also be left empty for personal use, as in the case of account books, appointment books, autograph books,
                 notebooks, diaries and sketchbooks. */}
                </p>
            </div>
            <div className='product-rating'>
                <h4>Ratings:</h4>
                <span>5</span>
            </div>
            <div className='product-reviws'>
               <h4>Review:</h4>
               <p>great book must read that highy recommeded</p>
            
            </div>
           
          </div>
       </div>
    </div>
  )
}

export default ProductDetails
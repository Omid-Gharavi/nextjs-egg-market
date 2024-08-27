import React from 'react'
import SearchInput from './SearchInput'

const SearchModal = ({ id }) => {
    return (
        <dialog id={id} className="modal modal-bottom lg:modal-middle">
            <div className="modal-box">
                <div className='flex flex-col justify-center'>
                    <SearchInput />
                </div>
            </div>
        </dialog>
    )
}

export default SearchModal
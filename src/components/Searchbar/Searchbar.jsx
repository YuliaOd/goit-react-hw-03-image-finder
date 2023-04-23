import { Component } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
    state = {
        searchQuery: '',
    }

    handleChangePicture = event => {
        this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.searchQuery.trim() === '') {
           return toast.warn('Enter a query');
        }

        this.props.onSubmit(this.state.searchQuery);
        this.setState({ searchQuery: '' })
    }

    render() {
        return (
            <header className={css.searchbar}>
                <form className={css.searchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.searchFormButton}>
                        <span className={css.searchFormLabel}>Search</span>
                        <AiOutlineSearch />
                    </button>

                    <input
                        onChange={this.handleChangePicture}
                        className={css.searchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
    }
}
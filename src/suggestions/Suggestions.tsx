import React from 'react';
import { ISuggestion } from '../types';
import './Suggestions.css';

interface Props {
    suggestions: ISuggestion[],
    searchValue: string
}

export default function Suggestions({suggestions, searchValue}: Props) {
    const highlight = (name: string) => {
        const l = searchValue.length;
        const matchStart = name.toLowerCase().indexOf(searchValue);
        const matchEnd = matchStart + l;
        return (
            <React.Fragment>
                    {name.slice(0, matchStart)}<span className='match'>
                        {name.slice(matchStart, matchEnd)}
                    </span>{name.slice(matchEnd)}
            </React.Fragment>
        )
    };

    return (
        <ul className='suggestions'>
            {suggestions.map((suggestion: ISuggestion) => (
                <li className='suggestion' key={suggestion.id}>
                    <h2 className='title'>
                        {highlight(suggestion.name)}
                    </h2>
                    <details>
                        <summary>Ingredients: {suggestion.ingredients?.join(', ')}</summary>
                        <p className='recipe'>{suggestion.recipe}</p>
                    </details>
                    <img className='picture' src={suggestion.image} alt='drink'/>
                </li>
            ))}
        </ul>
    )
};
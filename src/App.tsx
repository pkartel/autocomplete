import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import Suggestions from "./suggestions/Suggestions";
import Input from "./input/Input";
import { IDrink, Ingredient, ISuggestion } from "./types";

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [drinks, setDrinks] = useState<IDrink[]>([]);
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
  const [isFetchInProgress, setIsFetchInProgress] = useState<boolean>(false);

  const mapDrinksToSuggestions = (drinks: IDrink[], search: string): ISuggestion[] => {
    const ingredientsPlaceholder = new Array(15).fill('');

    const isValidKey = 
      (value: string, d: IDrink): value is keyof IDrink => value in d;

    const getIngredient = (i: number, d: IDrink): string => {
      const key = Ingredient.base + i;
      return isValidKey(key, d) ? d[key] : '';
    }

    return drinks
      .map((d: IDrink) => ({
        id: d.idDrink,
        name: d.strDrink,
        recipe: d.strInstructions,
        image: d.strDrinkThumb,
        ingredients: ingredientsPlaceholder.map((i, key) => getIngredient(key, d)).filter(i => i)
      }))
      .filter(sugg => 
        search ?
          sugg.name.toLowerCase()
            .includes(search?.toLowerCase()) :
          false
      );
  }

  const fetchData = (search: string) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
  
    setIsFetchInProgress(true);
    fetch(url)
      .then((res) => {
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        return res.json();
      })
      .then((res) => {
        if (search === searchValue.slice(0,1)) {
          const drinks = res.drinks;

          setDrinks(drinks);
          setSuggestions(mapDrinksToSuggestions(drinks || [], searchValue));
        }
      })
      .catch(err => console.error(err))
      .finally(() => {
        setIsFetchInProgress(false);
      });
  }

  useEffect(() => {
    // The API returns drinks only by first letter
    const prevSearchFirstLetter = drinks[0]?.strDrink.slice(0, 1).toLowerCase();
    const currSearchFirstLetter = searchValue?.slice(0, 1).toLowerCase();

    if (currSearchFirstLetter && prevSearchFirstLetter !== currSearchFirstLetter) {
      fetchData(currSearchFirstLetter);
    } else {
      setSuggestions(mapDrinksToSuggestions(drinks, searchValue));
    }
  }, [searchValue]);

  return(
    <div className="app">
      <main className="content">
        <Input
          searchValue={searchValue}
          onValueChange={(value) => { value !== searchValue && setSearchValue(value)}}
        />
        <div className="results">
          { suggestions.length ? (
              <Suggestions searchValue={searchValue} suggestions={suggestions}/>
            ) : searchValue && !isFetchInProgress ? (
              <div className="noresults-msg">
                Oops. No suggestions available. Try to simplify your search.
              </div>
            ) : null
          }
        </div>
      </main>
      <footer>
        <p>© 2022 TheCocktailSearch.</p>
        <p>Proudly built by Palina Kartsel</p>
      </footer>
    </div>
  );
}

export default hot(module)(App);
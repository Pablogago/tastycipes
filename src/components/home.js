import React from 'react'
import Search from './search'
import Recipe from './recipe'
import { fetchRecipe } from '../utils/api'
import './home.css';

/* import { ReactComponent as SpainFlag } from '../images/spain.svg';
<SpainFlag/> */

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favoriteRecipes: [],
      expandRecipe: null,
      searchedRecipes: null,
      recipe:null,

    }
    this.onUserQuery = this.onUserQuery.bind(this);
    this.onClickRecipe = this.onClickRecipe.bind(this);
  }

  async componentDidMount() {
    const favoriteRecipes = await fetchRecipe("atun", 9, { cache: 'force-cache' });
    this.setState({ favoriteRecipes });
  }

  async onUserQuery(query) {
    const resp = await fetchRecipe(query, 20, { cache: 'force-cache' });
    this.setState({
      searchedRecipes: resp,
      recipe:query,
    });
  }

  async onClickRecipe(label) {
    const { favoriteRecipes, searchedRecipes } = this.state;
    const totalRecipes = searchedRecipes ? favoriteRecipes.concat(searchedRecipes) : favoriteRecipes;
    const found = totalRecipes.find(element => element.recipe.label === label);
    this.setState({
      expandRecipe: found.recipe
    })
  }
  
  render() {
    const { expandRecipe, favoriteRecipes, searchedRecipes } = this.state;

    if (expandRecipe) {
      return <Recipe goBack={_ => this.setState({ expandRecipe: null })} item={expandRecipe} />
    }
    
    return (
      <div className="home" id="home">
        <header>
          <div className="headerTitle">
            <img className="imglogo" src="https://clipartstation.com/wp-content/uploads/2018/09/chef-hat-clipart-png-4.png" alt="chef" />
            <h1 className="mainTitle">TastyCipes</h1>

          </div>
          <Search userQuery={this.onUserQuery} />
        </header>
        <div className="favorite-food">
          {!searchedRecipes && <DishType onUserQuery={this.onUserQuery} />}
        </div>
        <div className="favorite-recomendation">
          {!searchedRecipes &&   <div className="allRecomendation"> <h3>Recomendation</h3><Flags onUserQuery={this.onUserQuery}/> </div>}
        </div>
        {searchedRecipes && <div className="backHome"> <button className="button-backHome" onClick={_ => this.setState({ searchedRecipes: null })}>Home</button><span>/  {this.state.recipe}</span> </div>}
        <div className="searched-recipes">

          {searchedRecipes && searchedRecipes.map((element, index) => (
            <Card
              key={index}
              onClickRecipe={this.onClickRecipe}
              recipe={element} />))}

        </div>
        {!searchedRecipes && <h3 className="trendyRecipes">Trendy Recipes</h3>}
        <div className="favorite-recipes">
    
            {!searchedRecipes &&   favoriteRecipes.map((element, index) => <Card onClickRecipe={this.onClickRecipe} key={index} recipe={element} />)}
   
        </div>


      </div>
    )
  }
}

function Card(props) {
  const { recipe } = props.recipe;
  return (

      <button className="recipe-button"  onClick={_ => props.onClickRecipe(recipe.label)}>
        <img className="recipe-img" src={recipe.image} alt="food-img" />
        <span className="recipe-label">{recipe.label}</span>
        {/* <p className="recipe-kcal">{Math.round(recipe.calories / recipe.yield)}Kcal/s</p> */}
      </button>

  )
}

function Flags(props) {

  const onClickFlag = (flag) => {
    props.onUserQuery(flag);
  }

  return (
    <div className="country-recipes">
      <div className="recomendation-button">
      <button className="recomendation-button image fruit" onClick={() => onClickFlag('Fruit')}>

      </button>
      <span className="recomendation-name"> Fresh Fruites</span>
      </div>
      <div className="recomendation-button">
      <button className="recomendation-button pizza image" onClick={() => onClickFlag('Pizza')}>

      </button>
      <span className="recomendation-name"> Pizza</span>
      </div>
      <div className="recomendation-button">
      <button className="recomendation-button meat image" onClick={() => onClickFlag('Meat')}>

      </button>
      <span className="recomendation-name"> Meat</span>
      </div>

      <div className="recomendation-button">
      <button className="recomendation-button dessert image" onClick={() => onClickFlag('dessert')}>

      </button>
      <span className="recomendation-name"> Dessert</span>
      </div>

      <div className="recomendation-button">
      <button className="recomendation-button fish image" onClick={() => onClickFlag('Fish')}>

      </button>
      <span className="recomendation-name"> Fish</span>
      </div>
      <div className="recomendation-button">
      <button className="recomendation-button cookies image" onClick={() => onClickFlag('Cookies')}>

      </button>
      <span className="recomendation-name"> Cookies</span>
      </div>
    </div>
  )
}

function DishType(props) {
  const onClickDish = (dish) =>{
    props.onUserQuery(dish)
  }
  return (
    <div className="dish-recipe">
      <button className="dish-button color1" onClick={_ => onClickDish("Desserts")}>
        <div className="flex">
          <img className="img-recipe" src={require("./images/croissant.png").default} alt="img-icon" />
          <h4 className="recipe-name">Desserts</h4>
        </div>
      </button>
      <button className="dish-button color2" onClick={_ => onClickDish("Coffe")}>
        <div className="flex">
          <img className="img-recipe" src={require("./images/coffe.png").default} alt="img-icon" />
          <h4 className="recipe-name" style={{marginLeft: -23}}>Coffe</h4>
        </div>
      </button>
      <button className="dish-button color3" onClick={_ => onClickDish("Burger")}>
        <div className="flex">
          <img className="img-recipe" src={require("./images/burger.png").default} alt="img-icon" />
          <h4 className="recipe-name" >Burger</h4>
        </div>
      </button>
      <button className="dish-button color4" onClick={_ => onClickDish("salad")}>
        <div className="flex">
          <img className="img-recipe" style={{marginLeft: -15}} src={require("./images/salad.png").default} alt="img-icon" />
          <h4 className="recipe-name" style={{marginLeft: 8}}>Salad</h4>
        </div>
      </button>
      <button className="dish-button color5" onClick={_ => onClickDish("Kebab")}>
        <div className="flex">
          <img className="img-recipe" src={require("./images/kebab.png").default} alt="img-icon" />
          <h4 className="recipe-name" style={{marginLeft: 10}}>Kebab</h4>
        </div>
      </button>
      <button className="dish-button color6" onClick={_ => onClickDish("nachos")}>
        <div className="flex">
          <img className="img-recipe" src={require("./images/nachos.png").default} alt="img-icon" />
          <h4 className="recipe-name" style={{marginLeft: 5}}>Nachos</h4>
        </div>
      </button>


    </div>
  )
}
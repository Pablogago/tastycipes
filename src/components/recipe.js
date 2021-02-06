import React from 'react'
import './recipe.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default class Recipe extends React.Component {

  render() {
    const { item, goBack } = this.props;

    return (
      <div class="recipe-app">
       
        <div className="background-recipe" style={{ backgroundImage: `url(${item.image})`,}}>
         <button className="back-button" onClick={goBack}><svg className="back-button-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 511"><defs/><path d="M143.87 512.48c-10.4 0-20.6-4.06-28.28-11.73L17.63 403C6.26 391.65 0 376.56 0 360.5s6.26-31.15 17.63-42.5l97.96-97.75a39.98 39.98 0 0143.7-8.65 39.93 39.93 0 0124.7 36.98v91.92C342.8 340.5 472 211.3 472 52.5v-32a20 20 0 1140 0v32c0 87.6-34.12 169.98-96.07 231.93C353.98 346.38 271.61 380.5 184 380.5c-22.06 0-40-17.94-40-40v-91.92-.01a.85.85 0 00-.11-.05l-.05.05-97.96 97.75C42.1 350.11 40 355.14 40 360.5s2.09 10.4 5.88 14.18l97.96 97.76.05.04.1-.04V450.5a20 20 0 0140 0v21.93c0 16.23-9.7 30.75-24.7 36.97a40.16 40.16 0 01-15.42 3.08zm0 0"/></svg></button>
        </div>
        <div className="info"></div>
        <div>
          <h1 className="title">{item.label}</h1>
          <div className="healthlabels">
            {item.healthLabels.map(element => 
              <p className="healthlabel">{element}</p>
              )}
          </div>
          <div className="subtitle">
            <p className="recipe-serving">Servings <span>{item.yield}</span></p>
            <p  className="recipe-serving"> Total Kcal <span>{Math.round(item.calories)}</span></p>
          </div>
        </div>
        <p className="nutrition-info">Nutrition Information per Serving</p>
        <div className="nutrients">
        <CircularProgressbar 
        className="circle"
        value={Math.round(item.calories / item.yield)}
         maxValue={5000} 
         text={Math.round(item.calories / item.yield) + ` Kcal`}
         styles={buildStyles({
          pathColor: `#4baf47c7`,
          textSize: '16px',
          textColor: 'rgb(44 66 44 / 88%)',
         })}
         />
        <CircularProgressbar 
        className="circle"
        value={Math.round(item.totalNutrients.FAT.quantity / item.yield)}
         maxValue={180} 
         text={Math.round(item.totalNutrients.FAT.quantity / item.yield) + item.totalNutrients.FAT.unit + ` FAT`}
         styles={buildStyles({
          pathColor: `#4baf47c7`,
          textSize: '16px',
          textColor: 'rgb(44 66 44 / 88%)',
         })}
         />
         <CircularProgressbar 
        className="circle"
        value={Math.round(item.totalNutrients.FAMS.quantity / item.yield)}
         maxValue={60} 
         text={Math.round(item.totalNutrients.FAMS.quantity / item.yield) + item.totalNutrients.FAMS.unit + ` PROT`}
         styles={buildStyles({
          pathColor: `#4baf47c7`,
          textSize: '16px',
          textColor: 'rgb(44 66 44 / 88%)'
         })}
         />
         <CircularProgressbar 
        className="circle"
        value={Math.round(item.totalNutrients.CHOCDF.quantity / item.yield)}
         maxValue={200} 
         text={Math.round(item.totalNutrients.CHOCDF.quantity / item.yield) + item.totalNutrients.CHOCDF.unit + ` CARB`}
         styles={buildStyles({
          pathColor: `#4baf47c7`,
          textSize: '16px',
          textColor: 'rgb(44 66 44 / 88%)'
         })}
         />

        </div>
        <div className="ingredients">
          <p>Ingredients</p>
          {item.ingredients.map(element => 
           <div className="each-ingredient">
           <p ClassName="ingredients-text">{element.text}</p>
           </div>)}</div>
        <div className="link container">
          
            <a className="btn link-recipe" href={item.url}>Check the recipe</a>
        </div>

  
      </div>
    )
  }
}
